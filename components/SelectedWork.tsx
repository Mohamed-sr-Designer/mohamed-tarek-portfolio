import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

// Editorial rhythm: featured rows alternate full-width and paired.
const spans: ("full" | "half")[] = ["full", "half", "half", "full", "half", "half"];

export default function SelectedWork() {
  return (
    <section
      id="work"
      className="container-edge mx-auto max-w-edge scroll-mt-20 py-24 md:py-32"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel index="01">Selected Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              Chosen to show how I{" "}
              <span className="font-serif italic text-bone-200">think</span> —
              not just what I make.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Six projects, each a full case study — challenge, strategy,
            direction, execution and impact.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-14 md:gap-y-20">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            span={spans[i] ?? "half"}
            priority={i === 0}
          />
        ))}
      </div>
    </section>
  );
}
