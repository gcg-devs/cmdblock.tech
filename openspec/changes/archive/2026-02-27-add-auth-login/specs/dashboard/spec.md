## ADDED Requirements

### Requirement: Dashboard landing page
The system SHALL provide a protected dashboard page at `/dashboard` as the post-login landing.

#### Scenario: Authenticated user views dashboard
- **WHEN** an authenticated user navigates to `/dashboard`
- **THEN** a dashboard page renders showing a welcome message with the user's display name
- **THEN** the page includes a logout action
- **THEN** the design matches the existing monochrome design system

### Requirement: Dashboard layout
The dashboard SHALL use a layout consistent with the site's design system.

#### Scenario: Dashboard layout renders
- **WHEN** the dashboard page loads
- **THEN** the layout uses the `>_` prompt accent in the header
- **THEN** typography uses Syne for headings and Geist Mono for body text
- **THEN** the layout is responsive across mobile and desktop viewports
