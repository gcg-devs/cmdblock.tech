## Context

The dashboard has invoice PDF preview/download behind auth. Clients must receive invoices externally (email, chat). Currently the freelancer must export a PDF and send it manually. A shareable link lets the client view the SOA in-browser and download the PDF themselves.

The invoice and project detail pages use a 2-column grid layout where supplementary content (line items table, invoices list) sits in the right column beside the form. On smaller viewports this stacks, but conceptually the form and supplementary data compete for attention.

## Goals / Non-Goals

**Goals:**
- Public unauthenticated route to view/download a shared SOA
- Share token generation and management on the invoice detail page
- Layout fixes: supplementary content below forms, not beside them

**Non-Goals:**
- Expiring share links (can be added later)
- Share analytics / view tracking
- Email delivery of share links
- Client portal with authentication

## Decisions

### D1: Share token strategy
**Choice**: `crypto.randomUUID()` stored as `shareToken` on Invoice, with `isPublic` boolean gate.
**Why**: UUID v4 is unguessable (122 bits of entropy), no external dependency. The `isPublic` flag lets the user revoke access without deleting the token (re-sharing restores same URL).
**Alternative**: nanoid — shorter URLs but adds a dependency for minimal gain.

### D2: Public route location
**Choice**: `/share/invoice/[shareToken]` — outside the `/dashboard` layout.
**Why**: Clear separation from authenticated routes. The `/share/` prefix signals public content and is extensible for future shareable resources. Uses a minimal layout (header only, no sidebar).

### D3: Public page layout
**Choice**: Two-panel layout — main content area with HTML invoice preview, right sidebar with metadata (status, due date, amount) and download PDF button.
**Why**: Matches the document viewer UX from the dashboard PDF preview but stripped of dashboard chrome. Header-only layout keeps branding visible.

### D4: PDF generation on public page
**Choice**: Reuse existing `invoice-pdf-preview.tsx` client component (or a slimmed variant) with html2canvas + jsPDF.
**Why**: No server-side PDF generation needed. The same client-side approach works for unauthenticated users since it's all browser-based.

### D5: Layout fix approach
**Choice**: Change grid layouts to single-column stacked layouts on both invoice detail and project detail pages.
**Why**: The supplementary content (line items, invoices) is secondary to the form. Stacking below keeps the form full-width and the supplementary data always visible without horizontal competition.

## Risks / Trade-offs

- **[Public data exposure]** → Mitigation: Only expose data when `isPublic = true` AND token matches. No enumeration possible (UUID is unguessable). No sensitive internal data in the output shape.
- **[Share link permanence]** → Mitigation: `isPublic` toggle lets user revoke without losing the token. Future: add expiry.
- **[SEO indexing of share pages]** → Mitigation: Add `<meta name="robots" content="noindex, nofollow">` to public pages.
