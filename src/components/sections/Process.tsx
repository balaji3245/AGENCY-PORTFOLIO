"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, business goals, and technical requirements." },
  { num: "02", title: "Strategy", desc: "Architecting the perfect tech stack and designing user journeys." },
  { num: "03", title: "Design", desc: "Creating high-fidelity, visually stunning UI/UX prototypes." },
  { num: "04", title: "Development", desc: "Engineering the solution with clean, scalable code and fluid animations." },
  { num: "05", title: "Launch", desc: "Rigorous testing and a seamless deployment to production." },
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
           <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">How we work</h2>
           <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Our proven process.</h3>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex gap-8 md:gap-16 items-start relative group mb-16 last:mb-0"
            >
              {/* Connecting line */}
              {i !== steps.length - 1 && (
                <div className="absolute left-6 md:left-10 top-16 bottom-[-64px] w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
              )}
              
              <div className="w-12 h-12 md:w-20 md:h-20 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-xl md:text-3xl font-bold text-white/50 group-hover:text-white group-hover:border-white transition-all duration-500 bg-[#050505] relative z-10">
                {step.num}
              </div>
              
              <div className="pt-2 md:pt-4">
                <h4 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h4>
                <p className="text-gray-400 font-light text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
