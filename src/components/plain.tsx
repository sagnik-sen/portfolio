import Link from "next/link";
import type { ReactNode } from "react";
import { EMAIL, GITHUB, LINKEDIN, type Entry } from "@/content";

// Readable pages for people who want the facts fast (/plain and the case
// studies): server-rendered, no menu, no CRT effects, a system sans body.
export function PlainShell({ children }: { children: ReactNode }) {
  return (
    <div className="plain mx-auto max-w-3xl px-6 py-10 text-[17px] leading-relaxed text-primary md:py-16">
      <nav aria-label="Site" className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 text-[15px] text-secondary">
        <Link href="/plain" className="font-pixel text-[16px] text-primary">
          SAGNIK SEN
        </Link>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={`mailto:${EMAIL}`} className="plain-link">
            Email
          </a>
          <a href={GITHUB} className="plain-link">
            GitHub
          </a>
          <a href={LINKEDIN} className="plain-link">
            LinkedIn
          </a>
          <Link href="/" className="plain-link">
            Retro version
          </Link>
        </span>
      </nav>
      {children}
    </div>
  );
}

export const PlainSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-12">
    <h2 className="mb-4 font-pixel text-[16px] uppercase text-accent">{title}</h2>
    {children}
  </section>
);

export const Entries = ({ entries }: { entries: Entry[] }) => (
  <ul className="space-y-2">
    {entries.map((e) => (
      <li key={e.date + e.title} className="grid sm:grid-cols-[10rem_1fr] sm:gap-4">
        <span className="text-secondary">{e.date}</span>
        <span>
          {e.title}, <span className="text-secondary">{e.org}</span>
          {e.note && <span className="block text-secondary">{e.note}</span>}
        </span>
      </li>
    ))}
  </ul>
);
