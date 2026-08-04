"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { useLang } from "@/lib/i18n";
import { withBase } from "@/lib/base";

// Master visuals — full campaign boards (key visual + the thinking behind it).
// Each board carries readable text, so they are shown one per row at full
// container width, with a lightbox for a closer look.
const boards = Array.from(
  { length: 9 },
  (_, i) => `/work/master/${String(i + 1).padStart(2, "0")}.webp`
);

function BoardTile({
  src,
  i,
  onOpen,
  label,
  expand,
}: {
  src: string;
  i: number;
  onOpen: (s: string) => void;
  label: string;
  expand: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      aria-label={`${label} ${i + 1} — ${expand}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-line/10 bg-ink-900 text-left"
    >
      <div className="relative aspect-video">
        <Media
          src={src}
          alt={`${label} ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-[1.03]"
        />
      </div>
      {/* hover affordance */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
        {expand}
      </span>
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 text-[11px] tabular-nums text-white backdrop-blur-md">
        {String(i + 1).padStart(2, "0")}
      </span>
    </button>
  );
}

export default function MasterVisuals() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section
      id="master"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02">{t.master.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                {t.master.h2a}{" "}
                <span className="font-serif font-normal italic text-mint">
                  {t.master.h2i}
                </span>
                {t.master.h2b}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              {t.master.note}
            </p>
          </Reveal>
        </div>

        {/* first board leads full width, the rest sit two-up */}
        <div className="mt-12 grid gap-4 md:gap-5">
          <Reveal>
            <BoardTile src={boards[0]} i={0} onOpen={setOpen} label={t.master.label} expand={t.master.expand} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {boards.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.05}>
                <BoardTile src={src} i={i + 1} onOpen={setOpen} label={t.master.label} expand={t.master.expand} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-3 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(open)}
              alt={t.master.label}
              className="max-h-full max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={t.master.close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-mint/60 hover:text-mint"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
