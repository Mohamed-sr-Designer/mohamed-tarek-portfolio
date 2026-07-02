// Rasterizes the Fresh Valley brand book PDF into flipbook pages
// (public/book/fresh-valley/pNN.webp) + lib/book-fresh-valley.json manifest.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC =
  "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (38)\\Fresh vall\\Marketing X Design Direction X Rebranding.pdf";
const OUT = path.join(ROOT, "public", "book", "fresh-valley");

await fs.mkdir(OUT, { recursive: true });

const doc = await pdf(SRC, { scale: 1.6 });
console.log(`pages: ${doc.length}`);

const pages = [];
let i = 0;
for await (const image of doc) {
  i++;
  const n = String(i).padStart(2, "0");
  const out = path.join(OUT, `p${n}.webp`);
  const info = await sharp(image)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);
  pages.push({
    src: `/book/fresh-valley/p${n}.webp`,
    width: info.width,
    height: info.height,
  });
  if (i % 10 === 0) console.log(`  ...${i}`);
}

await fs.writeFile(
  path.join(ROOT, "lib", "book-fresh-valley.json"),
  JSON.stringify(pages, null, 2)
);
console.log(`Done. ${pages.length} pages rasterized.`);
