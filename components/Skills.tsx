import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const groups = [
  {
    title: "Direction & Strategy",
    items: ["Creative Direction", "Brand Strategy", "Campaign Design", "Creative Thinking"],
  },
  {
    title: "Craft & Systems",
    items: ["Visual Identity", "Social Media Systems", "Motion Design", "Marketing Communication"],
  },
  {
    title: "Production",
    items: ["Photo Manipulation", "Key Visuals", "UI Design", "AI Prompt Engineering"],
  },
];

export default function Skills() {
  return (
    <section className="border-y border-line/10 bg-ink-800/40">
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <Reveal>
          <SectionLabel index="06">Capabilities</SectionLabel>
        </Reveal>

        <Stagger className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {groups.map((grp) => (
            <StaggerItem key={grp.title}>
              <h3 className="text-sm uppercase tracking-ultra text-bone-400">
                {grp.title}
              </h3>
              <ul className="mt-6 flex flex-col">
                {grp.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center justify-between border-b border-line/10 py-4"
                  >
                    <span className="font-sans text-xl font-light tracking-tight text-bone-50 transition-colors duration-300 group-hover:text-mint md:text-2xl">
                      {item}
                    </span>
                    <span className="text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ✦
                    </span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
