"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Save, RotateCcw, Plus, Trash2, ExternalLink, LogOut, X, Star } from "lucide-react";
import { logout, verifyPassword } from "@/app/admin/actions";
import {
  defaultSiteContent,
  type IconName,
  type SiteContent,
} from "@/lib/siteContent";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { ContactSubmission } from "@/lib/contactSubmissions";
import BrandLogo from "@/components/layout/BrandLogo";

const iconOptions: IconName[] = [
  "megaphone",
  "palette",
  "monitor",
  "penTool",
  "globe",
  "smartphone",
  "search",
  "server",
  "zap",
  "utensils",
  "dumbbell",
  "stethoscope",
  "store",
  "building",
  "shoppingBag",
  "graduationCap",
  "briefcase",
  "sparkles",
];

const adminNavigation = [
  { href: "#leads", label: "Leads", hint: "Form submissions" },
  { href: "#brand", label: "Brand", hint: "Name, email, phone" },
  { href: "#theme", label: "Theme", hint: "Colors and fonts" },
  { href: "#hero", label: "Hero", hint: "First screen copy" },

  { href: "#about", label: "About", hint: "Intro and proof points" },
  { href: "#services", label: "Services", hint: "Service cards" },
  { href: "#tech-stack", label: "Tech", hint: "Tools and platforms" },
  { href: "#portfolio", label: "Projects", hint: "Case study cards" },
  { href: "#team", label: "Team", hint: "Capability cards" },
  { href: "#testimonials", label: "Reviews", hint: "Client quotes" },
  { href: "#process", label: "Process", hint: "Workflow steps" },
  { href: "#policies", label: "Policies", hint: "Terms and delivery" },
  { href: "#contact", label: "Contact", hint: "CTA and contact info" },
];


