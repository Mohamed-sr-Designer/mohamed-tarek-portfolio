// Compresses curated source videos to web-ready MP4 + poster, and writes
// lib/motion.json. Uses the bundled ffmpeg-static binary (no system ffmpeg).
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const SRC = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (27)\\videos and motion";
const OUT = path.join(PROJECT, "public", "motion");

// [source file, slug, title, kind]
const LIST = [
  ["Video.mp4", "tilal-film", "Tilal Village — Brand Film", "Real Estate · Film"],
  ["v3.mp4", "tilal-aerial", "Tilal Village — Aerial", "Real Estate · Motion"],
  ["v4.mp4", "tilal-community", "Tilal Village — Community", "Real Estate · Motion"],
  ["Comp 3_3.mp4", "social-motion", "Social Motion", "Social · Animation"],
  ["Ai option.mp4", "ai-motion", "AI-Generated Spot", "AI · Motion"],
  ["D:\\New folder (5)\\2.mp4", "teaser", "Cinematic Teaser", "Motion · Teaser"],
  ["D:\\New folder (5)\\3.mp4", "space", "Interior Reveal", "Motion · Space"],
  ["D:\\magnific_cinematic-coffee-shop-adv_3GgbvunREY (1).mp4", "coffee-ad", "Coffee Shop — Cinematic Ad", "AI · Cinematic"],
  ["C:\\Users\\tarek\\Downloads\\Video v5.mp4", "film-2024", "2024 — Brand Film", "Brand · Film"],
  ["C:\\Users\\tarek\\Downloads\\alpha_13_prob3.mp4", "alpha", "Motion Study", "Motion · Experimental"],
  ["C:\\Users\\tarek\\Downloads\\Video promo #02.mp4", "promo-02", "Promo 02", "Social · Promo"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (16)\\1.mp4", "reel-a", "Social Reel", "Social · Reel"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (16)\\2.mp4", "reel-b", "Social Reel", "Social · Reel"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (16)\\3.mp4", "reel-c", "Social Reel", "Social · Reel"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (16)\\4.mp4", "reel-d", "Motion Loop", "Motion · Loop"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (16)\\5.mp4", "reel-e", "Motion Loop", "Motion · Loop"],
];

await fs.mkdir(OUT, { recursive: true });
const manifest = [];

for (const [file, slug, title, kind] of LIST) {
  const input = path.isAbsolute(file) ? file : path.join(SRC, file);
  try {
    await fs.access(input);
  } catch {
    console.warn("  ! missing: " + file);
    continue;
  }
  const mp4 = path.join(OUT, slug + ".mp4");
  const poster = path.join(OUT, slug + ".jpg");

  // skip re-encoding if already produced (keeps re-runs fast)
  let already = false;
  try {
    await fs.access(mp4);
    await fs.access(poster);
    already = true;
  } catch {}
  if (already) {
    const meta = await sharp(poster).metadata();
    manifest.push({
      slug,
      title,
      kind,
      src: "/motion/" + slug + ".mp4",
      poster: "/motion/" + slug + ".jpg",
      width: meta.width,
      height: meta.height,
    });
    console.log(`  - ${slug} (cached)`);
    continue;
  }

  // poster
  execFileSync(
    ffmpegPath,
    ["-y", "-ss", "1", "-i", input, "-frames:v", "1",
     "-vf", "scale='min(1200,iw)':'min(1200,ih)':force_original_aspect_ratio=decrease", poster],
    { stdio: "ignore" }
  );
  // web video (fits within 1280 box, h264, faststart)
  execFileSync(
    ffmpegPath,
    ["-y", "-i", input,
     "-vf", "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
     "-c:v", "libx264", "-crf", "27", "-preset", "veryfast", "-pix_fmt", "yuv420p",
     "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", mp4],
    { stdio: "ignore" }
  );

  const meta = await sharp(poster).metadata();
  manifest.push({
    slug,
    title,
    kind,
    src: "/motion/" + slug + ".mp4",
    poster: "/motion/" + slug + ".jpg",
    width: meta.width,
    height: meta.height,
  });
  const kb = Math.round((await fs.stat(mp4)).size / 1024);
  console.log(`  ✓ ${slug}  ${meta.width}x${meta.height}  ${kb}KB`);
}

await fs.writeFile(
  path.join(PROJECT, "lib", "motion.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("\nDone. " + manifest.length + " videos.");
