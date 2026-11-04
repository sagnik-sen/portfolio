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
  STATS,
  slug,
  type Entry,
} from "@/content";
import { TrophyList, unlock } from "./retro/achievements";
import { Boot } from "./retro/boot";
import { CartridgeOverlay, openExternal } from "./retro/cartridge";
import { DPad, padOn } from "./retro/dpad";
import { PixelIcon, type IconName } from "./retro/icons";
import { blip, soundOn } from "./retro/sound";
import { createStore, useStore, type Store } from "./retro/store";
import { Terminal } from "./retro/terminal";
import { setTheme, THEMES, useTheme } from "./retro/theme";
import { notify, Toast } from "./retro/toast";

const PROJECT_ICONS: Record<string, IconName> = {
  "insurance-email-classifier": "mail",
  "urbanpulse-chennai": "wave",
  atlas: "graph",
  traise: "flask",
  ephemera: "hourglass",
  gdgdex: "qr",
  pulseguard: "heart",
  openescrow: "lock",
  promptcheck: "check",
};
const projectIcon = (name: string) => {
  const icon = PROJECT_ICONS[slug(name)];
  return icon && <PixelIcon name={icon} />;
};

// Project detail screens opened so far, for the "Explorer" achievement.
const visited = createStore<string[]>("visited", []);

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
// Plain string formatting: toLocaleTimeString spins up Intl, which costs
// ~100 ms on a slow phone and runs on every snapshot read.
const readClock = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

// jsOnly screens need JavaScript to work, so the no-JS fallback hides them.
type Screen = { title: string; parent?: string; jsOnly?: boolean; body: ReactNode };

// Set when Prev/Next is used, so the cursor lands on the same control on the
// next project and repeated Enter keeps paging in that direction.
let lastNav: "prev" | "next" | undefined;

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    notify("LINK COPIED");
  } catch {
    notify(`COPY THIS LINK: ${window.location.href}`);
  }
}

// A menu entry: a link when given href, otherwise a button that runs onSelect.
function Item({
  href,
  onSelect,
  pressed,
  label,
  value,
  back,
  icon,
  nav,
}: {
  nav?: "prev" | "next";
  icon?: ReactNode;
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
    "data-nav": nav,
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
        {icon && <span className="mr-2 text-secondary group-focus:text-accent">{icon}</span>}
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
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          onClick={(e) => {
            blip(back ? "back" : "select");
            lastNav = nav;
            if (external) openExternal(e, label);
          }}
          {...shared}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => {
            blip("select");
            onSelect?.();
          }}
          aria-pressed={pressed}
          {...shared}
        >
          {content}
        </button>
      )}
    </li>
  );
}

function ThemeList() {
  const current = useTheme();
  return (
    <ul>
      {THEMES.map((t) => (
        <Item
          key={t.id}
          label={t.label}
          value={t.id === current ? "[x]" : "[ ]"}
          pressed={t.id === current}
          onSelect={() => {
            setTheme(t.id);
            unlock("stylist");
          }}
        />
      ))}
    </ul>
  );
}

function Toggle({ store, label, onEnable }: { store: Store<boolean>; label: string; onEnable?: () => void }) {
  const on = useStore(store);
  return (
    <Item
      label={label}
      value={on ? "[on]" : "[off]"}
      pressed={on}
      onSelect={() => {
        store.set(!on);
        if (!on) onEnable?.();
      }}
    />
  );
}

// Single-letter shortcuts can be switched off (WCAG 2.1.4), e.g. for speech input.
const letterKeys = createStore("letter-keys", true);

type Action = "up" | "down" | "open" | "back" | "home";

// What each key does, and which Konami steps it can count as. The D-pad sends
// "gamepada"/"gamepadb" so its face buttons don't collide with the A/B letters.
const KEYS: Record<string, { action?: Action; codes?: string[]; letter?: boolean }> = {
  arrowup: { action: "up", codes: ["up"] },
  arrowdown: { action: "down", codes: ["down"] },
  arrowleft: { action: "back", codes: ["left"] },
  arrowright: { action: "open", codes: ["right"] },
  escape: { action: "back" },
  backspace: { action: "back" },
  w: { action: "up", codes: ["up"], letter: true },
  s: { action: "down", codes: ["down"], letter: true },
  a: { action: "back", codes: ["left", "a"], letter: true },
  d: { action: "open", codes: ["right"], letter: true },
  q: { action: "home", letter: true },
  b: { action: "back", codes: ["b"], letter: true },
  gamepada: { action: "open", codes: ["a"] },
  gamepadb: { action: "back", codes: ["b"] },
};

