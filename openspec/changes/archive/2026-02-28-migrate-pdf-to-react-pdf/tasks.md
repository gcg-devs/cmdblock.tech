## 1. Dependencies

- [x] 1.1 Install `@react-pdf/renderer`, remove `puppeteer-core`

## 2. React-PDF Invoice Document

- [x] 2.1 Create `src/features/invoices/components/invoice-pdf-document.tsx` with font registration (Inter + Fira Code) and full invoice layout matching the HTML template (header, billed-to, scope, line items, totals, payment protocol, terms footer)

## 3. API Route + Infrastructure Cleanup

- [x] 3.1 Rewrite `src/app/api/invoices/[id]/pdf/route.ts` to use `renderToBuffer` from `@react-pdf/renderer` with the new `InvoicePdfDocument` component, removing Puppeteer/html2canvas imports
- [x] 3.2 Delete `src/lib/pdf.ts` (Puppeteer connection utility)
- [x] 3.3 Remove chromium service from `docker-compose.yml` and `CHROMIUM_URL` env var

## 4. Verify

- [x] 4.1 Run `bun run build` to ensure no type errors or broken imports
