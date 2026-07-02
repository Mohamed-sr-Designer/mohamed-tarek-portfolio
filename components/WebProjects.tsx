import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";

const sites = [
  {
    name: "Tilal Village",
    type: "Luxury Real Estate · Makkah",
    url: "https://mohamed-sr-designer.github.io/tilal-village/",
    img: "/web/tilal.webp",
    host: "tilal-village",
  },
  {
    name: "JADEITE",
    type: "Office Villas · Al Khobar",
    url: "https://mohamed-sr-designer.github.io/jadeite-office-villas/",
    img: "/web/jadeite.webp",
    host: "jadeite-office-villas",
  },
  {
    name: "Fresh Valley",
    type: "Premium Produce Brand",
    url: "https://mohamed-sr-designer.github.io/fresh-valley/",
    img: "/web/fresh-valley.webp",
    host: "fresh-valley",
  },
  {
    name: "HR Link",
    type: "HR SaaS Platform · KSA",
    url: "https://mohamed-sr-designer.github.io/hrlink-redesign/",
    img: "/web/hrlink.webp",
    host: "hrlink-redesign",
  },
  {
    name: "SOIC",
    type: "Digital Cinema Campus",
    url: "https://mohamed-sr-designer.github.io/soic-campus/",
    img: "/web/soic.webp",
    host: "soic-campus",
  },
  {
    name: "THE NINE",
    type: "Digital Menu · Café",
    url: "https://mohamed-sr-designer.github.io/the-9-menu/",
    img: "/web/the9.webp",
    host: "the-9-menu",
  },
];

export default function WebProjects() {
  return (
    <section id="web" className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="04">Vibe Coding</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              I design — then I{" "}
              <span className="font-serif font-normal italic text-mint">ship the code</span>.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-sm leading-relaxed text-bone-400">
            Live websites I designed <span className="text-bone-200">and built</span> through
            vibe coding — AI-assisted development. Even this portfolio is
            vibe-coded. Click any to open the live site.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-5">
        {sites.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.06}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-line/12 bg-ink-800/40"
            >
              {/* browser chrome */}
              <div className="flex items-center gap-2 border-b border-line/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
                <span className="ml-2 truncate rounded-full bg-line/5 px-3 py-1 text-[11px] text-bone-400">
                  {s.host}.github.io
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
                <Media
                  src={s.img}
                  alt={`${s.name} website`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-cinema group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-bone-50">
                    {s.name}
                  </h3>
                  <p className="text-sm text-bone-400">{s.type}</p>
                </div>
                <span className="shrink-0 text-sm text-mint transition-transform duration-300 group-hover:translate-x-1">
                  Live ↗
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
