// Full EN/AR dictionary — every user-facing string on the site lives here.
// Components read dict[lang] via useLang().

export type Lang = "en" | "ar";

const en = {
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    letsTalk: "Let's talk",
    roleTag: "— Sr Designer, Team Lead",
    langBtn: "عربي",
  },
  hero: {
    avail: "Available — Freelance · Part-time · Hybrid",
    portfolio: "Portfolio — 2026",
    intro: "Mohamed Tarek · Sr Designer, Team Lead · based in Egypt",
    l1: "The graphic designer",
    l2: "brands call when they",
    l3pre: "need to be",
    l3accent: "unmissable.",
    ctaPrimary: "Selected work",
    ctaSecondary: "Hire me ↗",
    markets:
      "Working across Egypt · Saudi Arabia · Kuwait — strategy first, craft always.",
    chipRole: "SR DESIGNER, TEAM LEAD · EGYPT",
    chipBadge: "ART DIRECTION",
  },
  work: {
    label: "Selected Work",
    h2a: "Work, organised by the",
    h2i: "industry",
    h2b: "it was built for.",
    note: "Case studies across six industries — pick a sector, open a case.",
    viewCase: "VIEW CASE ↗",
    sectors: {
      Technology: "Technology",
      "Food & Retail": "Food & Retail",
      "Real Estate": "Real Estate",
      "Marketing & Agency": "Marketing & Agency",
      Hospitality: "Hospitality",
      Automotive: "Automotive",
    } as Record<string, string>,
    blurbs: {
      Technology:
        "Cybersecurity and HR-SaaS campaigns — complex products made human, in Arabic and English.",
      "Food & Retail":
        "Premium gifting and produce brands — identity, packaging and campaigns that sell the feeling.",
      "Real Estate":
        "Bilingual AR/EN campaigns for luxury developments in Makkah and the Gulf.",
      "Marketing & Agency":
        "3D concept campaigns and scalable social systems for agencies and multi-brand feeds.",
      Hospitality:
        "B2B hospitality supply made five-star — cinematic key visuals and cross-channel social.",
      Automotive:
        "Geely & GWM key visuals — retouching, colour grading and calm, premium light.",
    } as Record<string, string>,
  },
  // Per-project card + case copy (slug-keyed). Anything missing falls back EN.
  projects: {} as Record<
    string,
    { title?: string; tagline?: string; category?: string; challenge?: string; strategy?: string }
  >,
  services: {
    label: "Services",
    h2a: "What I can",
    h2i: "do",
    h2b: "for your brand.",
    note: "Available for freelance projects, part-time and hybrid full-time roles —",
    noteLink: "start a conversation ↗",
    items: [
      {
        title: "Brand Identity",
        desc: "Logos, visual systems, packaging and guidelines — identities built to scale from a business card to a delivery fleet.",
        tags: ["Logo & Wordmark", "Visual System", "Packaging"],
      },
      {
        title: "Campaigns & Key Visuals",
        desc: "Advertising campaigns and hero visuals for real estate, automotive, SaaS and hospitality — concept to final art.",
        tags: ["Campaign Concept", "Key Visuals", "Bilingual AR/EN"],
      },
      {
        title: "Social Media Systems",
        desc: "Repeatable, on-brand feeds — grids, templates and content systems that keep quality high at posting speed.",
        tags: ["Templates", "Content Design", "Feed Systems"],
      },
      {
        title: "Art & Creative Direction",
        desc: "Leading designers and owning the visual language — briefs, reviews and standards that lift the whole output.",
        tags: ["Team Leadership", "Concepting", "Quality Control"],
      },
      {
        title: "AI-Assisted Production",
        desc: "Campaign-grade imagery produced with AI tooling — directed, curated and retouched to a professional standard.",
        tags: ["AI Imaging", "Prompt Engineering", "Retouching"],
      },
      {
        title: "Motion & Web",
        desc: "Reels, promos and edits — plus designed-and-shipped websites, vibe-coded end to end like this portfolio.",
        tags: ["Video & Reels", "Motion Graphics", "Web Design"],
      },
    ],
  },
  motion: {
    label: "Motion & Video",
    h2a: "When a still isn't",
    h2i: "enough",
    h2b: ".",
    note: "Brand films, social reels and animation — tap the speaker to hear it, or expand any clip to watch larger.",
  },
  web: {
    label: "Vibe Coding",
    h2a: "I design — then I",
    h2i: "ship the code",
    h2b: ".",
    note: "Live websites I designed and built through vibe coding — AI-assisted development. Even this portfolio is vibe-coded. Click any to open the live site.",
    live: "Live ↗",
  },
  social: {
    label: "Social media — a wall of recent posts",
    browse: "Browse the work ↑",
  },
  hire: {
    avail: "FREELANCE · PART-TIME · FULL-TIME HYBRID",
    h2a: "Have a brand that needs",
    h2i: "direction",
    h2b: "?",
    body: "I take on freelance projects, part-time engagements and hybrid full-time roles across Egypt · Saudi Arabia · Kuwait. Tell me what you're building — I'll tell you how design gets it there.",
    wa: "WhatsApp me ↗",
    all: "All contact options",
  },
  footer: {
    blurb:
      "Sr Designer & Team Lead based in Egypt, working across Egypt · Saudi Arabia · Kuwait. Available for freelance, part-time and hybrid full-time roles.",
    siteCol: "Site",
    connectCol: "Connect",
    rights: "Designed, art-directed & vibe-coded in-house.",
    backTop: "Back to top ↑",
  },
  about: {
    label: "About",
    intro1: "A designer who leads — treating every brand as a",
    introAccent: "business problem",
    intro2: "with a creative answer.",
    bio1: "I'm Mohamed Tarek, a Sr Designer and Team Lead — based in Egypt with professional experience across the Egyptian, Saudi and Kuwaiti markets — focused on clean, strategic, performance-driven design that strengthens brand identity and supports real marketing objectives.",
    bio2: "I work across branding, campaigns, social systems, key visuals and motion — skilled in Adobe Photoshop and Illustrator, UI design, and AI-powered creative tools I use to ideate and deliver modern work tailored to Middle East markets. Alongside client work, I teach graphic design as an instructor, mentoring the next wave of designers.",
    coreFocus: "Core focus",
    traitsLabel: "Personal traits",
    focus: ["2D Visual Design", "Brand Systems", "AI Prompt Engineering"],
    traits: [
      "Creative & Strategic Thinker",
      "Performance-Driven",
      "Detail-Oriented",
      "Fast Learner & Adaptive",
      "Strong Visual Consistency",
      "Collaborative Team Player",
    ],
  },
  exp: {
    label: "Experience",
    h2a: "The companies that",
    h2i: "shaped",
    h2b: "me.",
    note: "Across Egypt & Saudi Arabia — newest first. From graphic designer, to teaching, to leading an art team.",
    now: "Now",
    promoted: "↑ Promoted",
    returned: "↩ Returned to lead",
  },
  teach: {
    label: "Teaching",
    h2a: "I don't just lead designers —",
    h2i: "I make them",
    h2b: ".",
    note: "Instructor across four academies — and an on-call advisor, visiting teams to solve design problems on the ground.",
    statNote:
      "Close to 1,200 students graduated across 49 cohorts — numbers are approximate, and still counting.",
    stats: [
      { n: "~1,200", l: "students graduated" },
      { n: "49", l: "cohorts taught" },
      { n: "4", l: "academies" },
    ],
    current: "Current",
    role: "Design Instructor",
    academies: [
      {
        name: "SOIC — School of Cinema",
        now: true,
        desc: "Teaching design craft inside a filmmaking school — visual storytelling, key art and campaign thinking for cinema.",
      },
      {
        name: "EDUX Academy",
        now: true,
        desc: "Graphic design tracks taking students from fundamentals to portfolio-ready execution.",
      },
      {
        name: "Easily",
        now: false,
        desc: "Full essentials journey — Photoshop, Illustrator and Figma; ad campaigns, UI/UX, moodboards, storyboards, insights, concept development and execution.",
      },
      {
        name: "Raya Academy",
        now: false,
        desc: "Hands-on graphic design cohorts — photo manipulation, landing pages and branding, taught project by project.",
      },
    ],
  },
  process: {
    label: "Creative Process",
    h2a: "From a brief to a",
    h2i: "decision",
    h2b: ".",
    note: "Direction is decision-making — the path I take every brand through, from understanding to execution.",
    steps: [
      {
        n: "01",
        title: "Research",
        body: "I start with the business, the market and the audience — what the brand needs to achieve, and what everyone else is already saying.",
      },
      {
        n: "02",
        title: "Insight",
        body: "I find the one truth that unlocks the work — the tension that makes people care. The insight is the strategy in a single sentence.",
      },
      {
        n: "03",
        title: "Concept",
        body: "I translate the insight into a creative idea big enough to live across channels — a platform, not a poster.",
      },
      {
        n: "04",
        title: "Direction",
        body: "I define the visual language: type, colour, light and tone. The idea becomes a world with rules everyone can build on.",
      },
      {
        n: "05",
        title: "Execution",
        body: "I bring it to life and hold the bar across every touchpoint — from the hero frame to the smallest story.",
      },
    ],
  },
  skills: {
    label: "Capabilities",
    groups: [
      {
        title: "Direction & Strategy",
        items: ["Creative Direction", "Brand Strategy", "Campaign Design", "Creative Thinking"],
      },
      {
        title: "Craft & Systems",
        items: ["Visual Identity", "Social Media Systems", "Motion Design", "Marketing Communication"],
      },
      {
        title: "Production",
        items: ["Photo Manipulation", "Key Visuals", "UI Design", "AI Prompt Engineering", "Vibe Coding"],
      },
    ],
  },
  tools: {
    label: "Toolkit",
    h2a: "Craft tools, sharpened with",
    h2i: "AI",
    h2b: ".",
    aiCol: "AI Toolkit",
    craftCol: "Design & Motion",
  },
  vision: {
    label: "Vision",
    h2a: "I want to turn a business problem into the",
    h2i: "idea",
    h2b: "everyone rallies behind.",
    pillars: [
      {
        k: "Where I am",
        v: "An art Team Lead with a designer's craft and a strategist's instinct — already leading the team and building work that performs in market.",
      },
      {
        k: "Where I'm heading",
        v: "Creative direction: owning concepts end to end, shaping visual languages, and raising the craft of the people around me.",
      },
      {
        k: "Why direction",
        v: "My strongest work was never about decoration — it's about decisions. That's where strategy, craft and leadership meet.",
      },
    ],
  },
  contact: {
    label: "Contact",
    h2a: "Let's make work that's",
    h2i: "remembered.",
    body: "Open to new roles, freelance projects and creative collaborations across Egypt · Saudi Arabia · Kuwait. If you're building something ambitious, I'd love to hear about it.",
    labels: {
      Email: "Email",
      WhatsApp: "WhatsApp",
      Phone: "Phone",
      LinkedIn: "LinkedIn",
    } as Record<string, string>,
  },
  case: {
    allWork: "All work",
    letsTalk: "Let's talk",
    challenge: "The Challenge",
    solution: "The Solution",
    ctaA: "Got a brand worth building?",
    ctaI: "Let's talk.",
    ctaBtn: "Start a conversation ↗",
    cont: "Continue",
    readMore: "Read more ↗",
    bookA: "Read the",
    bookI: "brand book",
    bookB: ".",
    bookNote: "66 pages — flip with the arrows, edges or your keyboard.",
    interactive: "Interactive",
    prev: "Previous",
    next: "Next",
  },
};

