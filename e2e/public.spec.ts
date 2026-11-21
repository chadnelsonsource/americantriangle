import { expect, test } from "@playwright/test";

test("home page states the positioning and three divisions", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("reliable AI");
  await page.getByRole("link", { name: "AI Data Infrastructure" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("foundation of reliable");
});

test("lead form rejects a short message", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Riley Chen");
  await page.getByLabel("Work email").fill("riley@example.com");
  await page.getByLabel("Organization").fill("Northwind Labs");
  await page.getByLabel("What do you need?").fill("too short");
  await page.getByRole("button", { name: "Submit inquiry" }).click();
  await expect(page.getByText(/at least 20/i)).toBeVisible();
});
