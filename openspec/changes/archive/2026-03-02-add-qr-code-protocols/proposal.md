## Why

Payment protocols currently store only text-based bank details. Clients receiving invoices must manually look up payment info to transfer funds. Adding QR code support lets admins upload their InstaPay/QR Ph QR codes, which the system decodes (EMVCo standard) and regenerates with the cmdblock `>_` branding — displayed alongside protocol details in dashboards, invoice HTML, and invoice PDFs for instant scan-to-pay.

## What Changes

- Add optional `qrData` field to `PaymentProtocol` model to store decoded EMVCo QR payload strings
- Add client-side QR decode pipeline: image upload → canvas → jsQR decode → show extracted data for admin confirmation
- Add manual QR data entry fallback when image decode fails
- Add branded QR generator: regenerate QR from stored data with `>_` logo overlay (canvas-based, error correction level H)
- Update payment protocol form with QR upload/decode section
- Update server actions to persist `qrData`
- Render branded QR in payment protocol list on dashboard
- Render branded QR in invoice HTML template alongside payment details
- Render branded QR in invoice PDF (ReactPDF `<Image>`) alongside payment details
- Update invoice output shape to include `qr_data`

## Capabilities

### New Capabilities
- `qr-decode`: Client-side QR image decoding using jsQR with admin confirmation and manual entry fallback
- `qr-branded-render`: On-the-fly branded QR code generation from stored data string with `>_` logo overlay

### Modified Capabilities
- `payment-protocol`: Adding optional `qrData` field to model, QR upload/decode UI to form, branded QR display to list
- `invoice-pdf`: Adding branded QR code rendering alongside payment protocol details in PDF output
- `invoice-output-shape`: Adding `qr_data` field to the payment protocol section of the output shape

## Impact

- **Database**: Migration to add `qrData String?` to `PaymentProtocol` table
- **Dependencies**: New packages `jsqr` (decode) and `qrcode` (encode) + `@types/qrcode`
- **Components**: Payment protocol form, list, invoice HTML template, invoice PDF document
- **Types**: Invoice output shape interface
- **Assets**: `>_` logo rendered programmatically via canvas (pixel font) for QR overlay — no static asset needed
