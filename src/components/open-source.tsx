"use client";

import { motion } from "framer-motion";
import { GitPullRequest, ExternalLink } from "lucide-react";

export function OpenSourceContribution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Open-Source Contribution
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg">
            Collaborative work and community contributions.
          </p>
        </div>

        <div className="relative">
          {/* Animated timeline background */}
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border)] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            aria-hidden="true"
          />

          {/* Contribution entry */}
          <motion.div
            className="relative pl-11 sm:pl-12"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
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
              <GitPullRequest className="w-4 h-4 text-black" />
            </motion.div>

            {/* Entry content */}
            <motion.div
              className="p-5 sm:p-8 rounded-2xl bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
            >
              <h3 className="font-display font-semibold text-lg sm:text-xl tracking-tighter mb-2">
                Simpaudio — Python
              </h3>
              <p className="text-[var(--muted)] text-sm sm:text-base mb-4">
                Contributor with a pull request adding five Python unit tests for the SRT exporter.
              </p>

              <ul className="list-disc list-inside text-[var(--muted)] space-y-1 text-sm">
                <li className="font-medium">Time formatting</li>
                <li className="font-medium">Segment grouping</li>
                <li className="font-medium">SRT/VTT output</li>
              </ul>

              <div className="mt-5">
                <a
                  href="https://github.com/alimaandev/simpaudio/pull/22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] text-sm font-medium hover:underline py-1"
                >
                  <span>View PR #22 on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
