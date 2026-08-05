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

// Folder order, as the posts were numbered.
//
// Plain localeCompare with numeric:true is not enough: it sorts "1-1.png"
// BEFORE "1.png", because "-" collates ahead of ".". In the HR Link set the
// "-1" files are the second slide of the same carousel post, so they have to
// follow their base image — 1, 1-1, 2, 3, 3-1, 4, 5, 5-1, 6. Sort on the
// leading number first, then the variant suffix, and let anything unnumbered
// (cover.webp, hero.webp, building.webp) fall to the end.
const seq = (name) => {
  const m = name.match(/^(\d+)(?:-(\d+))?/);
  return m
    ? { n: Number(m[1]), v: Number(m[2] ?? 0) }
    : { n: Number.MAX_SAFE_INTEGER, v: 0 };
};

const ordered = (a, b) => {
  const A = seq(a);
  const B = seq(b);
  return (
    A.n - B.n ||
    A.v - B.v ||
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );
};

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

  // ---- social sets, folder order, native ratio ----
  const counts = {};
  const dupes = [];
  for (const [folder, slug] of Object.entries(SLUGS)) {
    const dir = path.join(SOCIAL, folder);
    const files = (await fs.readdir(dir))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort(ordered);

    // clear the old set so stale numbering can't linger
    await fs.rm(path.join(PUBLIC, "work", "social", slug), {
      recursive: true,
      force: true,
    });
    for (const k of Object.keys(manifest))
      if (k.startsWith(`/work/social/${slug}/`)) delete manifest[k];

    // Import every file, including repeats. Dropping them left gaps in the
    // 3x3 grids — fresh-valley came out at 8. Repeats are reported instead so
    // they can be fixed at the source.
    const seen = new Map();
    let n = 0;
    for (const f of files) {
      const src = path.join(dir, f);
      const h = await hash(src);
      if (seen.has(h)) dupes.push(`${slug}: ${f} is identical to ${seen.get(h)}`);
      else seen.set(h, f);
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
  if (dupes.length) {
    console.log("\nrepeated source images (same design shows twice in the grid):");
    for (const d of dupes) console.log("  ! " + d);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
