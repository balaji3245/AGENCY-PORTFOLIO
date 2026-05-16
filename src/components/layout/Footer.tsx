"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import BrandLogo from "@/components/layout/BrandLogo";

export default function Footer() {
  const { content } = useSiteContent();

  const socialLinks = [
    { 
      label: "Instagram", 
      href: "https://instagram.com/yjdevelopers", 
      icon: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      )
    },
    { 
      label: "LinkedIn", 
      href: "https://linkedin.com/company/yj-developers", 
      icon: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      )
    },
    { 
      label: "Twitter", 
      href: "https://twitter.com/yjdevelopers", 
      icon: (props: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      )
    },
    { 
      label: "Email", 
      href: `mailto:${content.brand.email}`, 
      icon: (props: any) => <Mail size={18} {...props} /> 
    },
  ];

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
            
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-500 group"
                  aria-label={social.label}
                >
                  <social.icon className="transition-transform duration-500 group-hover:scale-110" />
                </a>
              ))}
            </div>
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
