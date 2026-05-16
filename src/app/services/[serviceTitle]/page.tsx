"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { content } = useSiteContent();
  
  // Decode the service title from URL
  const serviceTitle = useMemo(() => {
    if (!params.serviceTitle) return "";
    return decodeURIComponent(params.serviceTitle as string);
  }, [params.serviceTitle]);

  const service = useMemo(() => {
    return content.services.items.find(s => s.title === serviceTitle);
  }, [serviceTitle, content.services.items]);

  const projects = useMemo(() => {
    return content.portfolio.items.filter(p => p.category === serviceTitle);
  }, [serviceTitle, content.portfolio.items]);

  if (!service) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/" className="text-cyan-400 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/#services")}
            className="group flex items-center gap-3 text-gray-500 hover:text-white transition-all duration-300 mb-12"
          >
            <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-white/20 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Back to Services</span>
          </motion.button>

          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                  <Sparkles size={12} /> Detailed Service Overview
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-gray-500" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl">
                  {service.description} We provide end-to-end solutions tailored to your brand's unique needs, ensuring excellence at every touchpoint.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-white/5"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                What's Included
              </h3>
              <ul className="space-y-4">
                {[
                  "Custom Tailored Strategy",
                  "Premium Quality Execution",
                  "Iterative Design Process",
                  "Full Post-Launch Support",
                  "Dedicated Creative Team"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-400 font-light">
                    <CheckCircle2 size={18} className="text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => router.push("/#contact")}
                className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all duration-500 shadow-xl"
              >
                Start Project Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold mb-4">Case Studies</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected <span className="text-gray-500">Works</span></h3>
            </div>
            <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {projects.length} Projects Total
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <AnimatePresence>
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-white/5"
                  >
                    <div className="absolute inset-0 z-0">
                      {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-3xl font-bold text-white mb-3 tracking-tighter leading-tight">{project.title}</h4>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-8 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {project.tech.slice(0, 2).map((t, j) => (
                              <span key={j} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-white text-black hover:bg-cyan-400 transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                          >
                            <ArrowUpRight size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-8 text-gray-700">
                <Sparkles size={40} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Projects in Pipeline</h4>
              <p className="text-gray-500 max-w-sm mx-auto font-light text-lg">
                We're currently finalizing amazing case studies for this service. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 max-w-5xl mx-auto leading-[0.9]">
            Ready to scale your <span className="text-gray-500">brand presence?</span>
          </h2>
          <button 
            onClick={() => router.push("/#contact")}
            className="px-12 py-6 rounded-full bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-cyan-400 hover:scale-105 transition-all duration-500 shadow-2xl"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
