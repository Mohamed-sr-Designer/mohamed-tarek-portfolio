// Captures live-site screenshots for the vibe-coded web projects.
// Uses thum.io full-page render (waits for load) and keeps the top 16:10 slice,
// so the hero is fully rendered (no blank/half-loaded frames).
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

const targets = [
  ["https://mohamed-sr-designer.github.io/tilal-village/", "tilal", 0],
  ["https://mohamed-sr-designer.github.io/jadeite-office-villas/", "jadeite", 0],
  ["https://mohamed-sr-designer.github.io/fresh-valley/", "fresh-valley", 0],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(url, name, cropLeft = 0) {
  const api =
    "https://s.wordpress.com/mshots/v1/" +
    encodeURIComponent(url) +
    "?w=1600&h=1000";
  for (let i = 0; i < 14; i++) {
    const res = await fetch(api);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 35000) {
      await fs.mkdir(OUT, { recursive: true });
      let img = sharp(buf);
      if (cropLeft > 0) {
        const m = await img.metadata();
        const left = Math.round((m.width || 1600) * cropLeft);
        img = sharp(buf).extract({
          left,
          top: 0,
          width: (m.width || 1600) - left,
          height: m.height || 1000,
        });
      }
      await img
        .resize(1600, 1000, { fit: "cover", position: "top" })
        .webp({ quality: 86 })
        .toFile(path.join(OUT, name + ".webp"));
      console.log(`  ✓ ${name} (${Math.round(buf.length / 1024)}KB, try ${i + 1})`);
      return true;
    }
    await sleep(6000);
  }
  console.warn(`  ! ${name}: not ready`);
  return false;
}

for (const [url, name, cropLeft] of targets) {
  await shoot(url, name, cropLeft);
}
console.log("Done.");
