"use client";

import { motion } from "framer-motion";
import { Globe, Mail, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Team() {
  const { content } = useSiteContent();

  return (
    <section id="team" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">{content.team.eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{content.team.title}</h3>
          <p className="text-gray-400 font-light">{content.team.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.team.members.map((member, i) => (
            <motion.div
              key={`${member.name}-${member.role}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <div className={`w-full aspect-[3/4] bg-gradient-to-br ${member.image} rounded-2xl mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700`}>
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-white/20">
                  {member.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-4">
                  <a href="#" aria-label="Message" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><MessageCircle size={18} /></a>
                  <a href="#" aria-label="Portfolio" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><Globe size={18} /></a>
                  <a href="#" aria-label="Email" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"><Mail size={18} /></a>
                </div>
              </div>
              <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
              <p className="text-sm text-gray-500 uppercase tracking-wider">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
