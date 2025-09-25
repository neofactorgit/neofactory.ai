import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PLAYWRIGHT_TEST_PORT || "5173";
const HOST = process.env.PLAYWRIGHT_TEST_HOST || "localhost";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL || `http://${HOST}:${PORT}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  webServer: {
    command: `npm run dev -- --port ${PORT} --host ${HOST} --strictPort`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120 * 1000,
    env: {
      ...process.env,
      SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || "test-token",
      UPSTASH_REDIS_REST_URL:
        process.env.UPSTASH_REDIS_REST_URL || "https://example.com/redis",
      UPSTASH_REDIS_REST_TOKEN:
        process.env.UPSTASH_REDIS_REST_TOKEN || "test-token",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
