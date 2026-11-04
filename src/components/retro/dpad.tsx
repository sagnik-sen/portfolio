"use client";

import { createStore, useStore } from "./store";

// Whether the on-screen controls are shown (phones only; hidden on sm+ by CSS).
export const padOn = createStore("dpad", true);

// Handheld-style controls for touch screens. Each button replays a key press,
// so the menu, the Konami code and everything else work exactly as on a keyboard.
const press = (key: string) => window.dispatchEvent(new KeyboardEvent("keydown", { key }));

function Pad({ k, label, children, className = "" }: { k: string; label: string; children: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      // Cancelling pointerdown keeps focus on the menu entry instead of this button.
      onPointerDown={(e) => e.preventDefault()}
      onClick={() => press(k)}
      className={`grid h-10 w-10 place-items-center border-2 border-line-strong bg-elevated text-lg text-primary active:bg-accent/30 ${className}`}
    >
      {children}
    </button>
  );
}

export function DPad() {
  const on = useStore(padOn);
  if (!on) {
    return (
      <button
        type="button"
        onClick={() => padOn.set(true)}
        className="dpad fixed bottom-3 right-3 z-30 border-2 border-line-strong bg-base px-3 py-1 text-lg text-secondary sm:hidden"
      >
        show pad ▴
      </button>
    );
  }
  return (
    <div className="dpad fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t-2 border-line-strong bg-base px-5 py-2 sm:hidden">
      <div className="grid grid-cols-3 grid-rows-3">
        <Pad k="ArrowUp" label="Up" className="col-start-2">▲</Pad>
        <Pad k="ArrowLeft" label="Back" className="col-start-1 row-start-2">◀</Pad>
        <Pad k="ArrowRight" label="Open" className="col-start-3 row-start-2">▶</Pad>
        <Pad k="ArrowDown" label="Down" className="col-start-2 row-start-3">▼</Pad>
      </div>
      <button
        type="button"
        onClick={() => padOn.set(false)}
        className="self-start px-2 text-lg text-tertiary"
      >
        hide ▾
      </button>
      <div className="flex gap-3">
        <Pad k="GamepadB" label="B: back" className="rounded-full">B</Pad>
        <Pad k="GamepadA" label="A: open" className="-mt-5 rounded-full">A</Pad>
      </div>
    </div>
  );
}
