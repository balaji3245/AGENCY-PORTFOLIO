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
  saveContent: (nextContent: SiteContent) => void;
  resetContent: () => void;
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
        setContent(data.content);
      } catch {
        if (!abortController.signal.aborted) {
          setContent(defaultSiteContent);
        }
      }
    }

    loadContent();

    return () => abortController.abort();
  }, []);

  const saveContent = useCallback((nextContent: SiteContent) => {
    setContent(nextContent);
    void fetch("/api/site-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextContent),
    });
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultSiteContent);
    void fetch("/api/site-content", { method: "DELETE" });
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
