## ADDED Requirements

### Requirement: Project data model
The system SHALL store projects with a client reference, title, status, total contract value, and currency.

#### Scenario: Create a project
- **WHEN** a user submits the create project form with client, title, contract value, and currency
- **THEN** a new Project record is created linked to the selected client
- **THEN** the user is redirected to the project list

#### Scenario: Project status lifecycle
- **WHEN** a project is created
- **THEN** its status defaults to ACTIVE
- **THEN** status can be changed to ACTIVE, ON_HOLD, or COMPLETED

### Requirement: Project financial summary
The system SHALL compute and display billed, collected, and remaining amounts for each project.

#### Scenario: Financial summary renders
- **WHEN** a user views a project detail page
- **THEN** the system displays total contract value, amount billed (sum of all invoice totals), amount collected (sum of PAID invoice totals), and balance remaining (contract value minus collected)

#### Scenario: No invoices yet
- **WHEN** a project has no invoices
- **THEN** billed and collected show ₱0, remaining shows the full contract value

### Requirement: Project list view
The system SHALL display all projects in a table with title, client name, status, contract value, and collected amount.

#### Scenario: Project list renders
- **WHEN** a user navigates to `/dashboard/projects`
- **THEN** a table of all projects is displayed
- **THEN** each row links to the project detail page

### Requirement: Project detail view
The system SHALL display project details with financial summary and associated invoices.

#### Scenario: View project with invoices
- **WHEN** a user navigates to `/dashboard/projects/[id]`
- **THEN** project info, financial summary, and a list of invoices are displayed
- **THEN** a "Create Invoice" button is available to generate a new invoice for this project
