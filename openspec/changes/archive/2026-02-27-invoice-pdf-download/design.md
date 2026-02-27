## Context

The invoice system has full CRUD but no document export. Invoices exist only as database records viewed in the dashboard. Clients need professional PDF statements of account. There's also no way to store payment details (bank accounts) that should appear on invoices.

Current state:
- `Invoice` model with `LineItem` children, linked to `Project` → `Client`
- `buildInvoiceOutput()` transforms invoice data to a flat shape for rendering
- No PDF library, no payment protocol storage, no document preview UI

## Goals / Non-Goals

**Goals:**
- PaymentProtocol CRUD with a simple dashboard management page
- Monochrome, printable HTML invoice template rendered from invoice data
- Document preview UI on invoice detail page with PDF download
- Extend invoice output shape to carry payment protocol and billing address

**Non-Goals:**
- Server-side PDF generation (Puppeteer/wkhtmltopdf) — client-side is sufficient
- Email delivery of PDFs
- Multiple template designs or theming
- Watermarks or digital signatures

## Decisions

### D1: Client-side PDF via html2canvas + jsPDF
**Choice**: Use `html2canvas` to rasterize the HTML template, then `jsPDF` to wrap it as PDF.
**Rationale**: No server-side headless browser needed. Works in all modern browsers. The template is a fixed-width document (960px) which rasterizes cleanly.
**Alternative considered**: `@react-pdf/renderer` — requires rewriting the template in a custom DSL, loses the ability to preview as plain HTML.

### D2: Dedicated preview route at `/dashboard/invoices/[id]/pdf`
**Choice**: New nested page under the invoice detail route that shows the rendered HTML in a document-viewer frame with a "Download PDF" button.
**Rationale**: Keeps the invoice detail page clean. The preview route is a client component that fetches invoice data via API route and renders the HTML template in an iframe-like container.
**Implementation**: Server component fetches invoice + first payment protocol, passes to a client component that renders the HTML and handles download.

### D3: PaymentProtocol as standalone model
**Choice**: New `PaymentProtocol` model with fields: `label`, `bankName`, `accountName`, `accountNumber`, `isDefault`, timestamps.
**Rationale**: Decoupled from invoices — payment methods change independently. The first (or default) protocol is used when generating the PDF. Simple flat model, no relations to Invoice.

### D4: Feature-sliced structure
**Choice**: New `src/features/payment-protocols/` feature directory. PDF components live in `src/features/invoices/components/`.
**Rationale**: Follows existing codebase convention (feature-sliced design).

### D5: Monochrome light-mode template
**Choice**: The HTML template uses light background, black/gray text, no color accents. Matches cmdblock.tech branding (>_ prompt, Syne + Geist Mono fonts) but in printable monochrome.
**Rationale**: User explicitly requested monochrome, printable, not dark mode. The template is a self-contained HTML document rendered inside the app's preview container.

## Risks / Trade-offs

- [html2canvas fidelity] Rasterization may have minor font rendering differences → Use system fonts as fallback, test with actual invoice data
- [Large invoices] Many line items could overflow a single page → html2canvas captures the full height, jsPDF can split across pages
- [No server PDF] Can't generate PDFs in automated workflows → Acceptable for now, can add server-side later if needed
