"use client";

import { useEffect, useRef, useState } from "react";
import { unlock } from "./achievements";

const IDLE_MS = 60_000;

// After a minute without input, a bouncing SAGNIK-OS logo takes over. Desktop
// only (precise pointer), never with reduced motion. The key that wakes it is
// swallowed so it doesn't also act on the menu; browser shortcuts pass through.
export function Screensaver() {
  const [on, setOn] = useState(false);
  const active = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (document.documentElement.dataset.boot) return arm(); // boot screen still up
        active.current = true;
        setOn(true);
        unlock("afk");
      }, IDLE_MS);
    };
    const wake = (e: Event) => {
      if (active.current) {
        const shortcut = e instanceof KeyboardEvent && (e.metaKey || e.ctrlKey || e.altKey);
        if (e.type === "keydown" && !shortcut) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        active.current = false;
        setOn(false);
      }
      arm();
    };
    const events = ["keydown", "pointerdown", "pointermove", "wheel", "touchstart"];
    events.forEach((type) => window.addEventListener(type, wake, { capture: true, passive: type !== "keydown" }));
    arm();
    return () => {
      clearTimeout(timer);
      events.forEach((type) => window.removeEventListener(type, wake, { capture: true }));
    };
  }, []);

  if (!on) return null;
  return (
    <div aria-hidden className="screensaver fixed inset-0 z-40 bg-base">
      <div className="ss-x absolute inset-y-0 w-[20rem]">
        <div className="ss-y absolute w-full text-center">
          <p className="font-pixel text-[48px] leading-none text-accent">SAGNIK-OS</p>
          <p className="mt-2 text-xl text-secondary">press any key</p>
        </div>
      </div>
    </div>
  );
}
