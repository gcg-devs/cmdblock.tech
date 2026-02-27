## Purpose

Clickable table rows for navigation, entity deletion with cascade confirmation dialogs, and removal of the redundant invoice side-panel.

## Requirements

### Requirement: Clickable table rows
All entity list tables (clients, projects, invoices) SHALL make the entire row clickable. Clicking any cell in a row SHALL navigate to that entity's detail page.

#### Scenario: Click client row
- **WHEN** user clicks anywhere on a client row in the clients table
- **THEN** browser navigates to `/dashboard/clients/{id}`

#### Scenario: Click project row
- **WHEN** user clicks anywhere on a project row in the projects table
- **THEN** browser navigates to `/dashboard/projects/{id}`

#### Scenario: Click invoice row
- **WHEN** user clicks anywhere on an invoice row in the invoices table
- **THEN** browser navigates to `/dashboard/invoices/{id}`

### Requirement: Delete client with confirmation
The system SHALL allow deleting a client from its detail page. Deletion MUST cascade to all associated projects and invoices. A confirmation dialog SHALL show the count of related entities that will be deleted.

#### Scenario: Delete client with projects
- **WHEN** user clicks "Delete" on a client detail page and confirms the dialog
- **THEN** the client, all its projects, and all associated invoices and line items are permanently deleted
- **THEN** user is redirected to `/dashboard/clients` with a success toast

#### Scenario: Cancel delete
- **WHEN** user clicks "Delete" then cancels the confirmation dialog
- **THEN** no deletion occurs

### Requirement: Delete project with confirmation
The system SHALL allow deleting a project from its detail page. Deletion MUST cascade to all associated invoices and line items.

#### Scenario: Delete project
- **WHEN** user clicks "Delete" on a project detail page and confirms the dialog
- **THEN** the project and all its invoices and line items are permanently deleted
- **THEN** user is redirected to `/dashboard/projects` with a success toast

### Requirement: Delete invoice with confirmation
The system SHALL allow deleting an invoice from its detail page. Deletion MUST cascade to all associated line items.

#### Scenario: Delete invoice
- **WHEN** user clicks "Delete" on an invoice detail page and confirms the dialog
- **THEN** the invoice and all its line items are permanently deleted
- **THEN** user is redirected to `/dashboard/invoices` with a success toast

### Requirement: Remove invoice side-panel
The invoice list table SHALL NOT open a Sheet side-panel on row click. The `invoice-detail-panel.tsx` component SHALL be removed.

#### Scenario: Invoice row navigation
- **WHEN** user clicks an invoice row
- **THEN** browser navigates to the invoice detail page (not a side panel)
