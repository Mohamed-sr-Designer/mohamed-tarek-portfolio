import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site, contacts } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line/10 py-24 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-30%] left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]" />
      </div>

      <div className="container-edge mx-auto max-w-edge">
        <Reveal>
          <SectionLabel index="09">Contact</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-10 max-w-4xl text-balance font-sans text-5xl font-light leading-[1.02] tracking-tightest text-bone-50 md:text-8xl">
            Let&apos;s make work that&apos;s{" "}
            <span className="font-serif italic text-mint">remembered.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-200">
            Open to Art Direction roles, freelance projects and creative
            collaborations across {site.markets}. If you&apos;re building
            something ambitious, I&apos;d love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-12 inline-flex max-w-full items-center gap-4 break-words"
          >
            <span className="font-sans text-[clamp(1.05rem,5vw,2.5rem)] font-light tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-mint">
              {site.email}
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-2 bg-ink-900 p-6 transition-colors duration-300 hover:bg-ink-800"
              >
                <span className="flex items-center gap-2 text-xs uppercase tracking-ultra text-bone-400">
                  {c.label}
                  <span className="text-bone-500 transition-colors group-hover:text-mint">
                    ↗
                  </span>
                </span>
                <span className="break-words text-base text-bone-50 transition-colors group-hover:text-mint">
                  {c.value}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
