"use client";

import { motion } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";

const lineTimings = [
  { duration: 5.2, delay: 0.1 },
  { duration: 7.4, delay: 0.5 },
  { duration: 6.1, delay: 1 },
  { duration: 8.3, delay: 0.2 },
  { duration: 5.8, delay: 1.4 },
  { duration: 9, delay: 0.8 },
  { duration: 6.7, delay: 1.8 },
  { duration: 8.6, delay: 0.4 },
  { duration: 7.1, delay: 1.2 },
  { duration: 5.5, delay: 0.7 },
];

export default function Vision() {
  const { content } = useSiteContent();

  return (
    <section className="py-20 bg-transparent relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {lineTimings.map((timing, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ top: `${i * 10}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              repeat: Infinity,
              duration: timing.duration,
              ease: "linear",
              delay: timing.delay,
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
          {content.vision.prefix} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
            {content.vision.highlight}
          </span>{" "}
          <br />
          {content.vision.suffix}
        </motion.h2>
      </div>
    </section>
  );
}
