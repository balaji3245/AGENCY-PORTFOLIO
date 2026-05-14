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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project, i) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5"
              >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* Compact Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold mb-2 block">
                      {project.category}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.tech.slice(0, 2).map((t, j) => (
                        <span key={j} className="text-[8px] uppercase tracking-wider text-gray-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                
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
