// Slices the "Brands I've Worked With" board into individual logo tiles
// (dark + light) so they can be shown as a clean, theme-aware logo grid.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const COLS = 9;
const ROWS = 4;

async function sliceBoard(srcPath, outDir) {
  await fs.mkdir(outDir, { recursive: true });
  const img = sharp(srcPath);
  const { width, height } = await img.metadata();
  const cw = Math.floor(width / COLS);
  const ch = Math.floor(height / ROWS);
  let n = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      n++;
      const left = c * cw;
      const top = r * ch;
      const out = path.join(outDir, String(n).padStart(2, "0") + ".webp");
      try {
        await sharp(srcPath)
          .extract({ left, top, width: cw, height: ch })
          .trim({ threshold: 12 })
          .resize(320, 200, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 88 })
          .toFile(out);
      } catch (e) {
        // trim can fail if a cell is uniform; fall back to raw extract
        await sharp(srcPath)
          .extract({ left, top, width: cw, height: ch })
          .resize(320, 200, { fit: "inside" })
          .webp({ quality: 88 })
          .toFile(out);
      }
    }
  }
  return n;
}

const dark = await sliceBoard(
  path.join(PROJECT, "_raw", "me", "clients-trim.png"),
  path.join(PROJECT, "public", "logos", "dark")
);
const light = await sliceBoard(
  path.join(PROJECT, "_raw", "me", "clients-light-trim.png"),
  path.join(PROJECT, "public", "logos", "light")
);
console.log(`Done. dark=${dark} light=${light}`);
