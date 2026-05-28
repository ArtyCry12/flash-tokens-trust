import { expect, test } from "@playwright/test";

const paths = ["/", "/?lang=ru"] as const;

for (const path of paths) {
  test(`visual snapshot ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("#hero")).toBeVisible();
    await page.screenshot({
      path: `test-results/visual${path.replace(/\?/g, "-").replace(/=/g, "-") || "-home"}.png`,
      fullPage: true,
    });
  });
}
