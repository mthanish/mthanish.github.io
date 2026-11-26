import { Download } from "lucide-react";

export function ResumeDownload() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[var(--border)]">
      <a
        href="/resume.pdf"
        download="mohammed-thaneesh-resume.pdf"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[var(--accent)] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
        aria-label="Download resume"
      >
        <Download className="w-5 h-5" />
        Resume
      </a>
    </footer>
  );
}
