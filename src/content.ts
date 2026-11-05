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
  study?: CaseStudy;
};

// Long-form write-up shown at /projects/<slug>. Every number comes from the project's own repo.
export type CaseStudy = {
  why: string;
  how: string[];
  caption: string;
  decisions: { title: string; body: string }[];
  results: { value: string; label: string }[];
  caveat: string;
  next: string[];
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
    study: {
      why: "Chennai flooded badly in 2015 and again after Cyclone Michaung in 2023. Flood response needs three things at once: knowing where water is rising, getting people into shelters that still have room, and records that can be trusted afterwards. For a smart-cities course, Ayush Gupta and I built a prototype that covers all three and measured each part on its own.",
      how: [
        "One Node.js server ticks every 2 seconds. Each tick forecasts every zone's water level, fuses sensor readings with citizen reports, and opens an incident after two ticks above the danger line.",
        "Staff and citizens get updates over Socket.IO. Rescue phone numbers go only to responders, and the citizen app keeps a last-known snapshot for when the network drops.",
        "Evacuees are assigned to shelters with min-cost max-flow over real OSRM road routes. Each 200 m stretch is costed with the forecast for the minute an evacuee reaches it.",
        "Every 5 minutes, new audit-log entries are sealed as one Merkle root per agency on the Shardeum testnet. Anyone holding an entry and its proof can check it hasn't changed since.",
        "A heavy-rain model trained on 25 years of ERA5 weather data runs every 10 minutes as an advisory signal. Alerts come only from water levels.",
      ],
      caption: "One server process: inputs at the top, the 2-second tick in the middle, and what each audience receives at the bottom.",
      decisions: [
        {
          title: "Exact shelter assignment instead of nearest shelter",
          body: "Sending everyone to their nearest shelter can strand a group whose only good option filled up first. Min-cost max-flow houses the most people possible, then picks the cheapest such plan. The price is longer trips: 6.18 minutes on average against 3.48 for nearest shelter in our runs.",
        },
        {
          title: "Seal batches, not single records",
          body: "One Merkle root per agency every 5 minutes costs about 76,000 gas whatever the batch size, and no personal data goes on a public chain. The price is a window: an entry edited before it is sealed gets sealed as genuine, and our tests detected none of those edits.",
        },
        {
          title: "One process with SQLite",
          body: "Node's built-in SQLite means one command starts the whole demo, and at 200 wards a tick takes 6 ms, so the CPU was never the limit. The price is state that lives in memory: seat holds, rate limits and lockouts reset on restart, and we can't run a second copy.",
        },
        {
          title: "Keep the model we declared, even though it lost",
          body: "We chose XGBoost before testing and used the 2020-24 test years once. It scored a PR-AUC of 0.312, behind logistic regression (0.418) and a random forest (0.411). We reported the loss instead of picking a winner on the test set, and the model stays advisory.",
        },
      ],
      results: [
        { value: "0% vs 31.7%", label: "evacuees left without a bed: our planner against nearest shelter, over 1,600 simulated runs" },
        { value: "1.86% vs 11.22%", label: "evacuees sent to a shelter that flooded later in the same runs" },
        { value: "200 / 200", label: "tampering attempts caught for each of 9 attack types on sealed records, with no false alarms" },
        { value: "5.96 ms", label: "per tick across all 200 city wards, 0.3% of the 2-second budget" },
        { value: "20 / 20", label: "live testnet anchors confirmed, median 4.74 s to a receipt" },
      ],
      caveat: "Water levels, sensors, shelters and the SMS gateway are simulated, so the evacuation results compare policies inside one model world, not real floods. Rainfall, road routes, the ward map and the testnet transactions are real.",
      next: [
        "Real gauge data. Every evacuation result is scored against our own simulator, so this comes first.",
        "Close the sealing window: sign entries when they are written, or seal sooner.",
        "Make the alert checker compare a forwarded message's text, not just its verify code.",
        "Re-select the heavy-rain model on a fresh season, probably logistic regression.",
        "Tests for the HTTP routes and the anchoring path, plus CI. The pure modules are well tested; the routes and live anchoring are not.",
      ],
    },
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
    study: {
      why: "Coding agents and new teammates keep asking structural questions about a codebase: what calls this, what breaks if I change it, why is this dependency here. Text search and embeddings return passages, not resolved relationships. Atlas is my design for answering those questions from typed facts instead, and the prototype exists to test that design on a real codebase before committing to it.",
      how: [
        "extract.ts loads the code with ts-morph and lets the TypeScript checker resolve every call, so receiver types come from the compiler rather than guesses.",
        "Each fact has one of nine kinds, from declarations to implements, plus a confidence, a reason, and a file and line. A call that can't be resolved stays in at confidence 0.3 instead of disappearing.",
        "Entities get path-and-name ids such as ts:<file>:<scope>.<name>. The run fails if any edge points at an id that was never declared.",
        "history.ts reruns the extractor across 389 commits of Zod history and scores candidate id schemes against an oracle that uses none of them.",
        "trace.ts profiles a Zod workload with V8's sampling profiler and turns observed calls into runtime facts that join the static ones by id.",
        "Six query lenses are designed but not built. For now, four scripts answer questions over facts.json and say CANNOT ANSWER when a fact kind is missing.",
      ],
      caption: "Three harnesses measure one corpus: static extraction builds the fact base, history and runtime tracing test it. The dashed box is designed, not built.",
      decisions: [
        {
          title: "Facts first, graph second",
          body: "A graph forces one schema and can't say \"probably\". A fact can carry a confidence, a reason and a source line, and a graph can still be built from facts as one view. The cost is that nothing answers queries until a query layer exists.",
        },
        {
          title: "Path-and-name ids, not content hashes",
          body: "I measured both. 60.1% of entities share a structural hash with something else, and over 389 commits there were 2,070 body edits against 5 renames, so hash ids would break constantly. Path ids do change when a file moves, but no moves happened in that history.",
        },
        {
          title: "Let the compiler resolve calls",
          body: "TypeScript's getDefinitions() resolved 95.9% of method calls once property-access callees were routed to it. The cost is a dependency on a full TypeScript program, so other languages would need their own resolver.",
        },
        {
          title: "Invariants that fail the run",
          body: "Four of my early \"findings\" turned out to be extractor bugs. Now the extractor exits with an error when an edge points at nothing or two entities share an id. Breaking it on purpose produces 21 and 1,817 violations, so the checks do fire.",
        },
      ],
      results: [
        { value: "16.6% → 96.6%", label: "calls resolved to a declaration, after a ten-line fix for method calls" },
        { value: "16.8% → 97.0%", label: "edges with both endpoints declared, after making one function the only source of ids" },
        { value: "~34k facts", label: "from 132 files (about 30k lines) in roughly 3 seconds" },
        { value: "389 commits", label: "of Zod history replayed to test which ids survive edits" },
        { value: "7", label: "of my own reported findings later corrected in the report, each kept above the old text" },
      ],
      caveat: "Every number comes from one corpus, colinhacks/zod at a single commit, and the prototype is throwaway on purpose.",
      next: [
        "Write ADR-0002 and build the query layer. Scripts are a measuring tool, not a product.",
        "Fix the runtime join: only 34.4% of profiled call frames match a static id exactly, and one workload exercised just 2.5% of static call pairs.",
        "Run the same measurements on a second codebase before trusting any of the numbers in general.",
      ],
    },
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
    study: {
      why: "Freelance work has a trust gap: the client doesn't want to pay up front, and the freelancer doesn't want to deliver first. Platform escrow fixes that by asking both sides to trust the platform with the money. At the Defy '26 hackathon, my team built escrow where the money sits in a contract that no one, including us, can redirect.",
      how: [
        "Each deal is one 86-line Solidity contract. The deployer becomes the buyer, funds it with native SHM, and approves two milestones: a design share set at deployment, then the rest for development.",
        "Each release records the payout before sending it, then pays the seller with a low-level call and checks the result. Only the buyer can call any function, and there is no owner or admin.",
        "Raising a dispute freezes whatever is left. Nothing in the contract can unfreeze it.",
        "The React frontend talks to the contract directly through MetaMask with ethers v6, so no server ever holds keys. It re-reads state every 5 seconds because the contract emits no events.",
        "A small Express API can read the contract's state, but the frontend doesn't use it. The planned privacy layer for dispute evidence (Inco) is a design only.",
      ],
      caption: "The browser signs every write through MetaMask; the contract holds the money and moves through four states. Dashed: planned, not built.",
      decisions: [
        {
          title: "One contract per deal, no admin",
          body: "Each deal's funds sit in their own small contract that no one can upgrade or override, which kept it small enough to review during a hackathon. The cost is full deploy gas per deal, no on-chain list of deals, and no way to patch a bug in a live escrow.",
        },
        {
          title: "Pay with call(), state first",
          body: "transfer() forwards only 2,300 gas, which can fail for smart-contract wallets, so releases use call() and check the result. The cost of pushing payments: a seller address that can't receive SHM blocks every release.",
        },
        {
          title: "A dispute freezes the funds",
          body: "Freezing needs no arbiter and no extra code. The cost is that a dispute can never be resolved: the remaining money stays locked for good.",
        },
        {
          title: "The buyer alone approves",
          body: "One approver means no timers and no extra roles. The cost is that the seller depends entirely on the buyer, with no deadline or appeal.",
        },
      ],
      results: [
        { value: "86 lines", label: "of Solidity hold the money, with no owner, admin or upgrade path" },
        { value: "3 of 7", label: "app actions reach the chain: fund and the two releases. Create, dispute, evidence and reputation only change the page" },
        { value: "5 s", label: "polling interval, because the contract emits no events" },
        { value: "0", label: "automated tests; the full flow was checked by hand on the testnet" },
      ],
      caveat: "A hackathon build: the happy path works end to end on the testnet, but the dispute button and deal creation are not wired to the contract yet.",
      next: [
        "Foundry tests for every require and state change, plus a fuzz test that the two payouts always add up to the funded amount.",
        "Replace the permanent freeze with an arbiter or a timeout agreed when the deal is created.",
        "Emit events so the app can stop polling and show a deal's history.",
        "A factory contract, so Create Escrow deploys a real deal instead of changing page state.",
      ],
    },
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
  { id: "afk", title: "Screensaver", hint: "Leave the site alone for a minute" },
];

// The skills screen: every tool tagged on a project, most used first, with the
// projects that used it.
export const SKILLS = Object.entries(
  PROJECTS.reduce<Record<string, string[]>>((acc, p) => {
    for (const tag of p.tags.split(", ")) (acc[tag] ??= []).push(p.name);
    return acc;
  }, {}),
).sort(([a, x], [b, y]) => y.length - x.length || a.localeCompare(b));

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
