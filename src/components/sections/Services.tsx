"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function Services() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll 
    ? content.services.items 
    : content.services.items.slice(0, 4);

  return (
    <section id="services" className="py-32 relative bg-transparent overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#7c66ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#7c66ff]/30 bg-[#7c66ff]/10 text-[#7c66ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(124,102,255,0.15)]"
          >
            Our Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8"
          >
            Solutions We <span className="text-[#7c66ff]">Deliver</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto font-light text-lg"
          >
            We provide end-to-end digital solutions that help businesses grow, scale and succeed in the digital world.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: showAll ? 0 : index * 0.1 }}
                className="group"
              >
                <Link href={`/services/${encodeURIComponent(service.title)}`} className="block h-full">
                  <div className="h-full bg-[#0a0c12]/30 backdrop-blur-md border border-white/[0.06] p-6 md:p-8 rounded-[2rem] transition-all duration-500 hover:border-[#7c66ff]/40 hover:bg-[#7c66ff]/[0.03] hover:shadow-[0_30px_60px_rgba(124,102,255,0.08)] relative overflow-hidden group/card flex flex-col justify-between min-h-[320px]">
                    {/* Subtle hover gradient */}
                    <div className="absolute -inset-px bg-gradient-to-br from-[#7c66ff]/15 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                    
                    <div>
                      {/* Icon & Arrow Link Row */}
                      <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="w-12 h-12 rounded-2xl border border-[#7c66ff]/20 bg-[#7c66ff]/10 flex items-center justify-center text-[#7c66ff] group-hover/card:scale-110 group-hover/card:border-[#7c66ff]/40 transition-all duration-500 shadow-[0_0_20px_rgba(124,102,255,0.05)]">
                          <IconByName name={service.icon} size={20} />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.03] flex items-center justify-center text-gray-500 group-hover/card:text-white group-hover/card:border-[#7c66ff]/30 group-hover/card:bg-[#7c66ff]/10 group-hover/card:rotate-45 transition-all duration-500">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div className="relative z-10 mb-6">
                        <h4 className="text-xl font-bold mb-3 tracking-tight group-hover/card:text-[#7c66ff] transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-gray-400 font-light leading-relaxed text-sm line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05] relative z-10 mt-auto">
                      {(service.features || []).slice(0, 3).map((feature, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-500 group-hover/card:text-gray-300 group-hover/card:border-white/10 transition-colors duration-500"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {content.services.items.length > 4 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#7c66ff] hover:border-[#7c66ff] hover:text-white transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em] group"
            >
              {showAll ? "Show Less Services" : `View All Services (${content.services.items.length})`}
              <ChevronRight size={14} className={`inline-block ml-2 transition-transform duration-500 ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
