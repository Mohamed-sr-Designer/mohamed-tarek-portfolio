import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWork from "@/components/SelectedWork";
import Campaigns from "@/components/Campaigns";
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
      <Campaigns />
      <Motion />
      <WebProjects />
      <Clients />
      <SocialWall />
    </SiteShell>
  );
}
