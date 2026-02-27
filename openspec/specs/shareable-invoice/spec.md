## Purpose

Enables public unauthenticated access to invoices via shareable links, including token generation, public viewing, and PDF download.
## Requirements
### Requirement: Share token generation
The system SHALL allow the user to generate a share token for an invoice from the invoice detail page. The token SHALL be a UUID v4 stored in the `shareToken` field. When generated, `isPublic` SHALL be set to true.

#### Scenario: Generate share link
- **WHEN** user clicks "Share" on an invoice that has no share token
- **THEN** a UUID share token is generated, `isPublic` is set to true, and a copyable URL is displayed

#### Scenario: Copy existing share link
- **WHEN** user clicks "Share" on an invoice that already has a share token and `isPublic` is true
- **THEN** the existing share URL is displayed for copying

#### Scenario: Revoke share access
- **WHEN** user toggles sharing off on a shared invoice
- **THEN** `isPublic` is set to false, the token is retained, and the public route returns 404

#### Scenario: Re-enable share access
- **WHEN** user toggles sharing on for an invoice with an existing token
- **THEN** `isPublic` is set to true and the same URL works again

### Requirement: Public invoice route
The system SHALL serve a public route at `/share/invoice/[shareToken]` that displays the invoice without authentication. The route SHALL only render when `isPublic` is true and the token matches.

#### Scenario: View shared invoice
- **WHEN** an unauthenticated user visits `/share/invoice/[validToken]` for a public invoice
- **THEN** the page renders with header only (no sidebar), the HTML invoice preview as main content, and a details sidebar with status, due date, total amount, and a download PDF button

#### Scenario: Access revoked invoice
- **WHEN** a user visits `/share/invoice/[validToken]` but `isPublic` is false
- **THEN** the page returns a 404 not-found response

#### Scenario: Invalid token
- **WHEN** a user visits `/share/invoice/[invalidToken]`
- **THEN** the page returns a 404 not-found response

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

### Requirement: Layout fixes
The invoice detail page SHALL display the line items summary below the form, not in a side column. The project detail page SHALL display the invoices table below the form, not in a side column.

#### Scenario: Invoice detail layout
- **WHEN** user views the invoice detail page
- **THEN** the form is full-width and the line items summary appears below the form

#### Scenario: Project detail layout
- **WHEN** user views the project detail page
- **THEN** the form is full-width and the invoices table appears below the form

