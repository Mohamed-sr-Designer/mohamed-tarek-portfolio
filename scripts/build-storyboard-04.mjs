// Composes a fourth storyboard from the AI Video Production scenes, laid out
// as a 4-across x 3-down matrix of numbered frames on the same dark board as
// the other three. Twelve frames: scenes 5 and 11 are dropped from the run of
// fourteen because they repeat the beat either side of them.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");
const SRC = path.join(PUBLIC, "work", "video-production");

const COLS = 4;
const ROWS = 3;
const CW = 400; // 16:9 frame
const CH = Math.round((CW * 9) / 16);
const CAP = 30; // caption strip under each frame
const GAP = 10;
const PAD = 28;

const W = PAD * 2 + COLS * CW + (COLS - 1) * GAP;
const H = PAD * 2 + ROWS * (CH + CAP) + (ROWS - 1) * GAP;

const SCENES = [1, 2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14];
const frames = SCENES.map((n) =>
  path.join(SRC, `sc-${String(n).padStart(2, "0")}.webp`)
);

const caption = (n) =>
  sharp(
    Buffer.from(
      `<svg width="${CW}" height="${CAP}">
         <rect width="100%" height="100%" fill="#121110"/>
         <text x="10" y="20" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#FF5A1F">${n}</text>
       </svg>`
    )
  )
    .png()
    .toBuffer();

const composite = [];
for (let i = 0; i < frames.length; i++) {
  const c = i % COLS;
  const r = Math.floor(i / COLS);
  const left = PAD + c * (CW + GAP);
  const top = PAD + r * (CH + CAP + GAP);

  composite.push({
    input: await sharp(frames[i]).resize(CW, CH, { fit: "cover" }).toBuffer(),
    left,
    top,
  });
  composite.push({
    input: await caption(String(i + 1).padStart(2, "0")),
    left,
    top: top + CH,
  });
}

await sharp({
  create: { width: W, height: H, channels: 3, background: { r: 16, g: 15, b: 13 } },
})
  .composite(composite)
  .webp({ quality: 84, effort: 5 })
  .toFile(path.join(PUBLIC, "work", "storyboards", "04.webp"));

// keep the asset manifest in step
const manifestPath = path.join(PROJECT, "lib", "assets.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const out = path.join(PUBLIC, "work", "storyboards", "04.webp");
const meta = await sharp(out).metadata();
manifest["/work/storyboards/04.webp"] = {
  width: meta.width,
  height: meta.height,
  blur: `data:image/webp;base64,${(await sharp(out).resize(16).webp({ quality: 22 }).toBuffer()).toString("base64")}`,
};
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`storyboard 04: ${meta.width}x${meta.height} — ${COLS}x${ROWS} matrix, ${frames.length} frames`);
