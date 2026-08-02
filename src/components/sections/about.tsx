"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.4fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
            About
          </span>
          <h2 className="mt-4 text-3xl font-medium leading-tight text-primary md:text-4xl">
            Trained on breadth,
            <br />
            specializing in depth.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 text-lg leading-relaxed text-secondary"
        >
          <p>
            I&apos;m a Computer Science student at VIT Chennai, most recently
            spending a summer inside a real production LLM pipeline —
            classifying insurance email at scale, running inference on
            vLLM, and fine-tuning open models with LoRA and QLoRA until
            the evaluation numbers actually held up.
          </p>
          <p>
            Outside coursework, I lead operations for{" "}
            <span className="text-primary">Google Developer Groups on
            Campus, VIT Chennai</span> — running the events, teams, and
            logistics behind hackathons and community programs that reach
            hundreds of students. It taught me the part of engineering
            that doesn&apos;t show up in a notebook: shipping under a
            deadline, with people depending on you.
          </p>
          <p>
            I care about the layer between a model that works in a demo
            and one that works in production — evaluation, guardrails,
            and the judgment to know the difference.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
