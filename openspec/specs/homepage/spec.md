# homepage Specification

## Purpose
TBD - created by archiving change create-portfolio-homepage. Update Purpose after archive.
## Requirements
### Requirement: Hero section
The homepage opens with a hero section featuring the `>_` prompt accent, studio name, and elevator pitch tagline.

#### Scenario: Hero renders
- **WHEN** the homepage loads
- **THEN** a hero section displays with `>_ cmdblock.tech` as the primary heading in Syne
- **THEN** a tagline in Geist Mono summarizes the studio identity
- **THEN** the hero has generous vertical padding (spacious layout)

### Requirement: About / The Unit section
A section introducing the three-person engineering team with their roles and specializations.

#### Scenario: Team display
- **WHEN** the user scrolls to the About section
- **THEN** a `>_ The Unit` header is visible
- **THEN** three team member blocks are displayed: Ghegi (Application & Interactive Systems Lead), Gudo (Machine Learning & Theoretical Architecture), Chan (Fullstack Architecture & Integration)
- **THEN** each block shows name, role title, and a brief description

### Requirement: Capabilities section
A section listing the studio's four core capabilities.

#### Scenario: Capabilities display
- **WHEN** the user scrolls to Capabilities
- **THEN** a `>_ Capabilities` header is visible
- **THEN** four capability blocks display: Bespoke Web Applications & SaaS, Interactive Software & Game Development, Machine Learning & Data Pipelines, Complex Systems Integration & Rescue
- **THEN** each capability has a title and brief description

### Requirement: Philosophy section
A section presenting the studio's three core principles.

#### Scenario: Philosophy display
- **WHEN** the user scrolls to Philosophy
- **THEN** a `>_ Philosophy` header is visible
- **THEN** three principles display: Execute with Precision, Hyper-Focused Engineering, Theoretical meets Practical

### Requirement: Contact section
A minimal footer/contact section.

#### Scenario: Contact display
- **WHEN** the user scrolls to the bottom
- **THEN** a `>_ Contact` section with studio email/link is displayed

### Requirement: Staggered reveal animation
Content blocks animate in on page load with staggered delays.

#### Scenario: Page load animation
- **WHEN** the homepage first loads
- **THEN** content blocks fade in with 50-100ms staggered delays
- **THEN** animations are CSS-based (no JS animation library required)
- **THEN** animations respect `prefers-reduced-motion`

### Requirement: Responsive layout
The homepage is fully responsive across mobile, tablet, and desktop.

#### Scenario: Mobile viewport
- **WHEN** viewport is < 768px
- **THEN** all sections stack vertically, team/capability grids become single-column

