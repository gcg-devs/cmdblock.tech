## Context

The cmdblock.tech internal dashboard currently has a flat layout (header + main content) with only a welcome message. The team needs a full invoicing system to manage client relationships, project budgets with milestone payments, and invoice generation. The app uses Next.js App Router, Prisma/Neon Postgres, and shadcn/ui with a monochrome design system.

## Goals / Non-Goals

**Goals:**
- Full Client → Project → Invoice relational data model
- Dashboard sidebar navigation for all entities
- CRUD for clients, projects, and invoices
- Auto-incremented invoice IDs (YYYY-NNNN format)
- Line item editor on invoice forms
- Financial summaries on projects (billed/collected/remaining)
- Ad-hoc invoices (optional project link)

**Non-Goals:**
- PDF/HTML invoice rendering or export
- Email sending or notifications
- Payment gateway integration
- Multi-currency conversion logic
- Role-based access control (all authenticated users can do everything)
- Reporting or analytics dashboards

## Decisions

### 1. Database Schema: Relational with Prisma models

```
Client (1) → (N) Project (1) → (N) Invoice (1) → (N) LineItem
```

- `Client`: id, name, pocName, pocEmail, billingAddress, timestamps
- `Project`: id, clientId (FK), title, status enum, totalContractValue, currency enum, timestamps
- `Invoice`: id, projectId (FK, nullable for ad-hoc), invoiceNumber (unique, auto-gen), type enum, status enum, issueDate, dueDate, totalAmount, timestamps
- `LineItem`: id, invoiceId (FK), description, amount

Computed fields (billed/collected/remaining) calculated via Prisma aggregations at query time, not stored.

**Rationale**: Normalized schema prevents data duplication. Computed fields avoid sync issues.

### 2. Invoice Number Generation: DB sequence approach

Use a counter pattern: query max invoice number for current year, increment. Format: `2026-0001`. Handled in the create invoice server action with a transaction to prevent race conditions.

**Alternative considered**: Postgres sequence — harder to reset yearly.

### 3. Dashboard Layout: shadcn Sidebar component

Use `shadcn/ui` Sidebar component for dashboard navigation. All dashboard routes share a layout at `src/app/dashboard/layout.tsx` with the sidebar.

Navigation items: Overview, Clients, Projects, Invoices.

### 4. Feature Structure (FSD)

```
src/features/clients/     — actions.ts, components/, types.ts
src/features/projects/    — actions.ts, components/, types.ts
src/features/invoices/    — actions.ts, components/, types.ts
src/features/dashboard/   — components/ (sidebar, overview)
```

### 5. Form Pattern: Server Actions + useActionState

Consistent with existing auth pattern. All mutations via server actions in `actions.ts`. Forms use `useActionState` for pending/error states.

### 6. Date Picker: shadcn date-picker with popover + calendar

Use shadcn's built-in date picker pattern (Popover + Calendar components). No external date library.

### 7. Route Structure

```
/dashboard              — Overview (stats)
/dashboard/clients      — Client list
/dashboard/clients/new  — Create client
/dashboard/clients/[id] — View/edit client
/dashboard/projects      — Project list
/dashboard/projects/new  — Create project
/dashboard/projects/[id] — View/edit project
/dashboard/invoices      — Invoice list
/dashboard/invoices/new  — Create invoice
/dashboard/invoices/[id] — View invoice
```

## Risks / Trade-offs

- **[Invoice number race condition]** → Mitigated by wrapping generation in a Prisma transaction
- **[Large scope]** → Mitigated by keeping forms simple, no PDF rendering, no email
- **[No optimistic updates]** → Server actions revalidate pages; acceptable latency for internal tool
- **[Ad-hoc invoices]** → nullable projectId; UI shows "Ad-hoc" label when no project linked
