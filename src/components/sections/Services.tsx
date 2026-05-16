"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";
import { X, ArrowUpRight } from "lucide-react";

export default function Services() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const displayedServices = showAll 
    ? content.services.items 
    : content.services.items.slice(0, 4);

  const serviceProjects = useMemo(() => {
    if (!selectedService) return [];
    return content.portfolio.items.filter(item => item.category === selectedService);
  }, [selectedService, content.portfolio.items]);

  return (
    <section id="services" className="py-24 relative bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-6">{content.services.eyebrow}</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
              {content.services.title} <br />
              <span className="text-gray-500">{content.services.mutedTitle}</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm mt-8 md:mt-0 font-light text-lg leading-relaxed">
            {content.services.description}
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: showAll ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-card p-10 rounded-3xl relative overflow-hidden transition-all duration-700 hover:border-white/20 cursor-pointer"
                onClick={() => setSelectedService(service.title)}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[100px] -mr-10 -mt-10 transition-all duration-700 group-hover:bg-white/10" />
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700">
                  <IconByName name={service.icon} />
                </div>
                
                <h4 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed text-base mb-10">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-all duration-500">
                  <span>Explore Projects</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block"
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {content.services.items.length > 4 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              {showAll ? "Show Less" : `View All Services (${content.services.items.length})`}
            </button>
          </div>
        )}
      </div>

      {/* Project Explorer Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setSelectedService(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 md:p-12 flex items-center justify-between border-b border-white/5 bg-zinc-950/50 backdrop-blur-md z-20">
                <div>
                  <h5 className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold mb-2">Service Case Studies</h5>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{selectedService}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - Project Grid */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                {serviceProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceProjects.map((project, i) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-zinc-900 border border-white/5"
                      >
                        <div className="absolute inset-0 z-0">
                          {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-30"
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-30"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                          <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{project.title}</h4>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-6 font-light leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {project.tech.slice(0, 2).map((t, j) => (
                                <span key={j} className="text-[8px] uppercase tracking-widest px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-500 font-bold">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-3 rounded-full bg-white text-black hover:bg-cyan-400 transition-all duration-500 shadow-xl"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          </div>
                        </div>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`View ${project.title}`} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-600">
                      <X size={32} />
                    </div>
                    <h4 className="text-xl font-bold mb-2">No Projects Found</h4>
                    <p className="text-gray-500 max-w-xs mx-auto font-light">
                      We're currently updating our {selectedService} portfolio. Check back soon for new case studies!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
