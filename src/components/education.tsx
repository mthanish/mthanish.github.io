"use client";

import { motion } from "framer-motion";

const educationEntries = [
  {
    degree: "B.E. Artificial Intelligence and Machine Learning",
    institution: "P.A. College of Engineering, Mangaluru — VTU",
    details: "2023–2027 • CGPA: 8.5",
  },
  {
    degree: "Pre-University — Science",
    institution: "St. Aloysius PU College, Mangaluru",
    details: "2021–2023 • 89%",
  },
  {
    degree: "SSLC",
    institution: "Crescent English Medium School",
    details: "2021 • 89%",
  },
];

export function Education() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Education
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Academic background and credentials.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {educationEntries.map((entry, index) => (
            <motion.div
              key={entry.degree}
              className="p-5 sm:p-8 rounded-2xl bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-tighter mb-4">
                {entry.degree}
              </h3>
              <p className="text-[var(--muted)] text-sm mb-2">
                {entry.institution}
              </p>
              <p className="text-[var(--accent)] text-sm font-medium">
                {entry.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
