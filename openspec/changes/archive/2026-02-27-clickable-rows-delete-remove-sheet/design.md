## Context

The dashboard has three entity list tables (clients, projects, invoices). Currently only the name/number column links to the detail page — the rest of the row is dead space. The invoices table has a redundant Sheet side-panel that duplicates the existing detail page. There is no delete functionality anywhere in the UI.

## Goals / Non-Goals

**Goals:**
- Remove invoice Sheet side-panel, simplify invoices-table back to server component
- Make all table rows fully clickable across all entity tables
- Add delete actions with cascade-aware confirmation dialogs
- Surface delete buttons on detail pages

**Non-Goals:**
- Bulk delete / multi-select
- Soft delete / archival — hard deletes only
- Undo support beyond the confirmation dialog

## Decisions

1. **Row navigation via `useRouter` in client wrapper**: Wrap each table in a thin client component that adds `onClick` + `cursor-pointer` to rows, using `router.push()`. This avoids wrapping every cell in `<Link>` which breaks table semantics.

2. **Delete via AlertDialog**: Use shadcn `AlertDialog` for destructive confirmation. Red "Delete" trigger, clear description of consequences. Located on detail pages only (not list pages) to avoid accidental mass deletion.

3. **Cascade behavior**: Deleting a client deletes its projects and their invoices. Deleting a project deletes its invoices. Deleting an invoice deletes its line items. Use Prisma cascade (already configured for lineItems→invoice; need onDelete: Cascade for invoice→project and project→client).

4. **Delete button placement**: On detail pages, add a destructive "Delete" button in the header row alongside Back/status controls.

## Risks / Trade-offs

- [Cascade deletion] Users could accidentally delete a client with many projects/invoices → Mitigation: AlertDialog shows entity counts ("This will also delete 3 projects and 7 invoices")
- [No undo] Hard delete is permanent → Mitigation: Clear warning copy in confirmation dialog
