"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Zap, Layout, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { content } = useSiteContent();
  
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
      <div className="min-h-screen bg-[#030612] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/" className="text-[#7c66ff] hover:underline font-bold">Return to Home</Link>
      </div>
    );
  }

  return (
    <main className="bg-[#030612] min-h-screen text-white selection:bg-[#7c66ff]/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#7c66ff]/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-[#7c66ff]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/#services")}
            className="group flex items-center gap-3 text-gray-500 hover:text-[#7c66ff] transition-all duration-300 mb-12"
          >
            <div className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:border-[#7c66ff]/30 transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Services</span>
          </motion.button>

          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-24 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7c66ff]/10 border border-[#7c66ff]/20 text-[#7c66ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(124,102,255,0.1)]">
                  <Sparkles size={12} className="animate-pulse" /> Service Overview
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8">
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-[#7c66ff]" : "text-white"}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                  {service.description} We deliver top-tier, custom-tailored solutions designed to elevate your brand and drive measurable growth in the digital landscape.
                </p>

                <div className="flex flex-wrap gap-4 mt-12">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    <Zap size={14} className="text-[#7c66ff]" /> High Performance
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    <Layout size={14} className="text-[#7c66ff]" /> Custom Design
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                    <ShieldCheck size={14} className="text-[#7c66ff]" /> Post-Launch Support
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#0a0c12]/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-[#7c66ff]/20 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c66ff]/10 rounded-full blur-[50px] -mr-16 -mt-16 group-hover:bg-[#7c66ff]/20 transition-all duration-700" />
              
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                Core Capabilities
              </h3>
              <ul className="space-y-5 relative z-10 mb-10">
                {(service.features && service.features.length > 0 ? service.features : [
                  "Strategic Market Analysis",
                  "Iterative UX/UI Prototyping",
                  "Enterprise-Grade Development",
                  "Rigorous Quality Assurance",
                  "Continuous Performance Audit"
                ]).map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-start gap-4 text-sm text-gray-400 font-medium group/item"
                  >
                    <CheckCircle2 size={18} className="text-[#7c66ff] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <button 
                onClick={() => router.push("/#contact")}
                className="w-full py-5 rounded-2xl bg-[#7c66ff] text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#6b55e6] hover:shadow-[0_0_30px_rgba(124,102,255,0.4)] transition-all duration-500 relative z-10 flex items-center justify-center gap-3"
              >
                Start a Project
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-32 border-t border-white/5 relative bg-[#060810]/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8 text-center md:text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[10px] uppercase tracking-[0.4em] text-[#7c66ff] font-bold mb-4"
              >
                Case Studies
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Impactful <span className="text-gray-500">Deliverables</span>
              </h3>
            </div>
            <div className="px-6 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-inner">
              {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} Found
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-[#0a0c12] border border-white/5 hover:border-[#7c66ff]/30 transition-all duration-500 shadow-xl"
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-40"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-40"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/20 to-transparent" />
                    </div>

                    <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end">
                      <div className="translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                        <h4 className="text-3xl font-bold text-white mb-3 tracking-tighter leading-tight">{project.title}</h4>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-8 font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {project.tech.slice(0, 2).map((t, j) => (
                              <span key={j} className="text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-[#7c66ff]/10 border border-[#7c66ff]/20 text-[#7c66ff] font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-[#7c66ff] group-hover:text-white transition-all duration-500 shadow-lg">
                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="py-32 text-center border border-dashed border-[#7c66ff]/20 rounded-[3rem] bg-[#7c66ff]/5"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#7c66ff]/10 border border-[#7c66ff]/20 flex items-center justify-center mx-auto mb-8 text-[#7c66ff] shadow-lg">
                <Sparkles size={32} className="animate-pulse" />
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tighter">Expanding Our Portfolio</h4>
              <p className="text-gray-500 max-w-sm mx-auto font-light text-lg">
                We're currently finalizing world-class case studies for this category.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden bg-transparent">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 leading-[0.9] text-white">
              Let's create something <span className="text-[#7c66ff]">extraordinary.</span>
            </h2>
            <button 
              onClick={() => router.push("/#contact")}
              className="px-10 py-5 rounded-2xl bg-[#7c66ff] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#6b55e6] hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_rgba(124,102,255,0.3)] flex items-center gap-3 mx-auto"
            >
              Start Your Journey
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
