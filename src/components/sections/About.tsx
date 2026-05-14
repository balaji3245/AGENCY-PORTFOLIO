"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";
import { CheckCircle2, Zap, Users, Globe } from "lucide-react";

const VALUES = [
  {
    icon: <Zap size={18} className="text-cyan-400" />,
    title: "Speed Without Compromise",
    desc: "We ship fast, but never cut corners on quality or design.",
  },
  {
    icon: <CheckCircle2 size={18} className="text-fuchsia-400" />,
    title: "Transparent Process",
    desc: "You see every step. No black boxes, no surprise invoices.",
  },
  {
    icon: <Users size={18} className="text-amber-400" />,
    title: "Dedicated Team",
    desc: "A focused team that treats your brand like it's their own.",
  },
  {
    icon: <Globe size={18} className="text-emerald-400" />,
    title: "Global Standards",
    desc: "World-class design and engineering, priced for growing brands.",
  },
];

const WHY_US = [
  "Full-stack: strategy → design → development",
  "Clean, modern code that scales with you",
  "Direct communication — no account managers",
  "Post-launch support and improvement cycles",
  "Delivered on time, every time",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { content } = useSiteContent();

  const hasHighlight = content.about.title.includes(content.about.highlightedWord);
  const titleParts = hasHighlight
    ? content.about.title.split(content.about.highlightedWord)
    : [content.about.title, ""];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} id="about" className="py-20 relative z-10 bg-transparent overflow-hidden">
      {/* Background accent */}
      <div className="absolute -left-40 top-1/3 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            {content.about.eyebrow}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
            {hasHighlight ? (
              <>
                {titleParts[0]}
                <span className="text-gradient">{content.about.highlightedWord}</span>
                {titleParts[1]}
              </>
            ) : (
              content.about.title
            )}
          </h3>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — text + why us */}
          <motion.div style={{ opacity }} className="space-y-8">
            {content.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-400 text-sm font-light leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {/* Why us checklist */}
            <div className="space-y-3 pt-2">
              {WHY_US.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center">
                    <CheckCircle2 size={11} className="text-cyan-400" />
                  </span>
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-white/5">
              {content.about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
              {/* Extra static stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-2xl font-bold text-white mb-1">100%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">On-time Delivery</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-2xl font-bold text-white mb-1">2022</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Founded</p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — values cards */}
          <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="font-semibold text-white mb-2 text-sm leading-snug">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}

            {/* Bottom CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sm:col-span-2 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent p-6"
            >
              <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Our Mission</p>
              <p className="text-white font-medium leading-relaxed">
                To make world-class digital design accessible to every ambitious brand — not just Fortune 500 companies.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
