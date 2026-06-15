import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import SelectedWork from "@/components/SelectedWork";
import Campaigns from "@/components/Campaigns";
import Logos from "@/components/Logos";
import Motion from "@/components/Motion";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Mohamed Tarek — branding, campaigns, logos and motion across the Egyptian, Saudi and Kuwaiti markets.",
};

export default function WorkPage() {
  return (
    <SiteShell pad>
      <SelectedWork />
      <Campaigns />
      <Logos />
      <Motion />
    </SiteShell>
  );
}
