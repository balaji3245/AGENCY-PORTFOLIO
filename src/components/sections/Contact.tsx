"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const { content } = useSiteContent();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Project inquiry from ${name || "website"}`);
    const body = encodeURIComponent(
      [`Name: ${name}`, `Email: ${email}`, "", message].join("\n")
    );

    window.location.href = `mailto:${content.brand.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
              {content.contact.eyebrow}
            </h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              {content.contact.title} <br />
              <span className="text-gradient">{content.contact.highlight}</span>
            </h3>
            <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
              {content.contact.description}
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${content.brand.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-xl font-light">{content.brand.email}</span>
              </a>
              <a
                href={`tel:${content.brand.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-xl font-light">{content.brand.phone}</span>
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl"
          >
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-gray-500">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-gray-500">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-gray-500">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <MagneticButton type="submit" className="self-start mt-4 py-4 px-8">
                Send Message <Send size={16} />
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
