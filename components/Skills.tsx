"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLang } from "@/lib/i18n";

export default function Skills() {
  const { t } = useLang();
  return (
    <section className="border-y border-line/10 bg-ink-800/40">
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <Reveal>
          <SectionLabel>{t.skills.label}</SectionLabel>
        </Reveal>

        <Stagger className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {t.skills.groups.map((grp) => (
            <StaggerItem key={grp.title}>
              <h3 className="text-sm uppercase tracking-ultra text-bone-400">
                {grp.title}
              </h3>
              <ul className="mt-6 flex flex-col">
                {grp.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center justify-between border-b border-line/10 py-4"
                  >
                    <span className="font-sans text-xl font-light tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-mint md:text-2xl">
                      {item}
                    </span>
                    <span className="text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ✦
                    </span>
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
