/**
 * Convert OG source PNG → public/og-poster.webp + public/seo/og-poster.webp
 * Usage: node scripts/sync-og-poster.mjs [path-to-png]
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const defaultSrc = path.join(
  root,
  "public",
  "images",
  "incoming",
  "og-gelenwagen.png",
);
const src = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;

if (!existsSync(src)) {
  console.error("Missing OG source:", src);
  console.error("Drop your PNG as public/images/incoming/og-gelenwagen.png and re-run.");
  process.exit(1);
}

const outA = path.join(root, "public", "og-poster.webp");
const outB = path.join(root, "public", "seo", "og-poster.webp");
mkdirSync(path.dirname(outB), { recursive: true });

const pipeline = sharp(src).resize(1200, 630, { fit: "cover", position: "centre" }).webp({
  quality: 90,
});

await pipeline.toFile(outA);
copyFileSync(outA, outB);
console.log("Wrote", outA, outB);
