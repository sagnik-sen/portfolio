const EVENTS = [
  "DevsHouse '25, an MLH-partnered hackathon",
  "Google Solution Challenge 2025",
  "the GenAI Exchange Hackathon",
  "Flutter Frames",
  "Google Cloud Arcade 2025",
];

export function Leadership() {
  return (
    <section id="community" className="mt-24">
      <h2 className="font-serif text-3xl text-primary">Community</h2>
      <p className="mt-8 leading-relaxed text-secondary">
        I&apos;m General Secretary of Google Developer Groups on Campus at VIT
        Chennai, which mostly means planning events, keeping teams in sync and
        sorting out logistics. Programs I&apos;ve helped run include{" "}
        {EVENTS.slice(0, -1).join(", ")} and {EVENTS.at(-1)}. I built{" "}
        <a href="https://github.com/sagnik-sen/GDGdex" className="link text-primary">
          GDGdex
        </a>{" "}
        so people at our meetups would actually talk to each other.
      </p>
    </section>
  );
}
