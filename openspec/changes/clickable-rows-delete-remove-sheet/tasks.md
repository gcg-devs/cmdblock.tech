## 1. Remove Invoice Sheet & Fix Tables

- [ ] 1.1 Delete `src/features/invoices/components/invoice-detail-panel.tsx` and revert `invoices-table.tsx` to a simple server component with clickable rows via Link
- [ ] 1.2 Simplify `src/app/dashboard/invoices/page.tsx` — remove lineItems include, serialization; pass server data directly
- [ ] 1.3 Make `clients-table.tsx` and `projects-table.tsx` rows fully clickable (entire row navigates to detail page)

## 2. Delete Actions & Schema

- [ ] 2.1 Add `onDelete: Cascade` to Project→Client and Invoice→Project relations in Prisma schema, run migration
- [ ] 2.2 Add `deleteClient`, `deleteProject`, `deleteInvoice` server actions with cascade counts and toast-friendly responses

## 3. Delete UI on Detail Pages

- [ ] 3.1 Install shadcn `alert-dialog` component
- [ ] 3.2 Create shared `delete-entity-dialog.tsx` component using AlertDialog with destructive styling
- [ ] 3.3 Add delete button + dialog to client, project, and invoice detail pages
