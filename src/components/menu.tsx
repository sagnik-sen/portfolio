"use client";

import { useEffect, useRef, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import {
  CHEATS,
  CERTIFICATIONS,
  EDUCATION,
  EMAIL,
  EVENTS,
  EXPERIENCE,
  GDG_ROLES,
  GITHUB,
  INTRO,
  LINKEDIN,
  OLDER,
  PROJECTS,
  slug,
  type Entry,
} from "@/content";

// The open screen lives in the URL hash ("#projects", "#projects/atlas"), so
// links, the browser back button and deep links all work without a router.
const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.slice(1);

const subscribeClock = (cb: () => void) => {
  const id = setInterval(cb, 10_000);
  return () => clearInterval(id);
};
const readClock = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

type Screen = { title: string; parent?: string; body: ReactNode };

// A menu entry: a link when given href, otherwise a button that runs onSelect.
function Item({
  href,
  onSelect,
  pressed,
  label,
  value,
  back,
}: {
  href?: string;
  onSelect?: () => void;
  pressed?: boolean;
  label: string;
  value?: string;
  back?: boolean;
}) {
  const external = href?.startsWith("http") ?? false;
  const shared = {
    "data-item": true,
    "data-back": back || undefined,
    onPointerEnter: (e: PointerEvent<HTMLElement>) =>
      e.pointerType === "mouse" && e.currentTarget.focus({ preventScroll: true }),
    className:
      "group flex w-full items-baseline justify-between gap-4 px-1 text-left text-primary outline-none focus:bg-accent/15 focus:text-accent",
  };
  const content = (
    <>
      <span>
        <span aria-hidden className="blink invisible inline-block w-[1.6ch] group-focus:visible">
          &gt;
        </span>
        {label}
        {external && (
          <>
            <span aria-hidden> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </>
        )}
      </span>
      {value && <span className="shrink-0 text-secondary group-focus:text-accent">{value}</span>}
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} {...shared}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={onSelect} aria-pressed={pressed} {...shared}>
          {content}
        </button>
      )}
    </li>
  );
}

// Theme lives on <html data-theme>; layout.tsx restores it before first paint.
const THEMES = [
  { id: "ice", label: "Ice blue" },
  { id: "green", label: "Green phosphor" },
  { id: "amber", label: "Amber monochrome" },
  { id: "bios", label: "BIOS blue" },
];
const themeListeners = new Set<() => void>();
const subscribeTheme = (cb: () => void) => {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
};
const readTheme = () => document.documentElement.dataset.theme ?? "ice";
function setTheme(id: string) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("theme", id);
  } catch {}
  themeListeners.forEach((cb) => cb());
}

function ThemeList() {
  const current = useSyncExternalStore(subscribeTheme, readTheme, () => "ice");
  return (
    <ul>
      {THEMES.map((t) => (
        <Item
          key={t.id}
          label={t.label}
          value={t.id === current ? "[x]" : "[ ]"}
          pressed={t.id === current}
          onSelect={() => setTheme(t.id)}
        />
      ))}
    </ul>
  );
}

const BOOT_LINES = [
  "SAGNIK-OS BIOS v2026.11",
  "(C) Sagnik Sen. All rights reserved.",
  "",
  "CPU: caffeine-cooled @ 3 AM .......... OK",
  "Memory test: 640K .................... OK",
  `Loading projects ............... ${PROJECTS.length} found`,
  `Loading experience ............. ${EXPERIENCE.length} found`,
  "Mounting GDG on Campus VIT Chennai ... OK",
];

