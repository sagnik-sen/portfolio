import { Section } from "@/components/section";

const EMAIL = "sen.sagnik9@gmail.com";

const LINKS = [
  { label: "GitHub", href: "https://github.com/sagnik-sen" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sagnik-sen-71b848193/" },
];

const linkClass =
  "focus-ring underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent";

export function Contact() {
  return (
    <>
      <Section id="contact" label="Contact">
        <p className="max-w-2xl text-xl leading-relaxed text-secondary md:text-2xl md:leading-relaxed">
          I&apos;m looking for internships and roles in applied AI. Email is
          the best way to reach me.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className={`${linkClass} mt-8 inline-block break-all font-serif text-4xl text-primary sm:text-5xl md:text-6xl`}
        >
          {EMAIL}
        </a>
        <ul className="mt-10 flex gap-8 text-[15px] text-secondary">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer" className={`${linkClass} hover:text-primary`}>
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-[12px] text-tertiary sm:flex-row sm:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Sagnik Sen</span>
          <span>Set in Instrument Serif and Geist. Built with Next.js.</span>
          <a href="#top" className="focus-ring transition-colors hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
