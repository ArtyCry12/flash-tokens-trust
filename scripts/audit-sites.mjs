/**
 * Playwright audit: legacy + prototype screenshots and link check.
 * Run: node scripts/audit-sites.mjs
 */
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "docs", "research");
const SITES = [
  {
    id: "mercedesservice-md",
    url: "https://www.mercedesservice.md/",
  },
  {
    id: "vercel-prototype",
    url: "https://flash-tokens-trust.vercel.app/?lang=ru",
  },
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

async function auditSite(browser, site) {
  const dir = path.join(OUT, site.id);
  await mkdir(dir, { recursive: true });
  const report = { url: site.url, viewports: [], links: [], consoleErrors: [] };

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: vp });
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    const res = await page.goto(site.url, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });
    report.viewports.push({
      name: vp.name,
      status: res?.status() ?? null,
      title: await page.title(),
    });
    await page.screenshot({
      path: path.join(dir, `${vp.name}.png`),
      fullPage: true,
    });
    report.consoleErrors.push(...errors);
    await page.close();
  }

  const page = await browser.newPage();
  await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  const links = await page.$$eval("a[href]", (as) =>
    as.map((a) => ({ href: a.getAttribute("href"), text: a.textContent?.trim().slice(0, 80) })),
  );
  report.links = links.slice(0, 50);
  await page.close();

  await writeFile(path.join(dir, "playwright-report.json"), JSON.stringify(report, null, 2));
  return report;
}

const browser = await chromium.launch();
try {
  for (const site of SITES) {
    console.log("Auditing", site.url);
    await auditSite(browser, site);
  }
} finally {
  await browser.close();
}
console.log("Done → docs/research/*/playwright-report.json + screenshots");
