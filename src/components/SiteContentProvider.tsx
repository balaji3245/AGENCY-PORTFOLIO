"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  defaultSiteContent,
  SITE_CONTENT_STORAGE_KEY,
  type SiteContent,
} from "@/lib/siteContent";

type SiteContentContextValue = {
  content: SiteContent;
  saveContent: (nextContent: SiteContent) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export default function SiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window === "undefined") return defaultSiteContent;
    const stored = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!stored) return defaultSiteContent;

    try {
      return JSON.parse(stored) as SiteContent;
    } catch {
      window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
      return defaultSiteContent;
    }
  });

  const saveContent = useCallback((nextContent: SiteContent) => {
    setContent(nextContent);
    window.localStorage.setItem(
      SITE_CONTENT_STORAGE_KEY,
      JSON.stringify(nextContent)
    );
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultSiteContent);
    window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
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
