"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 flex flex-col"
            >
              {/* Top accent gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${member.image}`} />

              {/* Serial number */}
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5 block">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <h4 className="mb-1 text-xl font-semibold tracking-tight">{member.name}</h4>

              {/* Role badge */}
              {member.role && (
                <span className="inline-block mb-3 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-white/10 text-cyan-300 border border-cyan-400/20">
                  {member.role}
                </span>
              )}

              {/* Intro */}
              <p className="mb-4 text-sm leading-6 text-gray-400 flex-grow">
                {member.intro || member.role}
              </p>

              {/* Skills */}
              <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium bg-white/5 border border-white/10 rounded-full text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons row — Email, GitHub, Portfolio */}
                <div className="flex items-center gap-2 flex-wrap">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={12} />
                      Email
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label="GitHub"
                    >
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {member.portfolio && (
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label="Portfolio"
                    >
                      <ArrowUpRight size={12} />
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
