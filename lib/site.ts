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
