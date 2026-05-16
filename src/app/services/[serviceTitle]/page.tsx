"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Filter, ExternalLink, Box, Users, Trophy, Briefcase } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const { content } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("All");
  
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
    // In a real scenario, projects might have sub-categories. 
    // Here we'll just simulate it or show all if the service is the main category.
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
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c66ff]/10 border border-[#7c66ff]/20 text-[#7c66ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              OUR WORK
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-8"
            >
              Projects That <br />
              Drive <span className="text-[#7c66ff]">Real Results</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-16"
            >
              Explore our recent projects where creativity meets technology to deliver impactful digital experiences.
            </motion.p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-12 border-t border-white/5">
              {[
                { label: "Projects Delivered", value: "200+", icon: <Box size={20} /> },
                { label: "Client Satisfaction", value: "98%", icon: <Users size={20} /> },
                { label: "Years Experience", value: "5+", icon: <Trophy size={20} /> },
                { label: "Industries Served", value: "50+", icon: <Briefcase size={20} /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <div className="text-[#7c66ff] mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#7c66ff] to-transparent rounded-full blur-[120px]" />
          {/* Mock screens in background like the image */}
          <div className="absolute top-20 right-20 w-80 h-60 bg-[#0a0c12] border border-[#7c66ff]/30 rounded-2xl rotate-12 shadow-2xl" />
          <div className="absolute top-40 right-40 w-80 h-60 bg-[#0a0c12] border border-[#7c66ff]/30 rounded-2xl -rotate-6 shadow-2xl" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 py-6 bg-[#030612]/80 backdrop-blur-md border-y border-white/5">
        <div className="container mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat || (activeCategory === "All" && cat === "All Projects")
                    ? "bg-[#7c66ff] text-white shadow-[0_0_20px_rgba(124,102,255,0.3)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
            Filter <Filter size={14} />
          </button>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 relative bg-[#060810]/50">
        <div className="container mx-auto px-6 md:px-12">
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i % 2 * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex flex-col"
                    >
                      {/* Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-[#0a0c12] border border-white/5 mb-8 group-hover:border-[#7c66ff]/30 transition-all duration-500 shadow-xl">
                        {/^https?:\/\//i.test(project.image) || project.image.startsWith("data:") ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                        
                        {/* Top-right icon like design */}
                        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <ExternalLink size={20} className="text-white" />
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[#7c66ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                            {project.category}
                          </div>
                          <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-[#7c66ff] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-md">
                            {project.description}
                          </p>
                          <Link 
                            href={project.link}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group/link border-b border-transparent hover:border-[#7c66ff] transition-all pb-1"
                          >
                            View Project 
                            <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination UI */}
              <div className="mt-32 flex items-center justify-center gap-4">
                <button className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <ArrowLeft size={16} className="rotate-0" />
                </button>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      className={`w-10 h-10 rounded-xl text-xs font-bold transition-all duration-300 ${
                        num === 1 
                          ? "bg-[#7c66ff] text-white shadow-lg" 
                          : "bg-white/5 text-gray-500 hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <button className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="py-32 text-center border border-dashed border-[#7c66ff]/20 rounded-[3rem] bg-[#7c66ff]/5">
              <div className="w-20 h-20 rounded-3xl bg-[#7c66ff]/10 border border-[#7c66ff]/20 flex items-center justify-center mx-auto mb-8 text-[#7c66ff]">
                <Sparkles size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tighter text-white">No Projects Found</h4>
              <p className="text-gray-500 max-w-sm mx-auto font-light">
                We're currently preparing amazing case studies for this category. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
