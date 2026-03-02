## ADDED Requirements

### Requirement: QR image decode pipeline
The system SHALL decode QR codes from uploaded images entirely client-side using the jsQR library and HTML Canvas API. The decode pipeline SHALL accept PNG, JPG, and SVG image files.

#### Scenario: Successful QR decode from image
- **WHEN** admin uploads a clear InstaPay QR code image on the payment protocol form
- **THEN** the system draws the image to a canvas, extracts pixel data, and decodes the QR payload using jsQR
- **THEN** the decoded EMVCo data string is displayed to the admin for confirmation

#### Scenario: Failed QR decode from blurry image
- **WHEN** admin uploads a QR code image that jsQR cannot decode (blurry, low-res, damaged)
- **THEN** the system displays an error message indicating decode failure
- **THEN** the manual entry fallback input is shown

### Requirement: Admin confirmation of decoded data
The system SHALL display the decoded QR data string to the admin before saving, allowing them to verify correctness.

#### Scenario: Admin confirms decoded data
- **WHEN** QR decode succeeds and the extracted data is displayed
- **THEN** admin can confirm the data to proceed with saving
- **THEN** the confirmed data string is set as the `qrData` form value

#### Scenario: Admin rejects decoded data and re-uploads
- **WHEN** admin sees incorrect decoded data
- **THEN** admin can upload a different QR image or switch to manual entry

### Requirement: Manual QR data entry fallback
The system SHALL provide a text input field where admin can manually paste or type the QR data string when image decode fails or is unavailable.

#### Scenario: Manual entry after decode failure
- **WHEN** QR image decode fails
- **THEN** a text input is available for manual QR data entry
- **THEN** the manually entered string is set as the `qrData` form value

#### Scenario: Manual entry by choice
- **WHEN** admin chooses to enter QR data manually instead of uploading
- **THEN** the text input accepts the QR data string directly
