import { EMAIL } from "@/components/nav";

export function Contact() {
  return (
    <>
      <section id="contact" className="mt-24">
        <h2 className="font-serif text-3xl text-primary">Say hi</h2>
        <p className="mt-8 leading-relaxed text-secondary">
          I&apos;m looking for internships and roles in applied AI. The best
          way to reach me is{" "}
          <a href={`mailto:${EMAIL}`} className="link text-primary">
            {EMAIL}
          </a>
          , or find me on{" "}
          <a href="https://www.linkedin.com/in/sagnik-sen-71b848193/" className="link text-primary">
            LinkedIn
          </a>
          .
        </p>
      </section>
      <footer className="mt-24 border-t border-line py-8 font-mono text-[12px] text-tertiary">
        © {new Date().getFullYear()} Sagnik Sen. Built with Next.js.
      </footer>
    </>
  );
}
