## Why

The project is a fresh Next.js starter with no content. cmdblock.tech needs a portfolio homepage that establishes the studio's identity as a boutique software development & engineering firm. The design system and homepage are the foundation for all future pages.

## What Changes

- Replace default Geist Sans with **Syne** (display/headlines) + **Geist Mono** (body/UI) font pairing
- Set global border-radius to `0` (sharp corners everywhere)
- Establish monochrome black/white design tokens (dark-first, clean light inversion)
- Replace default `page.tsx` with a full portfolio homepage containing: Hero, About/Unit, Capabilities, Philosophy, and Contact sections
- Add thin 1px hairline rule dividers between sections
- Add cold-open staggered reveal animations on page load
- Add subtle `>_` prompt accent before section headers

## Capabilities

### New Capabilities
- `design-system`: Global design tokens, fonts (Syne + Geist Mono), monochrome palette, 0-radius, 1px borders, CSS variables for dark/light themes
- `homepage`: Portfolio homepage with Hero, About (The Unit), Capabilities, Philosophy, and Contact sections with staggered reveal animations

### Modified Capabilities

## Impact

- `src/app/globals.css` — redesigned color tokens, radius set to 0, font variables
- `src/app/layout.tsx` — Syne font import, metadata for cmdblock.tech
- `src/app/page.tsx` — replaced with homepage shell
- `src/features/homepage/` — new feature directory with section components
- `package.json` — no new dependencies (Syne via Google Fonts / next/font)
