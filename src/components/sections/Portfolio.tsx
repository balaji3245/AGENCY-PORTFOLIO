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
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter">Selected <span className="text-gray-500">Works</span></h3>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${
                  activeTab === cat 
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                    : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
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
                className="group relative aspect-[4/5] md:aspect-[16/11] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 shadow-2xl"
              >
                {/* Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="px-5 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-[10px] uppercase tracking-widest font-bold text-white">
                      {project.category}
                    </span>
                    <div className="w-14 h-14 rounded-full border border-white/20 bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 group-hover:rotate-0 scale-75 group-hover:scale-100">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>

                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h4 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                      {project.title}
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {project.tech.map((t, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] text-gray-200 border border-white/10 uppercase tracking-wider">
                          {t}
                        </span>
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
