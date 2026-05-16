"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, Users } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Team() {
  const { content } = useSiteContent();

  return (
    <section id="team" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <Users size={12} className="text-blue-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{content.team.eyebrow}</span>
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{content.team.title}</h3>
          <p className="text-gray-400 text-sm font-light">{content.team.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {content.team.members.map((member, i) => (
            <motion.div
              key={`${member.name}-${member.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 flex flex-col"
            >
              {/* Top accent gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${member.image} opacity-30 group-hover:opacity-100 transition-opacity`} />

              {/* Name & Role */}
              <div className="mb-4">
                <h4 className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors truncate">{member.name}</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500/80 mt-1">{member.role}</p>
              </div>

              {/* Intro (Simplified) */}
              <p className="mb-6 text-xs leading-relaxed text-gray-500 line-clamp-3 group-hover:text-gray-400 transition-colors">
                {member.intro || member.role}
              </p>

              {/* Action buttons row — Email, GitHub, Portfolio */}
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:bg-blue-500 hover:text-white transition-all"
                      title="Email"
                    >
                      <Mail size={12} />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:bg-white hover:text-black transition-all"
                      title="GitHub"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                  )}
                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:bg-white hover:text-black transition-all"
                      title="Portfolio"
                    >
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
                
                <span className="text-[9px] font-bold text-gray-700 group-hover:text-gray-500 transition-colors uppercase">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


