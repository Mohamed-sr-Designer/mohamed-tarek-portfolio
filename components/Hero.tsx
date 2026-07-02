"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { Media } from "@/components/ui/Media";
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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28"
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

      <div className="container-edge mx-auto w-full max-w-edge">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex w-full items-center justify-between text-xs uppercase tracking-[0.28em] text-bone-400"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Available — Freelance · Part-time · Hybrid
          </span>
          <span className="hidden sm:block">Portfolio — 2026</span>
        </motion.div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* Left — statement */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
              className="mb-7 max-w-xl text-sm leading-relaxed text-bone-200 md:text-base"
            >
              <span className="text-bone-400">{site.name},</span> Graphic
              Designer &amp; Art Director — leading teams, building brands,
              campaigns and visual experiences.
              <span className="text-bone-50"> Strategy first, craft always.</span>
            </motion.p>

            <h1 className="font-display text-[12vw] font-semibold leading-[0.95] tracking-[-0.03em] text-bone-50 sm:text-[8.5vw] lg:text-[4.4vw]">
              <Line delay={0.45}>Brands, campaigns</Line>
              <Line delay={0.58}>
                &amp; experiences that{" "}
                <span className="text-bone-400">connect</span>
              </Line>
              <Line delay={0.71}>
                goals with{" "}
                <span className="font-serif font-light italic text-mint">
                  human attention.
                </span>
              </Line>
            </h1>

            {/* CTAs + meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
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
                    Hire me ↗
                  </Link>
                </Magnetic>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-bone-400">
                Based in {site.location}, working across {site.markets}.
              </p>
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[22rem] lg:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-mint/25 via-transparent to-electric/25 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-line/15 bg-ink-700 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
                <Media
                  src="/me/portrait.webp"
                  alt="Mohamed Tarek"
                  sizes="(max-width: 1024px) 80vw, 34vw"
                  className="h-auto w-full"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold leading-tight text-white">
                      {site.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      Team Lead · {site.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-white backdrop-blur-md">
                    Art Direction
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
