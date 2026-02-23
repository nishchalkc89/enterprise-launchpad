import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

const aboutPoints = [
  "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
  "Proven track record with DoD and federal civilian agencies",
  "CAGE: 89VE7 | UEI: M2M1NJSDFP3",
  "Experienced team of acquisition professionals",
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 bg-background overflow-hidden">
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
          <span className="text-blue-glow text-sm font-semibold tracking-widest uppercase">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Core Services & Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Delivering mission-critical acquisition and consulting solutions
            across the federal landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
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

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden gradient-hero p-12 md:p-16"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-glow/10 blur-3xl" />
          </div>
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-glow text-sm font-semibold tracking-widest uppercase">
                About Us
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-6">
                Mission-Driven. Results-Oriented.
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed mb-6">
                THINK Acquisition is a Service-Disabled Veteran-Owned Small
                Business dedicated to providing expert acquisition, program
                management, and technical consulting services. We partner with
                federal agencies to deliver efficient, compliant, and
                high-quality solutions.
              </p>
              <ul className="space-y-3">
                {aboutPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-primary-foreground/80 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-glow mt-2 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "10+", label: "Years Experience" },
                { num: "50+", label: "Contracts Delivered" },
                { num: "100%", label: "Client Satisfaction" },
                { num: "24/7", label: "Mission Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center hover:bg-primary-foreground/5 transition-colors"
                >
                  <div className="font-display text-3xl font-bold gradient-text mb-1">
                    {stat.num}
                  </div>
                  <div className="text-primary-foreground/60 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
