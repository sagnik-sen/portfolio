# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

Run build + lint + typecheck before saying a task is done. There is no test suite, so these three are the gate. Run `npm install` first if `node_modules` is missing.

## Design rules
- Dark graphite, mostly monochrome, typography-led. No boxy card grids.
- Use colors only through the CSS variables in `src/app/globals.css` (`:root`, which `@theme inline` exposes as Tailwind utilities). Never put hex values or Tailwind palette colors in components.
