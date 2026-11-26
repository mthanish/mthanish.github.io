import "../globals.css";
import { ScrollTelemetry } from "@/components/scroll-telemetry";
import { DinoRunner } from "@/components/dino-runner";
import { Hero } from "@/components/hero";
import { InteractiveIntro } from "@/components/interactive-intro";
import { FeaturedProjects } from "@/components/featured-projects";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { OpenSourceContribution } from "@/components/open-source";
import { Achievements } from "@/components/achievements";
import { TechnicalCapabilities } from "@/components/technical-capabilities";
import { Education } from "@/components/education";
import { Languages } from "@/components/languages";
import { Contact } from "@/components/contact";
import { ResumeDownload } from "@/components/resume-download";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip pb-20 xl:pb-0">
      <ScrollTelemetry />
      <DinoRunner />

      <div id="hero">
        <Hero />
      </div>

      <div id="intro">
        <InteractiveIntro />
      </div>

      <div id="projects">
        <FeaturedProjects />
      </div>

      <div id="experience">
        <ExperienceTimeline />
      </div>

      <div id="open-source">
        <OpenSourceContribution />
      </div>

      <div id="achievements">
        <Achievements />
      </div>

      <div id="skills">
        <TechnicalCapabilities />
      </div>

      <div id="education">
        <Education />
      </div>

      <div id="languages">
        <Languages />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <ResumeDownload />
    </main>
  );
}
