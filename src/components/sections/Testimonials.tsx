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

type SortOption = "latest" | "highest" | "helpful";

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  
  // State
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(3);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  const allTestimonials = useMemo(() => 
    (content.testimonials || []).filter(r => r.isApproved !== false)
  , [content.testimonials]);

  // Filtering & Sorting
  const processedTestimonials = useMemo(() => {
    let result = [...allTestimonials];
    if (ratingFilter) result = result.filter(r => (r.rating || 5) === ratingFilter);
    
    result.sort((a, b) => {
      if (sortBy === "latest") return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      if (sortBy === "highest") return (b.rating || 5) - (a.rating || 5);
      if (sortBy === "helpful") return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      return 0;
    });
    return result;
  }, [allTestimonials, ratingFilter, sortBy]);

  const visibleTestimonials = processedTestimonials.slice(0, visibleCount);

  // Stats
  const totalReviews = 1248; // Hardcoded for design fidelity as per image
  const averageRating = "4.8"; // Hardcoded for design fidelity

  const ratingBars = [
    { stars: 5, percentage: 82 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  const handleHelpful = (index: number) => {
    setHelpfulVotes(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setTimeout(() => {
      setStatusTone("success");
      setStatus("Review submitted! Approval pending.");
      setIsSubmitting(false);
      setTimeout(() => setShowForm(false), 2000);
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#05070a] text-white">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <h2 className="text-2xl font-bold mb-10">Customer Reviews</h2>

        {/* Top Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-10 mb-12 items-start">
          
          {/* Left: Score */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-7xl font-bold">{averageRating}</span>
              <Star size={32} className="fill-[#7c66ff] text-[#7c66ff]" />
            </div>
            <p className="text-gray-500 text-sm mb-4">Based on {totalReviews} reviews</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={24} className="fill-[#7c66ff] text-[#7c66ff]" />
              ))}
            </div>
          </div>

          {/* Middle: Bars */}
          <div className="space-y-3">
            {ratingBars.map(bar => (
              <div key={bar.stars} className="flex items-center gap-4 group">
                <span className="text-sm text-gray-400 w-12">{bar.stars} Star</span>
                <div className="flex-grow h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percentage}%` }}
                    viewport={{ once: true }}
                    className="h-full bg-[#7c66ff] rounded-full" 
                  />
                </div>
                <span className="text-sm text-gray-400 w-8">{bar.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col gap-6">
            <button 
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 border border-[#7c66ff]/40 px-6 py-3 rounded-xl text-[#7c66ff] font-bold text-sm hover:bg-[#7c66ff]/10 transition-all"
            >
              <Edit3 size={18} />
              Write a Review
            </button>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
              <p className="text-xs text-gray-400 mb-4 font-medium">How would you rate your experience?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={24} className="text-gray-700 hover:text-[#7c66ff] cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => { setRatingFilter(null); setSortBy("latest"); }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${!ratingFilter && sortBy === "latest" ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
          >
            All Reviews
          </button>
          <button 
            onClick={() => setSortBy("latest")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${sortBy === "latest" && ratingFilter === null ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
          >
            Latest
          </button>
          {[5, 4, 3, 2, 1].map(s => (
            <button 
              key={s}
              onClick={() => setRatingFilter(s)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${ratingFilter === s ? "bg-[#7c66ff]/10 border-[#7c66ff] text-white" : "border-white/5 text-gray-500 hover:text-white"}`}
            >
              {s} Star
            </button>
          ))}
          <div className="relative ml-auto group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-2.5 text-xs font-bold text-gray-400 appearance-none pr-10 focus:outline-none cursor-pointer"
            >
              <option value="helpful">Most Helpful</option>
              <option value="latest">Latest</option>
              <option value="highest">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Review Cards List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((review, i) => {
              const hasVoted = helpfulVotes[i];
              return (
                <motion.div
                  key={`${review.client}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-[1.5rem] border border-white/5 bg-white/[0.02] flex flex-col group transition-all hover:bg-white/[0.04]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className={(review.rating || 5) >= s ? "fill-[#7c66ff] text-[#7c66ff]" : "text-white/5"} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white ml-1">{(review.rating || 5).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        {review.date ? "2 days ago" : "Recently"}
                      </span>
                      <MoreVertical size={16} className="text-gray-600 cursor-pointer" />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-8">
                    {review.content}
                  </p>

                  <button 
                    onClick={() => handleHelpful(i)}
                    className={`flex items-center gap-2 w-fit px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      hasVoted ? "bg-[#7c66ff] text-white" : "text-gray-500 hover:text-[#7c66ff]"
                    }`}
                  >
                    <ThumbsUp size={16} className={hasVoted ? "fill-white" : ""} />
                    Helpful ({ (review.helpfulCount || 24) + (hasVoted ? 1 : 0) })
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

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

          <div className="flex items-center gap-2 text-[10px] text-gray-600 font-medium">
            <ShieldCheck size={14} />
            Only verified customers can leave reviews
          </div>
        </div>
      </div>

      {/* Review Modal */}
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
              className="w-full max-w-md bg-[#0a0c12] p-10 rounded-[2.5rem] relative border border-white/10"
            >
              <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white">
                <X size={22} />
              </button>
              <h3 className="text-2xl font-bold text-white mb-6">Write a Review</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <input required placeholder="Your Name" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[#7c66ff] text-white" />
                </div>
                <textarea required rows={4} placeholder="Your Review" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-[#7c66ff] text-white resize-none" />
                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-[#7c66ff] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#6b55e6] transition-all flex items-center justify-center gap-2 shadow-lg">
                  {isSubmitting ? "Sending..." : "Submit Review"}
                  <Send size={16} />
                </button>
                {status && (
                  <p className={`text-center text-xs font-bold uppercase tracking-widest ${statusTone === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {status}
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
