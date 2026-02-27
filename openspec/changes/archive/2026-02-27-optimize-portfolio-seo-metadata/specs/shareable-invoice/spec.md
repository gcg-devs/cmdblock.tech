## MODIFIED Requirements

### Requirement: Public page layout
The public invoice page SHALL use a minimal layout with the application header (no sidebar navigation). The main content area SHALL show the HTML invoice preview. A right sidebar panel SHALL display invoice metadata (status, due date, amount due) and a download PDF button. The route SHALL also emit custom share metadata (title and description) derived from invoice context while remaining excluded from indexing.

#### Scenario: Layout structure
- **WHEN** the public invoice page renders
- **THEN** the page shows the app header at top, a main content area with the invoice HTML preview on the left, and a details panel on the right with metadata and download button

#### Scenario: No-index for search engines
- **WHEN** the public invoice page renders
- **THEN** the page includes a robots meta tag with `noindex, nofollow`

#### Scenario: Custom shared-invoice embed metadata
- **WHEN** a social platform fetches metadata for `/share/invoice/[validToken]`
- **THEN** the page responds with a route-specific title and description suitable for link previews
- **THEN** metadata wording is based on non-sensitive invoice context only
