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

        <div className="mt-12 grid gap-6">
          {boards.map((src, i) => (
            <Reveal key={src}>
              <button
                type="button"
                onClick={() => setOpen(src)}
                aria-label={`${t.master.label} ${i + 1} — ${t.master.expand}`}
                className="group block w-full overflow-hidden rounded-2xl border border-line/10 bg-ink-900 text-left"
              >
                <Media
                  src={src}
                  alt={`${t.master.label} ${i + 1}`}
                  sizes="(max-width: 1024px) 100vw, 80rem"
                  className="h-auto w-full transition-transform duration-700 ease-cinema group-hover:scale-[1.01]"
                />
              </button>
            </Reveal>
          ))}
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
