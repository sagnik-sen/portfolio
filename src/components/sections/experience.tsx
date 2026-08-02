"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    date: "May — Jul 2026",
    title: "Software Developer Intern",
    org: "Wizergos",
    description:
      "Built an LLM-based insurance email classification system — prompt engineering, vLLM inference on Gemma models, LoRA/QLoRA fine-tuning, and evaluation pipelines on an NVIDIA A30.",
  },
  {
    date: "2025 — Present",
    title: "General Secretary",
    org: "Google Developer Groups on Campus, VIT Chennai",
    description:
      "Lead operations across the chapter — event execution, cross-functional teams, and logistics for hackathons and community programs. Previously Marketing Lead.",
  },
  {
    date: "2024 — 2028",
    title: "B.Tech, Computer Science",
    org: "VIT Chennai",
    description:
      "Focus on AI/ML and generative AI, alongside coursework in computer networks, theory of computation, and databases.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Experience
        </span>
        <h2 className="mt-4 text-3xl font-medium leading-tight text-primary md:text-4xl">
          Where the time went.
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-line md:left-[11.5rem]" />

        <div className="space-y-14">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-1 gap-2 pl-8 md:grid-cols-[10rem_1fr] md:gap-8 md:pl-0"
            >
              <div className="absolute left-[-5px] top-2 h-[9px] w-[9px] rounded-full bg-accent-blue md:left-[11rem]" />
              <span className="font-mono text-[13px] text-tertiary md:pl-8 md:text-right">
                {item.date}
              </span>
              <div className="md:pl-8">
                <h3 className="text-lg font-medium text-primary">
                  {item.title}
                  <span className="font-normal text-secondary"> · {item.org}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-secondary">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
