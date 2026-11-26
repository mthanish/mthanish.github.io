"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const focusAreas = [
  {
    id: "systems",
    label: "Systems Architecture",
    detail: "Concurrent TCP/IP services, fault-tolerant pipelines, and low-overhead backend design.",
  },
  {
    id: "api",
    label: "API Design",
    detail: "Modular FastAPI and REST/WebSocket interfaces with strict schemas and clean contracts.",
  },
  {
    id: "security",
    label: "Security",
    detail: "AES-256-GCM encryption, SHA-256 integrity verification, and salted key derivation.",
  },
  {
    id: "performance",
    label: "Performance",
    detail: "Goroutine concurrency, local-first storage sync, and deterministic data workflows.",
  },
];

export function InteractiveIntro() {
  const [activeId, setActiveId] = useState<string>("systems");
  const activeArea = focusAreas.find((area) => area.id === activeId) ?? focusAreas[0];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-light)] border-y border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="border-l-4 border-[var(--accent)] pl-5 sm:pl-8 block italic text-base sm:text-xl text-[var(--muted)] mb-6 sm:mb-8 leading-relaxed">
              &ldquo;I don&apos;t just build interfaces. I build the systems behind them.&rdquo;
            </blockquote>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tighter mb-6">
              Backend Engineering
            </h2>

            <p className="text-[var(--muted)] text-base sm:text-lg leading-relaxed mb-6">
              I specialize in building scalable backend systems, distributed architectures, and secure infrastructure that power modern applications.
            </p>

            <ul className="list-disc list-inside text-[var(--muted)] space-y-3 mb-8 text-sm sm:text-base">
              <li className="font-medium">Backend engineering and API design</li>
              <li className="font-medium">Distributed and concurrent systems</li>
              <li className="font-medium">Application security and hardening</li>
              <li className="font-medium">Full-stack development across the stack</li>
              <li className="font-medium">Applied AI/ML integration</li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {focusAreas.map((area) => {
                const isActive = area.id === activeId;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveId(area.id)}
                    suppressHydrationWarning
                    className={`px-3 py-1.5 text-sm rounded border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[var(--accent-dim)] border-[var(--accent)] text-[var(--accent)]"
                        : "bg-[var(--bg)] border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Visual representation - conceptual system diagram */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative aspect-square bg-[var(--bg)] border border-[var(--border)] rounded-2xl overflow-hidden p-8 flex flex-col justify-between">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <defs>
                  <linearGradient id="diagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b35" />
                    <stop offset="50%" stopColor="#a8ff55" />
                    <stop offset="100%" stopColor="#ff6b35" />
                  </linearGradient>
                </defs>

                {/* Abstract system nodes */}
                <circle cx="22%" cy="22%" r="28" fill="url(#diagGrad)" opacity={0.28} />
                <circle cx="78%" cy="78%" r="28" fill="url(#diagGrad)" opacity={0.28} />
                <circle cx="22%" cy="78%" r="18" fill="url(#diagGrad)" opacity={0.22} />
                <circle cx="78%" cy="22%" r="18" fill="url(#diagGrad)" opacity={0.22} />
                <circle cx="50%" cy="50%" r="8" fill="#ff6b35" opacity={0.8} />

                {/* Connection lines */}
                <line x1="50%" y1="50%" x2="78%" y2="78%" stroke="url(#diagGrad)" strokeWidth={1.5} opacity={0.45} />
                <line x1="50%" y1="50%" x2="22%" y2="22%" stroke="url(#diagGrad)" strokeWidth={1.5} opacity={0.45} />
                <line x1="50%" y1="50%" x2="78%" y2="22%" stroke="url(#diagGrad)" strokeWidth={1} opacity={0.3} />
                <line x1="50%" y1="50%" x2="22%" y2="78%" stroke="url(#diagGrad)" strokeWidth={1} opacity={0.3} />
              </svg>

              <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-wider text-[var(--accent)]">
                <span>Systems</span>
                <span>{activeArea.label}</span>
              </div>

              <div className="relative z-10 bg-[var(--bg-light)] border border-[var(--border)] rounded-xl p-4">
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] mb-1">
                  Active Focus
                </p>
                <p className="text-sm text-[var(--fg)] leading-relaxed">
                  {activeArea.detail}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
