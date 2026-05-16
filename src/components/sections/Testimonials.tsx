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
  User,
  Plus,
  ArrowRight
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
}

type SortOption = "latest" | "highest" | "helpful";

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  
  // Review System State
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(3); // Compact: only 3 initially
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  const allTestimonials = useMemo(() => 
    (content.testimonials || []).filter(r => r.isApproved !== false)
  , [content.testimonials]);

  // Processing Logic
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

  // Statistics
  const totalReviews = allTestimonials.length;
  const averageRating = useMemo(() => 
    totalReviews > 0 
      ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
      : "0.0"
  , [allTestimonials, totalReviews]);

  const ratingBars = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    allTestimonials.forEach(r => {
      const idx = 5 - (r.rating || 5);
      if (idx >= 0 && idx < 5) counts[idx]++;
    });
    return counts.map((count, i) => ({
      stars: 5 - i,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0
    }));
  }, [allTestimonials, totalReviews]);

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
      setStatus("Review submitted! Pending approval.");
      form.reset();
      setTimeout(() => setShowForm(false), 2000);
    } catch {
      setStatusTone("error");
      setStatus("Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-16 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
              <CheckCircle size={12} className="text-blue-400" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Proof</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">What they say.</h2>
            <p className="text-gray-500 text-sm font-light">Real results from brands we&apos;ve helped scale.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Horizontal Summary Bar */}
            <div className="hidden lg:flex items-center gap-6 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">{averageRating}</span>
                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Average</span>
              </div>
              <div className="flex flex-col gap-1 w-24">
                {ratingBars.slice(0, 3).map(bar => (
                  <div key={bar.stars} className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${bar.percentage}%` }} />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white">{totalReviews}</span>
                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Reviews</span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg"
            >
              <Plus size={14} />
              Review
            </button>
          </div>
        </div>

        {/* Compact Filters */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex gap-2">
            {["All", "Latest", "5★", "Helpful"].map((f) => {
              const isActive = (f === "All" && !ratingFilter && sortBy === "latest") || 
                               (f === "Latest" && sortBy === "latest") ||
                               (f === "5★" && ratingFilter === 5) ||
                               (f === "Helpful" && sortBy === "helpful");
              
              const handleClick = () => {
                if (f === "All") { setRatingFilter(null); setSortBy("latest"); }
                if (f === "Latest") setSortBy("latest");
                if (f === "5★") setRatingFilter(5);
                if (f === "Helpful") setSortBy("helpful");
              };

              return (
                <button
                  key={f}
                  onClick={handleClick}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    isActive ? "bg-white/10 text-white border border-white/20" : "text-gray-600 hover:text-gray-400"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-600">
            <Filter size={10} />
            <span>Refined View</span>
          </div>
        </div>

        {/* Reviews Grid - Compact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((review, i) => {
              const isExpanded = expandedReviews.has(i);
              const isLong = review.content.length > 150;
              const hasVoted = helpfulVotes[i];

              return (
                <motion.div
                  key={`${review.client}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="p-6 rounded-[1.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all flex flex-col group h-full relative"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 transition-colors">
                        <User size={16} className="text-gray-600 group-hover:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-tight leading-none">{review.client}</h4>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-gray-700 mt-1">{review.company}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={8} className={(review.rating || 5) >= s ? "fill-blue-500 text-blue-500" : "text-white/5"} />
                      ))}
                    </div>
                  </div>

                  <p className={`text-gray-400 text-[13px] leading-relaxed font-light flex-grow ${!isExpanded && isLong ? "line-clamp-3" : ""}`}>
                    &quot;{review.content}&quot;
                  </p>

                  {isLong && (
                    <button 
                      onClick={() => toggleExpand(i)}
                      className="text-blue-500 text-[8px] font-black uppercase tracking-widest mt-3 hover:text-white transition-colors"
                    >
                      {isExpanded ? "Less" : "More"}
                    </button>
                  )}

                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                    <button 
                      onClick={() => handleHelpful(i)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all ${
                        hasVoted ? "bg-blue-600 text-white" : "bg-white/5 text-gray-700 hover:text-gray-400"
                      }`}
                    >
                      <ThumbsUp size={10} />
                      {(review.helpfulCount || 0) + (hasVoted ? 1 : 0)}
                    </button>
                    <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest">
                      {review.date ? new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "Recent"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Compact Load More */}
        {processedTestimonials.length > visibleCount && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-all flex items-center gap-2 mx-auto px-6 py-2 rounded-full border border-white/5 hover:border-white/20"
            >
              Load More <ChevronDown size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Compact Review Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-md bg-[#050810] p-8 rounded-[2rem] relative border border-white/10 shadow-2xl"
            >
              <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 p-2 text-gray-600 hover:text-white">
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-white mb-6">Leave a note.</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" required placeholder="Name" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 text-white" />
                  <input name="company" required placeholder="Company" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 text-white" />
                </div>

                <div className="flex justify-center gap-3 py-4 rounded-xl bg-white/[0.01] border border-white/5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" onClick={() => setRatingFilter(s)} className="hover:scale-110 transition-transform">
                      <Star size={24} className={(ratingFilter || 5) >= s ? "fill-blue-500 text-blue-500" : "text-white/5"} />
                    </button>
                  ))}
                </div>

                <textarea name="review" required rows={3} placeholder="Your feedback..." className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-blue-500/50 text-white resize-none" />

                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2">
                  {isSubmitting ? "Sending..." : "Publish"}
                  <Send size={14} />
                </button>
                
                {status && (
                  <p className={`text-center text-[9px] font-bold uppercase tracking-widest ${statusTone === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
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
