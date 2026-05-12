"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic Website",
    price: "₹5k",
    description: "Perfect for establishing a professional online presence.",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "1 Month Free Support",
    ],
  },
  {
    name: "Business Website",
    price: "₹15k",
    description: "Advanced features and custom animations for growing brands.",
    recommended: true,
    features: [
      "Up to 10 Pages",
      "Custom Animations (GSAP/Framer)",
      "CMS Integration",
      "Advanced SEO & Analytics",
      "3 Months Free Support",
      "Performance Optimization",
    ],
  },
  {
    name: "Ecommerce",
    price: "₹30k+",
    description: "Full-scale online stores built for high conversion.",
    features: [
      "Unlimited Products",
      "Custom Cart & Checkout",
      "Payment Gateway Setup",
      "Inventory Management",
      "User Accounts",
      "6 Months Free Support",
    ],
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Investment</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Transparent pricing.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative glass-card p-8 rounded-3xl flex flex-col ${
                plan.recommended ? "border-white/30 scale-105 md:-mt-4 md:mb-4 bg-white/5" : ""
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              
              <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
              </div>
              
              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 bg-white/10 p-1 rounded-full text-white">
                      <Check size={12} />
                    </div>
                    <span className="text-gray-300 font-light text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <MagneticButton 
                variant={plan.recommended ? "primary" : "outline"} 
                className="w-full"
              >
                Choose Plan
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
