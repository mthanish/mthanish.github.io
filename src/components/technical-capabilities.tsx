"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Database, Smartphone, Shield, Cpu, Terminal } from "lucide-react";
import type { ComponentType } from "react";

interface SkillCategory {
  title: string;
  skills: string[];
  Icon: ComponentType<{ className?: string }>;
}

const categories: SkillCategory[] = [
  {
    title: "Programming",
    skills: ["Python", "Java", "Go", "C", "SQL", "JavaScript", "Dart"],
    Icon: Code2,
  },
  {
    title: "Backend and Networking",
    skills: ["FastAPI", "REST APIs", "TCP/IP", "Concurrent Programming", "Goroutines", "Client-Server Architecture"],
    Icon: Layers,
  },
  {
    title: "Databases",
    skills: ["MongoDB (Aggregation, Indexing, Text Search)", "MySQL", "SQLite", "Firebase Firestore", "Hive"],
    Icon: Database,
  },
  {
    title: "Frontend and Mobile",
    skills: ["React", "Flutter", "Riverpod", "HTML5", "CSS3"],
    Icon: Smartphone,
  },
  {
    title: "Security and Testing",
    skills: ["AES-256-GCM", "SHA-256", "Password Key Derivation", "Python Unit Testing", "Postman"],
    Icon: Shield,
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "VS Code"],
    Icon: Code2,
  },
  {
    title: "AI/ML and Data",
    skills: ["Scikit-learn", "Pandas", "NumPy", "OpenCV", "Hugging Face", "LangChain", "Streamlit", "Tableau", "Power BI", "Excel"],
    Icon: Cpu,
  },
  {
    title: "Core Computer Science",
    skills: ["DSA", "OOP", "Operating Systems", "Computer Networks", "DBMS"],
    Icon: Terminal,
  },
];

export function TechnicalCapabilities() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Technical Capabilities
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Skills organized by category with thoughtful typography.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.Icon;
            return (
              <motion.div
                key={category.title}
                className="p-5 sm:p-8 rounded-2xl bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg tracking-tighter">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm rounded bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
