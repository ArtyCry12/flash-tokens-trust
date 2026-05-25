import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SRC =
  process.env.FRAMES_SRC ??
  "C:\\Users\\Asus\\Downloads\\_extract_ezgif-7e5497231344c7da-jpg";
const OUT = path.join(process.cwd(), "public", "frames");
const STEP = 2;
const MAX_WIDTH = 1280;
const QUALITY = 82;

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const files = (await fs.readdir(SRC))
    .filter((f) => /^ezgif-frame-\d+\.jpg$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const selected = files.filter((_, i) => i % STEP === 0);
  let index = 1;

  for (const file of selected) {
    const input = path.join(SRC, file);
    const outName = `frame-${String(index).padStart(4, "0")}.webp`;
    const output = path.join(OUT, outName);
    await sharp(input)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);
    index++;
  }

  const manifest = {
    frameCount: selected.length,
    pattern: "/frames/frame-%04d.webp",
    step: STEP,
  };
  await fs.writeFile(
    path.join(OUT, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`Wrote ${selected.length} frames to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
