"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    description: "A highly complex, data-heavy dashboard for a modern financial institution featuring real-time analytics and a dark-mode first design system.",
    tech: ["Next.js", "Tailwind", "D3.js", "WebSockets"],
    color: "from-blue-900/40 to-black",
  },
  {
    title: "Aura E-Commerce",
    category: "Headless Shopify",
    description: "A premium headless e-commerce experience for a luxury fashion brand. Features seamless page transitions, 3D product viewers, and sub-second load times.",
    tech: ["React", "Shopify Storefront API", "Framer Motion"],
    color: "from-orange-900/40 to-black",
  },
  {
    title: "Nexus Architecture",
    category: "Corporate Website",
    description: "An award-winning portfolio website for a top-tier architecture firm, emphasizing large typography, smooth scrolling, and cinematic image reveals.",
    tech: ["Next.js", "GSAP", "Lenis", "Three.js"],
    color: "from-zinc-800/40 to-black",
  }
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="work" className="relative bg-[#050505]">
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen w-full flex items-center pt-20 pointer-events-none z-0">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-[10vw] font-bold tracking-tighter opacity-5 uppercase">
            Selected Work
          </h2>
        </div>
      </div>

      <div className="relative z-10 -mt-[80vh]">
        {projects.map((project, i) => {
          return (
            <div key={i} className="min-h-screen flex items-center justify-center py-20 sticky top-0">
              <motion.div 
                className={`w-full max-w-6xl rounded-3xl overflow-hidden glass-card border border-white/10 bg-gradient-to-br ${project.color} p-8 md:p-12 shadow-2xl backdrop-blur-3xl`}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-20%" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="order-2 lg:order-1">
                    <span className="text-xs font-medium uppercase tracking-widest text-white/50 mb-4 block">
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h3>
                    <p className="text-gray-300 font-light text-lg mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tech.map((tech, j) => (
                        <span key={j} className="px-4 py-1.5 rounded-full border border-white/10 text-xs font-medium bg-white/5 backdrop-blur-sm text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <MagneticButton variant="secondary" className="px-8 py-3 text-sm">
                      View Case Study
                    </MagneticButton>
                  </div>

                  <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* Placeholder for project image */}
                    <div className="w-full h-full bg-[#111] flex items-center justify-center border border-white/5">
                       <div className="text-white/20 font-light text-sm uppercase tracking-widest">Project Preview</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
