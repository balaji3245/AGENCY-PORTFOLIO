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
    <section id="testimonials" className="py-20 bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-gray-800"></span>
              Client Feedback
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
              Trusted by <br className="hidden md:block" /> Industry Leaders
            </h3>
            
            {/* Simple Rating Summary */}
            <div className="flex flex-col sm:flex-row items-center gap-10 p-8 rounded-3xl bg-white/[0.03] border border-white/10">
              <div className="text-center sm:text-left">
                <div className="text-6xl font-bold mb-2">{averageRating}</div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className={`${Number(averageRating) >= s ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} />
                  ))}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{totalReviews} Reviews</div>
              </div>
              
              <div className="flex-1 w-full space-y-2.5">
                {ratingCounts.map(({ star, percentage }) => (
                  <button 
                    key={star}
                    onClick={() => setFilterRating(filterRating === star ? null : star)}
                    className={`flex items-center gap-4 w-full group transition-opacity ${filterRating === star ? "opacity-100" : filterRating ? "opacity-30" : "opacity-100"}`}
                  >
                    <span className="text-[10px] font-bold w-3 text-gray-500">{star}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="h-full bg-yellow-500 rounded-full"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="px-8 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-bold uppercase tracking-widest"
          >
            Share Your Experience
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
              filterRating === null 
                ? "bg-white text-black border-white" 
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
            }`}
          >
            All ({totalReviews})
          </button>
          {[5, 4, 3, 2, 1].map((s) => {
            const count = allTestimonials.filter(t => (t.rating || 5) === s).length;
            if (count === 0 && filterRating !== s) return null;
            return (
              <button
                key={s}
                onClick={() => setFilterRating(s)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border flex items-center gap-2 ${
                  filterRating === s 
                    ? "bg-yellow-500 text-black border-yellow-500" 
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20"
                }`}
              >
                {s} <Star size={12} className={filterRating === s ? "fill-black" : "fill-yellow-500 text-yellow-500"} />
                <span className={`opacity-50`}>({count})</span>
              </button>
            );
          })}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.slice(0, isExpanded ? undefined : 6).map((test, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={i}
                className="bg-white/[0.03] border border-white/5 p-8 rounded-3xl relative group hover:border-white/10 transition-colors"
              >
                <div className="flex gap-0.5 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      className={`${(test.rating || 5) >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-300 font-light mb-8 leading-relaxed line-clamp-5">
                  &quot;{test.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">
                    {test.client[0]}
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm">{test.client}</h5>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{test.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTestimonials.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-gray-500"
            >
              {isExpanded ? "Show Less" : `View All Reviews (${filteredTestimonials.length})`}
            </button>
          </div>
        )}

        {filteredTestimonials.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 uppercase tracking-widest text-[10px] font-bold">
            No {filterRating} star reviews yet
          </div>
        )}
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#0c0c0c] p-8 rounded-3xl relative border border-white/10"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>

              <h4 className="text-xl font-bold mb-1">Write a Review</h4>
              <p className="text-gray-400 text-[11px] mb-6 tracking-wide">Your feedback helps us improve and grow.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Full Name</label>
                    <input 
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Company / Role</label>
                    <input 
                      name="company"
                      required
                      placeholder="e.g. CEO at TechCorp"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Rating</label>
                  <div className="flex gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoveredRating(s)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star 
                          size={20} 
                          className={`${(hoveredRating || rating) >= s ? "text-yellow-500 fill-yellow-500" : "text-gray-700"}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Your Review</label>
                  <textarea 
                    name="review"
                    required
                    rows={3}
                    placeholder="Share your experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <MagneticButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl text-sm"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </MagneticButton>
                  
                  {status && (
                    <p className={`text-center text-xs mt-3 ${statusTone === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {status}
                    </p>
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

