import "@testing-library/jest-dom/vitest";

// Remix and react-testing-library rely on requestAnimationFrame in some components.
if (typeof window !== "undefined" && !window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number;
}
