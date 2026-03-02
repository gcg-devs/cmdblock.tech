## MODIFIED Requirements

### Requirement: Invoice output shape
The system SHALL provide a utility function that produces a structured JSON representation of an invoice including project scope, line items, client billing address, payment protocol details with optional QR data, and share URL.

#### Scenario: Generate output for project-linked invoice
- **WHEN** the output function is called for an invoice linked to a project with showScopeOnInvoice=true
- **THEN** the output includes `project_scope.enabled = true`, `project_scope.title`, `project_scope.description`, `project_scope.total_contract_value`, and `line_items` array with `name`, `description`, `amount` per item

#### Scenario: Generate output for ad-hoc invoice
- **WHEN** the output function is called for an invoice with no project
- **THEN** the output includes `project_scope.enabled = false` and the `line_items` array

#### Scenario: Generate output with scope disabled
- **WHEN** the output function is called for an invoice whose project has showScopeOnInvoice=false
- **THEN** the output includes `project_scope.enabled = false`

#### Scenario: Generate output with client billing address
- **WHEN** the output function is called for an invoice linked to a project
- **THEN** the output includes `client_billing_address` from the client record

#### Scenario: Generate output with payment protocol including QR data
- **WHEN** the output function is called with a payment protocol that has `qrData`
- **THEN** the output includes `payment_protocol` object with `label`, `bank_name`, `account_name`, `account_number`, and `qr_data`

#### Scenario: Generate output with payment protocol without QR data
- **WHEN** the output function is called with a payment protocol that has no `qrData`
- **THEN** the output includes `payment_protocol` object with `label`, `bank_name`, `account_name`, `account_number`, and `qr_data` as null

#### Scenario: Generate output without payment protocol
- **WHEN** the output function is called without a payment protocol
- **THEN** the output includes `payment_protocol` as null

#### Scenario: Generate output with share URL
- **WHEN** the output function is called for an invoice with `isPublic = true` and a `shareToken`
- **THEN** the output includes `share_url` containing the full public URL path

#### Scenario: Generate output without share URL
- **WHEN** the output function is called for an invoice without a share token or with `isPublic = false`
- **THEN** the output includes `share_url` as null
