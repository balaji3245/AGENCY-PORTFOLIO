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
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all"
                      title="LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {member.artstation && (
                    <a
                      href={member.artstation}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:bg-[#13aff0] hover:text-white transition-all"
                      title="ArtStation"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M0 17.723l2.027 3.504 3.498-2.02 5.344 9.244L24 18.067l-2.022-3.504L10.871 20.91l-2.146-3.715 5.342-9.255L11.516 3.5l-3.499 6.06L5.343 0 0 17.723z"/>
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


