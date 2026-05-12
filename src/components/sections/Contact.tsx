"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Let's Talk</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Start a <br />
              <span className="text-gradient">Project.</span>
            </h3>
            <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
              Ready to elevate your digital presence? Reach out to us, and let's build something extraordinary together.
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@elevate.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-xl font-light">hello@elevate.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-xl font-light">+91 98765 43210</span>
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl"
          >
            <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <MagneticButton className="self-start mt-4 py-4 px-8">
                Send Message <Send size={16} />
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
