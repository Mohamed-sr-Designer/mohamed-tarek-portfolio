import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    n: "01",
    title: "Research",
    body: "I start with the business, the market and the audience — what the brand needs to achieve, and what everyone else is already saying.",
  },
  {
    n: "02",
    title: "Insight",
    body: "I find the one truth that unlocks the work — the tension that makes people care. The insight is the strategy in a single sentence.",
  },
  {
    n: "03",
    title: "Concept",
    body: "I translate the insight into a creative idea big enough to live across channels — a platform, not a poster.",
  },
  {
    n: "04",
    title: "Direction",
    body: "I define the visual language: type, colour, light and tone. The idea becomes a world with rules everyone can build on.",
  },
  {
    n: "05",
    title: "Execution",
    body: "I bring it to life and hold the bar across every touchpoint — from the hero frame to the smallest story.",
  },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-line/10 bg-ink-800/40 scroll-mt-24">
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="08">Creative Process</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                From a brief to a{" "}
                <span className="font-serif italic text-mint">decision</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              Direction is decision-making — the path I take every brand through,
              from understanding to execution.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <StaggerItem
              key={s.n}
              className="group flex flex-col gap-4 bg-ink-900 p-7 transition-colors duration-500 hover:bg-ink-800"
            >
              <span className="font-serif text-5xl text-bone-500 transition-colors duration-500 group-hover:text-mint">
                {s.n}
              </span>
              <h3 className="text-xl font-medium tracking-tight text-bone-50">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-bone-400">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
