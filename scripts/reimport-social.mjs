// Re-imports the social sets in natural numeric order (1,2,…,10,11) instead of
// alphabetical, and keeps the native 4:5 feed ratio. Also imports the academy
// and company logos used on the About page.
import sharp from "sharp";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const PUBLIC = path.join(PROJECT, "public");
const SOCIAL = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (12)\\Social Media designs";
const LMS = path.resolve(PROJECT, "..", "portfolio V2", "public", "lms");

const ensureDir = async (p) => fs.mkdir(path.dirname(p), { recursive: true });
const hash = async (f) =>
  createHash("md5").update(await fs.readFile(f)).digest("hex");
const blur = async (f) =>
  `data:image/webp;base64,${(await sharp(f).resize(16).webp({ quality: 22 }).toBuffer()).toString("base64")}`;

// natural sort: "10.png" after "9.png", "1-1.png" right after "1.png"
const natural = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const SLUGS = {
  Amam: "amam",
  "Brand Vitals": "brand-vitals",
  "El Raghi": "el-raghi",
  FreshVally: "fresh-valley",
  GF: "gf",
  "HR Link": "hr-link",
  "Next Academy": "next-academy",
  "The Nine": "the-nine",
  "Tilal V": "tilal-v",
};

const ORGS = [
  ["academies/soic.jpg", "orgs/soic.webp"],
  ["academies/edux.jpg", "orgs/edux.webp"],
  ["academies/raya.jpg", "orgs/raya.webp"],
  ["academies/teaching.jpg", "orgs/teaching.webp"],
  ["companies/osolutions.jpg", "orgs/osolutions.webp"],
  ["companies/jumppeak.jpg", "orgs/jumppeak.webp"],
  ["companies/prepd.jpg", "orgs/prepd.webp"],
  ["companies/bundle.jpg", "orgs/bundle.webp"],
  ["companies/flowrista.jpg", "orgs/flowrista.webp"],
  ["companies/pala7.jpg", "orgs/pala7.webp"],
];

async function run() {
  const manifest = JSON.parse(
    await fs.readFile(path.join(PROJECT, "lib", "assets.json"), "utf8")
  );

  // ---- social sets, natural order, native ratio ----
  const counts = {};
  for (const [folder, slug] of Object.entries(SLUGS)) {
    const dir = path.join(SOCIAL, folder);
    const files = (await fs.readdir(dir))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort(natural);

    // clear the old set so stale numbering can't linger
    await fs.rm(path.join(PUBLIC, "work", "social", slug), {
      recursive: true,
      force: true,
    });
    for (const k of Object.keys(manifest))
      if (k.startsWith(`/work/social/${slug}/`)) delete manifest[k];

    const seen = new Set();
    let n = 0;
    for (const f of files) {
      const src = path.join(dir, f);
      const h = await hash(src);
      if (seen.has(h)) continue; // duplicate inside the folder
      seen.add(h);
      n++;
      const out = `work/social/${slug}/${String(n).padStart(2, "0")}.webp`;
      const outPath = path.join(PUBLIC, out);
      await ensureDir(outPath);
      const info = await sharp(src)
        .rotate()
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(outPath);
      manifest["/" + out] = {
        width: info.width,
        height: info.height,
        blur: await blur(src),
      };
    }
    counts[slug] = n;
  }

  // ---- academy + company logos ----
  let orgs = 0;
  for (const [rel, out] of ORGS) {
    const src = path.join(LMS, rel);
    try {
      await fs.access(src);
    } catch {
      console.warn("  ! missing org logo:", rel);
      continue;
    }
    const outPath = path.join(PUBLIC, out);
    await ensureDir(outPath);
    const info = await sharp(src)
      .resize(400, 400, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(outPath);
    manifest["/" + out] = {
      width: info.width,
      height: info.height,
      blur: await blur(src),
    };
    orgs++;
  }

  await fs.writeFile(
    path.join(PROJECT, "lib", "assets.json"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("social sets:", JSON.stringify(counts));
  console.log("org logos:", orgs);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
