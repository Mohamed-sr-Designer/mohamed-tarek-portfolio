import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";

// Curated wall — frames are grouped into chapters by mood, palette and light,
// and every tile matches its image's native orientation (portrait tiles for
// portrait art, landscape for landscape, square for square). No random flow.
type Row = {
  aspect: string; // tailwind aspect class ≈ the images' native ratio
  cols: string; // grid columns for the row
  imgs: string[];
};

type Chapter = {
  index: string;
  label: string;
  note: string;
  rows: Row[];
};

const chapters: Chapter[] = [
  {
    index: "I",
    label: "Noir & Neon",
    note: "Cybersecurity, 3D and automotive — black, blood red, electric blue.",
    rows: [
      {
        aspect: "aspect-[4/5]",
        cols: "grid-cols-2 lg:grid-cols-4",
        imgs: [
          "/work/secure/hero.webp",
          "/work/secure/cover.webp",
          "/work/brandvitals/hero.webp",
          "/work/brandvitals/06.webp",
        ],
      },
      {
        aspect: "aspect-video",
        cols: "grid-cols-1 sm:grid-cols-2",
        imgs: ["/work/auto/hero.webp", "/work/ihs/hero.webp"],
      },
    ],
  },
  {
    index: "II",
    label: "Golden Hour",
    note: "Real estate and hospitality — warm light, quiet luxury.",
    rows: [
      {
        aspect: "aspect-[15/8]",
        cols: "grid-cols-1",
        imgs: ["/work/tilal/02.webp"],
      },
      {
        aspect: "aspect-[3/4]",
        cols: "grid-cols-2 lg:grid-cols-4",
        imgs: [
          "/work/tilal/hero.webp",
          "/work/tilal/06.webp",
          "/work/ihs/room-2.webp",
          "/work/ihs/room-5.webp",
        ],
      },
    ],
  },
  {
    index: "III",
    label: "Warm & Editorial",
    note: "AXIA — bone, cream and Mediterranean light.",
    rows: [
      {
        aspect: "aspect-[5/2]",
        cols: "grid-cols-1",
        imgs: ["/work/axia/hero.webp"],
      },
      {
        aspect: "aspect-square",
        cols: "grid-cols-3",
        imgs: [
          "/work/axia/p12.webp",
          "/work/axia/p4.webp",
          "/work/axia/p8.webp",
        ],
      },
    ],
  },
  {
    index: "IV",
    label: "Fresh & Organic",
    note: "Fresh Valley — forest green, kraft and natural texture.",
    rows: [
      {
        aspect: "aspect-video",
        cols: "grid-cols-1 sm:grid-cols-2",
        imgs: ["/work/fresh-valley/packaging.webp", "/work/fresh-valley/fleet.webp"],
      },
      {
        aspect: "aspect-video",
        cols: "grid-cols-1 sm:grid-cols-2",
        imgs: ["/work/fresh-valley/gift-1.webp", "/work/fresh-valley/palette.webp"],
      },
    ],
  },
  {
    index: "V",
    label: "Clean & Digital",
    note: "HR Link — brand purple, crisp product UI, generous white space.",
    rows: [
      {
        aspect: "aspect-[4/5]",
        cols: "grid-cols-2 lg:grid-cols-4",
        imgs: [
          "/work/hrlink/hero.webp",
          "/work/hrlink/01.webp",
          "/work/hrlink/03.webp",
          "/work/hrlink/cover.webp",
        ],
      },
    ],
  },
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
              The work, curated by{" "}
              <span className="font-serif font-normal italic text-mint">
                mood
              </span>{" "}
              &amp; light.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Five chapters, five palettes — each frame sits with the work that
            shares its light.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-16 md:gap-20">
        {chapters.map((ch) => (
          <div key={ch.index}>
            <Reveal>
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-serif text-lg italic text-mint">
                  {ch.index}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-bone-50 md:text-2xl">
                  {ch.label}
                </h3>
                <p className="hidden text-sm text-bone-400 sm:block">
                  {ch.note}
                </p>
              </div>
            </Reveal>
            <div className="grid gap-3 md:gap-4">
              {ch.rows.map((row, ri) => (
                <div key={ri} className={`grid gap-3 md:gap-4 ${row.cols}`}>
                  {row.imgs.map((src) => (
                    <Reveal key={src}>
                      <figure
                        className={`group relative overflow-hidden rounded-xl bg-ink-700 ${row.aspect}`}
                      >
                        <Media
                          src={src}
                          alt={`${ch.label} — selected frame`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.04]"
                        />
                      </figure>
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
