// Captures live-site screenshots (via WordPress mShots) for the vibe-coded
// web projects, saving optimized WebP into public/web/.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

const targets = [
  ["https://mohamed-sr-designer.github.io/tilal-village/", "tilal"],
  ["https://mohamed-sr-designer.github.io/jadeite-office-villas/", "jadeite"],
  ["https://mohamed-sr-designer.github.io/fresh-valley/", "fresh-valley"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(url, name) {
  const api =
    "https://s.wordpress.com/mshots/v1/" +
    encodeURIComponent(url) +
    "?w=1600&h=1000";
  for (let i = 0; i < 14; i++) {
    const res = await fetch(api);
    const buf = Buffer.from(await res.arrayBuffer());
    // mShots returns a small grey placeholder until the shot is ready
    if (buf.length > 35000) {
      await fs.mkdir(OUT, { recursive: true });
      await sharp(buf)
        .resize(1600, 1000, { fit: "cover", position: "top" })
        .webp({ quality: 86 })
        .toFile(path.join(OUT, name + ".webp"));
      console.log(`  ✓ ${name} (${Math.round(buf.length / 1024)}KB, try ${i + 1})`);
      return true;
    }
    await sleep(6000);
  }
  console.warn(`  ! ${name}: not ready after retries`);
  return false;
}

for (const [url, name] of targets) {
  await shoot(url, name);
}
console.log("Done.");
