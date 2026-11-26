"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceProject {
  text: string;
  github?: string;
}

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  projects: ExperienceProject[];
}

export function ExperienceTimeline() {
  const entries: ExperienceEntry[] = [
    {
      role: "AI Intern",
      company: "CodeAlpha",
      period: "September 2025 (1 month)",
      projects: [
        {
          text: "LingoFusion: Full-stack translation web app (FastAPI, React, MongoDB) with REST endpoints for languages, translation, history, auto language detection, and text-to-speech.",
          github: "https://github.com/mthanish/CodeAlpha_lingofusion",
        },
        {
          text: "FAQ Chatbot: Streamlit chatbot using TF-IDF vectorization and cosine similarity over a JSON FAQ dataset with a modular source layout.",
          github: "https://github.com/mthanish/CodeAlpha_FAQ_Chatbot",
        },
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Professional Experience
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Real-world projects and internships that complement my engineering work.
          </p>
        </div>

        <div className="relative">
          {/* Animated vertical timeline line */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            aria-hidden="true"
          />

          {/* Experience entries */}
          <div className="space-y-8">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.role}
                className="relative pl-11 sm:pl-12"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Dot marker */}
                <motion.div
                  className="absolute left-4 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  aria-hidden="true"
                >
                  {index === 0 && <Briefcase className="w-4 h-4 text-black" />}
                </motion.div>

                {/* Entry content */}
                <motion.div
                  className="p-5 sm:p-8 rounded-2xl bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <h3 className="font-display font-semibold text-lg sm:text-xl tracking-tighter mb-2">
                    {entry.role}
                  </h3>
                  <p className="text-[var(--muted)] text-sm sm:text-base mb-4">
                    {entry.company} • {entry.period}
                  </p>

                  <ul className="list-disc list-inside text-[var(--muted)] space-y-2.5 text-sm">
                    {entry.projects.map((project, i) => (
                      <li key={i} className="font-medium leading-relaxed">
                        <span>{project.text}</span>
                        {project.github && (
                          <>
                            {" "}
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] hover:underline inline-block py-0.5"
                            >
                              GitHub
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
