"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NeuralField } from "@/components/neural-field";

const LINKS = [
  { label: "Email", href: "mailto:sen.sagnik9@gmail.com", display: "sen.sagnik9@gmail.com" },
  { label: "GitHub", href: "https://github.com/sagnik-sen", display: "github.com/sagnik-sen" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sagnik-sen-71b848193/", display: "linkedin.com/in/sagnik-sen" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 md:px-10"
    >
      <NeuralField
        density="compact"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.2]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
            Contact
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-tight text-primary md:text-5xl">
            Open to internships and roles in applied AI — let&apos;s talk.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col gap-5 border-t border-line pt-10 md:flex-row md:gap-16"
        >
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noreferrer" : undefined}
              className="focus-ring group flex items-center gap-1.5"
            >
              <span className="flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-tertiary">
                  {link.label}
                </span>
                <span className="mt-1 text-base text-secondary transition-colors group-hover:text-primary">
                  {link.display}
                </span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-tertiary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
            </a>
          ))}
        </motion.div>

        <p className="mt-24 font-mono text-[12px] text-tertiary">
          Designed &amp; built by Sagnik · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
