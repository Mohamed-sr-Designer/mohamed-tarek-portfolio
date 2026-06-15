import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Vision from "@/components/Vision";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mohamed Tarek — a Jr. Art Director based in Egypt. Experience, creative process, capabilities, toolkit and vision.",
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
