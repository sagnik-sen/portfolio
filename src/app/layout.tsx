import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
const terminal = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sagnik-sen.vercel.app"),
  title: "Sagnik Sen",
  description:
    "Computer science student at VIT Chennai working on applied machine learning: fine-tuning, serving and evaluating language models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pixel.variable} ${terminal.variable}`}>
      <body>{children}</body>
    </html>
  );
}
