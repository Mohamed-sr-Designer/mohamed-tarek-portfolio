// Compresses the course test video to a web-ready MP4 + poster.
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "public", "course");
const SRC = "D:\\Video.mp4";

await fs.mkdir(OUT, { recursive: true });
const mp4 = path.join(OUT, "test.mp4");
const poster = path.join(OUT, "test.jpg");

execFileSync(
  ffmpegPath,
  ["-y", "-ss", "1", "-i", SRC, "-frames:v", "1",
   "-vf", "scale='min(1280,iw)':-2", poster],
  { stdio: "ignore" }
);
execFileSync(
  ffmpegPath,
  ["-y", "-i", SRC,
   "-vf", "scale='min(1280,iw)':-2:force_divisible_by=2",
   "-c:v", "libx264", "-crf", "28", "-preset", "veryfast", "-pix_fmt", "yuv420p",
   "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", mp4],
  { stdio: "ignore" }
);
const kb = Math.round((await fs.stat(mp4)).size / 1024);
console.log(`Done. test.mp4 ${kb}KB`);
