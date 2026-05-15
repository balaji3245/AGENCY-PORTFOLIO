"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";

type SiteContentContextValue = {
  content: SiteContent;
  saveContent: (nextContent: SiteContent) => Promise<boolean>;
  resetContent: () => Promise<boolean>;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export default function SiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadContent() {
      try {
        const response = await fetch("/api/site-content", {
          cache: "no-store",
          signal: abortController.signal,
        });

        if (!response.ok) return;

        const data = (await response.json()) as { content: SiteContent };
        setContent({
          ...data.content,
          brand: {
            ...defaultSiteContent.brand,
            ...data.content.brand,
          },
        });
      } catch {
        if (!abortController.signal.aborted) {
          setContent(defaultSiteContent);
        }
      }
    }

    loadContent();

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const theme = content.theme || defaultSiteContent.theme;

    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--background", theme.background);
    root.style.setProperty("--foreground", theme.foreground);
    root.style.setProperty("--card", theme.card);
    root.style.setProperty("--border", theme.border);
    
    // Font handling
    let fontValue = "var(--font-inter)";
    if (theme.fontFamily === "Outfit") fontValue = "var(--font-outfit)";
    if (theme.fontFamily === "Plus Jakarta Sans") fontValue = "var(--font-jakarta)";
    
    root.style.setProperty("--font-inter", fontValue);
  }, [content.theme]);



  const saveContent = useCallback(async (nextContent: SiteContent) => {
    try {
      const response = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent),
      });

      if (!response.ok) {
        throw new Error("Failed to save content to server");
      }

      setContent(nextContent);
      return true;
    } catch (error) {
      console.error("Save error:", error);
      return false;
    }
  }, []);

  const resetContent = useCallback(async () => {
    try {
      const response = await fetch("/api/site-content", { method: "DELETE" });
      if (response.ok) {
        setContent(defaultSiteContent);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Reset error:", error);
      return false;
    }
  }, []);


  const value = useMemo(
    () => ({ content, saveContent, resetContent }),
    [content, resetContent, saveContent]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) {
    throw new Error("useSiteContent must be used inside SiteContentProvider");
  }
  return value;
}
