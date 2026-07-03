"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";
import { openConsult } from "@/components/ConsultModal";

type Mod = { n: string; title: string; dur: string; detail: string };

// Wireframe-styled curriculum blueprint. Deliberately schematic — dashed
// guides, annotation ticks, runtime bars — but kept elegant and premium.
export default function CourseView() {
  const { t } = useLang();
  const c = t.course;
  const [lesson, setLesson] = useState<{ track: string; mod: Mod } | null>(null);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url =
      typeof window !== "undefined" ? window.location.href : "";
    const data = { title: c.metaTitle, text: c.freeLine, url };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <section className="container-edge mx-auto max-w-edge scroll-mt-24 py-28 md:py-36">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Reveal>
          <SectionLabel index="01">{c.kicker}</SectionLabel>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c.freeTag}
            </span>
            <button
              type="button"
              onClick={share}
              className="flex items-center gap-2 rounded-full border border-line/20 px-4 py-1.5 text-xs text-bone-200 transition-colors hover:border-mint/50 hover:text-mint"
            >
              {copied ? c.copied : `${c.share} ↗`}
            </button>
          </div>
        </Reveal>
      </div>

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
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-line/25 px-4 py-1.5 text-xs uppercase tracking-ultra text-bone-400">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                {c.forWho}
              </span>
              <span className="font-serif text-lg italic text-mint">
                {c.freeLine}
              </span>
            </div>
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

              <p className="mt-6 text-[10px] uppercase tracking-ultra text-bone-500">
                {c.modulesLabel}
              </p>
              <Stagger className="mt-3 grid gap-2.5">
                {track.modules.map((mod) => (
                  <StaggerItem key={mod.n}>
                    <button
                      type="button"
                      onClick={() => setLesson({ track: track.title, mod })}
                      className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-line/10 bg-ink-900 px-4 py-3 text-start transition-colors duration-300 hover:border-mint/40"
                    >
                      <span className="grid h-8 w-8 place-items-center rounded-md border border-line/15 text-bone-500 transition-colors group-hover:border-mint/50 group-hover:text-mint">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-bone-50">
                          <span className="text-bone-500">{mod.n} · </span>
                          {mod.title}
                        </span>
                        <span className="block text-xs text-bone-400">
                          {mod.detail}
                        </span>
                      </span>
                      <span className="rounded-full bg-line/10 px-2.5 py-1 text-[11px] tabular-nums text-bone-300">
                        {mod.dur}
                      </span>
                    </button>
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
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={share}
              className="rounded-full border border-line/25 px-6 py-3.5 text-sm text-bone-50 transition-colors hover:border-mint/60 hover:text-mint"
            >
              {copied ? c.copied : `${c.share} ↗`}
            </button>
            <button
              type="button"
              onClick={openConsult}
              className="rounded-full bg-bone-50 px-7 py-3.5 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.03]"
            >
              {c.ctaBtn}
            </button>
          </div>
        </div>
      </Reveal>

      {/* Lesson lightbox — wireframe video + materials */}
      <AnimatePresence>
        {lesson && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLesson(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-2xl border border-line/15 bg-ink-800"
            >
              <div className="flex items-start justify-between gap-4 border-b border-line/10 px-6 py-4">
                <div>
                  <p className="text-[10px] uppercase tracking-ultra text-bone-500">
                    {lesson.track} · {c.lessonPreview}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-bone-50">
                    {lesson.mod.n} · {lesson.mod.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLesson(null)}
                  aria-label={c.closeLesson}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/20 text-bone-300 transition-colors hover:border-mint/50 hover:text-mint"
                >
                  ✕
                </button>
              </div>

              {/* wireframe video player */}
              <div className="p-6">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-line/25 bg-ink-900">
                  {/* schematic guides */}
                  <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
                  <div className="pointer-events-none absolute inset-6 rounded-lg border border-dashed border-line/15" />
                  <div className="relative flex flex-col items-center gap-3 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-line/25 text-bone-300">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="text-xs uppercase tracking-ultra text-bone-400">
                      {c.comingSoon}
                    </span>
                    <span className="rounded-full bg-line/10 px-3 py-1 text-[11px] tabular-nums text-bone-300">
                      {lesson.mod.dur}
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-bone-300">
                  {lesson.mod.detail}
                </p>

                {/* materials */}
                <div className="mt-6">
                  <p className="text-[10px] uppercase tracking-ultra text-bone-500">
                    {c.materialsLabel}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {c.materials.map((mt) => (
                      <span
                        key={mt}
                        className="flex items-center gap-2 rounded-lg border border-dashed border-line/20 bg-ink-900 px-3 py-2.5 text-xs text-bone-300"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        {mt}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-bone-500">{c.materialsNote}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
