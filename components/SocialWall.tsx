import { Media } from "@/components/ui/Media";

// Social-media designs only (from the Social media posts library).
const all = Array.from({ length: 33 }, (_, i) => `/work/social/${String(i + 1).padStart(2, "0")}.webp`);
const rows = [all.slice(0, 11), all.slice(11, 22), all.slice(22, 33)];

function Row({ imgs, reverse }: { imgs: string[]; reverse?: boolean }) {
  const track = [...imgs, ...imgs];
  return (
    <div className="flex w-max">
      <div
        className={`flex w-max gap-4 pr-4 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {track.map((src, i) => (
          <div
            key={src + i}
            className="h-40 shrink-0 overflow-hidden rounded-xl bg-ink-700 sm:h-56"
          >
            <Media
              src={src}
              alt="Social media design"
              sizes="240px"
              className="h-full w-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SocialWall() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="container-edge mx-auto mb-8 flex max-w-edge items-center justify-between text-xs uppercase tracking-ultra text-bone-400">
        <span>Social media — a wall of recent posts</span>
        <a href="#work" className="link-underline text-bone-200">
          Browse the work ↑
        </a>
      </div>

      <div className="flex flex-col gap-4">
        <Row imgs={rows[0]} />
        <Row imgs={rows[1]} reverse />
        <Row imgs={rows[2]} />
      </div>
    </section>
  );
}
