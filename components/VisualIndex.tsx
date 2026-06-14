"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Media } from "@/components/ui/Media";
import { visualIndex } from "@/lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VisualIndex() {
  return (
    <section className="py-6">
      <div className="container-edge mx-auto mb-5 flex max-w-edge items-center justify-between text-xs uppercase tracking-ultra text-bone-400">
        <span>Visual index — a wall of recent frames</span>
        <a href="#work" className="link-underline text-bone-200">
          See full cases ↘
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 px-2 sm:grid-cols-4 lg:grid-cols-6">
        {visualIndex.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.6, ease, delay: (i % 6) * 0.04 }}
          >
            <Link
              href="#work"
              className="group relative block aspect-square overflow-hidden rounded-lg bg-ink-700"
            >
              <Media
                src={src}
                alt="Selected frame"
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
