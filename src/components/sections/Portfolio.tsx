"use client";

import Image from "next/image";
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
    <section id="work" className="py-16 bg-transparent">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                className="group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-zinc-900 border border-white/5 shadow-2xl"
              >
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    />
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      quality={70}
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-1 block">
                      {project.category}
                    </span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tighter">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-2 mb-4 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-1.5">
                      {project.tech.slice(0, 2).map((t, j) => (
                        <span key={j} className="text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-500">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors duration-300"
                    >
                      View <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
                
                {/* Click Overlay (Only if button is not clicked) */}
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0" aria-label={`View ${project.title}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <MagneticButton className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold uppercase tracking-widest">
            View All Projects
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
