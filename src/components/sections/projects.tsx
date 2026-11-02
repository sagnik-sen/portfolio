"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";

const PROJECTS = [
  {
    variant: 1 as const,
    eyebrow: "Internship — Wizergos",
    title: "Insurance email classification, at production scale",
    summary:
      "An LLM pipeline that routes inbound insurance email before a human ever opens it.",
    problem:
      "Manual triage of inbound insurance correspondence is slow and inconsistent, and rule-based sorting breaks the moment language gets messy.",
    solution:
      "Designed prompt strategies for LLM-based classification and served inference through vLLM on Gemma models, then fine-tuned with LoRA and QLoRA on an NVIDIA A30 using Unsloth, TRL, and Transformers — with a dedicated evaluation pipeline to keep the model honest.",
    stack: ["vLLM", "Gemma", "LoRA / QLoRA", "Unsloth", "TRL", "NVIDIA A30"],
    impact:
      "Shipped as a working internal system, not a notebook — the full loop from prompt design to fine-tuned inference to evaluation.",
  },
  {
    variant: 2 as const,
    eyebrow: "Personal project",
    title: "Time Capsule Narrator",
    summary: "Turns written memories into narrated audio time capsules.",
    problem:
      "Personal memories written down tend to stay unread. Voice carries emotion that text alone doesn't.",
    solution:
      "Built a pipeline on IBM Watsonx that structures a memory into a narrative, then renders it as natural speech with Bark TTS — so a memory can be listened to, not just read.",
    stack: ["IBM Watsonx", "Bark TTS"],
    impact:
      "A working demonstration of taking a model output past text — into a format people actually want to revisit.",
  },
  {
    variant: 3 as const,
    eyebrow: "Capstone project",
    title: "AI Personal Coach",
    summary:
      "A retrieval-grounded coaching assistant that answers from real material, not guesses.",
    problem:
      "Generic chatbot advice is easy to produce and easy to distrust — it isn't grounded in anything specific to the person asking.",
    solution:
      "Built a RAG pipeline that retrieves from a defined knowledge base before generating a response, wrapped in a Streamlit interface, so every answer traces back to a source.",
    stack: ["Streamlit", "RAG", "Vector retrieval"],
    impact:
      "Capstone project focused on grounding — treating retrieval as the reliability layer, not an afterthought.",
  },
];

export function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Selected work
        </span>
        <h2 className="mt-4 max-w-xl text-3xl font-medium leading-tight text-primary md:text-4xl">
          Three systems, three problems worth solving properly.
        </h2>
      </motion.div>

      <div className="space-y-28 md:space-y-40">
        {PROJECTS.map((p, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16 ${
                reversed ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[5/4] w-full overflow-hidden rounded-sm border border-line">
                <ProjectVisual variant={p.variant} />
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                  {p.eyebrow}
                </span>
                <h3 className="mt-4 text-2xl font-medium leading-snug text-primary md:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="mt-3 text-base text-secondary">{p.summary}</p>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-tertiary">
                      Problem
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {p.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-tertiary">
                      Solution
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {p.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-tertiary">
                      Impact
                    </dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-secondary">
                      {p.impact}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[12px] text-tertiary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="focus-ring group mt-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-primary"
                >
                  Ask me about this
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
