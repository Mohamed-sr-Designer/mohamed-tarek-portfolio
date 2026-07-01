// Optimizes source PNGs/JPGs (and rasterized PDFs in _raw/) into fast WebP files
// + a manifest with dimensions and blur placeholders.  Run: npm run optimize
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, "..");
const SRC_ROOT = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (27)";
const PUBLIC = path.join(PROJECT, "public");
const raw = (p) => path.join(PROJECT, "_raw", p);
const a = "Ai iamge genrator/1";

// [src (abs or relative to SRC_ROOT), out (relative to /public), width]
const MANIFEST = [
  // ---------- ME ----------
  [raw("me/portrait.png"), "me/portrait-old.webp", 1200],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\123451.png", "me/portrait.webp", 1500],
  [raw("me/clients-trim.png"), "me/clients.webp", 2400],
  [raw("me/clients-light-trim.png"), "me/clients-light.webp", 2400],

  // ---------- AXIA — gifting ----------
  [`${a}/hero-1.png`, "work/axia/hero.webp", 2400],
  [`${a}/hero-2.png`, "work/axia/hero-2.webp", 2000],
  [`${a}/hero-3.png`, "work/axia/hero-3.webp", 2000],
  [`${a}/gift-page-her.png`, "work/axia/gift-her.webp", 1800],
  [`${a}/gift-page-mom.png`, "work/axia/gift-mom.webp", 1800],
  [`${a}/gift-page-you.png`, "work/axia/gift-you.webp", 1800],
  [`${a}/banner-for-her.png`, "work/axia/banner-her.webp", 1400],
  [`${a}/banner-for-mom.png`, "work/axia/banner-mom.webp", 1400],
  [`${a}/banner-for-you.png`, "work/axia/banner-you.webp", 1400],
  [`${a}/1.png`, "work/axia/p1.webp", 1400],
  [`${a}/3.png`, "work/axia/p3.webp", 1400],
  [`${a}/4.png`, "work/axia/p4.webp", 1400],
  [`${a}/8.png`, "work/axia/p8.webp", 1400],
  [`${a}/9.png`, "work/axia/p9.webp", 1400],
  [`${a}/10.png`, "work/axia/p10.webp", 1400],
  [`${a}/11.png`, "work/axia/p11.webp", 1400],
  [`${a}/12.png`, "work/axia/p12.webp", 1400],
  [`${a}/13.png`, "work/axia/p13.webp", 1400],
  [`${a}/14.png`, "work/axia/p14.webp", 1400],
  [`${a}/15.png`, "work/axia/p15.webp", 1400],
  [`${a}/16.png`, "work/axia/p16.webp", 1400],
  [`${a}/insta-2.png`, "work/axia/insta-2.webp", 1200],
  [`${a}/insta-4.png`, "work/axia/insta-4.webp", 1200],
  [`${a}/insta-6.png`, "work/axia/insta-6.webp", 1200],

  // ---------- Fresh Valley — branding system ----------
  [raw("fv/Frame.png"), "work/fresh-valley/logo.webp", 1800],
  [raw("fv/Frame-1.png"), "work/fresh-valley/logo-2.webp", 1800],
  [raw("fv/Frame-3.png"), "work/fresh-valley/lockups.webp", 1800],
  [raw("fv/Frame-4.png"), "work/fresh-valley/marks.webp", 1800],
  [raw("fv/Frame-2.png"), "work/fresh-valley/palette.webp", 1800],
  [raw("fv/Frame-11.png"), "work/fresh-valley/store.webp", 1700],
  [raw("fv/Frame-12.png"), "work/fresh-valley/storefront.webp", 1700],
  [raw("fv/Frame-13.png"), "work/fresh-valley/fleet.webp", 1800],
  [raw("fv/Frame-14.png"), "work/fresh-valley/van-front.webp", 1700],
  [raw("fv/Frame-15.png"), "work/fresh-valley/van-life.webp", 1800],
  [raw("fv/Frame-17.png"), "work/fresh-valley/pack-wrap.webp", 1600],
  [raw("fv/Frame-18.png"), "work/fresh-valley/pack-trays.webp", 1600],
  [raw("fv/Frame-19.png"), "work/fresh-valley/pack-bag.webp", 1600],
  [raw("fv/Frame-20.png"), "work/fresh-valley/gift-1.webp", 1600],
  [raw("fv/Frame-21.png"), "work/fresh-valley/gift-2.webp", 1600],
  [raw("fv/Frame-22.png"), "work/fresh-valley/gift-3.webp", 1600],
  [raw("fv/Frame-23.png"), "work/fresh-valley/boxes.webp", 1600],
  [raw("fv/Frame-6.png"), "work/fresh-valley/stationery-1.webp", 1500],
  [raw("fv/Frame-7.png"), "work/fresh-valley/stationery-2.webp", 1500],
  [raw("fv/Frame-9.png"), "work/fresh-valley/apron.webp", 1500],
  ["Branding/packaging.png", "work/fresh-valley/packaging.webp", 1700],
  ["Branding/delivery-van.png", "work/fresh-valley/van.webp", 1700],
  ["Branding/staff-shirt.png", "work/fresh-valley/staff.webp", 1500],

  // ---------- Tilal Village — real estate ----------
  ["campigns/2/123212456.png", "work/tilal/hero.webp", 2000],
  ["campigns/2/Artboard 2.png", "work/tilal/building.webp", 1600],
  ["campigns/2/2134564.png", "work/tilal/02.webp", 2000],
  ["campigns/2/Artboard 3 copy.png", "work/tilal/03.webp", 1500],
  ["campigns/2/Artboard 3 copy 2.png", "work/tilal/04.webp", 1500],
  ["campigns/2/Artboard 3 copy 5.png", "work/tilal/05.webp", 1500],
  ["campigns/2/Artboard 3 copy 6.png", "work/tilal/06.webp", 1500],
  ["campigns/2/Artboard 3 copy 8.png", "work/tilal/07.webp", 1500],
  ["campigns/2/Artboard 3 copy 9.png", "work/tilal/08.webp", 1500],
  ["campigns/2/Artboard 3 copy 10.png", "work/tilal/09.webp", 1500],
  ["campigns/2/Artboard 5 copy.png", "work/tilal/10.webp", 1600],
  ["campigns/2/Artboard 6.png", "work/tilal/11.webp", 1600],

  // ---------- Bnum Rajeh / IHS — B2B hospitality ----------
  ["campigns/1/Artboard 1.png", "work/ihs/hero.webp", 2200],
  ["campigns/1/Artboard 1 copy 5.png", "work/ihs/02.webp", 2000],
  ["Social media posts story/ihsjun1.png", "work/ihs/room-1.webp", 1200],
  ["Social media posts story/ihsjun2.png", "work/ihs/room-2.webp", 1200],
  ["Social media posts story/ihsjun3.png", "work/ihs/room-3.webp", 1200],
  ["Social media posts story/ihsjun4.png", "work/ihs/room-4.webp", 1200],
  ["Social media posts story/ihsjun5.png", "work/ihs/room-5.webp", 1200],
  ["Social media posts story/ihsjun6.png", "work/ihs/room-6.webp", 1200],
  ["Social media posts story/ihsjun7.png", "work/ihs/room-7.webp", 1200],

  // ---------- Automotive — key visuals ----------
  [raw("auto/geely-rental.png"), "work/auto/geely-rental.webp", 2400],
  [raw("auto/geely-monjaro.png"), "work/auto/geely-monjaro.webp", 2400],
  ["KV/before 1.png", "work/auto/hero.webp", 2200],
  ["KV/before 8.png", "work/auto/02.webp", 2000],
  ["KV/before 2.png", "work/auto/03.webp", 2000],
  ["KV/before 9.png", "work/auto/04.webp", 2000],
  ["KV/before 3.png", "work/auto/05.webp", 2000],
  ["KV/before 4.png", "work/auto/06.webp", 2000],
  ["KV/before 5.png", "work/auto/07.webp", 2000],

  // ---------- Social systems ----------
  ["Social media posts story/Group 60.png", "work/social/01.webp", 1100],
  ["Social media posts story/Group 62.png", "work/social/02.webp", 1100],
  ["Social media posts story/Group 75.png", "work/social/03.webp", 1100],
  ["Social media posts story/Group 82.png", "work/social/04.webp", 1100],
  ["Social media posts story/Group 49.png", "work/social/05.webp", 1100],
  ["Social media posts story/Group 39.png", "work/social/06.webp", 1100],
  ["Social media posts story/Group 41.png", "work/social/07.webp", 1100],
  ["Social media posts story/Group 48.png", "work/social/08.webp", 1100],
  ["Social media posts story/Group 52.png", "work/social/09.webp", 1100],
  ["Social media posts story/Group 61.png", "work/social/10.webp", 1100],
  ["Social media posts story/Group 63.png", "work/social/11.webp", 1100],
  ["Social media posts story/Group 67.png", "work/social/12.webp", 1100],
  ["Social media posts story/Group 71.png", "work/social/13.webp", 1100],
  ["Social media posts story/Group 80.png", "work/social/14.webp", 1100],
  ["Social media posts story/Group 83.png", "work/social/15.webp", 1100],
  ["Social media posts story/Group 85.png", "work/social/16.webp", 1100],
  ["Social media posts story/Group 87.png", "work/social/17.webp", 1100],
  ["Social media posts story/Story 1.png", "work/social/18.webp", 1100],
  ["Social media posts story/Post 2_2.png", "work/social/19.webp", 1100],
  ["Social media posts story/Post 5_1.png", "work/social/20.webp", 1100],
  ["Social media posts story/Mix-post-and-story_14.png", "work/social/21.webp", 1100],

  // ---------- New designs (cyber-security + Dubai real estate) ----------
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\1.png", "work/social/22.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\1 (2).png", "work/social/23.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\2.png", "work/social/24.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\2-1.png", "work/social/25.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\3-1.png", "work/social/26.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\4.png", "work/social/27.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\5.png", "work/social/28.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\6.png", "work/social/29.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\7.png", "work/social/30.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\7 (2).png", "work/social/31.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\8 copy.png", "work/social/32.webp", 1100],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (13)\\Artboard 1.png", "work/social/33.webp", 1100],

  // ---------- Secure Tomorrow — cyber-security brand campaign (New folder 30) ----------
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\11.png", "work/secure/hero.webp", 1600],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\9.png", "work/secure/cover.webp", 1600],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\7.png", "work/secure/02.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\10.png", "work/secure/03.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\8.png", "work/secure/04.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\3.png", "work/secure/05.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\12.png", "work/secure/06.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\2.png", "work/secure/07.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\5.png", "work/secure/08.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (30)\\New folder\\6.png", "work/secure/09.webp", 1400],

  // ---------- HR Link (نظام لينك) — B2B SaaS campaign (New folder 36) ----------
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\7.png", "work/hrlink/hero.webp", 1600],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\1.png", "work/hrlink/cover.webp", 1600],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\2.png", "work/hrlink/01.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\2-1.png", "work/hrlink/02.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\3.png", "work/hrlink/03.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\3-3.png", "work/hrlink/04.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\4.png", "work/hrlink/05.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\4-1.png", "work/hrlink/06.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\5.png", "work/hrlink/07.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\5-1.png", "work/hrlink/08.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\1-1.png", "work/hrlink/09.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (36)\\7-1.png", "work/hrlink/10.webp", 1400],

  // ---------- BrandVitals — marketing agency 3D campaign (New folder 25) ----------
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 10.png", "work/brandvitals/hero.webp", 1500],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 3.png", "work/brandvitals/cover.webp", 1500],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 11.png", "work/brandvitals/01.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 2.png", "work/brandvitals/02.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 4.png", "work/brandvitals/03.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 5.png", "work/brandvitals/04.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 6.png", "work/brandvitals/05.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 7.png", "work/brandvitals/06.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 8.png", "work/brandvitals/07.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy 9.png", "work/brandvitals/08.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6 copy.png", "work/brandvitals/09.webp", 1400],
  ["C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (25)\\Artboard 6.png", "work/brandvitals/10.webp", 1400],
];

