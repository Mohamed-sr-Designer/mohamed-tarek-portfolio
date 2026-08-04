// Captures live-site screenshots for the Vibe Coding cards via the mShots API.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

const SITES = [
  ["hrpath", "https://mohamed-sr-designer.github.io/hrpath-redesign/"],
  ["baleine", "https://mohamed-sr-designer.github.io/baleine-bleu-maison/"],
  ["miraf", "https://mohamed-sr-designer.github.io/miraf-district/"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await fs.mkdir(OUT, { recursive: true });

for (const [slug, url] of SITES) {
  const api = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1600&h=1000`;
  let done = false;
  for (let i = 0; i < 18 && !done; i++) {
    const res = await fetch(api);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 35000) {
      await sharp(buf)
        .resize(1600, 1000, { fit: "cover", position: "top" })
        .webp({ quality: 86 })
        .toFile(path.join(OUT, `${slug}.webp`));
      console.log(`  ✓ ${slug} (${Math.round(buf.length / 1024)}KB, try ${i + 1})`);
      done = true;
    } else {
      await sleep(6000);
    }
  }
  if (!done) console.warn(`  ! ${slug} — capture timed out`);
}
console.log("Done.");
