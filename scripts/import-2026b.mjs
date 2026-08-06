// Imports the "New folder (18)" drop plus the two portrait/cover swaps.
//
//   Type Design      -> public/work/type/01..08.webp   (new home section)
//   New KV.png       -> public/work/master/10.webp     (leads Master Visuals)
//   ...TO slider     -> public/slider/33..36.webp      (bottom loop strip)
//   Downloads jpg    -> public/me/portrait-2026.webp   (home hero only)
//   lms/hero-banner  -> public/me/about-cover.webp     (About page cover)
//
// Each Type Design folder holds the same lettering twice: 1.png is the white
// artwork, 2.png the near-black emboss that reads as an empty tile on a dark
// page. Only the white one is imported.
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");
const DROP = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (18)";

const blur = async (f) =>
  `data:image/webp;base64,${(await sharp(f).resize(16).webp({ quality: 22 }).toBuffer()).toString("base64")}`;

const manifest = JSON.parse(
  await fs.readFile(path.join(PROJECT, "lib", "assets.json"), "utf8")
);

async function put(src, rel, resize) {
  const out = path.join(PUBLIC, rel);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(src)
    .rotate()
    .resize(resize)
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  manifest["/" + rel] = {
    width: info.width,
    height: info.height,
    blur: await blur(src),
  };
  return `${info.width}x${info.height}`;
}

// ---- type design -----------------------------------------------------------
//
// Every folder holds the same lettering twice: 1.png is the white artwork and
// 2.png the black one. Both are kept, on transparent PNG-derived alpha, so the
// page can show the white cut in dark mode and the black cut in light mode —
// no filled tile behind the letterforms.
await fs.rm(path.join(PUBLIC, "work", "type"), { recursive: true, force: true });
for (const k of Object.keys(manifest))
  if (k.startsWith("/work/type/")) delete manifest[k];

// keeps alpha, so the artwork sits directly on the page background
async function putAlpha(src, rel, resize) {
  const out = path.join(PUBLIC, rel);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const info = await sharp(src)
    .rotate()
    .resize(resize)
    .trim({ threshold: 12 })
    .webp({ quality: 88, effort: 5, alphaQuality: 100 })
    .toFile(out);
  manifest["/" + rel] = {
    width: info.width,
    height: info.height,
    blur: await blur(src),
  };
  return `${info.width}x${info.height}`;
}

const typeDir = path.join(DROP, "Type Design");
const folders = (await fs.readdir(typeDir, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

let n = 0;
for (const f of folders) {
  const files = (await fs.readdir(path.join(typeDir, f)))
    .filter((x) => /\.(png|jpe?g|webp)$/i.test(x))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  // 1.png = white artwork (dark mode), 2.png = black artwork (light mode).
  // Folders 7 and 8 ship a single coloured piece that works on both themes.
  const white = files.find((x) => /^1\./i.test(x)) ?? files[0];
  const black = files.find((x) => /^2\./i.test(x)) ?? white;
  if (!white) continue;
  n++;
  const id = String(n).padStart(2, "0");
  const a = await putAlpha(path.join(typeDir, f, white), `work/type/${id}-dark.webp`, {
    width: 1400,
    withoutEnlargement: true,
  });
  const b = await putAlpha(path.join(typeDir, f, black), `work/type/${id}-light.webp`, {
    width: 1400,
    withoutEnlargement: true,
  });
  console.log(`  type ${id} <- ${f}  dark ${white} ${a} / light ${black} ${b}`);
}

// ---- new key visual --------------------------------------------------------
console.log(
  "  master 10 <- New KV.png  " +
    (await put(path.join(DROP, "New KV.png"), "work/master/10.webp", {
      width: 2000,
      withoutEnlargement: true,
    }))
);

// ---- new social designs for the bottom slider ------------------------------
const sliderDir = path.join(DROP, "New Social Media Designs TO slider");
const sliderFiles = (await fs.readdir(sliderDir))
  .filter((x) => /\.(png|jpe?g|webp)$/i.test(x))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
let s = 32; // the strip already runs 01..32
for (const f of sliderFiles) {
  s++;
  console.log(
    `  slider ${s} <- ${f}  ` +
      (await put(path.join(sliderDir, f), `slider/${String(s).padStart(2, "0")}.webp`, {
        width: 1200,
        withoutEnlargement: true,
      }))
  );
}

// ---- portrait + about cover -----------------------------------------------
console.log(
  "  portrait-2026  " +
    (await put(
      "C:\\Users\\tarek\\Downloads\\488763804_4037458466539035_4831895639925251740_n.jpg",
      "me/portrait-2026.webp",
      { width: 1400, withoutEnlargement: true }
    ))
);
console.log(
  "  about-cover    " +
    (await put(
      path.resolve(PROJECT, "..", "portfolio V2", "public", "lms", "hero-banner.jpg"),
      "me/about-cover.webp",
      { width: 2400, withoutEnlargement: true }
    ))
);

await fs.writeFile(
  path.join(PROJECT, "lib", "assets.json"),
  JSON.stringify(manifest, null, 2)
);
console.log(`\ntype pieces: ${n}, slider now ${s}`);
