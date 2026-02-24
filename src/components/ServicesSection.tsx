import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import {
  Briefcase,
  FileText,
  BarChart3,
  Users,
  Settings,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Acquisition Support",
    description:
      "End-to-end acquisition lifecycle support including market research, requirements development, solicitation preparation, and contract administration.",
  },
  {
    icon: FileText,
    title: "Program Management",
    description:
      "Comprehensive program and project management services ensuring on-time, on-budget delivery of complex government initiatives.",
  },
  {
    icon: BarChart3,
    title: "Financial Management",
    description:
      "Budget analysis, financial reporting, cost estimation, and fiscal planning for federal programs and defense contracts.",
  },
  {
    icon: Users,
    title: "Staff Augmentation",
    description:
      "Highly qualified professionals to supplement your workforce with cleared and credentialed acquisition specialists.",
  },
  {
    icon: Settings,
    title: "Technical Consulting",
    description:
      "Engineering, logistics, and technical advisory services supporting weapon systems, IT modernization, and infrastructure projects.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Oversight",
    description:
      "Regulatory compliance, quality assurance, and oversight services to maintain standards across all federal contracting activities.",
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      apiFetch("/content").then((data) => {
        const svc = data?.find((item: any) => item.sectionId === "services");
        if (svc) setContent(svc);
      }).catch(() => {});
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="services" className="relative py-16 bg-background overflow-hidden scroll-mt-24">
      {/* Subtle top decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">
            What we Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            {content?.title || "Core Services & Capabilities"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {content?.body || "Delivering mission-critical acquisition and consulting solutions across the federal landscape."}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="group relative p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-300">
                <service.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
