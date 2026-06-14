import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const pillars = [
  {
    k: "Where I am",
    v: "A Jr. Art Director with a designer's craft and a strategist's instinct — already leading an art team and building work that performs in market.",
  },
  {
    k: "Where I'm heading",
    v: "Creative direction: owning concepts end to end, shaping visual languages, and raising the craft of the people around me.",
  },
  {
    k: "Why direction",
    v: "My strongest work was never about decoration — it's about decisions. Art direction is where strategy, craft and leadership meet.",
  },
];

export default function Vision() {
  return (
    <section
      id="vision"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-36"
    >
      <Reveal>
        <SectionLabel index="08">Vision</SectionLabel>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-10 max-w-5xl text-balance font-sans text-4xl font-light leading-[1.06] tracking-tight text-bone-50 md:text-7xl">
          I want to turn a business problem into the{" "}
          <span className="font-serif italic text-mint">idea</span> everyone
          rallies behind.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.08}>
            <div className="flex h-full flex-col gap-4 bg-ink-900 p-8">
              <span className="text-xs uppercase tracking-ultra text-bone-400">
                {p.k}
              </span>
              <p className="text-pretty text-lg leading-relaxed text-bone-200">
                {p.v}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
