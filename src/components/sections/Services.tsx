"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowRight, CheckCircle2, ChevronRight, Rocket } from "lucide-react";

export default function Services() {
  const { content } = useSiteContent();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {content.services.items.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/services/${encodeURIComponent(service.title)}`} className="block h-full">
                <div className="h-full bg-[#0a0c12]/40 backdrop-blur-md border border-white/5 p-10 rounded-[2.5rem] transition-all duration-500 hover:border-[#7c66ff]/30 hover:bg-[#7c66ff]/5 relative overflow-hidden group/card flex flex-col">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7c66ff]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {/* Desktop Layout: Icon & Title side by side */}
                  <div className="flex items-start gap-6 mb-8 relative z-10">
                    <div className="w-16 h-16 rounded-full border border-[#7c66ff]/20 bg-[#7c66ff]/10 flex items-center justify-center text-[#7c66ff] group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-[0_0_20px_rgba(124,102,255,0.1)]">
                      <IconByName name={service.icon} size={28} />
                    </div>
                    <div className="flex-grow pt-2">
                      <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors">{service.title}</h4>
                      <p className="text-gray-400 font-light leading-relaxed text-sm line-clamp-2 md:line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    {/* Arrow for mobile reference design */}
                    <div className="md:hidden flex items-center justify-center h-full pt-6">
                      <ChevronRight size={20} className="text-[#7c66ff]" />
                    </div>
                  </div>

                  {/* Features List - Desktop only (matches design) */}
                  <div className="hidden md:block space-y-3.5 mb-10 pt-6 border-t border-white/5 relative z-10 flex-grow">
                    {service.features.map((feature, i) => (
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
        </div>

        {/* Bottom CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-20"
        >
          <div className="bg-gradient-to-r from-[#7c66ff]/15 to-[#0a0c12]/40 backdrop-blur-xl border border-[#7c66ff]/20 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden group">
            {/* Animated background element */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#7c66ff]/10 rounded-full blur-[80px] group-hover:bg-[#7c66ff]/15 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
              <div className="w-20 h-20 rounded-3xl bg-[#7c66ff]/10 border border-[#7c66ff]/20 flex items-center justify-center text-[#7c66ff] shadow-[0_0_30px_rgba(124,102,255,0.2)]">
                <Rocket size={36} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-3 tracking-tighter">Have a project in mind?</h3>
                <p className="text-gray-400 font-light text-lg">Let's discuss how we can help you achieve your goals.</p>
              </div>
            </div>

            <Link
              href="/#contact"
              className="px-10 py-5 rounded-2xl bg-[#7c66ff] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#6b55e6] hover:scale-105 hover:shadow-[0_0_30px_rgba(124,102,255,0.4)] transition-all duration-500 relative z-10 flex items-center gap-3"
            >
              Get In Touch
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
