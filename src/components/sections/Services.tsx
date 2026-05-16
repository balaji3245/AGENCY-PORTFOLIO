"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowRight, CheckCircle2, ChevronRight, Rocket } from "lucide-react";

export default function Services() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll 
    ? content.services.items 
    : content.services.items.slice(0, 6);

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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  <div className="h-full bg-[#0a0c12]/40 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 hover:border-[#7c66ff]/30 hover:bg-[#7c66ff]/5 relative overflow-hidden group/card flex flex-col">
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7c66ff]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon & Title Row */}
                    <div className="flex items-center md:items-start gap-4 md:gap-6 mb-4 md:mb-8 relative z-10">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#7c66ff]/20 bg-[#7c66ff]/10 flex items-center justify-center text-[#7c66ff] group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-[0_0_20px_rgba(124,102,255,0.1)]">
                        <IconByName name={service.icon} size={22} />
                      </div>
                      <div className="flex-grow pt-0 md:pt-2 overflow-hidden">
                        <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-3 tracking-tight group-hover:text-white transition-colors truncate md:whitespace-normal">{service.title}</h4>
                        <p className="hidden md:block text-gray-400 font-light leading-relaxed text-sm line-clamp-2 md:line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      {/* Arrow for mobile reference design */}
                      <div className="md:hidden flex items-center justify-center">
                        <ChevronRight size={18} className="text-[#7c66ff]" />
                      </div>
                    </div>

                    {/* Features List - Desktop only */}
                    <div className="hidden md:block space-y-3.5 mb-10 pt-6 border-t border-white/5 relative z-10 flex-grow">
                      {(service.features || []).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-[13px] text-gray-400 font-medium group-hover/feature:text-gray-300">
                          <CheckCircle2 size={16} className="text-[#7c66ff] shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Learn More link */}
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c66ff] relative z-10 group/link">
                      Learn More 
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        {content.services.items.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#7c66ff] hover:border-[#7c66ff] hover:text-white transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.2em] group"
            >
              {showAll ? "Show Less Services" : `View All Services (${content.services.items.length})`}
              <ArrowRight size={14} className={`inline-block ml-2 transition-transform duration-500 ${showAll ? "rotate-90" : ""}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