function cloneContent(content: SiteContent) {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

function Section({
  id,
  title,
  description,
  visible,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  visible: boolean;
  children: React.ReactNode;
}) {
  if (!visible) return null;

  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[24px] border border-white/10 bg-black/30 p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-gray-400">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/8 ${
        props.className ?? ""
      }`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/8 ${
        props.className ?? ""
      }`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/8 ${
        props.className ?? ""
      }`}
    />
  );
}

function FileUploadField({
  label,
  hint,
  onUpload,
  uploading,
}: {
  label: string;
  hint?: string;
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
        {label}
      </span>
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await onUpload(file);
          e.currentTarget.value = "";
        }}
        className="block w-full rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
      />
      <p className="text-xs text-gray-500">
        {uploading ? "Uploading image..." : hint ?? "Upload an image file."}
      </p>
    </label>
  );
}

function SecondaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

export default function AdminPanel() {
  const { content, saveContent, resetContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(() => cloneContent(content));
  const [status, setStatus] = useState("Unsaved changes can be edited here.");
  const [activeSection, setActiveSection] = useState<string>("#brand");
  const [showSavePrompt, setShowSavePrompt] = useState<boolean>(false);
  const [savePassword, setSavePassword] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(
    []
  );
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [leadsTab, setLeadsTab] = useState<"contact" | "start-project">("contact");
  const [adminReviewFilter, setAdminReviewFilter] = useState<number | null>(null);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  const portfolioCategories = useMemo(() => {
    return Array.from(new Set(draft.portfolio.items.map((p) => p.category)));
  }, [draft.portfolio.items]);

  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string | null>(null);

  // Initialize active category if not set
  useEffect(() => {
    if (!activePortfolioCategory && portfolioCategories.length > 0) {
      setActivePortfolioCategory(portfolioCategories[0]);
    }
  }, [portfolioCategories, activePortfolioCategory]);

  const uploadImage = useCallback(
    async (file: File, folder: "brand" | "portfolio") => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Upload failed.");
      }

      return data.url;
    },
    []
  );

  const refreshContactSubmissions = useCallback(async () => {
    try {
      const response = await fetch("/api/contact-submissions", {
        cache: "no-store",
      });

      if (!response.ok) {
        setIsLoadingLeads(false);
        return;
      }

      const data = (await response.json()) as {
        submissions: ContactSubmission[];
      };
      setContactSubmissions(data.submissions || []);
    } catch {
      setContactSubmissions([]);
    } finally {
      setIsLoadingLeads(false);
    }
  }, []);

  useEffect(() => {
    const syncDraft = window.setTimeout(() => {
      setDraft(cloneContent(content));
    }, 0);

    return () => window.clearTimeout(syncDraft);
  }, [content]);

  useEffect(() => {
    const timeoutId = window.setTimeout(refreshContactSubmissions, 0);
    const intervalId = window.setInterval(refreshContactSubmissions, 5000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [refreshContactSubmissions]);

  const save = () => {
    if (!draft.brand.name.trim() || !draft.brand.email.trim()) {
      setStatus("Agency name and email are required before saving.");
      return;
    }

    if (!draft.services.items.length || !draft.portfolio.items.length) {
      setStatus("Keep at least one service and one portfolio item before saving.");
      return;
    }

    setShowSavePrompt(true);
    setSavePassword("");
  };

  const confirmSave = async () => {
    if (!savePassword) return;
    setIsVerifying(true);
    const isCorrect = await verifyPassword(savePassword);
    setIsVerifying(false);

    if (isCorrect) {
      const next = cloneContent(draft);
      const success = await saveContent(next);
      
      if (success) {
        setDraft(next);
        setStatus("Changes saved. Homepage preview is now updated.");
      } else {
        setStatus("Error: Database update failed. Please check your connection.");
      }
      setShowSavePrompt(false);
    } else {

      setStatus("Incorrect password. Cannot save changes.");
      setShowSavePrompt(false);
    }
  };

  const reset = () => {
    const next = cloneContent(defaultSiteContent);
    resetContent();
    setDraft(next);
    setStatus("Content reset to default YJ DEVELOPERS data.");
  };

  const goToSection = (sectionId: string) => {
    setActiveSection(sectionId);

    window.requestAnimationFrame(() => {
      document
        .querySelector(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const removeContactSubmission = async (id: string) => {
    await fetch(`/api/contact-submissions?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    await refreshContactSubmissions();
    setStatus("Lead deleted from admin panel.");
  };

  const removeAllContactSubmissions = async () => {
    await fetch("/api/contact-submissions", { method: "DELETE" });
    await refreshContactSubmissions();
    setStatus("All leads cleared from admin panel.");
  };

  return (
    <div className="admin-panel min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(78,91,135,0.25),_transparent_35%),linear-gradient(180deg,_#060606_0%,_#0b0b0d_100%)] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 rounded-[28px] border border-white/10 bg-black/30 p-6 shadow-2xl shadow-black/20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <BrandLogo imageClassName="mb-5 h-16" />
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">
              YJ DEVELOPERS Admin
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Portfolio control panel
            </h1>
            <p className="mt-3 text-sm text-gray-400 md:text-base">
              Website ke public content ko section-wise edit karo. Left menu se
              area choose karo, changes karne ke baad Save Changes dabao, aur
              homepage turant updated content use karega.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10"
            >
              Open Website <ExternalLink size={16} />
            </Link>
            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-200 transition hover:bg-red-500/20"
            >
              Logout <LogOut size={16} />
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm transition hover:bg-white/10"
            >
              Reset <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Save Changes <Save size={16} />
            </button>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50">
          {status}
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside className="rounded-[24px] border border-white/10 bg-black/30 p-4 lg:sticky lg:top-8 lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto">
            <p className="px-3 pb-3 text-xs font-medium uppercase tracking-[0.22em] text-gray-500">
              Edit Sections
            </p>
            <nav className="grid gap-1 pr-1">
              {adminNavigation.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onClick={() => goToSection(item.href)}
                  className={`group rounded-2xl px-3 py-3 text-left transition ${
                    activeSection === item.href
                      ? "bg-white text-black"
                      : "hover:bg-white/8"
                  }`}
                >
                  <span
                    className={`block text-sm font-medium ${
                      activeSection === item.href ? "text-black" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`mt-0.5 block text-xs ${
                      activeSection === item.href
                        ? "text-black/60"
                        : "text-gray-500 group-hover:text-gray-400"
                    }`}
                  >
                    {item.hint}
                  </span>
                </button>
              ))}
            </nav>
            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs leading-5 text-cyan-50">
              Tip: pehle ek section edit karo, phir Save Changes. Reset poora
              content default par le aayega.
            </div>
          </aside>

          <div className="grid gap-6">
          <Section id="leads" title="Leads & Reviews" description="All form submissions from the website, separated by source." visible={activeSection === "#leads"}>
            {/* Tab toggle */}
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
              {(["contact", "start-project"] as const).map((tab) => {
                const count = contactSubmissions.filter((s) => (s.source ?? "contact") === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setLeadsTab(tab);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      leadsTab === tab ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "contact" ? "📩 Contact" : "🚀 Project"}
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      leadsTab === tab ? "bg-black/10 text-black" : "bg-white/10 text-gray-300"
                    }`}>{count}</span>
                  </button>
                );
              })}
            </div>


            {/* Header row */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between mt-6">
              <div>
                <p className="text-lg font-medium">
                  {contactSubmissions.filter((s) => (s.source ?? "contact") === leadsTab).length}{" "}
                  {leadsTab === "contact" ? "contact message" : "project brief"}
                  {contactSubmissions.filter((s) => (s.source ?? "contact") === leadsTab).length === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Newest first.
                </p>
              </div>
              <SecondaryButton
                onClick={removeAllContactSubmissions}
                disabled={!contactSubmissions.length}
                className={!contactSubmissions.length ? "cursor-not-allowed opacity-50" : ""}
              >
                <Trash2 size={14} /> Clear All
              </SecondaryButton>
            </div>

            {isLoadingLeads ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 p-12 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent mb-4" />
                <p className="text-sm text-gray-400">Fetching leads from storage...</p>
              </div>
            ) : contactSubmissions.filter((s) => (s.source ?? "contact") === leadsTab).length ? (
              <div className="grid gap-4">
                {contactSubmissions
                  .filter((s) => (s.source ?? "contact") === leadsTab)
                  .map((submission) => {
                    return (
                      <article
                        key={submission.id}
                        className={`rounded-2xl border p-4 ${
                          leadsTab === "start-project"
                            ? "border-cyan-400/20 bg-cyan-400/5"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                            leadsTab === "start-project" ? "bg-cyan-400/20 text-cyan-300" : "bg-white/10 text-gray-300"
                          }`}>
                            {leadsTab === "start-project" ? "🚀 Project Brief" : "📩 Contact"}
                          </span>
                          <span className="text-xs text-gray-500" suppressHydrationWarning>
                            {new Date(submission.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{submission.name}</h3>
                            <a
                              href={`mailto:${submission.email}`}
                              className="text-sm text-cyan-300 transition hover:text-cyan-100"
                            >
                              {submission.email}
                            </a>
                            {submission.phone && (
                              <a
                                href={`tel:${submission.phone.replace(/\s/g, "")}`}
                                className="mt-1 block text-sm text-gray-300 transition hover:text-white"
                              >
                                {submission.phone}
                              </a>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <SecondaryButton
                              onClick={() => removeContactSubmission(submission.id)}
                            >
                              <Trash2 size={14} /> Delete
                            </SecondaryButton>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-gray-300">
                          {submission.message}
                        </p>
                      </article>
                    );
                  })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-gray-400">
                No {leadsTab === "contact" ? "contact form" : "project brief"} submissions yet.
              </div>
            )}
          </Section>

          <Section id="brand" title="Brand" description="Navbar, footer, email, phone, and global business details." visible={activeSection === "#brand"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Agency Name">
                <Input
                  value={draft.brand.name}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, name: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Email">
                <Input
                  value={draft.brand.email}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, email: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={draft.brand.phone}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, phone: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Full Logo Path / URL">
                <Input
                  value={draft.brand.logo ?? defaultSiteContent.brand.logo}
                  placeholder="/yj-logo.svg or https://example.com/logo.png"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, logo: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                    Full Logo Preview
                  </p>
                  <img
                    src={draft.brand.logo ?? defaultSiteContent.brand.logo}
                    alt="Full logo preview"
                    className="h-14 w-auto max-w-full object-contain"
                  />
                </div>
                <FileUploadField
                  label="Upload Full Logo"
                  hint="Uploads to Supabase Storage and fills the logo URL automatically."
                  uploading={uploadingTarget === "brand-logo"}
                  onUpload={async (file) => {
                    try {
                      setUploadingTarget("brand-logo");
                      const url = await uploadImage(file, "brand");
                      setDraft((current) => ({
                        ...current,
                        brand: { ...current.brand, logo: url },
                      }));
                      setStatus("Full logo uploaded. Save Changes to publish it.");
                    } catch (error) {
                      setStatus(
                        error instanceof Error ? error.message : "Logo upload failed."
                      );
                    } finally {
                      setUploadingTarget(null);
                    }
                  }}
                />
              </div>
              <Field label="Header Mark Path / URL">
                <Input
                  value={draft.brand.mark ?? defaultSiteContent.brand.mark}
                  placeholder="/yj-mark.svg or https://example.com/mark.png"
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      brand: { ...draft.brand, mark: e.target.value },
                    })
                  }
                />
              </Field>
              <div className="space-y-3">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                    Header Mark Preview
                  </p>
                  <img
                    src={draft.brand.mark ?? defaultSiteContent.brand.mark}
                    alt="Header mark preview"
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <FileUploadField
                  label="Upload Header Mark"
                  hint="Use this for the compact icon shown in the navbar."
                  uploading={uploadingTarget === "brand-mark"}
                  onUpload={async (file) => {
                    try {
                      setUploadingTarget("brand-mark");
                      const url = await uploadImage(file, "brand");
                      setDraft((current) => ({
                        ...current,
                        brand: { ...current.brand, mark: url },
                      }));
                      setStatus("Header mark uploaded. Save Changes to publish it.");
                    } catch (error) {
                      setStatus(
                        error instanceof Error ? error.message : "Header mark upload failed."
                      );
                    } finally {
                      setUploadingTarget(null);
                    }
                  }}
                />
              </div>
            </div>
            <Field label="Footer Description">
              <Textarea
                rows={3}
                value={draft.brand.footerDescription}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    brand: {
                      ...draft.brand,
                      footerDescription: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </Section>

          <Section id="theme" title="Theme" description="Customize website colors and typography." visible={activeSection === "#theme"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary Color">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.primary || "#4B7DFF"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, primary: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.primary || "#4B7DFF"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, primary: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Accent Color">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.accent || "#A15BFF"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, accent: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.accent || "#A15BFF"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, accent: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Background Color">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.background || "#030612"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, background: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.background || "#030612"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, background: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Text Color">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.foreground || "#ffffff"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, foreground: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.foreground || "#ffffff"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, foreground: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Card Background">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.card || "#060b19"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, card: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.card || "#060b19"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, card: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Border Color">
                <div className="flex gap-2">
                  <Input
                    type="color"
                    className="h-11 w-20 p-1"
                    value={draft.theme?.border || "#141d33"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, border: e.target.value },
                      })
                    }
                  />
                  <Input
                    value={draft.theme?.border || "#141d33"}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        theme: { ...draft.theme, border: e.target.value },
                      })
                    }
                  />
                </div>
              </Field>
              <Field label="Font Family">
                <Select
                  value={draft.theme?.fontFamily || "Inter"}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      theme: { ...draft.theme, fontFamily: e.target.value },
                    })
                  }
                >
                  <option value="Inter">Inter (Sans)</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Outfit">Outfit</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Geist">Geist</option>
                </Select>
              </Field>
            </div>
          </Section>


          <Section id="hero" title="Hero" description="Homepage ka first screen: badge, headline, description, and buttons." visible={activeSection === "#hero"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Badge">
                <Input
                  value={draft.hero.badge}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, badge: e.target.value } })
                  }
                />
              </Field>
              <Field label="Title">
                <Input
                  value={draft.hero.title}
                  onChange={(e) =>
                    setDraft({ ...draft, hero: { ...draft.hero, title: e.target.value } })
                  }
                />
              </Field>
              <Field label="Highlight">
                <Input
                  value={draft.hero.highlight}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, highlight: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Primary CTA">
                <Input
                  value={draft.hero.primaryCta}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, primaryCta: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Secondary CTA">
                <Input
                  value={draft.hero.secondaryCta}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      hero: { ...draft.hero, secondaryCta: e.target.value },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Description">
              <Textarea
                rows={4}
                value={draft.hero.description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    hero: { ...draft.hero, description: e.target.value },
                  })
                }
              />
            </Field>
          </Section>

          <Section id="about" title="About" description="Business intro, highlighted words, proof points, and about paragraphs." visible={activeSection === "#about"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={draft.about.eyebrow}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, eyebrow: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Highlighted Words">
                <Input
                  value={draft.about.highlightedWord}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: {
                        ...draft.about,
                        highlightedWord: e.target.value,
                      },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Title">
              <Input
                value={draft.about.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    about: { ...draft.about, title: e.target.value },
                  })
                }
              />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              {draft.about.stats.map((stat, index) => (
                <div key={index} className="rounded-2xl border border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-gray-300">About Stat {index + 1}</p>
                    <SecondaryButton
                      onClick={() =>
                        setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            stats: draft.about.stats.filter((_, i) => i !== index),
                          },
                        })
                      }
                    >
                      <Trash2 size={14} />
                    </SecondaryButton>
                  </div>
                  <Field label="Value">
                    <Input
                      value={stat.value}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            stats: draft.about.stats.map((item, i) =>
                              i === index ? { ...item, value: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Label">
                    <Input
                      value={stat.label}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          about: {
                            ...draft.about,
                            stats: draft.about.stats.map((item, i) =>
                              i === index ? { ...item, label: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  about: {
                    ...draft.about,
                    stats: [...draft.about.stats, { value: "0", label: "New Stat" }],
                  },
                })
              }
            >
              <Plus size={14} /> Add About Stat
            </SecondaryButton>
            {draft.about.paragraphs.map((paragraph, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Paragraph {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        about: {
                          ...draft.about,
                          paragraphs: draft.about.paragraphs.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <Textarea
                  rows={4}
                  value={paragraph}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: {
                        ...draft.about,
                        paragraphs: draft.about.paragraphs.map((item, i) =>
                          i === index ? e.target.value : item
                        ),
                      },
                    })
                  }
                />
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  about: {
                    ...draft.about,
                    paragraphs: [...draft.about.paragraphs, "New about paragraph"],
                  },
                })
              }
            >
              <Plus size={14} /> Add Paragraph
            </SecondaryButton>
          </Section>

          <Section id="services" title="Services" description="Public service cards with icon, title, and short description." visible={activeSection === "#services"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={draft.services.eyebrow}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, eyebrow: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Main Title">
                <Input
                  value={draft.services.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, title: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Muted Title">
                <Input
                  value={draft.services.mutedTitle}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      services: { ...draft.services, mutedTitle: e.target.value },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Section Description">
              <Textarea
                rows={3}
                value={draft.services.description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    services: {
                      ...draft.services,
                      description: e.target.value,
                    },
                  })
                }
              />
            </Field>
            {draft.services.items.map((service, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Service {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        services: {
                          ...draft.services,
                          items: draft.services.items.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Title">
                    <Input
                      value={service.title}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          services: {
                            ...draft.services,
                            items: draft.services.items.map((item, i) =>
                              i === index ? { ...item, title: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Icon">
                    <Select
                      value={service.icon}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          services: {
                            ...draft.services,
                            items: draft.services.items.map((item, i) =>
                              i === index
                                ? { ...item, icon: e.target.value as IconName }
                                : item
                            ),
                          },
                        })
                      }
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    rows={3}
                    value={service.description}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        services: {
                          ...draft.services,
                          items: draft.services.items.map((item, i) =>
                            i === index
                              ? { ...item, description: e.target.value }
                              : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  services: {
                    ...draft.services,
                    items: [
                      ...draft.services.items,
                      {
                        title: "New Service",
                        description: "Service description",
                        icon: "monitor",
                      },
                    ],
                  },
                })
              }
            >
              <Plus size={14} /> Add Service
            </SecondaryButton>
          </Section>

          <Section id="tech-stack" title="Tech Stack" description="Technologies and platforms shown in the moving stack section." visible={activeSection === "#tech-stack"}>
            <Field label="Eyebrow">
              <Input
                value={draft.techStack.eyebrow}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    techStack: { ...draft.techStack, eyebrow: e.target.value },
                  })
                }
              />
            </Field>
            {draft.techStack.items.map((tech, index) => (
              <div key={index} className="flex gap-3">
                <Input
                  value={tech}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      techStack: {
                        ...draft.techStack,
                        items: draft.techStack.items.map((item, i) =>
                          i === index ? e.target.value : item
                        ),
                      },
                    })
                  }
                />
                <SecondaryButton
                  onClick={() =>
                    setDraft({
                      ...draft,
                      techStack: {
                        ...draft.techStack,
                        items: draft.techStack.items.filter((_, i) => i !== index),
                      },
                    })
                  }
                >
                  <Trash2 size={14} />
                </SecondaryButton>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  techStack: {
                    ...draft.techStack,
                    items: [...draft.techStack.items, "New Tech"],
                  },
                })
              }
            >
              <Plus size={14} /> Add Tech
            </SecondaryButton>
          </Section>

          <Section id="portfolio" title="Portfolio Projects" description="Select a service category first to view or add projects." visible={activeSection === "#portfolio"}>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 p-2 rounded-2xl border border-white/10 bg-white/[0.03]">
              {portfolioCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActivePortfolioCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    activePortfolioCategory === category
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newCat = "New Service";
                  setDraft({
                    ...draft,
                    portfolio: {
                      ...draft.portfolio,
                      items: [
                        ...draft.portfolio.items,
                        {
                          title: "New Project",
                          category: newCat,
                          description: "Description",
                          tech: [],
                          image: "/projects/branding.png",
                          link: "#",
                          color: "from-zinc-900/40 to-black",
                        },
                      ],
                    },
                  });
                  setActivePortfolioCategory(newCat);
                }}
                className="px-6 py-3 rounded-xl text-sm font-bold border border-dashed border-white/20 text-gray-500 hover:text-white hover:border-white/40 transition-all"
              >
                <Plus size={14} className="inline mr-2" /> New Category
              </button>
            </div>

            {/* Project List for Active Category */}
            <div className="space-y-8">
              {draft.portfolio.items.map((project, originalIndex) => {
                if (project.category !== activePortfolioCategory) return null;
                return (
                  <div key={originalIndex} className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            portfolio: {
                              ...draft.portfolio,
                              items: draft.portfolio.items.filter((_, i) => i !== originalIndex),
                            },
                          })
                        }
                        className="p-3 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                      <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <Field label="Project Title">
                            <Input
                              value={project.title}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  portfolio: {
                                    ...draft.portfolio,
                                    items: draft.portfolio.items.map((item, i) =>
                                      i === originalIndex ? { ...item, title: e.target.value } : item
                                    ),
                                  },
                                })
                              }
                            />
                          </Field>
                          <Field label="Category Label">
                            <Input
                              value={project.category}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  portfolio: {
                                    ...draft.portfolio,
                                    items: draft.portfolio.items.map((item, i) =>
                                      i === originalIndex
                                        ? { ...item, category: e.target.value }
                                        : item
                                    ),
                                  },
                                })
                              }
                            />
                          </Field>
                        </div>

                        <Field label="Case Study Description">
                          <Textarea
                            rows={4}
                            value={project.description}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                portfolio: {
                                  ...draft.portfolio,
                                  items: draft.portfolio.items.map((item, i) =>
                                    i === originalIndex
                                      ? { ...item, description: e.target.value }
                                      : item
                                  ),
                                },
                              })
                            }
                          />
                        </Field>

                        <div className="grid gap-6 md:grid-cols-2">
                          <Field label="Gradient Colors (Tailwind)">
                            <Input
                              value={project.color}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  portfolio: {
                                    ...draft.portfolio,
                                    items: draft.portfolio.items.map((item, i) =>
                                      i === originalIndex ? { ...item, color: e.target.value } : item
                                    ),
                                  },
                                })
                              }
                            />
                          </Field>
                          <Field label="Direct Link">
                            <Input
                              value={project.link}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  portfolio: {
                                    ...draft.portfolio,
                                    items: draft.portfolio.items.map((item, i) =>
                                      i === originalIndex ? { ...item, link: e.target.value } : item
                                    ),
                                  },
                                })
                              }
                            />
                          </Field>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-4">Technology Stack</p>
                          <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech, techIndex) => (
                              <div key={techIndex} className="flex items-center gap-2 bg-white/5 border border-white/5 pl-4 pr-2 py-1.5 rounded-xl">
                                <input
                                  value={tech}
                                  className="bg-transparent text-sm focus:outline-none w-24"
                                  onChange={(e) =>
                                    setDraft({
                                      ...draft,
                                      portfolio: {
                                        ...draft.portfolio,
                                        items: draft.portfolio.items.map((item, i) =>
                                          i === originalIndex
                                            ? {
                                                ...item,
                                                tech: item.tech.map((t, ti) =>
                                                  ti === techIndex ? e.target.value : t
                                                ),
                                              }
                                            : item
                                        ),
                                      },
                                    })
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDraft({
                                      ...draft,
                                      portfolio: {
                                        ...draft.portfolio,
                                        items: draft.portfolio.items.map((item, i) =>
                                          i === originalIndex
                                            ? {
                                                ...item,
                                                tech: item.tech.filter((_, ti) => ti !== techIndex),
                                              }
                                            : item
                                        ),
                                      },
                                    })
                                  }
                                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                setDraft({
                                  ...draft,
                                  portfolio: {
                                    ...draft.portfolio,
                                    items: draft.portfolio.items.map((item, i) =>
                                      i === originalIndex
                                        ? { ...item, tech: [...item.tech, "New Tag"] }
                                        : item
                                    ),
                                  },
                                })
                              }
                              className="px-4 py-1.5 rounded-xl border border-dashed border-white/20 text-xs text-gray-500 hover:text-white hover:border-white/40 transition-all"
                            >
                              <Plus size={12} className="inline mr-1" /> Add Tag
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Field label="Project Thumbnail">
                          <Input
                            value={project.image}
                            placeholder="/projects/image.jpg"
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                portfolio: {
                                  ...draft.portfolio,
                                  items: draft.portfolio.items.map((item, i) =>
                                    i === originalIndex ? { ...item, image: e.target.value } : item
                                  ),
                                },
                              })
                            }
                          />
                        </Field>
                        <div className="aspect-video w-full rounded-2xl border border-white/10 bg-black/40 overflow-hidden relative group/img">
                          <img
                            src={project.image}
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center p-6">
                            <FileUploadField
                              label="Upload New Image"
                              uploading={uploadingTarget === `portfolio-${originalIndex}`}
                              onUpload={async (file) => {
                                try {
                                  setUploadingTarget(`portfolio-${originalIndex}`);
                                  const url = await uploadImage(file, "portfolio");
                                  setDraft((current) => ({
                                    ...current,
                                    portfolio: {
                                      ...current.portfolio,
                                      items: current.portfolio.items.map((item, i) =>
                                        i === originalIndex ? { ...item, image: url } : item
                                      ),
                                    },
                                  }));
                                } finally {
                                  setUploadingTarget(null);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {activePortfolioCategory && (
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      portfolio: {
                        ...draft.portfolio,
                        items: [
                          ...draft.portfolio.items,
                          {
                            title: "New " + activePortfolioCategory + " Project",
                            category: activePortfolioCategory,
                            description: "Project description goes here.",
                            tech: ["React", "Next.js"],
                            image: "/projects/branding.png",
                            link: "#",
                            color: "from-blue-900/40 to-black",
                          },
                        ],
                      },
                    })
                  }
                  className="w-full py-10 rounded-[32px] border-2 border-dashed border-cyan-400/20 bg-cyan-400/5 text-cyan-400 font-bold hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all flex flex-col items-center justify-center gap-3"
                >
                  <div className="p-4 rounded-full bg-cyan-400/20">
                    <Plus size={24} />
                  </div>
                  Add New {activePortfolioCategory} Case Study
                </button>
              )}
            </div>
          </Section>

          <Section id="team" title="Team Capabilities" description="Capability cards. No employee photos are required here." visible={activeSection === "#team"}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={draft.team.eyebrow}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      team: { ...draft.team, eyebrow: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="Section Title">
                <Input
                  value={draft.team.title}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      team: { ...draft.team, title: e.target.value },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Section Description">
              <Textarea
                rows={3}
                value={draft.team.description}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    team: { ...draft.team, description: e.target.value },
                  })
                }
              />
            </Field>
            {draft.team.members.map((member, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Team Capability {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        team: {
                          ...draft.team,
                          members: draft.team.members.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <Input
                      value={member.name}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, name: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Role (e.g. Frontend Developer)">
                    <Input
                      value={member.role}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, role: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="Intro (short description about the person)">
                  <Textarea
                    rows={3}
                    value={member.intro || ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        team: {
                          ...draft.team,
                          members: draft.team.members.map((item, i) =>
                            i === index ? { ...item, intro: e.target.value } : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Accent Gradient Classes">
                  <Input
                    value={member.image}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        team: {
                          ...draft.team,
                          members: draft.team.members.map((item, i) =>
                            i === index ? { ...item, image: e.target.value } : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <Field label="Email ID">
                    <Input
                      value={member.email || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, email: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Portfolio Link">
                    <Input
                      value={member.portfolio || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, portfolio: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="GitHub Link">
                    <Input
                      value={member.github || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, github: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="LinkedIn Link">
                    <Input
                      value={member.linkedin || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, linkedin: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="ArtStation Link">
                    <Input
                      value={member.artstation || ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index ? { ...item, artstation: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Skills (comma separated)">
                    <Input
                      value={member.skills ? member.skills.join(", ") : ""}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          team: {
                            ...draft.team,
                            members: draft.team.members.map((item, i) =>
                              i === index
                                ? { ...item, skills: e.target.value.split(",").map(s => s.trim()) }
                                : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  team: {
                    ...draft.team,
                    members: [
                      ...draft.team.members,
                      {
                        name: "New Member",
                        role: "Role / Title",
                        intro: "Short intro about this person.",
                        image: "from-zinc-400 to-slate-500",
                        email: "",
                        portfolio: "",
                        github: "",
                        linkedin: "",
                        artstation: "",
                        skills: [],
                      },
                    ],
                  },
                })
              }
            >
              <Plus size={14} /> Add Capability
            </SecondaryButton>
          </Section>

          <Section id="testimonials" title="Reviews Management" description="Directly posted reviews from the website. Admin can only delete inappropriate reviews." visible={activeSection === "#testimonials"}>
            <div className="grid gap-4">
              {draft.testimonials.length > 0 ? (
                draft.testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4 relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className={(testimonial.rating || 5) >= s ? "fill-yellow-500 text-yellow-500" : "text-white/5"} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{testimonial.client}</span>
                        <span className="text-xs text-gray-500">— {testimonial.company}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            testimonials: draft.testimonials.filter((_, i) => i !== index),
                          })
                        }
                        className="rounded-full p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all"
                        title="Delete Review"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
                      {testimonial.date ? new Date(testimonial.date).toLocaleDateString() : "Recently Posted"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                  <p className="text-gray-500 text-sm">No reviews found.</p>
                </div>
              )}
            </div>
          </Section>

          <Section id="process" title="Process" description="Step-by-step delivery workflow shown on the homepage." visible={activeSection === "#process"}>
            {draft.process.map((step, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Step {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        process: draft.process.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Number">
                    <Input
                      value={step.num}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          process: draft.process.map((item, i) =>
                            i === index ? { ...item, num: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </Field>
                  <Field label="Title">
                    <Input
                      value={step.title}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          process: draft.process.map((item, i) =>
                            i === index ? { ...item, title: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    rows={3}
                    value={step.desc}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        process: draft.process.map((item, i) =>
                          i === index ? { ...item, desc: e.target.value } : item
                        ),
                      })
                    }
                  />
                </Field>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  process: [
                    ...draft.process,
                    { num: "00", title: "New Step", desc: "Step description" },
                  ],
                })
              }
            >
              <Plus size={14} /> Add Step
            </SecondaryButton>
          </Section>




          <Section id="policies" title="Policies" description="Payment, delivery, revision, refund, and other policy content." visible={activeSection === "#policies"}>
            <Field label="Section Title">
              <Input
                value={draft.policies.title}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    policies: { ...draft.policies, title: e.target.value },
                  })
                }
              />
            </Field>
            {draft.policies.items.map((policy, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Policy {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        policies: {
                          ...draft.policies,
                          items: draft.policies.items.filter((_, i) => i !== index),
                        },
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <Field label="Policy Title">
                  <Input
                    value={policy.title}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        policies: {
                          ...draft.policies,
                          items: draft.policies.items.map((item, i) =>
                            i === index ? { ...item, title: e.target.value } : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <Field label="Content">
                  <Textarea
                    rows={4}
                    value={policy.content}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        policies: {
                          ...draft.policies,
                          items: draft.policies.items.map((item, i) =>
                            i === index
                              ? { ...item, content: e.target.value }
                              : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  policies: {
                    ...draft.policies,
                    items: [
                      ...draft.policies.items,
                      { title: "New Policy", content: "Policy details" },
                    ],
                  },
                })
              }
            >
              <Plus size={14} /> Add Policy
            </SecondaryButton>
          </Section>

          <Section id="contact" title="Contact" description="Final call-to-action copy and contact section details." visible={activeSection === "#contact"}>
            <div className="grid gap-6">
              <div className="space-y-4 rounded-2xl border border-white/10 p-4">
                <Field label="Eyebrow">
                  <Input
                    value={draft.contact.eyebrow}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: { ...draft.contact, eyebrow: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={draft.contact.title}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: { ...draft.contact, title: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Highlight">
                  <Input
                    value={draft.contact.highlight}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: { ...draft.contact, highlight: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Description">
                  <Textarea
                    rows={4}
                    value={draft.contact.description}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {
                          ...draft.contact,
                          description: e.target.value,
                        },
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          </Section>
        </div>
      </div>
      
      {/* Password Prompt Modal */}
      {showSavePrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl relative">
            <button 
              onClick={() => setShowSavePrompt(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-2">Confirm Save</h3>
            <p className="text-gray-400 text-sm mb-6">Enter admin password to save your changes to the live site.</p>
            <Field label="Admin Password">
              <Input
                type="password"
                value={savePassword}
                onChange={(e) => setSavePassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmSave();
                }}
                autoFocus
              />
            </Field>
            <div className="mt-6 flex justify-end gap-3">
              <SecondaryButton onClick={() => setShowSavePrompt(false)}>
                Cancel
              </SecondaryButton>
              <button
                type="button"
                onClick={confirmSave}
                disabled={isVerifying || !savePassword}
                className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-black transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {isVerifying ? "Verifying..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
