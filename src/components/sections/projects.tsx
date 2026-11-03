import { Section } from "@/components/section";

const PROJECTS = [
  {
    title: "Insurance email classification",
    context: "Internship at Wizergos, 2026",
    description:
      "Inbound insurance email was being triaged by hand, and rule-based sorting fell apart as soon as people wrote naturally. I built an LLM classifier that routes each message before anyone opens it. I started with prompt design, moved to serving Gemma through vLLM, then fine-tuned with LoRA and QLoRA using Unsloth, TRL and Transformers on an A30. An evaluation pipeline ran alongside, so every prompt or model change was scored the same way.",
    stack: ["vLLM", "Gemma", "LoRA / QLoRA", "Unsloth", "TRL", "NVIDIA A30"],
  },
  {
    title: "Time Capsule Narrator",
    context: "Personal project",
    description:
      "You write down a memory and get it back as a short narrated audio piece. IBM watsonx shapes the text into a narrative, and Bark TTS reads it aloud. The idea came from noticing that people rarely reread old notes, but they might listen to them.",
    stack: ["IBM watsonx", "Bark TTS"],
  },
  {
    title: "AI Personal Coach",
    context: "Capstone project",
    description:
      "A coaching assistant that answers from a fixed knowledge base instead of the model's general knowledge. It retrieves the relevant passages first and then generates a reply, so every answer can be traced back to a source. Built as a RAG pipeline with a Streamlit front end.",
    stack: ["Streamlit", "RAG", "Vector retrieval"],
  },
];

export function Projects() {
  return (
    <Section id="work" label="Selected work">
      <ol className="space-y-16 md:space-y-20">
        {PROJECTS.map((p, i) => (
          <li key={p.title} className="grid gap-4 md:grid-cols-[3rem_1fr]">
            <span className="font-mono text-[13px] text-accent md:pt-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <article>
              <h3 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-2 font-mono text-[13px] text-tertiary">{p.context}</p>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-secondary">
                {p.description}
              </p>
              <p className="mt-5 font-mono text-[13px] text-tertiary">
                {p.stack.join("  /  ")}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
