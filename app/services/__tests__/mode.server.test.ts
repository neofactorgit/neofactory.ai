/* @vitest-environment node */

import { getMode, setMode } from "~/services/mode.server";

describe("getMode", () => {
  it("returns light when no cookie header is present", () => {
    const request = new Request("https://neofactory.ai", {
      headers: new Headers(),
    });

    expect(getMode(request)).toBe("light");
  });

  it("returns null for unsupported cookie values", () => {
    const request = new Request("https://neofactory.ai", {
      headers: new Headers({
        cookie: "mode=rainbow",
      }),
    });

    expect(getMode(request)).toBeNull();
  });
});

describe("setMode", () => {
  it("clears the cookie when system is selected", () => {
    const serialized = setMode("system");

    expect(serialized).toContain("mode=");
    expect(serialized).toContain("Max-Age=-1");
  });

  it("serializes persistent cookies for explicit modes", () => {
    const serialized = setMode("dark");

    expect(serialized).toContain("mode=dark");
    expect(serialized).toContain("Max-Age=31536000");
    expect(serialized).toContain("Domain=neofactory.ai");
    expect(serialized).toContain("Path=/");
  });
});
