## Why

The invoice system can create and manage invoices but has no way to export them as professional, printable PDF documents. Clients need to receive statement-of-account PDFs, and the operator needs a document preview before downloading. Additionally, there is no way to store or manage payment details (bank accounts, e-wallets) that appear on invoices.

## What Changes

- Add a `PaymentProtocol` model to store payment methods (bank name, account name, account number, label).
- Add a dashboard page to manage payment protocols (CRUD).
- Add an invoice HTML template renderer that produces a monochrome, printable statement of account using invoice data + selected payment protocol.
- Add a PDF preview route on the invoice detail page that renders the HTML template in a document-viewer style, with a download button that converts HTML to PDF client-side.
- Default to the first payment protocol when generating invoices.

## Capabilities

### New Capabilities
- `payment-protocol`: Model, server actions, and dashboard UI for managing payment methods (bank transfer details). Includes CRUD form and listing.
- `invoice-pdf`: HTML template rendering for invoices as printable monochrome SOA documents, embedded document preview on invoice detail page, and client-side PDF download via html2canvas + jsPDF.

### Modified Capabilities
- `invoice-output-shape`: Extend the output shape to include `payment_protocol` data (label, bank, account name, account number) and `billing_address` from the client, so the HTML template has all data it needs.

## Impact

- **Database**: New `PaymentProtocol` table via Prisma migration.
- **Dependencies**: Add `html2canvas` and `jspdf` npm packages for client-side PDF generation.
- **Routes**: New `/dashboard/payment-protocols` page; new `/dashboard/invoices/[id]/pdf` route for preview.
- **Existing code**: `invoice-output.ts` extended with payment protocol fields. Invoice detail page gets a "Download PDF" button linking to the preview route.
