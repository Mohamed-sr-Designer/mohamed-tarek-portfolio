import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SelectedWork from "@/components/SelectedWork";
import Clients from "@/components/Clients";
import SocialWall from "@/components/SocialWall";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <SelectedWork limit={3} />
      <Clients />
      <SocialWall />
    </SiteShell>
  );
}