// ---------------------------------------------------------------- Arabic
const ar: typeof en = {
  nav: {
    work: "الأعمال",
    about: "عنّي",
    contact: "تواصل",
    letsTalk: "لنتحدث",
    roleTag: "— مصمم أول، قائد فريق",
    langBtn: "EN",
  },
  hero: {
    avail: "متاح — فريلانس · دوام جزئي · هجين",
    portfolio: "بورتفوليو — ٢٠٢٦",
    intro: "محمد طارق · مصمم أول، قائد فريق · مقيم في مصر",
    l1: "المصمّم الذي تناديه",
    l2: "العلامات التجارية حين",
    l3pre: "تريد أن تكون",
    l3accent: "لا تُنسى.",
    ctaPrimary: "أعمال مختارة",
    ctaSecondary: "وظّفني ↗",
    markets: "أعمل عبر مصر · السعودية · الكويت — الاستراتيجية أولًا، والحِرفة دائمًا.",
    chipRole: "مصمم أول، قائد فريق · مصر",
    chipBadge: "آرت دايركشن",
  },
  work: {
    label: "أعمال مختارة",
    h2a: "الأعمال، منظّمة حسب",
    h2i: "الصناعة",
    h2b: "التي صُمّمت لها.",
    note: "دراسات حالة عبر ست صناعات — اختر قطاعًا وافتح الحالة.",
    viewCase: "عرض الحالة ↗",
    sectors: {
      Technology: "التقنية",
      "Food & Retail": "الأغذية والتجزئة",
      "Real Estate": "العقارات",
      "Marketing & Agency": "التسويق والوكالات",
      Hospitality: "الضيافة",
      Automotive: "السيارات",
    },
    blurbs: {
      Technology:
        "حملات للأمن السيبراني وأنظمة الموارد البشرية — منتجات معقّدة تصل للناس ببساطة، بالعربية والإنجليزية.",
      "Food & Retail":
        "علامات هدايا ومنتجات مميّزة — هوية وتغليف وحملات تبيع الإحساس قبل المنتج.",
      "Real Estate": "حملات ثنائية اللغة لمشاريع فاخرة في مكة والخليج.",
      "Marketing & Agency":
        "حملات مفاهيم ثلاثية الأبعاد وأنظمة سوشيال قابلة للتوسّع للوكالات.",
      Hospitality:
        "توريدات الضيافة بمظهر خمس نجوم — صور رئيسية سينمائية وسوشيال متكامل.",
      Automotive: "الصور الرئيسية لجيلي وGWM — ريتاتش وتلوين وضوء هادئ فاخر.",
    },
  },
  projects: {
    "rabiat-alghad": {
      title: "رابية الغد — أرض في مكانها الصحيح",
      tagline: "كيف حوّلنا قطع الأرض إلى قصة استثمار.",
      category: "عقارات · حملة سوشيال",
      challenge:
        "بيع الأرض هو بيع للإمكانات — صعب تحسّه. احتاجت رابية الغد فيدًا يخلّي القطع والبنية التحتية والموقع تبان كفرصة استثمار واضحة وموثوقة.",
      strategy:
        "قُد بالموقع والجاهزية: مخططات جوية، ولوحات في سياقها، وخط عربي واثق — كل بوست يجاوب على «ليه هنا، وليه دلوقتي».",
    },
    italiano: {
      title: "إيطاليانو — مكرونة فاخرة",
      tagline: "مكرونة فاخرة تفتح النفس.",
      category: "FMCG · أغذية",
      strategy:
        "صورة منتج تفتح الشهية لإيطاليانو — العبوة بطلة، وضوء دافئ من حقول القمح، وإشارة علامة نظيفة تبان فاخرة على الرف وفي الفيد.",
    },
    tiger: {
      title: "تايجر — طاقة السناكس",
      tagline: "سناكس بنكهة جريئة.",
      category: "FMCG · أغذية",
      strategy:
        "صورة منتج جريئة وعالية الطاقة لشيبس تايجر — ستيجينج ديناميكي وألوان قوية تلفت النظر في فيد مزدحم بالسناكس.",
    },
    ouka: {
      title: "اوكا — قهوة بشخصية",
      tagline: "قهوة لها شخصية.",
      category: "أغذية ومشروبات · قهوة",
      strategy:
        "سوشيال ثلاثي الأبعاد بشخصية لقهوة اوكا — حبة قهوة تتحوّل لكاراكتر يملك صباحك والفيد.",
    },
    goodmes: {
      title: "Goodmes — من مزارعنا",
      tagline: "طعم الطبيعة من مزارعنا.",
      category: "FMCG · أغذية",
      strategy:
        "صورة منتج فاخرة لزيت زيتون Goodmes — ضوء طبيعي وحِرفة صادقة وقصة من المزرعة للمائدة في إطار واحد.",
    },
    "alrahden": {
      title: "الرهدن — معدات بمظهر فاخر",
      tagline: "كيف جعلنا معدات النظافة تبدو فاخرة.",
      category: "B2B · معدات نظافة ومرافق",
      challenge:
        "معدات النظافة والمرافق تعريفُ الشيء غير الجذّاب. احتاج الرهدن صور منتج توصّل الجودة والاعتمادية لمشترٍ جاد.",
      strategy:
        "عامل المنتجات الصناعية كمنتجات بطولية: إضاءة درامية، وستيجينج نظيف، وإطار علامة ثابت يقول «درجة احترافية».",
    },
    "edux-cyber": {
      title: "EDUX — أمن سيبراني يجذب",
      tagline: "كيف جعلنا الأمن السيبراني مهنة يسعى لها الناس.",
      category: "تعليم تقني · أمن سيبراني",
      challenge:
        "تعليم الأمن السيبراني مجرّد ومخيف. احتاج EDUX سوشيال يخلّي اختبار الاختراق وغرف الـSOC مثيرة وقابلة للتحقيق وتستحق التسجيل.",
      strategy:
        "بِع الهوية لا المنهج: «ادخل غرفة الـSOC اللي الكل بيخافها»، «اكسر الحواجز» — ضع المتعلّم كبطلٍ قيد التدريب.",
    },
    "secure-tomorrow": {
      title: "Secure Tomorrow — الخوف، سينمائيًا",
      tagline: "كيف جعلنا الأمن السيبراني يُحسّ كفيلم إثارة لا كمنهج دراسي.",
      category: "حملة براند · أمن سيبراني",
      challenge:
        "تعليم الأمن السيبراني يُباع بالمناهج والشهادات — جاف وتقني ومنسي. احتاجت Secure Tomorrow حملة تجعل المواهب الشابة تريد أن تحمي العالم الرقمي، لا أن تدرسه فقط.",
      strategy:
        "اعتمدتُ على التوتّر: كل إطار مبني على رهبة تهديدٍ لا تراه — ثم ينقلب إلى تمكين: أنت من يراه ويوقفه ويؤمّن الغد. الخوف هو الخطّاف، والإتقان هو المكافأة.",
    },
    axia: {
      title: "AXIA — فوتوشوت بالذكاء الاصطناعي وريتاتش",
      tagline: "جلسة تصوير كاملة لحملة فاخرة — بلا كاميرا، بالذكاء الاصطناعي والريتاتش.",
      category: "فوتوشوت AI · ريتاتش",
      challenge:
        "علامة هدايا مصنوعة يدويًا تدخل سوقًا مزدحمًا يتنافس بالخصومات — واحتاجت عالمًا بصريًا شخصيًا وفاخرًا بلا ميزانية إنتاج تصوير حقيقي.",
      strategy:
        "أعدت صياغة المطلوب من «صوّر المنتجات» إلى «صوّر اللحظة التي تصنعها الهدية» — ثم أخرجتُ جلسة التصوير كاملة بأدوات الذكاء الاصطناعي، وقُدتها بالريتاتش والتلوين حتى قرأت كأنها إنتاج حقيقي.",
    },
    "fresh-valley": {
      title: "Fresh Valley — فاخرة بطبيعتها",
      tagline: "كيف جعلنا المنتجات اليومية تبدو فاخرة عن قصد.",
      category: "هوية بصرية",
      challenge:
        "الخضار والفواكه سلعة تُشترى بالسعر لا بالعلامة. أرادت Fresh Valley امتلاك فئة التصدير الفاخرة، فاحتاجت هوية تُعلن الجودة من أول نظرة.",
      strategy:
        "عاملتُ المنتجات كمنتج فاخر: نظام مبني على الطبيعة والحِرفة — كرافت معاد تدويره، رسوم نباتية خطية، وأصناف مسمّاة — من الشعار حتى أسطول التوزيع.",
    },
    "tilal-village": {
      title: "تلال فيليدج — حيث تجد الحياة مكانها",
      tagline: "كيف بعنا الانتماء والإيمان — لا الأمتار المربعة.",
      category: "حملة عقارية",
      challenge:
        "مجتمع سكني فاخر على خطوات من الحرم في مكة. الفئة كلها تبيع بالمواصفات؛ تلال احتاجت أن تبيع إحساس تربية عائلة في مكانٍ ذي معنى.",
      strategy:
        "القرب من الحرم ليس ميزة — بل أسلوب حياة. بنيتُ الحملة على «حياة بجوار الحرم»، وأرسيتُ العلامة على الانتماء والإيمان والعائلة بنظام فني ثنائي اللغة.",
    },
    "brand-vitals": {
      title: "BrandVitals — تسويق مبني بالمكعبات",
      tagline: "كيف جعلنا نصائح التسويق تبدو كصندوق ألعاب — وتصل كلكمة.",
      category: "حملة براند · 3D",
      challenge:
        "كل وكالات التسويق تقول الكلام نفسه. احتاجت BrandVitals أن تجعل الحقائق المستهلكة طازجة ومميّزة ويستحيل تجاهلها في فيد B2B مزدحم.",
      strategy:
        "حوّلت كل فكرة إلى استعارة بصرية من مكعبات اللعب: بيدق يُتوَّج ملكًا، وCtrl+Z مكسور، ونملة تجرّ صخرة — ألعاب مألوفة بكوبي حاد، ذكاء بروح مرحة.",
    },
    "bnum-rajeh": {
      title: "بنوم راجح — مبنيّة على الثقة",
      tagline: "كيف جعلنا خمسين عامًا من الثقة تُحَسّ كخمس نجوم.",
      category: "حملة B2B",
      challenge:
        "خمسون عامًا في توريد معدات الضيافة والنظافة — فئة وظيفية تقنية. التحدي: حملة بفخامة الفنادق التي يخدمونها.",
      strategy:
        "قُد بالثقة والمعايير لا بالمنتجات: الفنادق لا تشتري ماكينات بل تجربة ضيوف بلا أخطاء — فوضعتُ العلامة في مستوى طموح عملائها بجمالية سينمائية عالية التباين.",
    },
    "hr-link": {
      title: "HR Link — برمجيات تُباع ببساطة",
      tagline: "كيف جعلنا نظام الموارد البشرية يبدو سهلًا — ويستحق التبديل إليه.",
      category: "حملة SaaS",
      challenge:
        "برمجيات الموارد البشرية بيعها صعب — كثيفة ومملة بطبيعتها. احتاج HR Link حملة تُظهر راحة الأتمتة، لا قائمة مزايا.",
      strategy:
        "بِع النتيجة لا الخصائص: كل قطعة تجيب على قلقٍ حقيقي لصانع القرار — «فروع كثيرة؟»، «تركيب يأخذ شهورًا؟» — ثم تُري المنتج يحلّها في إطارٍ هادئ موثوق.",
    },
    "automotive-kv": {
      title: "جيلي — صور رئيسية سينمائية",
      tagline: "كيف حافظنا على الفخامة والهدوء ونحن نبيع الاعتمادية.",
      category: "سيارات · صور رئيسية",
      challenge:
        "الحفاظ على نبرة بصرية فاخرة هادئة مع إيصال الاعتمادية وخدمة ما بعد البيع التقنية — دون أن تبدو الصور تجارية أو مستهلكة.",
      strategy:
        "لغة بصرية تحتفي بالثقة الهادئة لا بالحركة: عمارة نظيفة، إضاءة متوازنة، وتلوين مضبوط يقدّم خدمة ما بعد البيع كأمرٍ سلس يمكن الاعتماد عليه.",
    },
    sekka: {
      title: "سكة — تسويق أحدّ",
      tagline: "محتوى تسويقي يخلّيك تفكّر.",
      category: "تسويق · سوشيال",
      strategy:
        "محتوى تسويقي مبني على الفكرة لسكة — بوستات اقتباسات جريئة واستعارات بصرية حادّة تخلّي الاستراتيجية مثيرة لا مؤسسية.",
    },
    "pala-de-7": {
      title: "بالا دي 7 — بادل منظّم",
      tagline: "احجز، إلعب، انتمِ.",
      category: "تطبيق رياضي · سوشيال",
      strategy:
        "سوشيال لتطبيق حجز بادل — يحوّل حجز الملاعب والمجتمع إلى طاقة وانتماء، لا مجرد إجراءات.",
    },
    albayt: {
      title: "البيت — لبيك",
      tagline: "حملة لموسم الحج والعمرة.",
      category: "حملة موسمية · حج",
      strategy:
        "حملة موسمية بروح خاشعة للبيت — صور إحرام بتعريض مزدوج وخط هادئ محترم مصمّم لموسم الحج والعمرة.",
    },
    fydback: {
      title: "فيدباك — تقييمات ببساطة",
      tagline: "مكان واحد لتقييمات العملاء.",
      category: "SaaS · سوشيال",
      strategy:
        "سوشيال منتج لفيدباك — منصة تقييمات عملاء، معروضة نظيفة وعصرية بواجهات دقيقة في مساحة ثلاثية الأبعاد ناعمة.",
    },
    "english-academy": {
      title: "أكاديمية إنجليزي — تصير حريف",
      tagline: "اتقن الإنجليزي — بأقل تكلفة.",
      category: "تعليم · سوشيال",
      strategy:
        "سوشيال يركّز على التسجيل لأكاديمية لغة إنجليزية — عرض واضح وإشارات ثقة معتمدة وخطّاف طموح «تصير حريف».",
    },
  },
  services: {
    label: "الخدمات",
    h2a: "ماذا أستطيع أن",
    h2i: "أفعل",
    h2b: "لعلامتك.",
    note: "متاح لمشاريع الفريلانس والدوام الجزئي والهجين —",
    noteLink: "ابدأ محادثة ↗",
    items: [
      {
        title: "الهوية البصرية",
        desc: "شعارات وأنظمة بصرية وتغليف وأدلّة استخدام — هويات تتوسّع من كرت العمل حتى أسطول التوزيع.",
        tags: ["الشعار", "النظام البصري", "التغليف"],
      },
      {
        title: "الحملات والصور الرئيسية",
        desc: "حملات إعلانية وصور بطولية للعقارات والسيارات والتقنية والضيافة — من الفكرة إلى الفن النهائي.",
        tags: ["فكرة الحملة", "صور رئيسية", "عربي/إنجليزي"],
      },
      {
        title: "أنظمة السوشيال ميديا",
        desc: "فيدات متّسقة قابلة للتكرار — شبكات وقوالب وأنظمة محتوى تحافظ على الجودة بسرعة النشر.",
        tags: ["قوالب", "تصميم محتوى", "أنظمة فيد"],
      },
      {
        title: "الإخراج الفني والإبداعي",
        desc: "قيادة المصممين وامتلاك اللغة البصرية — بريفات ومراجعات ومعايير ترفع مستوى الإنتاج كله.",
        tags: ["قيادة فريق", "بناء المفاهيم", "ضبط الجودة"],
      },
      {
        title: "إنتاج بالذكاء الاصطناعي",
        desc: "صور بمستوى الحملات منتَجة بأدوات الذكاء الاصطناعي — مُخرجة ومنتقاة ومعالَجة باحترافية.",
        tags: ["تصوير AI", "هندسة البرومبت", "ريتاتش"],
      },
      {
        title: "الموشن والويب",
        desc: "ريلز وبرومو ومونتاج — ومواقع مصمَّمة ومبنية بالكامل بالتطوير المعزّز بالذكاء الاصطناعي، مثل هذا الموقع.",
        tags: ["فيديو وريلز", "موشن جرافيك", "تصميم مواقع"],
      },
    ],
  },
  motion: {
    label: "موشن وفيديو",
    h2a: "حين لا تكفي",
    h2i: "الصورة الثابتة",
    h2b: ".",
    note: "أفلام علامات وريلز وأنيميشن — اضغط السماعة للصوت، أو كبّر أي مقطع.",
  },
  web: {
    label: "فايب كودينج",
    h2a: "أصمّم — ثم",
    h2i: "أشحن الكود",
    h2b: ".",
    note: "مواقع حيّة صمّمتها وبنيتها بالتطوير المعزّز بالذكاء الاصطناعي. حتى هذا البورتفوليو مبني بنفس الطريقة. اضغط أي موقع لفتحه مباشرة.",
    live: "مباشر ↗",
  },
  social: {
    label: "سوشيال ميديا — جدار من أحدث البوستات",
    browse: "تصفّح الأعمال ↑",
  },
  hire: {
    avail: "فريلانس · دوام جزئي · دوام كامل هجين",
    h2a: "عندك علامة تحتاج",
    h2i: "اتجاهًا",
    h2b: "؟",
    body: "أعمل على مشاريع فريلانس وارتباطات جزئية وأدوار هجينة عبر مصر · السعودية · الكويت. احكِ لي ما تبنيه — وسأخبرك كيف يوصله التصميم.",
    wa: "راسلني واتساب ↗",
    all: "كل وسائل التواصل",
  },
  footer: {
    blurb:
      "مصمم أول وقائد فريق مقيم في مصر، أعمل عبر مصر · السعودية · الكويت. متاح للفريلانس والدوام الجزئي والهجين.",
    siteCol: "الموقع",
    connectCol: "تواصل",
    rights: "صُمّم وأُخرج فنيًا وبُرمج داخليًا.",
    backTop: "العودة للأعلى ↑",
  },
  about: {
    label: "عنّي",
    intro1: "مصمّم يقود — يتعامل مع كل علامة بوصفها",
    introAccent: "مشكلة عمل",
    intro2: "لها إجابة إبداعية.",
    bio1: "أنا محمد طارق، مصمم أول وقائد فريق — مقيم في مصر وبخبرة مهنية عبر الأسواق المصرية والسعودية والكويتية، أركّز على تصميم نظيف واستراتيجي مدفوع بالأداء يقوّي هوية العلامة ويخدم أهداف التسويق الحقيقية.",
    bio2: "أعمل عبر البراندينج والحملات وأنظمة السوشيال والصور الرئيسية والموشن — متمكّن من فوتوشوب وإليستريتور وتصميم الواجهات وأدوات الذكاء الاصطناعي الإبداعية التي أستخدمها لابتكار وتسليم أعمال حديثة تناسب أسواق الشرق الأوسط. وإلى جانب عمل العملاء، أدرّس الجرافيك ديزاين كمُحاضر وأوجّه الجيل القادم من المصممين.",
    coreFocus: "التركيز الأساسي",
    traitsLabel: "سمات شخصية",
    focus: ["تصميم بصري 2D", "أنظمة العلامات", "هندسة برومبت AI"],
    traits: [
      "مفكّر إبداعي واستراتيجي",
      "مدفوع بالأداء",
      "مهتم بالتفاصيل",
      "سريع التعلّم والتكيّف",
      "اتساق بصري قوي",
      "لاعب فريق تعاوني",
    ],
  },
  exp: {
    label: "الخبرات",
    h2a: "الشركات التي",
    h2i: "صنعتني",
    h2b: ".",
    note: "عبر مصر والسعودية — الأحدث أولًا. من مصمّم جرافيك، إلى التدريس، إلى قيادة فريق فني.",
    now: "الآن",
    promoted: "↑ ترقية",
    returned: "↩ عاد ليقود",
  },
  teach: {
    label: "التدريس",
    h2a: "لا أقود المصممين فقط —",
    h2i: "أنا أصنعهم",
    h2b: ".",
    note: "مُحاضر في أربع أكاديميات — ومستشار عند الطلب، أزور الفرق لحل مشكلات التصميم على أرض الواقع.",
    statNote: "قرابة ١٢٠٠ طالب تخرّجوا عبر ٤٩ دفعة — الأرقام تقريبية، وما زالت تنمو.",
    stats: [
      { n: "~١٢٠٠", l: "طالب متخرّج" },
      { n: "٤٩", l: "دفعة تدريبية" },
      { n: "٤", l: "أكاديميات" },
    ],
    current: "حاليًا",
    role: "مُحاضر تصميم",
    academies: [
      {
        name: "SOIC — مدرسة السينما",
        now: true,
        desc: "تدريس حِرفة التصميم داخل مدرسة لصناعة الأفلام — السرد البصري والكي-آرت وتفكير الحملات للسينما.",
      },
      {
        name: "EDUX أكاديمي",
        now: true,
        desc: "مسارات جرافيك ديزاين تأخذ الطلاب من الأساسيات حتى تنفيذٍ جاهز للبورتفوليو.",
      },
      {
        name: "Easily",
        now: false,
        desc: "رحلة أساسيات كاملة — فوتوشوب وإليستريتور وفيجما؛ حملات إعلانية وUI/UX ومودبورد وستوري بورد وإنسايتس وتطوير مفاهيم وتنفيذ.",
      },
      {
        name: "راية أكاديمي",
        now: false,
        desc: "دفعات جرافيك عملية — فوتو مانيبيوليشن وصفحات هبوط وبراندينج، مشروعًا بمشروع.",
      },
    ],
  },
  process: {
    label: "منهجية العمل",
    h2a: "من البريف إلى",
    h2i: "قرار",
    h2b: ".",
    note: "الإخراج هو صناعة القرار — المسار الذي آخذ فيه كل علامة، من الفهم حتى التنفيذ.",
    steps: [
      {
        n: "01",
        title: "البحث",
        body: "أبدأ من العمل والسوق والجمهور — ما الذي تحتاج العلامة تحقيقه، وما الذي يقوله الجميع بالفعل.",
      },
      {
        n: "02",
        title: "الإنسايت",
        body: "أجد الحقيقة الواحدة التي تفتح العمل — التوتّر الذي يجعل الناس تهتم. الإنسايت هو الاستراتيجية في جملة.",
      },
      {
        n: "03",
        title: "الفكرة",
        body: "أترجم الإنسايت إلى فكرة إبداعية كبيرة تكفي لتعيش عبر القنوات — منصة، لا بوستر.",
      },
      {
        n: "04",
        title: "الاتجاه الفني",
        body: "أحدّد اللغة البصرية: الخط واللون والضوء والنبرة. تتحوّل الفكرة إلى عالمٍ بقواعد يبني عليها الجميع.",
      },
      {
        n: "05",
        title: "التنفيذ",
        body: "أحوّلها إلى واقع وأحافظ على المستوى في كل نقطة تماس — من الإطار البطولي حتى أصغر ستوري.",
      },
    ],
  },
  skills: {
    label: "القدرات",
    groups: [
      {
        title: "الإخراج والاستراتيجية",
        items: ["إخراج إبداعي", "استراتيجية علامات", "تصميم حملات", "تفكير إبداعي"],
      },
      {
        title: "الحِرفة والأنظمة",
        items: ["هوية بصرية", "أنظمة سوشيال ميديا", "موشن ديزاين", "اتصال تسويقي"],
      },
      {
        title: "الإنتاج",
        items: ["فوتو مانيبيوليشن", "صور رئيسية", "تصميم واجهات", "هندسة برومبت AI", "فايب كودينج"],
      },
    ],
  },
  tools: {
    label: "الأدوات",
    h2a: "أدوات الحِرفة، مشحوذة بـ",
    h2i: "الذكاء الاصطناعي",
    h2b: ".",
    aiCol: "أدوات AI",
    craftCol: "تصميم وموشن",
  },
  vision: {
    label: "الرؤية",
    h2a: "أريد أن أحوّل مشكلة العمل إلى",
    h2i: "الفكرة",
    h2b: "التي يلتفّ حولها الجميع.",
    pillars: [
      {
        k: "أين أنا",
        v: "قائد فريق فني بحِرفة مصمّم وحدس استراتيجي — أقود الفريق فعلًا وأبني أعمالًا تُحقق نتائج في السوق.",
      },
      {
        k: "إلى أين أتجه",
        v: "الإخراج الإبداعي: امتلاك المفاهيم من البداية للنهاية، وصياغة اللغات البصرية، ورفع حِرفة من حولي.",
      },
      {
        k: "لماذا الإخراج",
        v: "أقوى أعمالي لم تكن يومًا عن الزخرفة — بل عن القرارات. هناك تلتقي الاستراتيجية والحِرفة والقيادة.",
      },
    ],
  },
  contact: {
    label: "تواصل",
    h2a: "لنصنع عملًا",
    h2i: "يُتذكَّر.",
    body: "متاح لأدوار جديدة ومشاريع فريلانس وتعاونات إبداعية عبر مصر · السعودية · الكويت. إن كنت تبني شيئًا طموحًا، يسعدني أن أسمع عنه.",
    labels: {
      Email: "البريد",
      WhatsApp: "واتساب",
      Phone: "الهاتف",
      LinkedIn: "لينكد إن",
    },
  },
  case: {
    allWork: "كل الأعمال",
    letsTalk: "لنتحدث",
    challenge: "التحدّي",
    solution: "الحل",
    ctaA: "عندك علامة تستحق البناء؟",
    ctaI: "لنتحدث.",
    ctaBtn: "ابدأ محادثة ↗",
    cont: "تابع",
    readMore: "اقرأ المزيد ↗",
    bookA: "اقرأ",
    bookI: "كتاب العلامة",
    bookB: ".",
    bookNote: "٦٦ صفحة — اقلب بالأسهم أو حواف الصفحة أو لوحة المفاتيح.",
    interactive: "تفاعلي",
    prev: "السابق",
    next: "التالي",
  },
};

export const dict = { en, ar };
