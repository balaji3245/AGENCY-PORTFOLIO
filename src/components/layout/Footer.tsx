"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="border-t border-white/5 pt-20 pb-10 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <span className="font-display font-black text-black text-sm tracking-tight">YJ</span>
              </div>
              <span className="font-display font-bold text-white tracking-tight text-base">
                Developers
              </span>
            </div>
            <p className="text-[#52525b] text-sm font-light leading-relaxed max-w-xs mb-8">
              {content.brand.footerDescription}
            </p>
            <a
              href={`mailto:${content.brand.email}`}
              className="inline-flex items-center gap-2 text-sm text-[#71717a] hover:text-white transition-colors duration-200"
            >
              {content.brand.email}
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3b3b3b] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Work", href: "#work" },
                { label: "Services", href: "#services" },
                { label: "About", href: "#about" },
                { label: "Process", href: "#process" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#52525b] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#3b3b3b] mb-6">Connect</h4>
            <ul className="space-y-3">
              {[
                { label: "Start a Project", href: "/start-project" },
                { label: "View Case Studies", href: "#work" },
                { label: content.brand.phone, href: `tel:${content.brand.phone.replace(/\s/g, "")}` },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#52525b] hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3b3b3b]">
            &copy; {new Date().getFullYear()} {content.brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#policies" className="text-xs text-[#3b3b3b] hover:text-[#71717a] transition-colors">Privacy Policy</Link>
            <Link href="#policies" className="text-xs text-[#3b3b3b] hover:text-[#71717a] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