const KONAMI = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"];

const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-5 font-pixel text-[11px] uppercase leading-relaxed text-accent md:text-xs">
    {children}
  </h2>
);

const Text = ({ children }: { children: ReactNode }) => (
  <p className="type-in mb-5 text-secondary">{children}</p>
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
          <Item href="#contact" label="Contact" />
          <li aria-hidden className="mt-3 px-1 text-tertiary">
            ── extras ──
          </li>
          <Item href="#stats" label="Save file" />
          <Item href="#trophies" label="Trophies" />
          <Item href="#terminal" label="Terminal" value="~" />
          <Item href="#settings" label="Settings" />
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
          <Item key={p.name} href={`#projects/${slug(p.name)}`} label={p.name} value={p.year} icon={projectIcon(p.name)} />
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
    jsOnly: true,
    body: (
      <>
        <Text>Display palette. Your choice is saved in this browser.</Text>
        <ThemeList />
        <Subheading>audio & controls</Subheading>
        <ul>
          <Toggle store={soundOn} label="Menu sounds" onEnable={() => unlock("dj")} />
          <Toggle store={letterKeys} label="Letter keys (WASD, Q, B, ~)" />
        </ul>
        <p className="mt-6 px-1 text-tertiary">psst: old cheat codes still work here.</p>
      </>
    ),
  },
  stats: {
    title: "Save file",
    parent: "",
    body: (
      <>
        <Text>SLOT 1 · SAGNIK SEN</Text>
        <dl className="space-y-1 px-1">
          {STATS.map((s) => (
            <div key={s.label} className="grid sm:grid-cols-[10rem_1fr] sm:gap-4">
              <dt className="text-tertiary">{s.label}</dt>
              <dd className="text-primary">{s.value}</dd>
            </div>
          ))}
        </dl>
      </>
    ),
  },
  trophies: {
    title: "Trophies",
    parent: "",
    jsOnly: true,
    body: <TrophyList />,
  },
  terminal: {
    title: "Terminal",
    parent: "",
    jsOnly: true,
    body: <Terminal />,
  },
  cheats: {
    title: "Cheats",
    parent: "",
    jsOnly: true,
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
    PROJECTS.map((p, i) => [
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
            <ul>
              {p.url && <Item href={p.url} label="Open on GitHub" />}
              <Item label="Copy link to this project" onSelect={() => void copyLink()} />
              {PROJECTS[i + 1] && (
                <Item href={`#projects/${slug(PROJECTS[i + 1].name)}`} label={`Next: ${PROJECTS[i + 1].name}`} nav="next" />
              )}
              {PROJECTS[i - 1] && (
                <Item href={`#projects/${slug(PROJECTS[i - 1].name)}`} label={`Prev: ${PROJECTS[i - 1].name}`} nav="prev" />
              )}
            </ul>
          </>
        ),
      },
    ]),
  ),
};

// Handheld-console style status icons. The theme name doubles as a hint that
// palettes can be changed.
// Owns the clock so its ticks re-render only the status bar, not every screen.
function StatusBar() {
  const clock = useSyncExternalStore(subscribeClock, readClock, () => "--:--");
  const current = useTheme();
  const theme = THEMES.find((t) => t.id === current)?.label;
  const sound = useStore(soundOn);
  return (
    <span className="flex items-center gap-3 text-secondary">
      <span className="hidden md:inline">{theme}</span>
      {sound && (
        <span role="img" aria-label="Sound on">
          ♪
        </span>
      )}
      <PixelIcon name="wifi" className="h-[1.3em] w-[1.3em]" />
      <PixelIcon name="battery" className="h-[1.3em] w-[1.3em]" />
      <span suppressHydrationWarning>{clock}</span>
    </span>
  );
}

const screenKey = (hash: string) => (Object.hasOwn(screens, hash) ? hash : "");
// Read at key-press time: the URL changes before React re-renders, and fast
// key presses must act on the screen in the address bar, not the last render.
const liveKey = () => screenKey(readHash());

