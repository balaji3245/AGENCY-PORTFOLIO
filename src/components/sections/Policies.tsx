"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Policies() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { content } = useSiteContent();

  return (
    <section id="policies" className="py-12 bg-transparent">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">
          {content.policies.title}
        </h2>

        <div className="flex flex-col gap-4">
          {content.policies.items.map((policy, i) => (
            <div
              key={`${policy.title}-${i}`}
              className="border border-white/10 rounded-2xl overflow-hidden bg-white/5"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-lg">{policy.title}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
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
