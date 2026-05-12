"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section className="py-40 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ top: `${i * 10}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 5,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-tight"
        >
          Our goal is to help <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            1000+ businesses
          </span> <br />
          build their digital presence.
        </motion.h2>
      </div>
    </section>
  );
}
