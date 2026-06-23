import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Carousel } from "@/components/ui/Carousel";
import { Media } from "@/components/ui/Media";
import { projects } from "@/lib/projects";

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="container-edge mx-auto max-w-edge scroll-mt-20 py-24 md:py-32"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="01">Selected Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              Chosen to show how I{" "}
              <span className="font-serif font-normal italic text-bone-200">
                think
              </span>{" "}
              — not just what I make.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Six case studies — slide through with the arrows, click any to open.
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <Carousel ariaLabel="Selected work">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group w-[84%] shrink-0 snap-start sm:w-[56%] lg:w-[40%]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-700">
                <Media
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 84vw, 40vw"
                  className="object-cover transition-transform duration-[1.2s] ease-cinema group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />
                <span className="absolute left-5 top-5 font-display text-sm text-white/80">
                  {p.index}
                </span>
                <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  View case ↗
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {p.title}
                  </h3>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm text-bone-200">
                  <span className={p.accent === "mint" ? "text-mint" : "text-electric"}>
                    {p.category}
                  </span>
                </p>
                <span className="text-sm text-bone-400">{p.year}</span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
