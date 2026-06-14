import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";

export default function Clients() {
  return (
    <section
      id="clients"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="06">Clients</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance font-sans text-3xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-5xl">
                Brands I&apos;ve{" "}
                <span className="font-serif italic text-mint">worked with</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              Selected brands where I contributed to creative direction, key
              visuals, campaigns and social execution.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl border border-line/10 bg-ink-900/40 p-5 md:p-10">
            <div className="hidden dark:block">
              <Media
                src="/me/clients.webp"
                alt="Brands Mohamed Tarek has worked with"
                sizes="(max-width: 1024px) 95vw, 80vw"
                className="h-auto w-full"
              />
            </div>
            <div className="block dark:hidden">
              <Media
                src="/me/clients-light.webp"
                alt="Brands Mohamed Tarek has worked with"
                sizes="(max-width: 1024px) 95vw, 80vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
