"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { NeuralField } from "@/components/neural-field";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24"
    >
      <NeuralField className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent-blue"
        >
          Computer Science — VIT Chennai · AI &amp; GenAI
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="mt-6 max-w-4xl text-balance text-[2.75rem] font-medium leading-[1.05] tracking-tight text-primary sm:text-6xl md:text-7xl"
        >
          I build AI systems that ship — not notebooks that impress.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="mt-8 max-w-xl text-lg leading-relaxed text-secondary"
        >
          I work in the space between LLM research and production
          infrastructure — fine-tuning, evaluation pipelines, and the
          unglamorous plumbing that makes a model reliable enough to trust.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.34}
          className="mt-12 flex items-center gap-8"
        >
          <a
            href="#work"
            className="focus-ring group flex items-center gap-2 font-mono text-sm text-primary"
          >
            View work
            <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="focus-ring font-mono text-sm text-secondary transition-colors hover:text-primary"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
