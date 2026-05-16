"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowUpRight } from "lucide-react";

export default function Services() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll 
    ? content.services.items 
    : content.services.items.slice(0, 4);

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
              <Link 
                key={service.title} 
                href={`/services/${encodeURIComponent(service.title)}`}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: showAll ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group glass-card p-10 rounded-3xl relative overflow-hidden transition-all duration-700 hover:border-white/20 h-full"
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
                    <span>Explore Service</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block"
                    >
                      <ArrowUpRight size={16} />
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
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
    </section>
  );
}
