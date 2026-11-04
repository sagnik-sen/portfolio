"use client";

import { ACHIEVEMENTS } from "@/content";
import { blip } from "./sound";
import { createStore, useStore } from "./store";
import { notify } from "./toast";

const unlocked = createStore<string[]>("trophies", []);

export function unlock(id: string) {
  const got = unlocked.get();
  const trophy = ACHIEVEMENTS.find((a) => a.id === id);
  if (!trophy || got.includes(id)) return;
  unlocked.set([...got, id]);
  notify(`★ ACHIEVEMENT UNLOCKED: ${trophy.title}`);
  blip("unlock");
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
