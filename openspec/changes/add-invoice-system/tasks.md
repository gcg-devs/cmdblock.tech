## 1. Database & Dependencies

- [x] 1.1 Add shadcn components: sidebar, table, select, popover, calendar, separator, badge, sheet, dropdown-menu, dialog, textarea
- [x] 1.2 Add Client, Project, Invoice, and LineItem models to Prisma schema and run migration
- [x] 1.3 Create seed script additions for sample client and project data

## 2. Dashboard Layout

- [x] 2.1 Create `src/features/dashboard/components/dashboard-sidebar.tsx` — sidebar navigation component
- [x] 2.2 Create `src/app/dashboard/layout.tsx` — shared dashboard layout with sidebar
- [x] 2.3 Update `src/app/dashboard/page.tsx` — overview page with entity counts

## 3. Clients Feature

- [x] 3.1 Create `src/features/clients/actions.ts` — createClient, updateClient server actions
- [x] 3.2 Create `src/features/clients/components/client-form.tsx` — reusable client form
- [x] 3.3 Create `src/features/clients/components/clients-table.tsx` — client list table
- [x] 3.4 Create `src/app/dashboard/clients/page.tsx` — client list page
- [x] 3.5 Create `src/app/dashboard/clients/new/page.tsx` — create client page
- [x] 3.6 Create `src/app/dashboard/clients/[id]/page.tsx` — client detail/edit page

## 4. Projects Feature

- [x] 4.1 Create `src/features/projects/actions.ts` — createProject, updateProject server actions
- [x] 4.2 Create `src/features/projects/components/project-form.tsx` — project form with client select
- [x] 4.3 Create `src/features/projects/components/projects-table.tsx` — project list table
- [x] 4.4 Create `src/features/projects/components/project-financial-summary.tsx` — billed/collected/remaining display
- [x] 4.5 Create `src/app/dashboard/projects/page.tsx` — project list page
- [x] 4.6 Create `src/app/dashboard/projects/new/page.tsx` — create project page
- [x] 4.7 Create `src/app/dashboard/projects/[id]/page.tsx` — project detail page with invoices

## 5. Invoices Feature

- [x] 5.1 Create `src/features/invoices/actions.ts` — createInvoice, updateInvoiceStatus server actions with auto-ID generation
- [x] 5.2 Create `src/features/invoices/components/invoice-form.tsx` — invoice form with date pickers, line items, project select
- [x] 5.3 Create `src/features/invoices/components/invoices-table.tsx` — invoice list table
- [x] 5.4 Create `src/features/invoices/components/line-item-editor.tsx` — dynamic line item add/remove
- [x] 5.5 Create `src/app/dashboard/invoices/page.tsx` — invoice list page
- [x] 5.6 Create `src/app/dashboard/invoices/new/page.tsx` — create invoice page
- [x] 5.7 Create `src/app/dashboard/invoices/[id]/page.tsx` — invoice detail with status management
