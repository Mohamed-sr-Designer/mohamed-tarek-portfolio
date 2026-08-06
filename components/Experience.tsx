"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Toggle } from "@/components/ui/Toggle";
import { Media } from "@/components/ui/Media";
import { useLang } from "@/lib/i18n";

type Role = { title: string; period: string; current?: boolean; returned?: boolean };
type Job = {
  company: string;
  type: string;
  period: string;
  place: string;
  current?: boolean;
  note: string;
  logo?: string;
  roles?: Role[]; // promotion ladder (newest first)
  role?: string; // single role
};

// Verified work history, newest to oldest (provided by Mohamed).
const jobs: Job[] = [
  {
    company: "Osolutions",
    logo: "/orgs/osolutions.webp",
    type: "Full-time · On-site",
    period: "Jan 2023 — Aug 2024 · Returned May 2026 — Present",
    place: "Makkah, KSA",
    current: true,
    note: "Joined as a Graphic Designer and grew all the way to Senior, moved on in Aug 2024 to broaden my range, then returned in May 2026 to lead the art team and own the brand's visual standard.",
    // The return is its own chapter, it is split off from the three-year
    // promotion ladder of the first stint rather than sitting on top of it.
    roles: [
      { title: "Team Lead", period: "May 2026 — Present", current: true, returned: true },
      { title: "Senior Graphic Designer", period: "2024 — Aug 2024" },
      { title: "Mid-Level Designer", period: "Jan 2024" },
      { title: "Graphic Designer", period: "Jan 2023 — Dec 2023" },
    ],
  },
  {
    company: "JUMPPEAK",
    logo: "/orgs/jumppeak.webp",
    role: "Senior Graphic Designer, Team Lead",
    type: "Full-time",
    period: "Mar — May 2026",
    place: "Al Jizah, Egypt",
    note: "Led junior and mid-level designers; refined brand visuals for consistency across platforms.",
  },
  {
    company: "Prepd",
    logo: "/orgs/prepd.webp",
    role: "Senior Graphic Designer",
    type: "Part-time · Remote",
    period: "Nov 2025 — May 2026",
    place: "Makkah, KSA",
    note: "High-impact marketing materials and digital interfaces that positioned Prepd as a memorable, premium brand.",
  },
  {
    company: "Bundle IMS",
    logo: "/orgs/bundle.webp",
    role: "Senior / Visual Designer",
    type: "Full-time · Automotive · BTL",
    period: "Aug 2025 — Mar 2026",
    place: "Giza, Egypt",
    note: "Worked with the creative lead on an automotive campaign, BTL, brand activation and event management, concept to execution.",
  },
  {
    company: "Teaching Planet Academy",
    logo: "/orgs/teaching.webp",
    role: "Senior Designer & Graphic Design Instructor",
    type: "Part-time · Instructor",
    period: "May 2022 — Dec 2025",
    place: "Giza, Egypt",
    note: "Designed brand materials and taught Photoshop, Illustrator and InDesign through hands-on sessions.",
  },
  {
    company: "Flowrista",
    logo: "/orgs/flowrista.webp",
    role: "Senior Graphic Designer",
    type: "Full-time",
    period: "Jan — Aug 2025",
    place: "New Cairo, Egypt",
    note: "Floral-gifting brand, marketing materials, digital interfaces and video that made gifting unforgettable.",
  },
  {
    company: "Pala De 7",
    logo: "/orgs/pala7.webp",
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
    logo: "/orgs/raya.webp",
    role: "Graphic Design Instructor",
    type: "Part-time · Instructor",
    period: "Nov 2022 — Nov 2023",
    place: "Cairo, Egypt",
    note: "Taught Photoshop, Illustrator and InDesign across offline sessions; mentored students to real proficiency.",
  },
];

function Rung({
  role,
  lead,
  badge,
}: {
  role: Role;
  lead?: boolean;
  badge?: string;
}) {
  return (
    <li className="relative pl-6 pb-5 last:pb-0">
      <span
        className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
          role.current ? "bg-mint" : "bg-bone-500"
        }`}
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-base md:text-lg ${
              lead ? "font-medium text-bone-50" : "text-bone-200"
            }`}
          >
            {role.title}
          </span>
          {badge ? (
            <span className="text-[10px] uppercase tracking-widest text-mint">
              {badge}
            </span>
          ) : null}
        </div>
        <span className="text-xs text-bone-400">{role.period}</span>
      </div>
    </li>
  );
}

