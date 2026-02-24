import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";


import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Image,
  Settings,
  LogOut,
  Menu,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Plus,
  ChevronRight,
} from "lucide-react";

// ============ LOGIN ============
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await apiFetch("/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.token) {
        localStorage.setItem("token", res.token);
        onLogin();
      } else {
        setError(res.error || "Invalid credentials");
      }
    } catch {
      setError("Server unreachable. Is the backend running?");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#1E3A8A",           /* ← BLUE CARD */
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: 40,
          boxShadow: "0 8px 40px rgba(30,58,138,0.35)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <img
            src="/logo.png"
            alt="THINK Acquisition"
            style={{ height: 56, width: "auto", objectFit: "contain" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Admin Console
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 13,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          THINK Acquisition CMS
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, display: "block", marginBottom: 6, fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.20)",
                color: "#ffffff",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="admin@thinkacquisition.net"
            />
          </div>
          <div>
            <label style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, display: "block", marginBottom: 6, fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 16px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: 10,
              background: "#facc15",
              color: "#1E3A8A",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fbbf24")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#facc15")}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          {error && (
            <p style={{ color: "#f87171", fontSize: 13, textAlign: "center", marginTop: 4 }}>
              {error}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

// ============ SIDEBAR NAV ============
const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
  { icon: FileText, label: "Content", key: "content" },
  { icon: MessageSquare, label: "Submissions", key: "submissions" },
  { icon: Image, label: "Media", key: "media" },
  { icon: Settings, label: "Settings", key: "settings" },
];

// ============ DASHBOARD ============

// ============ DASHBOARD ============


const DashboardPanel = () => {

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {

    const load = async () => {
      const sub = await apiFetch("/submissions");
      const srv = await apiFetch("/services");

      setSubmissions(sub || []);
      setServices(srv || []);
    };

    load();

    // 🔥 REALTIME AUTO REFRESH
    const i = setInterval(load, 4000);
    return () => clearInterval(i);

  }, []);

  const stats = [
    { label: "Form Submissions", value: submissions.length, change: "Live" },
    { label: "Page Views", value: "—", change: "Analytics" },
    { label: "Active Services", value: services.length, change: "Live" },
    { label: "Media Files", value: "—", change: "Upload ready" },
  ];

  return (
    <div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Dashboard
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-xl p-6 shadow-card"
          >
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <p className="font-display text-3xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-blue-600 text-xs mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* ===== REALTIME RECENT SUBMISSIONS ===== */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Recent Submissions
        </h3>

        <div className="space-y-3">
          {submissions.slice(0, 3).map((s: any) => (
            <div key={s._id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(s.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

// ============ CONTENT ============
const ContentPanel = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadContent = () => {
      apiFetch("/content").then((data) => {
        setSections(data || []);
      });
      apiFetch("/services").then((data) => {
        if (Array.isArray(data)) setServicesList(data);
      });
    };
    loadContent();
    const interval = setInterval(loadContent, 5000);
    return () => clearInterval(interval);
  }, []);

  const openEditor = (section: any) => {
    setActiveSection(section);
    setFormData({ ...section, metadata: { ...(section.metadata || {}) } });
  };

  const updateMeta = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      metadata: { ...(prev.metadata || {}), [key]: value },
    }));
  };

  const handleSave = async () => {
    if (!activeSection) return;
    setSaving(true);
    const updated = await apiFetch(`/content/${activeSection._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    setSections((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
    setSaving(false);
    setActiveSection(null);
  };

  // Services CRUD
  const addService = async () => {
    const svc = await apiFetch("/services", {
      method: "POST",
      body: JSON.stringify({ title: "New Service", description: "Description here", icon: "Briefcase" }),
    });
    setServicesList((prev) => [...prev, svc]);
  };

  const updateService = async (id: string, data: any) => {
    const updated = await apiFetch(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setServicesList((prev) => prev.map((s) => (s._id === id ? updated : s)));
  };

  const deleteService = async (id: string) => {
    await apiFetch(`/services/${id}`, { method: "DELETE" });
    setServicesList((prev) => prev.filter((s) => s._id !== id));
  };

  // ---- Section-specific field renderers ----
  const renderHeroFields = () => {
    const meta = formData.metadata || {};
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badge Text</label>
        <input value={meta.badgeText || ""} onChange={(e) => updateMeta("badgeText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Government Contracting Excellence" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heading Line 1</label>
        <input value={meta.headingLine1 || ""} onChange={(e) => updateMeta("headingLine1", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Strategic Solutions." />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heading Highlight</label>
        <input value={meta.headingHighlight || ""} onChange={(e) => updateMeta("headingHighlight", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Proven Results." />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paragraph</label>
        <textarea value={formData.body || ""} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" rows={3} />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary Button Text</label>
        <input value={meta.buttonPrimaryText || ""} onChange={(e) => updateMeta("buttonPrimaryText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Secondary Button Text</label>
        <input value={meta.buttonSecondaryText || ""} onChange={(e) => updateMeta("buttonSecondaryText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Video URL</label>
        <input value={meta.videoUrl || ""} onChange={(e) => updateMeta("videoUrl", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="https://youtube.com/embed/..." />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badges (comma separated)</label>
        <input value={(meta.badges || []).join(", ")} onChange={(e) => updateMeta("badges", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Government Cleared, Mission Focused, Rapid Delivery" />
      </>
    );
  };

  const renderAboutFields = () => {
    const meta = formData.metadata || {};
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</label>
        <input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
        <textarea value={formData.body || ""} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" rows={4} />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bullets (one per line)</label>
        <textarea value={(meta.bullets || []).join("\n")} onChange={(e) => updateMeta("bullets", e.target.value.split("\n").filter(Boolean))} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" rows={4} />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image URL</label>
        <input value={meta.imageUrl || ""} onChange={(e) => updateMeta("imageUrl", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="/business.png" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stats</label>
        {(meta.stats || [{ num: "", label: "" }]).map((stat: any, i: number) => (
          <div key={i} className="flex gap-2">
            <input value={stat.num || stat.value || ""} onChange={(e) => { const s = [...(meta.stats || [])]; s[i] = { ...s[i], num: e.target.value }; updateMeta("stats", s); }} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm" placeholder="Value (e.g. 26+)" />
            <input value={stat.label || ""} onChange={(e) => { const s = [...(meta.stats || [])]; s[i] = { ...s[i], label: e.target.value }; updateMeta("stats", s); }} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm" placeholder="Label" />
            <button onClick={() => { const s = (meta.stats || []).filter((_: any, j: number) => j !== i); updateMeta("stats", s); }} className="text-red-500 text-xs px-2">✕</button>
          </div>
        ))}
        <button onClick={() => updateMeta("stats", [...(meta.stats || []), { num: "", label: "" }])} className="text-xs text-blue-600 font-medium">+ Add Stat</button>
      </>
    );
  };

  const renderServicesFields = () => (
    <>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Title</label>
      <input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Description</label>
      <textarea value={formData.body || ""} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" rows={2} />
      <div className="border-t border-border pt-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service Cards</label>
          <button onClick={addService} style={{ background: "#facc15", color: "#1E3A8A" }} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold"><Plus size={12} /> Add Service</button>
        </div>
        <div className="space-y-3">
          {servicesList.map((svc) => (
            <div key={svc._id} className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
              <div className="flex gap-2">
                <input value={svc.title} onChange={(e) => updateService(svc._id, { ...svc, title: e.target.value })} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm" placeholder="Title" />
                <select value={svc.icon || "Briefcase"} onChange={(e) => updateService(svc._id, { ...svc, icon: e.target.value })} className="px-3 py-2 rounded-lg bg-muted border border-border text-sm">
                  {["Briefcase", "FileText", "BarChart3", "Users", "Settings", "ShieldCheck", "Star"].map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
              <textarea value={svc.description} onChange={(e) => updateService(svc._id, { ...svc, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm" rows={2} />
              <button onClick={() => deleteService(svc._id)} className="text-red-500 text-xs font-medium flex items-center gap-1"><Trash2 size={12} /> Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderContactFields = () => {
    const meta = formData.metadata || {};
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">POC Name</label>
        <input value={meta.pocName || ""} onChange={(e) => updateMeta("pocName", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label>
        <input value={meta.phone || ""} onChange={(e) => updateMeta("phone", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
        <input value={meta.email || ""} onChange={(e) => updateMeta("email", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Website</label>
        <input value={meta.website || ""} onChange={(e) => updateMeta("website", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Address</label>
        <input value={meta.address || ""} onChange={(e) => updateMeta("address", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CAGE Code</label>
        <input value={meta.cage || ""} onChange={(e) => updateMeta("cage", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">UEI</label>
        <input value={meta.uei || ""} onChange={(e) => updateMeta("uei", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Socio-Economic Status</label>
        <input value={meta.socioEconomicStatus || ""} onChange={(e) => updateMeta("socioEconomicStatus", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">NAICS Codes (comma separated)</label>
        <input value={(meta.naicsCodes || []).join(", ")} onChange={(e) => updateMeta("naicsCodes", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />
      </>
    );
  };

  const renderFields = () => {
    if (!activeSection) return null;
    const sid = activeSection.sectionId;
    if (sid === "hero") return renderHeroFields();
    if (sid === "about") return renderAboutFields();
    if (sid === "services") return renderServicesFields();
    if (sid === "contact") return renderContactFields();
    // Generic fallback
    return (
      <>
        <input value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Title" />
        <textarea value={formData.body || ""} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Content text" rows={4} />
      </>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Content Manager
        </h2>
        {activeSection && (
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ background: "#facc15", color: "#1E3A8A" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      {/* LIST VIEW */}
      {!activeSection && (
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section._id}
              onClick={() => openEditor(section)}
              className="bg-card border border-border rounded-xl p-6 shadow-card cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">
                    {section.sectionId?.charAt(0).toUpperCase() + section.sectionId?.slice(1) || section.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600">
                    {section.visible !== false ? "Visible" : "Hidden"}
                  </span>
                </div>
                <ChevronRight size={16} />
              </div>
              <p className="text-muted-foreground text-sm">
                Click to edit section content, text, and images.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODE */}
      {activeSection && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <button onClick={() => setActiveSection(null)} className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to sections
          </button>
          <h3 className="font-display text-lg font-semibold text-foreground capitalize">{activeSection.sectionId} Section</h3>
          {renderFields()}
        </div>
      )}
    </div>
  );
};

// ============ SUBMISSIONS ============
const SubmissionsPanel = () => {

  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {

    const load = () => {
      apiFetch("/submissions").then(data => {
        setSubmissions(data || []);
      });
    };

    load();

    // 🔥 realtime refresh
    const i = setInterval(load, 3000);
    return () => clearInterval(i);

  }, []);

  const handleDelete = async (id: string) => {
    await apiFetch(`/submissions/${id}`, {
      method: "DELETE"
    });

    setSubmissions(prev => prev.filter(s => s._id !== id));
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Contact Submissions
      </h2>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
        <table className="w-full">
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.message}</td>
                <td>
                  <button onClick={() => handleDelete(s._id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============ MEDIA ============
const MediaPanel = () => {

  const [files, setFiles] = useState<any[]>([]);

  // Load media from backend
  const loadMedia = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/media");
      const data = await res.json();
      setFiles(data || []);
    } catch {}
  };

  useEffect(() => {
    loadMedia();
    const interval = setInterval(loadMedia, 5000);
    return () => clearInterval(interval);
  }, []);

  // Upload to backend
  const handleUpload = async (e: any) => {
    const selected = Array.from(e.target.files || []) as File[];
    for (const file of selected) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await fetch("http://localhost:5000/api/media", {
          method: "POST",
          headers: {
            ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
          },
          body: formData,
        });
      } catch {}
    }
    loadMedia();
  };

  // Delete from backend
  const handleRemove = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/media/${id}`, {
        method: "DELETE",
        headers: {
          ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
        },
      });
    } catch {}
    setFiles(prev => prev.filter(f => f._id !== id));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Media Library
        </h2>

        {/* REAL FILE INPUT */}
        <label
          style={{ background: "#facc15", color: "#1E3A8A" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
        >
          <Plus size={14} /> Upload
          <input
            type="file"
            multiple
            hidden
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* Uploaded Images */}
        {files.map((item) => (
          <div
            key={item._id}
            className="relative aspect-square rounded-xl border border-border overflow-hidden group"
          >
            <img
              src={`http://localhost:5000${item.url}`}
              className="w-full h-full object-cover"
            />

            {/* REMOVE BUTTON */}
            <button
              onClick={() => handleRemove(item._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {/* Empty Placeholder */}
        {files.length === 0 && (
          <div className="aspect-square bg-muted rounded-xl border border-border flex items-center justify-center">
            <Image size={32} className="text-muted-foreground/40" />
          </div>
        )}
      </div>
    </div>
  );
};

// ============ SETTINGS ============
const SettingsPanel = () => {

  const [form, setForm] = useState<any>({
    companyName: "",
    pocName: "",
    phone: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch("/settings").then(data => {
      if (data) setForm(data);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);

    await apiFetch("/settings", {
      method: "PUT",
      body: JSON.stringify(form)
    });

    setLoading(false);
    alert("Settings Saved ✅");
  };

  return (
    <div>

      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Settings
      </h2>

      <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6 max-w-2xl">

        {[
          { key: "companyName", label: "Company Name" },
          { key: "pocName", label: "POC Name" },
          { key: "phone", label: "Phone" },
          { key: "email", label: "Email" },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              {field.label}
            </label>

            <input
              value={form[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          style={{ background: "#facc15", color: "#1E3A8A" }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Settings"}
        </button>

      </div>

    </div>
  );
};
// ============ ADMIN DASHBOARD ============
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const panels: Record<string, React.ReactNode> = {
    dashboard: <DashboardPanel />,
    content: <ContentPanel />,
    submissions: <SubmissionsPanel />,
    media: <MediaPanel />,
    settings: <SettingsPanel />,
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ===== SIDEBAR — #1E3A8A ===== */}
      <aside
        style={{
          background: "#1E3A8A",
          borderRight: "1px solid rgba(255,255,255,0.10)",
        }}
        className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
      >
        {/* Logo */}
        <div
          className="p-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
        >
          <img
            src="/logo.png"
            alt="THINK Acquisition Admin"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
              style={
                activeTab === item.key
                  ? { background: "rgba(250,204,21,0.18)", color: "#facc15" }
                  : { background: "transparent", color: "rgba(255,255,255,0.60)" }
              }
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/10 hover:!text-white"
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div
          className="p-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
        >
          <button
            onClick={onLogout}
            style={{ color: "rgba(255,255,255,0.55)" }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm hover:bg-white/10 hover:!text-white transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== MAIN — stays white/light ===== */}
      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-foreground"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-display text-lg font-semibold text-foreground capitalize">
            {activeTab}
          </h1>
          <div
            style={{ background: "#facc15", color: "#1E3A8A" }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          >
            NK
          </div>
        </header>

        <div className="p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// ============ MAIN ============
const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setChecking(false);
      return;
    }
    // Validate token by calling a protected endpoint
    apiFetch("/submissions")
      .then((res) => {
        if (Array.isArray(res)) {
          setLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#64748b", fontSize: 14 }}>Verifying session…</p>
      </div>
    );
  }

  return loggedIn ? (
    <AdminDashboard onLogout={() => {
      localStorage.removeItem("token");
      setLoggedIn(false);
    }} />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
};

export default Admin;