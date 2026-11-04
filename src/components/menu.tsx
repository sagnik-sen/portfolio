"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  EMAIL,
  EVENTS,
  GITHUB,
  LINKEDIN,
  OLDER,
  PROJECTS,
  TIMELINE,
  slug,
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

function Item({
  href,
  label,
  value,
  back,
}: {
  href: string;
  label: string;
  value?: string;
  back?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        data-item
        data-back={back || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onPointerEnter={(e) => e.pointerType === "mouse" && e.currentTarget.focus({ preventScroll: true })}
        className="group flex items-baseline justify-between gap-4 px-1 text-primary outline-none focus:bg-accent/15 focus:text-accent"
      >
        <span>
          <span aria-hidden className="blink invisible inline-block w-[1.6ch] group-focus:visible">
            ▶
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
      </a>
    </li>
  );
}

const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="mb-5 font-pixel text-[11px] uppercase leading-relaxed text-accent md:text-xs">
    {children}
  </h2>
);

const Text = ({ children }: { children: ReactNode }) => (
  <p className="mb-5 text-secondary">{children}</p>
);

const screens: Record<string, Screen> = {
  "": {
    title: "Main Menu",
    body: (
      <>
        <Text>
          Hi, I&apos;m Sagnik, a computer science student at VIT Chennai. I
          build things around language models: fine-tuning them, serving them,
          and writing the little tools that tell me whether they&apos;re any
          good. This past summer I interned at Wizergos on an LLM system that
          sorts insurance email.
        </Text>
        <ul>
          <Item href="#projects" label="Projects" value={String(PROJECTS.length)} />
          <Item href="#experience" label="Work & school" value={String(TIMELINE.length)} />
          <Item href="#community" label="Community" />
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
    title: "Work & school",
    parent: "",
    body: (
      <ul className="space-y-3">
        {TIMELINE.map((t) => (
          <li key={t.title} className="grid px-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <span className="text-accent">{t.date}</span>
            <span className="text-primary">
              {t.title}
              <span className="text-secondary">, {t.org}</span>
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  community: {
    title: "Community",
    parent: "",
    body: (
      <>
        <Text>
          I&apos;m General Secretary of Google Developer Groups on Campus at VIT
          Chennai: planning events, keeping teams in sync and sorting out
          logistics. Programs I&apos;ve helped run:
        </Text>
        <ul className="mb-5 px-1 text-primary">
          {EVENTS.map((e) => (
            <li key={e}>
              <span className="text-tertiary">- </span>
              {e}
            </li>
          ))}
        </ul>
        <ul>
          <Item href={`#projects/${slug("GDGdex")}`} label="GDGdex, the meetup game I built" />
        </ul>
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
            <Text>{p.note}</Text>
            <p className="mb-5 px-1 text-tertiary">
              <span className="text-secondary">year</span> {p.year}
              <br />
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
  );
}
