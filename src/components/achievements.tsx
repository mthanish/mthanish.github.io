"use client";

import { motion } from "framer-motion";
import { Award, Code2, GraduationCap, Briefcase, Cloud, Cpu } from "lucide-react";
import type { ComponentType } from "react";

interface Achievement {
  title: string;
  subtitle: string;
  Icon: ComponentType<{ className?: string }>;
}

const achievements: Achievement[] = [
  {
    title: "RUNNER-UP, ALGORISM: THE AI-NATIVE HACKATHON 2026",
    subtitle: "Competed among 50+ teams",
    Icon: Award,
  },
  {
    title: "PARTICIPATED IN 8+ HACKATHONS",
    subtitle: "Rapid prototyping & team engineering",
    Icon: Code2,
  },
  {
    title: "CGPA: 8.5",
    subtitle: "B.E. Artificial Intelligence and Machine Learning",
    Icon: GraduationCap,
  },
  {
    title: "GOLDMAN SACHS SOFTWARE ENGINEERING JOB SIMULATION",
    subtitle: "Forage Virtual Experience",
    Icon: Briefcase,
  },
  {
    title: "GOOGLE CLOUD STUDY JAM",
    subtitle: "Nov 2023 – Jan 2024 • Cloud infrastructure & ML labs",
    Icon: Cloud,
  },
  {
    title: "MICROSOFT LEARN: GET STARTED WITH AI APPLICATIONS AND AGENTS ON AZURE",
    subtitle: "AI applications & agent workflows",
    Icon: Cpu,
  },
];

export function Achievements() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Achievements
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Milestones and recognitions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.Icon;
            return (
              <motion.div
                key={achievement.title}
                className="relative flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </span>

                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg tracking-tighter leading-snug mb-1">
                    {achievement.title}
                  </h3>
                  {achievement.subtitle && (
                    <p className="text-[var(--muted)] text-xs sm:text-sm">
                      {achievement.subtitle}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
