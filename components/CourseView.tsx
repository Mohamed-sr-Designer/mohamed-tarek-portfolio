"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";
import { withBase } from "@/lib/base";
import { openConsult } from "@/components/ConsultModal";
import { openPayment } from "@/components/PaymentModal";

// LMS-style course player (reference: al mentor). A track dropdown up top,
// a wireframe video player on the left, and a curriculum sidebar on the
// right. The video is a "coming soon" placeholder; the chrome reads like a
// real player. A cross-sell hint points to the sibling track.
export default function CourseView() {
  const { t } = useLang();
  const c = t.course;
  const [ti, setTi] = useState(0); // track index
  const [li, setLi] = useState(0); // lesson index
  const [copied, setCopied] = useState(false);

  // Preselect a track from ?track=<i> (used by the nav "Course" dropdown)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("track");
    const n = Number(p);
    if (p !== null && !Number.isNaN(n) && n >= 0 && n < c.tracks.length) {
      setTi(n);
      setLi(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playerRef = useRef<HTMLDivElement>(null);
  const track = c.tracks[ti];
  const lesson = track.modules[li];

  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  };
  const other = c.tracks[(ti + 1) % c.tracks.length];
  const otherIndex = (ti + 1) % c.tracks.length;
  const progress = ((li + 1) / track.modules.length) * 100;

  const pick = (i: number) => {
    setTi(i);
    setLi(0);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: c.metaTitle, text: c.freeLine, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* cancelled */
    }
  };

  return (
    <section className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Reveal>
          <SectionLabel index="01">{c.kicker}</SectionLabel>
        </Reveal>
        <Reveal>
          <div className="flex items-center gap-3">
            {track.free ? (
              <span className="flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                {c.freeTag}
              </span>
            ) : (
              <span className="flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-electric">
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                {c.premiumTag}
              </span>
            )}
            <button
              type="button"
              onClick={share}
              className="rounded-full border border-line/20 px-4 py-1.5 text-xs text-bone-200 transition-colors hover:border-mint/50 hover:text-mint"
            >
              {copied ? c.copied : `${c.share} ↗`}
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <h1 className="mt-8 max-w-3xl text-balance text-3xl font-semibold leading-[1.04] tracking-tight text-bone-50 md:text-5xl">
          {c.title}
        </h1>
      </Reveal>

      {/* track dropdown */}
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <label className="text-xs uppercase tracking-ultra text-bone-500">
            {c.choose}
          </label>
          <div className="relative">
            <select
              value={ti}
              onChange={(e) => pick(Number(e.target.value))}
              className="appearance-none rounded-full border border-line/20 bg-ink-800 py-2.5 pl-5 pr-10 text-sm font-medium text-bone-50 outline-none transition-colors hover:border-mint/50 focus:border-mint/60 rtl:pl-10 rtl:pr-5"
            >
              {c.tracks.map((tr, i) => (
                <option key={tr.n} value={i}>
                  {tr.n} — {tr.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bone-400 rtl:left-4 rtl:right-auto">
              ▾
            </span>
          </div>
          <span className="rounded-full bg-line/10 px-3 py-1 text-xs text-bone-300">
            {track.runtime}
          </span>
        </div>
      </Reveal>

      {/* player + curriculum */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* player */}
        <div className="lg:col-span-2">
          <div
            ref={playerRef}
            className="relative overflow-hidden rounded-2xl border border-line/12 bg-ink-800/40"
          >
            {/* fullscreen toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-mint/60 hover:text-mint"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            {track.free ? (
              /* free track — real (test) video; download/PiP/right-click disabled */
              <video
                key={ti}
                src={withBase("/course/test.mp4")}
                poster={withBase("/course/test.jpg")}
                controls
                controlsList="nodownload noremoteplayback noplaybackrate"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                playsInline
                preload="metadata"
                className="aspect-video w-full bg-black"
              />
            ) : (
              /* paid track — locked / premium state */
              <div className="relative flex aspect-video items-center justify-center bg-ink-900">
                <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
                <div className="pointer-events-none absolute inset-8 rounded-lg border border-dashed border-line/15" />
                <div className="relative flex max-w-sm flex-col items-center gap-3 px-6 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-electric/40 text-electric">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-bone-50">
                    {c.lockedTitle}
                  </span>
                  <span className="text-xs leading-relaxed text-bone-400">
                    {c.lockedNote}
                  </span>
                  <button
                    type="button"
                    onClick={openPayment}
                    className="mt-1 rounded-full bg-bone-50 px-5 py-2.5 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.03]"
                  >
                    {c.getAccess}
                  </button>
                </div>
              </div>
            )}

            {/* lesson meta */}
            <div className="p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-ultra text-bone-500">
                {track.title} · {c.nowPlaying}
              </p>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-bone-50 md:text-2xl">
                {lesson.n} · {lesson.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">
                {lesson.detail}
              </p>
              <p className="mt-3 text-xs text-bone-500">{c.playerNote}</p>

              {/* materials */}
              <div className="mt-6 border-t border-line/10 pt-5">
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
              </div>
            </div>
          </div>
        </div>

        {/* curriculum sidebar */}
        <aside className="lg:col-span-1">
          <div className="flex h-full flex-col rounded-2xl border border-line/12 bg-ink-800/40 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-bone-50">
                {c.curriculum}
              </h3>
              <span className="text-xs tabular-nums text-bone-400">
                {li + 1} / {track.modules.length} {c.lessonsWord}
              </span>
            </div>
            {/* progress */}
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-line/10">
              <div
                className="h-full rounded-full bg-mint transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* lessons */}
            <ul className="mt-4 grid gap-1.5">
              {track.modules.map((mod, i) => {
                const active = i === li;
                const done = i < li;
                return (
                  <li key={mod.n}>
                    <button
                      type="button"
                      onClick={() => setLi(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start transition-colors ${
                        active
                          ? "bg-mint/10 ring-1 ring-mint/30"
                          : "hover:bg-ink-900"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] ${
                          done
                            ? "bg-mint/20 text-mint"
                            : active
                            ? "bg-mint text-ink-900"
                            : "border border-line/20 text-bone-400"
                        }`}
                      >
                        {done ? "✓" : (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-bone-100">
                          {mod.title}
                        </span>
                        <span className="block text-[11px] text-bone-500">
                          {c.videoWord} · {mod.dur}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* cross-sell hint */}
            <div className="mt-5 rounded-xl border border-dashed border-electric/30 bg-electric/5 p-4">
              <p className="text-[10px] uppercase tracking-ultra text-electric">
                {c.related}
              </p>
              <p className="mt-1.5 text-sm font-medium text-bone-50">
                {other.n} — {other.title}
              </p>
              <button
                type="button"
                onClick={() => pick(otherIndex)}
                className="mt-2 text-sm text-electric underline-offset-4 hover:underline"
              >
                {c.relatedCta}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* CTA */}
      <Reveal>
        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-line/25 bg-ink-800/40 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-bone-50 md:text-4xl">
              {c.ctaTitle}
            </h2>
            <p className="mt-2 font-serif text-lg italic text-mint">
              {c.freeLine}
            </p>
          </div>
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
    </section>
  );
}
