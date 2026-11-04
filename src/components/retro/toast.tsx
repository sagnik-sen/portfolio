"use client";

import { createStore, useStore } from "./store";

const message = createStore<string | null>(null, null);
let timer: ReturnType<typeof setTimeout> | undefined;

// Shows a short message at the top of the screen for ~3 seconds.
export function notify(text: string) {
  message.set(text);
  clearTimeout(timer);
  timer = setTimeout(() => message.set(null), 2800);
}

export function Toast() {
  const text = useStore(message);
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-3">
      {text && <p className="border-2 border-accent bg-base px-4 py-2 text-xl text-accent">{text}</p>}
    </div>
  );
}
