"use client";

import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "About", target: "about" },
  { label: "Stack", target: "stack" },
  { label: "Projects", target: "projects" },
  { label: "Contact", target: "contact" },
];

export default function Navbar() {
  const handleNavClick = (section: string) => {
    window.dispatchEvent(new CustomEvent("nav-scroll", { detail: section }));
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6"
    >
      <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95 duration-300">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-background rounded-full" />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 glass px-8 py-3 rounded-full border border-white/10">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item.target)}
            className="text-sm font-medium hover:text-accent transition-colors duration-300 uppercase tracking-widest"
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleNavClick("contact")}
        className="glass px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-background transition-all duration-500"
      >
        Hire Me
      </button>
    </motion.nav>
  );
}
