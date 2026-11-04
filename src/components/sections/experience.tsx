const TIMELINE = [
  { date: "2026", title: "Software Developer Intern", org: "Wizergos" },
  { date: "2025 – now", title: "General Secretary, earlier Marketing Lead", org: "GDG on Campus VIT Chennai" },
  { date: "2024 – 2028", title: "B.Tech, Computer Science", org: "VIT Chennai" },
];

export function Experience() {
  return (
    <section id="experience" className="mt-24">
      <h2 className="font-serif text-3xl text-primary">Work &amp; school</h2>
      <ul className="mt-8 space-y-4">
        {TIMELINE.map((item) => (
          <li key={item.title} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
            <span className="font-mono text-[13px] text-tertiary sm:pt-1">{item.date}</span>
            <span className="text-secondary">
              <span className="text-primary">{item.title}</span>, {item.org}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