// Fake startup screen. Hidden by CSS unless <html data-boot> is set, so it never
// flashes for repeat visits; any key, tap or 4 seconds dismisses it.
function Boot() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.boot) return;
    const done = (e?: Event) => {
      e?.preventDefault();
      e?.stopImmediatePropagation();
      delete root.dataset.boot;
      try {
        sessionStorage.setItem("booted", "1");
      } catch {}
      cleanup();
    };
    const timer = setTimeout(done, 4000);
    window.addEventListener("keydown", done, true);
    window.addEventListener("pointerdown", done, true);
    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", done, true);
      window.removeEventListener("pointerdown", done, true);
    };
    return cleanup;
  }, []);

  const step = 0.22;
  return (
    <div aria-hidden className="boot fixed inset-0 z-40 bg-base p-6 text-xl leading-snug text-primary md:p-12 md:text-2xl">
      {BOOT_LINES.map((line, i) => (
        <p key={i} className="boot-line whitespace-pre-wrap" style={{ animationDelay: `${i * step}s` }}>
          {line || "\u00a0"}
        </p>
      ))}
      <div
        className="boot-line mt-6 h-4 max-w-md border border-line-strong p-0.5"
        style={{ animationDelay: `${BOOT_LINES.length * step}s` }}
      >
        <div className="boot-bar h-full bg-secondary" style={{ animationDelay: `${BOOT_LINES.length * step}s` }} />
      </div>
      <p className="boot-line mt-6 text-accent" style={{ animationDelay: `${BOOT_LINES.length * step + 1.3}s` }}>
        <span className="blink">PRESS ANY KEY TO START</span>
      </p>
    </div>
  );
}

const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-5 font-pixel text-[11px] uppercase leading-relaxed text-accent md:text-xs">
    {children}
  </h2>
);

const Text = ({ children }: { children: ReactNode }) => (
  <p className="mb-5 text-secondary">{children}</p>
);

