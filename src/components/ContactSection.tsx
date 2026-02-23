import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Send,
  CheckCircle,
} from "lucide-react";

const corporateData = [
  { icon: User, label: "POC", value: "William Randolph" },
  { icon: Phone, label: "Phone", value: "(703) 819-6192" },
  { icon: Mail, label: "Email", value: "william@thinkacquisition.net" },
  { icon: Globe, label: "Website", value: "www.thinkacquisition.net" },
  { icon: MapPin, label: "Address", value: "25 Castle Haven Road, Hampton, VA 23666" },
];

const naics = ["541611", "541612", "541614", "541618", "541690", "541990", "561110", "611430"];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to your Express backend /api/contact
    console.log("Contact form submitted:", { ...form, timestamp: new Date().toISOString() });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24 bg-muted/50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-glow text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to partner with us? Reach out and let's discuss how we can support your mission.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left: Corporate Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="rounded-2xl gradient-hero p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-6">
                Corporate Information
              </h3>

              <div className="space-y-5 mb-8">
                {corporateData.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-glow/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-blue-glow" />
                    </div>
                    <div>
                      <div className="text-primary-foreground/50 text-xs font-medium uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-primary-foreground text-sm font-medium">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-foreground/10 pt-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-primary-foreground/50 text-xs uppercase tracking-wider">CAGE</span>
                    <p className="text-primary-foreground font-semibold">89VE7</p>
                  </div>
                  <div>
                    <span className="text-primary-foreground/50 text-xs uppercase tracking-wider">UEI</span>
                    <p className="text-primary-foreground font-semibold">M2M1NJSDFP3</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary-foreground/10 pt-6">
                <span className="text-primary-foreground/50 text-xs uppercase tracking-wider block mb-3">
                  Socio-Economic Status
                </span>
                <p className="text-primary-foreground text-sm mb-4">
                  Service-Disabled Veteran-Owned Small Business (SDVOSB)
                </p>
                <span className="text-primary-foreground/50 text-xs uppercase tracking-wider block mb-2">
                  NAICS Codes
                </span>
                <div className="flex flex-wrap gap-2">
                  {naics.map((code) => (
                    <span key={code} className="px-3 py-1 rounded-full glass text-primary-foreground/80 text-xs font-medium">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-card border border-border shadow-card p-8 md:p-10 glass-light">
              <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">
                Send Us a Message
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                Fill out the form and we'll respond within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle size={48} className="text-blue-glow mb-4" />
                  <h4 className="font-display text-xl font-semibold text-card-foreground mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. We'll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                    { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                    { key: "phone", label: "Phone", type: "tel", placeholder: "(555) 123-4567" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-sm font-medium text-card-foreground mb-1.5 block">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required={field.key !== "phone"}
                        placeholder={field.placeholder}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-card-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium text-card-foreground mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your requirements..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-card-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-accent text-accent-foreground font-semibold text-sm tracking-wide shadow-glow hover:shadow-[0_0_40px_hsl(210_100%_52%/0.5)] transition-all duration-300"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
