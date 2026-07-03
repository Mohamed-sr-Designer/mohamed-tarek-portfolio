"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

// Teaching & mentorship — a recruiter-friendly proof of leadership:
// four academies, ~1,200 graduates, plus on-site design advisory.
export default function Teaching() {
  const { t } = useLang();
  return (
    <section
      id="teaching"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">{t.teach.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                {t.teach.h2a}{" "}
                <span className="font-serif font-normal italic text-mint">
                  {t.teach.h2i}
                </span>
                {t.teach.h2b}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              {t.teach.note}
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-3">
            {t.teach.stats.map((s) => (
              <div key={s.l} className="bg-ink-900 p-7 text-center md:p-9">
                <p className="font-display text-4xl font-semibold tracking-tight text-bone-50 md:text-6xl">
                  {s.n}
                </p>
                <p className="mt-2 text-xs uppercase tracking-ultra text-bone-400">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-sm text-bone-400">
            {t.teach.statNote}
          </p>
        </Reveal>

        {/* academies */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {t.teach.academies.map((a) => (
            <StaggerItem
              key={a.name}
              className="flex h-full flex-col gap-3 rounded-xl border border-line/10 bg-ink-900 p-7 transition-colors duration-300 hover:border-mint/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-bone-50 md:text-2xl">
                  {a.name}
                </h3>
                {a.now ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-mint/30 bg-mint/5 px-3 py-1 text-xs text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    {t.teach.current}
                  </span>
                ) : null}
              </div>
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                {t.teach.role}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-bone-300">
                {a.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
