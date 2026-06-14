export const site = {
  name: "Mohamed Tarek",
  role: "Jr. Art Director",
  title: "Mohamed Tarek — Jr. Art Director",
  description:
    "Mohamed Tarek is a Jr. Art Director based in Egypt, working across the Egyptian, Saudi and Kuwaiti markets — building brands, campaigns and visual systems that connect business goals with human attention.",
  url: "https://mohamedtarek.design",
  email: "mohamed.tarek.ahmed1@gmail.com",
  phoneDisplay: "+20 10 1145 8929",
  phone: "+201011458929",
  whatsappDisplay: "+20 122 874 8098",
  whatsapp: "201228748098",
  linkedin: "https://www.linkedin.com/in/mohamedrk/",
  linkedinHandle: "/in/mohamedrk",
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
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
