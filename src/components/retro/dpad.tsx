"use client";

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
      className={`grid h-11 w-11 place-items-center border-2 border-line-strong bg-elevated text-xl text-primary active:bg-accent/30 ${className}`}
    >
      {children}
    </button>
  );
}

export function DPad() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t-2 border-line-strong bg-base px-6 py-3 sm:hidden">
      <div className="grid grid-cols-3 grid-rows-3">
        <Pad k="ArrowUp" label="Up" className="col-start-2">▲</Pad>
        <Pad k="ArrowLeft" label="Back" className="col-start-1 row-start-2">◀</Pad>
        <Pad k="ArrowRight" label="Open" className="col-start-3 row-start-2">▶</Pad>
        <Pad k="ArrowDown" label="Down" className="col-start-2 row-start-3">▼</Pad>
      </div>
      <div className="flex gap-4">
        <Pad k="GamepadB" label="B: back" className="rounded-full">B</Pad>
        <Pad k="GamepadA" label="A: open" className="-mt-6 rounded-full">A</Pad>
      </div>
    </div>
  );
}
