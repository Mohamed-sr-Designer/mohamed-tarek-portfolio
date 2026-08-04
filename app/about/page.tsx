import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import AboutHero from "@/components/AboutHero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Vision from "@/components/Vision";
import HireCta from "@/components/HireCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Sr Designer, Team Lead",
  description:
    "About Mohamed Tarek — Sr Designer and Team Lead based in Egypt, working across Egypt, Saudi Arabia and Kuwait. Experience, creative process, capabilities, toolkit and vision.",
  alternates: { canonical: "/about" },
};

// Profile structured data — helps search and AI assistants read the page
// as a person's professional profile.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${site.url}/about`,
  mainEntity: { "@id": `${site.url}/#person` },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AboutHero />
      <About />
      <Experience />
      <Teaching />
      <Process />
      <Skills />
      <Tools />
      <Vision />
      <HireCta />
    </SiteShell>
  );
}
