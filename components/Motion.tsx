"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { withBase } from "@/lib/base";
import motionData from "@/lib/motion.json";

type Clip = {
  slug: string;
  title: string;
  kind: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};

const clips = motionData as Clip[];

function VideoCard({ clip, onExpand }: { clip: Clip; onExpand: (c: Clip) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    const next = !muted;
    setMuted(next);
    el.muted = next;
    if (!next) el.play().catch(() => {});
  };

  const btn =
    "grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:border-mint/60 hover:text-mint";

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-700">
      <video
        ref={ref}
        src={withBase(clip.src)}
        poster={withBase(clip.poster)}
        muted={muted}
        loop
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

      <div className="absolute right-4 top-4 flex gap-2">
        <button onClick={toggleSound} aria-label={muted ? "Unmute" : "Mute"} className={btn}>
          {muted ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
        <button onClick={() => onExpand(clip)} aria-label="Expand" className={btn}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-medium text-white">{clip.title}</p>
        <p className="text-xs text-white/70">{clip.kind}</p>
      </div>
    </div>
  );
}

function Lightbox({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const portrait = clip.height > clip.width;

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative overflow-hidden rounded-2xl bg-ink-900 ${
          portrait ? "max-h-[82vh] w-auto" : "w-full max-w-4xl"
        }`}
      >
        <video
          src={withBase(clip.src)}
          poster={withBase(clip.poster)}
          controls
          autoPlay
          loop
          playsInline
          style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
          className={portrait ? "h-[82vh] w-auto" : "w-full"}
        />
      </motion.div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-mint/60 hover:text-mint"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Motion() {
  const [expanded, setExpanded] = useState<Clip | null>(null);

  return (
    <section
      id="motion"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="04">Motion & Video</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              When a still isn&apos;t{" "}
              <span className="font-serif font-normal italic text-mint">enough</span>.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Brand films, social reels and animation — tap the speaker to hear it,
            or expand any clip to watch larger.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {clips.map((c) => (
          <VideoCard key={c.slug} clip={c} onExpand={setExpanded} />
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <Lightbox clip={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
