"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { EMAIL, GITHUB, INTRO, LINKEDIN, PROJECTS, slug } from "@/content";
import { unlock } from "./achievements";
import { soundOn } from "./sound";
import { setTheme, THEMES } from "./theme";

const HELP = [
  "help              this list",
  "whoami            about me",
  "ls                list projects",
  "cat <project>     read a project",
  "open <screen>     go to a screen, e.g. open contact",
  "contact           how to reach me",
  `theme <name>      ${THEMES.map((t) => t.id).join(", ")}`,
  "sound on/off      menu blips",
  "clear             clear the screen",
  "exit              back to the main menu",
];

// Returns the output lines for one command. Navigation commands change the hash.
function run(input: string): string[] {
  const [cmd = "", ...args] = input.trim().split(/\s+/);
  const arg = args.join(" ").toLowerCase();
  const project = PROJECTS.find((p) => slug(p.name) === slug(arg));
  switch (cmd.toLowerCase()) {
    case "help":
      return HELP;
    case "whoami":
      return [INTRO];
    case "ls":
      return PROJECTS.map((p) => `${slug(p.name).padEnd(28)} ${p.year}`);
    case "cat":
      return project
        ? [project.name.toUpperCase(), project.context, project.note, ...(project.facts ?? []).map((f) => `- ${f}`)]
        : [`cat: ${arg || "?"}: no such project. Try ls`];
    case "open":
      window.location.hash = project ? `projects/${slug(project.name)}` : arg;
      return [];
    case "contact":
      return [`email     ${EMAIL}`, `github    ${GITHUB}`, `linkedin  ${LINKEDIN}`];
    case "theme":
      if (!THEMES.some((t) => t.id === arg)) return [`theme: pick one of ${THEMES.map((t) => t.id).join(", ")}`];
      setTheme(arg);
      unlock("stylist");
      return [`palette set to ${arg}`];
    case "sound":
      soundOn.set(arg === "on");
      if (arg === "on") unlock("dj");
      return [`sound ${arg === "on" ? "on" : "off"}`];
    case "sudo":
      return ["[sudo] password for recruiter: ********", `Access granted. Next step: ${EMAIL}`];
    case "exit":
      window.location.hash = "";
      return [];
    default:
      return [`${cmd}: command not found. Try help`];
  }
}

export function Terminal() {
  const [lines, setLines] = useState<string[]>(["Type help to see commands."]);
  const [input, setInput] = useState("");
  const log = useRef<HTMLDivElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [lines]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const command = input.trim();
    setInput("");
    if (!command) return;
    unlock("hacker");
    setLines(command.toLowerCase() === "clear" ? [] : [...lines, `$ ${command}`, ...run(command)]);
  };

  return (
    <div className="px-1">
      <div ref={log} aria-live="polite" className="mb-2 max-h-[45svh] overflow-y-auto whitespace-pre-wrap break-words text-primary">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-2 text-accent">
        <label htmlFor="terminal-input">$</label>
        <input
          id="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-primary caret-accent outline-none"
        />
      </form>
    </div>
  );
}
