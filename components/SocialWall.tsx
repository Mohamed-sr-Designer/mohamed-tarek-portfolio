import { Media } from "@/components/ui/Media";

// Social-media designs only (from the Social media posts library).
const rows = [
  ["/work/social/01.webp", "/work/social/02.webp", "/work/social/03.webp", "/work/social/04.webp", "/work/social/05.webp", "/work/social/06.webp", "/work/social/07.webp"],
  ["/work/social/08.webp", "/work/social/09.webp", "/work/social/10.webp", "/work/social/11.webp", "/work/social/12.webp", "/work/social/13.webp", "/work/social/14.webp"],
  ["/work/social/15.webp", "/work/social/16.webp", "/work/social/17.webp", "/work/social/18.webp", "/work/social/19.webp", "/work/social/20.webp", "/work/social/21.webp"],
];

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
        <a href="/work" className="link-underline text-bone-200">
          See the work ↘
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
