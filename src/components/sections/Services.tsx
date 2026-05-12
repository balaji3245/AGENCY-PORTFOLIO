"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Globe, Zap, Search, Server, Code } from "lucide-react";

const services = [
  {
    title: "Premium Web Apps",
    description: "Complex, scalable, and secure web applications built with modern frameworks like Next.js and React.",
    icon: <Monitor size={24} />,
  },
  {
    title: "Ecommerce Solutions",
    description: "High-converting online stores tailored to your brand, optimized for speed and seamless checkout.",
    icon: <Zap size={24} />,
  },
  {
    title: "Immersive Landing Pages",
    description: "Cinematic, motion-driven landing pages designed to capture attention and drive conversions.",
    icon: <Globe size={24} />,
  },
  {
    title: "Mobile Experiences",
    description: "Responsive, app-like experiences for mobile users, ensuring your brand looks perfect on any device.",
    icon: <Smartphone size={24} />,
  },
  {
    title: "Technical SEO",
    description: "Deep technical optimization to ensure your site ranks high on search engines and drives organic traffic.",
    icon: <Search size={24} />,
  },
  {
    title: "Backend Architecture",
    description: "Robust, secure, and scalable backend systems using Node.js, Laravel, and AWS infrastructure.",
    icon: <Server size={24} />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              Comprehensive digital <br />
              <span className="text-gray-500">solutions.</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm mt-6 md:mt-0 font-light">
            We deliver end-to-end digital services, from high-fidelity design to complex technical implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-white/10" />
              
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {service.description}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                <span>Explore Service</span>
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
