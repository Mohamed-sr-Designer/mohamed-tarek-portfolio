import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover, alt: project.title }],
    },
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const accent = project.accent === "mint" ? "text-mint" : "text-electric";
  const gallery = project.gallery.filter((g) => g.src !== project.hero);
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="container-edge mx-auto flex max-w-edge items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3 text-sm">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-bone-200 group-hover:text-bone-50">All work</span>
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
              Let&apos;s talk
            </Link>
          </div>
        </div>
      </header>

      {/* title */}
      <section className="container-edge mx-auto max-w-edge pt-32 text-center md:pt-40">
        <Reveal>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs uppercase tracking-[0.28em] text-bone-400">
            <span className={accent}>{project.category}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.client}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.year}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-tightest text-bone-50 md:text-8xl">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty font-serif text-xl italic leading-snug text-bone-200 md:text-2xl">
            {project.tagline}
          </p>
        </Reveal>
      </section>

      {/* full-bleed master visual */}
      <section className="mt-12 px-2 md:mt-16 md:px-3">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-ink-700">
            <Media
              src={project.hero}
              alt={project.title}
              priority
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </section>

      {/* compact approach — visuals do the talking */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-20">
        <div className="grid gap-10 border-y border-line/10 py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.28em] text-bone-400">
              {project.client} · {project.category}
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
            <h2 className={`text-sm font-medium ${accent}`}>The Challenge</h2>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
              {project.challenge}
            </p>
          </div>
          <div className="md:col-span-5">
            <h2 className={`text-sm font-medium ${accent}`}>The Solution</h2>
            <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
              {project.strategy}
            </p>
          </div>
        </div>
      </section>

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
                  alt={g.caption ?? project.title}
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
            Got a brand worth building?{" "}
            <span className="font-serif font-normal italic text-mint">
              Let&apos;s talk.
            </span>
          </h2>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-bone-50 px-7 py-3 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-105"
          >
            Start a conversation ↗
          </Link>
        </div>
      </section>

      {/* continue */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-24">
        <Reveal>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-bone-50 md:text-4xl">
            Continue
          </h2>
        </Reveal>
        <Carousel ariaLabel="More case studies">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-700">
                <Media
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 78vw, 31vw"
                  className="object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-bone-50">
                {p.title}
              </h3>
              <span className="text-sm text-mint">Read more ↗</span>
            </Link>
          ))}
        </Carousel>
      </section>

      <footer className="container-edge mx-auto max-w-edge border-t border-line/10 py-10 text-sm text-bone-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} — {site.role}
          </span>
          <Link href="/contact" className="link-underline text-bone-200">
            Start a conversation ↗
          </Link>
        </div>
      </footer>
    </>
  );
}
