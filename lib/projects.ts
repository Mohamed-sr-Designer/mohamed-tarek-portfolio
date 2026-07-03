export type GalleryItem = { src: string; caption?: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  client: string;
  year: string;
  category: string;
  sector: string;
  discipline: string;
  accent: "electric" | "mint";
  simple?: boolean; // lighter page: banner + explanation + images, no deep case study
  summary: string;
  tagline: string;
  cover: string;
  hero: string;
  logo?: string;
  tags: string[];
  challenge?: string;
  strategy?: string;
  direction?: string;
  execution?: string;
  impact?: string;
  contribution: string[];
  gallery: GalleryItem[];
};

const g = (...srcs: string[]): GalleryItem[] => srcs.map((src) => ({ src }));

export const projects: Project[] = [
  {
    slug: "secure-tomorrow",
    index: "01",
    title: "Secure Tomorrow — Fear, Made Cinematic",
    client: "Secure Tomorrow · Cybersecurity Academy",
    year: "2025",
    category: "Brand Campaign · Cybersecurity",
    sector: "Technology",
    discipline: "Creative Direction · Campaign · Social",
    accent: "electric",
    summary:
      "A cinematic recruitment campaign for a cybersecurity academy — turning an abstract, technical field into something you feel in your gut.",
    tagline: "How we made cybersecurity feel like a thriller, not a syllabus.",
    cover: "/work/secure/cover.webp",
    hero: "/work/secure/wide.webp",
    tags: ["Creative Direction", "Campaign", "AI Production", "Social System"],
    challenge:
      "Cybersecurity education is sold on curricula and certificates — dry, technical, forgettable. Secure Tomorrow needed a campaign that made young talent want to defend the digital world, not just study it.",
    strategy:
      "I leaned into tension. Every frame is built on the quiet dread of a threat you can’t see — then flips it into agency: you are the one who sees it, stops it, secures tomorrow. Fear as the hook, mastery as the payoff.",
    direction:
      "A noir, blood-red aesthetic — Kali-Linux glow, moody server-room light, hooded silhouettes and neon data. High contrast, cinematic grade and one aggressive accent red, so every post reads as a single universe on the feed.",
    execution:
      "A full social campaign system: recruitment key visuals (SOC Analyst, Cybersecurity Diploma), concept-led awareness posts (“What is DNS?”, “Understand who will see it”) and sharp hooks — art-directed and produced end to end with AI imaging.",
    impact:
      "A cybersecurity brand that finally looks as sharp as the field it teaches — scroll-stopping, unmistakable, and built to convert curiosity into enrolment.",
    contribution: ["Campaign Concept", "Creative Direction", "AI Image Production", "Social System"],
    gallery: g(
      "/work/secure/hero.webp",
      "/work/secure/cover.webp",
      "/work/secure/02.webp",
      "/work/secure/03.webp",
      "/work/secure/04.webp",
      "/work/secure/05.webp",
      "/work/secure/06.webp",
      "/work/secure/07.webp",
      "/work/secure/08.webp",
      "/work/secure/09.webp"
    ),
  },
  {
    slug: "axia",
    index: "02",
    title: "AXIA — AI Photoshoot & Retouch",
    client: "AXIA",
    year: "2025",
    category: "AI Photoshoot · Retouch",
    sector: "Food & Retail",
    discipline: "AI Production · Retouching · Creative Direction",
    accent: "mint",
    summary:
      "A full premium photoshoot produced with AI — directed, retouched and graded until it reads like a real campaign. No camera, all craft.",
    tagline: "A full campaign photoshoot — no camera, all AI and retouch.",
    cover: "/work/axia/insta-2.webp",
    hero: "/work/axia/banner-her.webp",
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
    contribution: ["Creative Direction", "Brand Visual System", "AI Image Production", "Social & Landing"],
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
    index: "03",
    title: "Fresh Valley — Premium by Nature",
    client: "Fresh Valley",
    year: "2024",
    category: "Brand Identity",
    sector: "Food & Retail",
    discipline: "Visual Identity · Packaging · Brand System",
    accent: "mint",
    summary:
      "A complete brand identity that premiumises produce — logo, palette, packaging, stationery and fleet, from shelf to doorstep.",
    tagline: "How we made everyday produce look deliberately premium.",
    cover: "/work/fresh-valley/packaging.webp",
    hero: "/work/fresh-valley/van-life.webp",
    logo: "/work/fresh-valley/logo.webp",
    tags: ["Visual Identity", "Packaging", "Brand System", "Creative Direction"],
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
    index: "04",
    title: "Tilal Village — Where Life Finds Its Place",
    client: "Tilal Village · Makkah",
    year: "2025",
    category: "Real Estate Campaign",
    sector: "Real Estate",
    discipline: "Campaign · Brand Storytelling · Bilingual AR/EN",
    accent: "electric",
    summary:
      "A luxury community campaign built on belonging and faith — not square metres — for a residence beside the Holy Haram.",
    tagline: "How we sold belonging and faith — not square metres.",
    cover: "/work/tilal/hero.webp",
    hero: "/work/tilal/02.webp",
    tags: ["Campaign", "Brand Storytelling", "Bilingual AR/EN", "Creative Direction"],
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
    contribution: ["Campaign Concept", "Creative Direction", "Bilingual Type", "Key Visuals"],
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
    slug: "brand-vitals",
    index: "05",
    title: "BrandVitals — Marketing, Built in Blocks",
    client: "BrandVitals · Growth Agency",
    year: "2025",
    category: "Brand Campaign · 3D Social",
    sector: "Marketing & Agency",
    discipline: "Creative Direction · 3D Concept · Social System",
    accent: "electric",
    summary:
      "A playful, punchy 3D campaign that turns dry marketing truths into toy-brick metaphors you can’t scroll past.",
    tagline: "How we made marketing advice look like a toy box — and land like a punch.",
    cover: "/work/brandvitals/cover.webp",
    hero: "/work/brandvitals/wide.webp",
    tags: ["Creative Direction", "3D Concept", "Campaign", "Social System"],
    challenge:
      "Marketing agencies all say the same things — “strategy matters”, “ads need funnels”. BrandVitals needed those tired truths to feel fresh, ownable and impossible to ignore in a crowded B2B feed.",
    strategy:
      "Turn every insight into a visual metaphor built from toy bricks: a pawn crowned into a king, a cracked Ctrl+Z, an ant hauling a boulder. Familiar toys, sharp copy — smart made playful.",
    direction:
      "A bold, tactile 3D world — deep navy and electric blue, glossy brick textures, dramatic studio light and one confident headline per frame. Consistent lighting and palette make the whole set read as one system.",
    execution:
      "A rolling social campaign of concept posts, each pairing a 3D brick build with a one-line hook (“Digital marketing turns pawns into kings”, “You can’t undo bad marketing”, “Built to perform”) — a repeatable engine for the brand’s feed.",
    impact:
      "A B2B marketing brand that finally feels as creative as the work it sells — memorable, thumb-stopping and instantly recognisable across the grid.",
    contribution: ["Campaign Concept", "3D Art Direction", "Copy Direction", "Social System"],
    gallery: g(
      "/work/brandvitals/hero.webp",
      "/work/brandvitals/cover.webp",
      "/work/brandvitals/01.webp",
      "/work/brandvitals/02.webp",
      "/work/brandvitals/03.webp",
      "/work/brandvitals/04.webp",
      "/work/brandvitals/05.webp",
      "/work/brandvitals/06.webp",
      "/work/brandvitals/07.webp",
      "/work/brandvitals/08.webp",
      "/work/brandvitals/09.webp",
      "/work/brandvitals/10.webp"
    ),
  },
  {
    slug: "bnum-rajeh",
    index: "06",
    title: "Bnum Rajeh — Built on Trust",
    client: "Bnum Rajeh Commercial Group · IHS",
    year: "2025",
    category: "B2B Brand Campaign",
    sector: "Hospitality",
    discipline: "Campaign · Cross-Channel · Social System",
    accent: "electric",
    simple: true,
    summary:
      "Making the unglamorous aspirational — a cinematic B2B campaign for 50 years of trust in hospitality supply.",
    tagline: "How we made 50 years of trust feel five-star.",
    cover: "/work/ihs/room-2.webp",
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
    contribution: ["Campaign Creative Direction", "Product Key Visuals", "Social System", "Bilingual Layout"],
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
    slug: "hr-link",
    index: "07",
    title: "HR Link — Software, Sold Simply",
    client: "HR Link · نظام لينك",
    year: "2025",
    category: "B2B SaaS Campaign",
    sector: "Technology",
    discipline: "Campaign · Product Marketing · Bilingual AR/EN",
    accent: "mint",
    summary:
      "A clean, confident launch campaign for an all-in-one HR platform — making enterprise software feel effortless and human.",
    tagline: "How we made HR software feel effortless — and worth switching for.",
    cover: "/work/hrlink/cover.webp",
    hero: "/work/hrlink/wide.webp",
    tags: ["Product Marketing", "Campaign", "Bilingual AR/EN", "Social System"],
    challenge:
      "HR software is a hard sell — dense, feature-heavy and easy to make boring. HR Link needed a campaign that showed the relief of automation, not a checklist of modules.",
    strategy:
      "Sell the outcome, not the features. Each piece answers a real decision-maker worry — “too many branches?”, “takes months to set up?” — then shows the product resolving it in one calm, credible frame.",
    direction:
      "A bright, trustworthy system — brand purple, generous whitespace and crisp product UI floating in clean 3D space, paired with warm human moments. Bilingual AR/EN layouts that each feel native, never translated.",
    execution:
      "A full launch set: brand hero, benefit-led key visuals, the hiring-journey explainer and offer posts (“free for a year”, “live in 5 days”) — a cohesive campaign spanning product, people and promotion.",
    impact:
      "A SaaS brand that looks as modern as the product it sells — clear enough for a busy HR director to get it in a single scroll.",
    contribution: ["Campaign Direction", "Product Visual System", "Bilingual Layout", "Social & Landing"],
    gallery: g(
      "/work/hrlink/hero.webp",
      "/work/hrlink/cover.webp",
      "/work/hrlink/01.webp",
      "/work/hrlink/02.webp",
      "/work/hrlink/03.webp",
      "/work/hrlink/04.webp",
      "/work/hrlink/05.webp",
      "/work/hrlink/06.webp",
      "/work/hrlink/07.webp",
      "/work/hrlink/08.webp",
      "/work/hrlink/09.webp",
      "/work/hrlink/10.webp"
    ),
  },
  {
    slug: "automotive-kv",
    index: "08",
    title: "Geely — Cinematic Automotive KVs",
    client: "Geely · GWM",
    year: "2024",
    category: "Automotive · Key Visuals",
    sector: "Automotive",
    discipline: "Key Visuals · Retouching · Color Grading",
    accent: "electric",
    summary:
      "Premium, calm key visuals for Geely — communicating reliability and after-sales service through retouching, light and colour, never feeling generic.",
    tagline: "How we kept it premium and calm while selling reliability.",
    cover: "/work/auto/geely-monjaro.webp",
    hero: "/work/auto/geely-rental.webp",
    tags: ["Service Communication", "Advertising", "Key Visual", "Retouching"],
    challenge:
      "Maintaining a premium, calm visual tone while communicating reliability and technical after-sales service — without making the visuals feel commercial or generic.",
    strategy:
      "The visual language highlights calm confidence rather than motion. Clean architecture, balanced lighting and controlled colour grading present after-sales service as seamless, dependable and professionally managed.",
    direction:
      "A cinematic, restrained automotive aesthetic — sculptural architecture, dusk skies and controlled reflections — so the car commands the frame and the brand feels effortlessly premium.",
    execution:
      "I supported the project through retouching and colour grading, ensuring visual consistency across lighting, reflections and materials — enhancing realism, depth and premium finish while preserving Geely's official visual standards.",
    impact:
      "Campaign-grade key visuals that feel like global automotive work — premium, believable and unmistakably on-brand.",
    contribution: ["Image Retouching", "Color Grading", "Visual Consistency", "Creative Direction"],
    gallery: g(
      "/work/auto/geely-rental.webp",
      "/work/auto/geely-monjaro.webp",
      "/work/auto/hero.webp",
      "/work/auto/02.webp",
      "/work/auto/04.webp"
    ),
  },
  {
    slug: "rabiat-alghad",
    index: "10",
    title: "Rabiat AlGhad — Land, Positioned",
    client: "Rabiat AlGhad",
    year: "2024–2025",
    category: "Real Estate · Social Campaign",
    sector: "Real Estate",
    discipline: "Social Campaign · Bilingual · Key Visuals",
    accent: "electric",
    summary:
      "A social campaign for a master-planned land development — turning plots and infrastructure into a clear investment story.",
    tagline: "How we turned raw plots into an investment story.",
    cover: "/work/social/27.webp",
    hero: "/work/social/28.webp",
    tags: ["Social Campaign", "Real Estate", "Bilingual AR/EN", "Key Visuals"],
    challenge:
      "Selling land is selling potential — hard to make tangible. Rabiat AlGhad needed a feed that made plots, infrastructure and location feel like a clear, credible investment.",
    strategy:
      "Lead with location and readiness: aerial masterplans, billboards shown in context and confident Arabic type — every post answers “why here, why now”.",
    direction:
      "Warm dusk light, aerial renders and clean billboard mockups — premium, grounded and unmistakably real-estate.",
    execution:
      "A rolling social system — masterplan reveals, plot offers and investment angles across a consistent bilingual layout.",
    impact:
      "A land project that reads as a real investment opportunity — clear, credible and scroll-stopping.",
    contribution: ["Social Direction", "Key Visuals", "Bilingual Layout", "Content System"],
    gallery: g(
      "/work/social/27.webp",
      "/work/social/28.webp",
      "/work/social/25.webp",
      "/work/social/26.webp",
      "/work/social/22.webp",
      "/work/social/29.webp",
      "/work/social/30.webp",
      "/work/social/32.webp",
      "/work/social/33.webp"
    ),
  },
  {
    slug: "italiano",
    index: "11",
    title: "Italiano — Premium Pasta",
    client: "Italiano",
    year: "2024",
    category: "FMCG · Food",
    sector: "Food & Retail",
    discipline: "Social · Product Key Visual",
    accent: "mint",
    simple: true,
    summary:
      "An appetite-first product visual for Italiano premium pasta — the pack as hero, warm wheat-field light, and a clean brand cue that reads premium on the shelf and in the feed.",
    tagline: "Premium pasta, made to crave.",
    cover: "/work/social/01.webp",
    hero: "/work/social/01.webp",
    tags: ["FMCG", "Product Key Visual", "Social"],
    contribution: ["Product Key Visual", "Retouch", "Social"],
    gallery: g("/work/social/01.webp"),
  },
  {
    slug: "tiger",
    index: "11b",
    title: "Tiger — Snack Energy",
    client: "Tiger",
    year: "2024",
    category: "FMCG · Food",
    sector: "Food & Retail",
    discipline: "Social · Product Key Visual",
    accent: "mint",
    simple: true,
    summary:
      "A bold, high-energy product visual for Tiger chips — dynamic staging and punchy colour built to pop in a crowded snack feed.",
    tagline: "Snacks with a bite.",
    cover: "/work/social/03.webp",
    hero: "/work/social/03.webp",
    tags: ["FMCG", "Product Key Visual", "Social"],
    contribution: ["Product Key Visual", "Retouch", "Social"],
    gallery: g("/work/social/03.webp"),
  },
  {
    slug: "ouka",
    index: "11c",
    title: "Ouka — Coffee, With Character",
    client: "Ouka",
    year: "2024",
    category: "F&B · Coffee",
    sector: "Food & Retail",
    discipline: "Social · 3D Concept",
    accent: "mint",
    simple: true,
    summary:
      "3D character-led social for Ouka coffee — turning a coffee bean into a personality that owns the morning routine and the feed.",
    tagline: "Coffee with a character.",
    cover: "/work/social/15.webp",
    hero: "/work/social/15.webp",
    tags: ["F&B", "3D Concept", "Social"],
    contribution: ["Creative Direction", "3D & Retouch", "Social"],
    gallery: g("/work/social/15.webp", "/work/social/16.webp"),
  },
  {
    slug: "goodmes",
    index: "11d",
    title: "Goodmes — From Our Farms",
    client: "Goodmes",
    year: "2024",
    category: "FMCG · Food",
    sector: "Food & Retail",
    discipline: "Social · Product Key Visual",
    accent: "mint",
    simple: true,
    summary:
      "A premium product visual for Goodmes olive oil — natural light, honest craft and a farm-to-table story told in a single frame.",
    tagline: "Nature's taste, from our farms.",
    cover: "/work/social/20.webp",
    hero: "/work/social/20.webp",
    tags: ["FMCG", "Product Key Visual", "Social"],
    contribution: ["Product Key Visual", "Retouch", "Social"],
    gallery: g("/work/social/20.webp"),
  },
  {
    slug: "alrahden",
    index: "12",
    title: "AlRahden — Facilities, Elevated",
    client: "AlRahden",
    year: "2024",
    category: "B2B · Facilities & Cleaning Equipment",
    sector: "Hospitality",
    discipline: "Product Key Visuals · Social · Retouch",
    accent: "electric",
    summary:
      "Making cleaning and facilities equipment look premium — B2B product visuals shot like a consumer brand.",
    tagline: "How we made facilities equipment look premium.",
    cover: "/work/social/21.webp",
    hero: "/work/social/21.webp",
    tags: ["B2B", "Product Key Visuals", "Retouch", "Social"],
    challenge:
      "Cleaning and facilities equipment is the definition of unglamorous. AlRahden needed product visuals that signalled quality and reliability to serious buyers.",
    strategy:
      "Treat industrial products like hero products: dramatic light, clean staging and a consistent brand frame that says “professional-grade”.",
    direction:
      "Bold desert-and-studio staging, controlled reflections and confident Arabic type — industrial made aspirational.",
    execution:
      "Product key visuals and social posts across the equipment range, retouched to a premium, consistent standard.",
    impact:
      "A B2B supplier that looks as dependable as its equipment — trusted at first glance.",
    contribution: ["Product Key Visuals", "Retouching", "Social Layout", "Art Direction"],
    gallery: g(
      "/work/social/21.webp",
      "/work/social/02.webp",
      "/work/social/10.webp",
      "/work/social/11.webp"
    ),
  },
  {
    slug: "edux-cyber",
    index: "13",
    title: "EDUX — Cyber Security, Recruited",
    client: "EDUX Academy",
    year: "2024–2025",
    category: "Tech Education · Cyber Security",
    sector: "Technology",
    discipline: "Social Campaign · Recruitment · Bilingual",
    accent: "electric",
    summary:
      "Enrolment-driving social for a cyber-security academy — turning penetration testing and SOC into a career people want.",
    tagline: "How we made cyber-security a career people chase.",
    cover: "/work/social/08.webp",
    hero: "/work/social/24.webp",
    tags: ["Tech Education", "Recruitment", "Bilingual AR/EN", "Social"],
    challenge:
      "Cyber-security education is abstract and intimidating. EDUX needed social that made pen-testing and SOC roles feel exciting, attainable and worth enrolling for.",
    strategy:
      "Sell the identity, not the syllabus: “walk into the SOC room everyone fears”, “break the barriers” — position the learner as the hero-in-training.",
    direction:
      "Moody, high-contrast tech visuals — red-lit SOC rooms, neon UI and confident bilingual type — sharp and aspirational.",
    execution:
      "Recruitment key visuals and concept posts for diplomas and courses — a consistent, enrolment-focused social system.",
    impact:
      "A cyber academy that looks as sharp as the field it teaches — built to convert curiosity into enrolment.",
    contribution: ["Social Campaign", "Recruitment Visuals", "Bilingual Layout", "Art Direction"],
    gallery: g(
      "/work/social/08.webp",
      "/work/social/05.webp",
      "/work/social/24.webp",
      "/work/social/23.webp",
      "/work/social/31.webp"
    ),
  },
  {
    slug: "sekka",
    index: "14",
    title: "Sekka — Marketing, Sharpened",
    client: "Sekka",
    year: "2024",
    category: "Marketing · Social",
    sector: "Marketing & Agency",
    discipline: "Social · Concept Design",
    accent: "mint",
    simple: true,
    summary:
      "Concept-led marketing content for Sekka — bold quote posts and sharp visual metaphors that make strategy feel exciting, not corporate.",
    tagline: "Marketing content that makes you think.",
    cover: "/work/social/14.webp",
    hero: "/work/social/17.webp",
    tags: ["Marketing", "Concept Design", "Social"],
    contribution: ["Creative Direction", "Concept Design", "Social"],
    gallery: g("/work/social/14.webp", "/work/social/17.webp"),
  },
  {
    slug: "pala-de-7",
    index: "14b",
    title: "Pala De 7 — Padel, Organised",
    client: "Pala De 7",
    year: "2024",
    category: "Sports App · Social",
    sector: "Marketing & Agency",
    discipline: "Social · App Marketing",
    accent: "mint",
    simple: true,
    summary:
      "Social for a padel booking app — turning court booking and community into energy and belonging, not admin.",
    tagline: "Book, play, belong.",
    cover: "/work/social/09.webp",
    hero: "/work/social/09.webp",
    tags: ["Sports", "App Marketing", "Social"],
    contribution: ["Creative Direction", "Social", "App Marketing"],
    gallery: g("/work/social/09.webp"),
  },
  {
    slug: "albayt",
    index: "14c",
    title: "Albayt — لبيك",
    client: "Albayt",
    year: "2024",
    category: "Seasonal Campaign · Hajj",
    sector: "Hospitality",
    discipline: "Social · Seasonal Campaign",
    accent: "electric",
    simple: true,
    summary:
      "A reverent seasonal campaign for Albayt — double-exposure Ihram imagery and quiet, respectful type made for the Hajj and Umrah season.",
    tagline: "A campaign for the season of pilgrimage.",
    cover: "/work/social/04.webp",
    hero: "/work/social/06.webp",
    tags: ["Seasonal", "Campaign", "Bilingual"],
    contribution: ["Creative Direction", "Retouch", "Social"],
    gallery: g(
      "/work/social/04.webp",
      "/work/social/06.webp",
      "/work/social/07.webp",
      "/work/social/12.webp"
    ),
  },
  {
    slug: "fydback",
    index: "14d",
    title: "Fydback — Feedback, Simplified",
    client: "Fydback",
    year: "2024",
    category: "SaaS · Social",
    sector: "Technology",
    discipline: "Social · Product Marketing",
    accent: "electric",
    simple: true,
    summary:
      "Product social for Fydback — a customer-feedback platform shown clean and modern, with crisp UI floating in soft 3D space.",
    tagline: "One place for customer feedback.",
    cover: "/work/social/18.webp",
    hero: "/work/social/18.webp",
    tags: ["SaaS", "Product Marketing", "Social"],
    contribution: ["Product Marketing", "UI Visual", "Social"],
    gallery: g("/work/social/18.webp"),
  },
  {
    slug: "english-academy",
    index: "14e",
    title: "English Academy — تصير حريف",
    client: "Language Academy",
    year: "2024",
    category: "Education · Social",
    sector: "Technology",
    discipline: "Social · Enrolment Campaign",
    accent: "electric",
    simple: true,
    summary:
      "Enrolment-focused social for an English-language academy — a clear offer, accreditation trust cues and an aspirational “become fluent” hook.",
    tagline: "Become fluent — for less.",
    cover: "/work/social/19.webp",
    hero: "/work/social/19.webp",
    tags: ["Education", "Enrolment", "Social"],
    contribution: ["Creative Direction", "Social", "Enrolment"],
    gallery: g("/work/social/19.webp"),
  },
];

