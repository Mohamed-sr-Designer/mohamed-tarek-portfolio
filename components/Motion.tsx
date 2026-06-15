"use client";

import { useEffect, useRef, useState } from "react";
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

function VideoCard({ clip }: { clip: Clip }) {
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

  return (
    <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-ink-700">
      <video
        ref={ref}
        src={withBase(clip.src)}
        poster={withBase(clip.poster)}
        muted={muted}
        loop
        playsInline
        preload="none"
        style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
        className="w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

      {/* sound toggle — per video */}
      <button
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md transition-colors duration-300 hover:border-mint/60 hover:text-mint"
      >
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-medium text-white">{clip.title}</p>
        <p className="text-xs text-white/70">{clip.kind}</p>
      </div>
    </div>
  );
}

export default function Motion() {
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
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              When a still isn&apos;t{" "}
              <span className="font-serif italic text-mint">enough</span>.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Brand films, social reels and animation — tap the speaker on any clip
            to hear it.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {clips.map((c) => (
          <VideoCard key={c.slug} clip={c} />
        ))}
      </div>
    </section>
  );
}
