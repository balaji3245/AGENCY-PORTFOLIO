"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import MagneticButton from "@/components/ui/MagneticButton";

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

      if (!response.ok) {
        throw new Error("Unable to send message.");
      }

      form.reset();
      setStatus("Message received. We will get back to you soon.");
    } catch {
      setStatus("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-transparent relative overflow-hidden"
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
            className="glass-card p-10 rounded-[2rem] max-w-xl lg:ml-auto"
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
                <label htmlFor="contact-phone" className="text-xs uppercase tracking-widest text-gray-500">
                  Mobile No
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-white transition-colors"
                  placeholder="+91 98765 43210"
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
              <MagneticButton
                type="submit"
                className="self-start mt-4 py-4 px-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send size={16} />
              </MagneticButton>
              {status ? (
                <p className="text-sm text-emerald-300" role="status">
                  {status}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
