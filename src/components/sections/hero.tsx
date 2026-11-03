const FACTS = [
  { label: "Now", value: "B.Tech Computer Science, VIT Chennai (2024–2028)" },
  { label: "Previously", value: "Software Developer Intern, Wizergos" },
  { label: "Also", value: "General Secretary, GDG on Campus VIT Chennai" },
  { label: "Based in", value: "Chennai, India" },
];

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:px-10 md:pb-28 md:pt-32">
      <h1 className="font-serif text-[4.5rem] leading-[0.9] tracking-tight text-primary sm:text-8xl md:text-[9rem]">
        Sagnik Sen
      </h1>

      <p className="mt-10 max-w-2xl text-xl leading-relaxed text-secondary md:text-2xl md:leading-relaxed">
        I&apos;m a computer science student who works on applied machine
        learning, mostly language models: <span className="text-primary">fine-tuning
        them, serving them, and checking whether they&apos;re any good</span>.
      </p>

      <dl className="mt-14 grid gap-x-8 gap-y-4 text-[15px] sm:grid-cols-2 md:mt-20">
        {FACTS.map((f) => (
          <div key={f.label} className="flex gap-4 border-t border-line pt-4">
            <dt className="w-24 shrink-0 font-mono text-[13px] text-tertiary">{f.label}</dt>
            <dd className="text-secondary">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
