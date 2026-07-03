"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

export default function Process() {
  const { t } = useLang();
  return (
    <section id="process" className="border-y border-line/10 bg-ink-800/40 scroll-mt-24">
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="04">{t.process.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                {t.process.h2a}{" "}
                <span className="font-serif italic text-mint">
                  {t.process.h2i}
                </span>
                {t.process.h2b}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              {t.process.note}
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-5">
          {t.process.steps.map((s) => (
            <StaggerItem
              key={s.n}
              className="group flex flex-col gap-4 bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-800"
            >
              <span className="font-serif text-5xl text-bone-500 transition-colors duration-500 group-hover:text-mint">
                {s.n}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-bone-50">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-bone-400">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
