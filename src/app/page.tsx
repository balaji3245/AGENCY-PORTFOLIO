import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Policies from "@/components/sections/Policies";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Team />
      <Testimonials />
      <Process />
      <Contact />
      <Policies />
      <Footer />
    </main>
  );
}
