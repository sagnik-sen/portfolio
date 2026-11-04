"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { unlock } from "@/components/retro/achievements";

// 404 as an arcade "continue?" screen: counts down 9..0, then GAME OVER.
export default function NotFound() {
  const [count, setCount] = useState(9);

  useEffect(() => {
    unlock("lost");
    const id = setInterval(() => setCount((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="grid min-h-svh place-items-center p-6 text-center text-2xl">
      <div className="crt border-4 border-double border-line-strong bg-base px-8 py-10">
        <h1 className="font-pixel text-[16px] text-accent md:text-xl">{count > 0 ? "CONTINUE?" : "GAME OVER"}</h1>
        <p className="mt-6 font-pixel text-4xl text-primary" aria-hidden>
          {count > 0 ? count : ""}
        </p>
        <p className="mt-6 text-secondary">This page doesn&apos;t exist.</p>
        <Link href="/" className="mt-4 inline-block text-primary underline decoration-accent underline-offset-4">
          Press START to return to the menu
        </Link>
      </div>
    </main>
  );
}
