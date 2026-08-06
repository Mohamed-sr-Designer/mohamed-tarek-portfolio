"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Toggle } from "@/components/ui/Toggle";
import { Media } from "@/components/ui/Media";
import { getAsset } from "@/lib/assets";
import { withBase } from "@/lib/base";
import { useLang } from "@/lib/i18n";
import type { GalleryGroup } from "@/lib/projects";

// Named gallery groups on a case page (Before / After, Characters / Scenes).
//
// These used to render as one masonry block per group, stacked. On the AI
// photo case that meant 27 images down a three-column masonry, and the video
// case 24 more — the page ran for screens on end. Now one group shows at a
// time behind a toggle, in a tight uniform grid capped at a first screenful,
// with a lightbox for anyone who wants a closer look.
const FIRST_SHOW = 10;

export default function CaseGalleries({
  groups,
  title,
}: {
  groups: GalleryGroup[];
  title: string;
}) {
  const { t } = useLang();
  const [active, setActive] = useState(groups[0]?.label ?? "");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const group = groups.find((g) => g.label === active) ?? groups[0];

  // Landscape sets (film scenes) want a 16:9 tile; product and portrait sets
  // read better at 4:5. Decide from the artwork itself rather than hard-coding.
  const wide = useMemo(() => {
    const ratios = group.items
      .slice(0, 6)
      .map((i) => {
        const a = getAsset(i.src);
        return a.width / a.height;
      })
      .sort((a, b) => a - b);
    return (ratios[Math.floor(ratios.length / 2)] ?? 1) > 1.4;
  }, [group]);

  const shown = expanded ? group.items : group.items.slice(0, FIRST_SHOW);
  const hidden = group.items.length - shown.length;

  useEffect(() => {
    setExpanded(false);
  }, [active]);

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

  if (!groups.length) return null;

  return (
    <section className="container-edge mx-auto max-w-edge pb-14 md:pb-20">
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {groups.length > 1 ? (
            <Toggle
              ariaLabel={title}
              value={active}
              onChange={setActive}
              options={groups.map((g) => ({
                value: g.label,
                label: g.label,
                hint: String(g.items.length),
              }))}
            />
          ) : (
            <h2 className="text-2xl font-semibold tracking-tight text-bone-50">
              {group.label}
            </h2>
          )}
          {group.note ? (
            <p className="max-w-sm text-sm text-bone-400">{group.note}</p>
          ) : null}
        </div>
      </Reveal>

      <div
        className={`mt-6 grid gap-2 md:gap-3 ${
          wide ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-3 lg:grid-cols-5"
        }`}
      >
        {shown.map((g) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpen(g.src)}
            aria-label={`${group.label} — ${t.master.expand}`}
            className={`group relative overflow-hidden rounded-lg bg-ink-700 ${
              wide ? "aspect-video" : "aspect-[4/5]"
            }`}
          >
            <Media
              src={g.src}
              alt={g.caption ?? `${title} — ${group.label}`}
              fill
              sizes={wide ? "(max-width: 1024px) 50vw, 33vw" : "(max-width: 1024px) 33vw, 20vw"}
              className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {hidden > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-line/25 px-6 py-3 text-sm text-bone-200 transition-colors duration-300 hover:border-mint/50 hover:text-mint"
        >
          {t.case.showAll} · {hidden}
        </button>
      ) : null}

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
              alt={title}
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
