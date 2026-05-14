"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, Send } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import Link from "next/link";

export default function Contact() {
  const { content } = useSiteContent();
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setIsSubmitting(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, source: "contact" }),
      });
      if (!response.ok) throw new Error();
      form.reset();
      setStatus("Message received. We'll get back to you within 24 hours.");
    } catch {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      {/* Strong CTA above */}
      <div className="border-y border-white/5 mb-0">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-3xl">
              <span className="eyebrow mb-5 block">Ready to start?</span>
              <h2 className="font-display text-[clamp(2.8rem,7vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-balance">
                Let&rsquo;s build something <span className="text-gradient-accent">remarkable.</span>
              </h2>
            </div>
            <div className="flex-shrink-0">
              <Link href="/start-project" className="btn-primary text-base px-8 py-4">
                Start a Project <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact info + form */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-6 block">Get in Touch</span>
            <p className="text-[#71717a] text-lg font-light leading-relaxed mb-12 max-w-sm">
              {content.contact.description}
            </p>

            <div className="space-y-6">
              <a href={`mailto:${content.brand.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 text-[#52525b]">
                  <Mail size={17} />
                </div>
                <span className="text-[#a1a1aa] group-hover:text-white transition-colors duration-300">{content.brand.email}</span>
              </a>
              <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 text-[#52525b]">
                  <Phone size={17} />
                </div>
                <span className="text-[#a1a1aa] group-hover:text-white transition-colors duration-300">{content.brand.phone}</span>
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              {[
                { id: "contact-name", name: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
                { id: "contact-email", name: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
                { id: "contact-phone", name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#52525b] mb-3">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-base text-white placeholder-[#3b3b3b] focus:outline-none focus:border-blue-400 transition-colors duration-300"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#52525b] mb-3">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full bg-transparent border-b border-white/10 pb-3 text-base text-white placeholder-[#3b3b3b] focus:outline-none focus:border-blue-400 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={15} />
              </button>

              {status && (
                <p className={`text-sm ${status.includes("wrong") ? "text-red-400" : "text-emerald-400"}`} role="status">
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
