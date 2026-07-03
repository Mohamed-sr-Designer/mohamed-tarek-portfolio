"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();
  return (
    <section
      id="about"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <Reveal>
        <SectionLabel index="01">{t.about.label}</SectionLabel>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-ink-700">
              <Media
                src="/me/portrait.webp"
                alt="Mohamed Tarek"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </Reveal>
        </div>

        {/* Bio */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-balance font-sans text-3xl font-light leading-[1.18] tracking-tight text-bone-50 md:text-[2.6rem]">
              {t.about.intro1}{" "}
              <span className="font-serif italic text-mint">
                {t.about.introAccent}
              </span>{" "}
              {t.about.intro2}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 text-pretty text-base leading-relaxed text-bone-200 md:text-lg">
            <Reveal delay={0.05}>
              <p>{t.about.bio1}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t.about.bio2}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                {t.about.coreFocus}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.about.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 text-sm text-bone-50"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                {t.about.traitsLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.about.traits.map((tr) => (
                  <span
                    key={tr}
                    className="rounded-full border border-line/15 px-4 py-1.5 text-sm text-bone-200"
                  >
                    {tr}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
