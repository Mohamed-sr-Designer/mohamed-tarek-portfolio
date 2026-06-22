import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Carousel } from "@/components/ui/Carousel";

// Social-media campaigns — concept, insight and creative fields in Mohamed's
// own framing. Presented as a full-width slider (arrows switch between them).
const campaigns = [
  {
    n: "01",
    brand: "prepd",
    category: "Food-tech · Campaign",
    concept:
      "Turning cooking into a shared, joyful moment — connecting chefs, creators and food lovers where real dishes, real energy and real interaction come together.",
    insight:
      "Influencers create content, but turning engagement into real orders is hard, and people hesitate to trust influencer meals. The move: an experience-driven event that makes influencers live chefs and positions the app as the bridge between creators and consumers.",
    fields: ["Creative Concept", "Creative Direction", "Social", "AI Prompt Engineering"],
  },
  {
    n: "02",
    brand: "Rolls-Royce",
    category: "Automotive Luxury · Kuwait",
    concept:
      "Communication worthy of the marque — a buying experience that reflects Rolls-Royce as the pinnacle of automotive luxury.",
    insight:
      "At this tier, restraint is the message. Every frame is built on craft, retouching and quiet confidence rather than volume.",
    fields: ["Social Media", "Retouching", "Creative Direction"],
  },
  {
    n: "03",
    brand: "Pala De 7",
    category: "Sports App · Padel",
    concept:
      "Your gateway to the padel world — book courts, join tournaments and connect with a growing community. Not just sport: energy, community, and turning every match into a shared experience.",
    insight:
      "Padel is exploding, but booking and community are fragmented. The brand owns the energy and the social ritual, not just the booking.",
    fields: ["Social Media", "Campaign", "AI Prompt Engineering"],
  },
  {
    n: "04",
    brand: "Teaching Academy",
    category: "Tech Education",
    concept:
      "A modern tech-education brand built to shift people from hesitation to action — the bridge between curiosity and a real career, with learning that feels accessible, human and achievable.",
    insight:
      "Course providers sell features; Gen-Z buys belief. We position learning as a path to a real career, not just another course.",
    fields: ["Social Media", "AI Prompt Engineering"],
  },
  {
    n: "05",
    brand: "AlGhanim Parts",
    category: "Automotive Parts · Kuwait",
    concept:
      "The trusted partner for tires, oils and batteries — authentic products, professional service and peace of mind for every driver.",
    insight:
      "In auto parts, trust is the product. The work leads with reliability and expert care, making the functional feel premium.",
    fields: ["Social Media", "Key Visuals", "Retouching"],
  },
];

export default function Campaigns() {
  return (
    <section
      id="campaigns"
      className="border-y border-line/10 bg-ink-800/40 scroll-mt-24"
    >
      <div className="container-edge mx-auto max-w-edge py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="02">Campaigns</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl text-balance font-sans text-4xl font-light leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
                The thinking behind the{" "}
                <span className="font-serif italic text-mint">work</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone-400">
              Social-media campaigns across food-tech, automotive luxury, sport
              and education — slide through with the arrows.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <Carousel ariaLabel="Campaigns">
              {campaigns.map((c) => (
                <article
                  key={c.n}
                  className="flex w-full shrink-0 snap-start flex-col justify-between gap-8 rounded-2xl border border-line/10 bg-ink-900 p-7 md:min-h-[26rem] md:w-[94%] md:p-12"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-2xl text-bone-500">{c.n}</span>
                    <span className="text-xs uppercase tracking-[0.28em] text-bone-400">
                      {c.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-5xl font-semibold tracking-tightest text-bone-50 md:text-8xl">
                      {c.brand}
                    </h3>
                    <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-bone-200 md:text-2xl">
                      {c.concept}
                    </p>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {c.fields.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-line/15 px-3 py-1 text-xs text-bone-400"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </Carousel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
