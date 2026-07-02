import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Media } from "@/components/ui/Media";
import { site } from "@/lib/site";

const traits = [
  "Creative & Strategic Thinker",
  "Performance-Driven",
  "Detail-Oriented",
  "Fast Learner & Adaptive",
  "Strong Visual Consistency",
  "Collaborative Team Player",
];

const focus = ["2D Visual Design", "Brand Systems", "AI Prompt Engineering"];

export default function About() {
  return (
    <section
      id="about"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <Reveal>
        <SectionLabel index="01">About</SectionLabel>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-ink-700">
              <Media
                src="/me/portrait.webp"
                alt="Mohamed Tarek"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </Reveal>
        </div>

        {/* Bio */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-balance font-sans text-3xl font-light leading-[1.18] tracking-tight text-bone-50 md:text-[2.6rem]">
              A designer who leads — treating every brand as a{" "}
              <span className="font-serif italic text-mint">business problem</span>{" "}
              with a creative answer.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 text-pretty text-base leading-relaxed text-bone-200 md:text-lg">
            <Reveal delay={0.05}>
              <p>
                I&apos;m Mohamed Tarek, a graphic designer and art director —
                currently a Team Lead — based in {site.location} with
                professional experience across the Egyptian, Saudi and
                Kuwaiti markets — focused on clean, strategic, performance-driven
                design that strengthens brand identity and supports real
                marketing objectives.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                I work across branding, campaigns, social systems, key visuals
                and motion — skilled in Adobe Photoshop and Illustrator, UI
                design, and AI-powered creative tools I use to ideate and deliver
                modern work tailored to Middle East markets. Alongside client
                work, I teach graphic design as an{" "}
                <span className="text-bone-50">instructor</span>, mentoring the
                next wave of designers.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="mt-10">
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                Core focus
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 text-sm text-bone-50"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                Personal traits
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {traits.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line/15 px-4 py-1.5 text-sm text-bone-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
