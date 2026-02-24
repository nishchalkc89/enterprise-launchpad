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

// ============ MOCK DATA ============
const mockSubmissions = [
  { id: 1, name: "Jane Smith", email: "jane@example.com", phone: "(555) 111-2222", message: "Interested in acquisition support services.", date: "2026-02-22" },
  { id: 2, name: "Robert Johnson", email: "robert@gov.mil", phone: "(555) 333-4444", message: "Need staff augmentation for upcoming contract.", date: "2026-02-21" },
  { id: 3, name: "Sarah Williams", email: "sarah@agency.gov", phone: "(555) 555-6666", message: "Looking for program management consulting.", date: "2026-02-20" },
];

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

  // 🔥 REAL DATA FROM BACKEND
  const [sections, setSections] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // LOAD CONTENTS FROM MONGODB
  useEffect(() => {

    const loadContent = () => {
      apiFetch("/content").then((data) => {
        setSections(data || []);
      });
    };

    loadContent();

    // 🔥 AUTO REFRESH EVERY 5s
    const interval = setInterval(loadContent, 5000);

    return () => clearInterval(interval);

  }, []);

  const openEditor = (section: any) => {
    setActiveSection(section);
    setFormData(section);
  };

  const handleSave = async () => {
    if (!activeSection) return;

    const updated = await apiFetch(`/content/${activeSection._id}`, {
      method: "PUT",
      body: JSON.stringify(formData)
    });

    setSections(prev =>
      prev.map(s => s._id === updated._id ? updated : s)
    );

    setActiveSection(null);
  };

  return (
    <div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Content Manager
        </h2>

        <button
          onClick={handleSave}
          style={{ background: "#facc15", color: "#1E3A8A" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
        >
          <Save size={14} /> Save All
        </button>
      </div>

      {/* ================= LIST VIEW ================= */}
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
                    {section.title || section.id}
                  </h3>

                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-600">
                    Visible
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

      {/* ================= EDIT MODE ================= */}
      {activeSection && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">

          <button onClick={() => setActiveSection(null)} className="text-sm">
            ← Back
          </button>

          <input
            value={formData.title || ""}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border"
            placeholder="Title"
          />

          <textarea
            value={formData.text || ""}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border"
            placeholder="Content text"
          />

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

  // open file picker
  const handleUpload = (e: any) => {
    const selected = Array.from(e.target.files || []);

    const mapped = selected.map((file: any) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles(prev => [...prev, ...mapped]);
  };

  // remove image
  const handleRemove = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
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
            key={item.id}
            className="relative aspect-square rounded-xl border border-border overflow-hidden group"
          >
            <img
              src={item.preview}
              className="w-full h-full object-cover"
            />

            {/* REMOVE BUTTON */}
            <button
              onClick={() => handleRemove(item.id)}
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
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
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