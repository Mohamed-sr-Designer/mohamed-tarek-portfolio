"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { withBase } from "@/lib/base";
import { useLang } from "@/lib/i18n";

type Page = { src: string; width: number; height: number };

// Interactive brand-book reader. Cover shows alone, then facing two-page
// spreads. A leaf hinges on the spine and follows the pointer as you drag;
// release completes based on distance + velocity. The turning leaf carries a
// soft drop shadow so the motion feels physical.
export default function Flipbook({
  pages,
  title = "Brand book",
}: {
  pages: Page[];
  title?: string;
}) {
  const reduce = useReducedMotion();
  const { t } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);

  const [twoUp, setTwoUp] = useState(true);
  const [si, setSi] = useState(0); // spread index
  const [flip, setFlip] = useState<null | {
    dir: number; // 1 forward, -1 back
    front: string;
    back: string;
    committing: boolean;
  }>(null);
  const [rot, setRot] = useState(0); // live leaf rotation in deg

  const ratio = pages.length ? pages[0].width / pages[0].height : 1.6;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setTwoUp(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // spreads: [cover], [1,2], [3,4] … on desktop; one page each on mobile
  const spreads = useMemo<number[][]>(() => {
    if (!twoUp) return pages.map((_, i) => [i]);
    const s: number[][] = [[0]];
    for (let i = 1; i < pages.length; i += 2) {
      s.push(i + 1 < pages.length ? [i, i + 1] : [i]);
    }
    return s;
  }, [pages, twoUp]);

  const clampedSi = Math.min(si, spreads.length - 1);
  const cur = spreads[clampedSi];
  const url = (i?: number) =>
    i == null ? "" : withBase(pages[i].src);

  const startFlip = useCallback(
    (dir: number) => {
      const target = clampedSi + dir;
      if (target < 0 || target >= spreads.length || flip) return false;
      const next = spreads[target];
      if (dir > 0) {
        setFlip({
          dir,
          front: url(cur[cur.length - 1]), // leaving right page
          back: url(next[0]), // becomes new left
          committing: false,
        });
      } else {
        setFlip({
          dir,
          front: url(cur[0]), // leaving left page
          back: url(next[next.length - 1]), // becomes new right
          committing: false,
        });
      }
      setRot(0);
      return true;
    },
    [clampedSi, spreads, flip, cur]
  );

  const finish = useCallback(
    (commit: boolean, dir: number) => {
      if (commit) {
        setFlip((f) => (f ? { ...f, committing: true } : f));
        setRot(dir > 0 ? -180 : 180);
        window.setTimeout(() => {
          setSi((v) => Math.max(0, Math.min(spreads.length - 1, v + dir)));
          setFlip(null);
          setRot(0);
        }, 480);
      } else {
        setRot(0);
        window.setTimeout(() => setFlip(null), 320);
      }
    },
    [spreads.length]
  );

  // pointer drag
  const drag = useRef<{ x: number; t: number; w: number; dir: number } | null>(
    null
  );
  const onDown = (e: React.PointerEvent) => {
    if (flip) return;
    drag.current = {
      x: e.clientX,
      t: performance.now(),
      w: stageRef.current?.clientWidth || 600,
      dir: 0,
    };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.dir && Math.abs(dx) > 6) {
      d.dir = dx < 0 ? 1 : -1;
      if (!startFlip(d.dir)) drag.current = null;
      return;
    }
    if (!d.dir || !flip) return;
    const p = Math.max(0, Math.min(1, Math.abs(dx) / d.w));
    setRot(d.dir > 0 ? -p * 180 : p * 180);
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.dir || !flip) return;
    const dx = e.clientX - d.x;
    const dt = Math.max(1, performance.now() - d.t);
    const vel = Math.abs(dx) / dt; // px/ms
    const p = Math.abs(dx) / d.w;
    finish(p > 0.35 || vel > 0.5, d.dir);
  };

  const go = (dir: number) => {
    if (startFlip(dir)) finish(true, dir);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedSi, spreads, flip]);

  // base pages shown under the leaf (reveal target during a flip)
  const leftIdx = flip && flip.dir < 0 ? spreads[clampedSi - 1]?.[0] : cur[0];
  const rightIdx =
    flip && flip.dir > 0
      ? spreads[clampedSi + 1]?.[spreads[clampedSi + 1].length - 1]
      : cur[cur.length - 1];
  const single = cur.length === 1;

  const shadow = Math.min(0.45, (Math.abs(rot) / 180) * 0.5);
  const btn =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line/20 bg-ink-900/80 text-bone-50 backdrop-blur-md transition-colors duration-300 hover:border-mint/60 hover:text-mint disabled:opacity-30";

  const Face = ({ src }: { src: string }) =>
    src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={title}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain [backface-visibility:hidden]"
      />
    ) : (
      <span className="absolute inset-0 bg-ink-700" />
    );

  return (
    <div className="overflow-hidden rounded-2xl border border-line/10 bg-ink-800/60">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 px-5 py-4">
        <p className="text-sm font-medium text-bone-50">
          {title}
          <span className="ml-3 text-xs uppercase tracking-[0.2em] text-bone-400">
            {t.case.interactive}
          </span>
        </p>
        <p className="text-sm tabular-nums text-bone-400">
          {cur[0] + 1}
          {cur.length > 1 ? `–${cur[cur.length - 1] + 1}` : ""} / {pages.length}
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative select-none px-3 py-6 md:px-8 md:py-10"
        style={{ perspective: 2400, touchAction: "pan-y" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div
          className="relative mx-auto flex w-full items-stretch justify-center"
          style={{
            maxWidth: single ? "42rem" : "66rem",
            aspectRatio: String(single ? ratio : ratio * 2),
            transformStyle: "preserve-3d",
          }}
        >
          {/* left base */}
          {!single && (
            <div className="relative h-full w-1/2 overflow-hidden rounded-l-md bg-ink-700 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]">
              <Face src={url(leftIdx)} />
            </div>
          )}
          {/* right base (or single) */}
          <div
            className={`relative h-full overflow-hidden bg-ink-700 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] ${
              single ? "w-full rounded-md" : "w-1/2 rounded-r-md"
            }`}
          >
            <Face src={url(single ? cur[0] : rightIdx)} />
          </div>

          {/* turning leaf */}
          {flip ? (
            <motion.div
              className="absolute top-0 h-full w-1/2 overflow-hidden rounded-md"
              style={{
                left: flip.dir > 0 ? "50%" : "0%",
                transformOrigin: flip.dir > 0 ? "left center" : "right center",
                transformStyle: "preserve-3d",
                zIndex: 20,
              }}
              animate={{ rotateY: rot }}
              transition={
                flip.committing || drag.current == null
                  ? { duration: 0.48, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0 }
              }
            >
              {/* front (leaving) */}
              <div className="absolute inset-0 overflow-hidden rounded-md bg-ink-700 [backface-visibility:hidden]">
                <Face src={flip.front} />
              </div>
              {/* back (incoming), pre-rotated */}
              <div
                className="absolute inset-0 overflow-hidden rounded-md bg-ink-700"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <Face src={flip.back} />
              </div>
              {/* soft page shadow that deepens as it lifts */}
              <div
                className="pointer-events-none absolute inset-0 rounded-md"
                style={{
                  background:
                    flip.dir > 0
                      ? `linear-gradient(to right, rgba(0,0,0,${shadow}), rgba(0,0,0,0))`
                      : `linear-gradient(to left, rgba(0,0,0,${shadow}), rgba(0,0,0,0))`,
                }}
              />
            </motion.div>
          ) : null}

          {/* spine */}
          {!single && (
            <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-black/40" />
          )}

          {/* edge tap zones */}
          <button
            type="button"
            aria-label={t.case.prev}
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 z-0 w-[14%] cursor-w-resize"
          />
          <button
            type="button"
            aria-label={t.case.next}
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 z-0 w-[14%] cursor-e-resize"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-line/10 px-5 py-4">
        <button
          type="button"
          className={btn}
          onClick={() => go(-1)}
          disabled={clampedSi === 0}
          aria-label={t.case.prev}
        >
          ‹
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-line/10">
          <div
            className="h-full rounded-full bg-mint transition-all duration-500"
            style={{ width: `${((clampedSi + 1) / spreads.length) * 100}%` }}
          />
        </div>
        <button
          type="button"
          className={btn}
          onClick={() => go(1)}
          disabled={clampedSi === spreads.length - 1}
          aria-label={t.case.next}
        >
          ›
        </button>
      </div>
    </div>
  );
}
