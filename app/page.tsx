import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import VisualIndex from "@/components/VisualIndex";
import SelectedWork from "@/components/SelectedWork";
import Logos from "@/components/Logos";
import Motion from "@/components/Motion";
import About from "@/components/About";
import Clients from "@/components/Clients";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Skills from "@/components/Skills";
import Tools from "@/components/Tools";
import Vision from "@/components/Vision";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <VisualIndex />
        <SelectedWork />
        <Logos />
        <Motion />
        <About />
        <Clients />
        <Experience />
        <Process />
        <Skills />
        <Tools />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
