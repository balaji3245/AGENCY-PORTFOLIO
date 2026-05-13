"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/siteContent";

function ProjectCard({ project, index }: { project: SiteContent["portfolio"]["items"][0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this specific card's container
  // It starts when the card hits the top of the viewport (0)
  // It ends when the card's bottom hits the top of the viewport (1)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  // As the next card scrolls up, this card scales down and fades out
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Adjust top spacing so they stack nicely with a slight offset
  const topOffset = `calc(5vh + ${index * 20}px)`;

  return (
    <div ref={cardRef} className="h-screen w-full relative">
      <div className="sticky flex items-center justify-center h-screen w-full" style={{ top: topOffset }}>
        <motion.div 
          style={{ scale, opacity }}
          className={`w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 p-8 md:p-12 shadow-2xl relative`}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-10%" }}
        >
          {/* Subtle gradient overlay based on project color */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 pointer-events-none`} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <span className="text-xs font-medium uppercase tracking-widest text-white/50 mb-4 block">
              {project.category}
            </span>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h3>
            <p className="text-gray-300 font-light text-lg mb-8 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tech.map((tech: string, j: number) => (
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
            <div className="w-full h-full bg-[#111] flex items-center justify-center border border-white/5 relative overflow-hidden">
               {/* Abstract placeholder image effect */}
               <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} opacity-40 mix-blend-overlay scale-150 group-hover:scale-100 transition-transform duration-1000 ease-out`} />
               <div className="text-white/40 font-light text-sm uppercase tracking-widest relative z-20 mix-blend-difference">Project Preview</div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();

  return (
    <section ref={containerRef} id="work" className="relative bg-transparent py-20">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Selected Work</h2>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Recent Projects</h3>
      </div>

      <div className="relative z-10 px-4 md:px-12 pb-32">
        {content.portfolio.items.map((project, i) => (
          <ProjectCard 
            key={i} 
            project={project} 
            index={i} 
          />
        ))}
      </div>
    </section>
  );
}
