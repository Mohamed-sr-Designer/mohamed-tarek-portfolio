import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import AiWorkflow from "@/components/AiWorkflow";
import MasterVisuals from "@/components/MasterVisuals";
import SocialCards from "@/components/SocialCards";
import Motion from "@/components/Motion";
import WebProjects from "@/components/WebProjects";
import LoopSlider from "@/components/LoopSlider";
import Services from "@/components/Services";
import HireCta from "@/components/HireCta";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <LogoMarquee />
      <AiWorkflow />
      <MasterVisuals />
      <SocialCards />
      <Motion />
      <WebProjects />
      <LoopSlider />
      <Services />
      <HireCta />
    </SiteShell>
  );
}
