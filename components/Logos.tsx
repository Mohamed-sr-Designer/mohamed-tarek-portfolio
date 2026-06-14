import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";

const concept = [
  {
    k: "Wordmark",
    v: "A confident serif wordmark with a hand-made warmth — premium, but never cold.",
  },
  {
    k: "Palette",
    v: "“A warm, forested quiet luxury” — deep forest green and gold, built as a system.",
  },
  {
    k: "System",
    v: "One mark that scales from a single label to a full fleet without losing its soul.",
  },
];

export default function Logos() {
  return (
    <section
      id="logos"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="02">Logo & Identity</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              Marks with{" "}
              <span className="font-serif italic text-mint">meaning</span>, not
              decoration.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            A logo is the smallest unit of a brand&apos;s strategy. Here&apos;s
            the thinking behind one identity built end to end.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        {/* Featured mark */}
        <Reveal className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line/10 bg-ink-800/40">
            <Media
              src="/work/fresh-valley/lockups.webp"
              alt="Fresh Valley logo lockups"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        {/* Concept */}
        <div className="flex flex-col justify-between gap-6 lg:col-span-5">
          <Reveal delay={0.05}>
            <div>
              <p className="text-xs uppercase tracking-ultra text-mint">
                Fresh Valley — Identity
              </p>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-bone-200">
                Premiumising a commodity by treating produce like a luxury
                product — a complete identity from wordmark and palette to
                packaging, stationery and fleet.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10">
              {concept.map((c) => (
                <div key={c.k} className="bg-ink-900 p-5">
                  <dt className="text-xs uppercase tracking-ultra text-bone-400">
                    {c.k}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-bone-200">
                    {c.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href="/work/fresh-valley"
              className="group inline-flex items-center gap-2 text-bone-50"
            >
              <span className="link-underline">See the full identity</span>
              <span className="text-mint transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Supporting marks */}
        <Reveal className="lg:col-span-6">
          <div className="overflow-hidden rounded-2xl border border-line/10">
            <Media
              src="/work/fresh-valley/logo.webp"
              alt="Fresh Valley wordmark"
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={0.05}>
          <div className="overflow-hidden rounded-2xl border border-line/10">
            <Media
              src="/work/fresh-valley/marks.webp"
              alt="Fresh Valley brand marks"
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
