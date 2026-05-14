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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, i) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl ${
                  i === 0 || i === 3 ? "md:col-span-2 aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/5] md:aspect-[1/1]"
                }`}
              >
                {/* Image Container */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-end">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-[9px] uppercase tracking-[0.2em] font-bold text-white">
                          {project.category}
                        </span>
                        {project.tech.slice(0, 2).map((t, j) => (
                          <span key={j} className="px-4 py-1 rounded-full border border-white/5 bg-black/20 backdrop-blur-md text-[9px] uppercase tracking-[0.2em] font-medium text-gray-400">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <h4 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4 leading-tight">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 text-base md:text-lg max-w-xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/20 bg-white text-black flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-700 ease-[0.16,1,0.3,1] scale-75 group-hover:scale-100 shadow-xl">
                        <ArrowUpRight size={28} />
                      </div>
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
