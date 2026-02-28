## Why

The current PDF generation relies on Puppeteer connecting to a Docker Chromium sidecar. This adds infrastructure complexity (extra container, memory overhead, WebSocket dependency) for what is fundamentally a structured document rendering task. Since the invoice template is a data-driven layout (not arbitrary HTML), `@react-pdf/renderer` can produce identical vector PDFs purely in Node.js — no browser engine needed. This eliminates the chromium Docker service entirely, reduces deployment complexity, and works consistently regardless of the caller's device viewport.

## What Changes

- **Remove** `puppeteer-core` dependency and `src/lib/pdf.ts` (Puppeteer connection utility)
- **Remove** the `chromium` Docker sidecar service from `docker-compose.yml` and related `CHROMIUM_URL` env var
- **Add** `@react-pdf/renderer` dependency
- **Create** `src/features/invoices/components/invoice-pdf-document.tsx` — a React-PDF document component that visually matches the existing `InvoiceHtmlTemplate` layout (same fonts, spacing, colors, structure)
- **Rewrite** `src/app/api/invoices/[id]/pdf/route.ts` — use `renderToBuffer` from `@react-pdf/renderer` instead of Puppeteer
- **No client-side changes needed** — `invoice-pdf-preview.tsx` and `shared-invoice-view.tsx` already use fetch-based download from the API route

## Capabilities

### New Capabilities

### Modified Capabilities
- `invoice-pdf`: PDF generation mechanism changes from Puppeteer/Chromium to `@react-pdf/renderer`. The API route contract (`GET /api/invoices/[id]/pdf`) stays identical. The visual output must match the existing HTML template exactly.

## Impact

- **Dependencies**: Remove `puppeteer-core`. Add `@react-pdf/renderer`.
- **Infrastructure**: Remove `chromium` Docker service from `docker-compose.yml`. Remove `CHROMIUM_URL` env var.
- **Files modified**: `src/lib/pdf.ts` (deleted), `src/app/api/invoices/[id]/pdf/route.ts` (rewritten internals), new `invoice-pdf-document.tsx`.
- **No client-side changes**: Download flow already uses `fetch()` → blob → download.
- **No database changes**.
