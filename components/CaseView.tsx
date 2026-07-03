"use client";

import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import ThemeToggle from "@/components/ThemeToggle";
import Flipbook from "@/components/Flipbook";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { projects, type Project } from "@/lib/projects";
import bookFreshValley from "@/lib/book-fresh-valley.json";

export default function CaseView({ project }: { project: Project }) {
  const { t } = useLang();
  const tr = t.projects[project.slug] ?? {};
  const accent = project.accent === "mint" ? "text-mint" : "text-electric";
  const gallery = project.gallery.filter((g) => g.src !== project.hero);
  const others = projects.filter((p) => p.slug !== project.slug);

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

      {/* master visual — contained, not full-bleed */}
      <section className="container-edge mx-auto mt-12 max-w-edge md:mt-16">
        <Reveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-ink-700">
            <Media
              src={project.hero}
              alt={title}
              priority
              sizes="(max-width: 1024px) 100vw, 64rem"
              className="h-auto max-h-[74vh] w-full object-contain"
            />
          </div>
        </Reveal>
      </section>

      {/* compact approach */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-20">
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
      </section>

      {/* Fresh Valley: interactive brand book */}
      {project.slug === "fresh-valley" ? (
        <section className="container-edge mx-auto max-w-edge pb-14 md:pb-20">
          <Reveal>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-bone-50 md:text-3xl">
                {t.case.bookA}{" "}
                <span className="font-serif font-normal italic text-mint">
                  {t.case.bookI}
                </span>
                {t.case.bookB}
              </h2>
              <p className="text-sm text-bone-400">{t.case.bookNote}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Flipbook
              pages={bookFreshValley}
              title="Fresh Valley — Marketing × Design Direction × Rebranding"
            />
          </Reveal>
        </section>
      ) : null}

      {/* gallery — tidy masonry */}
      {project.slug !== "fresh-valley" && gallery.length > 0 ? (
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
