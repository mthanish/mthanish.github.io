"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const networkNodes = [
  { cx: "18%", cy: "28%", r: 7, fill: "#ff6b35", opacity: 0.8 },
  { cx: "78%", cy: "68%", r: 7, fill: "#a8ff55", opacity: 0.8 },
  { cx: "50%", cy: "50%", r: 5, fill: "#ff6b35", opacity: 0.55 },
  { cx: "62%", cy: "22%", r: 6, fill: "#a8ff55", opacity: 0.6 },
  { cx: "36%", cy: "74%", r: 6, fill: "#ff6b35", opacity: 0.6 },
  { cx: "74%", cy: "18%", r: 5, fill: "#a8ff55", opacity: 0.55 },
  { cx: "24%", cy: "62%", r: 5, fill: "#ff6b35", opacity: 0.5 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const networkY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const networkScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-16"
    >
      {/* Background charcoal */}
      <div className="absolute inset-0 bg-charcoal" />

      {/* Scroll-linked network visualization container */}
      <motion.div
        className="absolute inset-0 max-w-6xl mx-auto pointer-events-none will-change-transform"
        style={{ y: networkY, scale: networkScale, opacity: networkOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        aria-hidden="true"
      >
        <svg className="w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#a8ff55" />
            </linearGradient>
          </defs>

          {/* Network lines */}
          <line x1="18%" y1="28%" x2="78%" y2="68%" stroke="url(#gradient1)" strokeWidth={1} strokeOpacity={0.35} />
          <line x1="74%" y1="18%" x2="24%" y2="62%" stroke="url(#gradient1)" strokeWidth={1} strokeOpacity={0.35} />
          <line x1="62%" y1="22%" x2="36%" y2="74%" stroke="url(#gradient1)" strokeWidth={0.75} strokeOpacity={0.25} />
          <line x1="18%" y1="28%" x2="62%" y2="22%" stroke="url(#gradient1)" strokeWidth={0.75} strokeOpacity={0.25} />
          <line x1="36%" y1="74%" x2="78%" y2="68%" stroke="url(#gradient1)" strokeWidth={0.75} strokeOpacity={0.25} />

          {/* 7 Asymmetric Nodes */}
          {networkNodes.map((node, index) => (
            <circle
              key={index}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fill}
              opacity={node.opacity}
            />
          ))}
        </svg>
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl w-full px-2 sm:px-4 will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-light)] mb-6 sm:mb-8">
          <button
            type="button"
            aria-label="Scroll down"
            className="relative flex items-center gap-2 cursor-pointer select-none min-h-[28px]"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
            suppressHydrationWarning
          >
            <span className="text-[var(--muted)] text-xs uppercase tracking-wider">scroll</span>
            <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-bounce" />
          </button>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter mb-5 sm:mb-6 leading-none">
          <span className="block">MOHAMMED</span>
          <span className="block text-[var(--accent)]">THANEESH.</span>
        </h1>

        <p className="text-sm sm:text-lg text-[var(--muted)] max-w-2xl mx-auto mb-8 leading-relaxed px-2">
          I&apos;m a final-year AI &amp; ML engineering student interested in building reliable software, secure systems and intelligent applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 sm:pt-4 max-w-xs sm:max-w-none mx-auto">
          <a
            href="https://github.com/mthanish"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-black font-semibold rounded-full text-sm hover:opacity-90 active:scale-95 transition-all"
            aria-label="GitHub profile"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/mohammed-thaneesh-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-light)] border border-[var(--border)] text-white font-semibold rounded-full text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="mailto:mohammedthaneesh97@gmail.com"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-light)] border border-[var(--border)] text-white font-semibold rounded-full text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}
