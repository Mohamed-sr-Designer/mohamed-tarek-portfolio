import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import HireCta from "@/components/HireCta";
import Motion from "@/components/Motion";
import WebProjects from "@/components/WebProjects";
import LoopSlider from "@/components/LoopSlider";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <LogoMarquee />
      <SelectedWork />
      <Services />
      <Motion />
      <WebProjects />
      <LoopSlider />
      <HireCta />
    </SiteShell>
  );
}
