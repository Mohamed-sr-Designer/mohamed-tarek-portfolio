// Generates the favicon / app icons. The site had none, so browsers and search
// results fell back to a blank document icon.
//
// Next picks these up automatically from app/: icon.png -> <link rel="icon">,
// apple-icon.png -> apple-touch-icon.
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(__dirname, "..", "app");

const BG = "#100F0D"; // --bg dark
const FG = "#FF5A1F"; // --mint

const mark = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="${BG}"/>
  <text x="50" y="50" font-family="Georgia, 'Times New Roman', serif"
        font-size="46" font-weight="600" fill="${FG}"
        text-anchor="middle" dominant-baseline="central" letter-spacing="-1">MT</text>
</svg>`;

for (const [file, size] of [
  ["icon.png", 512],
  ["apple-icon.png", 180],
]) {
  await sharp(Buffer.from(mark(size)))
    .resize(size, size)
    .png()
    .toFile(path.join(APP, file));
  console.log(`  ${file} ${size}x${size}`);
}
console.log("icons written to app/");
