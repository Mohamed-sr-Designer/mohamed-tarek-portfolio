// One-off: capture live screenshots for the two newly-added web projects.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

const targets = [
  ["https://mohamed-sr-designer.github.io/hrlink-redesign/", "hrlink"],
  ["https://mohamed-sr-designer.github.io/soic-campus/", "soic"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shoot(url, name) {
  const api =
    "https://s.wordpress.com/mshots/v1/" +
    encodeURIComponent(url) +
    "?w=1600&h=1000";
  for (let i = 0; i < 16; i++) {
    const res = await fetch(api);
    const buf = Buffer.from(await res.arrayBuffer());
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
  console.warn(`  ! ${name}: not ready`);
  return false;
}

for (const [url, name] of targets) {
  await shoot(url, name);
}
console.log("Done.");
