## 1. Dependencies & Schema

- [x] 1.1 Install html2canvas and jspdf packages via bun
- [x] 1.2 Add PaymentProtocol model to Prisma schema and run migration

## 2. Payment Protocol Feature

- [x] 2.1 Create `src/features/payment-protocols/actions.ts` with CRUD server actions (create, update, delete, setDefault)
- [x] 2.2 Create `src/features/payment-protocols/components/payment-protocol-form.tsx` — form component for create/edit
- [x] 2.3 Create `/dashboard/payment-protocols` page with list and inline form

## 3. Invoice Output Shape Extension

- [x] 3.1 Extend `InvoiceOutputShape` interface and `buildInvoiceOutput()` to include `client_billing_address` and `payment_protocol` fields

## 4. Invoice PDF Template & Preview

- [x] 4.1 Create `src/features/invoices/components/invoice-html-template.tsx` — React component that renders the monochrome SOA HTML template from invoice output data
- [x] 4.2 Create `src/features/invoices/components/invoice-pdf-preview.tsx` — client component with document viewer container, payment protocol selector, and download button
- [x] 4.3 Create `/dashboard/invoices/[id]/pdf/page.tsx` — server component that fetches invoice data + payment protocols and renders the preview

## 5. Integration

- [x] 5.1 Add "Download PDF" button to invoice detail page linking to `/dashboard/invoices/[id]/pdf`
- [x] 5.2 Add "Payment Protocols" link to dashboard sidebar navigation

## 6. Team Profile

- [x] 6.1 Add TeamProfile model to Prisma schema and run migration
- [x] 6.2 Create `src/features/team-profile/actions.ts` with upsert server action
- [x] 6.3 Create `src/features/team-profile/components/team-profile-form.tsx` — form component
- [x] 6.4 Create `/dashboard/team-profile` page
- [x] 6.5 Wire team profile data into invoice HTML template and PDF preview
- [x] 6.6 Add "Team Profile" link to dashboard sidebar navigation
