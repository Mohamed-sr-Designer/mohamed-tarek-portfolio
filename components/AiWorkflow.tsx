"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { useLang } from "@/lib/i18n";
import { projects } from "@/lib/projects";

// AI Work Flow — the opening story of the portfolio.
// The flow diagram leads, then the short explanation and the numbered steps,
// so the process is understood before any gallery is shown.
const flows = projects.filter((p) => p.sector === "AI Workflow");

export default function AiWorkflow() {
  const { t } = useLang();

  return (
    <section
      id="ai-workflow"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="01">{t.ai.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              {t.ai.h2a}{" "}
              <span className="font-serif font-normal italic text-mint">
                {t.ai.h2i}
              </span>{" "}
              {t.ai.h2b}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            {t.ai.note}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-16 md:gap-24">
        {flows.map((p, idx) => {
          const tr = t.projects[p.slug] ?? {};
          const wf = p.workflow!;
          return (
            <article key={p.slug}>
              {/* 1 — the flow diagram leads */}
              <Reveal>
                <Link
                  href={`/work/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-line/10 bg-ink-800/40"
                >
                  <Media
                    src={wf.image!}
                    alt={`${tr.title ?? p.title} — ${wf.title}`}
                    sizes="(max-width: 1024px) 100vw, 80rem"
                    className="h-auto w-full transition-transform duration-700 ease-cinema group-hover:scale-[1.01]"
                  />
                </Link>
              </Reveal>

              {/* 2 — what it is, in short */}
              <div className="mt-8 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="text-xs uppercase tracking-ultra text-bone-400">
                    {String(idx + 1).padStart(2, "0")} · {tr.category ?? p.category}
                  </p>
                  <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                    {tr.title ?? p.title}
                  </h3>
                  <Link
                    href={`/work/${p.slug}`}
                    className="mt-4 inline-block text-sm text-mint underline-offset-4 hover:underline"
                  >
                    {t.case.readMore}
                  </Link>
                </div>
                <div className="md:col-span-7">
                  <p className="text-pretty text-base leading-relaxed text-bone-300 md:text-lg">
                    {wf.intro[0]}
                  </p>
                </div>
              </div>

              {/* 3 — the steps as a readable numbered rail */}
              <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line/10 bg-line/10 md:grid-cols-2 lg:grid-cols-3">
                {wf.steps.map((s) => (
                  <li key={s.n} className="flex gap-4 bg-ink-900 p-6">
                    <span className="font-display text-sm tabular-nums text-mint">
                      {s.n}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-medium tracking-tight text-bone-50">
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-bone-400">
                        {s.body}
                      </span>
                    </span>
                  </li>
                ))}
                {/* outcome sits in the same rail so the grid always fills */}
                <li className="bg-ink-800/60 p-6">
                  <span className="block text-[10px] uppercase tracking-ultra text-bone-500">
                    {wf.resultsLabel}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {wf.results.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-line/15 bg-ink-900 px-3 py-1 text-xs text-bone-200"
                      >
                        {r}
                      </span>
                    ))}
                  </span>
                </li>
              </ol>

              {/* 4 — a glimpse of what the flow produced */}
              {p.galleries?.length ? (
                <div className="mt-6 grid grid-cols-3 gap-3 md:grid-cols-6">
                  {p.galleries
                    .flatMap((grp) => grp.items.slice(0, 3))
                    .slice(0, 6)
                    .map((it) => (
                      <Link
                        key={it.src}
                        href={`/work/${p.slug}`}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-ink-700"
                      >
                        <Media
                          src={it.src}
                          alt={`${tr.title ?? p.title} — output`}
                          fill
                          sizes="150px"
                          className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-110"
                        />
                      </Link>
                    ))}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
