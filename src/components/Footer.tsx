import { motion } from "framer-motion";
import { Youtube, Linkedin } from "lucide-react";

const socials = [
  { icon: Youtube, href: "https://www.youtube.com/channel/UCuYjdrI3TelR2tzZNEhRGOw" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/think-acquisition/about/" },
];

const Footer = () => (
  <footer className="py-12 bg-[#1E3A8A]">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-10 items-center text-center md:text-left">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/logo.png"
            alt="THINK Acquisition Logo"
            className="h-10 w-auto object-contain"
          />
          <p className="text-white/70 text-sm mt-3 max-w-xs">
            Service-Disabled Veteran-Owned Small Business delivering acquisition excellence.
          </p>
        </div>

        {/* CENTER SOCIALS */}
        <div className="flex justify-center">
          <div className="flex gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                whileHover={{ scale: 1.15 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-yellow-400 transition-all duration-300"
              >
                <s.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* RIGHT → CENTER ON MOBILE */}
        <div className="text-center md:text-right">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} THINK Acquisition LLC
          </p>
          <p className="text-white/40 text-xs mt-1">
            All rights reserved.
          </p>
        </div>

      </div>
    </div>
  </footer>
);

export default Footer;