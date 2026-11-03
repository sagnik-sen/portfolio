import { Section } from "@/components/section";

const INITIATIVES = [
  { name: "DevsHouse '25", note: "MLH-partnered hackathon" },
  { name: "Google Solution Challenge 2025", note: "Global student build program" },
  { name: "GenAI Exchange Hackathon", note: "Applied GenAI build sprint" },
  { name: "Flutter Frames", note: "Mobile dev community event" },
  { name: "Google Cloud Arcade 2025", note: "Cloud skills challenge" },
];

export function Leadership() {
  return (
    <Section id="leadership" label="Community">
      <p className="max-w-2xl text-lg leading-relaxed text-secondary">
        Programs I&apos;ve helped run with GDG on Campus VIT Chennai.
      </p>
      <ul className="mt-10 border-t border-line">
        {INITIATIVES.map((item) => (
          <li
            key={item.name}
            className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="font-serif text-2xl text-primary md:text-3xl">{item.name}</span>
            <span className="font-mono text-[13px] text-tertiary">{item.note}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
