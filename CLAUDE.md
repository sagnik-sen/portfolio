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
- Retro emulator-menu (RGUI-style) theme: icy blue phosphor on near-black, amber for the selected item, VT323 body text, Press Start 2P for headings, CRT scanlines. Inspired by the style only; no RetroArch name or logo.
- Use colors only through the CSS variables in `src/app/globals.css` (`:root`, which `@theme inline` exposes as Tailwind utilities). Never put hex values or Tailwind palette colors in components.
- All copy lives in `src/content.ts`. `src/components/menu.tsx` renders it as menu screens keyed by the URL hash (`#projects`, `#projects/<slug>`); every screen stays in the HTML (`hidden`) so the content is in the page source for crawlers.
- Alternate palettes are `:root[data-theme="..."]` blocks in `globals.css`; the inline script in `layout.tsx` restores the saved theme and sets `data-boot` (boot screen, once per session, never with reduced motion) before first paint. Add a palette there and in `THEMES` in `src/components/retro/theme.ts`.
- Interactive extras live in `src/components/retro/` (boot, terminal, D-pad, achievements, sounds, icons, external-link overlay); `menu.tsx` wires them in. Every effect must be skippable and switched off under `prefers-reduced-motion`.
