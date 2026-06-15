import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mohamed Tarek — open to Art Direction roles, freelance projects and collaborations across Egypt, Saudi Arabia and Kuwait.",
};

export default function ContactPage() {
  return (
    <SiteShell pad>
      <Contact />
    </SiteShell>
  );
}
