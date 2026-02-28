## Why

The invoice HTML template and PDF generator use Inter + Fira Code fonts, while the rest of the app uses Syne + Geist Mono (loaded via `next/font/google`). This creates visual inconsistency between the invoice preview/PDF and the overall brand identity. Aligning the invoice fonts to match the app's design system ensures brand coherence across all outputs.

## What Changes

- Replace Inter with Syne as the sans-serif font in the invoice HTML template
- Replace Fira Code with Geist Mono as the monospace font in the invoice HTML template
- Update `@react-pdf/renderer` font registration from Inter/Fira Code to Syne/Geist Mono with correct Google Fonts TTF URLs
- Update all `fontFamily` references in both template and PDF document component

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `invoice-pdf`: Font families changed from Inter/Fira Code to Syne/Geist Mono for both HTML preview and PDF output
- `design-system`: Invoice template fonts aligned with global app font variables

## Impact

- `src/features/invoices/components/invoice-html-template.tsx` — font family constants
- `src/features/invoices/components/invoice-pdf-document.tsx` — Font.register + fontFamily styles
- No API, schema, or dependency changes
- No new packages needed (Syne and Geist Mono already loaded via next/font in layout.tsx)
