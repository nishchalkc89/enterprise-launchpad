import { useEffect, useState, useRef } from "react";
import { apiFetch, API_BASE } from "@/lib/api";

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
  Upload,
} from "lucide-react";

// ===== VALIDATION HELPERS =====
const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const isYouTubeEmbed = (url: string) => {
  if (!url) return true;
  return /^https?:\/\/(www\.)?youtube\.com\/embed\//.test(url.trim());
};

const ICON_OPTIONS = [
  "Briefcase", "FileText", "BarChart3", "Users", "Settings", "ShieldCheck",
  "Star", "Award", "Target", "Rocket", "Laptop", "Database", "ClipboardCheck",
];

const MAX_SERVICES = 6;
const MAX_BADGES = 3;
const TITLE_MIN_CHARS = 5;
const DESC_MIN_WORDS = 50;
const HERO_PARA_MIN_WORDS = 70;
const HERO_PARA_MAX_WORDS = 80;
const ABOUT_DESC_MIN_WORDS = 50;
const ABOUT_DESC_MAX_WORDS = 80;
const ABOUT_MAX_BULLETS = 5;
const ABOUT_BULLET_MAX_CHARS = 60;
const ABOUT_MAX_STATS = 4;
const SERVICE_TITLE_MAX = 40;
const SERVICE_DESC_MAX = 110;

const IMAGE_MAX_SIZE_MB = 2;
const IMAGE_ALLOWED_TYPES = ["image/jpeg", "image/png", "image/svg+xml", "image/webp"];
const IMAGE_ALLOWED_EXTS = ".jpg,.jpeg,.png,.svg,.webp";

const MEDIA_MAX_SIZE_MB = 2;
const MEDIA_ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml", "video/mp4"];
const MEDIA_ALLOWED_EXTS = ".jpg,.jpeg,.png,.svg,.webp,.mp4";

// ===== SECTION DEFAULTS (prefill when DB is empty) =====
const SECTION_DEFAULTS: Record<string, any> = {
  hero: {
    title: "Strategic Solutions Proven Results",
    body: "THINK Acquisition delivers expert acquisition support, program management, and technical consulting services to federal agencies and defense organizations. Our team of seasoned professionals brings decades of combined experience in government contracting, ensuring mission success through strategic planning, compliant execution, and innovative solutions. We are committed to delivering measurable results for our clients across the Department of Defense, civilian agencies, and intelligence community, providing responsive support and unwavering dedication to excellence in every engagement.",
    metadata: {
      badgeText: "Government Contracting Excellence",
      headingLine1: "Strategic Solutions.",
      headingHighlight: "Proven Results.",
      buttonPrimaryText: "Get Started",
      buttonSecondaryText: "Our Services",
      videoUrl: "https://www.youtube.com/embed/rdJ38az0U0A?autoplay=1&mute=1&loop=1&playlist=rdJ38az0U0A&controls=1&modestbranding=1",
      badges: ["Government Cleared", "Mission Focused", "Rapid Delivery"],
    },
  },
  about: {
    title: "Mission-Driven. Results-Oriented.",
    body: "THINK Acquisition is a Service-Disabled Veteran-Owned Small Business dedicated to providing expert acquisition, program management, and technical consulting services to federal agencies and defense organizations. We partner with government clients to deliver efficient, compliant, and high-quality solutions that drive mission success across defense and civilian operations nationwide, leveraging our deep expertise and proven methodologies to ensure every project meets the highest standards of excellence and accountability.",
    metadata: {
      bullets: [
        "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
        "Proven track record with DoD and federal civilian agencies",
        "CAGE: 89VE7 | UEI: M2M1NJSDFP3",
        "Experienced team of acquisition professionals",
      ],
      stats: [
        { num: "26+", label: "Years Experience" },
        { num: "50+", label: "Contracts Delivered" },
        { num: "100%", label: "Client Satisfaction" },
        { num: "24/7", label: "Mission Support" },
      ],
      imageUrl: "/business.png",
    },
  },
  services: {
    title: "Core Services & Capabilities",
    body: "Delivering mission-critical acquisition and consulting solutions across the federal landscape. Our comprehensive service portfolio supports defense and civilian agencies with expert guidance throughout the entire acquisition lifecycle, from strategic planning and requirements development through solicitation preparation, source selection, contract administration, and performance optimization. We bring proven methodologies and experienced professionals to ensure successful outcomes for every program.",
  },
  contact: {
    title: "Contact Us",
    body: "Get in touch with our team of acquisition professionals to discuss how THINK Acquisition can support your federal contracting needs. We are committed to providing responsive, expert guidance for all your acquisition, program management, and technical consulting requirements across defense and civilian agencies. Our dedicated team is ready to help you navigate complex procurement challenges, ensure regulatory compliance, and achieve mission success through proven strategies and collaborative partnerships.",
    metadata: {
      pocName: "William Randolph",
      phone: "(703) 819-6192",
      email: "william@thinkacquisition.net",
      website: "www.thinkacquisition.net",
      address: "25 Castle Haven Road, Hampton, VA 23666",
      cage: "89VE7",
      uei: "M2M1NJSDFP3",
      socioEconomicStatus: "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
      naicsCodes: ["541611", "541612", "541614", "541618", "541690", "541990", "561110", "611430"],
    },
  },
};

