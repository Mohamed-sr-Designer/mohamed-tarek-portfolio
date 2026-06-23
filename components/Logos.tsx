import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Carousel } from "@/components/ui/Carousel";
import { Media } from "@/components/ui/Media";

const shots = [
  "/work/fresh-valley/lockups.webp",
  "/work/fresh-valley/logo.webp",
  "/work/fresh-valley/marks.webp",
  "/work/fresh-valley/palette.webp",
  "/work/fresh-valley/packaging.webp",
  "/work/fresh-valley/fleet.webp",
  "/work/fresh-valley/stationery-1.webp",
  "/work/fresh-valley/gift-1.webp",
];

export default function Logos() {
  return (
    <section
      id="logos"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="02">Logo & Identity</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              Marks with{" "}
              <span className="font-serif font-normal italic text-mint">meaning</span>,
              not decoration.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-bone-400">
            A logo is the smallest unit of a brand&apos;s strategy. One identity,
            built end to end — wordmark, palette, packaging and fleet.{" "}
            <Link href="/work/fresh-valley" className="text-mint">
              See the full identity ↗
            </Link>
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <Carousel ariaLabel="Logo and identity">
          {shots.map((src) => (
            <figure
              key={src}
              className="aspect-[16/10] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink-700 sm:w-[60%] lg:w-[46%]"
            >
              <Media
                src={src}
                alt="Fresh Valley identity"
                sizes="(max-width: 640px) 86vw, 46vw"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
