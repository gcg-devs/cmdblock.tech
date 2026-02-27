## Purpose

Defines the PDF export capability for invoices, including the monochrome HTML template, document preview page, and client-side PDF download.

## ADDED Requirements

### Requirement: Invoice HTML template
The system SHALL render invoices as monochrome, printable HTML documents styled with the cmdblock.tech brand (>_ prompt motif, Syne and Geist Mono fonts) on a white background. The template SHALL include: header with brand and SOA metadata, billed-to section with client details, line items table, totals section, payment protocol details, and terms footer.

#### Scenario: Render invoice with project
- **WHEN** the HTML template is rendered for an invoice linked to a project with scope enabled
- **THEN** the document shows the project title and scope description in the billed-to section
- **THEN** each line item displays its name as a bold header and description below
- **THEN** the totals section shows subtotal and amount due with currency symbol

#### Scenario: Render invoice without project
- **WHEN** the HTML template is rendered for an ad-hoc invoice (no project)
- **THEN** the billed-to section shows "Ad-hoc Invoice" without project reference
- **THEN** line items and totals render normally

#### Scenario: Render with payment protocol
- **WHEN** the HTML template is rendered and a payment protocol is available
- **THEN** the footer shows the payment protocol label, bank name, account name, and account number

#### Scenario: Render without payment protocol
- **WHEN** the HTML template is rendered and no payment protocol exists
- **THEN** the payment protocol section is omitted from the footer

### Requirement: Invoice PDF preview page
The system SHALL provide a preview page at `/dashboard/invoices/[id]/pdf` that displays the rendered HTML template in a document-viewer style container within the dashboard content area.

#### Scenario: Navigate to PDF preview
- **WHEN** user clicks "Download PDF" on the invoice detail page
- **THEN** the browser navigates to `/dashboard/invoices/[id]/pdf`
- **THEN** the rendered HTML template is displayed in a centered, paper-like container

#### Scenario: Download PDF from preview
- **WHEN** user clicks the "Download" button on the preview page
- **THEN** the HTML template is converted to PDF using html2canvas + jsPDF
- **THEN** the PDF is downloaded with filename `SOA-{invoiceNumber}.pdf`

#### Scenario: Back navigation from preview
- **WHEN** user clicks "Back" on the preview page
- **THEN** the browser navigates back to the invoice detail page

### Requirement: Payment protocol selector on PDF preview
The system SHALL allow selecting a payment protocol on the PDF preview page, defaulting to the first (or default) protocol.

#### Scenario: Default payment protocol selection
- **WHEN** user navigates to the PDF preview page
- **THEN** the default payment protocol (or first if none is default) is pre-selected

#### Scenario: Change payment protocol
- **WHEN** user selects a different payment protocol from the dropdown
- **THEN** the rendered HTML template updates to show the newly selected protocol's details
