export type GalleryItem = { src: string; caption?: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  year: string;
  category: string;
  discipline: string;
  accent: "electric" | "mint";
  summary: string;
  cover: string;
  hero: string;
  logo?: string;
  tags: string[];
  challenge: string;
  strategy: string;
  direction: string;
  execution: string;
  impact: string;
  contribution: string[];
  gallery: GalleryItem[];
};

const g = (...srcs: string[]): GalleryItem[] => srcs.map((src) => ({ src }));

export const projects: Project[] = [
  {
    slug: "axia",
    index: "01",
    title: "AXIA — Gifting, Reimagined",
    client: "AXIA",
    year: "2025",
    category: "Brand Campaign",
    discipline: "Creative Direction · Brand World · Social",
    accent: "mint",
    summary:
      "A warm, editorial brand world for a premium handmade gifting label — full campaign craft produced with AI, no shoot.",
    cover: "/work/axia/hero.webp",
    hero: "/work/axia/hero.webp",
    tags: ["Creative Direction", "Brand World", "AI Production", "Social System"],
    challenge:
      "AXIA is a premium handmade gifting brand entering a crowded, discount-driven market — and it needed a world that felt personal and unmistakably premium, without the budget for a full photo production.",
    strategy:
      "I reframed the brief from “show the products” to “show the moment the gift creates.” People don’t buy gifts, they buy the feeling of being thought of — so every frame had to read like a memory.",
    direction:
      "A sun-washed, Mediterranean editorial aesthetic: bone tones, soft shadows, natural texture and hand-drawn line motifs carried onto the products and packaging — one consistent world from hero to story.",
    execution:
      "I used AI image tooling as a production engine — directing, curating and retouching to a consistent standard — and delivered hero visuals, gifting pages, seasonal banners, an Instagram grid and the product line.",
    impact:
      "A cohesive, premium brand world that punches far above its budget, and a scalable system AXIA can extend across every season and channel.",
    contribution: ["Creative & Art Direction", "Brand Visual System", "AI Image Production", "Social & Landing"],
    gallery: g(
      "/work/axia/hero.webp",
      "/work/axia/gift-her.webp",
      "/work/axia/p12.webp",
      "/work/axia/insta-2.webp",
      "/work/axia/p4.webp",
      "/work/axia/hero-2.webp",
      "/work/axia/p13.webp",
      "/work/axia/p3.webp",
      "/work/axia/gift-mom.webp",
      "/work/axia/p11.webp",
      "/work/axia/insta-4.webp",
      "/work/axia/p14.webp",
      "/work/axia/banner-her.webp",
      "/work/axia/p8.webp",
      "/work/axia/hero-3.webp",
      "/work/axia/p15.webp",
      "/work/axia/gift-you.webp",
      "/work/axia/insta-6.webp",
      "/work/axia/p9.webp",
      "/work/axia/p16.webp",
      "/work/axia/banner-mom.webp",
      "/work/axia/p1.webp",
      "/work/axia/p10.webp",
      "/work/axia/banner-you.webp"
    ),
  },
  {
    slug: "fresh-valley",
    index: "02",
    title: "Fresh Valley — Premium by Nature",
    client: "Fresh Valley",
    year: "2024",
    category: "Brand Identity",
    discipline: "Visual Identity · Packaging · Brand System",
    accent: "mint",
    summary:
      "A complete brand identity that premiumises produce — logo, palette, packaging, stationery and fleet, from shelf to doorstep.",
    cover: "/work/fresh-valley/packaging.webp",
    hero: "/work/fresh-valley/van-life.webp",
    logo: "/work/fresh-valley/logo.webp",
    tags: ["Visual Identity", "Packaging", "Brand System", "Art Direction"],
    challenge:
      "Fresh produce is the definition of a commodity — bought on price, rarely on brand. Fresh Valley wanted to own the export-grade, premium tier and needed an identity that signals quality the instant you see it.",
    strategy:
      "Treat produce like a luxury product. In premium grocery, packaging is the first impression — so I built a system rooted in nature and craft: recycled kraft, botanical line art and named cultivars (Mid Forest, Charcoal).",
    direction:
      "“A warm, forested quiet luxury.” Deep forest green and gold, a confident wordmark and a tactile, sustainable material story — designed to scale from a single wrap to a full fleet without losing its hand-made warmth.",
    execution:
      "Logo and wordmark, color system and brand rules, packaging and wrap, gift boxes, stationery, uniforms and a branded delivery fleet — a complete identity applied across every touchpoint the customer meets.",
    impact:
      "A produce brand that looks deliberately premium and is instantly recognisable — built to command a premium position in a category that usually competes on price alone.",
    contribution: ["Brand Identity", "Logo & System", "Packaging", "Environment & Fleet"],
    gallery: g(
      "/work/fresh-valley/logo.webp",
      "/work/fresh-valley/lockups.webp",
      "/work/fresh-valley/palette.webp",
      "/work/fresh-valley/packaging.webp",
      "/work/fresh-valley/pack-wrap.webp",
      "/work/fresh-valley/fleet.webp",
      "/work/fresh-valley/van-life.webp",
      "/work/fresh-valley/van.webp",
      "/work/fresh-valley/van-front.webp",
      "/work/fresh-valley/storefront.webp",
      "/work/fresh-valley/store.webp",
      "/work/fresh-valley/pack-trays.webp",
      "/work/fresh-valley/pack-bag.webp",
      "/work/fresh-valley/gift-1.webp",
      "/work/fresh-valley/gift-2.webp",
      "/work/fresh-valley/gift-3.webp",
      "/work/fresh-valley/boxes.webp",
      "/work/fresh-valley/stationery-1.webp",
      "/work/fresh-valley/stationery-2.webp",
      "/work/fresh-valley/apron.webp",
      "/work/fresh-valley/staff.webp",
      "/work/fresh-valley/marks.webp"
    ),
  },
  {
    slug: "tilal-village",
    index: "03",
    title: "Tilal Village — Where Life Finds Its Place",
    client: "Tilal Village · Makkah",
    year: "2025",
    category: "Real Estate Campaign",
    discipline: "Campaign · Brand Storytelling · Bilingual AR/EN",
    accent: "electric",
    summary:
      "A luxury community campaign built on belonging and faith — not square metres — for a residence beside the Holy Haram.",
    cover: "/work/tilal/hero.webp",
    hero: "/work/tilal/02.webp",
    tags: ["Campaign", "Brand Storytelling", "Bilingual AR/EN", "Art Direction"],
    challenge:
      "Tilal Village is a premium residential community moments from the Holy Haram in Makkah. The category sells on specs; Tilal needed to sell the feeling of raising a family in a place of meaning.",
    strategy:
      "Proximity to the Haram is not a feature — it is a way of life. I built the campaign around “Where Life Finds Its Place / حياة بجوار الحرم,” anchoring the brand in belonging, faith and family.",
    direction:
      "A warm, cinematic, golden-hour aesthetic — generous architecture, quiet human moments and a refined bilingual type system that gives Arabic and English equal weight. Calm, confident, unhurried.",
    execution:
      "Campaign key visuals and a bilingual art-direction system across hero, lifestyle and architectural frames — engineered so the Arabic and English layouts each feel native, never translated.",
    impact:
      "A residential development repositioned as an emotional brand — the kind of campaign audiences remember long after the specs are forgotten.",
    contribution: ["Campaign Concept", "Art Direction", "Bilingual Type", "Key Visuals"],
    gallery: g(
      "/work/tilal/02.webp",
      "/work/tilal/hero.webp",
      "/work/tilal/building.webp",
      "/work/tilal/03.webp",
      "/work/tilal/04.webp",
      "/work/tilal/05.webp",
      "/work/tilal/06.webp",
      "/work/tilal/07.webp",
      "/work/tilal/08.webp",
      "/work/tilal/09.webp",
      "/work/tilal/10.webp",
      "/work/tilal/11.webp"
    ),
  },
  {
    slug: "bnum-rajeh",
    index: "04",
    title: "Bnum Rajeh — Built on Trust",
    client: "Bnum Rajeh Commercial Group · IHS",
    year: "2025",
    category: "B2B Brand Campaign",
    discipline: "Campaign · Cross-Channel · Social System",
    accent: "electric",
    summary:
      "Making the unglamorous aspirational — a cinematic B2B campaign for 50 years of trust in hospitality supply.",
    cover: "/work/ihs/hero.webp",
    hero: "/work/ihs/hero.webp",
    tags: ["Campaign", "B2B", "Cross-Channel", "Bilingual", "Social"],
    challenge:
      "Bnum Rajeh has supplied hospitality and cleaning equipment for 50 years — a functional, technical category. The challenge: a campaign as premium as the five-star hotels they serve.",
    strategy:
      "Lead with trust and standards, not products. Hotels don’t buy machines, they buy a flawless guest experience — so I positioned the brand at the level of its clients’ ambitions, with “50 years / الثقة” as the spine.",
    direction:
      "A cinematic, high-contrast aesthetic — moody Riyadh skylines, dramatic product lighting and immaculate interiors — so industrial equipment is shot like luxury, with bilingual layouts native to the market.",
    execution:
      "A cross-channel system: campaign key visuals, product hero compositions with technical detailing, social-first posts and stories — all on one confident visual standard.",
    impact:
      "A B2B brand that finally looks the part of its 50-year reputation — proof that craft and strategy belong in the categories that usually skip them.",
    contribution: ["Campaign Art Direction", "Product Key Visuals", "Social System", "Bilingual Layout"],
    gallery: g(
      "/work/ihs/hero.webp",
      "/work/ihs/02.webp",
      "/work/ihs/room-1.webp",
      "/work/ihs/room-2.webp",
      "/work/ihs/room-3.webp",
      "/work/ihs/room-4.webp",
      "/work/ihs/room-5.webp",
      "/work/ihs/room-6.webp",
      "/work/ihs/room-7.webp"
    ),
  },
  {
    slug: "automotive-kv",
    index: "05",
    title: "Automotive — Cinematic Key Visuals",
    client: "Automotive · Geely · GWM",
    year: "2024",
    category: "Key Visuals",
    discipline: "Key Visual · Compositing · Retouching",
    accent: "electric",
    summary:
      "The car as hero — global-grade key visuals built through light, compositing and craft, with no physical shoot.",
    cover: "/work/auto/hero.webp",
    hero: "/work/auto/hero.webp",
    tags: ["Key Visual", "Compositing", "Retouching", "Cinematic"],
    challenge:
      "Automotive key visuals live and die on craft. The brief: hero imagery that feels like a global campaign — dramatic, premium, flawless — without a physical shoot or a location budget.",
    strategy:
      "Treat the vehicle as a character and the environment as cinematography. Each KV is composed around a single light story and a clear hero silhouette, so the car commands the frame before a word is read.",
    direction:
      "Cinematic, high-contrast environments — water, dusk skylines, sculptural architecture — with controlled reflections and grounded shadows. Confident, restrained, aspirational.",
    execution:
      "A set of key visuals built through compositing, lighting and retouching — vehicle, environment and light combined and finished to campaign standard.",
    impact:
      "Gallery-grade automotive imagery that demonstrates the technical craft and art direction behind a believable, premium hero shot.",
    contribution: ["Art Direction", "Compositing", "Lighting & Retouch", "Finishing"],
    gallery: g(
      "/work/auto/hero.webp",
      "/work/auto/02.webp",
      "/work/auto/03.webp",
      "/work/auto/04.webp",
      "/work/auto/05.webp",
      "/work/auto/06.webp",
      "/work/auto/07.webp"
    ),
  },
  {
    slug: "social-systems",
    index: "06",
    title: "Social Systems — Design That Scales",
    client: "Multiple Brands",
    year: "2023–2025",
    category: "Social Media Systems",
    discipline: "Social-First Design · Templates · Content Systems",
    accent: "mint",
    summary:
      "Repeatable, on-brand social systems across food, hospitality, FMCG and lifestyle — design rules, not one-off posts.",
    cover: "/work/social/02.webp",
    hero: "/work/social/02.webp",
    tags: ["Social-First Design", "Templates", "Content Systems", "Bilingual"],
    challenge:
      "Social is where brands live daily — but consistency breaks down fast across dozens of posts, formats and two languages. Brands needed systems, not one-off artwork.",
    strategy:
      "Design the rules, not just the artwork. I build modular layout systems — grids, type hierarchies, color rules and bilingual logic — so a brand can produce weeks of content that still feels art-directed.",
    direction:
      "Each system is tuned to its brand: appetite-driven for FMCG, clean and premium for hospitality, warm and editorial for lifestyle — sharing a disciplined approach to hierarchy, rhythm and balance.",
    execution:
      "Feed and story templates, campaign adaptations and bilingual AR/EN layouts delivered across food, hospitality, FMCG, sports and lifestyle brands.",
    impact:
      "Repeatable, on-brand social output that protects brand equity at the speed social actually demands.",
    contribution: ["Social Art Direction", "Template Systems", "Bilingual Layout", "Content Design"],
    gallery: g(
      "/work/social/01.webp",
      "/work/social/02.webp",
      "/work/social/03.webp",
      "/work/social/04.webp",
      "/work/social/05.webp",
      "/work/social/06.webp",
      "/work/social/07.webp",
      "/work/social/08.webp",
      "/work/social/09.webp",
      "/work/social/10.webp",
      "/work/social/11.webp",
      "/work/social/12.webp",
      "/work/social/13.webp",
      "/work/social/14.webp",
      "/work/social/15.webp",
      "/work/social/16.webp",
      "/work/social/17.webp",
      "/work/social/18.webp",
      "/work/social/19.webp",
      "/work/social/20.webp",
      "/work/social/21.webp"
    ),
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  return { next: projects[(i + 1) % projects.length] };
}

// A flat, shuffled-ish pool of strong frames for the home "visual index" mosaic.
export const visualIndex: string[] = [
  "/work/axia/hero.webp",
  "/work/tilal/02.webp",
  "/work/auto/hero.webp",
  "/work/fresh-valley/packaging.webp",
  "/work/ihs/hero.webp",
  "/work/social/01.webp",
  "/work/axia/p12.webp",
  "/work/tilal/hero.webp",
  "/work/fresh-valley/fleet.webp",
  "/work/auto/02.webp",
  "/work/social/04.webp",
  "/work/axia/gift-her.webp",
  "/work/ihs/room-2.webp",
  "/work/fresh-valley/gift-1.webp",
  "/work/tilal/06.webp",
  "/work/social/14.webp",
  "/work/auto/04.webp",
  "/work/axia/p4.webp",
  "/work/fresh-valley/palette.webp",
  "/work/social/03.webp",
  "/work/tilal/10.webp",
  "/work/ihs/room-5.webp",
  "/work/axia/insta-2.webp",
  "/work/auto/05.webp",
];
