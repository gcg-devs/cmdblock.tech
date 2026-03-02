## MODIFIED Requirements

### Requirement: PaymentProtocol model
The system SHALL store payment protocols with fields: `label` (string), `bankName` (string), `accountName` (string), `accountNumber` (string), `isDefault` (boolean, default false), and `qrData` (optional string). Only one protocol MAY be marked as default at a time. The `qrData` field SHALL store the raw EMVCo QR payload string decoded from an uploaded QR image or entered manually.

#### Scenario: Create payment protocol
- **WHEN** user submits the payment protocol form with label "UnionBank", bank name "UnionBank of the Philippines", account name "Ghegi Jimenez", account number "1094 5678 9012"
- **THEN** the protocol is saved to the database with the provided fields and `isDefault = false`

#### Scenario: Create first payment protocol
- **WHEN** user creates the first payment protocol and no others exist
- **THEN** the protocol is saved with `isDefault = true` automatically

#### Scenario: Set default protocol
- **WHEN** user marks a protocol as default
- **THEN** the selected protocol's `isDefault` is set to true and all other protocols' `isDefault` is set to false

#### Scenario: Create payment protocol with QR data
- **WHEN** user submits the payment protocol form with QR data (decoded from image or manually entered)
- **THEN** the protocol is saved with the `qrData` field containing the EMVCo payload string

#### Scenario: Create payment protocol without QR data
- **WHEN** user submits the payment protocol form without providing QR data
- **THEN** the protocol is saved with `qrData` as null

### Requirement: Payment protocol management page
The system SHALL provide a dashboard page at `/dashboard/payment-protocols` for managing payment protocols.

#### Scenario: View payment protocols list
- **WHEN** user navigates to `/dashboard/payment-protocols`
- **THEN** a list of all payment protocols is displayed showing label, bank name, account name, default status, and a branded QR code beside the protocol details if `qrData` exists

#### Scenario: Create new payment protocol
- **WHEN** user fills in the payment protocol form and submits
- **THEN** the protocol is created and the list refreshes

#### Scenario: Edit payment protocol
- **WHEN** user clicks edit on an existing protocol
- **THEN** the form is populated with the protocol's current values for editing, including QR data if present

#### Scenario: Delete payment protocol
- **WHEN** user deletes a payment protocol
- **THEN** the protocol is removed from the database
- **THEN** if the deleted protocol was default and others remain, the earliest-created remaining protocol becomes default
