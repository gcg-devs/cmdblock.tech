## 1. Database & Dependencies

- [x] 1.1 Add `qrData String?` field to `PaymentProtocol` model in `prisma/schema.prisma` and run `bunx prisma migrate dev --name add-qr-data`
- [x] 1.2 Install QR libraries: `bun add jsqr qrcode @types/qrcode`

## 2. QR Utilities

- [x] 2.1 Create `src/features/payment-protocols/lib/decode-qr-from-image.ts` — utility that takes a File, draws to canvas, extracts ImageData, runs jsQR, returns decoded string or null
- [x] 2.2 Create `src/features/payment-protocols/lib/generate-branded-qr.ts` — utility that takes a data string, generates QR canvas (level H) via qrcode, draws `>_` logo in center, returns base64 PNG data URL

## 3. Payment Protocol Form & Actions

- [x] 3.1 Update `src/features/payment-protocols/actions.ts` — add `qrData` handling to create and update server actions
- [x] 3.2 Update `src/features/payment-protocols/components/payment-protocol-form.tsx` — add QR section with image upload, decode preview, confirm, manual entry fallback, and pass `qrData` to form submission

## 4. Payment Protocol Display

- [x] 4.1 Update `src/features/payment-protocols/components/payment-protocol-list.tsx` — show branded QR beside each protocol's details when `qrData` exists

## 5. Invoice Integration

- [x] 5.1 Update `src/features/invoices/lib/invoice-output.ts` — add `qr_data` to payment_protocol in output shape interface and builder function
- [x] 5.2 Update `src/features/invoices/components/invoice-html-template.tsx` — render branded QR beside payment protocol details in footer when `qr_data` exists
- [x] 5.3 Update `src/features/invoices/components/invoice-pdf-document.tsx` — render QR code image beside payment protocol details in PDF footer when `qr_data` exists
