import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

const defaultBullets = [
  "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
  "Proven track record with DoD and federal civilian agencies",
  "CAGE: 89VE7 | UEI: M2M1NJSDFP3",
  "Experienced team of acquisition professionals",
];

const defaultStats = [
  { num: "26+", label: "Years Experience" },
  { num: "50+", label: "Contracts Delivered" },
  { num: "100%", label: "Client Satisfaction" },
  { num: "24/7", label: "Mission Support" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const load = () => {
      apiFetch("/content/about").then((data) => {
        if (data && !data.error) setContent(data);
      }).catch(() => {});
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const meta = content?.metadata || {};
  const title = content?.title || "Mission-Driven. Results-Oriented.";
  const description = content?.body || meta.description || `THINK Acquisition is a Service-Disabled Veteran-Owned Small Business dedicated to providing expert acquisition, program management, and technical consulting services. We partner with federal agencies to deliver efficient, compliant, and high-quality solutions.`;
  const bullets = meta.bullets && meta.bullets.length > 0 ? meta.bullets : defaultBullets;
  const stats = meta.stats && meta.stats.length > 0 ? meta.stats : defaultStats;
  const imageUrl = meta.imageUrl || "/business.png";

  return (
    <section id="about" className="relative py-16 bg-background overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">
            About Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            {title}
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>

            <ul className="space-y-3 mb-8">
              {bullets.map((point: string) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-foreground/80 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat: any, i: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="group relative rounded-2xl p-5 bg-card border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-center overflow-hidden"
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(45 100% 52% / 0.15), hsl(45 100% 60% / 0.1))",
                    }}
                  />
                  <div className="relative">
                    <div className="font-display text-3xl font-bold text-yellow-400 mb-1">
                      {stat.num || stat.value}
                    </div>
                    <div className="text-muted-foreground text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-yellow-400/10 blur-2xl opacity-60" />

              <img
                src={imageUrl}
                alt="THINK Acquisition Business"
                className="relative w-full max-w-md rounded-2xl shadow-[0_20px_60px_-15px_hsl(45_60%_18%/0.3)] object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
