## Why

The invoice list page currently has a Sheet side-panel that opens when clicking a row. This is redundant because a full detail page (`/dashboard/invoices/[id]`) already exists. Additionally, table rows across all entities (clients, projects, invoices) only navigate when clicking the name/number column — the rest of the row is dead space. Finally, there is no way to delete records from the UI.

## What Changes

- **Remove** the invoice Sheet side-panel (`invoice-detail-panel.tsx`) and revert `invoices-table.tsx` to a server component
- **Make entire table rows clickable** on clients, projects, and invoices tables — clicking anywhere navigates to the detail page
- **Add delete functionality** with confirmation dialogs for clients, projects, and invoices
- **Add delete server actions** for each entity with proper cascade/validation

## Capabilities

### New Capabilities
- `entity-delete`: Delete functionality for clients, projects, and invoices with confirmation dialogs and toast notifications

### Modified Capabilities

## Impact

- `src/features/invoices/components/invoices-table.tsx` — revert to server component, remove Sheet
- `src/features/invoices/components/invoice-detail-panel.tsx` — delete file
- `src/features/clients/components/clients-table.tsx` — make rows clickable
- `src/features/projects/components/projects-table.tsx` — make rows clickable
- `src/features/clients/actions.ts` — add deleteClient
- `src/features/projects/actions.ts` — add deleteProject
- `src/features/invoices/actions.ts` — add deleteInvoice
- Detail pages for each entity — add delete button with dialog
- `src/app/dashboard/invoices/page.tsx` — simplify data fetch (remove lineItems, serialize)
