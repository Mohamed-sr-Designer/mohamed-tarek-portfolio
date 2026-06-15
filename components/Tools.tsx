import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Tool = { name: string; role: string; mono: string; color: string };

const ai: Tool[] = [
  { name: "Seedance", role: "AI Video", mono: "SD", color: "#7C6CF6" },
  { name: "Magnific", role: "Upscale · Freepik", mono: "M", color: "#1273EB" },
  { name: "Gemini", role: "AI Ideation", mono: "G", color: "#1A73E8" },
  { name: "ChatGPT", role: "AI Copy & Concept", mono: "AI", color: "#10A37F" },
  { name: "Claude", role: "AI Reasoning", mono: "C", color: "#D97757" },
];

const craft: Tool[] = [
  { name: "Photoshop", role: "Retouch & Composite", mono: "Ps", color: "#31A8FF" },
  { name: "Illustrator", role: "Vector & Logo", mono: "Ai", color: "#FF9A00" },
  { name: "After Effects", role: "Motion", mono: "Ae", color: "#9999FF" },
  { name: "Premiere Pro", role: "Video Edit", mono: "Pr", color: "#9999FF" },
  { name: "Figma", role: "UI & Systems", mono: "Fi", color: "#F24E1E" },
  { name: "Blender", role: "3D (Basics)", mono: "Bl", color: "#E87D0D" },
];

function ToolCard({ t }: { t: Tool }) {
  return (
    <StaggerItem className="group flex items-center gap-4 rounded-xl border border-line/10 bg-ink-900 p-4 transition-colors duration-300 hover:border-line/25">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-sm font-semibold"
        style={{
          color: t.color,
          borderColor: `${t.color}55`,
          backgroundColor: `${t.color}14`,
          border: `1px solid ${t.color}40`,
        }}
      >
        {t.mono}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base text-bone-50">{t.name}</span>
        <span className="block truncate text-xs text-bone-400">{t.role}</span>
      </span>
    </StaggerItem>
  );
}

export default function Tools() {
  return (
    <section className="container-edge mx-auto max-w-edge py-20 md:py-28">
      <Reveal>
        <SectionLabel index="05">Toolkit</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-2xl text-balance font-sans text-3xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-5xl">
          Craft tools, sharpened with{" "}
          <span className="font-serif italic text-mint">AI</span>.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-5 text-xs uppercase tracking-ultra text-bone-400">
            AI Toolkit
          </p>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {ai.map((t) => (
              <ToolCard key={t.name} t={t} />
            ))}
          </Stagger>
        </div>
        <div>
          <p className="mb-5 text-xs uppercase tracking-ultra text-bone-400">
            Design & Motion
          </p>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {craft.map((t) => (
              <ToolCard key={t.name} t={t} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
