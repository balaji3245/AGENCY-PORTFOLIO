"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Process() {
  const { content } = useSiteContent();

  return (
    <section id="process" className="section-pad relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow mb-5 block">How We Work</span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.0]">
            Our proven <br />
            <span className="text-gradient-white">process.</span>
          </h2>
        </motion.div>

        {/* Steps — full width horizontal timeline on desktop */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="hidden md:block absolute top-[3.25rem] left-0 right-0 h-px bg-white/5" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-px bg-transparent md:bg-white/5">
            {content.process.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative bg-[#080808] p-8 md:p-10 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Step number with dot */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 rounded-full border-2 border-[#222] group-hover:border-blue-400 transition-colors duration-300 flex-shrink-0 bg-[#080808] relative z-10" />
                  <span className="text-[10px] font-bold text-[#3b3b3b] tracking-[0.2em]">{step.num}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-white tracking-tight mb-3 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#52525b] leading-relaxed font-light group-hover:text-[#71717a] transition-colors duration-300">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
