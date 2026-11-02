# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 (also the "portfolio-dev" config in .claude/launch.json)
npm run build      # production build; also the closest thing to a full check
npm run lint       # ESLint 9 flat config (next core-web-vitals + typescript)
npx tsc --noEmit   # typecheck only
```

There is no test suite. Verify changes with `lint`, `tsc`, and `build`, and by viewing the page in the dev server.

`node_modules` is not committed. Run `npm install` before reading the Next.js docs that AGENTS.md points to (`node_modules/next/dist/docs/`).

## Stack

Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, lucide-react icons, and the `geist` font package (not `next/font/google`). The `@/*` path alias maps to `src/*`. Deploys to Vercel with no config.

## Architecture

The site is a single-page portfolio with one route, `src/app/page.tsx`. That page stacks `<Nav />` and then the section components from `src/components/sections/`, with `<SectionDivider label=… />` between them. To add, remove, or reorder a section, edit `page.tsx`.

- **Content lives in the components.** There is no CMS and no data layer. Each section keeps its copy in a `const` array at the top of its file (`PROJECTS`, `LINKS`, and so on) and maps over it. To change the text, edit those arrays.
- **Anchor navigation.** `Nav`'s `LINKS` point to section `id`s (`#top`, `#work`, `#experience`, `#leadership`, `#contact`). When you rename a section `id`, update `nav.tsx` as well.
- **Most components are client components.** Every section uses `"use client"` because it uses Framer Motion. `layout.tsx`, `page.tsx`, and `section-divider.tsx` are the only server components.
- **Animation conventions.** Sections reveal on scroll with `initial` + `whileInView`, `viewport={{ once: true, ... }}`, and the easing curve `[0.16, 1, 0.3, 1]`. Follow this pattern for new sections. The `prefers-reduced-motion` rule in `globals.css` only affects CSS animations and transitions. It does not stop Framer Motion's JS animations; nothing calls `useReducedMotion` yet.
- **Decorative SVGs.** `neural-field.tsx` (the animated node graph behind the Hero and Contact sections) uses a seeded deterministic PRNG, so the server and client render identical nodes. Keep it deterministic, because `Math.random()` here would cause hydration mismatches. `project-visual.tsx` draws one hand-built SVG for each project `variant` (1–3). Adding a project to `PROJECTS` means adding a matching variant. Inline SVG gradient `id`s (`pv1`, `nf-line`, and so on) share the document's id namespace, so they must stay unique across the page.

## Styling

- Tailwind v4 has no `tailwind.config`. Design tokens are CSS variables on `:root` in `src/app/globals.css`, and the `@theme inline` block maps them to utilities: `bg-base`, `bg-elevated`, `bg-surface`, `text-primary`, `text-secondary`, `text-tertiary`, `text-accent-blue`, `text-accent-violet`, `bg-line`, and `border-line-strong`. Use these tokens instead of raw colors. Inside SVGs, reference the variables directly, for example `var(--accent-blue)`.
- The theme is dark only.
- Sections share this container: `mx-auto max-w-6xl px-6 md:px-10` (with `py-32` on sections).
- Labels and nav text use `font-mono` at small sizes (`text-[11px]`–`text-[13px]`), often `uppercase tracking-[0.2em]`.
- Add the `focus-ring` class (defined in `globals.css`) to interactive elements to get a visible focus outline.
- `cn()` in `src/lib/utils.ts` is `twMerge(clsx(...))`. Use it for conditional class names.

## Open items (from README)

- Replace the abstract `ProjectVisual` SVGs with real screenshots. The `aspect-[5/4]` panel accepts any image or video.
- Optionally add a resume PDF under `public/` and link it from the Hero or Contact section.
- The README says the Contact links are placeholders, but `contact.tsx` already contains the real email, GitHub, and LinkedIn links.
