"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, Star, X } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Testimonials() {
  const { content } = useSiteContent();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"success" | "error">("success");

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
          email: `${name.toLowerCase().replace(/\s/g, ".")}@review.temp`, // Dummy email
          phone: company, // Use phone field for company
          message: content, 
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
    <section className="py-16 bg-transparent relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Client Feedback</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
              Do not just take <br className="hidden md:block" /> our word for it.
            </h3>
          </div>
          
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
          >
            Share Your Experience
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.map((test, i) => (
            <motion.div
              key={`${test.client}-${test.company}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-10 rounded-3xl relative"
            >
              <Quote className="text-white/10 w-12 h-12 absolute top-8 right-8" />
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-lg text-gray-300 font-light mb-8 leading-relaxed">
                &quot;{test.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
                  {test.client[0]}
                </div>
                <div>
                  <h5 className="font-semibold">{test.client}</h5>
                  <p className="text-sm text-gray-500">{test.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
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

