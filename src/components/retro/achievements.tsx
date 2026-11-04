"use client";

import { ACHIEVEMENTS } from "@/content";
import { blip } from "./sound";
import { createStore, useStore } from "./store";

const unlocked = createStore<string[]>("trophies", []);
const toast = createStore<string | null>(null, null);
let toastTimer: ReturnType<typeof setTimeout> | undefined;

export function unlock(id: string) {
  const got = unlocked.get();
  const trophy = ACHIEVEMENTS.find((a) => a.id === id);
  if (!trophy || got.includes(id)) return;
  unlocked.set([...got, id]);
  toast.set(trophy.title);
  blip("unlock");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.set(null), 2800);
}

export function Toast() {
  const title = useStore(toast);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-3">
      {title && (
        <p className="border-2 border-accent bg-base px-4 py-2 text-xl text-accent">
          ★ ACHIEVEMENT UNLOCKED: {title}
        </p>
      )}
    </div>
  );
}

export function TrophyList() {
  const got = useStore(unlocked);
  return (
    <>
      <p className="mb-4 px-1 text-secondary">
        {got.length}/{ACHIEVEMENTS.length} unlocked. Progress is saved in this browser.
      </p>
      <ul className="space-y-2">
        {ACHIEVEMENTS.map((a) => {
          const done = got.includes(a.id);
          return (
            <li key={a.id} className="grid grid-cols-[2.5ch_1fr] px-1">
              <span className={done ? "text-accent" : "text-tertiary"}>{done ? "★" : "☆"}</span>
              <span>
                <span className={done ? "text-primary" : "text-tertiary"}>{done ? a.title : "???"}</span>
                <span className="block text-secondary">{a.hint}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
