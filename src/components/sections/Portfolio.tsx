"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Portfolio() {
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All"];
    content.portfolio.items.forEach((item) => {
      if (!cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, [content.portfolio.items]);

  const filtered = useMemo(() => {
    if (activeTab === "All") return content.portfolio.items;
    return content.portfolio.items.filter((i) => i.category === activeTab);
  }, [activeTab, content.portfolio.items]);

  return (
    <section id="work" className="section-pad">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-5 block">Selected Work</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.0]">
              Case Studies
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border ${
                  activeTab === cat
                    ? "bg-white text-black border-white"
                    : "border-white/10 text-[#52525b] hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#080808] overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/11] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
                </div>

                {/* Content below image */}
                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#52525b] font-light leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, j) => (
                          <span key={j} className="text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-white/5 rounded-md text-[#71717a]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={(project as {link?: string}).link ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#52525b] hover:bg-white hover:text-black hover:border-white transition-all duration-300 -rotate-45 hover:rotate-0"
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
