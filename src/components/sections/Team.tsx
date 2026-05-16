import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUpRight, Users } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Team() {
  const { content } = useSiteContent();
  const [showAll, setShowAll] = useState(false);

  const displayedMembers = showAll 
    ? content.team.members 
    : content.team.members.slice(0, 6);

  return (
    <section id="team" className="py-20 bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <Users size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{content.team.eyebrow}</span>
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{content.team.title}</h3>
          <p className="text-gray-400 font-light">{content.team.description}</p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedMembers.map((member, i) => (
              <motion.div
                key={`${member.name}-${member.role}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: showAll ? 0 : i * 0.05 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/20 flex flex-col"
              >
                {/* Top accent gradient bar */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${member.image} opacity-50 group-hover:opacity-100 transition-opacity`} />

                {/* Serial number */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-6 block">
                  Team Member {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name */}
                <h4 className="mb-2 text-2xl font-bold tracking-tight group-hover:text-white transition-colors">{member.name}</h4>

                {/* Role badge */}
                {member.role && (
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-blue-400 border border-blue-500/20">
                      {member.role}
                    </span>
                  </div>
                )}

                {/* Intro */}
                <p className="mb-8 text-sm leading-relaxed text-gray-400 font-light flex-grow">
                  {member.intro || member.role}
                </p>

                {/* Skills */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-6">
                  {member.skills && member.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, sIndex) => (
                        <span key={sIndex} className="px-3 py-1 text-[9px] uppercase tracking-wider font-bold bg-white/5 border border-white/10 rounded-lg text-gray-500 group-hover:text-gray-300 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action buttons row — Email, GitHub, Portfolio */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all"
                        aria-label="Email"
                        title="Email"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
                        aria-label="GitHub"
                        title="GitHub"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                    )}
                    {member.portfolio && (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all"
                        aria-label="Portfolio"
                        title="Portfolio"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {content.team.members.length > 6 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
            >
              {showAll ? "Show Core Team" : `View All Team (${content.team.members.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

