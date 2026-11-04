"use client";

import type { MouseEvent } from "react";
import { createStore, useStore } from "./store";

const loading = createStore<string | null>(null, null);

// Shows "LOADING CARTRIDGE" for a beat before opening an external link. The
// delay stays well inside the browser's user-activation window, so the new tab
// is not treated as a popup. Modified clicks and reduced motion open instantly.
export function openExternal(e: MouseEvent<HTMLAnchorElement>, label: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  e.preventDefault();
  const href = e.currentTarget.href;
  loading.set(label);
  setTimeout(() => {
    window.open(href, "_blank", "noopener,noreferrer");
    loading.set(null);
  }, 450);
}

export function CartridgeOverlay() {
  const label = useStore(loading);
  if (!label) return null;
  return (
    <div aria-hidden className="fixed inset-0 z-40 grid place-items-center bg-base/90">
      <p className="text-2xl text-accent">
        LOADING CARTRIDGE: {label.toUpperCase()}
        <span className="blink">_</span>
      </p>
    </div>
  );
}
