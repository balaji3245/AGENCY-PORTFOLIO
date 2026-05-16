"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Quote, Send, Star, X } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import MagneticButton from "@/components/ui/MagneticButton";

interface Review {
  client: string;
  company: string;
  content: string;
  rating: number;
  isDynamic?: boolean;
}

const reviewFilters = [5, 4, 3, 2, 1];

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

  const filteredTestimonials = useMemo(
    () =>
      filterRating
        ? allTestimonials.filter((testimonial) => (testimonial.rating || 5) === filterRating)
        : allTestimonials,
    [allTestimonials, filterRating],
  );

  const totalReviews = allTestimonials.length;
  const averageRating = useMemo(
    () =>
      totalReviews > 0
        ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
        : "0.0",
    [allTestimonials, totalReviews],
  );

  const ratingCounts = useMemo(
    () =>
      reviewFilters.map((star) => {
        const count = allTestimonials.filter((testimonial) => (testimonial.rating || 5) === star).length;
        return {
          star,
          count,
          percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
        };
      }),
    [allTestimonials, totalReviews],
  );

  const visibleTestimonials = filteredTestimonials.slice(0, isExpanded ? filteredTestimonials.length : 6);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const reviewText = String(formData.get("review") ?? "").trim();

    if (!name || !email || !company || !reviewText) {
      setStatusTone("error");
      setStatus("Please complete every field before sending your review.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: company,
          message: `${rating} STARS | ${reviewText}`,
          source: "review",
        }),
      });

      if (!response.ok) throw new Error();

      setStatusTone("success");
      setStatus("Review received. We will review it before publishing.");
      form.reset();
      setRating(5);
      setHoveredRating(0);
    } catch {
      setStatusTone("error");
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.3fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan-300/70" />
              <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-cyan-200/80">
                Client proof
              </p>
            </div>
            <h2 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
              Honest client reviews for every launch and long-term growth.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300">
              See trusted feedback from real clients, browse ratings by category, and share your results. Every review is moderated before it appears on the site.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-white/10 bg-[#060d19]/80 p-8 shadow-2xl shadow-black/15 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300/80">
                    Current rating
                  </p>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-black tracking-[-0.04em] text-white md:text-6xl">
                      {averageRating}
                    </span>
                    <span className="pb-2 text-sm font-medium text-gray-400">/ 5 average</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-white/5 px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.22em] text-gray-300">
                  {totalReviews} reviews
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={Number(averageRating) >= star ? "fill-amber-300 text-amber-300" : "text-white/20"}
                  />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {ratingCounts.map(({ star, count, percentage }) => (
                  <div key={star} className="grid grid-cols-[40px_1fr_48px] items-center gap-3">
                    <span className="text-sm font-bold text-gray-300">{star}★</span>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-300 to-cyan-300"
                      />
                    </div>
                    <span className="text-right text-sm font-semibold text-gray-300">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-[#060d19]/80 p-6 shadow-2xl shadow-black/15 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/80">
                    Share feedback
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">Submit a review</h3>
                </div>
                <div className="rounded-3xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-300">
                  Moderated only
                </div>
              </div>

              <p className="text-sm leading-7 text-gray-400">
                Share your experience with a quick review. We screen submissions before publishing to keep every testimonial genuine.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-3xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
              >
                Share feedback
                <Send size={16} />
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 20 }}
                    className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#050914] p-6 shadow-2xl"
                  >
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="absolute right-5 top-5 rounded-full border border-white/10 p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
                      aria-label="Close review form"
                    >
                      <X size={18} />
                    </button>

                    <div className="mb-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200/80">
                        Leave feedback
                      </p>
                      <h4 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">Tell us about the project.</h4>
                      <p className="mt-2 text-sm leading-7 text-gray-400">
                        Use the review form to share impact, results, and your role. We’ll approve the best stories for the testimonial board.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block space-y-2 text-sm text-gray-300">
                          <span className="font-semibold uppercase tracking-[0.18em] text-gray-400">Name</span>
                          <input
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
                          />
                        </label>

                        <label className="block space-y-2 text-sm text-gray-300">
                          <span className="font-semibold uppercase tracking-[0.18em] text-gray-400">Email</span>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
                          />
                        </label>
                      </div>

                      <label className="block space-y-2 text-sm text-gray-300">
                        <span className="font-semibold uppercase tracking-[0.18em] text-gray-400">Company / role</span>
                        <input
                          name="company"
                          required
                          placeholder="Brand name or title"
                          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
                        />
                      </label>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 flex items-center justify-between text-sm text-gray-400">
                          <span className="font-semibold uppercase tracking-[0.18em]">Rating</span>
                          <span className="font-semibold text-amber-200">{rating}/5</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="rounded-2xl p-2 transition-transform hover:scale-110"
                              aria-label={`Set rating to ${star}`}
                            >
                              <Star
                                size={26}
                                className={
                                  (hoveredRating || rating) >= star
                                    ? "fill-amber-300 text-amber-300"
                                    : "text-white/20"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <label className="block space-y-2 text-sm text-gray-300">
                        <span className="font-semibold uppercase tracking-[0.18em] text-gray-400">Your review</span>
                        <textarea
                          name="review"
                          required
                          rows={4}
                          placeholder="What did the project help you achieve?"
                          className="w-full resize-none rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/60 focus:bg-white/10"
                        />
                      </label>

                      <div className="space-y-3">
                        <MagneticButton type="submit" disabled={isSubmitting} className="w-full rounded-3xl py-4 text-sm font-black uppercase tracking-[0.12em]">
                          {isSubmitting ? "Submitting..." : "Send review"}
                        </MagneticButton>

                        {status && (
                          <p className={`text-center text-sm ${statusTone === "success" ? "text-emerald-300" : "text-red-300"}`}>
                            {statusTone === "success" && <CheckCircle size={14} className="inline-block mr-2" />}
                            {status}
                          </p>
                        )}
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setFilterRating(null)}
            className={`rounded-full border px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.22em] transition-all ${
              filterRating === null
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/30 hover:text-white"
            }`}
          >
            All voices ({totalReviews})
          </button>

          {reviewFilters.map((star) => {
            const count = ratingCounts.find((item) => item.star === star)?.count ?? 0;
            if (count === 0 && filterRating !== star) return null;

            return (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] transition-all ${
                  filterRating === star
                    ? "border-amber-300 bg-amber-300 text-black"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-amber-300/50 hover:text-white"
                }`}
              >
                {star}
                <Star size={12} className={filterRating === star ? "fill-black" : "fill-amber-300 text-amber-300"} />
                <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.client}-${index}`}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050914]/80 p-7 shadow-2xl shadow-black/20 backdrop-blur ${
                  index % 3 === 0 ? "md:-translate-y-3" : ""
                }`}
              >
                <Quote className="absolute right-6 top-6 text-white/[0.04]" size={74} />
                <div className="relative flex h-full flex-col">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            (testimonial.rating || 5) >= star
                              ? "fill-amber-300 text-amber-300"
                              : "text-white/15"
                          }
                        />
                      ))}
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                      Verified
                    </span>
                  </div>

                  <p className="mb-10 text-lg leading-8 text-gray-200">{testimonial.content}</p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-sm text-gray-300">
                    <div>
                      <h3 className="text-sm font-bold text-white">{testimonial.client}</h3>
                      <p className="mt-1 uppercase tracking-[0.24em] text-gray-500">{testimonial.company}</p>
                    </div>
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-sm font-black text-black">
                      {testimonial.client.charAt(0)}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTestimonials.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full border border-white/10 px-8 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400 transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              {isExpanded ? "Show fewer reviews" : `View all reviews (${filteredTestimonials.length})`}
            </button>
          </div>
        )}

        {filteredTestimonials.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] py-16 text-center text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">
            No {filterRating} star reviews yet
          </div>
        )}
      </div>
    </section>
  );
}
