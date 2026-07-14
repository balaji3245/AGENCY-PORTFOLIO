"use client";

import { useEffect, useState } from "react";
import { logout } from "@/app/admin/actions";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/siteContent";
import type { ContactSubmission } from "@/lib/contactSubmissions";
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Check,
  X,
  Upload,
  Search,
  Filter,
  AlertCircle,
  Save,
  ChevronRight,
  Eye
} from "lucide-react";

export default function AdminPanel() {
  const { content: liveContent } = useSiteContent();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "general" | "services" | "portfolio" | "leads" | "reviews"
  >("dashboard");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [leadSourceFilter, setLeadSourceFilter] = useState<string>("All");

  // State for image uploads
  const [uploading, setUploading] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    async function init() {
      try {
        const [contentRes, submissionsRes] = await Promise.all([
          fetch("/api/site-content"),
          fetch("/api/contact-submissions")
        ]);

        if (contentRes.ok) {
          const cData = await contentRes.json();
          setContent(cData.content);
          setDraft(JSON.parse(JSON.stringify(cData.content)));
        }

        if (submissionsRes.ok) {
          const sData = await submissionsRes.json();
          setSubmissions(sData.submissions || []);
        }
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading || !draft) {
    return (
      <div className="min-h-screen bg-[#030612] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#7c66ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm font-light">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  const isDirty = JSON.stringify(content) !== JSON.stringify(draft);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/site-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (res.ok) {
        const data = await res.json();
        setContent(data.content);
        setDraft(JSON.parse(JSON.stringify(data.content)));
        setSaveStatus({ type: "success", message: "Changes saved to the live site!" });
        // Force path revalidation
        window.location.reload();
      } else {
        const errorData = await res.json();
        setSaveStatus({
          type: "error",
          message: errorData.error || "Failed to save changes. Session might have expired.",
        });
      }
    } catch {
      setSaveStatus({ type: "error", message: "A network error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard all unsaved changes?")) {
      setDraft(JSON.parse(JSON.stringify(content)));
      setSaveStatus({ type: null, message: "" });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathPointer: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(pathPointer);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "portfolio");

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        updateDraftField(pathPointer, data.url);
      } else {
        alert("Failed to upload image. Make sure credentials are configured.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(null);
    }
  };

  // Helper function to update nested fields dynamically
  const updateDraftField = (path: string, value: any) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let current = copy;

      for (let i = 0; i < parts.length - 1; i++) {
        // Handle array index pointers, e.g. "portfolio.items[0]"
        const part = parts[i];
        if (part.includes("[") && part.includes("]")) {
          const name = part.split("[")[0];
          const idx = parseInt(part.split("[")[1].split("]")[0], 10);
          current = current[name][idx];
        } else {
          current = current[part];
        }
      }

      const lastPart = parts[parts.length - 1];
      if (lastPart.includes("[") && lastPart.includes("]")) {
        const name = lastPart.split("[")[0];
        const idx = parseInt(lastPart.split("[")[1].split("]")[0], 10);
        current[name][idx] = value;
      } else {
        current[lastPart] = value;
      }

      return copy;
    });
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    try {
      const res = await fetch(`/api/contact-submissions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert("Failed to delete lead");
      }
    } catch {
      alert("Network error deleting lead");
    }
  };

  const clearAllLeads = async () => {
    if (!confirm("CRITICAL WARNING: This will permanently delete ALL submissions from your database. Proceed?")) return;

    try {
      const res = await fetch("/api/contact-submissions", { method: "DELETE" });
      if (res.ok) {
        setSubmissions([]);
      } else {
        alert("Failed to clear submissions");
      }
    } catch {
      alert("Network error clearing submissions");
    }
  };

  // Filters leads list
  const filteredSubmissions = submissions.filter((sub) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      sub.name.toLowerCase().includes(query) ||
      sub.email.toLowerCase().includes(query) ||
      sub.message.toLowerCase().includes(query) ||
      (sub.phone && sub.phone.includes(query));

    const matchesSource = leadSourceFilter === "All" || sub.source === leadSourceFilter.toLowerCase();
    return matchesSearch && matchesSource;
  });

  return (
    <div className="min-h-screen bg-[#030612] text-white flex flex-col md:flex-row relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c66ff]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0c12]/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col justify-between shrink-0 relative z-20">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7c66ff] to-[#a855f7] flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(124,102,255,0.4)]">
              YJ
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight">YJ DEVELOPERS</h1>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Admin Control</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
              { id: "general", label: "General Content", icon: <Globe size={18} /> },
              { id: "services", label: "Our Services", icon: <Settings size={18} /> },
              { id: "portfolio", label: "Recent Works", icon: <Briefcase size={18} /> },
              { id: "leads", label: "Leads Submissions", icon: <Users size={18} /> },
              { id: "reviews", label: "Testimonials", icon: <MessageSquare size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#7c66ff]/10 border border-[#7c66ff]/20 text-[#7c66ff] shadow-[0_4px_20px_rgba(124,102,255,0.05)]"
                    : "border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 mt-8 md:mt-0">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-400 border border-transparent hover:bg-red-500/5 hover:border-red-500/10 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 lg:p-12 overflow-y-auto max-h-screen relative z-10">
        {/* Header Alert Notification */}
        {saveStatus.type && (
          <div
            className={`mb-8 flex items-center gap-3 p-4 rounded-2xl border text-sm ${
              saveStatus.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            <AlertCircle size={18} className="shrink-0" />
            <span>{saveStatus.message}</span>
            <button
              onClick={() => setSaveStatus({ type: null, message: "" })}
              className="ml-auto hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back, Admin</h2>
              <p className="text-gray-400 text-sm font-light">Here is a quick overview of your agency portal metrics.</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Client Submissions", count: submissions.length, desc: "Total inquiries received", color: "from-blue-500/20 to-indigo-500/5" },
                { label: "Active Services", count: draft.services.items.length, desc: "Website capabilities listed", color: "from-purple-500/20 to-fuchsia-500/5" },
                { label: "Portfolio Works", count: draft.portfolio.items.length, desc: "Successfully completed projects", color: "from-emerald-500/20 to-teal-500/5" },
                { label: "Client Reviews", count: draft.testimonials?.length || 0, desc: "Approved/Pending reviews", color: "from-amber-500/20 to-orange-500/5" },
              ].map((metric, i) => (
                <div key={i} className={`p-6 rounded-3xl border border-white/5 bg-gradient-to-br ${metric.color} shadow-lg flex flex-col justify-between h-40`}>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{metric.label}</p>
                  <div>
                    <h3 className="text-5xl font-black tracking-tight mb-1">{metric.count}</h3>
                    <p className="text-[10px] text-gray-500 leading-none">{metric.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions & recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Leads */}
              <div className="p-6 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-lg">Recent Lead Messages</h4>
                  <button onClick={() => setActiveTab("leads")} className="text-xs text-[#7c66ff] hover:underline flex items-center gap-1 font-semibold">
                    View all <ChevronRight size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  {submissions.slice(0, 3).length === 0 ? (
                    <p className="text-xs text-gray-500 italic py-4">No submissions received yet.</p>
                  ) : (
                    submissions.slice(0, 3).map((sub) => (
                      <div key={sub.id} className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] transition-all flex flex-col justify-between gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-sm">{sub.name}</h5>
                            <p className="text-[10px] text-gray-500">{sub.email}</p>
                          </div>
                          <span className="text-[9px] uppercase px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-400">
                            {sub.source || "contact"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 italic font-light">"{sub.message}"</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick links & tips */}
              <div className="p-6 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-4">Admin Dashboard Guides</h4>
                  <ul className="space-y-3.5 text-xs text-gray-400 font-light leading-relaxed">
                    <li>💡 <strong>New Projects Visibility:</strong> When you add a new project in the <strong>Recent Works</strong> tab, it will automatically show up at the top of the home page.</li>
                    <li>🎨 <strong>Services Management:</strong> Limiting your services to 4 ensures a perfectly centered grid layout on desktops. Try to stick with these key core services.</li>
                    <li>🔒 <strong>Security:</strong> All operations to modify website contents or upload images are fully protected via secure HTTP cookies. Ensure your environment variables are configured.</li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/5 flex gap-4 mt-6">
                  <button onClick={() => setActiveTab("general")} className="flex-1 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-center hover:bg-white/10 transition-all">
                    Edit General Content
                  </button>
                  <button onClick={() => setActiveTab("portfolio")} className="flex-1 py-3.5 rounded-2xl bg-[#7c66ff] text-xs font-bold text-center hover:bg-[#6c54ff] transition-all">
                    Add New Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Content Tab */}
        {activeTab === "general" && (
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Edit General Website Copy</h2>
              <p className="text-gray-400 text-sm font-light">Customize core headers, titles, and section text fields.</p>
            </div>

            {/* Hero Configuration */}
            <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md space-y-6">
              <h4 className="font-bold text-lg border-b border-white/5 pb-3">Hero Section Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Eyebrow</label>
                  <input
                    type="text"
                    value={draft.hero.eyebrow}
                    onChange={(e) => updateDraftField("hero.eyebrow", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Highlighted Color Word</label>
                  <input
                    type="text"
                    value={draft.hero.highlightedWord}
                    onChange={(e) => updateDraftField("hero.highlightedWord", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Main Title Banner</label>
                  <input
                    type="text"
                    value={draft.hero.title}
                    onChange={(e) => updateDraftField("hero.title", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Description text</label>
                  <textarea
                    rows={3}
                    value={draft.hero.description}
                    onChange={(e) => updateDraftField("hero.description", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* About Section Configuration */}
            <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md space-y-6">
              <h4 className="font-bold text-lg border-b border-white/5 pb-3">About Section Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Eyebrow</label>
                  <input
                    type="text"
                    value={draft.about.eyebrow}
                    onChange={(e) => updateDraftField("about.eyebrow", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Highlighted Gradient Word</label>
                  <input
                    type="text"
                    value={draft.about.highlightedWord}
                    onChange={(e) => updateDraftField("about.highlightedWord", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Title Header</label>
                  <input
                    type="text"
                    value={draft.about.title}
                    onChange={(e) => updateDraftField("about.title", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Paragraph Content</label>
                  <textarea
                    rows={4}
                    value={draft.about.paragraphs[0] || ""}
                    onChange={(e) => updateDraftField("about.paragraphs[0]", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Brand details */}
            <div className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md space-y-6">
              <h4 className="font-bold text-lg border-b border-white/5 pb-3">Socials & Contact Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                  <input
                    type="email"
                    value={draft.brand?.email || ""}
                    onChange={(e) => updateDraftField("brand.email", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone Contact</label>
                  <input
                    type="text"
                    value={draft.brand?.phone || ""}
                    onChange={(e) => updateDraftField("brand.phone", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Twitter URL</label>
                  <input
                    type="text"
                    value={draft.brand?.socials?.twitter || ""}
                    onChange={(e) => updateDraftField("brand.socials.twitter", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Linkedin URL</label>
                  <input
                    type="text"
                    value={draft.brand?.socials?.linkedin || ""}
                    onChange={(e) => updateDraftField("brand.socials.linkedin", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Services Configuration</h2>
              <p className="text-gray-400 text-sm font-light">Modify service titles, features lists, and visual icons.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {draft.services.items.map((service, index) => (
                <div key={index} className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h4 className="font-bold text-lg text-[#7c66ff]">{service.title || "Untitled Service"}</h4>
                    <span className="text-[9px] uppercase px-3 py-1 rounded-full border border-white/10 bg-white/5 font-semibold text-gray-400">
                      Service {index + 1}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Service Name</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateDraftField(`services.items[${index}].title`, e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Lucide Icon Class/Name</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => updateDraftField(`services.items[${index}].icon`, e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Description</label>
                      <textarea
                        rows={3}
                        value={service.description}
                        onChange={(e) => updateDraftField(`services.items[${index}].description`, e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40 resize-none"
                      />
                    </div>

                    {/* Features checklist (Inline edit tags) */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Core Deliverables / Features</label>
                      <div className="space-y-2.5">
                        {(service.features || []).map((feat, fi) => (
                          <div key={fi} className="flex gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const newFeatures = [...service.features];
                                newFeatures[fi] = e.target.value;
                                updateDraftField(`services.items[${index}].features`, newFeatures);
                              }}
                              className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#7c66ff]/40"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFeatures = service.features.filter((_, idx) => idx !== fi);
                                updateDraftField(`services.items[${index}].features`, newFeatures);
                              }}
                              className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = [...(service.features || []), "New Deliverable"];
                            updateDraftField(`services.items[${index}].features`, newFeatures);
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-white/10 hover:border-white/20 text-xs font-semibold text-gray-400 hover:text-white transition-all w-full justify-center"
                        >
                          <Plus size={14} />
                          Add Deliverable Line
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === "portfolio" && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Recent Works Configuration</h2>
                <p className="text-gray-400 text-sm font-light">Manage project cases, tags, and category mapping.</p>
              </div>

              {/* Add Project Button */}
              <button
                type="button"
                onClick={() => {
                  const activeCategory = draft.services.items[0]?.title || "Website Development";
                  const newProject = {
                    title: `New Project`,
                    category: activeCategory,
                    description: "Details about this agency project casing.",
                    tech: ["React", "Next.js", "TailwindCSS"],
                    image: "/projects/strategy.png",
                    link: "#",
                    color: "from-[#7c66ff]/20 to-black",
                  };
                  updateDraftField("portfolio.items", [...draft.portfolio.items, newProject]);
                }}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#7c66ff] hover:bg-[#6c54ff] text-xs font-bold shadow-lg shadow-[#7c66ff]/15 transition-all"
              >
                <Plus size={16} />
                Create New Project
              </button>
            </div>

            {/* List of projects */}
            <div className="space-y-8">
              {draft.portfolio.items.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl text-gray-500">
                  No projects added yet. Click "Create New Project" to add.
                </div>
              ) : (
                draft.portfolio.items.map((project, index) => (
                  <div key={index} className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md flex flex-col lg:flex-row gap-8 relative overflow-hidden group">
                    {/* Trash Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                          const newProjects = draft.portfolio.items.filter((_, idx) => idx !== index);
                          updateDraftField("portfolio.items", newProjects);
                        }
                      }}
                      className="absolute top-6 right-6 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 shadow-md transition-all"
                    >
                      <Trash2 size={16} />
                    </button>

                    {/* Image Preview / Edit */}
                    <div className="w-full lg:w-80 shrink-0 space-y-4">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-500 italic">No Image</span>
                        )}
                        {uploading === `portfolio.items[${index}].image` && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-xs font-bold animate-pulse">Uploading...</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Project Image File</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="/projects/filename.png"
                            value={project.image}
                            onChange={(e) => updateDraftField(`portfolio.items[${index}].image`, e.target.value)}
                            className="flex-grow bg-white/[0.02] border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#7c66ff]/40"
                          />
                          <label className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer flex items-center justify-center transition-all shrink-0">
                            <Upload size={14} />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, `portfolio.items[${index}].image`)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Meta Fields */}
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 lg:pt-0">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateDraftField(`portfolio.items[${index}].title`, e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Service Category Mapping</label>
                        <select
                          value={project.category}
                          onChange={(e) => updateDraftField(`portfolio.items[${index}].category`, e.target.value)}
                          className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                        >
                          {draft.services.items.map((s, idx) => (
                            <option key={idx} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Short Description</label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e) => updateDraftField(`portfolio.items[${index}].description`, e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40 resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Case Link / URL</label>
                        <input
                          type="text"
                          value={project.link || "#"}
                          onChange={(e) => updateDraftField(`portfolio.items[${index}].link`, e.target.value)}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tech Stack Tags (Comma separated)</label>
                        <input
                          type="text"
                          value={(project.tech || []).join(", ")}
                          onChange={(e) => {
                            const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                            updateDraftField(`portfolio.items[${index}].tech`, tags);
                          }}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#7c66ff]/40"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Leads Submissions Tab */}
        {activeTab === "leads" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Lead submissions</h2>
                <p className="text-gray-400 text-sm font-light">Review and manage client contact inquiries.</p>
              </div>

              {submissions.length > 0 && (
                <button
                  type="button"
                  onClick={() => clearAllLeads()}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-all"
                >
                  <Trash2 size={16} />
                  Clear All Submissions
                </button>
              )}
            </div>

            {/* Filter / Search Row */}
            <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-white/5 bg-[#0a0c12]/40 backdrop-blur-md">
              <div className="flex-grow relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-[#7c66ff]/40"
                />
              </div>

              <div className="flex items-center gap-2 sm:w-48 shrink-0">
                <Filter size={14} className="text-gray-500" />
                <select
                  value={leadSourceFilter}
                  onChange={(e) => setLeadSourceFilter(e.target.value)}
                  className="w-full bg-[#0a0c12] border border-white/10 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-[#7c66ff]/40"
                >
                  <option value="All">All Sources</option>
                  <option value="Contact">Contact</option>
                  <option value="Start-project">Start-project</option>
                  <option value="Review">Review</option>
                </select>
              </div>
            </div>

            {/* Leads Table List */}
            <div className="border border-white/5 bg-[#0a0c12]/30 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/[0.01]">
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Contact Info</th>
                      <th className="py-4 px-6">Submission Details</th>
                      <th className="py-4 px-6">Source</th>
                      <th className="py-4 px-6">Submitted At</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03] text-xs font-light">
                    {filteredSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-gray-500 italic">
                          No submissions match your query filters.
                        </td>
                      </tr>
                    ) : (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.01] transition-all">
                          <td className="py-4 px-6 font-bold text-white">{sub.name}</td>
                          <td className="py-4 px-6 space-y-1">
                            <div className="text-gray-300 font-medium">{sub.email}</div>
                            {sub.phone && <div className="text-gray-500 text-[10px]">{sub.phone}</div>}
                          </td>
                          <td className="py-4 px-6 max-w-sm truncate whitespace-normal leading-relaxed text-gray-400">
                            {sub.message}
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-block text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-semibold">
                              {sub.source || "contact"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-500 text-[10px]">
                            {sub.createdAt ? new Date(sub.createdAt).toLocaleString() : "N/A"}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => deleteLead(sub.id)}
                              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-white transition-all inline-flex items-center justify-center"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Testimonials Reviews</h2>
              <p className="text-gray-400 text-sm font-light">Moderate client reviews posted on the live site.</p>
            </div>

            {/* Testimonials List */}
            <div className="border border-white/5 bg-[#0a0c12]/30 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/[0.01]">
                      <th className="py-4 px-6">Author</th>
                      <th className="py-4 px-6">Review Text</th>
                      <th className="py-4 px-6">Rating</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03] text-xs font-light">
                    {!draft.testimonials || draft.testimonials.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-gray-500 italic">
                          No testimonials received yet.
                        </td>
                      </tr>
                    ) : (
                      draft.testimonials.map((test, index) => (
                        <tr key={index} className="hover:bg-white/[0.01] transition-all">
                          <td className="py-4 px-6 font-bold text-white">
                            <div>{test.name}</div>
                            <div className="text-[10px] text-gray-500 font-normal">{test.role}</div>
                          </td>
                          <td className="py-4 px-6 max-w-md whitespace-normal leading-relaxed text-gray-400 italic">
                            "{test.comment}"
                          </td>
                          <td className="py-4 px-6 text-amber-400 font-bold">
                            {"★".repeat(test.rating || 5)}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              type="button"
                              onClick={() => {
                                const newTestimonials = [...draft.testimonials!];
                                newTestimonials[index].isApproved = !newTestimonials[index].isApproved;
                                updateDraftField("testimonials", newTestimonials);
                              }}
                              className={`text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border transition-all ${
                                test.isApproved
                                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                                  : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {test.isApproved ? "Approved" : "Pending"}
                            </button>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm("Delete this review from website database?")) {
                                  const newTestimonials = draft.testimonials!.filter((_, idx) => idx !== index);
                                  updateDraftField("testimonials", newTestimonials);
                                }
                              }}
                              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all inline-flex items-center justify-center"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Unsaved Changes Save Bar */}
      {isDirty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a0c12]/90 backdrop-blur-xl border border-[#7c66ff]/20 px-6 py-4 rounded-3xl flex items-center gap-6 shadow-[0_20px_50px_rgba(124,102,255,0.15)] w-full max-w-xl animate-fade-in-up">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7c66ff] animate-ping" />
            <span className="font-semibold">Unsaved alterations in draft</span>
          </div>

          <div className="flex gap-3.5 ml-auto">
            <button
              onClick={handleDiscard}
              className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-bold transition-all text-gray-300"
            >
              Discard Changes
            </button>
            <button
              disabled={saving}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#7c66ff] hover:bg-[#6c54ff] text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-[#7c66ff]/10 disabled:opacity-50 disabled:pointer-events-none"
            >
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={14} />
                  Save Draft Changes
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
