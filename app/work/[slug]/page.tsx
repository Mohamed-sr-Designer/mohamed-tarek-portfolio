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
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line/20 font-serif text-xs">
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

      {/* title + tagline */}
      <section className="container-edge mx-auto max-w-edge pt-32 text-center md:pt-44">
        <Reveal>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs uppercase tracking-ultra text-bone-400">
            <span className={accent}>{project.category}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.client}</span>
            <span className="h-px w-6 bg-line/30" />
            <span>{project.year}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-4xl text-balance font-sans text-5xl font-medium leading-[1.0] tracking-tightest text-bone-50 md:text-7xl">
            {project.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty font-serif text-xl italic leading-snug text-bone-200 md:text-2xl">
            {project.tagline}
          </p>
        </Reveal>
      </section>

      {/* master visual */}
      <section className="container-edge mx-auto mt-12 max-w-edge md:mt-16">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-ink-700">
            <Media
              src={project.hero}
              alt={project.title}
              priority
              sizes="(max-width: 1024px) 100vw, 1400px"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </section>

      {/* client block */}
      <section className="container-edge mx-auto max-w-edge py-14 md:py-20">
        <div className="grid gap-8 border-y border-line/10 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">Client</p>
            <p className="mt-2 text-lg text-bone-50">{project.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">Industry</p>
            <p className="mt-2 text-lg text-bone-50">{project.category}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-ultra text-bone-400">
              Solutions &amp; Services
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
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

      {/* long story short */}
      <section className="container-edge mx-auto max-w-edge pb-16 md:pb-24">
        <Reveal>
          <h2 className="font-sans text-3xl font-light tracking-tight text-bone-50 md:text-5xl">
            Long story short.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <h3 className={`text-lg font-medium ${accent}`}>The Challenge</h3>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
                {project.challenge}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <h3 className={`text-lg font-medium ${accent}`}>The Solution</h3>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-bone-200">
                {project.strategy}
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-bone-400">
                {project.direction}
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-line/10 pt-8">
            <h3 className="text-xs uppercase tracking-ultra text-bone-400">
              My role
            </h3>
            <p className="mt-3 max-w-3xl text-pretty text-lg leading-relaxed text-bone-200">
              {project.execution}
            </p>
          </div>
        </Reveal>
      </section>

      {/* master visuals — full-width slider */}
      {gallery.length > 0 ? (
        <section className="container-edge mx-auto max-w-edge pb-20 md:pb-28">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-ultra text-bone-400">
              Master visuals — slide ›
            </p>
          </Reveal>
          <Carousel ariaLabel="Project visuals">
            {gallery.map((g) => (
              <figure
                key={g.src}
                className="aspect-[4/5] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink-700 sm:aspect-[3/2] sm:w-[62%] lg:w-[48%]"
              >
                <Media
                  src={g.src}
                  alt={g.caption ?? project.title}
                  sizes="(max-width: 640px) 86vw, 60vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            ))}
          </Carousel>
        </section>
      ) : null}

      {/* main CTA */}
      <section className="border-y border-line/10 bg-ink-800/40">
        <div className="container-edge mx-auto flex max-w-edge flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-24">
          <h2 className="max-w-2xl text-balance font-sans text-3xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-5xl">
            Got a brand worth building?{" "}
            <span className="font-serif italic text-mint">Let&apos;s talk.</span>
          </h2>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-bone-50 px-7 py-3 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-105"
          >
            Start a conversation ↗
          </Link>
        </div>
      </section>

      {/* continue reading */}
      <section className="container-edge mx-auto max-w-edge py-16 md:py-24">
        <Reveal>
          <h2 className="mb-8 font-sans text-3xl font-light tracking-tight text-bone-50 md:text-4xl">
            Continue reading
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
              <p className="text-sm text-bone-400">{p.category}</p>
              <span className="mt-2 inline-block text-sm text-mint">Read more ↗</span>
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
