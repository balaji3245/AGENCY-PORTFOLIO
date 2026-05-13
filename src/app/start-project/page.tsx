"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Send } from "lucide-react";
import BrandLogo from "@/components/layout/BrandLogo";

const services = [
  "Website Design & Development",
  "Mobile App Development",
  "UI/UX Design",
  "Brand Identity & Logo",
  "SEO & Digital Marketing",
  "E-Commerce Store",
  "Admin Dashboard / CRM",
  "API & Backend Development",
  "Performance Optimization",
  "Other",
];

const budgets = [
  "Under ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP (Less than 2 weeks)",
  "1 Month",
  "2–3 Months",
  "3–6 Months",
  "Flexible / No rush",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  referral: string;
};

const STEPS = ["About You", "Services", "Budget & Timeline", "Project Details"];

export default function StartProjectPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    services: [],
    budget: "",
    timeline: "",
    description: "",
    referral: "",
  });

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.name.trim() && form.email.trim();
    if (step === 1) return form.services.length > 0;
    if (step === 2) return form.budget && form.timeline;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch("/api/contact-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          source: "start-project",
          message: `
Company: ${form.company || "N/A"}
Services: ${form.services.join(", ")}
Budget: ${form.budget}
Timeline: ${form.timeline}
Description: ${form.description || "N/A"}
How did you hear about us: ${form.referral || "N/A"}
          `.trim(),
        }),
      });
      setSubmitted(true);
    } catch {
      // Still show success to user
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060606] text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-cyan-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">We&apos;ve got your brief!</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Thank you, <span className="text-white font-medium">{form.name}</span>. Our team will review your project details and get back to you within 24 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-5 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <BrandLogo imageClassName="h-8" />
        <div className="text-xs text-gray-500">Step {step + 1} of {STEPS.length}</div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                i < step ? "bg-cyan-400 text-black" : i === step ? "bg-white text-black" : "bg-white/10 text-gray-500"
              }`}>
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block transition-colors ${i === step ? "text-white" : "text-gray-600"}`}>{s}</span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px transition-colors ${i < step ? "bg-cyan-400/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0 — About You */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-2">Let&apos;s get started</h1>
              <p className="text-gray-400 mb-8">Tell us a bit about yourself first.</p>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name *</label>
                    <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600" placeholder="Ravi Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
                    <input type="email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600" placeholder="ravi@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                    <input type="tel" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Company / Brand Name</label>
                    <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600" placeholder="My Startup" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1 — Services */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-2">What do you need?</h1>
              <p className="text-gray-400 mb-8">Select all services that apply to your project.</p>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all duration-200 ${
                      form.services.includes(s)
                        ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {form.services.includes(s) && <CheckCircle size={14} className="flex-shrink-0" />}
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Budget & Timeline */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-2">Budget & Timeline</h1>
              <p className="text-gray-400 mb-8">This helps us suggest the right plan for you.</p>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">Budget Range *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgets.map((b) => (
                      <button key={b} type="button" onClick={() => setForm({ ...form, budget: b })}
                        className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all duration-200 ${
                          form.budget === b
                            ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20"
                        }`}
                      >{b}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">Expected Timeline *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timelines.map((t) => (
                      <button key={t} type="button" onClick={() => setForm({ ...form, timeline: t })}
                        className={`rounded-2xl border px-4 py-3 text-sm text-left transition-all duration-200 ${
                          form.timeline === t
                            ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20"
                        }`}
                      >{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — Project Details */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h1 className="text-3xl font-bold mb-2">Tell us more</h1>
              <p className="text-gray-400 mb-8">The more detail you give, the better we can help.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Description</label>
                  <textarea
                    rows={5}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600 resize-none"
                    placeholder="Describe your project, goals, target audience, any references or specific features you need..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">How did you hear about us?</label>
                  <input
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 focus:bg-white/8 transition placeholder-gray-600"
                    placeholder="Google, Instagram, Friend referral..."
                    value={form.referral}
                    onChange={(e) => setForm({ ...form, referral: e.target.value })}
                  />
                </div>

                {/* Summary */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2 text-sm">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Your Brief Summary</p>
                  <p><span className="text-gray-500">Name:</span> <span className="text-white">{form.name}</span></p>
                  <p><span className="text-gray-500">Email:</span> <span className="text-white">{form.email}</span></p>
                  <p><span className="text-gray-500">Services:</span> <span className="text-white">{form.services.join(", ")}</span></p>
                  <p><span className="text-gray-500">Budget:</span> <span className="text-white">{form.budget}</span></p>
                  <p><span className="text-gray-500">Timeline:</span> <span className="text-white">{form.timeline}</span></p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-medium text-sm hover:bg-cyan-300 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Brief"} <Send size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
