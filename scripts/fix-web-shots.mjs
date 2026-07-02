// 1) Crops the dead black band off the left of the Jadeite capture.
// 2) Captures THE NINE digital menu (mobile-first site → shoot at 1600x1000).
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "web");

// --- Jadeite: remove left band, refit to 1600x1000 ---
const jad = path.join(OUT, "jadeite.webp");
const srcFile = "C:\\Users\\tarek\\AppData\\Local\\Temp\\jad-src.webp";
const src = await sharp(srcFile).png().toBuffer();
const m = await sharp(src).metadata();
const left = Math.round(m.width * 0.155);
const jadBuf = await sharp(src)
  .extract({ left, top: 0, width: m.width - left, height: m.height })
  .resize(1600, 1000, { fit: "cover", position: "top" })
  .webp({ quality: 86 })
  .toBuffer();
await fs.writeFile(jad, jadBuf);
console.log("  ✓ jadeite refit (cropped left band)");

// --- THE NINE menu capture ---
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const api =
  "https://s.wordpress.com/mshots/v1/" +
  encodeURIComponent("https://mohamed-sr-designer.github.io/the-9-menu/") +
  "?w=1600&h=1000";
for (let i = 0; i < 16; i++) {
  const res = await fetch(api);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > 35000) {
    await sharp(buf)
      .resize(1600, 1000, { fit: "cover", position: "top" })
      .webp({ quality: 86 })
      .toFile(path.join(OUT, "the9.webp"));
    console.log(`  ✓ the9 (${Math.round(buf.length / 1024)}KB, try ${i + 1})`);
    break;
  }
  await sleep(6000);
}
console.log("Done.");
