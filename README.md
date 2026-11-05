# Sagnik Sen's portfolio

A personal portfolio site styled as a retro emulator menu.

Live at https://sagnik-sen.vercel.app

## What it is

A single page that looks and works like the menu of an old game emulator: icy blue phosphor text on a dark CRT screen with scanlines and pixel fonts, with the selected item in amber. Each menu screen has its own URL hash (`#projects`, `#projects/atlas`), so links, deep links and the back button work. Every screen is in the HTML, so crawlers see all the content, and without JavaScript the content screens show as one long page.

Extras:

- A boot screen on the first visit in each browser tab. Any key or tap skips it, and it never shows if you prefer reduced motion.
- A skills screen built from the projects' tools, most used first, each linking to the projects that used it.
- A terminal for browsing by command (`help`, `ls`, `cat atlas`, `skills`, `neofetch`, ...).
- Trophies: achievements you unlock by exploring, saved in your browser.
- Switchable color palettes and optional menu sounds, both in Settings.
- An on-screen D-pad on phones, which can be hidden.
- A screensaver after a minute without input on desktop.
- A hidden screen for anyone who knows a certain old cheat code.
- A plain one-page version at `/plain`, and case studies with diagrams for UrbanPulse, Atlas and OpenEscrow at `/projects/<slug>`.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Controls

- ↑/↓ or W/S: move
- →, D or Enter: open
- ←, A or Esc: back
- Q: main menu
- `` ` `` or `~`: terminal
- `?`: controls

The single-key shortcuts (letters, `` ` ``, `~`, `?`) can be switched off in Settings. On a phone, tap an entry or use the D-pad.

## Getting started

Needs Node.js 20.9 or newer.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit   # typecheck
```

End-to-end tests (Playwright) run against the production build:

```sh
npx playwright install chromium   # first time only
npm run build && npm run test:e2e
```

GitHub Actions runs lint, typecheck, build and the end-to-end tests on every push to `main` and every pull request.

## Where to edit

- Copy (intro, projects, experience, links, trophies): `src/content.ts`. The menu in `src/components/menu.tsx` renders it.
- Colors: CSS variables in `src/app/globals.css`. To add a palette, add a `:root[data-theme="..."]` block there and an entry in `THEMES` in `src/components/retro/theme.ts`.
- Extras (boot screen, terminal, D-pad, trophies, sounds, screensaver, pixel icons, themes): `src/components/retro/`.

## Quality gates

Every pull request runs lint, typecheck, the production build, and the Playwright suite (`.github/workflows/ci.yml`):

- **End-to-end:** 33 tests on desktop Chrome and a Pixel 7, covering keyboard and D-pad navigation, the boot screen, the terminal, no-JS rendering and no sideways scrolling on phones.
- **Accessibility:** axe checks for WCAG 2.1 A and AA on 12 pages (menu screens, `/plain`, the three case studies and the 404). Zero violations allowed.
- **Lighthouse (mobile, median of 3 runs):** the build fails below 80 for performance or below 95 for accessibility, best practices or SEO. Last local run:

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 |
| `/plain` | 98 | 100 | 100 | 100 |
| `/projects/urbanpulse-chennai` | 99 | 100 | 100 | 100 |

## Deploy

Hosted on Vercel, which deploys every push to `main`.