// Open Graph share image
const OG = [`${a}/gift-page-her.png`, "og.jpg"];

async function ensureDir(file) {
  await fs.mkdir(path.dirname(file), { recursive: true });
}

async function makeBlur(input) {
  const buf = await sharp(input)
    .resize(20, 20, { fit: "inside" })
    .webp({ quality: 35 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function run() {
  const manifest = {};
  let ok = 0;
  let missing = 0;

  for (const [src, out, width] of MANIFEST) {
    const srcPath = path.isAbsolute(src) ? src : path.join(SRC_ROOT, src);
    const outPath = path.join(PUBLIC, out);
    try {
      await fs.access(srcPath);
    } catch {
      console.warn(`  ! missing: ${src}`);
      missing++;
      continue;
    }
    await ensureDir(outPath);
    const info = await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);
    manifest["/" + out] = {
      width: info.width,
      height: info.height,
      blur: await makeBlur(srcPath),
    };
    ok++;
  }

  try {
    const srcPath = path.join(SRC_ROOT, OG[0]);
    await sharp(srcPath)
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality: 82 })
      .toFile(path.join(PUBLIC, OG[1]));
  } catch (e) {
    console.warn(`  ! OG failed: ${e.message}`);
  }

  const manifestPath = path.join(PROJECT, "lib", "assets.json");
  await ensureDir(manifestPath);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${ok} optimized, ${missing} missing.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
