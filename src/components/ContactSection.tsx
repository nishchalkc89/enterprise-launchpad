import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Send,
  CheckCircle,
} from "lucide-react";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      apiFetch("/content/contact").then((data) => {
        if (data && !data.error) setContactData(data);
      }).catch(() => { });
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const meta = contactData?.metadata || {};
  const pocName = meta.pocName || "William Randolph";
  const phone = meta.phone || "(703) 819-6192";
  const email = meta.email || "william@thinkacquisition.net";
  const website = meta.website || "www.thinkacquisition.net";
  const address = meta.address || "25 Castle Haven Road, Hampton, VA 23666";
  const cage = meta.cage || "89VE7";
  const uei = meta.uei || "M2M1NJSDFP3";
  const socioEconomicStatus = meta.socioEconomicStatus || "Service-Disabled Veteran-Owned Small Business (SDVOSB)";
  const naicsCodes = meta.naicsCodes && meta.naicsCodes.length > 0 ? meta.naicsCodes : ["541611", "541612", "541614", "541618", "541690", "541990", "561110", "611430"];

  const corporateInfo = [
    { icon: User, label: "POC", value: pocName },
    { icon: Phone, label: "Phone", value: phone },
    { icon: Mail, label: "Email", value: email },
    { icon: Globe, label: "Website", value: website },
    { icon: MapPin, label: "Address", value: address },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://api.foxnutfusion.com/api/submit-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Server error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <section id="contact" className="relative py-16 bg-muted/50 overflow-hidden scroll-mt-24">
      {/* THIN YELLOW DIVIDER */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-yellow-400/40" />

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* LEFT CORPORATE INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-[#1E3A8A] p-8 md:p-10 h-full">
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Corporate Information
              </h3>

              <div className="space-y-5 mb-8">
                {corporateInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="text-white text-sm font-medium">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider">CAGE</span>
                    <p className="text-white font-semibold">{cage}</p>
                  </div>
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider">UEI</span>
                    <p className="text-white font-semibold">{uei}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <span className="text-white/60 text-xs uppercase tracking-wider block mb-3">
                  Socio-Economic Status
                </span>
                <p className="text-white text-sm mb-4">
                  {socioEconomicStatus}
                </p>

                <span className="text-white/60 text-xs uppercase tracking-wider block mb-2">
                  NAICS Codes
                </span>

                <div className="flex flex-wrap gap-2">
                  {naicsCodes.map((code: string) => (
                    <span key={code} className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-xs font-medium">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-card border border-border shadow-card p-8 md:p-10 glass-light">
              <h3 className="font-display text-2xl font-bold text-card-foreground mb-2">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={48} className="text-yellow-400 mb-4 mx-auto" />
                  <h4 className="font-display text-xl font-semibold">Message Sent!</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border"
                  />
                  <input
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border"
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border"
                  />

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all duration-300"
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
