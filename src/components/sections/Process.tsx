"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Process() {
  const { content } = useSiteContent();

  return (
    <section id="process" className="py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            How we work
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Our proven process.
          </h3>
        </div>

        <div className="max-w-4xl mx-auto">
          {content.process.map((step, i) => (
            <motion.div
              key={`${step.num}-${step.title}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex gap-6 md:gap-10 items-start relative group mb-10 last:mb-0"
            >
              {i !== content.process.length - 1 && (
                <div className="absolute left-6 md:left-10 top-16 bottom-[-64px] w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
              )}

              <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-base md:text-xl font-bold text-white/50 group-hover:text-white group-hover:border-white transition-all duration-500 bg-transparent relative z-10">
                {step.num}
              </div>

              <div className="pt-2 md:pt-4">
                <h4 className="text-lg md:text-xl font-bold mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-400 font-light text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
