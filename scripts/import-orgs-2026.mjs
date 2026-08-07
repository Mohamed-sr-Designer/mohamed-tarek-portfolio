// Two org logos that were missing: Alkhabeer for Training (Experience) and
// Easily (Teaching).
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");

const LOGOS = [
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\1674484567503.jpg", "orgs/alkhabeer.webp"],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\1709307669361.jpg", "orgs/easily.webp"],
];

const manifestPath = path.join(PROJECT, "lib", "assets.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

for (const [src, rel] of LOGOS) {
  const out = path.join(PUBLIC, rel);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(src)
    .resize(400, 400, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(out);
  manifest["/" + rel] = {
    width: info.width,
    height: info.height,
    blur: `data:image/webp;base64,${(
      await sharp(src).resize(16).webp({ quality: 22 }).toBuffer()
    ).toString("base64")}`,
  };
  console.log(`  ${rel}  ${info.width}x${info.height}`);
}

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log("done");
