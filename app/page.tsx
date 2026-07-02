import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import HireCta from "@/components/HireCta";
import Motion from "@/components/Motion";
import WebProjects from "@/components/WebProjects";
import Clients from "@/components/Clients";
import SocialWall from "@/components/SocialWall";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <SelectedWork />
      <Services />
      <Motion />
      <WebProjects />
      <Clients />
      <SocialWall />
      <HireCta />
    </SiteShell>
  );
}
