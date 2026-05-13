"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
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

function readStoredContent() {
  return window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY) ?? "";
}

function notifyContentSubscribers() {
  window.dispatchEvent(new Event("site-content-change"));
}

export default function SiteContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscribe = useCallback((listener: () => void) => {
    window.addEventListener("storage", listener);
    window.addEventListener("site-content-change", listener);
    return () => {
      window.removeEventListener("storage", listener);
      window.removeEventListener("site-content-change", listener);
    };
  }, []);

  const storedContent = useSyncExternalStore(subscribe, readStoredContent, () => "");

  const content = useMemo(() => {
    if (!storedContent) return defaultSiteContent;
    try {
      return JSON.parse(storedContent) as SiteContent;
    } catch {
      window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
      return defaultSiteContent;
    }
  }, [storedContent]);

  const saveContent = useCallback((nextContent: SiteContent) => {
    window.localStorage.setItem(
      SITE_CONTENT_STORAGE_KEY,
      JSON.stringify(nextContent)
    );
    notifyContentSubscribers();
  }, []);

  const resetContent = useCallback(() => {
    window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
    notifyContentSubscribers();
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
