# Portfolio

A personal portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting started

npm install
npm run dev

Open http://localhost:3000.

## Before you deploy — things to fill in

- src/components/sections/contact.tsx — replace the placeholder email, GitHub, and LinkedIn links with your real ones.
- Consider swapping the abstract SVG project visuals (src/components/project-visual.tsx) for real screenshots or product shots of each project once you have them — the layout (aspect-[5/4] panel) will accept any image or video.
- Add a resume PDF under public/ and link it from the hero or contact section if you want a direct download CTA.

## Deploy

Easiest path is Vercel (vercel.com/new) — connect the repo (or run `npx vercel`) and it deploys automatically, zero config needed for Next.js.

## Structure

- src/app/ — root layout, global styles, page assembly
- src/components/sections/ — one file per page section (hero, about, projects, experience, leadership, skills, contact)
- src/components/neural-field.tsx — the signature animated node-graph background
- src/components/project-visual.tsx — abstract generative visuals for each project card
- src/lib/utils.ts — cn() class-merging helper
