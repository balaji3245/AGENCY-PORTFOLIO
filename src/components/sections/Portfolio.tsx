"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal movement based on the number of items
  // Total width = items * 100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(content.portfolio.items.length - 1) * 100}%`]);

  return (
    <section ref={targetRef} id="work" className="relative h-[400vh] bg-zinc-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 px-10 md:px-20">
          {content.portfolio.items.map((project, i) => (
            <div
              key={i}
              className="group relative h-[70vh] w-[85vw] md:w-[70vw] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm"
            >
              {/* Image Preview Area */}
              <div className="absolute inset-0 z-0">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 mix-blend-overlay`} />
                <div className="h-full w-full bg-[#050505] flex items-center justify-center">
                   <motion.div 
                     initial={{ scale: 1.2, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 0.1 }}
                     transition={{ duration: 1.5 }}
                     className="text-[20vw] font-black text-white pointer-events-none select-none uppercase"
                   >
                     {project.category.split(' ')[0]}
                   </motion.div>
                </div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full w-full p-8 md:p-16 flex flex-col justify-between">
                <div>
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] uppercase tracking-[0.3em] font-bold text-cyan-400 mb-6"
                  >
                    {project.category}
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl md:text-7xl font-bold tracking-tighter leading-none mb-6 max-w-3xl"
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 text-lg md:text-xl font-light max-w-xl leading-relaxed"
                  >
                    {project.description}
                  </motion.p>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-8 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-xs font-medium text-white/40 border-b border-white/10 pb-1">
                        {t}
                      </span>
                    ))}
                  </div>

                  <MagneticButton className="px-10 py-4 group/btn bg-white text-black rounded-full flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest">Case Study</span>
                    <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </MagneticButton>
                </div>
              </div>

              {/* Index Number */}
              <div className="absolute top-8 right-12 text-8xl font-black text-white/5 pointer-events-none">
                0{i + 1}
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="w-[20vw] shrink-0" />
        </motion.div>

        {/* Section Title - Pinned */}
        <div className="absolute top-12 left-10 md:left-20 z-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Featured Work</h2>
          <div className="h-[1px] w-20 bg-cyan-400/50" />
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-10 md:left-20 right-10 md:right-20 h-[1px] bg-white/10 z-20">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-full bg-cyan-400 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
