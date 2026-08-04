// Contact sheet for extracted PPTX media, so we can see what each deck holds.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const dir = process.argv[2];
const out = process.argv[3];
const files = (await fs.readdir(dir))
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, ""), 10) || 0;
    const nb = parseInt(b.replace(/\D/g, ""), 10) || 0;
    return na - nb;
  });

const TW = 260;
const TH = 190;
const COLS = 6;
const tiles = await Promise.all(
  files.map(async (f) => {
    const img = await sharp(path.join(dir, f))
      .resize(TW, TH - 22, { fit: "contain", background: { r: 18, g: 18, b: 18 } })
      .flatten({ background: { r: 18, g: 18, b: 18 } })
      .toBuffer();
    const label = await sharp(
      Buffer.from(
        `<svg width="${TW}" height="22"><rect width="100%" height="100%" fill="#000"/><text x="6" y="16" font-family="Arial" font-size="13" fill="#7CFC00">${f}</text></svg>`
      )
    ).png().toBuffer();
    return sharp({
      create: { width: TW, height: TH, channels: 3, background: { r: 18, g: 18, b: 18 } },
    })
      .composite([{ input: img, top: 0, left: 0 }, { input: label, top: TH - 22, left: 0 }])
      .png()
      .toBuffer();
  })
);

const rows = Math.ceil(tiles.length / COLS);
await sharp({
  create: { width: TW * COLS, height: TH * rows, channels: 3, background: { r: 18, g: 18, b: 18 } },
})
  .composite(tiles.map((t, i) => ({ input: t, left: (i % COLS) * TW, top: Math.floor(i / COLS) * TH })))
  .png()
  .toFile(out);
console.log(`ok: ${files.length} tiles -> ${out}`);
