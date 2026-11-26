"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ChevronUp, Menu, X } from "lucide-react";

const SECTIONS = [
  { id: "hero", code: "01", label: "INIT" },
  { id: "intro", code: "02", label: "SYSTEMS" },
  { id: "projects", code: "03", label: "PROJECTS" },
  { id: "experience", code: "04", label: "EXPERIENCE" },
  { id: "open-source", code: "05", label: "OSS" },
  { id: "achievements", code: "06", label: "MILESTONES" },
  { id: "skills", code: "07", label: "STACK" },
  { id: "education", code: "08", label: "EDUCATION" },
  { id: "languages", code: "09", label: "LANGUAGES" },
  { id: "contact", code: "10", label: "CONTACT" },
];

export function ScrollTelemetry() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const [activeId, setActiveId] = useState("hero");
  const [percent, setPercent] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeSection = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  function scrollToSection(id: string) {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      {/* Top GPU-accelerated scroll progress rail */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--accent)] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Desktop vertical telemetry rail */}
      <nav
        aria-label="Section navigation"
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2"
      >
        <div className="px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--bg-light)] text-[10px] tracking-widest text-[var(--muted)] mb-1">
          <span className="text-[var(--accent)]">{String(percent).padStart(3, "0")}%</span>
        </div>

        <div className="flex flex-col items-end gap-1.5 p-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-light)]">
          {SECTIONS.map((section) => {
            const isActive = section.id === activeId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                suppressHydrationWarning
                aria-label={`Jump to ${section.label}`}
                className="group flex items-center gap-2 py-1 px-1.5 rounded cursor-pointer"
              >
                <span
                  className={`text-[10px] tracking-widest transition-colors ${
                    isActive
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--muted)] group-hover:text-[var(--fg)]"
                  }`}
                >
                  {section.code} {section.label}
                </span>
                <span
                  className={`block rounded-full transition-all ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[var(--accent)]"
                      : "w-1.5 h-1.5 bg-[var(--border)] group-hover:bg-[var(--muted)]"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile & Tablet compact bottom telemetry pill */}
      <div className="xl:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="mb-2 p-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-light)] grid grid-cols-2 gap-1.5"
            >
              {SECTIONS.map((section) => {
                const isActive = section.id === activeId;
                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    suppressHydrationWarning
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs tracking-wider transition-colors min-h-[40px] ${
                      isActive
                        ? "bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]"
                        : "bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]"
                    }`}
                  >
                    <span className="text-[10px] opacity-75">{section.code}</span>
                    <span className="truncate font-medium">{section.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-light)]">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            suppressHydrationWarning
            aria-expanded={mobileOpen}
            aria-label="Toggle section index"
            className="flex items-center gap-2.5 text-xs tracking-wider px-2 py-1.5 min-h-[36px]"
          >
            {mobileOpen ? (
              <X className="w-4 h-4 text-[var(--accent)]" />
            ) : (
              <Menu className="w-4 h-4 text-[var(--accent)]" />
            )}
            <span className="text-[var(--accent)] font-semibold">
              {activeSection.code} // {activeSection.label}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--muted)] tabular-nums">
              {String(percent).padStart(3, "0")}%
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              suppressHydrationWarning
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--fg)] active:scale-95 transition-transform"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

