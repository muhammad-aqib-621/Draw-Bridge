import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pulseflow.dev"),
  title: {
    default: "PulseFlow: Diagrams in. Terraform out. Drift handled.",
    template: "%s | PulseFlow",
  },
  description:
    "Turn architecture diagrams and Mermaid files into reviewable Terraform, deploy to AWS, GCP, or Azure through pull requests, and let PulseFlow detect and repair drift automatically.",
  keywords: [
    "terraform",
    "infrastructure as code",
    "pulumi",
    "drift detection",
    "architecture diagrams",
    "platform engineering",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PulseFlow",
    title: "PulseFlow: Diagrams in. Terraform out. Drift handled.",
    description:
      "Import a diagram or Mermaid file, review the generated Terraform, and deploy to AWS, GCP, or Azure in one pull request.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseFlow: Diagrams in. Terraform out. Drift handled.",
    description:
      "Import a diagram or Mermaid file, review the generated Terraform, and deploy to AWS, GCP, or Azure in one pull request.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d14" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
  ],
};

/**
 * Runs before first paint: restores the persisted theme without a
 * flash of the wrong one. Dark is the default when nothing is stored.
 */
const themeInitScript = `(function(){try{if(localStorage.getItem("pf-theme")==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="pf-grain" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-card-sm focus:border focus:border-hairline-strong focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
