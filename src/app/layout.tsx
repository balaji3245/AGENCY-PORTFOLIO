import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import SiteContentProvider from "@/components/SiteContentProvider";
import MovingBackground from "@/components/ui/MovingBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://yjdevelopers.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "YJ DEVELOPERS | Digital, Creative, Web & Branding Agency",
    template: "%s | YJ DEVELOPERS",
  },
  description:
    "YJ DEVELOPERS builds websites, brand systems, digital campaigns, and creative experiences for ambitious businesses.",
  applicationName: "YJ DEVELOPERS",
  keywords: [
    "YJ DEVELOPERS",
    "web development agency",
    "branding agency",
    "digital agency",
    "creative agency",
    "Next.js websites",
  ],
  authors: [{ name: "YJ DEVELOPERS" }],
  creator: "YJ DEVELOPERS",
  openGraph: {
    title: "YJ DEVELOPERS | Digital, Creative, Web & Branding Agency",
    description:
      "Websites, brand systems, digital campaigns, and creative experiences for ambitious businesses.",
    url: "/",
    siteName: "YJ DEVELOPERS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YJ DEVELOPERS | Digital, Creative, Web & Branding Agency",
    description:
      "Websites, brand systems, digital campaigns, and creative experiences for ambitious businesses.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/yj-mark.svg",
    shortcut: "/yj-mark.svg",
    apple: "/yj-mark.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased`}>
        <MovingBackground />
        <div className="noise-bg"></div>
        <CustomCursor />
        <SiteContentProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </SiteContentProvider>
      </body>
    </html>
  );
}
