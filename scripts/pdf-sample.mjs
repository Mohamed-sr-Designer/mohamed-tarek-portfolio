// Samples every Nth page of a big PDF into small numbered tiles + contact
// sheets, so we can locate a section visually.
// Usage: node scripts/pdf-sample.mjs <pdf> <outDir> [step] [scale]
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
const OUT = process.argv[3];
const STEP = Number(process.argv[4] || 20);
const SCALE = Number(process.argv[5] || 0.4);

await fs.mkdir(OUT, { recursive: true });
const doc = await pdf(SRC, { scale: SCALE });
console.log(`pages: ${doc.length}, sampling every ${STEP}`);

const TW = 240;
const TH = 165;
const tiles = [];
const labels = [];
let i = 0;
for await (const image of doc) {
  i++;
  if (i % STEP !== 1) continue;
  const img = await sharp(image)
    .resize(TW, TH - 20, { fit: "contain", background: { r: 15, g: 15, b: 15 } })
    .toBuffer();
  const label = await sharp(
    Buffer.from(
      `<svg width="${TW}" height="20"><rect width="100%" height="100%" fill="#000"/><text x="6" y="15" font-family="Arial" font-size="13" fill="#7CFC00">p${i}</text></svg>`
    )
  )
    .png()
    .toBuffer();
  const tile = await sharp({
    create: { width: TW, height: TH, channels: 3, background: { r: 15, g: 15, b: 15 } },
  })
    .composite([
      { input: img, left: 0, top: 0 },
      { input: label, left: 0, top: TH - 20 },
    ])
    .png()
    .toBuffer();
  tiles.push(tile);
  labels.push(i);
}

const COLS = 8;
const PER_SHEET = 48;
for (let s = 0; s * PER_SHEET < tiles.length; s++) {
  const chunk = tiles.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
  const rows = Math.ceil(chunk.length / COLS);
  await sharp({
    create: {
      width: TW * COLS,
      height: TH * rows,
      channels: 3,
      background: { r: 15, g: 15, b: 15 },
    },
  })
    .composite(
      chunk.map((t, j) => ({
        input: t,
        left: (j % COLS) * TW,
        top: Math.floor(j / COLS) * TH,
      }))
    )
    .png()
    .toFile(path.join(OUT, `sample-${s + 1}.png`));
}
console.log(`Done: ${tiles.length} sampled pages -> sheets in ${OUT}`);
