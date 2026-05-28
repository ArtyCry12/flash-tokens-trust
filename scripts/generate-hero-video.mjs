/**
 * Build hero loop from gallery images (requires ffmpeg on PATH or via choco/winget).
 * Output: public/videos/hero.webm, hero.mp4, hero-poster.webp
 *
 * Run: node scripts/generate-hero-video.mjs
 */
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const imagesDir = path.join(root, "public", "images");
const outDir = path.join(root, "public", "videos");
const posterSrc = path.join(imagesDir, "gallery-4.webp");
const posterOut = path.join(outDir, "hero-poster.webp");
const listFile = path.join(outDir, "frames-list.txt");

mkdirSync(outDir, { recursive: true });

if (existsSync(posterSrc)) {
  copyFileSync(posterSrc, posterOut);
  copyFileSync(posterSrc, path.join(root, "public", "seo", "og-poster.webp"));
  console.log("Poster:", posterOut);
}

const galleries = [1, 2, 3, 4, 5]
  .map((n) => path.join(imagesDir, `gallery-${n}.webp`))
  .filter(existsSync);

if (galleries.length === 0) {
  console.warn("No gallery images — skip video encode");
  process.exit(0);
}

const lines = galleries.flatMap((img) => [`file '${img.replace(/\\/g, "/")}'`, "duration 2"]);
lines.push(`file '${galleries[galleries.length - 1].replace(/\\/g, "/")}'`);
writeList(listFile, lines);

try {
  execSync("ffmpeg -version", { stdio: "ignore" });
} catch {
  console.warn("ffmpeg not found — poster only. Install ffmpeg and re-run.");
  process.exit(0);
}

const webm = path.join(outDir, "hero.webm");
const mp4 = path.join(outDir, "hero.mp4");

execSync(
  `ffmpeg -y -f concat -safe 0 -i "${listFile}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p" -c:v libvpx-vp9 -b:v 1M -an -t 12 "${webm}"`,
  { stdio: "inherit" },
);
execSync(
  `ffmpeg -y -f concat -safe 0 -i "${listFile}" -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -c:v libx264 -preset fast -crf 23 -an -t 12 -movflags +faststart "${mp4}"`,
  { stdio: "inherit" },
);
console.log("Created", webm, mp4);

function writeList(file, lines) {
  writeFileSync(file, lines.join("\n"));
}
