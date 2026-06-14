import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const phases = [
  {
    n: "01",
    phase: "Foundation",
    role: "Graphic Designer",
    org: "Across agencies & brands · Egypt",
    body: "Where the craft was built — type, layout, colour and composition — designing on-brand graphics for web, social and print.",
    gained: ["Typography", "Composition", "Production craft"],
  },
  {
    n: "02",
    phase: "Specialist",
    role: "Senior / Visual Designer",
    org: "Bundle · Flowmatia · Freepik · Pola",
    body: "Where the work met the business — from automotive campaigns and BTL activations to brand systems and UI, across the Egyptian, Saudi and Kuwaiti markets.",
    gained: ["Campaigns & BTL", "Brand systems", "UI design"],
  },
  {
    n: "03",
    phase: "Mentor",
    role: "Graphic Design Instructor",
    org: "Raya Academy · Teaching Planet Academy",
    body: "Where I give it back — teaching Photoshop, Illustrator and InDesign, and guiding students from fundamentals to a real design mindset.",
    gained: ["Teaching", "Mentorship", "Design leadership"],
  },
  {
    n: "04",
    phase: "Leadership",
    role: "Art Team Lead — current",
    org: "Evolutions · Makkah",
    body: "Where I lead — owning the concept and visual language, directing the art team and turning strategy into work that performs and feels premium.",
    gained: ["Art direction", "Team leadership", "Visual consistency"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="container-edge mx-auto max-w-edge scroll-mt-24 py-24 md:py-32"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="05">Experience</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              Not a job history — a{" "}
              <span className="font-serif italic text-mint">growth story</span>.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            From craft, to commercial thinking, to teaching, to leading an art
            team — six years across Egypt, KSA and Kuwait.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-line/10">
        {phases.map((p) => (
          <Reveal key={p.n}>
            <div className="group grid grid-cols-1 gap-4 border-b border-line/10 py-9 md:grid-cols-12 md:gap-8 md:py-11">
              <div className="md:col-span-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-bone-500 transition-colors duration-500 group-hover:text-mint">
                    {p.n}
                  </span>
                  <span className="text-xs uppercase tracking-ultra text-bone-400">
                    {p.phase}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-bone-50 md:text-3xl">
                  {p.role}
                </h3>
                <p className="mt-1 text-sm text-bone-400">{p.org}</p>
              </div>
              <p className="text-pretty text-base leading-relaxed text-bone-200 md:col-span-5 md:text-lg">
                {p.body}
              </p>
              <ul className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end">
                {p.gained.map((x) => (
                  <li
                    key={x}
                    className="h-fit rounded-full border border-line/15 px-3 py-1 text-xs text-bone-400"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
