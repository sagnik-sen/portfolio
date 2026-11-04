// All site copy lives here. The menu in src/components/menu.tsx renders it.

export const EMAIL = "sen.sagnik9@gmail.com";
export const GITHUB = "https://github.com/sagnik-sen";
export const LINKEDIN = "https://www.linkedin.com/in/sagnik-sen-71b848193/";
export const SITE_URL = "https://sagnik-sen.vercel.app";

export const INTRO =
  "Hi, I'm Sagnik, a computer science student at VIT Chennai. I build things around language models and the tools that measure them. This past summer I interned at Wizergos in Bengaluru, where I fine-tuned a small model to sort insurance email. On campus I'm General Secretary of GDG on Campus VIT Chennai and Programme Representative for B.Tech CSE.";

export type Project = {
  name: string;
  year: string;
  context: string;
  note: string;
  facts?: string[];
  tags: string;
  url?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Insurance email classifier",
    year: "2026",
    context: "Internship at Wizergos. Code is private.",
    note: "I fine-tuned a small Gemma model with QLoRA to sort insurance customer emails into seven categories, replacing a long prompt with trained weights. I cleaned about 10k labelled emails and ran a numbered series of experiments on rank, epochs and RS-LoRA. One early result of 35% turned out to be a mismatch between training and evaluation prompt formats, not failed training.",
    facts: [
      "94.4% accuracy on 693 held-out emails",
      "37% for the same model before fine-tuning",
      "3,157 duplicate rows removed from the training data",
    ],
    tags: "Gemma, Unsloth, QLoRA, TRL, PyTorch, NVIDIA A30",
  },
  {
    name: "UrbanPulse Chennai",
    year: "2026",
    context: "Smart-cities course project, with Ayush Gupta. Code is private.",
    note: "A flood-response prototype for Chennai: a staff command center, an offline Tamil/English citizen app, and an audit log sealed on the Shardeum testnet so later edits can be detected. It forecasts water levels, predicts heavy rain with XGBoost trained on 25 years of ERA5 weather data, and assigns evacuees to shelters with min-cost max-flow over real road routes. Sensors and shelters are simulated; the weather data, roads, ward map and blockchain anchoring are real.",
    facts: [
      "0% of evacuees left without a bed, vs 31.7% for nearest-shelter (1,600 simulated runs)",
      "200/200 tampering attempts on sealed records detected, no false alarms",
      "6 ms per update across all 200 city wards",
    ],
    tags: "Node.js, React, Solidity, XGBoost, OSRM",
  },
  {
    name: "Atlas",
    year: "2026",
    context: "Design work plus a throwaway prototype.",
    note: "A design for turning a repository into typed facts (declarations, calls, imports) with source tracking, so people and AI agents can ask questions like \"what calls this, directly or indirectly?\". I tested it with a TypeScript extractor against the Zod library and its git history, and wrote up what the measurements showed, including bugs in my own extractor that I had first mistaken for findings.",
    facts: [
      "Call resolution raised from 16.6% to 96.6% on Zod (~30k lines)",
      "132 files indexed into ~34k facts in about 3 seconds",
      "389 commits of history extracted to test stable IDs",
    ],
    tags: "TypeScript, ts-morph, Node.js",
    url: "https://github.com/sagnik-sen/atlas",
  },
  {
    name: "traise",
    year: "2026",
    context: "Personal project.",
    note: "A harness that runs Claude Code on a small task repo many times and grades each run by its test command, failing any run that edits the tests. Every run is saved as JSON with cost, turns, files changed and a simplified tool sequence, and a compare command shows how two runs reached their results differently. The bundled tasks include an impossible one and a real bug planted in pallets/itsdangerous.",
    tags: "Python, Claude Code CLI, unittest",
    url: "https://github.com/sagnik-sen/traise",
  },
  {
    name: "Ephemera",
    year: "2026",
    context: "Cloud course project.",
    note: "File sharing where every link expires, from 2 minutes to 7 days. Browsers upload and download straight to a private S3 bucket through presigned URLs locked to the file's size and type, and a Lambda on a 5-minute schedule deletes expired files using a sparse DynamoDB index. I also wrote scripts to provision, verify and tear down the whole stack.",
    facts: ["16 of 17 end-to-end checks passed against the live AWS deployment"],
    tags: "AWS, FastAPI, DynamoDB, Lambda, React",
    url: "https://github.com/sagnik-sen/ephemera",
  },
  {
    name: "GDGdex",
    year: "2026",
    context: "Built for a GDG on Campus meetup.",
    note: "An icebreaker game: meet someone, scan their QR code, and they join your collection. Most people collected wins. The database enforces the rules itself, so duplicate or self-collection is impossible even with concurrent requests, and there's an admin dashboard, a projector leaderboard and automatic backups.",
    facts: ["Tuned for a 180-person newcomer meetup"],
    tags: "Flutter, Dart, SQLite, Docker",
    url: "https://github.com/sagnik-sen/GDGdex",
  },
  {
    name: "PulseGuard",
    year: "2026",
    context: "VMedithon 3.0 hackathon, team Hack Daniels.",
    note: "A phone app that reads heart rate, HRV and breathing from a fingertip over the camera and flags anaphylaxis risk when several body systems drift from your own baseline at once. My part was the ML side: the baseline and deviation engine and the tree models (Isolation Forest, Random Forest, gradient boosting), which I ported to Dart so they run on the phone. The models are trained on synthetic data for now.",
    tags: "Flutter, Dart, scikit-learn, signal processing",
    url: "https://github.com/Dhyankannoth/daansATD",
  },
  {
    name: "OpenEscrow",
    year: "2026",
    context: "Defy '26 hackathon. I was team lead.",
    note: "A milestone-based escrow app. A Solidity contract on the Shardeum testnet locks the buyer's funds and releases them to the seller as each milestone is approved, and a dispute freezes whatever is left. The React frontend connects through MetaMask.",
    tags: "Solidity, Shardeum, React, ethers.js",
    url: "https://github.com/GryffinX/OpenEscrow",
  },
  {
    name: "promptcheck",
    year: "2026",
    context: "Personal project.",
    note: "A small CLI that scores an LLM classifier's predictions from a CSV (accuracy plus weighted precision, recall and F1) and saves each run as numbered JSON, so prompt versions can be diffed or committed. It has strict typing, tests and CI.",
    tags: "Python, Typer, scikit-learn, pytest",
    url: "https://github.com/sagnik-sen/promptcheck",
  },
];

