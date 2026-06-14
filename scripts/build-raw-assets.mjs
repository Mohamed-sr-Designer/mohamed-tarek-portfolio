// Rasterizes PDF-only source material (Fresh Valley branding frames, the
// portrait + clients board from the portfolio deck) into high-res PNGs in _raw/.
// These are then fed through optimize-assets.mjs like any other source image.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (27)";
const RAW = path.resolve("_raw");

async function firstPage(pdfPath, scale) {
  const doc = await pdf(pdfPath, { scale });
  for await (const img of doc) return img;
}

// A) Fresh Valley branding frames
const fvDir = path.join(SRC, "Branding");
const frames = (await fs.readdir(fvDir)).filter((f) => /\.pdf$/i.test(f));
await fs.mkdir(path.join(RAW, "fv"), { recursive: true });
for (const f of frames) {
  const buf = await firstPage(path.join(fvDir, f), 2.5);
  await sharp(buf)
    .png()
    .toFile(path.join(RAW, "fv", f.replace(/\.pdf$/i, ".png")));
  console.log("  ✓ fv/" + f);
}

// B + C) portrait (page 2) + clients board (page 3) from the deck
const big = path.join(SRC, "Mohamed Tarek Jr. Art Director.pdf");
await fs.mkdir(path.join(RAW, "me"), { recursive: true });
const doc = await pdf(big, { scale: 2 });
let i = 0;
let p2, p3;
for await (const img of doc) {
  i++;
  if (i === 2) p2 = img;
  if (i === 3) {
    p3 = img;
    break;
  }
}

const m2 = await sharp(p2).metadata();
await sharp(p2)
  .extract({
    left: Math.round(m2.width * 0.02),
    top: 0,
    width: Math.round(m2.width * 0.42),
    height: m2.height,
  })
  .png()
  .toFile(path.join(RAW, "me", "portrait.png"));
console.log(`  ✓ me/portrait.png (from ${m2.width}x${m2.height})`);

const m3 = await sharp(p3).metadata();
const crop = {
  left: Math.round(m3.width * 0.05),
  top: Math.round(m3.height * 0.16),
  width: Math.round(m3.width * 0.9),
  height: Math.round(m3.height * 0.66),
};
await sharp(p3).extract(crop).png().toFile(path.join(RAW, "me", "clients.png"));
await sharp(p3)
  .extract(crop)
  .negate({ alpha: false })
  .png()
  .toFile(path.join(RAW, "me", "clients-light.png"));
console.log(`  ✓ me/clients.png (+ light) (from ${m3.width}x${m3.height})`);

console.log("\nDone.");