// ===== FILE UPLOAD HELPER =====
const uploadFile = async (file: File): Promise<string | null> => {
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await apiFetch("/upload", { method: "POST", body: fd });
    return res?.url || null;
  } catch { return null; }
};

const resolveMediaUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `https://api.foxnutfusion.com${url}`;
  return url;
};

// ===== IMAGE UPLOAD FIELD =====
const ImageUploadField = ({
  label, value, onChange, recommended, error,
}: {
  label: string; value: string; onChange: (url: string) => void; recommended: string; error?: string;
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  useEffect(() => setPreview(value), [value]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > IMAGE_MAX_SIZE_MB * 1024 * 1024) {
      alert(`File exceeds ${IMAGE_MAX_SIZE_MB}MB limit`);
      return;
    }
    if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
      alert("Allowed formats: JPG, JPEG, PNG, SVG, WebP");
      return;
    }
    setUploading(true);
    const url = await uploadFile(file);
    if (url) {
      onChange(url);
      setPreview(resolveMediaUrl(url));
    } else {
      alert("Upload failed. Please try again.");
    }
    setUploading(false);
    e.target.value = "";
  };

  const displayPreview = resolveMediaUrl(preview);

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</label>
      <p className="text-xs text-muted-foreground">Recommended: {recommended} · Max {IMAGE_MAX_SIZE_MB}MB · JPG, PNG, SVG, WebP</p>
      <div className={`flex items-center gap-4 p-3 rounded-xl border ${error ? 'border-red-500' : 'border-border'} bg-muted`}>
        {displayPreview && (
          <img src={displayPreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer" style={{ background: "#facc15", color: "#1E3A8A" }}>
          <Upload size={14} />
          {uploading ? "Uploading..." : "Choose File"}
          <input type="file" hidden accept={IMAGE_ALLOWED_EXTS} onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <p data-validation-error="image" className="text-xs mt-1" style={{ color: "#ef4444" }}>⚠ {error}</p>}
    </div>
  );
};

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
          background: "#1E3A8A",
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
const DashboardPanel = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({ pageViews: 0 });
  const [media, setMedia] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const sub = await apiFetch("/submissions");
      const srv = await apiFetch("/services");
      const analyticsData = await apiFetch("/analytics");
      const mediaData = await apiFetch("/media");
      setSubmissions(sub || []);
      setServices(srv || []);
      if (analyticsData) setAnalytics(analyticsData);
      if (Array.isArray(mediaData)) setMedia(mediaData);
    };
    load();
    const i = setInterval(load, 4000);
    return () => clearInterval(i);
  }, []);

  const stats = [
    { label: "Form Submissions", value: submissions.length, change: "Live" },
    { label: "Page Views", value: analytics.pageViews, change: "Live" },
    { label: "Active Services", value: services.length, change: "Live" },
    { label: "Media Files", value: media.length, change: "Live" },
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

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">
          Recent Submissions
        </h3>
        <div className="overflow-x-auto">
          <div className="space-y-3 min-w-[400px]">
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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLDivElement>(null);

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
    const defaults = SECTION_DEFAULTS[section.sectionId] || {};
    const merged = {
      ...section,
      title: section.title || defaults.title || "",
      body: section.body || defaults.body || "",
      metadata: {
        ...(defaults.metadata || {}),
        ...(section.metadata || {}),
      },
    };
    setActiveSection(section);
    setFormData(merged);
    setValidationErrors({});
  };

  const updateMeta = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      metadata: { ...(prev.metadata || {}), [key]: value },
    }));
  };

  // ===== VALIDATION =====
  const validateContent = (): boolean => {
    const errors: Record<string, string> = {};
    if (!activeSection) return true;
    const sid = activeSection.sectionId;

    // Title: min 5 characters (all sections)
    if (formData.title && formData.title.trim().length < TITLE_MIN_CHARS) {
      errors.titleMin = `Title must be at least ${TITLE_MIN_CHARS} characters`;
    }

    if (sid === "hero") {
      const wc = countWords(formData.body || "");
      if (wc < HERO_PARA_MIN_WORDS) errors.bodyWords = `Minimum ${HERO_PARA_MIN_WORDS} words required (currently ${wc})`;
      if (wc > HERO_PARA_MAX_WORDS) errors.bodyWords = `Maximum ${HERO_PARA_MAX_WORDS} words allowed (currently ${wc})`;
      const videoUrl = formData.metadata?.videoUrl || "";
      if (videoUrl && !isYouTubeEmbed(videoUrl)) errors.heroVideo = "Must be a YouTube embed URL (https://youtube.com/embed/...)";
      const badges = formData.metadata?.badges || [];
      if (badges.length > MAX_BADGES) errors.heroBadges = `Maximum ${MAX_BADGES} badges allowed`;
    }

    if (sid === "about") {
      const wc = countWords(formData.body || "");
      if (wc < ABOUT_DESC_MIN_WORDS) errors.bodyWords = `Minimum ${ABOUT_DESC_MIN_WORDS} words required (currently ${wc})`;
      if (wc > ABOUT_DESC_MAX_WORDS) errors.bodyWords = `Maximum ${ABOUT_DESC_MAX_WORDS} words allowed (currently ${wc})`;
      const bullets = formData.metadata?.bullets || [];
      if (bullets.length > ABOUT_MAX_BULLETS) errors.aboutBullets = `Maximum ${ABOUT_MAX_BULLETS} bullets allowed`;
      bullets.forEach((b: string, i: number) => {
        if (b.length > ABOUT_BULLET_MAX_CHARS) errors[`aboutBullet${i}`] = `Bullet ${i + 1}: max ${ABOUT_BULLET_MAX_CHARS} characters`;
      });
      const stats = formData.metadata?.stats || [];
      if (stats.length > ABOUT_MAX_STATS) errors.aboutStats = `Maximum ${ABOUT_MAX_STATS} stat cards allowed`;
    }

    if (sid === "services") {
      const wc = countWords(formData.body || "");
      if (wc < DESC_MIN_WORDS) errors.bodyWords = `Minimum ${DESC_MIN_WORDS} words required (currently ${wc})`;
    }

    if (sid === "contact") {
      const wc = countWords(formData.body || "");
      if (wc < DESC_MIN_WORDS) errors.bodyWords = `Minimum ${DESC_MIN_WORDS} words required (currently ${wc})`;
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setTimeout(() => {
        const firstErr = formRef.current?.querySelector('[data-validation-error]');
        firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!activeSection) return;
    if (!validateContent()) return;
    setSaving(true);
    const updated = await apiFetch(`/content/${activeSection._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    setSections((prev) => prev.map((s) => (s._id === updated._id ? updated : s)));
    setSaving(false);
    setActiveSection(null);
    setValidationErrors({});
  };

  // Services CRUD
  const addService = async () => {
    if (servicesList.length >= MAX_SERVICES) {
      alert(`Maximum ${MAX_SERVICES} services allowed.`);
      return;
    }
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

  const ValidationMsg = ({ error, id }: { error?: string; id: string }) =>
    error ? (
      <p data-validation-error={id} className="text-xs mt-1" style={{ color: "#ef4444" }}>
        ⚠ {error}
      </p>
    ) : null;

  // ---- Section-specific field renderers ----
  const renderHeroFields = () => {
    const meta = formData.metadata || {};
    const bodyWords = countWords(formData.body || "");
    const badges = meta.badges || [];
    const titleLen = (formData.title || "").trim().length;
    return (
      <>
        <ImageUploadField
          label="Background Image"
          value={meta.backgroundImage || ""}
          onChange={(url) => updateMeta("backgroundImage", url)}
          recommended="1920×1080px"
        />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badge Text</label>
        <input value={meta.badgeText || ""} onChange={(e) => updateMeta("badgeText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Government Contracting Excellence" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heading Line 1</label>
        <input value={meta.headingLine1 || ""} onChange={(e) => updateMeta("headingLine1", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Strategic Solutions." />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Heading Highlight</label>
        <input value={meta.headingHighlight || ""} onChange={(e) => updateMeta("headingHighlight", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" placeholder="Proven Results." />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Title (min {TITLE_MIN_CHARS} chars)</label>
        <input
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.titleMin ? 'border-red-500' : 'border-border'}`}
          placeholder="Strategic Solutions Proven Results"
        />
        <p className={`text-xs font-medium ${titleLen < TITLE_MIN_CHARS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {titleLen} characters {titleLen < TITLE_MIN_CHARS ? `(min ${TITLE_MIN_CHARS})` : '✓'}
        </p>
        <ValidationMsg error={validationErrors.titleMin} id="titleMin" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Paragraph ({HERO_PARA_MIN_WORDS}–{HERO_PARA_MAX_WORDS} words)</label>
        <textarea
          value={formData.body || ""}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.bodyWords ? 'border-red-500' : 'border-border'}`}
          rows={3}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Recommended for hero layout balance.</p>
          <p className={`text-xs font-medium ${bodyWords < HERO_PARA_MIN_WORDS || bodyWords > HERO_PARA_MAX_WORDS ? 'text-red-500' : 'text-green-600'}`}>
            {bodyWords} / {HERO_PARA_MIN_WORDS}–{HERO_PARA_MAX_WORDS} words
          </p>
        </div>
        <ValidationMsg error={validationErrors.bodyWords} id="bodyWords" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary Button Text</label>
        <input value={meta.buttonPrimaryText || ""} onChange={(e) => updateMeta("buttonPrimaryText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Secondary Button Text</label>
        <input value={meta.buttonSecondaryText || ""} onChange={(e) => updateMeta("buttonSecondaryText", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Video URL</label>
        <input
          value={meta.videoUrl || ""}
          onChange={(e) => updateMeta("videoUrl", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.heroVideo ? 'border-red-500' : 'border-border'}`}
          placeholder="https://youtube.com/embed/..."
        />
        <p className="text-xs text-muted-foreground">YouTube embed URLs only (https://youtube.com/embed/...)</p>
        <ValidationMsg error={validationErrors.heroVideo} id="heroVideo" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Badges (comma separated) — {badges.length}/{MAX_BADGES} max
        </label>
        <input
          value={badges.join(", ")}
          onChange={(e) => {
            const newBadges = e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean);
            if (newBadges.length <= MAX_BADGES) {
              updateMeta("badges", newBadges);
            }
          }}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.heroBadges ? 'border-red-500' : 'border-border'}`}
          placeholder="Government Cleared, Mission Focused, Rapid Delivery"
        />
        <ValidationMsg error={validationErrors.heroBadges} id="heroBadges" />
      </>
    );
  };

  const renderAboutFields = () => {
    const meta = formData.metadata || {};
    const bodyWords = countWords(formData.body || "");
    const bullets = meta.bullets || [];
    const stats = meta.stats || [];
    const titleLen = (formData.title || "").trim().length;
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title (min {TITLE_MIN_CHARS} chars)</label>
        <input
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.titleMin ? 'border-red-500' : 'border-border'}`}
        />
        <p className={`text-xs font-medium ${titleLen < TITLE_MIN_CHARS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {titleLen} characters {titleLen < TITLE_MIN_CHARS ? `(min ${TITLE_MIN_CHARS})` : '✓'}
        </p>
        <ValidationMsg error={validationErrors.titleMin} id="titleMin" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description ({ABOUT_DESC_MIN_WORDS}–{ABOUT_DESC_MAX_WORDS} words)</label>
        <textarea
          value={formData.body || ""}
          onChange={(e) => {
            const words = e.target.value.trim().split(/\s+/).filter(Boolean);
            if (words.length <= ABOUT_DESC_MAX_WORDS) {
              setFormData({ ...formData, body: e.target.value });
            } else {
              setFormData({ ...formData, body: words.slice(0, ABOUT_DESC_MAX_WORDS).join(" ") });
            }
          }}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.bodyWords ? 'border-red-500' : 'border-border'}`}
          rows={4}
        />
        <p className={`text-xs font-medium ${bodyWords < ABOUT_DESC_MIN_WORDS || bodyWords > ABOUT_DESC_MAX_WORDS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {bodyWords} / {ABOUT_DESC_MIN_WORDS}–{ABOUT_DESC_MAX_WORDS} words
        </p>
        <ValidationMsg error={validationErrors.bodyWords} id="bodyWords" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Bullets (one per line) — {bullets.length}/{ABOUT_MAX_BULLETS} max, {ABOUT_BULLET_MAX_CHARS} chars each
        </label>
        <textarea
          value={bullets.join("\n")}
          onChange={(e) => {
            let lines = e.target.value.split("\n").filter(Boolean);
            if (lines.length > ABOUT_MAX_BULLETS) lines = lines.slice(0, ABOUT_MAX_BULLETS);
            lines = lines.map((l: string) => l.slice(0, ABOUT_BULLET_MAX_CHARS));
            updateMeta("bullets", lines);
          }}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.aboutBullets ? 'border-red-500' : 'border-border'}`}
          rows={4}
        />
        <ValidationMsg error={validationErrors.aboutBullets} id="aboutBullets" />

        <ImageUploadField
          label="About Image"
          value={meta.imageUrl || ""}
          onChange={(url) => updateMeta("imageUrl", url)}
          recommended="800×600px"
        />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Stats — {stats.length}/{ABOUT_MAX_STATS} max
        </label>
        {stats.map((stat: any, i: number) => (
          <div key={i} className="flex gap-2">
            <input value={stat.num || stat.value || ""} onChange={(e) => { const s = [...stats]; s[i] = { ...s[i], num: e.target.value }; updateMeta("stats", s); }} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm" placeholder="Value (e.g. 26+)" />
            <input value={stat.label || ""} onChange={(e) => { const s = [...stats]; s[i] = { ...s[i], label: e.target.value }; updateMeta("stats", s); }} className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border text-sm" placeholder="Label" />
            <button onClick={() => { const s = stats.filter((_: any, j: number) => j !== i); updateMeta("stats", s); }} className="text-red-500 text-xs px-2">✕</button>
          </div>
        ))}
        <ValidationMsg error={validationErrors.aboutStats} id="aboutStats" />
        {stats.length < ABOUT_MAX_STATS && (
          <button onClick={() => updateMeta("stats", [...stats, { num: "", label: "" }])} className="text-xs text-blue-600 font-medium">+ Add Stat</button>
        )}
      </>
    );
  };

  const renderServicesFields = () => {
    const bodyWords = countWords(formData.body || "");
    const titleLen = (formData.title || "").trim().length;
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Title (min {TITLE_MIN_CHARS} chars)</label>
        <input
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.titleMin ? 'border-red-500' : 'border-border'}`}
        />
        <p className={`text-xs font-medium ${titleLen < TITLE_MIN_CHARS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {titleLen} characters {titleLen < TITLE_MIN_CHARS ? `(min ${TITLE_MIN_CHARS})` : '✓'}
        </p>
        <ValidationMsg error={validationErrors.titleMin} id="titleMin" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Description (min {DESC_MIN_WORDS} words)</label>
        <textarea
          value={formData.body || ""}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.bodyWords ? 'border-red-500' : 'border-border'}`}
          rows={3}
        />
        <p className={`text-xs font-medium ${bodyWords < DESC_MIN_WORDS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {bodyWords} / {DESC_MIN_WORDS} words min
        </p>
        <ValidationMsg error={validationErrors.bodyWords} id="bodyWords" />

        <div className="border-t border-border pt-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Service Cards — {servicesList.length}/{MAX_SERVICES}
            </label>
            <button
              onClick={addService}
              disabled={servicesList.length >= MAX_SERVICES}
              style={{ background: servicesList.length >= MAX_SERVICES ? "#94a3b8" : "#facc15", color: "#1E3A8A" }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              <Plus size={12} /> Add Service
            </button>
          </div>
          <div className="space-y-3">
            {servicesList.map((svc) => (
              <div key={svc._id} className="p-4 rounded-xl bg-muted/50 border border-border space-y-2">
                <div className="flex gap-2 flex-col sm:flex-row">
                  <div className="flex-1">
                    <input
                      value={svc.title}
                      maxLength={SERVICE_TITLE_MAX}
                      onChange={(e) => updateService(svc._id, { ...svc, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm"
                      placeholder="Title"
                    />
                    <p className="text-xs text-muted-foreground mt-0.5 text-right">{(svc.title || "").length}/{SERVICE_TITLE_MAX}</p>
                  </div>
                  <select value={svc.icon || "Briefcase"} onChange={(e) => updateService(svc._id, { ...svc, icon: e.target.value })} className="px-3 py-2 rounded-lg bg-muted border border-border text-sm">
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                <div>
                  <textarea
                    value={svc.description}
                    maxLength={SERVICE_DESC_MAX}
                    onChange={(e) => updateService(svc._id, { ...svc, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground text-right">{(svc.description || "").length}/{SERVICE_DESC_MAX}</p>
                </div>
                <button onClick={() => deleteService(svc._id)} className="text-red-500 text-xs font-medium flex items-center gap-1"><Trash2 size={12} /> Delete</button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderContactFields = () => {
    const meta = formData.metadata || {};
    const bodyWords = countWords(formData.body || "");
    const titleLen = (formData.title || "").trim().length;
    return (
      <>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Title (min {TITLE_MIN_CHARS} chars)</label>
        <input
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.titleMin ? 'border-red-500' : 'border-border'}`}
        />
        <p className={`text-xs font-medium ${titleLen < TITLE_MIN_CHARS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {titleLen} characters {titleLen < TITLE_MIN_CHARS ? `(min ${TITLE_MIN_CHARS})` : '✓'}
        </p>
        <ValidationMsg error={validationErrors.titleMin} id="titleMin" />

        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Description (min {DESC_MIN_WORDS} words)</label>
        <textarea
          value={formData.body || ""}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          className={`w-full px-4 py-3 rounded-xl bg-muted border ${validationErrors.bodyWords ? 'border-red-500' : 'border-border'}`}
          rows={3}
        />
        <p className={`text-xs font-medium ${bodyWords < DESC_MIN_WORDS ? 'text-red-500' : 'text-muted-foreground'}`}>
          {bodyWords} / {DESC_MIN_WORDS} words min
        </p>
        <ValidationMsg error={validationErrors.bodyWords} id="bodyWords" />

        <div className="border-t border-border pt-4 mt-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Corporate Information</label>
        </div>
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

      {activeSection && (
        <div ref={formRef} className="bg-card border border-border rounded-xl p-6 space-y-4">
          <button onClick={() => { setActiveSection(null); setValidationErrors({}); }} className="text-sm text-muted-foreground hover:text-foreground">
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
    const i = setInterval(load, 3000);
    return () => clearInterval(i);
  }, []);

  const handleDelete = async (id: string) => {
    await apiFetch(`/submissions/${id}`, { method: "DELETE" });
    setSubmissions(prev => prev.filter(s => s._id !== id));
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Contact Submissions
      </h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card overflow-x-auto">
        <table className="w-full min-w-[500px]">
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
  const [uploadError, setUploadError] = useState("");

  const loadMedia = async () => {
    try {
      const res = await fetch("https://api.foxnutfusion.com/api/media");
      const data = await res.json();
      setFiles(data || []);
    } catch { }
  };

  useEffect(() => {
    loadMedia();
    const interval = setInterval(loadMedia, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > MEDIA_MAX_SIZE_MB * 1024 * 1024) {
      return `File "${file.name}" exceeds ${MEDIA_MAX_SIZE_MB}MB limit.`;
    }
    if (!MEDIA_ALLOWED_TYPES.includes(file.type)) {
      return `File "${file.name}" has unsupported format. Allowed: JPG, PNG, SVG, WebP, MP4.`;
    }
    return null;
  };

  const handleUpload = async (e: any) => {
    setUploadError("");
    const selected = Array.from(e.target.files || []) as File[];
    for (const file of selected) {
      const err = validateFile(file);
      if (err) {
        setUploadError(err);
        e.target.value = "";
        return;
      }
    }
    for (const file of selected) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await fetch("https://api.foxnutfusion.com/api/media", {
          method: "POST",
          headers: {
            ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
          },
          body: formData,
        });
      } catch { }
    }
    e.target.value = "";
    loadMedia();
  };

  const handleRemove = async (id: string) => {
    try {
      await fetch(`https://api.foxnutfusion.com/api/media/${id}`, {
        method: "DELETE",
        headers: {
          ...(localStorage.getItem("token") ? { Authorization: `Bearer ${localStorage.getItem("token")}` } : {}),
        },
      });
    } catch { }
    setFiles(prev => prev.filter(f => f._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Media Library
        </h2>
        <label
          style={{ background: "#facc15", color: "#1E3A8A" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
        >
          <Plus size={14} /> Upload
          <input
            type="file"
            multiple
            hidden
            accept={MEDIA_ALLOWED_EXTS}
            onChange={handleUpload}
          />
        </label>
      </div>

      {uploadError && (
        <div className="mb-4 p-3 rounded-lg text-sm font-medium" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}>
          ⚠ {uploadError}
        </div>
      )}

      <p className="text-xs text-muted-foreground mb-4">
        Max file size: {MEDIA_MAX_SIZE_MB}MB · Formats: JPG, PNG, SVG, WebP, MP4 · Recommended max: 1600×1200px
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((item) => (
          <div
            key={item._id}
            className="relative aspect-square rounded-xl border border-border overflow-hidden group"
          >
            <img
              src={`https://api.foxnutfusion.com${item.url}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleRemove(item._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
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
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    apiFetch("/settings").then(data => {
      if (data) {
        setForm(data);
        setLoaded(true);
      }
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const requiredFields = ["companyName", "pocName", "phone", "email"];
    for (const f of requiredFields) {
      if (!form[f]?.trim()) {
        alert(`"${f}" cannot be empty.`);
        return;
      }
    }
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
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Settings
      </h2>
      <p className="text-xs text-muted-foreground mb-6">Global Website Information</p>

      <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6 max-w-2xl">
        {!loaded && <p className="text-sm text-muted-foreground">Loading settings...</p>}

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

        <div className="border-t border-border pt-6 space-y-6">
          <h3 className="font-display text-lg font-semibold text-foreground">Site Images</h3>

          <ImageUploadField
            label="Company Logo"
            value={form.logoUrl || "/logo.png"}
            onChange={(url) => handleChange("logoUrl", url)}
            recommended="300×100px"
          />

          <ImageUploadField
            label="Favicon"
            value={form.faviconUrl || "/favicon.png"}
            onChange={(url) => handleChange("faviconUrl", url)}
            recommended="64×64px"
          />

          <ImageUploadField
            label="Business Image"
            value={form.businessImageUrl || "/business.png"}
            onChange={(url) => handleChange("businessImageUrl", url)}
            recommended="800×600px"
          />
        </div>

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

      {/* ===== MAIN ===== */}
      <main className="flex-1 min-h-screen min-w-0">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
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

        <div className="p-4 sm:p-6 lg:p-10">
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
    // Force login every time user visits /admin
    localStorage.removeItem("token");
    delete (window as any).__ADMIN_TOKEN__;
    setLoggedIn(false);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#64748b", fontSize: 14 }}>Verifying session…</p>
      </div>
    );
  }

  return loggedIn ? (
    <AdminDashboard
      onLogout={() => {
        localStorage.removeItem("token");
        delete (window as any).__ADMIN_TOKEN__;
        setLoggedIn(false);
      }}
    />
  ) : (
    <AdminLogin
      onLogin={() => {
        const token = localStorage.getItem("token");
        if (token) {
          (window as any).__ADMIN_TOKEN__ = token;
        }
        setLoggedIn(true);
      }}
    />
  );
};

export default Admin;
