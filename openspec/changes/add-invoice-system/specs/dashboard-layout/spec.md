## ADDED Requirements

### Requirement: Dashboard sidebar navigation
The system SHALL provide a sidebar in the dashboard layout with navigation links to Overview, Clients, Projects, and Invoices.

#### Scenario: Sidebar renders on all dashboard pages
- **WHEN** a user navigates to any `/dashboard/*` route
- **THEN** a sidebar is visible with navigation items: Overview, Clients, Projects, Invoices
- **THEN** the current route is highlighted in the sidebar

#### Scenario: Sidebar collapses on mobile
- **WHEN** the viewport is below 768px
- **THEN** the sidebar collapses to a hamburger menu or sheet overlay

### Requirement: Dashboard layout wrapper
The system SHALL wrap all dashboard routes in a shared layout with sidebar and main content area.

#### Scenario: Layout structure
- **WHEN** any dashboard page renders
- **THEN** the sidebar is on the left and the main content occupies the remaining space
- **THEN** the layout matches the monochrome design system
