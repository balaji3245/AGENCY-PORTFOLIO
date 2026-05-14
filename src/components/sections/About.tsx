"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

const PILLARS = [
  { num: "01", title: "Strategy First", body: "Every project starts with understanding your business goals, users, and competitive landscape." },
  { num: "02", title: "Design with Intent", body: "Interfaces that guide users toward action — beautiful, but always conversion-focused." },
  { num: "03", title: "Built to Scale", body: "Clean modern code. Fast load times. Architecture that grows with your business." },
];

const PROOF = [
  "Direct access to senior developers — no account managers",
  "Pixel-perfect Figma-to-code execution",
  "Performance-first engineering: 90+ Lighthouse scores",
  "Post-launch support and iterative improvements",
  "Delivered on time, within agreed scope",
];

export default function About() {
  const { content } = useSiteContent();

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Top label + heading */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-20 mb-24">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-5 block">{content.about.eyebrow}</span>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-balance">
              Not just websites.<br />
              <span className="text-gradient-white">Digital growth engines.</span>
            </h2>
          </motion.div>

          <motion.p
            className="md:max-w-sm text-[#71717a] font-light leading-relaxed text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.about.paragraphs[0]}
          </motion.p>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 mb-24">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              className="bg-[#080808] p-10 group hover:bg-[#0d0d0d] transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-xs text-[#3b82f6] font-bold tracking-widest mb-6">{p.num}</span>
              <h3 className="font-display text-xl font-bold text-white mb-4 tracking-tight">{p.title}</h3>
              <p className="text-[#52525b] font-light text-sm leading-relaxed group-hover:text-[#71717a] transition-colors duration-300">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Proof list + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-6 block">Why YJ Developers</span>
            <ul className="space-y-4">
              {PROOF.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#a1a1aa]">
                  <CheckCircle2 size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-px bg-white/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {content.about.stats.map((s, i) => (
              <div key={i} className="bg-[#080808] p-10">
                <div className="font-display text-5xl font-black text-white tracking-tight mb-2">{s.value}</div>
                <div className="text-xs text-[#52525b] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
            <div className="bg-[#080808] p-10">
              <div className="font-display text-5xl font-black text-white tracking-tight mb-2">100%</div>
              <div className="text-xs text-[#52525b] uppercase tracking-widest">On-time Delivery</div>
            </div>
            <div className="bg-[#0a0f1e] p-10 flex flex-col justify-between">
              <span className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-4">Our Promise</span>
              <p className="text-sm text-[#a1a1aa] leading-relaxed font-light">
                World-class digital craft. Accessible to every ambitious brand.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
