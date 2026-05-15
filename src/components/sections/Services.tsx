"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Services() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll 
    ? content.services.items 
    : content.services.items.slice(0, 4);

  return (
    <section id="services" className="py-16 relative bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">{content.services.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              {content.services.title} <br />
              <span className="text-gray-500">{content.services.mutedTitle}</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm mt-6 md:mt-0 font-light">
            {content.services.description}
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: showAll ? 0 : index * 0.1 }}
                className="group glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-white/10" />
                
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                  <IconByName name={service.icon} />
                </div>
                
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {service.description}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                  <span>Explore Service</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="inline-block"
                  >
                    {">"}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {content.services.items.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
            >
              {showAll ? "Show Less" : `View All Services (${content.services.items.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
