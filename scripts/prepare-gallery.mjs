import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const frames = [1, 30, 60, 90, 120];
const outDir = path.join(process.cwd(), "public", "images");

await fs.mkdir(outDir, { recursive: true });

let i = 1;
for (const n of frames) {
  const src = path.join(process.cwd(), "public", "frames", `frame-${String(n).padStart(4, "0")}.webp`);
  const dest = path.join(outDir, `gallery-${i}.webp`);
  await sharp(src).resize(800).webp({ quality: 85 }).toFile(dest);
  i++;
}

const poster = path.join(process.cwd(), "public", "og-poster.webp");
await sharp(path.join(process.cwd(), "public", "frames", "frame-0001.webp"))
  .resize(1200)
  .webp({ quality: 88 })
  .toFile(poster);

console.log("Gallery and OG poster ready");
