"use client";

import { motion, useReducedMotion } from "framer-motion";
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

      {/* No portrait here — the About hero above is already a full-bleed shot
          of him, so a second photograph just pushed the reading down the page.
          The statement now runs full width and the copy sits in two columns. */}
      <Reveal>
        <p className="mt-10 max-w-5xl text-balance font-sans text-3xl font-light leading-[1.15] tracking-tight text-bone-50 md:text-5xl lg:text-6xl">
          <RevealWords text={t.about.intro1} />{" "}
          <span className="font-serif italic text-mint">
            {t.about.introAccent}
          </span>{" "}
          <RevealWords text={t.about.intro2} delay={0.25} />
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

// Word-by-word rise for the opening statement.
function RevealWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduce ? { opacity: 1 } : { y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + Math.min(i * 0.035, 0.5),
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </>
  );
}
