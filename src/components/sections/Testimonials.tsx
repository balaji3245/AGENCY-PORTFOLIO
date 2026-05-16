"use client";

import { useState, type FormEvent } from "react";
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
  const filteredTestimonials = filterRating
    ? allTestimonials.filter((testimonial) => (testimonial.rating || 5) === filterRating)
    : allTestimonials;

  const totalReviews = allTestimonials.length;
  const averageRating =
    totalReviews > 0
      ? (allTestimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1)
      : "0.0";

  const ratingCounts = reviewFilters.map((star) => {
    const count = allTestimonials.filter((testimonial) => (testimonial.rating || 5) === star).length;

    return {
      star,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    };
  });

  const visibleTestimonials = filteredTestimonials.slice(0, isExpanded ? filteredTestimonials.length : 6);

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
      setStatus("Thank you. Your review is now waiting for moderation.");
      form.reset();
      setRating(5);
      setHoveredRating(0);
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
    <section id="testimonials" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute bottom-8 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]" />

      <div className="container relative mx-auto px-6 md:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-300/70" />
              <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-cyan-200/80">
                Client Proof
              </p>
            </div>
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">
              Real notes from brands after the launch dust settles.
            </h2>
          </div>

          <div className="glass-card relative overflow-hidden rounded-[2rem] p-6 md:p-7">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
                  Average sentiment
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-6xl font-black leading-none tracking-tighter text-white">
                    {averageRating}
                  </span>
                  <span className="pb-2 text-sm font-medium text-gray-400">out of 5</span>
                </div>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        Number(averageRating) >= star ? "fill-amber-300 text-amber-300" : "text-white/15"
                      }
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowForm(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-cyan-200"
              >
                Add yours
                <Send size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="relative mt-7 space-y-2">
              {ratingCounts.map(({ star, count, percentage }) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(filterRating === star ? null : star)}
                  className={`grid w-full grid-cols-[28px_1fr_34px] items-center gap-3 rounded-xl px-2 py-1.5 transition-all ${
                    filterRating === star
                      ? "bg-white/10 text-white"
                      : filterRating
                        ? "text-white/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-left text-[10px] font-bold">{star}x</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="block h-full rounded-full bg-gradient-to-r from-amber-300 to-cyan-200"
                    />
                  </span>
                  <span className="text-right text-[10px] font-bold">{count}</span>
                </button>
              ))}
            </div>
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

        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                className={`group relative min-h-[280px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050914]/80 p-7 shadow-2xl shadow-black/20 backdrop-blur ${
                  index % 3 === 0 ? "md:-translate-y-3" : ""
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Quote className="absolute right-6 top-6 text-white/[0.04]" size={74} />

                <div className="relative flex h-full flex-col">
                  <div className="mb-9 flex items-center justify-between">
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

                  <p className="mb-10 text-lg font-light leading-relaxed tracking-[-0.02em] text-gray-200 line-clamp-5">
                    {testimonial.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <h3 className="text-sm font-bold text-white">{testimonial.client}</h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-sm font-black text-black">
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
              {isExpanded ? "Show fewer notes" : `Open the full proof board (${filteredTestimonials.length})`}
            </button>
          </div>
        )}

        {filteredTestimonials.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] py-16 text-center text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">
            No {filterRating} star reviews yet
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#050914] p-6 shadow-2xl md:p-8"
            >
              <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-amber-300/10 blur-3xl" />

              <button
                onClick={() => setShowForm(false)}
                className="absolute right-5 top-5 z-10 rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close review form"
              >
                <X size={18} />
              </button>

              <div className="relative">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200/80">
                  Share feedback
                </p>
                <h4 className="text-2xl font-black tracking-[-0.04em] text-white">Leave a field note.</h4>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
                  Tell us what changed after working together. We review submissions before publishing.
                </p>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.24em] text-gray-500">
                        Full name
                      </span>
                      <input
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-200/70"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.24em] text-gray-500">
                        Company / role
                      </span>
                      <input
                        name="company"
                        required
                        placeholder="Brand or role"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-200/70"
                      />
                    </label>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-[0.24em] text-gray-500">
                        Rating
                      </span>
                      <span className="text-xs font-bold text-amber-200">{rating}/5</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="rounded-xl p-1 transition-transform hover:scale-110"
                          aria-label={`Set rating to ${star}`}
                        >
                          <Star
                            size={24}
                            className={
                              (hoveredRating || rating) >= star
                                ? "fill-amber-300 text-amber-300"
                                : "text-white/15"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.24em] text-gray-500">
                      Your review
                    </span>
                    <textarea
                      name="review"
                      required
                      rows={4}
                      placeholder="What did the project help you achieve?"
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white outline-none transition-colors placeholder:text-gray-600 focus:border-cyan-200/70"
                    />
                  </label>

                  <div className="pt-2">
                    <MagneticButton type="submit" disabled={isSubmitting} className="w-full rounded-2xl py-4 text-sm">
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </MagneticButton>

                    {status && (
                      <p
                        className={`mt-4 flex items-center justify-center gap-2 text-center text-xs ${
                          statusTone === "success" ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        {statusTone === "success" && <CheckCircle size={14} />}
                        {status}
                      </p>
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
