import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { projects, getProject, getAdjacent } from "@/lib/projects";

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
  const { next } = getAdjacent(project.slug);

  const accent = project.accent === "mint" ? "text-mint" : "text-electric";

  const blocks = [
    { n: "01", label: "The Challenge", body: project.challenge },
    { n: "02", label: "Strategic Thinking", body: project.strategy },
    { n: "03", label: "Creative Direction", body: project.direction },
    { n: "04", label: "Execution", body: project.execution },
    { n: "05", label: "Impact", body: project.impact },
  ];

  // The hero already shows project.hero — avoid repeating it in the gallery.
  const gallery = project.gallery.filter((g) => g.src !== project.hero);

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line/10 bg-ink-900/70 backdrop-blur-xl">
        <div className="container-edge mx-auto flex max-w-edge items-center justify-between py-4">
          <Link href="/#work" className="group flex items-center gap-3 text-sm">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-bone-200 group-hover:text-bone-50">All work</span>
          </Link>
          <Link href="/#top" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line/20 font-serif text-xs">
              MT
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={`mailto:${site.email}`}
              className="hidden text-sm text-bone-200 hover:text-mint sm:inline"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>

      {/* hero — cinematic dark scrim in both themes */}
      <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Media
            src={project.hero}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        </div>

        <div className="container-edge relative mx-auto w-full max-w-edge pb-14 pt-32">
          <Reveal>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-ultra text-white/80">
              <span className={accent}>{project.category}</span>
              <span className="h-px w-6 bg-white/30" />
              <span>{project.client}</span>
              <span className="h-px w-6 bg-white/30" />
              <span>{project.year}</span>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 max-w-5xl text-balance font-sans text-5xl font-medium leading-[0.98] tracking-tightest text-white md:text-8xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* meta strip */}
      <section className="border-y border-line/10 bg-ink-800/40">
        <div className="container-edge mx-auto grid max-w-edge gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">Client</p>
            <p className="mt-2 text-bone-50">{project.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">Discipline</p>
            <p className="mt-2 text-bone-50">{project.discipline}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">Year</p>
            <p className="mt-2 text-bone-50">{project.year}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">My role</p>
            <ul className="mt-2 flex flex-wrap gap-2">
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
        </div>
      </section>

      {/* narrative */}
      <section className="container-edge mx-auto max-w-edge py-20 md:py-28">
        <div className="flex flex-col gap-14 md:gap-20">
          {blocks.map((b) => (
            <Reveal key={b.n}>
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <div className="md:sticky md:top-28">
                    <span className={`font-serif text-2xl ${accent}`}>{b.n}</span>
                    <h2 className="mt-2 text-2xl font-medium tracking-tight text-bone-50 md:text-3xl">
                      {b.label}
                    </h2>
                  </div>
                </div>
                <p className="text-pretty font-sans text-xl font-light leading-[1.5] text-bone-200 md:col-span-8 md:text-[1.6rem] md:leading-[1.45]">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* gallery — dense masonry (no per-item transforms so columns never overlap) */}
      <section className="container-edge mx-auto max-w-edge pb-28">
        <Reveal>
          <p className="mb-8 text-xs uppercase tracking-ultra text-bone-400">
            Selected frames — {gallery.length} visuals
          </p>
        </Reveal>
        <div className="gap-3 [column-fill:_balance] columns-2 lg:columns-3">
          {gallery.map((g) => (
            <figure
              key={g.src}
              className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-ink-700"
            >
              <Media
                src={g.src}
                alt={g.caption ?? project.title}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full"
              />
              {g.caption ? (
                <figcaption className="px-3 py-2 text-xs text-bone-400">
                  {g.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      {/* next project */}
      <Link href={`/work/${next.slug}`} className="group block border-t border-line/10 bg-black">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60">
            <Media src={next.cover} alt={next.title} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="container-edge relative mx-auto flex max-w-edge flex-col gap-3 py-24 md:py-32">
            <span className="text-xs uppercase tracking-ultra text-white/70">
              Next project
            </span>
            <h2 className="max-w-4xl text-balance font-sans text-4xl font-light leading-[1.02] tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2 md:text-7xl">
              {next.title}
            </h2>
            <span className="mt-2 text-mint">View case ↗</span>
          </div>
        </div>
      </Link>

      <footer className="container-edge mx-auto max-w-edge border-t border-line/10 py-10 text-sm text-bone-400">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name} — {site.role}</span>
          <Link href="/#contact" className="link-underline text-bone-200">
            Start a conversation ↗
          </Link>
        </div>
      </footer>
    </>
  );
}
