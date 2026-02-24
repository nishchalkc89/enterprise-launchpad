import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Shield, Target, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { apiFetch } from "@/lib/api";

const defaultHighlights = [
  { icon: Shield, label: "Government Cleared" },
  { icon: Target, label: "Mission Focused" },
  { icon: Zap, label: "Rapid Delivery" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const loadContent = () => {
      apiFetch("/content/hero").then((data) => {
        if (data && !data.error) setHeroData(data);
      }).catch(() => {});
    };
    loadContent();
    const interval = setInterval(loadContent, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const meta = heroData?.metadata || {};
  const badgeText = meta.badgeText || "Government Contracting Excellence";
  const headingLine1 = meta.headingLine1 || "Strategic Solutions.";
  const headingHighlight = meta.headingHighlight || "Proven Results.";
  const paragraph = heroData?.body || meta.paragraph || `THINK Acquisition delivers expert acquisition support, program management, and technical consulting services to federal agencies and defense organizations.`;
  const buttonPrimaryText = meta.buttonPrimaryText || "Get Started";
  const buttonSecondaryText = meta.buttonSecondaryText || "Our Services";
  const videoUrl = meta.videoUrl || "https://www.youtube.com/embed/rdJ38az0U0A?autoplay=1&mute=1&loop=1&playlist=rdJ38az0U0A&controls=1&modestbranding=1";
  const badges = meta.badges && meta.badges.length > 0 ? meta.badges : defaultHighlights.map(h => h.label);

  // Map badge labels to icons
  const iconMap: Record<string, any> = { "Government Cleared": Shield, "Mission Focused": Target, "Rapid Delivery": Zap };
  const highlights = badges.map((b: string) => ({ icon: iconMap[b] || Shield, label: b }));

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-24"
    >
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </motion.div>

      {/* Glow Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-blue-glow/5 animate-float blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-48 h-48 rounded-full bg-blue-glow/8 animate-float-delayed blur-2xl" />
        <div className="absolute top-1/2 right-[30%] w-32 h-32 rounded-full bg-blue-soft/5 animate-pulse-glow blur-xl" />
      </div>

      {/* MAIN GRID */}
      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-6 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">
                {badgeText}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              {headingLine1}{" "}
              <span className="text-yellow-400">{headingHighlight}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              {paragraph}
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-yellow-400 text-black font-semibold text-sm tracking-wide shadow-lg hover:bg-yellow-300 transition-all duration-300"
              >
                {buttonPrimaryText}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary-foreground/10 transition-all duration-300"
              >
                {buttonSecondaryText}
              </button>
            </motion.div>

            {/* HIGHLIGHTS */}
            <motion.div className="flex flex-wrap gap-6">
              {highlights.map((item: any, i: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  className="flex items-center gap-3 text-primary-foreground/60"
                >
                  <item.icon size={18} className="text-yellow-400" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(220_60%_18%/0.3)]">
              <div className="absolute -inset-4 rounded-3xl bg-yellow-400/10 blur-2xl opacity-60" />

              <iframe
                className="relative w-full h-[360px] md:h-[420px] lg:h-[460px]"
                src={videoUrl}
                title="THINK Acquisition Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
