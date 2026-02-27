# design-system Specification

## Purpose
TBD - created by archiving change create-portfolio-homepage. Update Purpose after archive.
## Requirements
### Requirement: Monochrome color palette
The design system uses a strict monochrome black/white palette with no color accents. Dark theme is the default. Light theme is a clean inversion of dark.

#### Scenario: Dark theme tokens
- **WHEN** the app renders in dark mode (default)
- **THEN** background is pure black (#000), foreground is pure white (#fff), borders are 1px white at low opacity

#### Scenario: Light theme tokens
- **WHEN** the user switches to light mode
- **THEN** background is pure white (#fff), foreground is pure black (#000), borders are 1px black at low opacity

### Requirement: Zero border-radius globally
All UI elements (buttons, cards, inputs, dialogs, popovers) use `border-radius: 0`. No rounded corners anywhere.

#### Scenario: Shadcn component radius
- **WHEN** any shadcn/ui component renders
- **THEN** the `--radius` CSS variable is `0` and all radius scale tokens resolve to `0`

### Requirement: Font system — Syne + Geist Mono
Display/headline typography uses Syne (Google Font). Body/UI typography uses Geist Mono. Both loaded via `next/font`.

#### Scenario: Font loading
- **WHEN** the app loads
- **THEN** Syne is available as `--font-syne` and Geist Mono as `--font-geist-mono`
- **THEN** `font-sans` CSS maps to Syne, `font-mono` maps to Geist Mono

#### Scenario: Typography hierarchy
- **WHEN** rendering headlines (h1-h3)
- **THEN** Syne is used at bold weight with tight letter-spacing
- **WHEN** rendering body text, UI elements, navigation
- **THEN** Geist Mono is used at regular weight

### Requirement: Thin border system
All borders and dividers are 1px solid using the border token color. No thick borders, no decorative borders.

#### Scenario: Section dividers
- **WHEN** a section divider renders
- **THEN** it is a full-width 1px horizontal line using the border color token

