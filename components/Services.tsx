import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

// What I actually sell — written for clients scanning "can he do X?",
// and for search engines answering "graphic designer / art director".
const services = [
  {
    n: "01",
    title: "Brand Identity",
    desc: "Logos, visual systems, packaging and guidelines — identities built to scale from a business card to a delivery fleet.",
    tags: ["Logo & Wordmark", "Visual System", "Packaging"],
  },
  {
    n: "02",
    title: "Campaigns & Key Visuals",
    desc: "Advertising campaigns and hero visuals for real estate, automotive, SaaS and hospitality — concept to final art.",
    tags: ["Campaign Concept", "Key Visuals", "Bilingual AR/EN"],
  },
  {
    n: "03",
    title: "Social Media Systems",
    desc: "Repeatable, on-brand feeds — grids, templates and content systems that keep quality high at posting speed.",
    tags: ["Templates", "Content Design", "Feed Systems"],
  },
  {
    n: "04",
    title: "Art & Creative Direction",
    desc: "Leading designers and owning the visual language — briefs, reviews and standards that lift the whole output.",
    tags: ["Team Leadership", "Concepting", "Quality Control"],
  },
  {
    n: "05",
    title: "AI-Assisted Production",
    desc: "Campaign-grade imagery produced with AI tooling — directed, curated and retouched to a professional standard.",
    tags: ["AI Imaging", "Prompt Engineering", "Retouching"],
  },
  {
    n: "06",
    title: "Motion & Web",
    desc: "Reels, promos and edits — plus designed-and-shipped websites, vibe-coded end to end like this portfolio.",
    tags: ["Video & Reels", "Motion Graphics", "Web Design"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                What I can{" "}
                <span className="font-serif font-normal italic text-mint">
                  do
                </span>{" "}
                for your brand.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              Available for freelance projects, part-time and hybrid full-time
              roles —{" "}
              <Link href="/contact" className="text-mint">
                start a conversation ↗
              </Link>
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem
              key={s.n}
              className="group flex h-full flex-col gap-4 rounded-xl border border-line/10 bg-ink-900 p-7 transition-colors duration-300 hover:border-mint/30"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-lg italic text-bone-500">
                  {s.n}
                </span>
                <span className="h-2 w-2 rounded-full bg-mint/40 transition-colors duration-300 group-hover:bg-mint" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-bone-50">
                {s.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-bone-300">
                {s.desc}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line/15 px-3 py-1 text-xs text-bone-400"
                  >
                    {t}
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
