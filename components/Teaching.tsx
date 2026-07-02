import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Teaching & mentorship — a recruiter-friendly proof of leadership:
// four academies, ~1,200 graduates, plus on-site design advisory.
const stats = [
  { n: "~1,200", l: "students graduated" },
  { n: "49", l: "cohorts taught" },
  { n: "4", l: "academies" },
];

const academies = [
  {
    name: "SOIC — School of Cinema",
    role: "Design Instructor",
    now: true,
    desc: "Teaching design craft inside a filmmaking school — visual storytelling, key art and campaign thinking for cinema.",
  },
  {
    name: "EDUX Academy",
    role: "Design Instructor",
    now: true,
    desc: "Graphic design tracks taking students from fundamentals to portfolio-ready execution.",
  },
  {
    name: "Easily",
    role: "Design Instructor",
    now: false,
    desc: "Full essentials journey — Photoshop, Illustrator and Figma; ad campaigns, UI/UX, moodboards, storyboards, insights, concept development and execution.",
  },
  {
    name: "Raya Academy",
    role: "Design Instructor",
    now: false,
    desc: "Hands-on graphic design cohorts — photo manipulation, landing pages and branding, taught project by project.",
  },
];

export default function Teaching() {
  return (
    <section
      id="teaching"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">Teaching</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                I don&apos;t just lead designers —{" "}
                <span className="font-serif font-normal italic text-mint">
                  I make them
                </span>
                .
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              Instructor across four academies — and an on-call advisor,
              visiting teams to solve design problems on the ground.
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="bg-ink-900 p-7 text-center md:p-9">
                <p className="font-display text-4xl font-semibold tracking-tight text-bone-50 md:text-6xl">
                  {s.n}
                </p>
                <p className="mt-2 text-xs uppercase tracking-ultra text-bone-400">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-sm text-bone-400">
            Close to 1,200 students graduated across 49 cohorts — numbers are
            approximate, and still counting.
          </p>
        </Reveal>

        {/* academies */}
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2">
          {academies.map((a) => (
            <StaggerItem
              key={a.name}
              className="flex h-full flex-col gap-3 rounded-xl border border-line/10 bg-ink-900 p-7 transition-colors duration-300 hover:border-mint/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight text-bone-50 md:text-2xl">
                  {a.name}
                </h3>
                {a.now ? (
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-mint/30 bg-mint/5 px-3 py-1 text-xs text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                    Current
                  </span>
                ) : null}
              </div>
              <p className="text-xs uppercase tracking-ultra text-bone-400">
                {a.role}
              </p>
              <p className="text-pretty text-sm leading-relaxed text-bone-300">
                {a.desc}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
