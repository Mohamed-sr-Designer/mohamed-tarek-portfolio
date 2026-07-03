"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { withBase } from "@/lib/base";
import { useLang } from "@/lib/i18n";

type Page = { src: string; width: number; height: number };

// Interactive brand-book reader with a real page-flip: the top page rotates
// on its spine (origin edge) in 3D to reveal the next. Arrow keys, edge taps,
// buttons and horizontal swipe all turn pages.
export default function Flipbook({
  pages,
  title = "Brand book",
}: {
  pages: Page[];
  title?: string;
}) {
  const reduce = useReducedMotion();
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState<null | { dir: number; from: number }>(null);
  const [swipeX, setSwipeX] = useState(0);

  const landscape = pages.length > 0 && pages[0].width > pages[0].height;
  const ratio = pages.length ? pages[0].width / pages[0].height : 1.4;

  const go = useCallback(
    (dir: number) => {
      setI((v) => {
        const next = Math.max(0, Math.min(pages.length - 1, v + dir));
        if (next !== v && !reduce) setFlip({ dir, from: v });
        return next;
      });
    },
    [pages.length, reduce]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const prevSrc = useMemo(
    () => (flip ? withBase(pages[flip.from].src) : null),
    [flip, pages]
  );

  const btn =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/20 bg-ink-900/80 text-bone-50 backdrop-blur-md transition-colors duration-300 hover:border-mint/60 hover:text-mint disabled:opacity-30 disabled:hover:border-line/20 disabled:hover:text-bone-50";

  return (
    <div className="overflow-hidden rounded-2xl border border-line/10 bg-ink-800/60">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 px-5 py-4">
        <p className="text-sm font-medium text-bone-50">
          {title}
          <span className="ml-3 text-xs uppercase tracking-[0.2em] text-bone-400">
            {t.case.interactive}
          </span>
        </p>
        <p className="text-sm tabular-nums text-bone-400">
          {i + 1} / {pages.length}
        </p>
      </div>

      {/* book stage */}
      <div
        className="relative select-none px-3 py-6 md:px-8 md:py-10"
        style={{ perspective: 2000 }}
        onPointerDown={(e) => {
          const startX = e.clientX;
          const onUp = (ev: PointerEvent) => {
            const dx = ev.clientX - startX;
            setSwipeX(0);
            if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("pointermove", onMove);
          };
          const onMove = (ev: PointerEvent) =>
            setSwipeX(Math.max(-40, Math.min(40, ev.clientX - startX)));
          window.addEventListener("pointerup", onUp);
          window.addEventListener("pointermove", onMove);
        }}
      >
        <div
          className="relative mx-auto w-full"
          style={{
            maxWidth: landscape ? "64rem" : "40rem",
            aspectRatio: String(ratio),
            transformStyle: "preserve-3d",
          }}
        >
          {/* current page */}
          <motion.img
            key={"cur-" + i}
            src={withBase(pages[i].src)}
            alt={`${title} — page ${i + 1}`}
            className="absolute inset-0 h-full w-full rounded-md bg-ink-700 object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.7)]"
            initial={reduce ? false : { opacity: 0.6 }}
            animate={{ opacity: 1, x: swipeX }}
            transition={{ duration: 0.3 }}
          />

          {/* flipping page (previous), rotates away on its spine */}
          {flip && prevSrc ? (
            <motion.div
              key={"flip-" + flip.from}
              className="absolute inset-0 origin-left overflow-hidden rounded-md bg-ink-700"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: flip.dir > 0 ? "left center" : "right center",
                backfaceVisibility: "hidden",
                zIndex: 5,
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flip.dir > 0 ? -160 : 160 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => setFlip(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prevSrc}
                alt=""
                className="h-full w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/30" />
            </motion.div>
          ) : null}

          {/* edge tap zones */}
          <button
            type="button"
            aria-label={t.case.prev}
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 z-10 w-1/4 cursor-w-resize"
          />
          <button
            type="button"
            aria-label={t.case.next}
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 z-10 w-1/4 cursor-e-resize"
          />
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center gap-4 border-t border-line/10 px-5 py-4">
        <button
          type="button"
          className={btn}
          onClick={() => go(-1)}
          disabled={i === 0}
          aria-label={t.case.prev}
        >
          ‹
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line/10">
          <div
            className="h-full rounded-full bg-mint transition-all duration-500"
            style={{ width: `${((i + 1) / pages.length) * 100}%` }}
          />
        </div>
        <button
          type="button"
          className={btn}
          onClick={() => go(1)}
          disabled={i === pages.length - 1}
          aria-label={t.case.next}
        >
          ›
        </button>
      </div>
    </div>
  );
}
