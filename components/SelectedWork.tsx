"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { projects, sectors, type Project } from "@/lib/projects";

// One compact, recruiter-friendly work section: industry tabs — click a
// sector, see only its cases. All panels stay in the DOM (hidden, not
// unmounted) so search engines index every industry and its copy.
const groups = sectors.map((s) => ({
  sector: s,
  items: projects.filter((p) => p.sector === s),
}));

// One crawlable, keyword-bearing line per industry (SEO/GEO + quick scan).
const blurbs: Record<string, string> = {
  Technology:
    "Cybersecurity and HR-SaaS campaigns — complex products made human, in Arabic and English.",
  "Food & Retail":
    "Premium gifting and produce brands — identity, packaging and campaigns that sell the feeling.",
  "Real Estate":
    "Bilingual AR/EN campaigns for luxury developments in Makkah and the Gulf.",
  "Marketing & Agency":
    "3D concept campaigns and scalable social systems for agencies and multi-brand feeds.",
  Hospitality:
    "B2B hospitality supply made five-star — cinematic key visuals and cross-channel social.",
  Automotive:
    "Geely & GWM key visuals — retouching, colour grading and calm, premium light.",
};

function Card({ p }: { p: Project }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-700">
        <Media
          src={p.cover}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 92vw, 42vw"
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
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState(groups[0].sector);

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
            Nine case studies across six industries — pick a sector, open a
            case.
          </p>
        </Reveal>
      </div>

      {/* Industry tabs */}
      <Reveal delay={0.1}>
        <div
          role="tablist"
          aria-label="Work by industry"
          className="mt-10 flex flex-wrap gap-2"
        >
          {groups.map((g) => {
            const isActive = g.sector === active;
            return (
              <button
                key={g.sector}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${g.sector}`}
                onClick={() => setActive(g.sector)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive
                    ? "border-transparent bg-bone-50 text-ink-900"
                    : "border-line/15 text-bone-300 hover:border-line/35 hover:text-bone-50"
                }`}
              >
                {g.sector}
                <span
                  className={`text-xs ${
                    isActive ? "text-ink-900/60" : "text-bone-500"
                  }`}
                >
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Panels — all rendered for SEO, only the active one visible */}
      {groups.map((g) => (
        <div
          key={g.sector}
          id={`panel-${g.sector}`}
          role="tabpanel"
          hidden={g.sector !== active}
          className="mt-10"
        >
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-bone-300 md:text-lg">
            {blurbs[g.sector]}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {g.items.map((p) => (
              <Card key={p.slug} p={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
