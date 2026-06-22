"use client";

import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

// Re-mounts on every route change → plays a wipe + content reveal.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-ink-900"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-1/2 top-1/2 z-[81] -translate-x-1/2 -translate-y-1/2 font-display text-2xl font-semibold tracking-tight text-mint"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        MT
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.18 }}
      >
        {children}
      </motion.div>
    </>
  );
}