export function Menu() {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => "");
  const key = screenKey(hash);
  const screen = screens[key];
  const root = useRef<HTMLDivElement>(null);
  const prev = useRef<string | null>(null);
  const konami = useRef(0);
  const pad = useStore(padOn);

  // A hello for anyone who opens the browser console.
  useEffect(() => {
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent");
    console.log(
      "%c┌───────────────────────┐\n│  SAGNIK-OS  v2026.11  │\n└───────────────────────┘",
      `color: ${accent}; font-family: monospace`,
    );
    console.log(
      "Hi, fellow developer. Press ~ for a terminal, or try a certain old cheat code.\nSource: https://github.com/sagnik-sen/portfolio",
    );
  }, []);

  // Tracks the Konami code. Returns true when the key belongs to the code's
  // left/right/B/A tail, so it doesn't also open or leave a screen.
  const advanceKonami = (codes: string[]) => {
    if (codes.includes(KONAMI[konami.current])) konami.current += 1;
    else konami.current = codes.includes(KONAMI[0]) ? 1 : 0;
    if (konami.current === KONAMI.length) {
      konami.current = 0;
      window.location.hash = "cheats";
      return true;
    }
    return konami.current > 4;
  };

  const items = () =>
    Array.from(
      root.current?.querySelectorAll<HTMLElement>("section:not([hidden]) [data-item]") ?? [],
    );

  // Put the cursor on the entry you came back from, or the first entry.
  useEffect(() => {
    const list = items().filter((el) => !el.dataset.back);
    const from = lastNav
      ? list.find((el) => el.dataset.nav === lastNav)
      : list.find((el) => el.getAttribute("href") === `#${prev.current}`);
    lastNav = undefined;
    const input = root.current?.querySelector<HTMLElement>("section:not([hidden]) input");
    (from ?? input ?? list[0] ?? items()[0])?.focus({ preventScroll: true });
    prev.current = key;
    window.scrollTo(0, 0);

    if (key === "contact") unlock("recruiter");
    if (key === "cheats") unlock("cheater");
    if (key.startsWith("projects/") && !visited.get().includes(key)) {
      const seen = [...visited.get(), key];
      visited.set(seen);
      if (PROJECTS.every((p) => seen.includes(`projects/${slug(p.name)}`))) unlock("explorer");
    }
  }, [key]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // While typing in the terminal, only Escape is ours.
      if (e.target instanceof HTMLInputElement) {
        if (e.key === "Escape") window.location.hash = screens[liveKey()].parent ?? "";
        return;
      }
      if ((e.key === "`" || e.key === "~") && letterKeys.get()) {
        e.preventDefault();
        window.location.hash = "terminal";
        return;
      }
      const input = KEYS[e.key.toLowerCase()];
      if (!input) return;
      if (advanceKonami(input.codes ?? [])) {
        e.preventDefault();
        return;
      }
      const action = input.letter && !letterKeys.get() ? undefined : input.action;
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const go = (hash: string) => {
        e.preventDefault();
        blip("back");
        window.location.hash = hash;
      };
      if (action === "up" || action === "down") {
        e.preventDefault();
        const step = action === "down" ? 1 : -1;
        const next = i < 0 ? (step > 0 ? 0 : list.length - 1) : (i + step + list.length) % list.length;
        list[next]?.focus();
        blip("move");
      } else if (action === "open" && i >= 0) {
        e.preventDefault();
        list[i].click();
      } else if (action === "back" && screens[liveKey()].parent !== undefined) {
        go(screens[liveKey()].parent!);
      } else if (action === "home" && liveKey() !== "") {
        go("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // Attached once: everything it reads is live (refs, the URL, the DOM).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trail: string[] = [];
  for (let k: string | undefined = key; k !== undefined; k = screens[k].parent) {
    trail.unshift(screens[k].title);
  }

  return (
    <>
      <Boot />
      <Toast />
      <CartridgeOverlay />
      <DPad />
      <div className={`flex min-h-svh items-start justify-center p-3 sm:p-6 md:items-center md:p-10 ${pad ? "pb-36" : "pb-16"}`}>
        <div ref={root} className="crt w-full max-w-3xl border-4 border-double border-line-strong bg-base">
          <header className="flex items-center justify-between gap-4 border-b-2 border-line-strong px-4 py-3 font-pixel text-[10px] text-primary md:text-xs">
            <h1>SAGNIK SEN</h1>
            <StatusBar />
          </header>

          <main className="min-h-[65svh] px-4 py-6 text-[22px] leading-snug md:px-8 md:py-8 md:text-2xl">
            <p className="sr-only" aria-live="polite">
              {screen.title}
            </p>
            {Object.entries(screens).map(([k, s]) => (
              <section key={k} id={k || undefined} hidden={k !== key} data-js-only={s.jsOnly || undefined}>
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
            <span className="hidden sm:inline">↑↓/WS move · →/D open · ←/A back · Q menu · ~ terminal</span>
            <span className="sm:hidden">tap or use the pad · ~ terminal</span>
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
          </footer>
        </div>
      </div>
    </>
  );
}
