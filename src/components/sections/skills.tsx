"use client";

import { motion } from "framer-motion";

const GROUPS = [
  {
    label: "LLM & GenAI",
    items: [
      "Prompt engineering",
      "vLLM",
      "Gemma",
      "LoRA / QLoRA fine-tuning",
      "Unsloth",
      "TRL",
      "Transformers",
      "RAG",
      "IBM watsonx.ai",
    ],
  },
  {
    label: "ML & data",
    items: ["PyTorch", "scikit-learn", "Feature engineering", "Model evaluation"],
  },
  {
    label: "Cloud & platforms",
    items: ["Google Cloud", "Vertex AI", "Gemini API", "NVIDIA A30 (GPU inference)"],
  },
  {
    label: "Building & shipping",
    items: ["Python", "Streamlit", "Next.js", "React"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-32 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Toolkit
        </span>
        <h2 className="mt-4 text-3xl font-medium leading-tight text-primary md:text-4xl">
          What I actually reach for.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        {GROUPS.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-mono text-[12px] uppercase tracking-[0.15em] text-accent-blue">
              {group.label}
            </h3>
            <p className="mt-3 text-xl leading-relaxed text-secondary">
              {group.items.map((item, idx) => (
                <span key={item}>
                  <span className="text-primary/90 hover:text-primary transition-colors">
                    {item}
                  </span>
                  {idx < group.items.length - 1 && (
                    <span className="text-tertiary"> · </span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
