export const EMAIL = "sen.sagnik9@gmail.com";

const LINKS = [
  { href: "https://github.com/sagnik-sen", label: "GitHub" },
  { href: "https://www.linkedin.com/in/sagnik-sen-71b848193/", label: "LinkedIn" },
  { href: `mailto:${EMAIL}`, label: "Email" },
];

export function Nav() {
  return (
    <header className="flex items-baseline justify-between py-8 text-[15px]">
      <a href="#top" className="focus-ring text-primary">
        Sagnik Sen
      </a>
      <nav className="flex gap-5 text-secondary">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} className="link">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
