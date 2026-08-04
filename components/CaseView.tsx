"use client";

import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { withBase } from "@/lib/base";
import { projects, type Project } from "@/lib/projects";
import motionData from "@/lib/motion.json";

type Clip = { slug: string; src: string; poster: string };

export default function CaseView({ project }: { project: Project }) {
  const { t } = useLang();
  const tr = t.projects[project.slug] ?? {};
  const accent = project.accent === "mint" ? "text-mint" : "text-electric";
  const gallery = project.gallery.filter((g) => g.src !== project.hero);
  const others = projects.filter((p) => p.slug !== project.slug);
  const caseVideos = (motionData as Clip[]).filter((c) =>
    (project.videoSlugs ?? []).includes(c.slug)
  );
  // On workflow cases the flow diagram is the lead visual.
  const leadIsFlow = Boolean(project.workflow?.image);
  const leadVisual = project.workflow?.image ?? project.hero;

  const title = tr.title ?? project.title;
  const category = tr.category ?? project.category;

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="container-edge mx-auto flex max-w-edge items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3 text-sm">
            <span className="transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180">
              ←
            </span>
            <span className="text-bone-200 group-hover:text-bone-50">
              {t.case.allWork}
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line/20 font-display text-xs">
              MT
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden rounded-full border border-line/20 px-4 py-1.5 text-sm text-bone-50 hover:border-mint/50 hover:bg-mint/5 sm:inline-block"
            >
              {t.case.letsTalk}
            </Link>
          </div>
        </div>
      </header>

      {/* title */}
      <section className="container-edge mx-auto max-w-edge pt-32 text-center md:pt-40">
        <Reveal>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.28em] text-bone-400">
            <span className={accent}>{category}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.client}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.year}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-tightest text-bone-50 md:text-8xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty font-serif text-xl italic leading-snug text-bone-200 md:text-2xl">
            {tr.tagline ?? project.tagline}
          </p>
        </Reveal>
      </section>

      {/* lead visual — the flow diagram leads on workflow cases, so the
          process is understood before anything else; otherwise the hero */}
      <section className="container-edge mx-auto mt-12 max-w-edge md:mt-16">
        <Reveal>
          <div
            className={`mx-auto overflow-hidden rounded-2xl bg-ink-700 ${
              leadIsFlow ? "max-w-6xl" : "max-w-5xl"
            }`}
          >
            <Media
              src={leadVisual}
              alt={leadIsFlow ? `${title} — ${project.workflow!.title}` : title}
              priority
              sizes="(max-width: 1024px) 100vw, 72rem"
              className="h-auto max-h-[80vh] w-full object-contain"
            />
          </div>
          {leadIsFlow ? (
            <p className="mx-auto mt-3 max-w-6xl text-center text-xs uppercase tracking-ultra text-bone-400">
              {project.workflow!.title}
            </p>
          ) : null}
        </Reveal>
      </section>

      {/* approach — full case study, or a lighter "explanation" for simple ones */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-20">
        {project.simple ? (
          <div className="grid gap-8 border-y border-line/10 py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.28em] text-bone-400">
                {project.client} · {category}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.contribution.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line/15 px-3 py-1 text-xs text-bone-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-8">
              <p className="text-pretty text-xl leading-relaxed text-bone-100 md:text-2xl">
                {tr.strategy ?? project.summary}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-10 border-y border-line/10 py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.28em] text-bone-400">
                {project.client} · {category}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.contribution.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-line/15 px-3 py-1 text-xs text-bone-200"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <h2 className={`text-sm font-medium ${accent}`}>
                {t.case.challenge}
              </h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
                {tr.challenge ?? project.challenge}
              </p>
            </div>
            <div className="md:col-span-5">
              <h2 className={`text-sm font-medium ${accent}`}>
                {t.case.solution}
              </h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
                {tr.strategy ?? project.strategy}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* named gallery groups (Before / After, Characters / Scenes …) —
          same masonry markup as the standard gallery, one block per group */}
      {project.galleries?.map((grp) => (
        <section
          key={grp.label}
          className="container-edge mx-auto max-w-edge pb-14 md:pb-20"
        >
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                {grp.label}
              </h2>
              {grp.note ? (
                <p className="text-sm text-bone-400">{grp.note}</p>
              ) : null}
            </div>
          </Reveal>
          <div className="gap-3 [column-fill:_balance] columns-2 md:columns-3">
            {grp.items.map((g) => (
              <figure
                key={g.src}
                className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-ink-700"
              >
                <Media
                  src={g.src}
                  alt={g.caption ?? `${title} — ${grp.label}`}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </section>
      ))}

      {/* final videos */}
      {caseVideos.length > 0 ? (
        <section className="container-edge mx-auto max-w-edge pb-14 md:pb-20">
          <Reveal>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
              {t.case.finalVideos}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {caseVideos.map((v) => (
              <Reveal key={v.slug}>
                <video
                  src={withBase(v.src)}
                  poster={withBase(v.poster)}
                  controls
                  playsInline
                  preload="none"
                  className="w-full rounded-xl bg-ink-700"
                />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* production workflow — numbered steps + key results + flow diagram */}
      {project.workflow ? (
        <section className="border-y border-line/10 bg-ink-800/40">
          <div className="container-edge mx-auto max-w-edge py-16 md:py-20">
            <Reveal>
              <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-4xl">
                {project.workflow.title}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-4 md:max-w-3xl">
              {project.workflow.intro.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-pretty text-base leading-relaxed text-bone-300 md:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <p className="mt-12 text-xs uppercase tracking-ultra text-bone-400">
                {project.workflow.stepsLabel}
              </p>
            </Reveal>
            <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-5">
              {project.workflow.steps.map((s) => (
                <div
                  key={s.n}
                  className="group flex flex-col gap-4 bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-800"
                >
                  <span className="font-serif text-5xl text-bone-500 transition-colors duration-500 group-hover:text-mint">
                    {s.n}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-bone-50">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-bone-400">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <Reveal>
              <p className="mt-12 text-xs uppercase tracking-ultra text-bone-400">
                {project.workflow.resultsLabel}
              </p>
            </Reveal>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.workflow.results.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-line/15 bg-ink-900 px-4 py-2 text-sm text-bone-200"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* gallery — tidy masonry */}
      {gallery.length > 0 ? (
        <section className="container-edge mx-auto max-w-edge pb-14 md:pb-20">
          <div className="gap-3 [column-fill:_balance] columns-2 md:columns-3">
            {gallery.map((g) => (
              <figure
                key={g.src}
                className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-ink-700"
              >
                <Media
                  src={g.src}
                  alt={g.caption ?? title}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="border-y border-line/10 bg-ink-800/40">
        <div className="container-edge mx-auto flex max-w-edge flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-24">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-5xl">
            {t.case.ctaA}{" "}
            <span className="font-serif font-normal italic text-mint">
              {t.case.ctaI}
            </span>
          </h2>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-bone-50 px-7 py-3 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-105"
          >
            {t.case.ctaBtn}
          </Link>
        </div>
      </section>

      {/* continue */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-24">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-bone-50 md:text-4xl">
            {t.case.cont}
          </h2>
        </Reveal>
        <Carousel ariaLabel="More case studies">
          {others.map((p) => {
            const ptr = t.projects[p.slug] ?? {};
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-700">
                  <Media
                    src={p.cover}
                    alt={ptr.title ?? p.title}
                    fill
                    sizes="(max-width: 640px) 78vw, 31vw"
                    className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight text-bone-50">
                  {ptr.title ?? p.title}
                </h3>
                <span className="text-sm text-mint">{t.case.readMore}</span>
              </Link>
            );
          })}
        </Carousel>
      </section>

      <footer className="container-edge mx-auto max-w-edge border-t border-line/10 py-10 text-sm text-bone-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} — {site.role}
          </span>
          <Link href="/contact" className="link-underline text-bone-200">
            {t.case.ctaBtn}
          </Link>
        </div>
      </footer>
    </>
  );
}
