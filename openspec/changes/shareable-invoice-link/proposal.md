## Why

Clients need to view their Statement of Account without logging in. Currently, invoices are only accessible behind the authenticated dashboard. A public shareable link lets the freelancer send a URL to clients who can view the SOA preview and download the PDF — no account required.

Additionally, the invoice detail page and project detail page have layout issues: the line-items summary and invoices table sit in a right column beside the form, but they should sit below the form for better readability.

## What Changes

- **Share token on Invoice**: Add `shareToken` (unique, nullable) and `isPublic` boolean to the Invoice model. A "Share" button on the invoice detail page generates/toggles the token.
- **Public SOA route**: New unauthenticated route at `/invoices/[shareToken]` that renders the invoice HTML preview with a details sidebar (due date, status, amount, download PDF button). No sidebar navigation — just the app header.
- **Layout fixes**: Move line-items summary below the form on the invoice detail page. Move the invoices table below the form on the project detail page.

## Capabilities

### New Capabilities
- `shareable-invoice`: Public unauthenticated route for viewing and downloading a shared SOA, including share token generation, public layout, and share management UI.

### Modified Capabilities
- `invoice-output-shape`: Add `share_url` field to the output shape so the template/public page can reference it.

## Impact

- **Database**: New migration adding `shareToken` and `isPublic` columns to `Invoice` table.
- **Routes**: New public route `/invoices/[shareToken]` outside the dashboard layout.
- **UI**: Share button + copy-link UI on invoice detail page. Layout adjustments on invoice and project detail pages.
- **Security**: Public route must only expose invoice data when `isPublic` is true and `shareToken` matches. No auth bypass for other data.
