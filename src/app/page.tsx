import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Portfolio from "@/components/sections/Portfolio";
import Stats from "@/components/sections/Stats";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Industries from "@/components/sections/Industries";
import Contact from "@/components/sections/Contact";
import Policies from "@/components/sections/Policies";
import Vision from "@/components/sections/Vision";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Portfolio />
      <Stats />
      <Team />
      <Testimonials />
      <Process />
      <Industries />
      <Contact />
      <Policies />
      <Vision />
      <Footer />
    </main>
  );
}
