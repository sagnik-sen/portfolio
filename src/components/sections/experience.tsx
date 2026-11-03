import { Section } from "@/components/section";

const TIMELINE = [
  {
    date: "May – Jul 2026",
    title: "Software Developer Intern",
    org: "Wizergos",
    description:
      "Built an LLM-based classifier for insurance email: prompt engineering, vLLM inference on Gemma, LoRA/QLoRA fine-tuning and an evaluation pipeline, all on an NVIDIA A30.",
  },
  {
    date: "2025 – now",
    title: "General Secretary",
    org: "Google Developer Groups on Campus, VIT Chennai",
    description:
      "Run operations for the chapter: events, cross-functional teams and logistics for hackathons and community programs. Previously Marketing Lead.",
  },
  {
    date: "2024 – 2028",
    title: "B.Tech, Computer Science",
    org: "VIT Chennai",
    description:
      "Focused on AI/ML and generative AI, alongside computer networks, theory of computation and databases.",
  },
];

export function Experience() {
  return (
    <Section id="experience" label="Experience">
      <ul className="divide-y divide-line border-y border-line">
        {TIMELINE.map((item) => (
          <li key={item.title} className="grid gap-2 py-8 md:grid-cols-[9rem_1fr] md:gap-8">
            <span className="font-mono text-[13px] text-tertiary md:pt-1">{item.date}</span>
            <div>
              <h3 className="text-lg text-primary">
                {item.title}, <span className="text-secondary">{item.org}</span>
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-secondary">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
