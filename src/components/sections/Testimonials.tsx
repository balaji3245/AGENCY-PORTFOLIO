"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Star, 
  X, 
  Quote, 
  Send, 
  CheckCircle, 
  ThumbsUp, 
  Filter, 
  ChevronDown, 
  Camera, 
  User,
  Plus,
  ArrowRight,
  Calendar
} from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

interface Review {
  client: string;
  company: string;
  content: string;
  rating: number;
  date?: string;
  helpfulCount?: number;
  avatar?: string;
  isApproved?: boolean;
  images?: string[];
}

type SortOption = "latest" | "highest" | "lowest" | "helpful";

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  
  // Review System State
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  const allTestimonials = useMemo(() => 
    (content.testimonials || []).filter(r => r.isApproved !== false)
  , [content.testimonials]);

  // Processing Logic: Filtering & Sorting
  const processedTestimonials = useMemo(() => {
    let result = [...allTestimonials];

    if (ratingFilter) {
      result = result.filter(r => (r.rating || 5) === ratingFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "latest") return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      if (sortBy === "highest") return (b.rating || 5) - (a.rating || 5);
      if (sortBy === "lowest") return (a.rating || 5) - (b.rating || 5);
      if (sortBy === "helpful") return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      return 0;
    });

    return result;
  }, [allTestimonials, ratingFilter, sortBy]);

  const visibleTestimonials = processedTestimonials.slice(0, visibleCount);

  // Statistics
  const totalReviews = allTestimonials.length;
  const averageRating = useMemo(() => 
    totalReviews > 0 
      ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
      : "0.0"
  , [allTestimonials, totalReviews]);

  const ratingBars = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // 5 to 1
    allTestimonials.forEach(r => {
      const idx = 5 - (r.rating || 5);
      if (idx >= 0 && idx < 5) counts[idx]++;
    });
    return counts.map((count, i) => ({
      stars: 5 - i,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
    }));
  }, [allTestimonials, totalReviews]);

  // Handlers
  const toggleExpand = (index: number) => {
    const next = new Set(expandedReviews);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setExpandedReviews(next);
  };

  const handleHelpful = (index: number) => {
    setHelpfulVotes(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: `${formData.get("name")?.toString().toLowerCase().replace(/\s/g, ".")}@review.user`,
          phone: formData.get("company"),
          message: `${formData.get("rating")} STARS | ${formData.get("review")}`,
          source: "review",
        }),
      });

      if (!response.ok) throw new Error();

      setStatusTone("success");
      setStatus("Review submitted! Approval pending.");
      form.reset();
      setTimeout(() => setShowForm(false), 3000);
    } catch {
      setStatusTone("error");
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-start lg:items-center justify-between">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <CheckCircle size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verified Client Feedback</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Loved by businesses <br /><span className="text-gray-500">around the globe.</span></h2>
            <p className="text-gray-400 text-lg font-light">We take pride in delivering results that speak for themselves. Join our growing list of satisfied partners.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all group"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            Write a Review
          </motion.button>
        </div>

        {/* Summary Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center justify-center text-center"
          >
            <span className="text-8xl font-bold text-white mb-4 tracking-tighter">{averageRating}</span>
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={24} className={Number(averageRating) >= s ? "fill-blue-500 text-blue-500" : "text-white/10"} />
              ))}
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Based on {totalReviews} Client Reviews</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="space-y-5">
              {ratingBars.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-6">
                  <span className="text-[10px] font-black text-gray-500 w-8">{bar.stars}★</span>
                  <div className="flex-grow h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-600 w-12 text-right">{bar.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 pb-8 border-b border-white/5">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setRatingFilter(null)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                ratingFilter === null ? "bg-white text-black" : "bg-white/5 text-gray-500 hover:text-white"
              }`}
            >
              All Voices
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setRatingFilter(s)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  ratingFilter === s ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-white/5 border-transparent text-gray-500 hover:text-white"
                }`}
              >
                {s} <Star size={11} className={ratingFilter === s ? "fill-blue-400" : "fill-gray-500"} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Filter size={14} className="text-gray-600" />
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white appearance-none pr-12 focus:outline-none focus:border-white/20 transition-all cursor-pointer"
              >
                <option value="latest">Recently Published</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((review, i) => {
              const isExpanded = expandedReviews.has(i);
              const isLong = review.content.length > 200;
              const hasVoted = helpfulVotes[i];

              return (
                <motion.div
                  key={`${review.client}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 flex flex-col group h-full relative"
                >
                  <Quote className="absolute top-10 right-10 text-white/[0.03] group-hover:text-blue-500/10 transition-colors" size={60} />
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{review.client}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mt-0.5">{review.company}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} className={(review.rating || 5) >= s ? "fill-blue-500 text-blue-500" : "text-white/5"} />
                    ))}
                  </div>

                  <div className="flex-grow relative z-10">
                    <p className={`text-gray-400 text-sm leading-relaxed font-light ${!isExpanded && isLong ? "line-clamp-5" : ""}`}>
                      &quot;{review.content}&quot;
                    </p>
                    {isLong && (
                      <button 
                        onClick={() => toggleExpand(i)}
                        className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-4 hover:text-white transition-colors flex items-center gap-2"
                      >
                        {isExpanded ? "Read Less" : "Read Full Story"}
                        <ArrowRight size={12} className={isExpanded ? "-rotate-90" : ""} />
                      </button>
                    )}
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                    <button 
                      onClick={() => handleHelpful(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        hasVoted ? "bg-blue-600 text-white" : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <ThumbsUp size={12} className={hasVoted ? "fill-white" : ""} />
                      Helpful ({ (review.helpfulCount || 0) + (hasVoted ? 1 : 0) })
                    </button>
                    <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">
                      {review.date ? new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load More Section */}
        {processedTestimonials.length > visibleCount ? (
          <div className="mt-20 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-12 py-5 rounded-full border border-white/10 hover:border-white/30 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all duration-500 bg-white/[0.02]"
            >
              Load More Reviews
            </button>
          </div>
        ) : processedTestimonials.length > 0 && (
          <div className="mt-20 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">You&apos;ve reached the end of the proof board</p>
          </div>
        )}

        {visibleTestimonials.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mx-auto mb-6">
              <Filter size={24} className="text-gray-600" />
            </div>
            <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">No reviews found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              className="w-full max-w-2xl bg-[#030612] p-10 md:p-14 rounded-[3.5rem] relative border border-white/10 shadow-3xl overflow-hidden"
            >
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
              
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-10 right-10 p-3 hover:bg-white/10 rounded-full transition-colors z-10 text-gray-500 hover:text-white"
              >
                <X size={22} />
              </button>

              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-3 text-white tracking-tight">Write a Review</h3>
                <p className="text-gray-500 text-sm mb-12 font-light leading-relaxed">Share your experience with YJ DEVELOPERS. Your feedback helps us grow and helps others make informed decisions.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block px-1">Full Name</label>
                      <input name="name" required placeholder="Alexander Pierce" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block px-1">Company / Industry</label>
                      <input name="company" required placeholder="Nova Creative Studio" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700" />
                    </div>
                  </div>

                  <div className="space-y-4 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block text-center">Overall Rating</label>
                    <div className="flex justify-center gap-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                          key={s} 
                          type="button" 
                          onClick={() => setRatingFilter(s)} // selection
                          className="hover:scale-125 transition-transform duration-300 p-1"
                        >
                          <Star size={36} className={(ratingFilter || 5) >= s ? "fill-blue-500 text-blue-500" : "text-white/5"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block px-1">Your Detailed Feedback</label>
                    <textarea name="review" required rows={5} placeholder="What specific results did you achieve? How was the communication?" className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-6 py-5 text-sm focus:outline-none focus:border-blue-500 transition-all text-white resize-none placeholder:text-gray-700 leading-relaxed" />
                  </div>

                  {/* Mock Image Upload */}
                  <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-600">
                      <Camera size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Optional Images</p>
                      <p className="text-[9px] text-gray-700 mt-0.5">Upload project screenshots or brand results</p>
                    </div>
                    <button type="button" className="px-4 py-2 rounded-lg bg-white/5 text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-colors">Choose Files</button>
                  </div>

                  <div className="pt-6">
                    <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.25em] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl">
                      {isSubmitting ? "Syncing to Cloud..." : "Publish Review"}
                      <Send size={16} />
                    </button>
                    
                    {status && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-6 flex items-center justify-center gap-3 p-5 rounded-2xl ${statusTone === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {statusTone === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{status}</span>
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
