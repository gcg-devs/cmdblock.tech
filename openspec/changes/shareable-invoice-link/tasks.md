## 1. Database & Schema

- [x] 1.1 Add `shareToken` (String?, @unique) and `isPublic` (Boolean, @default(false)) fields to the Invoice model in Prisma schema
- [x] 1.2 Run Prisma migration for the new fields

## 2. Share Token Actions

- [x] 2.1 Create server actions for share management: `toggleInvoiceShare` (generates token if none, toggles `isPublic`) and `getShareUrl` helper

## 3. Invoice Output Shape

- [x] 3.1 Add `share_url` field (string | null) to `InvoiceOutputShape` type and populate it in `buildInvoiceOutput` based on `isPublic` and `shareToken`

## 4. Share UI on Invoice Detail

- [x] 4.1 Add share button/toggle to the invoice detail page that calls `toggleInvoiceShare` and shows a copyable URL when public

## 5. Public Route & Layout

- [x] 5.1 Create minimal public layout at `src/app/share/layout.tsx` — header only, no sidebar, robots noindex
- [x] 5.2 Create public invoice page at `src/app/share/invoice/[shareToken]/page.tsx` — fetch invoice by token (404 if invalid or not public), render HTML preview + details sidebar with metadata and download PDF button

## 6. Layout Fixes

- [x] 6.1 Refactor invoice detail page to stack line items summary below the form (remove 2-column grid)
- [x] 6.2 Refactor project detail page to stack invoices table below the form (remove 2-column grid)

## 7. Build Verification

- [x] 7.1 Run `bun run build` and verify no errors
