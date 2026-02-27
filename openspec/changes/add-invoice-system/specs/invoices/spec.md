## ADDED Requirements

### Requirement: Invoice data model
The system SHALL store invoices with an auto-generated number, optional project reference, type, status, issue date, due date, and line items.

#### Scenario: Create an invoice linked to a project
- **WHEN** a user creates an invoice and selects a project
- **THEN** a new Invoice record is created linked to that project
- **THEN** the invoice number is auto-generated in YYYY-NNNN format

#### Scenario: Create an ad-hoc invoice
- **WHEN** a user creates an invoice without selecting a project
- **THEN** a new Invoice record is created with null projectId
- **THEN** the invoice is labeled as "Ad-hoc" in list views

### Requirement: Invoice number auto-generation
The system SHALL auto-generate invoice numbers in `YYYY-NNNN` format, incrementing sequentially within each year.

#### Scenario: First invoice of the year
- **WHEN** no invoices exist for the current year
- **THEN** the generated number is `2026-0001`

#### Scenario: Subsequent invoice
- **WHEN** the highest invoice number for the year is `2026-0042`
- **THEN** the next generated number is `2026-0043`

### Requirement: Invoice line items
The system SHALL support multiple line items per invoice, each with a description and amount.

#### Scenario: Add line items
- **WHEN** a user adds line items to an invoice form
- **THEN** each line item has a description field and an amount field
- **THEN** the total amount is auto-calculated from the sum of line items

#### Scenario: At least one line item required
- **WHEN** a user tries to create an invoice with no line items
- **THEN** a validation error is displayed

### Requirement: Invoice status workflow
The system SHALL track invoice status through DRAFT, SENT, PAID, and OVERDUE states.

#### Scenario: New invoice defaults to DRAFT
- **WHEN** an invoice is created
- **THEN** its status is DRAFT

#### Scenario: Mark invoice as SENT
- **WHEN** a user changes status from DRAFT to SENT
- **THEN** the invoice status updates to SENT

#### Scenario: Mark invoice as PAID
- **WHEN** a user changes status from SENT to PAID
- **THEN** the invoice status updates to PAID

### Requirement: Invoice form with date pickers
The system SHALL provide date picker inputs for issue date and due date on the invoice form.

#### Scenario: Date picker renders
- **WHEN** the invoice form loads
- **THEN** issue date and due date fields render as date pickers matching the monochrome design system

### Requirement: Invoice list view
The system SHALL display all invoices in a table with invoice number, project/client info, status, total amount, issue date, and due date.

#### Scenario: Invoice list renders
- **WHEN** a user navigates to `/dashboard/invoices`
- **THEN** a table of all invoices is displayed sorted by most recent
- **THEN** ad-hoc invoices show "Ad-hoc" instead of a project name

### Requirement: Invoice detail view
The system SHALL display a single invoice with all fields, line items, and status management.

#### Scenario: View invoice detail
- **WHEN** a user navigates to `/dashboard/invoices/[id]`
- **THEN** invoice number, dates, status, line items, and total amount are displayed
- **THEN** status can be changed via action buttons
