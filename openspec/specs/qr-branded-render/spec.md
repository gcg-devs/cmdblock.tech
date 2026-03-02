# qr-branded-render Specification

## Purpose
TBD - created by archiving change add-qr-code-protocols. Update Purpose after archive.
## Requirements
### Requirement: Branded QR code generation
The system SHALL generate QR codes on-the-fly from a stored data string using the qrcode library with error correction level H (30% redundancy) to support a centered logo overlay.

#### Scenario: Generate branded QR for display
- **WHEN** a payment protocol has a `qrData` value
- **THEN** the system generates a QR code from the data string using qrcode library
- **THEN** the QR code is rendered with error correction level H

### Requirement: Logo overlay on QR code
The system SHALL overlay the cmdblock `>_` prompt logo in the center of generated QR codes using the HTML Canvas API. The logo SHALL occupy no more than 25% of the QR code area to maintain scannability.

#### Scenario: Render logo on QR code
- **WHEN** a branded QR code is generated
- **THEN** the `>_` text is drawn in pixel/monospace font on a small square canvas
- **THEN** this logo canvas is composited onto the center of the QR code canvas
- **THEN** the logo area does not exceed 25% of total QR area

### Requirement: Branded QR as reusable component
The system SHALL provide a reusable React component that accepts a QR data string and renders the branded QR code. The component SHALL also support outputting a base64 PNG data URL for use in PDFs.

#### Scenario: Render branded QR in React component
- **WHEN** the BrandedQR component receives a valid `qrData` prop
- **THEN** it renders a canvas element showing the branded QR code

#### Scenario: Generate base64 PNG for PDF
- **WHEN** branded QR output is needed for ReactPDF or other image contexts
- **THEN** a utility function returns the branded QR as a base64 PNG data URL

