import { motion } from "framer-motion";
import { Linkedin, Twitter, Facebook } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Facebook, href: "#" },
];

const Footer = () => (
  <footer className="gradient-footer py-12">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-10 items-center">
        <div>
          <span className="font-display text-2xl font-bold text-primary-foreground">
            THINK{" "}
            <span className="text-blue-glow">Acquisition</span>
          </span>
          <p className="text-primary-foreground/50 text-sm mt-3 max-w-xs">
            Service-Disabled Veteran-Owned Small Business delivering acquisition excellence.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                whileHover={{ scale: 1.15 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-primary-foreground/60 hover:text-blue-glow hover:shadow-glow transition-all duration-300"
              >
                <s.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="text-right">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} THINK Acquisition LLC
          </p>
          <p className="text-primary-foreground/30 text-xs mt-1">
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
