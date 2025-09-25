import { act, renderHook } from "@testing-library/react";
import { useIsMobile } from "~/hooks/useIsMobile";

describe("useIsMobile", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 1024,
    });
  });

  it("returns false for desktop-sized viewports", () => {
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it("tracks resize events to update breakpoint state", async () => {
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    await act(async () => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);

    await act(async () => {
      window.innerWidth = 900;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(false);
  });
});
