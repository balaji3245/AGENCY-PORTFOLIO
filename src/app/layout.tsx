import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import SiteContentProvider from "@/components/SiteContentProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "YJ DEVELOPERS | Digital, Creative, Web & Branding Agency",
  description:
    "YJ DEVELOPERS builds websites, brand systems, digital campaigns, and creative experiences for ambitious businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="noise-bg"></div>
        <CustomCursor />
        <SiteContentProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </SiteContentProvider>
      </body>
    </html>
  );
}
