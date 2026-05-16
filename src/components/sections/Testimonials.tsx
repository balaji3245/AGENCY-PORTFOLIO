"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Star, 
  X, 
  Send, 
  CheckCircle, 
  ThumbsUp, 
  ChevronDown, 
  MoreVertical,
  Edit3,
  ShieldCheck
} from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

interface Review {
  client: string;
  company: string;
  content: string;
  rating: number;
  date?: string;
  helpfulCount?: number;
  isApproved?: boolean;
}

type SortOption = "helpful" | "latest" | "highest";

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  
  // Review System State
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("helpful");
  const [visibleCount, setVisibleCount] = useState(3);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});
  const [selectedRatingInForm, setSelectedRatingInForm] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  const allTestimonials = useMemo(() => 
    (content.testimonials || []).filter(r => r.isApproved !== false)
  , [content.testimonials]);

  // Calculations based on REAL DATA
  const totalReviews = allTestimonials.length;
  const averageRatingNum = useMemo(() => 
    totalReviews > 0 
      ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews)
      : 0
  , [allTestimonials, totalReviews]);
  
  const averageRating = averageRatingNum.toFixed(1);

  const ratingBars = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1
    allTestimonials.forEach(r => {
      const star = Math.round(r.rating || 5);
      const idx = 5 - star;
      if (idx >= 0 && idx < 5) counts[idx]++;
    });
    return counts.map((count, i) => ({
      stars: 5 - i,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
    }));
  }, [allTestimonials, totalReviews]);

  // Filtering & Sorting Logic
  const processedTestimonials = useMemo(() => {
    let result = [...allTestimonials];

    // Filter by stars
    if (ratingFilter !== null) {
      result = result.filter(r => Math.round(r.rating || 5) === ratingFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      }
      if (sortBy === "highest") {
        return (b.rating || 5) - (a.rating || 5);
      }
      if (sortBy === "helpful") {
        const aHelpful = (a.helpfulCount || 0) + (helpfulVotes[allTestimonials.indexOf(a)] ? 1 : 0);
        const bHelpful = (b.helpfulCount || 0) + (helpfulVotes[allTestimonials.indexOf(b)] ? 1 : 0);
        return bHelpful - aHelpful;
      }
      return 0;
    });

    return result;
  }, [allTestimonials, ratingFilter, sortBy, helpfulVotes]);

  const visibleTestimonials = processedTestimonials.slice(0, visibleCount);

  // Handlers
  const handleHelpful = (originalIndex: number) => {
    setHelpfulVotes(prev => ({ ...prev, [originalIndex]: !prev[originalIndex] }));
  };

  const handleQuickRate = (rating: number) => {
    setSelectedRatingInForm(rating);
    setShowForm(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: formData.get("name"),
          company: formData.get("company"),
          rating: selectedRatingInForm,
          content: formData.get("review"),
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error();

      setIsSuccess(true);
      form.reset();
      setTimeout(() => {
        setShowForm(false);
        setTimeout(() => {
          setIsSuccess(false);
          window.location.reload(); // Reload to show the new review immediately if static
        }, 500);
      }, 3000);
    } catch {
      setStatusTone("error");
      setStatus("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-transparent text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <h2 className="text-2xl font-bold mb-10">Customer Reviews</h2>

        {/* Top Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1.5fr] gap-8 md:gap-12 mb-16 items-start">
          
          {/* Left: Score */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-6xl md:text-7xl font-bold">{averageRating}</span>
              <Star size={32} className="fill-[#7c66ff] text-[#7c66ff]" />
            </div>
            <p className="text-gray-500 text-sm mb-4">Based on {totalReviews} reviews</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={20} className={averageRatingNum >= s ? "fill-[#7c66ff] text-[#7c66ff]" : "text-white/5"} />
              ))}
            </div>
          </div>

          {/* Middle: Bars */}
          <div className="space-y-3 w-full">
            {ratingBars.map(bar => (
              <div key={bar.stars} className="flex items-center gap-4 group cursor-pointer" onClick={() => setRatingFilter(bar.stars)}>
                <span className={`text-xs md:text-sm w-12 transition-colors ${ratingFilter === bar.stars ? "text-white font-bold" : "text-gray-400 group-hover:text-white"}`}>{bar.stars} Star</span>
                <div className="flex-grow h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.percentage}%` }}
                    className="h-full bg-[#7c66ff] rounded-full" 
                  />
                </div>
                <span className="text-[10px] md:text-sm text-gray-400 w-8 md:w-10 text-right">{Math.round(bar.percentage)}%</span>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-4 md:gap-6 w-full">
            <button 
              onClick={() => { setSelectedRatingInForm(5); setShowForm(true); }}
              className="flex items-center justify-center gap-2 border border-[#7c66ff]/40 px-6 py-3.5 rounded-2xl text-[#7c66ff] font-bold text-sm hover:bg-[#7c66ff]/10 transition-all w-full"
            >
              <Edit3 size={18} />
              Write a Review
            </button>
            <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
              <p className="text-[10px] text-gray-400 mb-4 font-medium uppercase tracking-wider">Quick Rate</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => handleQuickRate(s)} className="hover:scale-110 transition-transform p-1">
                    <Star size={24} className="text-gray-700 hover:text-[#7c66ff] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
          <button 
            onClick={() => { setRatingFilter(null); setSortBy("helpful"); }}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${ratingFilter === null ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
          >
            All Reviews
          </button>
          
          <button 
            onClick={() => { setRatingFilter(null); setSortBy("latest"); }}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${sortBy === "latest" && ratingFilter === null ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
          >
            Latest
          </button>

          {[5, 4, 3, 2, 1].map(s => (
            <button 
              key={s}
              onClick={() => setRatingFilter(s)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${ratingFilter === s ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
            >
              {s} ★
            </button>
          ))}

          <div className="relative ml-0 sm:ml-auto group min-w-[140px] w-full sm:w-auto mt-2 sm:mt-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 text-xs font-bold text-gray-400 appearance-none pr-10 focus:outline-none cursor-pointer hover:border-white/20 transition-all"
            >
              <option value="helpful">Most Helpful</option>
              <option value="latest">Newest First</option>
              <option value="highest">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Review Cards List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((review) => {
              const originalIndex = allTestimonials.indexOf(review);
              const hasVoted = helpfulVotes[originalIndex];
              const displayHelpfulCount = (review.helpfulCount || 0) + (hasVoted ? 1 : 0);

              return (
                <motion.div
                  key={`${review.client}-${originalIndex}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-5 md:p-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] flex flex-col group transition-all hover:bg-white/[0.04]"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} className={(review.rating || 5) >= s ? "fill-[#7c66ff] text-[#7c66ff]" : "text-white/5"} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white ml-1">{(review.rating || 5).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <span className="text-[10px] md:text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                        {review.client}
                      </span>
                      <span className="text-[10px] text-gray-600">
                        {review.date ? new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {review.content}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <button 
                      onClick={() => handleHelpful(originalIndex)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] md:text-xs font-medium transition-all ${
                        hasVoted ? "bg-[#7c66ff] text-white" : "text-gray-500 hover:text-[#7c66ff] bg-white/5"
                      }`}
                    >
                      <ThumbsUp size={14} className={hasVoted ? "fill-white" : ""} />
                      Helpful ({displayHelpfulCount})
                    </button>
                    <MoreVertical size={16} className="text-gray-600 cursor-pointer hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {visibleTestimonials.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <p className="text-gray-600 text-sm">No reviews match your selected filters.</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-10 flex flex-col items-center gap-6">
          {processedTestimonials.length > visibleCount && (
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="flex items-center gap-2 px-12 py-3 rounded-xl border border-white/10 hover:border-white/20 text-xs font-bold text-white transition-all bg-white/[0.02]"
            >
              View More Reviews <ChevronDown size={16} />
            </button>
          )}

          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-medium tracking-widest uppercase">
            <ShieldCheck size={14} className="text-emerald-500/50" />
            Only verified customers can leave reviews
          </div>
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-md bg-[#0a0c12] p-10 rounded-[2.5rem] relative border border-white/10 shadow-2xl"
            >
              <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors">
                <X size={22} />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">Write a Review</h3>
              <p className="text-gray-500 text-xs mb-8">Share your thoughts with other customers.</p>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Review Published!</h3>
                    <p className="text-gray-500 text-sm max-w-[220px]">
                      Thank you for your feedback. Your review is now live on the site.
                    </p>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-1 bg-emerald-500/20 absolute bottom-0 left-0"
                    />
                  </motion.div>
                ) : (
                  <motion.form 
                    key="review-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} type="button" onClick={() => setSelectedRatingInForm(s)} className="hover:scale-110 transition-transform">
                              <Star size={28} className={selectedRatingInForm >= s ? "fill-[#7c66ff] text-[#7c66ff]" : "text-white/5"} />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Your Name</label>
                        <input name="name" required placeholder="Enter your name" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#7c66ff] text-white transition-all" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Your Feedback</label>
                      <textarea name="review" required rows={4} placeholder="What did you like about the product?" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#7c66ff] text-white resize-none transition-all" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-[#7c66ff] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#6b55e6] transition-all flex items-center justify-center gap-2 shadow-lg group">
                      {isSubmitting ? "Sending..." : "Submit Review"}
                      <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    {status && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center text-xs font-bold uppercase tracking-widest ${statusTone === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {status}
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
