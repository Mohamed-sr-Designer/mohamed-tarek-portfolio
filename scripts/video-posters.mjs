// Generates a poster frame for each source video so they can be curated.
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const SRC = "C:\\Users\\tarek\\OneDrive\\Desktop\\New folder (27)\\videos and motion";
const OUT = "C:\\Users\\tarek\\AppData\\Local\\Temp\\vposters";

await fs.mkdir(OUT, { recursive: true });
const vids = (await fs.readdir(SRC)).filter((f) => /\.mp4$/i.test(f)).sort();
for (const v of vids) {
  const out = path.join(OUT, v.replace(/\.mp4$/i, ".jpg"));
  try {
    execFileSync(
      ffmpegPath,
      ["-y", "-ss", "1", "-i", path.join(SRC, v), "-frames:v", "1", "-vf", "scale=420:-1", out],
      { stdio: "ignore" }
    );
    console.log("  ✓ " + v);
  } catch (e) {
    console.warn("  ! " + v + ": " + e.message);
  }
}
console.log("Done.");
