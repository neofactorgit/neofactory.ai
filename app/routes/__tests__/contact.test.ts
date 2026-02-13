/* @vitest-environment node */

import type { ActionFunctionArgs } from "@vercel/remix";
import { beforeEach, describe, expect, it, vi } from "vitest";

const ratelimitMocks = vi.hoisted(() => {
  return {
    limit: vi.fn(async () => ({ success: true })),
    slidingWindow: vi.fn(() => "mock-limiter"),
    constructor: vi.fn(),
  };
});

const mockSendMessage = vi.hoisted(() => vi.fn());

vi.mock("@upstash/ratelimit", () => {
  return {
    Ratelimit: class {
      constructor(options: unknown) {
        ratelimitMocks.constructor(options);
      }

      limit(...args: Parameters<typeof ratelimitMocks.limit>) {
        return ratelimitMocks.limit(...args);
      }

      static slidingWindow(
        ...args: Parameters<typeof ratelimitMocks.slidingWindow>
      ) {
        return ratelimitMocks.slidingWindow(...args);
      }
    },
  };
});

vi.mock("~/lib/upstash.server", () => ({
  redis: {} as Record<string, never>,
}));

vi.mock("~/lib/slack.server", () => ({
  getSlackClient: () => ({
    sendMessage: mockSendMessage,
  }),
}));

describe("contact action", () => {
  beforeEach(async () => {
    ratelimitMocks.limit.mockClear();
    ratelimitMocks.limit.mockResolvedValue({ success: true });
    ratelimitMocks.slidingWindow.mockClear();
    ratelimitMocks.constructor.mockClear();
    mockSendMessage.mockReset();
    await vi.resetModules();
  });

  async function importAction() {
    const module = await import("../contact");
    return module.action;
  }

  async function invokeAction({
    method = "POST",
    fields,
    headers,
  }: {
    method?: string;
    fields?: Record<string, string>;
    headers?: HeadersInit;
  }) {
    const action = await importAction();
    const requestInit: RequestInit = {
      method,
      headers,
    };

    if (method.toUpperCase() === "POST" && fields) {
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.set(key, value);
      }
      requestInit.body = formData as unknown as BodyInit;
    }

    const request = new Request("https://example.com/contact", requestInit);
    const response = await action({ request } as ActionFunctionArgs);
    const body = await response.json();

    return { response, body };
  }

  it("returns ok for non-POST methods", async () => {
    const { response, body } = await invokeAction({ method: "GET" });

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(ratelimitMocks.limit).not.toHaveBeenCalled();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("ignores honeypot submissions", async () => {
    const { response, body } = await invokeAction({
      fields: {
        name: "Alice",
        email: "alice@example.com",
        companyName: "NeoFactory",
        message: "Interested in your work",
        website: "https://example.com",
      },
    });

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(ratelimitMocks.limit).not.toHaveBeenCalled();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("rejects submissions with missing required fields", async () => {
    const { response, body } = await invokeAction({
      fields: {
        name: "Alice",
        email: "alice@example.com",
      },
    });

    expect(response.status).toBe(400);
    expect(body).toEqual({ success: false, message: "Invalid form submission" });
    expect(ratelimitMocks.limit).toHaveBeenCalledTimes(1);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("rejects submissions when trimmed fields are empty", async () => {
    const { response, body } = await invokeAction({
      fields: {
        name: "  ",
        email: "alice@example.com",
        companyName: "    ",
        message: "\n",
      },
    });

    expect(response.status).toBe(400);
    expect(body).toEqual({ success: false, message: "Invalid form submission" });
    expect(ratelimitMocks.limit).toHaveBeenCalledTimes(1);
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("rejects submissions when rate limit fails", async () => {
    ratelimitMocks.limit.mockResolvedValueOnce({ success: false });

    const { response, body } = await invokeAction({
      fields: {
        name: "Alice",
        email: "alice@example.com",
        companyName: "NeoFactory",
        message: "Interested in your work",
      },
    });

    expect(response.status).toBe(429);
    expect(body).toEqual({ success: false, message: "Too many submissions" });
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it("sends a Slack message on success with trimmed values", async () => {
    const { response, body } = await invokeAction({
      headers: {
        "x-forwarded-for": "203.0.113.5",
      },
      fields: {
        name: "  Alice Example  ",
        email: " alice@example.com ",
        companyName: " NeoFactory  ",
        message: "  Hello there!  ",
      },
    });

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true, message: "Form submitted successfully" });

    expect(ratelimitMocks.limit).toHaveBeenCalledWith("203.0.113.5");
    expect(mockSendMessage).toHaveBeenCalledTimes(1);

    const payload = mockSendMessage.mock.calls[0][0];
    expect(payload.channel).toBe("#web-forms");
    expect(payload.text).toBe("New lead 🎉");
    expect(payload.blocks?.[0]?.text?.text).toContain("Name: Alice Example");
    expect(payload.blocks?.[0]?.text?.text).toContain("Email: alice@example.com");
    expect(payload.blocks?.[0]?.text?.text).toContain("Company: NeoFactory");
    expect(payload.blocks?.[0]?.text?.text).toContain("Hello there!");
    expect(ratelimitMocks.slidingWindow).toHaveBeenCalledWith(2, "24 h");
  });
});