// The current role sits on its own; everything before it is grouped underneath
// as the earlier stint, so a three-year promotion ladder reads as one block
// rather than blurring into the return.
function Ladder({
  roles,
  promoted,
  returned,
  earlier,
}: {
  roles: Role[];
  promoted: string;
  returned: string;
  earlier: string;
}) {
  const lead = roles[0];
  const rest = roles.slice(1);

  return (
    <>
      <ol className="relative ml-1 border-l border-line/15">
        <Rung role={lead} lead badge={lead.returned ? returned : undefined} />
      </ol>

      {rest.length ? (
        <div className="mt-5 border-t border-line/10 pt-5">
          <p className="mb-3 text-[10px] uppercase tracking-ultra text-bone-500">
            {earlier}
          </p>
          <ol className="relative ml-1 border-l border-line/15">
            {rest.map((r, i) => (
              <Rung
                key={r.title}
                role={r}
                badge={i !== rest.length - 1 ? promoted : undefined}
              />
            ))}
          </ol>
        </div>
      ) : null}
    </>
  );
}

// "full" is a full-time on-site or hybrid post; "flex" covers part-time,
// remote, freelance and instructor work. Read off the `type` string so the two
// stay in step with the job list itself.
type Filter = "all" | "full" | "flex";

const bucket = (j: Job): Exclude<Filter, "all"> =>
  /full-time/i.test(j.type) && !/part-time|freelance/i.test(j.type)
    ? "full"
    : "flex";

export default function Experience() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const count = (f: Exclude<Filter, "all">) =>
    jobs.filter((j) => bucket(j) === f).length;
  const shown =
    filter === "all" ? jobs : jobs.filter((j) => bucket(j) === filter);

  return (
    <section
      id="experience"
      className="container-edge mx-auto max-w-edge scroll-mt-24 section-y"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <SectionLabel>{t.exp.label}</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
              {t.exp.h2a}{" "}
              <span className="font-serif italic text-mint">{t.exp.h2i}</span>{" "}
              {t.exp.h2b}
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-xs text-sm leading-relaxed text-bone-400">
            {t.exp.note}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="mt-10">
          <Toggle
            ariaLabel={t.exp.label}
            hint={t.exp.filterHint}
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: t.exp.all, hint: String(jobs.length) },
              {
                value: "full",
                label: t.exp.fullTime,
                hint: String(count("full")),
              },
              {
                value: "flex",
                label: t.exp.partTime,
                hint: String(count("flex")),
              },
            ]}
          />
        </div>
      </Reveal>

      <div className="mt-8 border-t border-line/10">
        {shown.map((j) => (
          <Reveal key={j.company + j.period}>
            <div className="group grid grid-cols-1 gap-4 border-b border-line/10 py-7 transition-colors duration-300 hover:bg-ink-800/30 md:grid-cols-12 md:gap-6 md:py-8">
              <div className="md:col-span-4">
                <div className="flex flex-wrap items-center gap-3">
                  {j.logo ? (
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/90">
                      <Media
                        src={j.logo}
                        alt={j.company}
                        fill
                        sizes="36px"
                        className="object-contain p-1"
                      />
                    </span>
                  ) : null}
                  <h3 className="text-xl font-medium tracking-tight text-bone-50 md:text-2xl">
                    {j.company}
                  </h3>
                  {j.current ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/5 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-mint">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      {t.exp.now}
                    </span>
                  ) : null}
                </div>
                {j.role ? <p className="mt-1.5 text-bone-200">{j.role}</p> : null}
                <p className="mt-2 text-sm text-bone-200">{j.period}</p>
                <p className="text-xs text-bone-400">
                  {j.place} · {j.type}
                </p>
              </div>

              <div className="md:col-span-8">
                {j.roles ? (
                  <Ladder
                    roles={j.roles}
                    promoted={t.exp.promoted}
                    returned={t.exp.returned}
                    earlier={t.exp.earlier}
                  />
                ) : null}
                <p
                  className={`text-pretty text-sm leading-relaxed text-bone-400 md:text-base ${
                    j.roles ? "mt-4 border-t border-line/10 pt-4" : ""
                  }`}
                >
                  {j.note}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