export const OLDER = [
  { name: "AI Personal Coach (GenAI capstone)", url: "https://github.com/sagnik-sen/ai-personal-coach" },
  { name: "ProjectHub (web programming course)", url: "https://github.com/sagnik-sen/ProjectHub" },
  { name: "CarbonCred (hackathon team)", url: "https://github.com/GryffinX/CarbonCred" },
];

export type Entry = { date: string; title: string; org: string; note?: string };

export const EXPERIENCE: Entry[] = [
  {
    date: "May-Jul 2026",
    title: "Software Engineer Intern",
    org: "Wizergos, Bengaluru",
    note: "Fine-tuned a small LLM to classify insurance email: 94.4% on held-out data, up from 37%.",
  },
  { date: "Aug 2026-now", title: "Programme Representative, B.Tech CSE", org: "VIT Chennai" },
  { date: "Jun 2026-now", title: "General Secretary", org: "GDG on Campus VIT Chennai" },
  { date: "Jul 2025-now", title: "Competitive Programming Team", org: "CodeChef VIT Chennai" },
];

export const GDG_ROLES: Entry[] = [
  { date: "Jun 2026-now", title: "General Secretary", org: "GDG on Campus VIT Chennai" },
  { date: "Jun 2025-Jul 2026", title: "Marketing Lead", org: "GDG on Campus VIT Chennai" },
  { date: "Dec 2024-Jul 2026", title: "Social Media Manager", org: "GDG on Campus VIT Chennai" },
  { date: "Dec 2024-Jun 2025", title: "Marketing Team", org: "GDG on Campus VIT Chennai" },
];

export const EDUCATION: Entry[] = [
  { date: "2024-2028", title: "B.Tech, Computer Science", org: "VIT Chennai", note: "CGPA 9.14" },
  { date: "2011-2022", title: "School", org: "St. Michael's School, Siliguri", note: "99.2%" },
];

export const CERTIFICATIONS: Entry[] = [
  { date: "Jan 2026", title: "Blockchain Basics", org: "Cyfrin Updraft" },
  { date: "Jun 2025", title: "Generative AI using IBM watsonx", org: "IBM Career Education Program" },
];

export const EVENTS = [
  "DevsHouse '25 (MLH-partnered hackathon)",
  "Google Solution Challenge 2025",
  "GenAI Exchange Hackathon",
  "Flutter Frames",
  "Google Cloud Arcade 2025",
];

// Shown on the hidden screen unlocked by the Konami code.
export const CHEATS = [
  "HIGH SCORE: CGPA 9.14",
  "SPEEDRUN: 37% to 94.4% accuracy in one internship",
  "BOSS FIGHT: 200/200 tampering attempts caught (UrbanPulse)",
  "PARTY SIZE: GDGdex built for a 180-player meetup",
  "SIDE QUESTS: 4 GDG roles since Dec 2024",
  "LIVES LEFT: 1. Hire before game over.",
];

export const ACHIEVEMENTS = [
  { id: "explorer", title: "Explorer", hint: "Open every project" },
  { id: "recruiter", title: "Recruiter mode", hint: "Open the contact screen" },
  { id: "stylist", title: "Interior designer", hint: "Change the palette" },
  { id: "dj", title: "DJ", hint: "Turn the sound on" },
  { id: "hacker", title: "Hacker", hint: "Run a command in the terminal" },
  { id: "cheater", title: "Cheater", hint: "Enter an old cheat code" },
  { id: "patient", title: "Patient player", hint: "Watch the whole boot screen" },
  { id: "lost", title: "Lost in the void", hint: "Find a page that doesn't exist" },
];

const hackathons = [...PROJECTS.map((p) => p.context), ...OLDER.map((o) => o.name)].filter((s) =>
  /hackathon/i.test(s),
).length;

// The "save file" screen: every number is derived from the data above.
export const STATS = [
  { label: "Level", value: "B.Tech CSE, VIT Chennai" },
  { label: "High score", value: "CGPA 9.14" },
  { label: "Quests", value: `${PROJECTS.length} projects + ${OLDER.length} side quests` },
  { label: "Hackathons", value: String(hackathons) },
  { label: "Events run", value: String(EVENTS.length) },
  { label: "Guild ranks", value: `${GDG_ROLES.length} GDG roles` },
  { label: "Badges", value: `${CERTIFICATIONS.length} certifications` },
  { label: "Looking for", value: "Internships in applied AI" },
];

export const slug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
