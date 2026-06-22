"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import Magnetic from "@/components/ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "115%", rotate: 2 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-10 pt-32"
    >
      {/* warm ambient atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          className="absolute left-[-5%] top-[-10%] h-[55vw] w-[55vw] rounded-full bg-mint/15 blur-[130px]"
          animate={reduce ? {} : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[-15%] right-[-5%] h-[45vw] w-[45vw] rounded-full bg-electric/15 blur-[140px]"
          animate={reduce ? {} : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />
      </div>

      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="container-edge mx-auto flex w-full max-w-edge items-center justify-between text-xs uppercase tracking-[0.28em] text-bone-400"
      >
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
          </span>
          Open to Art Direction roles
        </span>
        <span className="hidden sm:block">Portfolio — 2026</span>
      </motion.div>

      {/* statement */}
      <div className="container-edge mx-auto w-full max-w-edge">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="mb-8 max-w-xl text-sm leading-relaxed text-bone-200 md:text-base"
        >
          <span className="text-bone-400">{site.name},</span> Team Lead —
          building brands, campaigns and visual experiences.
          <span className="text-bone-50"> Strategy first, craft always.</span>
        </motion.p>

        <h1 className="font-display text-[13.5vw] font-semibold leading-[0.9] tracking-[-0.03em] text-bone-50 sm:text-[10.5vw] lg:text-[7.6vw]">
          <Line delay={0.45}>Brands, campaigns</Line>
          <Line delay={0.58}>
            &amp; experiences that <span className="text-bone-400">connect</span>
          </Line>
          <Line delay={0.71}>
            business goals with{" "}
            <span className="font-serif font-light italic text-mint">
              human attention.
            </span>
          </Line>
        </h1>
      </div>

      {/* CTAs + meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="container-edge mx-auto flex w-full max-w-edge flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="group flex items-center gap-3 rounded-full bg-bone-50 px-6 py-3 text-sm font-medium text-ink-900 transition-colors"
            >
              Selected work
              <motion.span
                animate={reduce ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ↓
              </motion.span>
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="rounded-full border border-line/25 px-6 py-3 text-sm text-bone-50 transition-colors hover:border-mint/60 hover:text-mint"
            >
              Let&apos;s talk ↗
            </Link>
          </Magnetic>
        </div>

        <p className="max-w-xs text-sm leading-relaxed text-bone-400">
          Based in {site.location}, working across {site.markets}.
        </p>
      </motion.div>
    </section>
  );
}
