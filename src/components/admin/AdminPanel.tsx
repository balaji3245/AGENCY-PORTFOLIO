"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Save, RotateCcw, Plus, Trash2, ExternalLink } from "lucide-react";
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
  { href: "#hero", label: "Hero", hint: "First screen copy" },
  { href: "#about", label: "About", hint: "Intro and proof points" },
  { href: "#services", label: "Services", hint: "Service cards" },
  { href: "#tech-stack", label: "Tech", hint: "Tools and platforms" },
  { href: "#portfolio", label: "Projects", hint: "Case study cards" },
  { href: "#stats", label: "Stats", hint: "Number counters" },
  { href: "#team", label: "Team", hint: "Capability cards" },
  { href: "#testimonials", label: "Reviews", hint: "Client quotes" },
  { href: "#process", label: "Process", hint: "Workflow steps" },
  { href: "#industries", label: "Industries", hint: "Business categories" },
  { href: "#policies", label: "Policies", hint: "Terms and delivery" },
  { href: "#contact-vision", label: "Contact", hint: "CTA and vision" },
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
  const [activeSection, setActiveSection] = useState("#leads");
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>(
    []
  );

  const refreshContactSubmissions = useCallback(async () => {
    try {
      const response = await fetch("/api/contact-submissions", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = (await response.json()) as {
        submissions: ContactSubmission[];
      };
      setContactSubmissions(data.submissions);
    } catch {
      setContactSubmissions([]);
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

    const next = cloneContent(draft);
    saveContent(next);
    setDraft(next);
    setStatus("Changes saved. Homepage preview is now updated.");
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
          <Section id="leads" title="Leads" description="Contact form submissions from the website." visible={activeSection === "#leads"}>
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-medium">
                  {contactSubmissions.length} submission
                  {contactSubmissions.length === 1 ? "" : "s"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Newest messages appear first.
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

            {contactSubmissions.length ? (
              <div className="grid gap-4">
                {contactSubmissions.map((submission) => (
                  <article
                    key={submission.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{submission.name}</h3>
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-sm text-cyan-300 transition hover:text-cyan-100"
                        >
                          {submission.email}
                        </a>
                        <a
                          href={`tel:${submission.phone.replace(/\s/g, "")}`}
                          className="mt-1 block text-sm text-gray-300 transition hover:text-white"
                        >
                          {submission.phone}
                        </a>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <SecondaryButton
                        onClick={() => removeContactSubmission(submission.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </SecondaryButton>
                    </div>
                    <p className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-gray-300">
                      {submission.message}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-gray-400">
                No contact form submissions yet.
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

          <Section id="portfolio" title="Portfolio Projects" description="Case study cards shown in the work section." visible={activeSection === "#portfolio"}>
            {draft.portfolio.items.map((project, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Project {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        portfolio: {
                          ...draft.portfolio,
                          items: draft.portfolio.items.filter((_, i) => i !== index),
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
                      value={project.title}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          portfolio: {
                            ...draft.portfolio,
                            items: draft.portfolio.items.map((item, i) =>
                              i === index ? { ...item, title: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Category">
                    <Input
                      value={project.category}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          portfolio: {
                            ...draft.portfolio,
                            items: draft.portfolio.items.map((item, i) =>
                              i === index
                                ? { ...item, category: e.target.value }
                                : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                  <Field label="Gradient Colors">
                    <Input
                      value={project.color}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          portfolio: {
                            ...draft.portfolio,
                            items: draft.portfolio.items.map((item, i) =>
                              i === index ? { ...item, color: e.target.value } : item
                            ),
                          },
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <Textarea
                    rows={3}
                    value={project.description}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        portfolio: {
                          ...draft.portfolio,
                          items: draft.portfolio.items.map((item, i) =>
                            i === index
                              ? { ...item, description: e.target.value }
                              : item
                          ),
                        },
                      })
                    }
                  />
                </Field>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                    Tech Tags
                  </p>
                  {project.tech.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-3">
                      <Input
                        value={tech}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            portfolio: {
                              ...draft.portfolio,
                              items: draft.portfolio.items.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      tech: item.tech.map((tag, j) =>
                                        j === techIndex ? e.target.value : tag
                                      ),
                                    }
                                  : item
                              ),
                            },
                          })
                        }
                      />
                      <SecondaryButton
                        onClick={() =>
                          setDraft({
                            ...draft,
                            portfolio: {
                              ...draft.portfolio,
                              items: draft.portfolio.items.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      tech: item.tech.filter((_, j) => j !== techIndex),
                                    }
                                  : item
                              ),
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
                        portfolio: {
                          ...draft.portfolio,
                          items: draft.portfolio.items.map((item, i) =>
                            i === index
                              ? { ...item, tech: [...item.tech, "New Tech"] }
                              : item
                          ),
                        },
                      })
                    }
                  >
                    <Plus size={14} /> Add Tech Tag
                  </SecondaryButton>
                </div>
              </div>
            ))}
            <SecondaryButton
              onClick={() =>
                setDraft({
                  ...draft,
                  portfolio: {
                    ...draft.portfolio,
                    items: [
                      ...draft.portfolio.items,
                      {
                        title: "New Project",
                        category: "Category",
                        description: "Project summary",
                        tech: ["Next.js"],
                        color: "from-zinc-800/40 to-black",
                      },
                    ],
                  },
                })
              }
            >
              <Plus size={14} /> Add Project
            </SecondaryButton>
          </Section>

          <Section id="stats" title="Stats" description="Animated number counters used as quick proof points." visible={activeSection === "#stats"}>
            {draft.stats.map((stat, index) => (
              <div key={index} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-[1fr_1fr_140px_auto]">
                <Input
                  value={String(stat.value)}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      stats: draft.stats.map((item, i) =>
                        i === index
                          ? { ...item, value: Number(e.target.value) || 0 }
                          : item
                      ),
                    })
                  }
                />
                <Input
                  value={stat.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      stats: draft.stats.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item
                      ),
                    })
                  }
                />
                <Input
                  value={stat.suffix}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      stats: draft.stats.map((item, i) =>
                        i === index ? { ...item, suffix: e.target.value } : item
                      ),
                    })
                  }
                />
                <SecondaryButton
                  onClick={() =>
                    setDraft({
                      ...draft,
                      stats: draft.stats.filter((_, i) => i !== index),
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
                  stats: [...draft.stats, { value: 0, label: "New Stat", suffix: "" }],
                })
              }
            >
              <Plus size={14} /> Add Stat
            </SecondaryButton>
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
                  <Field label="Capability Title">
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
                  <Field label="Description">
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
                        name: "New Capability",
                        role: "Describe what this part of the team handles.",
                        image: "from-zinc-400 to-slate-500",
                      },
                    ],
                  },
                })
              }
            >
              <Plus size={14} /> Add Capability
            </SecondaryButton>
          </Section>

          <Section id="testimonials" title="Testimonials" description="Client quotes and review cards." visible={activeSection === "#testimonials"}>
            {draft.testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-white/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Testimonial {index + 1}</p>
                  <SecondaryButton
                    onClick={() =>
                      setDraft({
                        ...draft,
                        testimonials: draft.testimonials.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <Trash2 size={14} /> Remove
                  </SecondaryButton>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Client">
                    <Input
                      value={testimonial.client}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          testimonials: draft.testimonials.map((item, i) =>
                            i === index ? { ...item, client: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </Field>
                  <Field label="Company">
                    <Input
                      value={testimonial.company}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          testimonials: draft.testimonials.map((item, i) =>
                            i === index ? { ...item, company: e.target.value } : item
                          ),
                        })
                      }
                    />
                  </Field>
                </div>
                <Field label="Quote">
                  <Textarea
                    rows={4}
                    value={testimonial.content}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        testimonials: draft.testimonials.map((item, i) =>
                          i === index ? { ...item, content: e.target.value } : item
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
                  testimonials: [
                    ...draft.testimonials,
                    {
                      client: "New Client",
                      company: "Company",
                      content: "Testimonial content",
                    },
                  ],
                })
              }
            >
              <Plus size={14} /> Add Testimonial
            </SecondaryButton>
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

          <Section id="industries" title="Industries" description="Industry cards shown for the types of clients you serve." visible={activeSection === "#industries"}>
            {draft.industries.map((industry, index) => (
              <div key={index} className="grid gap-4 rounded-2xl border border-white/10 p-4 md:grid-cols-[1fr_220px_auto]">
                <Input
                  value={industry.name}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      industries: draft.industries.map((item, i) =>
                        i === index ? { ...item, name: e.target.value } : item
                      ),
                    })
                  }
                />
                <Select
                  value={industry.icon}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      industries: draft.industries.map((item, i) =>
                        i === index
                          ? { ...item, icon: e.target.value as IconName }
                          : item
                      ),
                    })
                  }
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </Select>
                <SecondaryButton
                  onClick={() =>
                    setDraft({
                      ...draft,
                      industries: draft.industries.filter((_, i) => i !== index),
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
                  industries: [
                    ...draft.industries,
                    { name: "New Industry", icon: "briefcase" },
                  ],
                })
              }
            >
              <Plus size={14} /> Add Industry
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

          <Section id="contact-vision" title="Contact and Vision" description="Final call-to-action copy and long-term vision line." visible={activeSection === "#contact-vision"}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-white/10 p-4">
                <h3 className="text-lg font-medium">Contact Block</h3>
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

              <div className="space-y-4 rounded-2xl border border-white/10 p-4">
                <h3 className="text-lg font-medium">Vision Block</h3>
                <Field label="Prefix">
                  <Input
                    value={draft.vision.prefix}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        vision: { ...draft.vision, prefix: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Highlight">
                  <Input
                    value={draft.vision.highlight}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        vision: { ...draft.vision, highlight: e.target.value },
                      })
                    }
                  />
                </Field>
                <Field label="Suffix">
                  <Input
                    value={draft.vision.suffix}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        vision: { ...draft.vision, suffix: e.target.value },
                      })
                    }
                  />
                </Field>
              </div>
            </div>
          </Section>
        </div>
      </div>
      </div>
    </div>
  );
}
