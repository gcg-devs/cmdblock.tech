## Purpose

Defines the enriched data model for Project scope fields, LineItem names, and the structured invoice output shape utility used for SOA rendering.
## Requirements
### Requirement: Project scope fields
The Project model SHALL have a `scopeDescription` text field and a `showScopeOnInvoice` boolean field. The project form SHALL include inputs for both fields.

#### Scenario: Create project with scope
- **WHEN** user fills in the project form with a scope description and the show-scope toggle enabled
- **THEN** the project is saved with `scopeDescription` and `showScopeOnInvoice = true`

#### Scenario: Edit project scope visibility
- **WHEN** user toggles "Show Scope on Invoice" off on a project
- **THEN** `showScopeOnInvoice` is set to false and invoices for this project omit the scope block in output

### Requirement: Line item name field
Each LineItem SHALL have a `name` field (short label) in addition to the existing `description` (detailed text) and `amount`.

#### Scenario: Create invoice with named line items
- **WHEN** user adds a line item with name "Mobilization Fee (30%)", description "Initial payment to provision...", and amount 75000
- **THEN** the line item is saved with all three fields

#### Scenario: Display line item on detail page
- **WHEN** user views an invoice detail page
- **THEN** each line item shows the name as a bold header and the description below it

### Requirement: Invoice output shape
The system SHALL provide a utility function that produces a structured JSON representation of an invoice including project scope, line items, client billing address, payment protocol details, and share URL.

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

#### Scenario: Generate output with payment protocol
- **WHEN** the output function is called with a payment protocol provided
- **THEN** the output includes `payment_protocol` object with `label`, `bank_name`, `account_name`, `account_number`

#### Scenario: Generate output without payment protocol
- **WHEN** the output function is called without a payment protocol
- **THEN** the output includes `payment_protocol` as null

#### Scenario: Generate output with share URL
- **WHEN** the output function is called for an invoice with `isPublic = true` and a `shareToken`
- **THEN** the output includes `share_url` containing the full public URL path

#### Scenario: Generate output without share URL
- **WHEN** the output function is called for an invoice without a share token or with `isPublic = false`
- **THEN** the output includes `share_url` as null

