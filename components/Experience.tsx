import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Reverse-chronological work history (Egypt + KSA markets).
const jobs = [
  {
    company: "Evolutions",
    role: "Art Team Lead",
    period: "2023 — Present",
    place: "Makkah, KSA",
    type: "Full-time",
    current: true,
  },
  {
    company: "JUMPPEAK",
    role: "Senior Designer / Team Lead",
    period: "2026",
    place: "Remote",
    type: "Full-time",
  },
  {
    company: "Freepik",
    role: "Senior Graphic Designer",
    period: "2025 — 2026",
    place: "Remote",
    type: "Part-time",
  },
  {
    company: "Flowmatia",
    role: "Senior Graphic Designer",
    period: "2025",
    place: "Cairo, Egypt",
    type: "Full-time",
  },
  {
    company: "Bundle",
    role: "Senior / Visual Designer",
    period: "2021 — 2026",
    place: "Giza, Egypt",
    type: "Automotive · BTL",
  },
  {
    company: "Pola",
    role: "Senior Graphic Designer",
    period: "2024 — 2025",
    place: "Jeddah, KSA",
    type: "Freelance",
  },
  {
    company: "Alphabaer",
    role: "Graphic & UI Designer",
    period: "2023 — 2024",
    place: "Riyadh, KSA",
    type: "Part-time",
  },
  {
    company: "Teaching Planet Academy",
    role: "Senior Designer & Instructor",
    period: "2021 — 2024",
    place: "Egypt",
    type: "Instructor",
  },
  {
    company: "Raya Academy",
    role: "Graphic Design Instructor",
    period: "2022 — 2023",
    place: "Cairo, Egypt",
    type: "Instructor",
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
            <SectionLabel index="07">Experience</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              The companies that{" "}
              <span className="font-serif italic text-mint">shaped</span> me.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            Six years across Egypt &amp; Saudi Arabia — from graphic designer, to
            teaching, to leading an art team. Several roles ran in parallel.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 border-t border-line/10">
        {jobs.map((j) => (
          <Reveal key={j.company + j.period}>
            <div className="group grid grid-cols-1 items-baseline gap-2 border-b border-line/10 py-6 transition-colors duration-300 hover:bg-ink-800/30 md:grid-cols-12 md:gap-6 md:py-7">
              <div className="flex items-center gap-3 md:col-span-4">
                <h3 className="text-xl font-medium tracking-tight text-bone-50 md:text-2xl">
                  {j.company}
                </h3>
                {j.current ? (
                  <span className="flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    Now
                  </span>
                ) : null}
              </div>
              <p className="text-bone-200 md:col-span-4">{j.role}</p>
              <p className="text-sm text-bone-400 md:col-span-2">{j.type}</p>
              <div className="md:col-span-2 md:text-right">
                <p className="text-sm text-bone-200">{j.period}</p>
                <p className="text-xs text-bone-400">{j.place}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
