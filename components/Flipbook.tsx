"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { withBase } from "@/lib/base";

type Page = { src: string; width: number; height: number };

// Interactive brand-book reader: spreads like an open magazine on desktop,
// single pages on mobile. Arrow keys, edge clicks and buttons turn pages.
export default function Flipbook({
  pages,
  title = "Brand book",
}: {
  pages: Page[];
  title?: string;
}) {
  const reduce = useReducedMotion();
  const [perView, setPerView] = useState(2);
  const [idx, setIdx] = useState(0); // spread index
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setPerView(mq.matches ? 2 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Landscape decks read one big slide at a time; portrait books get
  // magazine spreads (cover alone, then pairs) on desktop.
  const isLandscape = pages.length > 0 && pages[0].width > pages[0].height;
  const spreads = useMemo(() => {
    if (perView === 1 || isLandscape) return pages.map((_, i) => [i]);
    const s: number[][] = [[0]];
    for (let i = 1; i < pages.length; i += 2) {
      s.push(i + 1 < pages.length ? [i, i + 1] : [i]);
    }
    return s;
  }, [pages, perView, isLandscape]);

  const clamped = Math.min(idx, spreads.length - 1);
  const current = spreads[clamped];

  const turn = useCallback(
    (d: number) => {
      setDir(d);
      setIdx((v) => Math.max(0, Math.min(spreads.length - 1, v + d)));
    },
    [spreads.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const first = current[0];
  const last = current[current.length - 1];

  const btn =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/20 bg-ink-900/80 text-bone-50 backdrop-blur-md transition-colors duration-300 hover:border-mint/60 hover:text-mint disabled:opacity-30 disabled:hover:border-line/20 disabled:hover:text-bone-50";

  return (
    <div className="overflow-hidden rounded-2xl border border-line/10 bg-ink-800/60">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 px-5 py-4">
        <p className="text-sm font-medium text-bone-50">
          {title}
          <span className="ml-3 text-xs uppercase tracking-[0.2em] text-bone-400">
            Interactive
          </span>
        </p>
        <p className="text-sm tabular-nums text-bone-400">
          {first + 1}
          {last !== first ? `–${last + 1}` : ""} / {pages.length}
        </p>
      </div>

      {/* book */}
      <div
        className="relative select-none px-3 py-6 md:px-6 md:py-10"
        style={{ perspective: 1600 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={clamped + "-" + perView}
            initial={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, rotateY: dir * 14, x: dir * 36 }
            }
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, rotateY: dir * -10, x: dir * -28 }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-5xl items-stretch justify-center gap-1.5"
            style={{ transformStyle: "preserve-3d" }}
          >
            {current.map((p) => (
              <img
                key={pages[p].src}
                src={withBase(pages[p].src)}
                alt={`${title} — page ${p + 1}`}
                width={pages[p].width}
                height={pages[p].height}
                loading={clamped < 2 ? "eager" : "lazy"}
                className="h-auto max-h-[72vh] w-auto min-w-0 rounded-md bg-ink-700 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* edge click zones */}
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => turn(-1)}
          className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize"
        />
        <button
          type="button"
          aria-label="Next page"
          onClick={() => turn(1)}
          className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize"
        />
      </div>

      {/* controls */}
      <div className="flex items-center justify-between gap-4 border-t border-line/10 px-5 py-4">
        <button
          type="button"
          className={btn}
          onClick={() => turn(-1)}
          disabled={clamped === 0}
          aria-label="Previous spread"
        >
          ‹
        </button>
        {/* progress */}
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line/10">
          <div
            className="h-full rounded-full bg-mint transition-all duration-500"
            style={{
              width: `${((clamped + 1) / spreads.length) * 100}%`,
            }}
          />
        </div>
        <button
          type="button"
          className={btn}
          onClick={() => turn(1)}
          disabled={clamped === spreads.length - 1}
          aria-label="Next spread"
        >
          ›
        </button>
      </div>
    </div>
  );
}
