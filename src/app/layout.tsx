import "../globals.css";

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Mohammed Thaneesh - Engineering Archive",
  description:
    "Personal portfolio of Mohammed Thaneesh, Software Engineer specializing in backend development, systems engineering, full-stack and AI/ML",
  keywords: [
    "Mohammed Thaneesh",
    "Software Engineer",
    "portfolio",
    "backend",
    "systems engineering",
    "AI/ML",
    "Go",
    "TypeScript",
  ],
  authors: [{ name: "Mohammed Thaneesh", url: "https://github.com/mthanish" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mohammed Thaneesh - Engineering Archive",
    description: "Personal portfolio of Mohammed Thaneesh, Software Engineer",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    siteName: "Engineering Archive",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="bg-charcoal text-[var(--fg)] min-h-screen font-mono antialiased overflow-x-clip" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
