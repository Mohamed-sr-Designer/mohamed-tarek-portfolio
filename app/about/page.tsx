import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Vision from "@/components/Vision";

export const metadata: Metadata = {
  title: "About — Graphic Designer & Art Director",
  description:
    "About Mohamed Tarek — graphic designer and art director (Team Lead) based in Egypt, working across Egypt, Saudi Arabia and Kuwait. Experience, creative process, capabilities, toolkit and vision.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell pad>
      <About />
      <Experience />
      <Process />
      <Skills />
      <Tools />
      <Vision />
    </SiteShell>
  );
}
