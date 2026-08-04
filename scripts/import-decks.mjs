// Imports the campaign visuals extracted from the two client decks
// (Tilal Village social media, Osolutions x Amam RE) plus the storyboards.
import sharp from "sharp";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");
const TMP = path.join(process.env.TEMP || "/tmp", "pptx-extract");
const SB = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (12)\\story boards";

const ensureDir = async (p) => fs.mkdir(path.dirname(p), { recursive: true });
const hash = async (f) =>
  createHash("md5").update(await fs.readFile(f)).digest("hex");

async function makeBlur(file) {
  const buf = await sharp(file).resize(16).webp({ quality: 22 }).toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

// deck media that is actual client work (logos / benchmark refs excluded)
const JOBS = [
  ...[17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32].map((n, i) => ({
    src: path.join(TMP, "tilal", "ppt", "media", `image${n}.png`),
    out: `work/tilal-social/${String(i + 1).padStart(2, "0")}.webp`,
    width: 1500,
  })),
  { src: path.join(TMP, "tilal", "ppt", "media", "image33.png"), out: "work/tilal-social/site.webp", width: 1800 },
  ...[2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16].map((n, i) => ({
    src: path.join(TMP, "amam", "ppt", "media", `image${n}.png`),
    out: `work/amam-re/${String(i + 1).padStart(2, "0")}.webp`,
    width: 1500,
  })),
  { src: path.join(TMP, "amam", "ppt", "media", "image10.png"), out: "work/amam-re/moodboard.webp", width: 1500 },
];

async function run() {
  // storyboards
  const sbFiles = (await fs.readdir(SB).catch(() => []))
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .sort();
  sbFiles.forEach((f, i) =>
    JOBS.push({
      src: path.join(SB, f),
      out: `work/storyboards/${String(i + 1).padStart(2, "0")}.webp`,
      width: 2000,
    })
  );

  const manifest = JSON.parse(
    await fs.readFile(path.join(PROJECT, "lib", "assets.json"), "utf8")
  );

  const seen = new Map();
  const dupes = [];
  const missing = [];
  let ok = 0;

  for (const { src, out, width } of JOBS) {
    try {
      await fs.access(src);
    } catch {
      missing.push(out);
      continue;
    }
    const h = await hash(src);
    if (seen.has(h)) {
      dupes.push(`${out} (= ${seen.get(h)})`);
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
  }

  await fs.writeFile(
    path.join(PROJECT, "lib", "assets.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`Done. ${ok} imported. storyboards: ${sbFiles.length}`);
  if (dupes.length) console.log("dupes skipped:", dupes.join(", "));
  if (missing.length) console.log("missing:", missing.join(", "));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
