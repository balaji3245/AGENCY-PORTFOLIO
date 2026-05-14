"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

// Animated number counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const STATS = [
  { label: "Projects Delivered", value: 45, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
  { label: "On-time Delivery", value: 100, suffix: "%" },
  { label: "Year Founded", value: 2022, suffix: "" },
];

export default function Hero() {
  const { content } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col"
      id="hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[140px]" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 pt-40 pb-20">
          <div className="max-w-6xl">

            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tag">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Available for Projects — 2025
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display mt-8 text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-[-0.03em] leading-[0.95] text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block text-white">We build websites</span>
              <span className="block text-gradient-accent">that grow businesses.</span>
            </motion.h1>

            {/* Subhead + CTA row */}
            <motion.div
              className="mt-10 flex flex-col lg:flex-row lg:items-end gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[#71717a] text-lg md:text-xl font-light leading-relaxed max-w-md">
                Premium web experiences engineered for modern brands. Strategy, design, and development — all under one roof.
              </p>

              <div className="flex items-center gap-4 flex-shrink-0">
                <Link href="/start-project" className="btn-primary">
                  Start a Project <ArrowRight size={16} />
                </Link>
                <Link href="#work" className="btn-outline">
                  View Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <motion.div
        className="border-t border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="py-8 px-6 border-r border-white/5 last:border-r-0 first:pl-0"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-white tabular-nums">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-xs text-[#52525b] uppercase tracking-widest font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
