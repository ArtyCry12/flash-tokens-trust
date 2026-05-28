/**
 * Optional: encode hero.webm from gallery slideshow (requires ffmpeg).
 * Hero background uses public/videos/hero.mp4 (Seedance) — no separate poster file.
 *
 * Run: node scripts/generate-hero-video.mjs
 */
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const imagesDir = path.join(root, "public", "images");
const outDir = path.join(root, "public", "videos");
const listFile = path.join(outDir, "frames-list.txt");
const ogSrc = path.join(imagesDir, "gallery-4.webp");
const ogOut = path.join(root, "public", "seo", "og-poster.webp");

mkdirSync(outDir, { recursive: true });

if (existsSync(ogSrc)) {
  copyFileSync(ogSrc, ogOut);
  copyFileSync(ogSrc, path.join(root, "public", "og-poster.webp"));
  console.log("OG poster:", ogOut);
}

const heroMp4 = path.join(outDir, "hero.mp4");
if (existsSync(heroMp4)) {
  console.log("Hero MP4 present:", heroMp4);
} else {
  console.warn("Missing hero.mp4 — add Seedance export to public/videos/hero.mp4");
}

const galleries = [1, 2, 3, 4, 5]
  .map((n) => path.join(imagesDir, `gallery-${n}.webp`))
  .filter(existsSync);

if (galleries.length === 0) {
  console.warn("No gallery images — skip optional webm encode");
  process.exit(0);
}

const lines = galleries.flatMap((img) => [`file '${img.replace(/\\/g, "/")}'`, "duration 2"]);
lines.push(`file '${galleries[galleries.length - 1].replace(/\\/g, "/")}'`);
writeFileSync(listFile, lines.join("\n"));

try {
  execSync("ffmpeg -version", { stdio: "ignore" });
} catch {
  console.warn("ffmpeg not found — skip webm encode");
  process.exit(0);
}

const webm = path.join(outDir, "hero.webm");
execSync(
  `ffmpeg -y -f concat -safe 0 -i "${listFile}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" -c:v libvpx-vp9 -b:v 1M -an -t 12 "${webm}"`,
  { stdio: "inherit" },
);
console.log("Created", webm);
