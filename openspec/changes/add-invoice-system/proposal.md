## Why

cmdblock.tech handles high-ticket, fixed-bid contracts requiring structured billing across milestone payments. Currently there is no way to track clients, projects, or generate invoices from the dashboard. The team needs a Client → Project → Invoice system to manage split payments, track collection progress, and generate SOA documents — all from the internal dashboard.

## What Changes

- Add `Client`, `Project`, and `Invoice` Prisma models with a `LineItem` embedded model
- Add a dashboard sidebar for navigation between Clients, Projects, and Invoices
- Add Client CRUD pages: list, create, view/edit
- Add Project CRUD pages: list, create, view/edit with financial summary (billed / collected / remaining)
- Add Invoice CRUD pages: list, create (with line items), view with status management
- Invoice IDs auto-generated in `YYYY-NNNN` format (e.g., `2026-0001`)
- Date pickers for issue date and due date on invoice form
- Support ad-hoc invoices (no project) and project-linked invoices
- Dashboard sidebar layout replaces current flat dashboard page

## Capabilities

### New Capabilities
- `clients`: Client management — CRUD operations, point-of-contact info, billing address
- `projects`: Project management — contract value tracking, status lifecycle, financial summaries (billed/collected/remaining)
- `invoices`: Invoice management — auto-ID generation, line items, status workflow (DRAFT → SENT → PAID/OVERDUE), date pickers, project-linked and ad-hoc invoices
- `dashboard-layout`: Sidebar navigation layout for the authenticated dashboard area

### Modified Capabilities
- `dashboard`: Dashboard landing page updated to show overview stats instead of simple welcome

## Impact

- **Database**: 4 new models (Client, Project, Invoice, LineItem) + migration
- **Dependencies**: date picker component (shadcn), sidebar component (shadcn), table component (shadcn), select component (shadcn), dialog component (shadcn)
- **Routes**: New `/dashboard/clients/*`, `/dashboard/projects/*`, `/dashboard/invoices/*` routes
- **Layout**: New dashboard layout with sidebar navigation
- **Existing**: Dashboard page redesigned as overview with stats
