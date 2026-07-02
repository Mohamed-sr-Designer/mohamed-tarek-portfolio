// Builds a quick montage of logo tiles to inspect quality issues.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOGOS = path.join(ROOT, "public", "logos", "dark");
const OUT = process.argv[2] || path.join(ROOT, "..", "logo-sample.png");

const tiles = [];
for (let i = 1; i <= 36; i++) {
  const n = String(i).padStart(2, "0");
  tiles.push(
    sharp(path.join(LOGOS, `${n}.webp`))
      .resize(200, 132, { fit: "contain", background: { r: 24, g: 23, b: 21, alpha: 1 } })
      .flatten({ background: { r: 24, g: 23, b: 21 } })
      .toBuffer()
  );
}
const bufs = await Promise.all(tiles);
const comps = bufs.map((b, i) => ({
  input: b,
  left: (i % 6) * 200,
  top: Math.floor(i / 6) * 132,
}));
await sharp({
  create: { width: 1200, height: 792, channels: 3, background: { r: 24, g: 23, b: 21 } },
})
  .composite(comps)
  .png()
  .toFile(OUT);
console.log("written:", OUT);
