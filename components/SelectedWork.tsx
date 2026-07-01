"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Carousel } from "@/components/ui/Carousel";
import { Media } from "@/components/ui/Media";
import { projects, sectors } from "@/lib/projects";

const filters = ["All", ...sectors];

export default function SelectedWork() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? projects : projects.filter((p) => p.sector === active);

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
              Work, organised by the{" "}
              <span className="font-serif font-normal italic text-bone-200">
                industry
              </span>{" "}
              it was built for.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Filter by sector below, then slide through with the arrows — click any
            case to open it.
          </p>
        </Reveal>
      </div>

      {/* Industry filter */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Filter work by industry"
          className="mt-10 flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = f === active;
            const count =
              f === "All"
                ? projects.length
                : projects.filter((p) => p.sector === f).length;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive
                    ? "border-transparent bg-bone-50 text-ink-900"
                    : "border-line/15 text-bone-300 hover:border-line/35 hover:text-bone-50"
                }`}
              >
                {f}
                <span
                  className={`text-xs ${
                    isActive ? "text-ink-900/60" : "text-bone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-10">
        <Carousel key={active} ariaLabel="Selected work">
          {shown.map((p) => (
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
                <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs uppercase tracking-widest text-white backdrop-blur-md">
                  {p.sector}
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
