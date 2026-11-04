const PROJECTS = [
  {
    name: "Insurance email classifier",
    year: "2026",
    note: "Internship at Wizergos. Prompt design, vLLM serving on Gemma, LoRA/QLoRA fine-tuning on an A30, and an evaluation pipeline to score every change. The code is private.",
    tags: "vLLM, Gemma, Unsloth, TRL",
  },
  {
    name: "promptcheck",
    url: "https://github.com/sagnik-sen/promptcheck",
    year: "2026",
    note: "A small CLI that scores LLM classification runs from a CSV of predictions and saves each run as JSON, so prompt versions can be compared and diffed.",
    tags: "Python, scikit-learn",
  },
  {
    name: "traise",
    url: "https://github.com/sagnik-sen/traise",
    year: "2026",
    note: "Runs an AI coding agent against the same repo task many times, grades each attempt with the repo's tests, and aggregates the results.",
    tags: "Python",
  },
  {
    name: "Atlas",
    url: "https://github.com/sagnik-sen/atlas",
    year: "2026",
    note: "Design work, plus a throwaway prototype, for turning a repository into a typed, provenance-tracked fact base you can query, with a graph as one view of it.",
    tags: "TypeScript, ts-morph",
  },
  {
    name: "Ephemera",
    url: "https://github.com/sagnik-sen/ephemera",
    year: "2026",
    note: "Temporary file sharing. Upload a file, pick how long it lives, share the link. A scheduled Lambda deletes it from S3 when time is up.",
    tags: "FastAPI, AWS",
  },
  {
    name: "GDGdex",
    url: "https://github.com/sagnik-sen/GDGdex",
    year: "2026",
    note: "An icebreaker game for our GDG meetups: scan people's QR codes to collect them, with a live leaderboard on the projector.",
    tags: "Flutter, Dart, SQLite",
  },
  {
    name: "PulseGuard",
    url: "https://github.com/Dhyankannoth/daansATD",
    year: "2026",
    note: "Hackathon team project. A phone-only early-warning app for anaphylaxis that reads your pulse from the camera and watches for deviations from your own baseline.",
    tags: "Flutter, signal processing",
  },
  {
    name: "Medical AI agent",
    url: "https://github.com/sagnik-sen/medical-ai-agent",
    year: "2025",
    note: "An assistant for doctors, starting with my father, that helps with medical text tasks. Where I first learned RAG, LoRA and QLoRA.",
    tags: "PyTorch, Hugging Face",
  },
  {
    name: "Time Capsule Narrator",
    url: "https://github.com/sagnik-sen/time-capsule-narrator",
    year: "2025",
    note: "Turns a written memory into a short narrated audio piece.",
    tags: "IBM watsonx, Bark TTS",
  },
  {
    name: "AI Personal Coach",
    url: "https://github.com/sagnik-sen/ai-personal-coach",
    year: "2025",
    note: "My GenAI capstone: a coaching app that grounds its answers in a small knowledge base.",
    tags: "Streamlit, watsonx, RAG",
  },
];

const OLDER = [
  { name: "OpenEscrow", url: "https://github.com/GryffinX/OpenEscrow" },
  { name: "CarbonCred", url: "https://github.com/GryffinX/CarbonCred" },
  { name: "ProjectHub", url: "https://github.com/sagnik-sen/ProjectHub" },
  { name: "IMDB sentiment analysis", url: "https://github.com/sagnik-sen/imdb-sentiment-analysis" },
  { name: "ML algorithms from scratch", url: "https://github.com/sagnik-sen/Nexus" },
];

export function Projects() {
  return (
    <section id="work" className="mt-24">
      <h2 className="font-serif text-3xl text-primary">Things I&apos;ve made</h2>
      <ul className="mt-8 space-y-8">
        {PROJECTS.map((p) => (
          <li key={p.name}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[17px] text-primary">
                {p.url ? (
                  <a href={p.url} className="link">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              <span className="font-mono text-[13px] text-tertiary">{p.year}</span>
            </div>
            <p className="mt-1.5 leading-relaxed text-secondary">{p.note}</p>
            <p className="mt-1.5 font-mono text-[13px] text-tertiary">{p.tags}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 leading-relaxed text-secondary">
        Also:{" "}
        {OLDER.map((o, i) => (
          <span key={o.name}>
            <a href={o.url} className="link">
              {o.name}
            </a>
            {i < OLDER.length - 1 ? ", " : "."}
          </span>
        ))}{" "}
        Everything else is on{" "}
        <a href="https://github.com/sagnik-sen" className="link text-primary">
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
