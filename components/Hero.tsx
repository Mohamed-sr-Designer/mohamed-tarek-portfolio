"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { Media } from "@/components/ui/Media";
import Magnetic from "@/components/ui/Magnetic";
import GridField from "@/components/ui/GridField";

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

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Magnetic>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="grid h-11 w-11 place-items-center rounded-full border border-line/20 text-bone-200 transition-colors hover:border-mint/60 hover:text-mint"
      >
        {children}
      </a>
    </Magnetic>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28"
    >
      {/* backdrop: ambient glow, then grid paper + mouse-reactive squares */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute left-[-8%] top-[-12%] h-[50vw] w-[50vw] rounded-full bg-mint/10 blur-[140px]"
          animate={reduce ? {} : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900" />
      </div>
      <GridField />

      <div className="container-edge relative z-10 mx-auto w-full max-w-edge">
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
              className="mb-6 text-sm text-bone-400 md:text-base"
            >
              {site.name} · Team Lead · based in {site.location}
            </motion.p>

            <h1 className="font-display text-[11vw] font-semibold leading-[0.98] tracking-[-0.03em] text-bone-50 sm:text-[8vw] lg:text-[4.3vw]">
              <Line delay={0.45}>I&apos;m a graphic designer</Line>
              <Line delay={0.58}>&amp; art director focused on</Line>
              <Line delay={0.71}>
                brands, campaigns &amp;{" "}
                <span className="font-serif font-light italic text-mint">
                  visual systems.
                </span>
              </Line>
            </h1>

            {/* CTAs + socials + meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10 flex flex-col gap-6"
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
                <SocialIcon href={site.linkedin} label="LinkedIn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.5V24H8V8z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href={site.github} label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </SocialIcon>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-bone-400">
                Working across {site.markets} — strategy first, craft always.
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
                  alt="Mohamed Tarek — graphic designer and art director"
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
