"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

export default function Vision() {
  const { t } = useLang();
  return (
    <section
      id="vision"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-36"
    >
      <Reveal>
        <SectionLabel index="07">{t.vision.label}</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-10 max-w-5xl text-balance font-sans text-4xl font-light leading-[1.06] tracking-tight text-bone-50 md:text-7xl">
          {t.vision.h2a}{" "}
          <span className="font-serif italic text-mint">{t.vision.h2i}</span>{" "}
          {t.vision.h2b}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 md:grid-cols-3">
        {t.vision.pillars.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.08}>
            <div className="flex h-full flex-col gap-4 bg-ink-900 p-8">
              <span className="text-xs uppercase tracking-ultra text-bone-400">
                {p.k}
              </span>
              <p className="text-pretty text-lg leading-relaxed text-bone-200">
                {p.v}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
