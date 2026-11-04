import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { EMAIL, GITHUB, LINKEDIN, SITE_URL } from "@/content";
import "./globals.css";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const terminal = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sagnik Sen · Applied AI portfolio",
  description:
    "Computer science student at VIT Chennai working on applied machine learning: fine-tuning, serving and evaluating language models.",
  alternates: { canonical: "/" },
};

// Runs before first paint: restores the saved theme and decides whether to show
// the boot screen (once per tab session, never with reduced motion).
const preload = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t)d.dataset.theme=t;if(!sessionStorage.getItem("booted")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.boot="1"}catch(e){}`;

// Without JS, show the screens as one long page and hide the touch controls. Must sit in
// Tailwind's base layer: its layered [hidden]{display:none!important} beats unlayered !important.
const noscript = `<style>@layer base{section[hidden]:not([data-js-only]){display:block!important}.dpad,.boot,button[data-item]{display:none!important}}</style>`;

// schema.org Person for search engines; "<" is escaped so the JSON can't close the script tag.
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sagnik Sen",
  url: SITE_URL,
  sameAs: [GITHUB, LINKEDIN],
  email: `mailto:${EMAIL}`,
  affiliation: { "@type": "CollegeOrUniversity", name: "VIT Chennai" },
  knowsAbout: ["Machine learning", "Large language models", "LLM fine-tuning", "LLM evaluation"],
}).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixel.variable} ${terminal.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preload }} />
        <noscript dangerouslySetInnerHTML={{ __html: noscript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
