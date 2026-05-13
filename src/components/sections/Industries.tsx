"use client";

import { motion } from "framer-motion";
import IconByName from "@/components/IconByName";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Industries() {
  const { content } = useSiteContent();

  return (
    <section className="py-20 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-12">
          Industries We Serve
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-4">
          {content.industries.map((ind, i) => (
            <motion.div
              key={`${ind.name}-${ind.icon}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="text-white/50">
                <IconByName name={ind.icon} />
              </div>
              <span className="text-sm font-medium">{ind.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
