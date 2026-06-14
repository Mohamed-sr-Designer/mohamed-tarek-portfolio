// Rasterizes every page of every PDF in a folder. Usage:
// node scripts/raster-folder.mjs "<inDir>" "<outDir>" [scale]
import { pdf } from "pdf-to-img";
import { promises as fs } from "node:fs";
import path from "node:path";

const [, , inDir, outDir, scaleArg] = process.argv;
const scale = scaleArg ? parseFloat(scaleArg) : 2;
await fs.mkdir(outDir, { recursive: true });
const pdfs = (await fs.readdir(inDir)).filter((f) => /\.pdf$/i.test(f)).sort();
for (const f of pdfs) {
  const doc = await pdf(path.join(inDir, f), { scale });
  let i = 0;
  for await (const img of doc) {
    i++;
    const out = path.join(
      outDir,
      f.replace(/\.pdf$/i, "") + "-p" + String(i).padStart(2, "0") + ".png"
    );
    await fs.writeFile(out, img);
  }
  console.log(`  ✓ ${f} (${i}p)`);
}
console.log("Done.");
