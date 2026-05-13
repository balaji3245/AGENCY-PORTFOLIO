"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function TechStack() {
  const { content } = useSiteContent();

  return (
    <section className="py-20 bg-[#050505] overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">
          {content.techStack.eyebrow}
        </h2>
      </div>

      <div className="relative w-full flex overflow-x-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-8 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...content.techStack.items, ...content.techStack.items].map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center"
            >
              <span className="text-gray-300 font-medium tracking-wide">
                {tech}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
