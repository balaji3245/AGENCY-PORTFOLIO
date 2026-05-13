"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState("All");

  // Get unique categories from items
  const categories = useMemo(() => {
    const cats = ["All"];
    content.portfolio.items.forEach(item => {
      if (!cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, [content.portfolio.items]);

  const filteredItems = useMemo(() => {
    if (activeTab === "All") return content.portfolio.items;
    return content.portfolio.items.filter(item => item.category === activeTab);
  }, [activeTab, content.portfolio.items]);

  return (
    <section id="work" className="py-32 bg-zinc-950">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected <span className="text-gray-500">Works</span></h3>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === cat 
                    ? "bg-white text-black border-white" 
                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, i) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
              >
                {/* Background Visual */}
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 mix-blend-overlay group-hover:opacity-60 transition-opacity duration-700`} />
                  <div className="h-full w-full bg-[#080808] flex items-center justify-center">
                    <span className="text-[10vw] font-black text-white/5 uppercase select-none group-hover:scale-110 transition-transform duration-1000">
                      {project.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-4 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-cyan-400">
                      {project.category}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-xs text-gray-500 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Click Overlay */}
                <a href="#" className="absolute inset-0 z-20" aria-label={`View ${project.title}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 text-center">
          <MagneticButton className="px-12 py-5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-sm font-bold uppercase tracking-widest">
            View All Projects
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
