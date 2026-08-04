// Compresses the 2026 videos from "New folder (12)" into web-ready MP4 + poster
// and writes lib/motion.json. Landscape and Portrait stay separate collections.
// Duplicate files (same content) are encoded once and reused.
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const OUT = path.join(PROJECT, "public", "motion");
const SRC = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (12)";

const hash = async (f) =>
  createHash("md5").update(await fs.readFile(f)).digest("hex");

const listVideos = async (dir) => {
  try {
    return (await fs.readdir(dir))
      .filter((n) => /\.(mp4|mov|webm)$/i.test(n))
      .sort()
      .map((n) => path.join(dir, n));
  } catch {
    return [];
  }
};

// Nice display title from a messy filename
const titleFrom = (file) =>
  path
    .basename(file, path.extname(file))
    .replace(/[_-]+/g, " ")
    .replace(/\(\d+\)/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

async function encode(src, slug) {
  const mp4 = path.join(OUT, `${slug}.mp4`);
  const poster = path.join(OUT, `${slug}.jpg`);
  execFileSync(
    ffmpegPath,
    ["-y", "-ss", "0.5", "-i", src, "-frames:v", "1",
     "-vf", "scale='min(1200,iw)':-2", poster],
    { stdio: "ignore" }
  );
  execFileSync(
    ffmpegPath,
    ["-y", "-i", src,
     "-vf", "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
     "-c:v", "libx264", "-crf", "28", "-preset", "veryfast", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", mp4],
    { stdio: "ignore" }
  );
  const meta = await sharp(poster).metadata();
  const kb = Math.round((await fs.stat(mp4)).size / 1024);
  return { width: meta.width, height: meta.height, kb };
}

async function run() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  const groups = [
    { key: "landscape", dir: path.join(SRC, "Videos", "Landscape") },
    { key: "portrait", dir: path.join(SRC, "Videos", "Portirait") },
    {
      key: "production",
      dir: path.join(SRC, "Ai Work Flow", "Video Production", "Video"),
    },
  ];

  const seen = new Map(); // hash -> { slug, entry }
  const dupes = [];
  const out = [];

  for (const { key, dir } of groups) {
    const files = await listVideos(dir);
    let i = 0;
    for (const f of files) {
      const h = await hash(f);
      if (seen.has(h)) {
        const prev = seen.get(h);
        dupes.push(`${key}/${path.basename(f)} -> reuses ${prev.slug}`);
        // still list it under this collection, pointing at the same file
        out.push({ ...prev.entry, collection: key });
        continue;
      }
      i++;
      const slug = `${key}-${String(i).padStart(2, "0")}`;
      const { width, height, kb } = await encode(f, slug);
      const entry = {
        slug,
        title: titleFrom(f),
        kind: key === "portrait" ? "Social · Reel" : key === "production" ? "Campaign · Film" : "Brand · Film",
        collection: key,
        src: `/motion/${slug}.mp4`,
        poster: `/motion/${slug}.jpg`,
        width,
        height,
      };
      out.push(entry);
      seen.set(h, { slug, entry });
      console.log(`  ✓ ${slug}  ${width}x${height}  ${kb}KB  (${path.basename(f)})`);
    }
  }

  await fs.writeFile(
    path.join(PROJECT, "lib", "motion.json"),
    JSON.stringify(out, null, 2)
  );
  console.log(`\nDone. ${out.length} entries (${seen.size} encoded).`);
  if (dupes.length) {
    console.log("Duplicates reused:");
    dupes.forEach((d) => console.log("  - " + d));
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
