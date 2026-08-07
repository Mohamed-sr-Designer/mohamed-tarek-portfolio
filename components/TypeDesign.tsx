"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { withBase } from "@/lib/base";
import { useLang } from "@/lib/i18n";

// Custom Arabic and Latin lettering, produced with AI tooling and finished by
// hand-off into logotypes and campaign headlines.
//
// Presented as a continuous auto-scrolling loop rather than a grid: the pieces
// have very different proportions, so a fixed grid left them floating at odd
// sizes with nothing lining up. In a strip they each keep their natural width
// and share one baseline. Each piece ships as two cuts on transparent alpha —
// white for dark mode, black for light — so the letterforms sit straight on
// the page with no tile behind them.
//
// Pieces 07 and 08 exist only as a single full-colour cut whose white elements
// would vanish on the light theme, so those two keep a fixed dark plate.
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

function Piece({
  piece,
  index,
  onOpen,
  label,
}: {
  piece: (typeof pieces)[number];
  index: number;
  onOpen: (src: string) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(piece.dark)}
      aria-label={`${label} ${index + 1}`}
      className={`group relative h-32 w-56 shrink-0 rounded-xl px-6 py-4 transition-transform duration-500 ease-cinema hover:scale-[1.05] sm:h-40 sm:w-72 sm:px-8 sm:py-5 ${
        piece.plated ? "bg-[#100F0D]" : ""
      }`}
    >
      {/* white cut, dark theme */}
      <span className="absolute inset-0 hidden p-5 dark:block sm:p-7">
        <span className="relative block h-full w-full">
          <Media
            src={piece.dark}
            alt={`${label} ${index + 1}`}
            fill
            sizes="288px"
            className="object-contain"
          />
        </span>
      </span>
      {/* black cut, light theme */}
      <span className="absolute inset-0 block p-5 dark:hidden sm:p-7">
        <span className="relative block h-full w-full">
          <Media
            src={piece.plated ? piece.dark : piece.light}
            alt={`${label} ${index + 1}`}
            fill
            sizes="288px"
            className="object-contain"
          />
        </span>
      </span>
    </button>
  );
}

function Row({
  onOpen,
  label,
  reverse,
}: {
  onOpen: (src: string) => void;
  label: string;
  reverse?: boolean;
}) {
  // the set is rendered twice so the -50% keyframe lands on a seamless join
  const track = [...pieces, ...pieces];
  return (
    <div className="flex w-max">
      <div
        className={`flex w-max items-center gap-6 pe-6 sm:gap-10 sm:pe-10 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        } motion-reduce:animate-none group-hover/strip:[animation-play-state:paused]`}
      >
        {track.map((p, i) => (
          <Piece
            key={`${p.id}-${i}`}
            piece={p}
            index={i % pieces.length}
            onOpen={onOpen}
            label={label}
          />
        ))}
      </div>
    </div>
  );
}

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
    <section id="type" className="scroll-mt-24 section-y">
      <div className="container-edge mx-auto max-w-edge">
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
      </div>

      {/* full-bleed strip; pauses on hover so a piece can be opened */}
      <div className="group/strip mt-12 flex flex-col gap-6 overflow-hidden sm:gap-10">
        <Row onOpen={setOpen} label={t.type.label} />
        <Row onOpen={setOpen} label={t.type.label} reverse />
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
