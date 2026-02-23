import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Target, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const highlights = [
  { icon: Shield, label: "Government Cleared" },
  { icon: Target, label: "Mission Focused" },
  { icon: Zap, label: "Rapid Delivery" },
];

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero opacity-80" />
      </motion.div>

      {/* Floating Glow Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-blue-glow/5 animate-float blur-3xl" />
        <div className="absolute bottom-1/4 right-[15%] w-48 h-48 rounded-full bg-blue-glow/8 animate-float-delayed blur-2xl" />
        <div className="absolute top-1/2 right-[30%] w-32 h-32 rounded-full bg-blue-soft/5 animate-pulse-glow blur-xl" />
      </div>

      {/* MAIN CONTENT GRID */}
      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-6 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE TEXT */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-glow animate-pulse" />
              <span className="text-primary-foreground/80 text-sm font-medium tracking-wide">
                Government Contracting Excellence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Strategic Solutions.{" "}
              <span className="gradient-text">Proven Results.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              THINK Acquisition delivers expert acquisition support, program
              management, and technical consulting services to federal agencies
              and defense organizations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-16"
            >
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-lg gradient-accent text-accent-foreground font-semibold text-sm tracking-wide shadow-glow hover:shadow-[0_0_40px_hsl(210_100%_52%/0.5)] transition-all duration-300"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg glass text-primary-foreground font-semibold text-sm tracking-wide hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Our Services
              </button>
            </motion.div>

            <motion.div className="flex flex-wrap gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                  className="flex items-center gap-3 text-primary-foreground/60"
                >
                  <item.icon size={18} className="text-blue-glow" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE YOUTUBE VIDEO - LARGE SIZE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_hsl(220_60%_18%/0.3)]">

              {/* glow background */}
              <div className="absolute -inset-4 rounded-3xl bg-blue-glow/10 blur-2xl opacity-60" />

              <iframe
                className="relative w-full h-[360px] md:h-[420px] lg:h-[460px]"
                src="https://www.youtube.com/embed/rdJ38az0U0A?autoplay=1&mute=1&loop=1&playlist=rdJ38az0U0A&controls=1&modestbranding=1"
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