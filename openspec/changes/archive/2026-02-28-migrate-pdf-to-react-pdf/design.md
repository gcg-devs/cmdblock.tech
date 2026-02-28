## Context

The app currently generates invoice PDFs via a server-side API route (`GET /api/invoices/[id]/pdf`) that uses `puppeteer-core` to connect to a Docker Chromium sidecar. The Puppeteer flow renders the `InvoiceHtmlTemplate` React component as static HTML, loads it into headless Chromium at 1080px viewport width, and calls `page.pdf()`. Client components fetch the API and trigger a blob download.

The proposal replaces the Puppeteer/Chromium pipeline with `@react-pdf/renderer`, which generates vector PDFs purely in Node.js without any browser engine.

## Goals / Non-Goals

**Goals:**
- Replace Puppeteer + Chromium with `@react-pdf/renderer` for zero-infra PDF generation
- Produce PDFs that visually match the existing HTML invoice template (same fonts, spacing, colors, layout)
- Keep the API route contract (`GET /api/invoices/[id]/pdf`) unchanged
- Remove the chromium Docker service and `CHROMIUM_URL` env var

**Non-Goals:**
- Changing the HTML template used for web preview (it stays as-is)
- Altering the client-side download flow (already uses fetch → blob)
- Supporting arbitrary HTML-to-PDF conversion (only the invoice layout)

## Decisions

### D1: Use `@react-pdf/renderer` with `renderToBuffer`
**Choice**: `@react-pdf/renderer` over Puppeteer, PDFKit, or pdfme.
**Rationale**: The invoice is a structured data-driven document, not arbitrary HTML. React-PDF lets us define the layout using React components with a Flexbox-like style system, producing native vector PDFs with selectable text. No browser engine or external service needed. `renderToBuffer()` runs in the API route and returns a Buffer directly.

### D2: Create a parallel `InvoicePdfDocument` component
**Choice**: New file `invoice-pdf-document.tsx` alongside the existing `invoice-html-template.tsx`.
**Rationale**: The HTML template continues to power the web preview. The PDF document component mirrors its visual output using React-PDF primitives (`Document`, `Page`, `View`, `Text`). Both consume `InvoiceOutputShape` — same data contract, different renderers.

### D3: Register Inter and Fira Code fonts via `Font.register`
**Choice**: Use Google Fonts CDN URLs with `@react-pdf/renderer`'s `Font.register()`.
**Rationale**: React-PDF requires explicit font registration (it doesn't use system fonts). Registering Inter (sans) and Fira Code (mono) from Google Fonts ensures the PDF matches the web template's typography exactly.

### D4: A4 page size with matching padding
**Choice**: A4 page (595.28 × 841.89 pt), padding 56pt top/bottom + 48pt left/right.
**Rationale**: Mirrors the HTML template's `padding: 56px 48px` on a `maxWidth: 960px` container. A4 is the standard invoice format. The border-top (8px solid #0a0a0a) is reproduced as a `View` with `height: 8, backgroundColor: '#0a0a0a'`.

## Risks / Trade-offs

- **[Visual fidelity]** React-PDF's Flexbox engine has minor differences from browser CSS. → Mitigation: Manually test and adjust spacing/alignment to match. The invoice layout is simple enough that discrepancies should be minimal.
- **[Font rendering]** Google Fonts CDN URLs may change. → Mitigation: Use stable font file URLs. Could bundle fonts locally as fallback.
- **[Bundle size]** `@react-pdf/renderer` adds ~2MB to node_modules. → Mitigation: Only imported in the API route (server-side), doesn't affect client bundle.
