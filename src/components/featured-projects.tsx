"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  technologies: string[];
  github: string;
  description: string;
  interaction: string;
  image: string;
}

const projectData: Project[] = [
  {
    title: "CONCURRENT FILE TRANSFER SERVICE",
    subtitle: "Go, TCP/IP, Goroutines, AES-256-GCM, SHA-256, REST",
    technologies: ["Go", "TCP/IP", "Goroutines", "AES-256-GCM", "SHA-256", "REST"],
    github: "https://github.com/mthanish/GoTransfer",
    description:
      "Built a concurrent TCP file transfer server and client in Go using goroutines, AES-256-GCM encryption, SHA-256 checksums, resumable transfers, and a REST status API. Measured locally with encryption and disk writes on: 50.37 MB/s (1 client) and 257.02 MB/s (10 concurrent clients).",
    interaction:
      "Animated network visualization showing multiple clients transferring encrypted file packets to a central server",
    image: "/images/projects/concurrent-file-transfer.jpg",
  },
  {
    title: "MY NOTES — OFFLINE-FIRST NOTES AND ENCRYPTED VAULT",
    subtitle: "Flutter, Riverpod, Hive, Firebase Firestore, AES-256",
    technologies: ["Flutter", "Riverpod", "Hive", "Firebase Firestore", "AES-256"],
    github: "https://github.com/mthanish/My-Notes-Cloud-sync",
    description:
      "Designed an offline-first Flutter application with a three-layer architecture consisting of UI, repository and services. Implemented Hive local storage, Cloud Firestore synchronization and an AES-256 password vault with salted key stretching.",
    interaction:
      "Interactive security-themed visualization showing local encrypted storage, key derivation, encryption process and cloud synchronization",
    image: "/images/projects/my-notes-vault.jpg",
  },
  {
    title: "GAGE — KANNADA-ENGLISH AI ADVISORY SYSTEM FOR SUGARCANE FARMING",
    subtitle: "FastAPI, ESP32, WebSockets, sensors",
    technologies: ["FastAPI", "ESP32", "WebSockets", "sensors"],
    github: "https://github.com/mthanish/Gage",
    description:
      "Hardware and backend developer in a four-person VTU degree project. Built layered FastAPI modules (routers, models, schemas, database layer) and ESP32 sensor/image upload endpoints. In testing, 368 sensor uploads all returned status 200 (median 51.5 ms, p95 70.3 ms) and 24 of 24 end-to-end pipeline checks passed.",
    interaction:
      "Agricultural IoT visualization showing ESP32 monitoring device communicating with backend, sensor data flowing into observation dashboard",
    image: "/images/projects/gage-iot.jpg",
  },
  {
    title: "AI FOR MINERAL TARGETING",
    subtitle: "Python, Random Forest, Streamlit, GeoPandas",
    technologies: ["Python", "Random Forest", "Streamlit", "GeoPandas"],
    github: "https://github.com/mthanish/Geo-AI",
    description:
      "ML lead for a geospatial machine-learning demonstration. Built a feature pipeline using lithology, fault distance and fold distance, with a Random Forest model scoring 140,751 grid cells across Karnataka and Andhra Pradesh. Training labels are simulated for demonstration.",
    interaction:
      "Miniature interactive geospatial heatmap-inspired interface representing mineral targeting across a geographical grid",
    image: "/images/projects/mineral-targeting.jpg",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 sm:mb-6">
            Featured Engineering Projects
          </h2>
          <p className="text-[var(--muted)] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Each project below offers an interactive conceptual demonstration of the work built.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={project.title}
              className="relative rounded-2xl overflow-hidden bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Project header */}
              <div className="p-5 sm:p-8 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg sm:text-2xl tracking-tighter mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted)]">{project.subtitle}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 text-[var(--accent)] text-sm font-medium hover:underline py-1"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Project conceptual visualization */}
              <div
                className="relative bg-[var(--bg-light)] border-b border-[var(--border)]"
                aria-label={`${project.title} conceptual visualization`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--bg)]">
                  <img
                    src={project.image}
                    alt={`${project.title} system concept`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    System Concept
                  </span>
                </div>
                <p className="px-6 py-3 text-xs text-[var(--muted)] border-t border-[var(--border)] leading-relaxed">
                  {project.interaction}
                </p>
              </div>

              {/* Project details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded bg-[var(--bg-light)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
