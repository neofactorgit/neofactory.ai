import { test, expect } from "@playwright/test";

test.describe("marketing site smoke tests", () => {
  test("home page renders hero headline", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    await expect(
      page.getByRole("heading", { name: "One-person factory" })
    ).toBeVisible();
  });

  test("primary navigation routes to contact page", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    await page
      .getByRole("banner")
      .getByRole("link", { name: "Join Us" })
      .click({ force: true });
    await expect(page).toHaveURL(/\/contact$/);
    await expect(
      page.getByRole("heading", { name: "Build with us" })
    ).toBeVisible();
  });

  test("plan section lists the three belief-state milestones", async ({ page }) => {
    await page.goto("/", { waitUntil: "commit" });
    const planCards = page.locator('[data-testid="plan-card"]');
    await planCards.first().waitFor();
    await planCards.first().evaluate((node) =>
      node.scrollIntoView({ behavior: "instant", block: "center" })
    );
    await expect(planCards).toHaveCount(3);
    await expect(
      planCards
        .first()
        .getByRole("heading", { level: 3, name: "Instrumented, closed system" })
    ).toBeVisible();
  });
});
