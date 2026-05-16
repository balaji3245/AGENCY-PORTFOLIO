"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Mail } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import BrandLogo from "@/components/layout/BrandLogo";

export default function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="bg-transparent pt-32 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-6 inline-flex"
              aria-label="YJ Developers home"
            >
              <BrandLogo imageClassName="h-16" />
            </Link>
            <p className="text-gray-400 font-light max-w-sm mb-8">
              {content.brand.footerDescription}
            </p>
            <div className="flex gap-4 mb-10">
              {[
                { icon: Instagram, href: "https://instagram.com/yjdevelopers", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com/company/yj-developers", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com/yjdevelopers", label: "Twitter" },
                { icon: Mail, href: `mailto:${content.brand.email}`, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
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
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-white transition-colors">
                  Our Team
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
                  href="#process"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Our Process <ArrowUpRight size={14} />
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
