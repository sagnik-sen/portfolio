import { useSyncExternalStore } from "react";

// Theme lives on <html data-theme>; the inline script in layout.tsx restores it
// before first paint. Stored as a raw string (not JSON) so that script stays tiny.
export const THEMES = [
  { id: "ice", label: "Ice blue" },
  { id: "green", label: "Green phosphor" },
  { id: "amber", label: "Amber monochrome" },
  { id: "bios", label: "BIOS blue" },
];

const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const read = () => document.documentElement.dataset.theme ?? "ice";

export const useTheme = () => useSyncExternalStore(subscribe, read, () => "ice");

export function setTheme(id: string) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("theme", id);
  } catch {}
  listeners.forEach((cb) => cb());
}
