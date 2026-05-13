"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();
  const hasHighlight = content.about.title.includes(content.about.highlightedWord);
  const titleParts = hasHighlight
    ? content.about.title.split(content.about.highlightedWord)
    : [content.about.title, ""];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="py-32 relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ opacity }} className="max-w-xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">{content.about.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
              {hasHighlight ? (
                <>
                  {titleParts[0]}
                  <span className="text-gradient">{content.about.highlightedWord}</span>
                  {titleParts[1]}
                </>
              ) : (
                content.about.title
              )}
            </h3>
            {content.about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-gray-400 text-lg font-light leading-relaxed ${index === content.about.paragraphs.length - 1 ? "mb-8" : "mb-6"}`}
              >
                {paragraph}
              </p>
            ))}
            
            <div className="flex gap-8">
              {content.about.stats.map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-3xl font-bold mb-2">{stat.value}</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative h-[600px] hidden lg:block">
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-0 right-0 w-64 h-80 rounded-2xl overflow-hidden glass border border-white/10"
            >
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#050505] p-6 flex flex-col justify-end">
                <div className="w-8 h-8 rounded-full bg-white/10 mb-4" />
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-2 w-16 bg-white/10 rounded" />
              </div>
            </motion.div>
            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-10 left-10 w-72 h-96 rounded-2xl overflow-hidden glass border border-white/10"
            >
               <div className="w-full h-full bg-gradient-to-tr from-[#1a1a1a] to-[#0f0f0f] p-6">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-white/5 rounded" />
                  <div className="h-4 w-5/6 bg-white/5 rounded" />
                  <div className="h-4 w-4/6 bg-white/5 rounded" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
