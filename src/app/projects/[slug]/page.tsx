import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DIAGRAMS } from "@/components/diagrams";
import { PlainSection, PlainShell } from "@/components/plain";
import { PROJECTS, slug } from "@/content";

type Props = { params: Promise<{ slug: string }> };

const STUDIES = PROJECTS.filter((p) => p.study);
const find = async ({ params }: Props) => {
  const s = (await params).slug;
  return STUDIES.find((p) => slug(p.name) === s);
};

export const dynamicParams = false;
export const generateStaticParams = () => STUDIES.map((p) => ({ slug: slug(p.name) }));

export async function generateMetadata(props: Props): Promise<Metadata> {
  const p = await find(props);
  return p
    ? { title: `${p.name} · Case study · Sagnik Sen`, description: p.note, alternates: { canonical: `/projects/${slug(p.name)}` } }
    : {};
}

export default async function CaseStudy(props: Props) {
  const p = await find(props);
  if (!p?.study) notFound();
  const { study } = p;
  const s = slug(p.name);
  const Diagram = DIAGRAMS[s];
  const i = STUDIES.indexOf(p);
  const other = STUDIES[(i + 1) % STUDIES.length];

  return (
    <PlainShell>
      <p className="text-[15px] text-tertiary">Case study · {p.year}</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight">{p.name}</h1>
      <p className="mt-4 text-secondary">{p.note}</p>
      <p className="mt-3 text-[15px] text-tertiary">
        {p.context} Tools: {p.tags}.
      </p>
      {p.url && (
        <a href={p.url} className="plain-link mt-2 inline-block text-[15px]">
          Code on GitHub
        </a>
      )}

      <PlainSection title="Why">
        <p>{study.why}</p>
      </PlainSection>

      <PlainSection title="How it works">
        {Diagram && (
          <figure className="mb-6">
            <Diagram />
            <figcaption className="mt-2 text-center text-[15px] text-tertiary">{study.caption}</figcaption>
          </figure>
        )}
        <ul className="list-disc space-y-2 pl-5">
          {study.how.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </PlainSection>

      <PlainSection title="Decisions and what they cost">
        {study.decisions.map((d) => (
          <div key={d.title} className="mb-6">
            <h3 className="text-xl font-semibold">{d.title}</h3>
            <p className="mt-1 text-secondary">{d.body}</p>
          </div>
        ))}
      </PlainSection>

      <PlainSection title="By the numbers">
        <dl className="grid gap-6 sm:grid-cols-2">
          {study.results.map((r) => (
            <div key={r.value}>
              <dt className="text-2xl font-semibold text-accent">{r.value}</dt>
              <dd className="text-secondary">{r.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[15px] text-tertiary">{study.caveat}</p>
      </PlainSection>

      <PlainSection title="What I'd change next">
        <ul className="list-disc space-y-2 pl-5">
          {study.next.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </PlainSection>

      <nav aria-label="More" className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
        <a href={`/projects/${slug(other.name)}`} className="plain-link">
          Next case study: {other.name}
        </a>
        <a href="/plain#projects" className="plain-link">
          All projects
        </a>
        <a href={`/#projects/${s}`} className="plain-link">
          This project in the retro menu
        </a>
      </nav>
    </PlainShell>
  );
}
