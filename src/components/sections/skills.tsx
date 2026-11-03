import { Section } from "@/components/section";

const GROUPS = [
  {
    label: "LLMs",
    items: [
      "Prompt engineering",
      "vLLM",
      "Gemma",
      "LoRA / QLoRA",
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
    label: "Cloud",
    items: ["Google Cloud", "Vertex AI", "Gemini API", "NVIDIA A30 (GPU inference)"],
  },
  {
    label: "Building",
    items: ["Python", "Streamlit", "Next.js", "React"],
  },
];

export function Skills() {
  return (
    <Section id="skills" label="Tools">
      <dl className="border-t border-line">
        {GROUPS.map((group) => (
          <div
            key={group.label}
            className="grid gap-1 border-b border-line py-5 md:grid-cols-[9rem_1fr] md:gap-8"
          >
            <dt className="font-mono text-[13px] text-tertiary md:pt-0.5">{group.label}</dt>
            <dd className="text-[17px] leading-relaxed text-primary">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
