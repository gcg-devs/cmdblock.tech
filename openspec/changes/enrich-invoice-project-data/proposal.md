## Why

The current Project and Invoice models lack the fields needed to produce professional SOA documents. Projects have no scope description or toggle for showing scope on invoices. Line items only have `description` + `amount` but lack a separate `name` field needed for structured invoice output (e.g., "Mobilization Fee (30%)" as name vs. detailed provisioning description). This blocks future HTML/PDF invoice rendering.

## What Changes

1. **Project model** gains `scopeDescription` (text) and `showScopeOnInvoice` (boolean, default true).
2. **LineItem model** gains a `name` field (short label like "Mobilization Fee (30%)") separate from `description` (detailed text).
3. **Project form** updated with scope description textarea and show-scope toggle.
4. **Invoice form** line item editor updated: name input + description textarea + amount input per line item.
5. **Detail pages** display the new fields.
6. **Invoice output shape** endpoint/utility that produces the structured JSON for future rendering.

## Capabilities

### New Capabilities
- `invoice-output-shape`: Structured JSON output for invoice data combining project scope and line items

### Modified Capabilities
- `entity-delete`: No changes to delete behavior — existing cascade still applies to new fields

## Impact

- `prisma/schema.prisma` — Project + LineItem model changes, migration required
- `src/features/projects/` — form, actions, detail page
- `src/features/invoices/` — form, actions, detail page, new output utility
- `src/app/dashboard/projects/` — form page, detail page
- `src/app/dashboard/invoices/` — form page, detail page
