"use client";

import { useEffect } from "react";
import { EXPERIENCE, PROJECTS } from "@/content";
import { unlock } from "./achievements";

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
export function Boot() {
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
    const timer = setTimeout(() => {
      unlock("patient");
      done();
    }, 4000);
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
