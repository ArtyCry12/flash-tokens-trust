import { expect, test } from "@playwright/test";

test.describe("GELANDEWAGEN landing", () => {
  test("loads hero and main sections (RO)", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/");
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Mercedes Service/i,
    );
    for (const id of [
      "about",
      "services",
      "why",
      "process",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }

    const tel = page.locator('a[href^="tel:+373"]');
    await expect(tel.first()).toBeVisible();
    expect(errors.filter((e) => !e.includes("favicon"))).toEqual([]);
  });

  test("language toggle RU", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /toggle language/i }).click();
    await expect(page).toHaveURL(/lang=ru/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Кишинёв|Chișinău/i,
    );
  });

  test("contact anchors and maps links", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.locator("#contact")).toBeInViewport();
    const maps = page.locator('#contact a[href*="google.com/maps"]');
    await expect(maps.first()).toBeVisible();
  });
});
