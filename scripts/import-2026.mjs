// Imports the 2026 portfolio content from "New folder (12)" into /public as
// optimized WebP, and rewrites lib/assets.json (dimensions + blur placeholders).
// Old /work, /book and /slider media are cleared first.
// Duplicates (same file content) are imported once and reported.
import sharp from "sharp";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");
const SRC = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (12)";

const ensureDir = async (p) => fs.mkdir(path.dirname(p), { recursive: true });
const IMG = /\.(jpe?g|png|webp)$/i;

const listImages = async (dir) => {
  try {
    const names = (await fs.readdir(dir)).filter((n) => IMG.test(n)).sort();
    return names.map((n) => path.join(dir, n));
  } catch {
    return [];
  }
};

const hash = async (f) =>
  createHash("md5").update(await fs.readFile(f)).digest("hex");

async function makeBlur(file) {
  const buf = await sharp(file).resize(16).webp({ quality: 22 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

// ---------------------------------------------------------------- plan
const AI = path.join(SRC, "Ai Work Flow");
const PHOTO = path.join(AI, "Photo Sissions");
const VIDEO = path.join(AI, "Video Production");
const SOCIAL = path.join(SRC, "Social Media designs");

// folder -> [outPrefix, width]
const SOCIAL_SLUGS = {
  Amam: "amam",
  "Brand Vitals": "brand-vitals",
  "El Raghi": "el-raghi",
  FreshVally: "fresh-valley",
  GF: "gf",
  "HR Link": "hr-link",
  "Next Academy": "next-academy",
  "The Nine": "the-nine",
  "Tilal V": "tilal-v",
};

async function buildJobs() {
  const jobs = []; // { src, out, width }
  const push = (src, out, width) => jobs.push({ src, out, width });

  // --- Photo Sessions ---
  const before = await listImages(path.join(PHOTO, "Orginal Images"));
  before.forEach((f, i) =>
    push(f, `work/photo-sessions/before-${String(i + 1).padStart(2, "0")}.webp`, 1600)
  );
  const after = await listImages(path.join(PHOTO, "After"));
  after.forEach((f, i) =>
    push(f, `work/photo-sessions/after-${String(i + 1).padStart(2, "0")}.webp`, 1600)
  );
  push(path.join(PHOTO, "The Flow.png"), "work/photo-sessions/flow.webp", 2000);

  // --- Video Production ---
  const chars = await listImages(path.join(VIDEO, "Charcactar"));
  chars.forEach((f, i) =>
    push(f, `work/video-production/char-${String(i + 1).padStart(2, "0")}.webp`, 1400)
  );
  const sc = await listImages(path.join(VIDEO, "SC"));
  sc.forEach((f, i) =>
    push(f, `work/video-production/sc-${String(i + 1).padStart(2, "0")}.webp`, 1600)
  );
  push(path.join(VIDEO, "The Flow.png"), "work/video-production/flow.webp", 2000);

  // --- Social media projects ---
  for (const [folder, slug] of Object.entries(SOCIAL_SLUGS)) {
    const imgs = await listImages(path.join(SOCIAL, folder));
    imgs.forEach((f, i) =>
      push(f, `work/social/${slug}/${String(i + 1).padStart(2, "0")}.webp`, 1400)
    );
  }

  // --- Loop slider ---
  const slider = await listImages(path.join(SRC, "Loop Slider"));
  slider.forEach((f, i) =>
    push(f, `slider/${String(i + 1).padStart(2, "0")}.webp`, 900)
  );

  // --- Master visuals (covers / heroes) ---
  const master = await listImages(path.join(SRC, "Master Vusels"));
  master.forEach((f, i) =>
    push(f, `work/master/${String(i + 1).padStart(2, "0")}.webp`, 2000)
  );

  return jobs;
}

async function run() {
  // 1) clear old portfolio media
  for (const d of ["work", "book", "slider"]) {
    await fs.rm(path.join(PUBLIC, d), { recursive: true, force: true });
  }
  console.log("Cleared old /work, /book, /slider");

  // 2) keep non-portfolio manifest entries (me, logos, web, og)
  let manifest = {};
  try {
    const prev = JSON.parse(
      await fs.readFile(path.join(PROJECT, "lib", "assets.json"), "utf8")
    );
    for (const [k, v] of Object.entries(prev)) {
      if (!/^\/(work|book|slider)\//.test(k)) manifest[k] = v;
    }
  } catch {}
  console.log(`Kept ${Object.keys(manifest).length} non-portfolio entries`);

  // 3) import, skipping duplicate file contents
  const jobs = await buildJobs();
  const seen = new Map(); // hash -> out
  const dupes = [];
  let ok = 0;
  const missing = [];

  for (const { src, out, width } of jobs) {
    try {
      await fs.access(src);
    } catch {
      missing.push(path.basename(src));
      continue;
    }
    const h = await hash(src);
    if (seen.has(h)) {
      dupes.push(`${out}  (same as ${seen.get(h)})`);
      continue;
    }
    seen.set(h, out);

    const outPath = path.join(PUBLIC, out);
    await ensureDir(outPath);
    const info = await sharp(src)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);
    manifest["/" + out] = {
      width: info.width,
      height: info.height,
      blur: await makeBlur(src),
    };
    ok++;
    if (ok % 25 === 0) console.log(`  ...${ok}`);
  }

  await fs.writeFile(
    path.join(PROJECT, "lib", "assets.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`\nDone. ${ok} images imported.`);
  if (dupes.length) {
    console.log(`Skipped ${dupes.length} duplicate(s):`);
    dupes.forEach((d) => console.log("  - " + d));
  }
  if (missing.length) console.log(`Missing: ${missing.join(", ")}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
