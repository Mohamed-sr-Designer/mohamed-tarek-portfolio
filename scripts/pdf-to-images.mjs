// Rasterizes a PDF's pages to PNG images (pure JS, no system deps).
// Usage: node scripts/pdf-to-images.mjs "<input.pdf>" "<outDir>" [scale] [maxPages]
import { pdf } from "pdf-to-img";
import { promises as fs } from "node:fs";
import path from "node:path";

const [, , input, outDir, scaleArg, maxArg] = process.argv;
const scale = scaleArg ? parseFloat(scaleArg) : 2;
const maxPages = maxArg ? parseInt(maxArg, 10) : Infinity;

if (!input || !outDir) {
  console.error('Usage: node scripts/pdf-to-images.mjs "<input.pdf>" "<outDir>" [scale] [maxPages]');
  process.exit(1);
}

await fs.mkdir(outDir, { recursive: true });
const document = await pdf(input, { scale });
let i = 0;
for await (const image of document) {
  i++;
  if (i > maxPages) break;
  const out = path.join(outDir, `page-${String(i).padStart(3, "0")}.png`);
  await fs.writeFile(out, image);
  console.log(`  ✓ ${out}`);
}
console.log(`Done. ${Math.min(i, maxPages)} pages.`);
