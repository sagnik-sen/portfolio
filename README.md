# Portfolio

A personal portfolio site built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Getting started

npm install
npm run dev

Open http://localhost:3000.

## Before you deploy — things to fill in

- Projects and their GitHub links live in src/components/sections/projects.tsx.
- Add a resume PDF under public/ and link it from the hero or contact section.

## Deploy

Easiest path is Vercel (vercel.com/new) — connect the repo (or run `npx vercel`) and it deploys automatically, zero config needed for Next.js.

## Structure

- src/app/ — root layout (fonts, metadata), global styles and color tokens, page assembly
- src/components/nav.tsx — header links; also exports the EMAIL constant
- src/components/sections/ — one file per section; copy lives in const arrays at the top of each