const Subheading = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-2 mt-6 px-1 text-tertiary first:mt-0">── {children} ──</h3>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mb-5 px-1 text-primary">
    {items.map((item) => (
      <li key={item}>
        <span className="text-tertiary">- </span>
        {item}
      </li>
    ))}
  </ul>
);

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ul className="mb-2 space-y-3">
      {entries.map((e) => (
        <li key={e.date + e.title} className="grid px-1 sm:grid-cols-[10rem_1fr] sm:gap-4">
          <span className="text-accent">{e.date}</span>
          <span className="text-primary">
            {e.title}
            <span className="text-secondary">, {e.org}</span>
            {e.note && <span className="block text-secondary">{e.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

const screens: Record<string, Screen> = {
  "": {
    title: "Main Menu",
    body: (
      <>
        <Text>{INTRO}</Text>
        <ul>
          <Item href="#projects" label="Projects" value={String(PROJECTS.length)} />
          <Item href="#experience" label="Experience" value={String(EXPERIENCE.length)} />
          <Item href="#education" label="Education" />
          <Item href="#community" label="Community" />
          <Item href="#settings" label="Settings" />
          <Item href="#contact" label="Contact" />
        </ul>
      </>
    ),
  },
  projects: {
    title: "Projects",
    parent: "",
    body: (
      <ul>
        {PROJECTS.map((p) => (
          <Item key={p.name} href={`#projects/${slug(p.name)}`} label={p.name} value={p.year} />
        ))}
        <li aria-hidden className="mt-4 px-1 text-tertiary">
          ── team & older ──
        </li>
        {OLDER.map((o) => (
          <Item key={o.name} href={o.url} label={o.name} />
        ))}
        <Item href={GITHUB} label="Everything else on GitHub" />
      </ul>
    ),
  },
  experience: {
    title: "Experience",
    parent: "",
    body: <Timeline entries={EXPERIENCE} />,
  },
  education: {
    title: "Education",
    parent: "",
    body: (
      <>
        <Timeline entries={EDUCATION} />
        <Subheading>certifications</Subheading>
        <Timeline entries={CERTIFICATIONS} />
      </>
    ),
  },
  community: {
    title: "Community",
    parent: "",
    body: (
      <>
        <Text>
          I&apos;ve been part of Google Developer Groups on Campus at VIT Chennai
          since December 2024, starting on the marketing team. These days I
          plan events, keep teams in sync and sort out logistics.
        </Text>
        <Timeline entries={GDG_ROLES} />
        <Subheading>programs I&apos;ve helped run</Subheading>
        <Bullets items={EVENTS} />
        <ul>
          <Item href={`#projects/${slug("GDGdex")}`} label="GDGdex, the meetup game I built" />
        </ul>
      </>
    ),
  },
  settings: {
    title: "Settings",
    parent: "",
    body: (
      <>
        <Text>Display palette. Your choice is saved in this browser.</Text>
        <ThemeList />
        <p className="mt-6 px-1 text-tertiary">psst: old cheat codes still work here.</p>
      </>
    ),
  },
  cheats: {
    title: "Cheats",
    parent: "",
    body: (
      <>
        <Text>CHEATS ENABLED. You know the code, respect.</Text>
        <Bullets items={CHEATS} />
      </>
    ),
  },
  contact: {
    title: "Contact",
    parent: "",
    body: (
      <>
        <Text>I&apos;m looking for internships and roles in applied AI. Email is best.</Text>
        <ul>
          <Item href={`mailto:${EMAIL}`} label="Email" value={EMAIL} />
          <Item href={GITHUB} label="GitHub" />
          <Item href={LINKEDIN} label="LinkedIn" />
        </ul>
      </>
    ),
  },
  ...Object.fromEntries(
    PROJECTS.map((p) => [
      `projects/${slug(p.name)}`,
      {
        title: p.name,
        parent: "projects",
        body: (
          <>
            <p className="mb-3 px-1 text-tertiary">{p.context}</p>
            <Text>{p.note}</Text>
            {p.facts && <Bullets items={p.facts} />}
            <p className="mb-5 px-1 text-tertiary">
              <span className="text-secondary">tools</span> {p.tags}
            </p>
            <ul>{p.url ? <Item href={p.url} label="Open on GitHub" /> : null}</ul>
          </>
        ),
      },
    ]),
  ),
};

export function Menu() {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const clock = useSyncExternalStore(subscribeClock, readClock, () => "--:--");
  const key = Object.hasOwn(screens, hash) ? hash : "";
  const screen = screens[key];
  const root = useRef<HTMLDivElement>(null);
  const prev = useRef<string | null>(null);
  const konami = useRef(0);

  const items = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLElement>("section:not([hidden]) [data-item]") ?? [],
    );

  // Put the cursor on the entry you came back from, or the first entry.
  useEffect(() => {
    const list = items().filter((el) => !el.dataset.back);
    const from = list.find((el) => el.getAttribute("href") === `#${prev.current}`);
    (from ?? list[0])?.focus({ preventScroll: true });
    prev.current = key;
    window.scrollTo(0, 0);
     
  }, [key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      konami.current = k === KONAMI[konami.current] ? konami.current + 1 : k === KONAMI[0] ? 1 : 0;
      if (konami.current === KONAMI.length) {
        konami.current = 0;
        window.location.hash = "cheats";
        return;
      }
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLElement);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        const next = i < 0 ? (step > 0 ? 0 : list.length - 1) : (i + step + list.length) % list.length;
        list[next]?.focus();
      } else if (e.key === "ArrowRight" && i >= 0) {
        e.preventDefault();
        list[i].click();
      } else if (
        (e.key === "Escape" || e.key === "ArrowLeft" || e.key === "Backspace") &&
        screen.parent !== undefined
      ) {
        e.preventDefault();
        window.location.hash = screen.parent;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const trail: string[] = [];
  for (let k: string | undefined = key; k !== undefined; k = screens[k].parent) {
    trail.unshift(screens[k].title);
  }

  return (
    <>
      <Boot />
      <div className="flex min-h-svh items-start justify-center p-3 sm:p-6 md:items-center md:p-10">
        <div ref={root} className="crt w-full max-w-3xl border-4 border-double border-line-strong bg-base">
          <header className="flex items-center justify-between gap-4 border-b-2 border-line-strong px-4 py-3 font-pixel text-[10px] text-primary md:text-xs">
            <h1>SAGNIK SEN</h1>
            <span className="text-secondary" suppressHydrationWarning>
              {clock}
            </span>
          </header>

          <main className="min-h-[65svh] px-4 py-6 text-[22px] leading-snug md:px-8 md:py-8 md:text-2xl">
            <p className="sr-only" aria-live="polite">
              {screen.title}
            </p>
            {Object.entries(screens).map(([k, s]) => (
              <section key={k} hidden={k !== key}>
                <Heading>{k === key ? trail.join(" › ") : s.title}</Heading>
                {s.parent !== undefined && (
                  <ul className="mb-4">
                    <Item href={`#${s.parent}`} label="Back" back />
                  </ul>
                )}
                {s.body}
              </section>
            ))}
          </main>

          <footer className="flex justify-between gap-4 border-t-2 border-line-strong px-4 py-2 text-lg text-tertiary">
            <span className="hidden sm:inline">↑↓ select · enter open · esc back</span>
            <span className="sm:hidden">tap to open</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </>
  );
}
