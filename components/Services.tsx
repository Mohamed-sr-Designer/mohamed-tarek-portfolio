"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

export default function Services() {
  const { t } = useLang();
  return (
    <section
      id="services"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel>{t.services.label}</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                {t.services.h2a}{" "}
                <span className="font-serif font-normal italic text-mint">
                  {t.services.h2i}
                </span>{" "}
                {t.services.h2b}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              {t.services.note}{" "}
              <Link href="/contact" className="text-mint">
                {t.services.noteLink}
              </Link>
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((s, i) => (
            <StaggerItem
              key={s.title}
              className="group flex h-full flex-col gap-4 rounded-xl border border-line/10 bg-ink-900 p-7 transition-colors duration-300 hover:border-mint/30"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-lg italic text-bone-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-2 w-2 rounded-full bg-mint/40 transition-colors duration-300 group-hover:bg-mint" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-bone-50">
                {s.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-bone-300">
                {s.desc}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {s.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line/15 px-3 py-1 text-xs text-bone-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
