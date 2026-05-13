"use client";

import { motion } from "framer-motion";

export default function MovingBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#030014]">
      {/* Orb 1: Deep Violet */}
      <motion.div
        className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#7C3AED]/25 blur-[130px]"
        animate={{
          x: ["0%", "30%", "-20%", "0%"],
          y: ["0%", "-40%", "20%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Orb 2: Cinematic Magenta */}
      <motion.div
        className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#DB2777]/20 blur-[140px]"
        animate={{
          x: ["0%", "-30%", "20%", "0%"],
          y: ["0%", "30%", "-20%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Orb 3: Vibrant Cyan */}
      <motion.div
        className="absolute bottom-[-10%] left-[30%] w-[55vw] h-[55vw] rounded-full bg-[#06B6D4]/15 blur-[150px]"
        animate={{
          x: ["0%", "40%", "-30%", "0%"],
          y: ["0%", "-20%", "40%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
      />
    </div>
  );
}
