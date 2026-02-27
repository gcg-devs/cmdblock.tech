## Context

The project is a fresh Next.js 16 starter with Tailwind CSS 4, shadcn/ui, and default Geist fonts. The homepage is the default onboarding template. We are establishing the cmdblock.tech design identity and building the portfolio homepage in one pass.

Current state: default shadcn theme with 0.625rem radius, OKLCH neutral palette, Geist Sans + Geist Mono fonts.

## Goals / Non-Goals

**Goals:**
- Establish a monochrome, sharp-cornered design system with Syne + Geist Mono
- Build a complete single-page portfolio homepage with 5 sections
- Dark-first theme with clean light inversion
- Staggered reveal animations on load
- Responsive layout

**Non-Goals:**
- Multi-page routing (about, blog, individual project pages)
- CMS or database-driven content
- Contact form functionality
- Dark/light theme toggle UI (can be added later)

## Decisions

### D1: Font loading via next/font/google
Both Syne and Geist Mono loaded through `next/font` for optimal performance. Syne replaces Geist Sans as the `--font-sans` variable. Geist Mono remains as `--font-mono`.

### D2: CSS-only animations
Staggered reveal uses CSS `@keyframes` + `animation-delay` with a utility class pattern. No motion library dependency. Respects `prefers-reduced-motion`.

### D3: Feature-sliced homepage structure
Homepage sections live in `src/features/homepage/components/` with one file per section. The main `page.tsx` composes them. Each section component is under 150 lines.

### D4: Design token approach
Override existing OKLCH tokens in `globals.css` with pure black/white values. Set `--radius: 0`. Keep the shadcn variable structure intact for future component compatibility.

### D5: Subtle `>_` prompt accent
Section headers prefixed with `>_` rendered as a `<span>` with reduced opacity. Not animated — static decorative element.

### D6: Content is hardcoded
All portfolio content (team bios, capabilities, philosophy) is hardcoded in component files. No data fetching or CMS integration.

## Risks / Trade-offs

- **Pure monochrome may feel flat**: Mitigated by strong typography scale contrast (large Syne headlines vs small Geist Mono body) and generous whitespace.
- **No theme toggle yet**: Users get dark mode only (system preference respected via Tailwind `dark:` variant). Toggle is a future enhancement.
- **Hardcoded content**: Fast to build, but content updates require code changes. Acceptable for a studio portfolio.
