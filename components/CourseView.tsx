"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";
import { openConsult } from "@/components/ConsultModal";

// Wireframe-styled curriculum blueprint. Deliberately schematic — dashed
// guides, annotation ticks, runtime bars — but kept elegant and premium.
export default function CourseView() {
  const { t } = useLang();
  const c = t.course;

  return (
    <section className="container-edge mx-auto max-w-edge scroll-mt-24 py-28 md:py-36">
      {/* header */}
      <Reveal>
        <SectionLabel index="01">{c.kicker}</SectionLabel>
      </Reveal>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <h1 className="text-balance text-4xl font-semibold leading-[1.03] tracking-tight text-bone-50 md:text-6xl">
              {c.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-bone-300 md:text-lg">
              {c.intro}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-dashed border-line/25 px-4 py-1.5 text-xs uppercase tracking-ultra text-bone-400">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c.forWho}
            </p>
          </Reveal>
        </div>

        {/* outcomes — wireframe card */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="relative rounded-xl border border-dashed border-line/25 bg-ink-800/40 p-6">
              <span className="absolute -top-2.5 left-5 bg-ink-900 px-2 text-[10px] uppercase tracking-ultra text-bone-500">
                {c.outcomesLabel}
              </span>
              <ul className="mt-2 grid gap-3">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-bone-200">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-[3px] border border-mint/50 text-[9px] text-mint">
                      ✓
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* tracks */}
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        {c.tracks.map((track) => (
          <Reveal key={track.n}>
            <div className="flex h-full flex-col rounded-2xl border border-line/12 bg-ink-800/30 p-6 md:p-8">
              {/* track head */}
              <div className="flex items-start justify-between gap-4 border-b border-dashed border-line/20 pb-5">
                <div>
                  <span className="font-serif text-sm italic text-mint">
                    {track.n}
                  </span>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                    {track.title}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-line/20 px-3 py-1 text-xs text-bone-300">
                  {track.runtime}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-bone-400">
                {track.desc}
              </p>

              {/* modules */}
              <p className="mt-6 text-[10px] uppercase tracking-ultra text-bone-500">
                {c.modulesLabel}
              </p>
              <Stagger className="mt-3 grid gap-2.5">
                {track.modules.map((mod) => (
                  <StaggerItem
                    key={mod.n}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-line/10 bg-ink-900 px-4 py-3 transition-colors duration-300 hover:border-mint/30"
                  >
                    <span className="font-display text-sm tabular-nums text-bone-500 group-hover:text-mint">
                      {mod.n}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-bone-50">
                        {mod.title}
                      </span>
                      <span className="block text-xs text-bone-400">
                        {mod.detail}
                      </span>
                    </span>
                    <span className="rounded-full bg-line/10 px-2.5 py-1 text-[11px] tabular-nums text-bone-300">
                      {mod.dur}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-line/25 bg-ink-800/40 p-8 md:flex-row md:items-center md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-bone-50 md:text-4xl">
            {c.ctaTitle}
          </h2>
          <button
            type="button"
            onClick={openConsult}
            className="shrink-0 rounded-full bg-bone-50 px-7 py-3.5 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.03]"
          >
            {c.ctaBtn}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
