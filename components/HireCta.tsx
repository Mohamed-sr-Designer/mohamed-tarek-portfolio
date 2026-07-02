import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

// Closing conversion band — the last thing a potential client or employer
// sees before the footer. One message: he's available, here's how to reach him.
export default function HireCta() {
  return (
    <section
      id="hire"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-36"
    >
      <div className="relative overflow-hidden rounded-3xl border border-line/10 bg-ink-800/60 px-7 py-16 text-center md:px-16 md:py-24">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/10 blur-[120px]"
        />

        <Reveal>
          <p className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-bone-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            {site.availability}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
            Have a brand that needs{" "}
            <span className="font-serif font-normal italic text-mint">
              direction
            </span>
            ?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-bone-300 md:text-lg">
            I take on freelance projects, part-time engagements and hybrid
            full-time roles across {site.markets}. Tell me what you&apos;re
            building — I&apos;ll tell you how design gets it there.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-bone-50 px-7 py-3.5 text-sm font-medium text-ink-900 transition-transform duration-300 hover:scale-[1.03]"
            >
              WhatsApp me ↗
            </a>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line/25 px-7 py-3.5 text-sm text-bone-50 transition-colors hover:border-mint/60 hover:text-mint"
            >
              {site.email}
            </a>
            <Link
              href="/contact"
              className="text-sm text-bone-400 underline-offset-4 hover:text-bone-50 hover:underline"
            >
              All contact options
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
