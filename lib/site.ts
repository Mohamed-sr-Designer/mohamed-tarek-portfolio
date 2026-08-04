export const site = {
  name: "Mohamed Tarek",
  role: "Team Lead",
  roleFull: "Graphic Designer & Art Director — Team Lead",
  title: "Mohamed Tarek — Graphic Designer & Art Director | Team Lead",
  description:
    "Mohamed Tarek is a graphic designer and art director (Team Lead) based in Egypt, working across Egypt, Saudi Arabia and Kuwait. He builds brand identities, ad campaigns, social media systems, key visuals and motion — and is available for freelance, part-time and hybrid full-time roles.",
  availability: "Freelance · Part-time · Full-time hybrid",
  url: "https://mohamed-sr-designer.github.io/mohamed-tarek-portfolio",
  email: "mohamed.tarek.ahmed1@gmail.com",
  phoneDisplay: "+20 10 1145 8929",
  phone: "+201011458929",
  whatsappDisplay: "+20 122 874 8098",
  whatsapp: "201228748098",
  linkedin: "https://www.linkedin.com/in/mohamedrk/",
  linkedinHandle: "/in/mohamedrk",
  github: "https://github.com/Mohamed-sr-Designer",
  location: "Egypt",
  markets: "Egypt · Saudi Arabia · Kuwait",
};

export const contacts = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: `https://wa.me/${site.whatsapp}`,
  },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin },
];

export const nav = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ---- Premium course payment + access config ----
// EDIT these with your real details. Manual methods are live; the gateways
// are UI-ready and wait for their API keys (see components/PaymentModal.tsx).
export const payments = {
  price: "EGP 750", // paid AI Video track price
  currency: "EGP",
  manual: {
    instapay: "mohamedtarek@instapay", // TODO: your real InstaPay address/handle
    vodafoneCash: "01011458929", // TODO: your real Vodafone Cash number
  },
  // Payment gateways — set enabled:true once the API/keys are wired.
  gateways: [
    { id: "paymob", label: "Paymob", enabled: false },
    { id: "fawry", label: "Fawry", enabled: false },
    { id: "valu", label: "valU", enabled: false },
    { id: "aman", label: "Aman", enabled: false },
  ],

  // ---- Secure access-code unlock ----
  // The buyer types a code you gave them after payment. For real security the
  // code MUST be validated OFF the static site: set `unlockEndpoint` to a tiny
  // serverless function (see docs/access-worker.js) that checks the code and
  // returns a short-lived SIGNED video URL. A pure client-side check is not
  // secure. Until the endpoint is live, `demoCode` unlocks the sample video
  // locally FOR TESTING ONLY — remove it before selling.
  unlockEndpoint: "", // e.g. "https://your-worker.workers.dev/unlock"

  // TESTING ONLY — deliberately dev-only so the demo code never ships in the
  // production bundle (where anyone could read it out of the JS).
  demoCode:
    process.env.NODE_ENV === "development" ? "MT-750-DEMO" : "",
};
