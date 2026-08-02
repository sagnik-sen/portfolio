import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const geistSans = { variable: GeistSans.variable };
const geistMono = { variable: GeistMono.variable };

export const metadata: Metadata = {
  title: "Sagnik — AI Systems Engineer",
  description:
    "Computer Science student building applied AI/ML and GenAI systems — from LLM fine-tuning pipelines to production classification systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
