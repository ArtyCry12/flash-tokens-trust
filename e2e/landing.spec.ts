import { expect, test } from "@playwright/test";

test.describe("GELANDEWAGEN landing", () => {
  test("loads hero and main sections (RO)", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Mercedes Service/i,
    );
    for (const id of ["about", "services", "why", "process", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.locator("#cta")).toHaveCount(0);
    await expect(page.getByRole("complementary")).toBeVisible();

    const tel = page.locator('#contact a[href^="tel:+373"]');
    await expect(tel.first()).toBeVisible();
    await expect(tel.first()).toHaveCSS("color", "rgb(255, 255, 255)");

    const serviceCards = page.locator("#services ul li");
    await expect(serviceCards).toHaveCount(8);

    expect(
      errors.filter(
        (e) =>
          !e.includes("favicon") &&
          !e.includes("hero.webm") &&
          !e.includes("THREE.Clock"),
      ),
    ).toEqual([]);
  });

  test("language toggle RU", async ({ page }) => {
    await page.goto("/?lang=ro", { waitUntil: "load" });
    const langBtn = page.getByRole("button", { name: /toggle language/i });
    await expect(langBtn).toHaveText("RU");
    await langBtn.click();
    await expect(langBtn).toHaveText("RO");
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
