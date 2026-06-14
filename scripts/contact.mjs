// Builds contact sheets from a folder of PDFs/images so they can be reviewed fast.
// Usage: node scripts/contact.mjs "<inputFolder>" "<outDir>" [cols] [tile]
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const [, , inDir, outDir, colsArg, tileArg] = process.argv;
const cols = colsArg ? parseInt(colsArg, 10) : 4;
const tile = tileArg ? parseInt(tileArg, 10) : 400;
const perSheet = cols * 4; // 4 rows per sheet

await fs.mkdir(outDir, { recursive: true });
const all = (await fs.readdir(inDir))
  .filter((f) => /\.(pdf|png|jpe?g)$/i.test(f))
  .sort();

async function thumb(file) {
  const full = path.join(inDir, file);
  let buf;
  if (/\.pdf$/i.test(file)) {
    const doc = await pdf(full, { scale: 1 });
    for await (const img of doc) {
      buf = img;
      break;
    }
  } else {
    buf = await fs.readFile(full);
  }
  return sharp(buf)
    .resize(tile, tile, {
      fit: "contain",
      background: { r: 20, g: 20, b: 20 },
    })
    .toBuffer();
}

const mapping = [];
let sheet = 0;
for (let i = 0; i < all.length; i += perSheet) {
  sheet++;
  const batch = all.slice(i, i + perSheet);
  const tiles = [];
  for (let j = 0; j < batch.length; j++) {
    const idx = i + j;
    mapping.push(`[${idx}] ${batch[j]}`);
    const t = await thumb(batch[j]).catch((e) => {
      console.warn(`  ! ${batch[j]}: ${e.message}`);
      return null;
    });
    if (t) tiles.push({ idx: j, buf: t });
  }
  const rows = Math.ceil(batch.length / cols);
  const composite = tiles.map((t) => ({
    input: t.buf,
    left: (t.idx % cols) * tile,
    top: Math.floor(t.idx / cols) * tile,
  }));
  const out = path.join(outDir, `sheet-${sheet}.png`);
  await sharp({
    create: {
      width: cols * tile,
      height: rows * tile,
      channels: 3,
      background: { r: 10, g: 10, b: 10 },
    },
  })
    .composite(composite)
    .png()
    .toFile(out);
  console.log(`  ✓ ${out}`);
}

console.log("\nINDEX MAP:");
console.log(mapping.join("\n"));
