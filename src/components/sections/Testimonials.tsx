"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X, Quote, Send, CheckCircle, MessageSquare } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

interface Review {
  client: string;
  company: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");
  const [rating, setRating] = useState(5);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const allTestimonials = content.testimonials;

  const filteredTestimonials = useMemo(
    () =>
      filterRating
        ? allTestimonials.filter((t) => (t.rating || 5) === filterRating)
        : allTestimonials,
    [allTestimonials, filterRating]
  );

  const totalReviews = allTestimonials.length;
  const averageRating = useMemo(
    () =>
      totalReviews > 0
        ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
        : "0.0",
    [allTestimonials, totalReviews]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const reviewText = String(formData.get("review") ?? "").trim();

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
          message: `${rating} STARS | ${reviewText}`,
          source: "review",
        }),
      });

      if (!response.ok) throw new Error();

      setStatusTone("success");
      setStatus("Thank you! Your review has been submitted for moderation.");
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
      {/* Soft grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <MessageSquare size={14} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Success Stories</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Trusted by Brands <br />
              <span className="text-gray-500">to Build the Future.</span>
            </h2>

            <div className="flex items-center gap-8 mt-12">
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-white leading-none">{averageRating}</span>
                <div className="flex gap-0.5 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={Number(averageRating) >= s ? "fill-amber-400 text-amber-400" : "text-white/10"} />
                  ))}
                </div>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white leading-none">{totalReviews}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">Verified Reviews</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-colors"
            >
              Share Your Story
            </button>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterRating(null)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  filterRating === null ? "bg-white/10 border-white/20 text-white" : "border-white/5 text-gray-500 hover:border-white/10"
                }`}
              >
                All
              </button>
              {[5, 4, 3, 2, 1].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterRating(s)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center gap-1.5 ${
                    filterRating === s ? "bg-amber-400/20 border-amber-400/40 text-amber-400" : "border-white/5 text-gray-500 hover:border-white/10"
                  }`}
                >
                  {s} <Star size={10} className={filterRating === s ? "fill-amber-400" : "fill-none"} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.slice(0, isExpanded ? undefined : 6).map((test, i) => (
              <motion.div
                key={`${test.client}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid relative group"
              >
                <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} className={(test.rating || 5) >= s ? "fill-amber-400 text-amber-400" : "text-white/5"} />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600 border border-white/5 px-2 py-1 rounded-full">Verified</span>
                  </div>
                  
                  <Quote className="text-amber-400/10 mb-4 h-8 w-8" />
                  
                  <p className="text-gray-300 text-base leading-relaxed mb-8 italic font-light">
                    &quot;{test.content}&quot;
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-sm font-bold text-white border border-white/10 group-hover:scale-110 transition-transform">
                      {test.client[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{test.client}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mt-0.5">{test.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTestimonials.length > 6 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-10 py-4 rounded-full border border-white/10 hover:border-white/30 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-all"
            >
              {isExpanded ? "Show Less" : `View All Stories (${filteredTestimonials.length})`}
            </button>
          </div>
        )}

        {filteredTestimonials.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-gray-600 uppercase tracking-widest text-[10px] font-bold">No {filterRating} star reviews yet</p>
          </div>
        )}
      </div>

      {/* Simplified Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0c0c0c] p-10 rounded-[2.5rem] relative border border-white/10"
            >
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold mb-2">Submit Your Review</h3>
              <p className="text-gray-500 text-sm mb-8">Share your experience with the world.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Full Name</label>
                    <input name="name" required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Company</label>
                    <input name="company" required placeholder="e.g. Acme Inc" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setRating(s)} className="transition-transform hover:scale-110">
                        <Star size={24} className={rating >= s ? "fill-amber-400 text-amber-400" : "text-white/10"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Your Feedback</label>
                  <textarea name="review" required rows={4} placeholder="Describe the results we achieved together..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-400/50 resize-none" />
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-amber-400 text-black font-bold text-sm uppercase tracking-widest hover:bg-amber-300 transition-all flex items-center justify-center gap-2">
                    {isSubmitting ? "Submitting..." : "Send Review"} <Send size={16} />
                  </button>
                  
                  {status && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-center text-xs mt-4 ${statusTone === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {status}
                    </motion.p>
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

