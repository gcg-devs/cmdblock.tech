## Context

Payment protocols store text-only bank details. InstaPay (QR Ph, EMVCo standard) is the dominant P2P payment method in the Philippines. Users want scan-to-pay QR codes on invoices. The current system has no image upload, no QR libraries, and no external file storage. The `>_` branding is text-rendered (pixel font), not a static asset.

## Goals / Non-Goals

**Goals:**
- Decode uploaded InstaPay QR images client-side and store only the data string
- Regenerate branded QR codes on-the-fly with `>_` logo overlay
- Display branded QR in dashboard protocol list, invoice HTML, and invoice PDF
- Keep zero-infra approach (no file storage, no new server endpoints)

**Non-Goals:**
- Dynamic QR codes (amount-embedded) — only static QR (account-only) for now
- Server-side QR processing
- QR code scanning from camera
- Multiple QR codes per protocol

## Decisions

### D1: Client-side decode with jsQR
**Choice:** Use `jsQR` library to decode QR images in the browser via Canvas API.
**Rationale:** No server round-trip needed, instant feedback, matches existing client-heavy architecture. `jsQR` is the most popular pure-JS QR decoder (~3M weekly npm downloads), handles EMVCo payloads without issue since it decodes raw data bytes.
**Alternative considered:** Server-side decode with `sharp` + `jsQR` — rejected because it adds API route complexity for minimal reliability gain.

### D2: Store data string only, regenerate QR on-the-fly
**Choice:** Persist `qrData: String?` in the database. Generate branded QR at render time.
**Rationale:** Avoids file storage entirely. QR generation is ~5ms with `qrcode` library. Data string is typically <500 characters for EMVCo payloads. Regeneration means branding can be updated globally without re-processing stored images.
**Alternative considered:** Store generated QR as base64 blob — rejected because it's 10-50x larger than the data string and couples branding to storage.

### D3: Canvas-rendered `>_` logo (no static asset)
**Choice:** Draw the `>_` text onto a small canvas using monospace font at render time, then composite onto QR center.
**Rationale:** Matches existing branding approach (text-based, not image-based). No asset management needed. Font rendering is consistent with the app's pixel aesthetic. The logo canvas is ~40x40px, drawn once and cached per component lifecycle.
**Alternative considered:** Create a static PNG logo file — rejected to stay consistent with the text-based branding pattern and avoid asset management.

### D4: Error correction level H for QR generation
**Choice:** Generate all QR codes with error correction level H (30% redundancy).
**Rationale:** Level H allows up to 30% of the QR to be obscured while remaining scannable. The centered logo occupies ~20-25% of the area, well within the margin. This is the standard approach for branded QR codes.

### D5: QR upload component in payment protocol form
**Choice:** Add a dedicated QR section to the existing `payment-protocol-form.tsx` with: file input → canvas decode → data preview → confirm/manual-entry fallback.
**Rationale:** Keeps the form as the single point of protocol editing. The QR section is optional — protocols work without QR data.

### D6: Shared utility for branded QR generation
**Choice:** Create a `generate-branded-qr.ts` utility that works in both browser (canvas) and produces base64 output for PDF.
**Rationale:** Invoice HTML needs a canvas/img element, invoice PDF needs base64 PNG for `@react-pdf/renderer <Image>`. A shared utility avoids duplicating the QR+logo logic. For the PDF path, the API route can use `qrcode.toDataURL()` + canvas overlay to produce the base64 string.

### D7: QR placement in invoices
**Choice:** Display branded QR beside (right-aligned) the payment protocol text details in both HTML and PDF templates.
**Rationale:** User specified "just besides the protocol area." This keeps the footer compact and visually associates the QR with the payment method it represents.

## Risks / Trade-offs

- **[Blurry image decode failure]** → Mitigated by manual data entry fallback and clear error messaging
- **[Logo breaks QR scanning on small prints]** → Mitigated by error correction level H and 25% max logo area. Test with physical phone scanning.
- **[Canvas API unavailable in ReactPDF]** → ReactPDF runs server-side via `renderToBuffer`. QR generation for PDF must use `qrcode.toDataURL()` which works in Node. Logo overlay for PDF uses a separate approach: generate QR as data URL, and for the logo, render `>_` as a small overlay in the PDF layout itself using ReactPDF `<Text>` positioned over the `<Image>`.
- **[EMVCo payload variations]** → Philippine QR Ph follows a consistent EMVCo spec. The system stores raw data without parsing, so format variations don't matter.
