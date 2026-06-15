import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Verified work history (provided directly by Mohamed).
const jobs = [
  {
    company: "Osolutions",
    role: "Art Team Lead",
    progression: "Art Team Lead · Senior Graphic Designer · Mid-Level · Graphic Designer",
    type: "Full-time · On-site",
    period: "Jan 2023 — Present",
    place: "Makkah, KSA",
    current: true,
    note: "Grew from Graphic Designer to Art Team Lead — leading the design team, refining brand visuals and delivering on-brand assets across web, app and social.",
  },
  {
    company: "JUMPPEAK",
    role: "Senior Graphic Designer — Team Lead",
    type: "Full-time",
    period: "Mar — May 2026",
    place: "Al Jizah, Egypt",
    note: "Led junior and mid-level designers; refined brand visuals for consistency across platforms.",
  },
  {
    company: "Prepd",
    role: "Senior Graphic Designer",
    type: "Part-time · Remote",
    period: "Nov 2025 — May 2026",
    place: "Makkah, KSA",
    note: "High-impact marketing materials and digital interfaces that positioned Prepd as a memorable, premium brand.",
  },
  {
    company: "Bundle IMS",
    role: "Senior / Visual Designer",
    type: "Full-time · Automotive · BTL",
    period: "Aug 2025 — Mar 2026",
    place: "Giza, Egypt",
    note: "Worked with the Art Director on an automotive campaign — BTL, brand activation and event management, concept to execution.",
  },
  {
    company: "Flowrista",
    role: "Senior Graphic Designer",
    type: "Full-time",
    period: "Jan — Aug 2025",
    place: "New Cairo, Egypt",
    note: "Floral-gifting brand — marketing materials, digital interfaces and video that made gifting unforgettable.",
  },
  {
    company: "Teaching Planet Academy",
    role: "Senior Designer & Graphic Design Instructor",
    type: "Part-time · Instructor",
    period: "May 2022 — Dec 2025",
    place: "Giza, Egypt",
    note: "Designed brand materials and taught Photoshop, Illustrator and InDesign through hands-on sessions.",
  },
  {
    company: "Pala De 7",
    role: "Senior Graphic Designer",
    type: "Freelance · Remote",
    period: "Jul 2024 — Jul 2025",
    place: "Jeddah, KSA",
    note: "Led social-media graphics and UI in Adobe and Figma, keeping the padel brand consistent and engaging.",
  },
  {
    company: "Alkhabeer for Training",
    role: "Graphic & UI Designer",
    type: "Part-time · Remote",
    period: "Oct 2023 — Aug 2024",
    place: "Riyadh, KSA",
    note: "Digital assets for web, app, social and video, backed by style guides and a strong brand persona.",
  },
  {
    company: "Raya Academy",
    role: "Graphic Design Instructor",
    type: "Part-time · Instructor",
    period: "Nov 2022 — Nov 2023",
    place: "Cairo, Egypt",
    note: "Taught Photoshop, Illustrator and InDesign across offline sessions; mentored students to real proficiency.",
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
            Across Egypt &amp; Saudi Arabia — from graphic designer, to teaching,
            to leading an art team. Several roles ran in parallel.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 border-t border-line/10">
        {jobs.map((j) => (
          <Reveal key={j.company + j.period}>
            <div className="group grid grid-cols-1 gap-3 border-b border-line/10 py-7 transition-colors duration-300 hover:bg-ink-800/30 md:grid-cols-12 md:gap-6 md:py-8">
              <div className="md:col-span-4">
                <div className="flex flex-wrap items-center gap-3">
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
                <p className="mt-1.5 text-bone-200">{j.role}</p>
                {j.progression ? (
                  <p className="mt-1 text-xs leading-relaxed text-bone-500">
                    {j.progression}
                  </p>
                ) : null}
              </div>
              <p className="text-pretty text-sm leading-relaxed text-bone-400 md:col-span-5 md:text-base">
                {j.note}
              </p>
              <div className="md:col-span-3 md:text-right">
                <p className="text-sm text-bone-200">{j.period}</p>
                <p className="text-xs text-bone-400">{j.place}</p>
                <p className="mt-1 text-xs text-bone-500">{j.type}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
