import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) onLogin();
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
          >
            Sign In
          </button>
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
const DashboardPanel = () => (
  <div>
    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Form Submissions", value: "23", change: "+5 this week" },
        { label: "Page Views", value: "1,847", change: "+12% vs last month" },
        { label: "Active Services", value: "6", change: "All visible" },
        { label: "Media Files", value: "14", change: "2 GB used" },
      ].map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -2 }}
          className="bg-card border border-border rounded-xl p-6 shadow-card"
        >
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{stat.label}</p>
          <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
          <p className="text-blue-600 text-xs mt-1">{stat.change}</p>
        </motion.div>
      ))}
    </div>
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-display font-semibold text-foreground mb-4">Recent Submissions</h3>
      <div className="space-y-3">
        {mockSubmissions.slice(0, 3).map((s) => (
          <div key={s.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.email}</p>
            </div>
            <span className="text-xs text-muted-foreground">{s.date}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============ CONTENT ============
const ContentPanel = () => {
  const [sections] = useState([
    { id: "hero", title: "Hero Section", visible: true },
    { id: "services", title: "Services Section", visible: true },
    { id: "about", title: "About Section", visible: true },
    { id: "contact", title: "Contact Section", visible: true },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Content Manager</h2>
        <button
          style={{ background: "#facc15", color: "#1E3A8A" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
        >
          <Save size={14} /> Save All
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-card border border-border rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${section.visible
                    ? "bg-blue-50 text-blue-600"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  {section.visible ? "Visible" : "Hidden"}
                </span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Click to edit section content, text, and images.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ SUBMISSIONS ============
const SubmissionsPanel = () => (
  <div>
    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Contact Submissions</h2>
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {["Name", "Email", "Phone", "Message", "Date", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockSubmissions.map((s) => (
              <tr key={s.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-foreground">{s.name}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{s.email}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{s.phone}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground max-w-xs truncate">{s.message}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{s.date}</td>
                <td className="px-4 py-4">
                  <button className="text-destructive hover:text-destructive/80">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// ============ MEDIA ============
const MediaPanel = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display text-2xl font-bold text-foreground">Media Library</h2>
      <button
        style={{ background: "#facc15", color: "#1E3A8A" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold"
      >
        <Plus size={14} /> Upload
      </button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="aspect-square bg-muted rounded-xl border border-border flex items-center justify-center group hover:border-blue-400/50 transition-colors cursor-pointer"
        >
          <Image size={32} className="text-muted-foreground/40 group-hover:text-blue-400/60 transition-colors" />
        </div>
      ))}
    </div>
  </div>
);

// ============ SETTINGS ============
const SettingsPanel = () => (
  <div>
    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Settings</h2>
    <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6 max-w-2xl">
      {[
        { label: "Company Name", value: "THINK Acquisition LLC" },
        { label: "POC Name", value: "William Randolph" },
        { label: "Phone", value: "(703) 819-6192" },
        { label: "Email", value: "william@thinkacquisition.net" },
      ].map((field) => (
        <div key={field.label}>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
          <input
            defaultValue={field.value}
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>
      ))}
      <button
        style={{ background: "#facc15", color: "#1E3A8A" }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
      >
        <Save size={14} /> Save Settings
      </button>
    </div>
  </div>
);

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
  return loggedIn ? (
    <AdminDashboard onLogout={() => setLoggedIn(false)} />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
};

export default Admin;