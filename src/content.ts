// All site copy lives here. The menu in src/components/menu.tsx renders it.

export const EMAIL = "sen.sagnik9@gmail.com";
export const GITHUB = "https://github.com/sagnik-sen";
export const LINKEDIN = "https://www.linkedin.com/in/sagnik-sen-71b848193/";

export type Project = { name: string; url?: string; year: string; note: string; tags: string };

export const PROJECTS: Project[] = [
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

export const OLDER = [
  { name: "OpenEscrow", url: "https://github.com/GryffinX/OpenEscrow" },
  { name: "CarbonCred", url: "https://github.com/GryffinX/CarbonCred" },
  { name: "ProjectHub", url: "https://github.com/sagnik-sen/ProjectHub" },
];

export const TIMELINE = [
  { date: "2026", title: "Software Developer Intern", org: "Wizergos" },
  { date: "2025-now", title: "General Secretary (earlier Marketing Lead)", org: "GDG on Campus VIT Chennai" },
  { date: "2024-2028", title: "B.Tech, Computer Science", org: "VIT Chennai" },
];

export const EVENTS = [
  "DevsHouse '25 (MLH-partnered hackathon)",
  "Google Solution Challenge 2025",
  "GenAI Exchange Hackathon",
  "Flutter Frames",
  "Google Cloud Arcade 2025",
];

export const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
