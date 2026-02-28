## Context

Invoice template and PDF use Inter (sans) + Fira Code (mono). The app globally uses Syne (sans) + Geist Mono (mono) via `next/font/google` in `layout.tsx`, mapped to `--font-sans` / `--font-mono` CSS variables.

## Goals / Non-Goals

**Goals:**
- Align invoice HTML preview and PDF fonts with the app's design system
- Maintain visual parity between HTML preview and PDF output

**Non-Goals:**
- Redesigning invoice layout or spacing
- Changing font sizes or weights

## Decisions

1. **Sans-serif: Syne** — Already the app's primary font. Geometric, modern, distinctive character. Weights 400/600/700/800 available. The brand name `>_cmdblock.tech` benefits from Syne's bold geometric weight 700-800.

2. **Monospace: Geist Mono** — Vercel's monospace font, already the app's mono. Clean, excellent for tabular data (amounts, dates, SOA numbers). Weights 400/600/700 available.

3. **HTML template**: Reference fonts via CSS fallback chain `'Syne', var(--font-syne), system-ui, sans-serif` and `'Geist Mono', var(--font-geist-mono), monospace`. Since the template renders within the Next.js app where `next/font` is loaded, the CSS variables resolve correctly.

4. **PDF document**: Register Syne + Geist Mono via `Font.register()` with Google Fonts gstatic.com TTF URLs (latin subset). React-PDF downloads fonts at render time — no bundling needed.

5. **Brand name**: Use Geist Mono weight 700 for `>_cmdblock.tech` — it has a more technical, engineered feel than Syne at that weight.

## Risks / Trade-offs

- Google Fonts TTF URLs may change with font version bumps (low risk, stable for years)
- Syne has slightly wider glyphs than Inter — spacing may shift marginally but within acceptable range since we're not changing any dimensional values
