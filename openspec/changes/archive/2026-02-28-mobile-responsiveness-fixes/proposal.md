## Why

The shared invoice view and edit invoice form have mobile responsiveness issues. On mobile viewports, the shared invoice page shows both a full HTML preview and a sidebar — the preview is unusable on small screens and the sidebar gets squeezed. On the edit form, the Project dropdown (which contains long text like "Project Title — Client Name") overlaps with the Type dropdown when they share a row on `sm:` breakpoint.

## What Changes

- **Shared invoice view**: On mobile (`< md`), hide the HTML invoice preview entirely and show only the download PDF button prominently. The sidebar details card and download button become the primary mobile layout.
- **Invoice form**: Change the Project + Type grid from `sm:grid-cols-2` to stack them vertically — Project on top (full width), Type below it. This prevents overlap with long project names and is cleaner on all screen sizes.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `shareable-invoice`: Mobile layout hides HTML preview, shows only download button + invoice details
- `invoice-pdf`: Edit form dropdown layout changed to prevent overflow

## Impact

- `src/features/invoices/components/shared-invoice-view.tsx` — responsive layout classes
- `src/features/invoices/components/invoice-form.tsx` — grid layout for Project/Type dropdowns
- No API, schema, or dependency changes
