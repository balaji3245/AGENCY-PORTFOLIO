"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "Business Websites",
    tag: "Most Popular",
    body: "Conversion-focused, fast, and beautifully designed business websites that work as your best salesperson — 24/7.",
    highlights: ["Custom design", "SEO-ready", "Mobile-first", "CMS integration"],
  },
  {
    num: "02",
    title: "Ecommerce Stores",
    tag: "High ROI",
    body: "Scalable online stores with seamless checkout flows, inventory management, and performance optimization to maximize every sale.",
    highlights: ["Shopify / Next.js", "Payment gateway", "Product management", "Analytics"],
  },
  {
    num: "03",
    title: "Landing Pages",
    tag: "Fast Delivery",
    body: "High-converting landing pages designed around your specific campaign goal — whether it's leads, sign-ups, or sales.",
    highlights: ["A/B test ready", "Speed optimized", "CRO-focused", "2-week delivery"],
  },
  {
    num: "04",
    title: "Web Applications",
    tag: "Enterprise",
    body: "Full-stack web apps with complex logic, user authentication, dashboards, and scalable backend infrastructure.",
    highlights: ["Next.js + Node", "Auth & roles", "Database design", "API development"],
  },
  {
    num: "05",
    title: "Website Redesign",
    tag: "Transformation",
    body: "Turn your outdated website into a modern, high-performing digital asset that accurately reflects your brand's quality.",
    highlights: ["Visual audit", "UX overhaul", "Performance lift", "Content migration"],
  },
  {
    num: "06",
    title: "SEO & Growth",
    tag: "Long-term",
    body: "Technical SEO, on-page optimization, and content strategy to build lasting organic traffic and sustainable growth.",
    highlights: ["Technical SEO", "Content strategy", "Core Web Vitals", "Monthly reports"],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="section-pad relative">
      {/* Ambient */}
      <div className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-5 block">What We Do</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.0]">
              Services built<br />
              <span className="text-gradient-white">for growth.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/start-project" className="btn-outline group">
              Start a Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Service list */}
        <div>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              className="service-item cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <div className="flex items-start gap-6 md:gap-12">
                <span className="text-[#3b3b3b] text-xs font-bold tracking-widest pt-1 flex-shrink-0 w-8">{s.num}</span>

                <div className="flex-1 flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-1 flex-wrap">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">{s.title}</h3>
                      <span className="tag">{s.tag}</span>
                    </div>

                    <AnimatePresence>
                      {activeIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-[#71717a] text-sm leading-relaxed mt-4 max-w-xl font-light">
                            {s.body}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {s.highlights.map((h) => (
                              <span key={h} className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md text-[#a1a1aa]">
                                {h}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{ rotate: activeIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#52525b]">
                      <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
