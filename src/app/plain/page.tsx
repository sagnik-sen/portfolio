import type { Metadata } from "next";
import { Entries, PlainSection, PlainShell } from "@/components/plain";
import { slug, CERTIFICATIONS, EDUCATION, EMAIL, EVENTS, EXPERIENCE, GDG_ROLES, INTRO, OLDER, PROJECTS, SKILLS } from "@/content";

export const metadata: Metadata = {
  title: "Sagnik Sen · One-page portfolio",
  alternates: { canonical: "/plain" },
};

// Everything on one fast page, for anyone who doesn't want to learn the menu.
export default function Plain() {
  return (
    <PlainShell>
      <h1 className="text-4xl font-semibold tracking-tight">Sagnik Sen</h1>
      <p className="mt-4 text-secondary">{INTRO}</p>
      <p className="mt-4">
        Open to internships and roles in applied AI:{" "}
        <a href={`mailto:${EMAIL}`} className="plain-link">
          {EMAIL}
        </a>
      </p>

      <PlainSection title="Projects" id="projects">
        {PROJECTS.map((p) => (
          <article key={p.name} className="mb-10">
            <h3 className="text-xl font-semibold">
              {p.name} <span className="text-[15px] font-normal text-secondary">{p.year}</span>
            </h3>
            <p className="text-[15px] text-tertiary">{p.context}</p>
            <p className="mt-2 text-secondary">{p.note}</p>
            {p.facts && (
              <ul className="mt-2 list-disc pl-5">
                {p.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[15px] text-tertiary">Tools: {p.tags}</p>
            <p className="mt-1 flex gap-5 text-[15px]">
              {p.study && (
                <a href={`/projects/${slug(p.name)}`} className="plain-link">
                  Read the case study
                </a>
              )}
              {p.url && (
                <a href={p.url} className="plain-link">
                  Code on GitHub
                </a>
              )}
            </p>
          </article>
        ))}
        <p className="text-secondary">
          Also:{" "}
          {OLDER.map((o, i) => (
            <span key={o.name}>
              {i > 0 && ", "}
              <a href={o.url} className="plain-link">
                {o.name}
              </a>
            </span>
          ))}
          .
        </p>
      </PlainSection>

      <PlainSection title="Experience">
        <Entries entries={EXPERIENCE} />
      </PlainSection>

      <PlainSection title="Education">
        <Entries entries={EDUCATION} />
        <h3 className="mb-2 mt-6 text-[15px] font-semibold text-secondary">Certifications</h3>
        <Entries entries={CERTIFICATIONS} />
      </PlainSection>

      <PlainSection title="Community">
        <Entries entries={GDG_ROLES} />
        <p className="mt-4 text-secondary">Programs I&apos;ve helped run: {EVENTS.join(", ")}.</p>
      </PlainSection>

      <PlainSection title="Skills">
        <p className="text-secondary">
          {SKILLS.map(([tool, used]) => `${tool} (${used.length})`).join(" · ")}
        </p>
      </PlainSection>
    </PlainShell>
  );
}
