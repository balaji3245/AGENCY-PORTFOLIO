"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const policies = [
  {
    title: "Payment Terms",
    content: "We require a 50% upfront deposit to commence work, with the remaining 50% due upon project completion and before the final handover or deployment. We accept bank transfers and major credit cards.",
  },
  {
    title: "Delivery Policy",
    content: "Project timelines are established during the initial strategy phase. Standard landing pages take 1-2 weeks, while full web applications can take 4-12 weeks depending on complexity. All deliverables are subject to client review.",
  },
  {
    title: "Revision Limits",
    content: "Each project phase includes up to two rounds of major revisions. Additional revisions may incur an hourly rate charge. We ensure you are fully satisfied with the design before moving to development.",
  },
  {
    title: "Refund Policy",
    content: "The initial 50% deposit is non-refundable once work has commenced. If a project is cancelled midway, any completed work will be handed over to the client.",
  }
];

export default function Policies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Our Policies</h2>
        
        <div className="flex flex-col gap-4">
          {policies.map((policy, i) => (
            <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-lg">{policy.title}</span>
                <ChevronDown 
                  className={`transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 font-light leading-relaxed">
                      {policy.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