// Unique industries, in the order projects first appear — drives the work filter.
export const sectors: string[] = Array.from(
  new Set(projects.map((p) => p.sector))
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string): { next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  return { next: projects[(i + 1) % projects.length] };
}

// A flat, shuffled-ish pool of strong frames for the home "visual index" mosaic.
export const visualIndex: string[] = [
  "/work/secure/hero.webp",
  "/work/axia/hero.webp",
  "/work/brandvitals/hero.webp",
  "/work/tilal/02.webp",
  "/work/hrlink/hero.webp",
  "/work/auto/hero.webp",
  "/work/fresh-valley/packaging.webp",
  "/work/secure/cover.webp",
  "/work/ihs/hero.webp",
  "/work/social/01.webp",
  "/work/axia/p12.webp",
  "/work/brandvitals/06.webp",
  "/work/tilal/hero.webp",
  "/work/fresh-valley/fleet.webp",
  "/work/secure/02.webp",
  "/work/auto/02.webp",
  "/work/hrlink/cover.webp",
  "/work/social/04.webp",
  "/work/axia/gift-her.webp",
  "/work/ihs/room-2.webp",
  "/work/fresh-valley/gift-1.webp",
  "/work/tilal/06.webp",
  "/work/brandvitals/hero.webp",
  "/work/social/14.webp",
  "/work/secure/03.webp",
  "/work/auto/04.webp",
  "/work/axia/p4.webp",
  "/work/fresh-valley/palette.webp",
  "/work/social/03.webp",
  "/work/tilal/10.webp",
  "/work/ihs/room-5.webp",
  "/work/hrlink/01.webp",
];
