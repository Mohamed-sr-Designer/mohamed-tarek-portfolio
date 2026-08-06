"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { withBase } from "@/lib/base";
import { useLang } from "@/lib/i18n";

// Custom lettering, Arabic and Latin.
//
// Each piece ships as two cuts on transparent alpha: a white one for dark mode
// and a black one for light. They sit straight on the page background — no tile
// behind them — so the letterforms read as artwork rather than as thumbnails.
//
// Pieces 07 and 08 only exist as one full-colour cut, so those keep a dark
// plate in both themes; their white elements would vanish on the light page.
const PLATED = new Set([7, 8]);

const pieces = Array.from({ length: 8 }, (_, i) => {
  const id = String(i + 1).padStart(2, "0");
  return {
    id,
    dark: `/work/type/${id}-dark.webp`,
    light: `/work/type/${id}-light.webp`,
    plated: PLATED.has(i + 1),
  };
});

export default function TypeDesign() {
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
      id="type"
      className="container-edge mx-auto max-w-edge scroll-mt-24 section-y"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel>{t.type.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              {t.type.h2a}{" "}
              <span className="font-serif font-normal italic text-mint">
                {t.type.h2i}
              </span>
              {t.type.h2b}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            {t.type.note}
          </p>
        </Reveal>
      </div>

      {/* Laid out like a type specimen sheet: a hairline lattice, one piece per
          cell, plenty of room around the letterforms.
          The lattice comes from a 1px grid gap over a faint line colour with
          cells painted in the page colour — so the rules read as rules and the
          artwork still sits on the page, with no tile behind it in either
          theme. An earlier version floated the pieces in a plain gapped grid;
          because they have very different proportions, nothing lined up. */}
      <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/12 sm:grid-cols-3 lg:grid-cols-4">
        {pieces.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpen(p.dark)}
            aria-label={`${t.type.label} ${i + 1} — ${t.master.expand}`}
            className={`group relative aspect-[5/4] p-7 transition-colors duration-500 md:p-9 ${
              p.plated
                ? "bg-[#100F0D]"
                : "bg-ink-900 hover:bg-ink-800"
            }`}
          >
            <span
              className={`absolute left-4 top-4 font-serif text-xs italic transition-colors duration-300 group-hover:text-mint ${
                p.plated ? "text-white/35" : "text-bone-500"
              }`}
            >
              {p.id}
            </span>

            <span className="relative block h-full w-full transition-transform duration-700 ease-cinema group-hover:scale-[1.06]">
              {/* white cut, dark theme */}
              <span className="absolute inset-0 hidden dark:block">
                <Media
                  src={p.dark}
                  alt={`${t.type.label} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 21vw"
                  className="object-contain"
                />
              </span>
              {/* black cut, light theme */}
              <span className="absolute inset-0 block dark:hidden">
                <Media
                  src={p.plated ? p.dark : p.light}
                  alt={`${t.type.label} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 21vw"
                  className="object-contain"
                />
              </span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/92 p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(open)}
              alt={t.type.label}
              className="max-h-full max-w-full object-contain"
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
