// Rebuilds the 36 client logos from the master sheet (_raw/me/clients-trim.png,
// a clean 9x4 grid of white logos on a dark gradient) into transparent,
// uniformly-margined marks:
//   public/logos/dark/NN.webp  = bone-white logo on transparency (dark theme)
//   public/logos/light/NN.webp = ink logo on transparency        (light theme)
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SHEET = path.join(ROOT, "_raw", "me", "clients-trim.png");
const DARK = path.join(ROOT, "public", "logos", "dark");
const LIGHT = path.join(ROOT, "public", "logos", "light");

const COLS = 9;
const ROWS = 4;
const CANVAS_W = 420;
const CANVAS_H = 280;
const BOX_W = 300;
const BOX_H = 170;

const meta = await sharp(SHEET).metadata();

// ---- gap detection: find the 9 column bands and 4 row bands of actual
// logo content (projection profiles on a thresholded grayscale sheet) ----
const { data: sheetGray, info: SI } = await sharp(SHEET)
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

function bands(axisLen, otherLen, sample, mergeGap, expected) {
  const profile = new Array(axisLen).fill(0);
  for (let a = 0; a < axisLen; a++) {
    let count = 0;
    for (let b = 0; b < otherLen; b++) if (sample(a, b) > 130) count++;
    profile[a] = count;
  }
  const minCount = Math.max(1, Math.round(otherLen * 0.002));
  // raw runs of content
  const runs = [];
  let start = -1;
  for (let a = 0; a < axisLen; a++) {
    const on = profile[a] >= minCount;
    if (on && start < 0) start = a;
    if (!on && start >= 0) {
      runs.push([start, a - 1]);
      start = -1;
    }
  }
  if (start >= 0) runs.push([start, axisLen - 1]);
  // merge runs separated by small gaps (letter spacing, icon/text gaps)
  const merged = [runs[0]];
  for (let i = 1; i < runs.length; i++) {
    const prev = merged[merged.length - 1];
    if (runs[i][0] - prev[1] <= mergeGap) prev[1] = runs[i][1];
    else merged.push(runs[i]);
  }
  if (merged.length !== expected) {
    console.warn(
      `  ! expected ${expected} bands, got ${merged.length}: ${JSON.stringify(merged)}`
    );
  }
  return merged;
}

const colBands = bands(
  SI.width,
  SI.height,
  (x, y) => sheetGray[y * SI.width + x],
  Math.round(SI.width * 0.016),
  COLS
);
const rowBands = bands(
  SI.height,
  SI.width,
  (y, x) => sheetGray[y * SI.width + x],
  Math.round(SI.height * 0.03),
  ROWS
);

async function cell(r, c) {
  const [x0, x1] = colBands[c];
  const [y0, y1] = rowBands[r];
  const pad = 6;
  const left = Math.max(0, x0 - pad);
  const top = Math.max(0, y0 - pad);
  const cropped = await sharp(SHEET)
    .extract({
      left,
      top,
      width: Math.min(SI.width - left, x1 - x0 + pad * 2),
      height: Math.min(SI.height - top, y1 - y0 + pad * 2),
    })
    .png()
    .toBuffer();

  // tight-trim the mark inside its cell (gradient bg → generous threshold)
  let buf;
  try {
    buf = await sharp(cropped).trim({ threshold: 45 }).png().toBuffer();
  } catch {
    buf = cropped;
  }

  // luminance → alpha: gradient bg (~30-85) → transparent, light mark → opaque
  const { data, info } = await sharp(buf)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let i = 0; i < alpha.length; i++) {
    alpha[i] = Math.max(0, Math.min(255, Math.round((data[i] - 95) * 2.6)));
  }
  const mask = await sharp(alpha, {
    raw: { width: info.width, height: info.height, channels: 1 },
  })
    .png()
    .toBuffer();
  return { mask, w: info.width, h: info.height };
}

async function render({ mask, w, h }, rgb, out) {
  const solid = await sharp({
    create: { width: w, height: h, channels: 3, background: rgb },
  })
    .joinChannel(mask)
    .png()
    .toBuffer();

  const fitted = await sharp(solid)
    .resize(BOX_W, BOX_H, { fit: "inside" })
    .toBuffer();
  const fm = await sharp(fitted).metadata();

  await sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: fitted,
        left: Math.round((CANVAS_W - fm.width) / 2),
        top: Math.round((CANVAS_H - fm.height) / 2),
      },
    ])
    .webp({ quality: 90, alphaQuality: 90 })
    .toFile(out);
}

let ok = 0;
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const n = String(r * COLS + c + 1).padStart(2, "0");
    try {
      const m = await cell(r, c);
      await render(m, { r: 245, g: 243, b: 238 }, path.join(DARK, `${n}.webp`));
      await render(m, { r: 30, g: 29, b: 26 }, path.join(LIGHT, `${n}.webp`));
      ok++;
    } catch (e) {
      console.warn(`  ! ${n}: ${e.message}`);
    }
  }
}
console.log(
  `Done. ${ok}/36 logos rebuilt from sheet (${meta.width}x${meta.height}, ${colBands.length} cols x ${rowBands.length} rows).`
);
