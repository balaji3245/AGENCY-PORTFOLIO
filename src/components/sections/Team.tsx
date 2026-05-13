"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Team() {
  const { content } = useSiteContent();

  return (
    <section id="team" className="py-32 bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">{content.team.eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{content.team.title}</h3>
          <p className="text-gray-400 font-light">{content.team.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.team.members.map((member, i) => (
            <motion.div
              key={`${member.name}-${member.role}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${member.image}`} />
              <div className="mb-10 flex items-start justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-gray-600 transition-colors group-hover:text-white"
                  aria-hidden="true"
                />
              </div>
              <h4 className="mb-3 text-xl font-semibold tracking-tight">{member.name}</h4>
              <p className="text-sm leading-6 text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
