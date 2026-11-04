export function Hero() {
  return (
    <section id="top" className="pt-16 md:pt-24">
      <h1 className="font-serif text-5xl text-primary md:text-6xl">
        Hi, I&apos;m Sagnik.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-secondary">
        <p>
          I&apos;m a third-year computer science student at VIT Chennai. I
          mostly build things around language models: fine-tuning them,
          serving them, and writing the little tools that tell me whether
          they&apos;re actually any good.
        </p>
        <p>
          This past summer I got to do that for real as an intern at{" "}
          <span className="text-primary">Wizergos</span>, where I worked on an
          LLM system that sorts incoming insurance email. Outside class I run{" "}
          <a href="#community" className="link text-primary">
            GDG on Campus at VIT Chennai
          </a>
          .
        </p>
        <p>
          Lately I&apos;ve been designing{" "}
          <a href="https://github.com/sagnik-sen/atlas" className="link text-primary">
            Atlas
          </a>
          , an idea for turning a codebase into facts that people and AI agents
          can reason about.
        </p>
      </div>
    </section>
  );
}
