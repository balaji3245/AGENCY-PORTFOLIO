"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="bg-[#050505] pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tighter mb-6 block"
            >
              {content.brand.name}
              <span className="text-gray-500">.</span>
            </Link>
            <p className="text-gray-400 font-light max-w-sm mb-8">
              {content.brand.footerDescription}
            </p>
            <a
              href={`mailto:${content.brand.email}`}
              className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            >
              {content.brand.email}
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4 font-light text-gray-400">
              <li>
                <Link href="#work" className="hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Connect</h4>
            <ul className="space-y-4 font-light text-gray-400">
              <li>
                <Link
                  href="#contact"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Start a Project <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link
                  href="#work"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Case Studies <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${content.brand.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Call {content.brand.phone} <ArrowUpRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {content.brand.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#policies" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#policies" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
