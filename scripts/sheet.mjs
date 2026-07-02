// Quick labelled contact sheet for a public/work subfolder.
// Usage: node scripts/sheet.mjs <folder> <out.png>
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const dir = path.join(ROOT, "public", "work", process.argv[2]);
const out = process.argv[3];

const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".webp")).sort();
const TW = 280;
const TH = 300;
const COLS = 6;

const tiles = await Promise.all(
  files.map(async (f, i) => {
    const img = await sharp(path.join(dir, f))
      .resize(TW, TH - 26, { fit: "contain", background: { r: 20, g: 20, b: 20 } })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${TW}" height="26"><rect width="100%" height="100%" fill="#111"/><text x="8" y="18" font-family="Arial" font-size="15" fill="#7CFC00">${f}</text></svg>`
    );
    const labelImg = await sharp(label).png().toBuffer();
    return sharp({
      create: { width: TW, height: TH, channels: 3, background: { r: 20, g: 20, b: 20 } },
    })
      .composite([
        { input: img, left: 0, top: 0 },
        { input: labelImg, left: 0, top: TH - 26 },
      ])
      .png()
      .toBuffer();
  })
);

const rows = Math.ceil(tiles.length / COLS);
await sharp({
  create: { width: TW * COLS, height: TH * rows, channels: 3, background: { r: 20, g: 20, b: 20 } },
})
  .composite(tiles.map((t, i) => ({ input: t, left: (i % COLS) * TW, top: Math.floor(i / COLS) * TH })))
  .png()
  .toFile(out);
console.log(`ok: ${files.length} tiles -> ${out}`);
