"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, Star, X } from "lucide-react";
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
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const allTestimonials = (content.testimonials as any[]).map(t => ({
    ...t,
    rating: t.rating || 5 // Default to 5 for old testimonials
  })) as Review[];

  const filteredTestimonials = filterRating 
    ? allTestimonials.filter(t => t.rating === filterRating)
    : allTestimonials;

  // Rating Stats (Play Store style)
  const totalReviews = allTestimonials.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allTestimonials.filter(t => t.rating === star).length,
    percentage: totalReviews > 0 ? (allTestimonials.filter(t => t.rating === star).length / totalReviews) * 100 : 0
  }));

  const averageRating = totalReviews > 0 
    ? (allTestimonials.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
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
          message: `${rating} STARS | ${content}`, // Prepend rating to message for now since DB is fixed schema
          source: "review" 
        }),
      });

      if (!response.ok) throw new Error();

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
    <section className="py-16 bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="max-w-xl">
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Client Feedback</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Do not just take <br className="hidden md:block" /> our word for it.
            </h3>
            
            {/* Play Store Style Rating Summary */}
            <div className="flex flex-col sm:flex-row items-center gap-8 p-8 rounded-[2rem] bg-white/[0.03] border border-white/10">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{averageRating}</div>
                <div className="flex gap-1 justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} className={`${Number(averageRating) >= s ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} />
                  ))}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{totalReviews} Reviews</div>
              </div>
              
              <div className="flex-1 w-full space-y-2">
                {ratingCounts.map(({ star, percentage }) => (
                  <button 
                    key={star}
                    onClick={() => setFilterRating(filterRating === star ? null : star)}
                    className={`flex items-center gap-4 w-full group ${filterRating === star ? "opacity-100" : filterRating ? "opacity-40" : "opacity-100"}`}
                  >
                    <span className="text-xs font-bold w-3">{star}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
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
            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
          >
            Share Your Experience
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((test, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className="glass p-8 rounded-[2.5rem] relative group hover:border-white/20 transition-all duration-500"
            >
              <Quote className="text-white/5 w-10 h-10 absolute top-8 right-8" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={14} 
                    className={`${test.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} 
                  />
                ))}
              </div>
              <p className="text-base text-gray-300 font-light mb-8 leading-relaxed italic line-clamp-4">
                &quot;{test.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold text-gradient">
                  {test.client[0]}
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">{test.client}</h5>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredTestimonials.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 uppercase tracking-[0.2em] text-xs">
              No {filterRating} star reviews yet
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card p-8 md:p-10 rounded-[2.5rem] relative"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <h4 className="text-2xl font-bold mb-2">Write a Review</h4>
              <p className="text-gray-400 text-sm mb-8">Your feedback helps us improve and grow.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Full Name</label>
                  <input 
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Company / Role</label>
                  <input 
                    name="company"
                    required
                    placeholder="CEO at TechCorp"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Rating</label>
                  <div className="flex gap-2 p-4 bg-white/5 rounded-2xl border border-white/10">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoveredRating(s)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-125"
                      >
                        <Star 
                          size={32} 
                          className={`${(hoveredRating || rating) >= s ? "text-yellow-500 fill-yellow-500" : "text-gray-600"} transition-colors`} 
                        />
                      </button>
                    ))}
                    <span className="ml-auto text-xs font-bold text-gray-400 self-center uppercase tracking-widest">
                      {rating === 5 ? "Excellent" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Your Review</label>
                  <textarea 
                    name="review"
                    required
                    rows={4}
                    placeholder="Tell us about your experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/30 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <MagneticButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"} <Send size={16} />
                  </MagneticButton>
                  
                  {status && (
                    <p className={`text-center text-sm ${statusTone === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
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

