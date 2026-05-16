"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Filter, Code2, LineChart, Laptop } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  
  const serviceTitle = useMemo(() => {
    if (!params.serviceTitle) return "";
    return decodeURIComponent(params.serviceTitle as string);
  }, [params.serviceTitle]);

  const service = useMemo(() => {
    return content.services.items.find(s => s.title === serviceTitle);
  }, [serviceTitle, content.services.items]);

  const allProjects = useMemo(() => {
    return content.portfolio.items.filter(p => p.category === serviceTitle);
  }, [serviceTitle, content.portfolio.items]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return allProjects;
    return allProjects; 
  }, [activeCategory, allProjects]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#030612] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <Link href="/" className="text-[#7c66ff] hover:underline font-bold">Return to Home</Link>
      </div>
    );
  }

  const categories = ["All Projects", "Web Development", "Mobile Apps", "UI/UX Design", "E-commerce", "Branding"];

  return (
    <main className="bg-[#030612] min-h-screen text-white selection:bg-[#7c66ff]/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#7c66ff] shadow-[0_0_10px_rgba(124,102,255,1)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">MY WORK</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
              >
                Projects That <br />
                <span className="bg-gradient-to-r from-[#7c66ff] via-[#4b7dff] to-[#7c66ff] bg-clip-text text-transparent">Solve Problems</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl"
              >
                A collection of projects I've built to bring ideas to life, solve real-world problems, and explore new technologies.
              </motion.p>
            </div>

            {/* Visual Element (Laptop / Floating Icons) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-1000">
                <div className="w-full aspect-[16/10] bg-[#0a0c12] rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden p-2">
                   <div className="w-full h-full bg-[#030612] rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                      <Laptop size={120} className="text-[#7c66ff]/20" />
                   </div>
                </div>
              </div>
              
              {/* Floating Icons like design */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 w-24 h-24 rounded-2xl bg-[#0a0c12]/80 backdrop-blur-xl border border-[#7c66ff]/30 flex items-center justify-center shadow-2xl rotate-12"
              >
                <Code2 size={32} className="text-[#7c66ff]" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 w-20 h-20 rounded-2xl bg-[#0a0c12]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl -rotate-12"
              >
                <LineChart size={28} className="text-gray-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Glows */}
        <div className="absolute top-0 right-[-10%] w-[60%] h-[80%] bg-[#7c66ff]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[40%] h-[60%] bg-[#4b7dff]/5 rounded-full blur-[140px] pointer-events-none" />
      </section>

      {/* Grid Section */}
      <section className="py-24 relative" id="projects-grid">
        <div className="container mx-auto px-6 md:px-12">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.slice(0, visibleCount).map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="bg-[#0a0c12]/40 backdrop-blur-sm border border-white/5 rounded-[2rem] p-5 h-full flex flex-col transition-all duration-500 hover:border-[#7c66ff]/30 hover:bg-[#0a0c12]/60 shadow-xl">
                        {/* Project Image */}
                        <div className="relative aspect-[1.4/1] overflow-hidden rounded-2xl mb-8 border border-white/5">
                          {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-grow px-2">
                          <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 font-light text-sm leading-relaxed mb-8 flex-grow">
                            {project.description}
                          </p>

                          {/* Tech Stack Pills */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.tech.map((t, index) => (
                              <span 
                                key={index} 
                                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[9px] font-bold text-gray-500 tracking-wider hover:bg-[#7c66ff]/10 hover:text-[#7c66ff] transition-all"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Link */}
                          <Link 
                            href={project.link}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7c66ff] group/link"
                          >
                            View Project
                            <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* View More / View Less Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {visibleCount < filteredProjects.length && (
                  <button
                    onClick={() => setVisibleCount(prev => prev + 3)}
                    className="px-10 py-5 rounded-2xl bg-[#7c66ff] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#6b55e6] hover:scale-105 transition-all duration-500 shadow-[0_20px_50px_rgba(124,102,255,0.3)] flex items-center gap-3"
                  >
                    View More Projects
                  </button>
                )}
                
                {visibleCount > 3 && (
                  <button
                    onClick={() => {
                      setVisibleCount(3);
                      document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em] hover:text-white hover:border-white/30 transition-all duration-500"
                  >
                    View Less
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-white/10 rounded-[3rem] bg-white/5">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 text-gray-700">
                <Laptop size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tighter text-white">No Projects Found</h4>
              <p className="text-gray-500 max-w-sm mx-auto font-light">
                Stay tuned as we add more projects to this category soon.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
