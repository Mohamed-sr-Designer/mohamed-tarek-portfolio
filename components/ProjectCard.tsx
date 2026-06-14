"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Media } from "@/components/ui/Media";
import type { Project } from "@/lib/projects";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProjectCard({
  project,
  span,
  priority = false,
}: {
  project: Project;
  span: "full" | "half";
  priority?: boolean;
}) {
  const aspect =
    span === "full"
      ? "aspect-[16/11] md:aspect-[16/8]"
      : "aspect-[4/5] sm:aspect-[5/6]";
  const sizes =
    span === "full"
      ? "(max-width: 768px) 100vw, 90vw"
      : "(max-width: 768px) 100vw, 45vw";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease }}
      className={span === "full" ? "col-span-12" : "col-span-12 md:col-span-6"}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        <div
          className={`relative ${aspect} w-full overflow-hidden rounded-xl bg-ink-700`}
        >
          <Media
            src={project.cover}
            alt={project.title}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-cinema group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          <span className="absolute left-5 top-5 font-serif text-sm text-white/80">
            {project.index}
          </span>

          <div className="absolute right-5 top-5 flex translate-y-1 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View case
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <h3 className="font-sans text-2xl font-medium tracking-tight text-white md:text-4xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2">
          <p className="text-sm text-bone-200">
            <span className={project.accent === "mint" ? "text-mint" : "text-electric"}>
              {project.category}
            </span>
            <span className="text-bone-400"> — {project.discipline}</span>
          </p>
          <span className="text-sm text-bone-400">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}
