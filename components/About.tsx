"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();
  return (
    <section
      id="about"
      className="container-edge mx-auto max-w-edge scroll-mt-24 section-y"
    >
      <Reveal>
        <SectionLabel>{t.about.label}</SectionLabel>
      </Reveal>

      {/* No portrait here: the About hero above is already a full-bleed shot of
          him, so a second photograph only pushed the reading further down.

          One paragraph, one reveal. A previous version animated this word by
          word, each word in an overflow-hidden span translated up from below.
          When the per-word in-view trigger didn't fire, the words stayed parked
          outside their own clipping box and the statement rendered blank,
          leaving just the un-animated accent on screen. A transform inside
          overflow-hidden fails to invisible text, which is not worth the
          effect on the one line that has to be read. */}
      <Reveal>
        <p className="mt-10 max-w-5xl text-balance font-sans text-3xl font-light leading-[1.15] tracking-tight text-bone-50 md:text-5xl lg:text-6xl">
          {t.about.intro1}{" "}
          <span className="font-serif italic text-mint">
            {t.about.introAccent}
          </span>{" "}
          {t.about.intro2}
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="grid gap-5 text-pretty text-base leading-relaxed text-bone-200 md:text-lg lg:col-span-7">
          <Reveal delay={0.05}>
            <p>{t.about.bio1}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{t.about.bio2}</p>
          </Reveal>
        </div>

        {/* Focus and traits, staggered in one at a time */}
        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <p className="text-xs uppercase tracking-ultra text-bone-400">
              {t.about.coreFocus}
            </p>
          </Reveal>
          <Stagger className="mt-3 flex flex-wrap gap-2">
            {t.about.focus.map((f) => (
              <StaggerItem key={f}>
                <span className="inline-block rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 text-sm text-bone-50 transition-colors duration-300 hover:border-mint hover:bg-mint/10">
                  {f}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mt-8 text-xs uppercase tracking-ultra text-bone-400">
              {t.about.traitsLabel}
            </p>
          </Reveal>
          <Stagger className="mt-3 flex flex-wrap gap-2">
            {t.about.traits.map((tr) => (
              <StaggerItem key={tr}>
                <span className="inline-block rounded-full border border-line/15 px-4 py-1.5 text-sm text-bone-200 transition-colors duration-300 hover:border-mint/50 hover:text-mint">
                  {tr}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
