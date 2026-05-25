import { test, expect } from "@playwright/test";

test.describe("GELANDEWAGEN landing", () => {
  test("hero canvas and H1 load", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("#hero canvas")).toBeVisible({ timeout: 60_000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Mercedes Service/i);
  });

  test("language toggle switches H1", async ({ page }) => {
    await page.goto("/?lang=ro");
    const toggle = page.getByRole("button", { name: "Toggle language" });
    await expect(toggle).toHaveText("RU");
    await toggle.click();
    await expect(toggle).toHaveText("RO");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Кишинёв/i, {
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/lang=ru/);
  });

  test("dock navigates to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Contact|Контакты/i }).click();
    await expect(page.locator("#contact")).toBeInViewport({ timeout: 15_000 });
  });

  test("contact has map and phone links", async ({ page }) => {
    await page.goto("/#contact");
    const iframe = page.locator("#contact iframe");
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("src", /google\.com\/maps/i);
    await expect(page.locator('#contact a[href^="tel:+373"]')).toHaveCount(2);
  });

  test("maps and route buttons open google", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.locator('#contact a[href*="google.com/maps"]')).toHaveCount(2);
  });
});
