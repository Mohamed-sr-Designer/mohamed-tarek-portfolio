import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";

// A wide "wall" of frames from across the work — brand worlds, campaigns,
// identity, key visuals and social. Curated for rhythm across the columns.
const frames = [
  "/work/secure/hero.webp",
  "/work/fresh-valley/packaging.webp",
  "/work/brandvitals/hero.webp",
  "/work/tilal/02.webp",
  "/work/axia/hero.webp",
  "/work/hrlink/hero.webp",
  "/work/social/01.webp",
  "/work/auto/hero.webp",
  "/work/fresh-valley/logo.webp",
  "/work/secure/cover.webp",
  "/work/ihs/hero.webp",
  "/work/brandvitals/05.webp",
  "/work/axia/gift-her.webp",
  "/work/tilal/hero.webp",
  "/work/fresh-valley/fleet.webp",
  "/work/social/14.webp",
  "/work/secure/02.webp",
  "/work/hrlink/03.webp",
  "/work/auto/02.webp",
  "/work/fresh-valley/palette.webp",
  "/work/axia/p12.webp",
  "/work/brandvitals/06.webp",
  "/work/ihs/room-2.webp",
  "/work/tilal/06.webp",
  "/work/social/04.webp",
  "/work/fresh-valley/lockups.webp",
  "/work/secure/04.webp",
  "/work/hrlink/cover.webp",
  "/work/axia/insta-2.webp",
  "/work/auto/04.webp",
  "/work/fresh-valley/gift-1.webp",
  "/work/brandvitals/03.webp",
  "/work/social/21.webp",
  "/work/tilal/10.webp",
  "/work/ihs/room-5.webp",
  "/work/fresh-valley/marks.webp",
  "/work/axia/banner-her.webp",
  "/work/hrlink/05.webp",
  "/work/secure/07.webp",
  "/work/social/33.webp",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="02">Gallery</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              A wall of the{" "}
              <span className="font-serif font-normal italic text-mint">work</span>{" "}
              — brands, identity & campaigns.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-bone-400">
            Frames pulled from across the projects — logo and identity systems,
            key visuals, campaign art and social. The range, in one scroll.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {frames.map((src, i) => (
            <figure
              key={`${src}-${i}`}
              className="group mb-3 break-inside-avoid overflow-hidden rounded-xl bg-ink-700 md:mb-4"
            >
              <Media
                src={src}
                alt="Selected frame"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full transition-transform duration-700 ease-cinema group-hover:scale-[1.05]"
              />
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
