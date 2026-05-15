"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, Star, X, MessageSquare, CheckCircle } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import MagneticButton from "@/components/ui/MagneticButton";

interface Review {
  client: string;
  company: string;
  content: string;
  rating: number;
  isDynamic?: boolean;
}

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const allTestimonials: Review[] = content.testimonials;

  const filteredTestimonials = filterRating 
    ? allTestimonials.filter(t => (t.rating || 5) === filterRating)
    : allTestimonials;

  const totalReviews = allTestimonials.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allTestimonials.filter(t => (t.rating || 5) === star).length,
    percentage: totalReviews > 0 ? (allTestimonials.filter(t => (t.rating || 5) === star).length / totalReviews) * 100 : 0
  }));

  const averageRating = totalReviews > 0 
    ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
    : "0.0";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const content = String(formData.get("review") ?? "").trim();

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email: `${name.toLowerCase().replace(/\s/g, ".")}@review.temp`, 
          phone: company, 
          message: `${rating} STARS | ${content}`,
          source: "review" 
        }),
      });

      if (!response.ok) throw new Error();

      setStatusTone("success");
      setStatus("Thank you! Your review has been submitted for moderation.");
      form.reset();
      setTimeout(() => {
        setShowForm(false);
        setStatus("");
      }, 3000);
    } catch {
      setStatusTone("error");
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
            >
              <MessageSquare size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Client Feedback</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
            >
              Real Stories from <br />
              <span className="text-gradient">Real Partnerships.</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch gap-8 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-md"
            >
              <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-8">
                <div className="text-7xl font-black mb-1 leading-none">{averageRating}</div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} className={`${Number(averageRating) >= s ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{totalReviews} Verified Reviews</div>
              </div>
              
              <div className="flex-1 space-y-3 pt-2">
                {ratingCounts.map(({ star, percentage, count }) => (
                  <button 
                    key={star}
                    onClick={() => setFilterRating(filterRating === star ? null : star)}
                    className={`flex items-center gap-4 w-full group transition-all duration-300 ${filterRating === star ? "opacity-100 scale-[1.02]" : filterRating ? "opacity-30" : "opacity-100"}`}
                  >
                    <span className="text-[10px] font-bold w-4 text-gray-500">{star}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                      />
                    </div>
                    <span className="text-[9px] font-medium text-gray-600 group-hover:text-gray-400 w-8 text-right transition-colors">{count}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pt-20"
          >
            <MagneticButton 
              onClick={() => setShowForm(true)}
              className="px-10 py-5 rounded-full group"
            >
              <span className="flex items-center gap-3">
                Share Your Success Story <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
              filterRating === null 
                ? "bg-white text-black border-white shadow-xl shadow-white/10" 
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
            }`}
          >
            All <span className="ml-1 opacity-50">{totalReviews}</span>
          </button>
          {[5, 4, 3, 2, 1].map((s) => {
            const count = allTestimonials.filter(t => (t.rating || 5) === s).length;
            if (count === 0 && filterRating !== s) return null;
            return (
              <button
                key={s}
                onClick={() => setFilterRating(s)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border flex items-center gap-2 ${
                  filterRating === s 
                    ? "bg-amber-500 text-black border-amber-500 shadow-xl shadow-amber-500/20" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                }`}
              >
                {s} <Star size={12} className={filterRating === s ? "fill-black" : "fill-amber-500 text-amber-500"} />
                <span className={`ml-1 ${filterRating === s ? "text-black/40" : "text-gray-600"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.slice(0, isExpanded ? undefined : 6).map((test, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={`${test.client}-${i}`}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative h-full glass-card p-10 rounded-[3rem] border border-white/5 group-hover:border-white/20 transition-all duration-500 flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          className={`${(test.rating || 5) >= star ? "text-amber-500 fill-amber-500" : "text-gray-700"}`} 
                        />
                      ))}
                    </div>
                    <Quote className="text-white/5 group-hover:text-white/10 transition-colors w-12 h-12 -mt-4 -mr-2" />
                  </div>
                  
                  <p className="text-lg text-gray-300 font-light mb-10 leading-relaxed line-clamp-6 flex-1">
                    &quot;{test.content}&quot;
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xl font-black text-white group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                        {test.client[0]}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-black">
                        <CheckCircle size={10} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-base tracking-tight">{test.client}</h5>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em] mt-0.5">{test.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTestimonials.length > 6 && (
          <div className="mt-20 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-12 py-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white"
            >
              {isExpanded ? "View Less" : `Explore All Reviews (${filteredTestimonials.length})`}
            </button>
          </div>
        )}

        {filteredTestimonials.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Star size={32} className="text-gray-700" />
            </div>
            <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold">
              No {filterRating} star reviews found yet
            </p>
          </motion.div>
        )}
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="w-full max-w-xl glass-card p-10 md:p-12 rounded-[3.5rem] relative border border-white/10"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 hover:border-white/20"
              >
                <X size={20} />
              </button>

              <div className="mb-10 text-center">
                <h4 className="text-3xl font-bold mb-2">Share Your Story</h4>
                <p className="text-gray-400 text-sm tracking-wide">Help us inspire others with your experience.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">Your Identity</label>
                    <input 
                      name="name"
                      required
                      placeholder="Your Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">Company / Role</label>
                    <input 
                      name="company"
                      required
                      placeholder="e.g. Founder at TechFlow"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">Overall Experience</label>
                  <div className="flex flex-wrap items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          onMouseEnter={() => setHoveredRating(s)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-all hover:scale-125"
                        >
                          <Star 
                            size={24} 
                            className={`${(hoveredRating || rating) >= s ? "text-amber-500 fill-amber-500" : "text-gray-800"} transition-colors`} 
                          />
                        </button>
                      ))}
                    </div>
                    <span className="ml-auto text-[11px] font-black text-amber-500/80 uppercase tracking-[0.2em] pr-2">
                      {rating === 5 ? "Exceptional" : rating === 4 ? "Excellent" : rating === 3 ? "Good" : rating === 2 ? "Average" : "Poor"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-2">Your Detailed Feedback</label>
                  <textarea 
                    name="review"
                    required
                    rows={4}
                    placeholder="Tell us about the project results and our partnership..."
                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none placeholder:text-gray-600 leading-relaxed"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <MagneticButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold"
                  >
                    {isSubmitting ? "Processing..." : "Submit Review"} <Send size={16} />
                  </MagneticButton>
                  
                  {status && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center justify-center gap-2 p-4 rounded-2xl border ${
                        statusTone === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {statusTone === 'success' && <CheckCircle size={16} />}
                      <span className="text-xs font-medium">{status}</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

