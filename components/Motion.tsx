"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-ink-700">
      <video
        ref={ref}
        src={clip.src}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ aspectRatio: `${clip.width} / ${clip.height}` }}
        className="w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="text-sm font-medium text-white">{clip.title}</p>
          <p className="text-xs text-white/70">{clip.kind}</p>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/30 text-white">
          ▶
        </span>
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
            Brand films, social reels and animation — motion as part of the
            visual system, not an afterthought.
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
