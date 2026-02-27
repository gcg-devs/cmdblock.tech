## ADDED Requirements

### Requirement: Client data model
The system SHALL store clients with name, point-of-contact name, point-of-contact email, and billing address.

#### Scenario: Create a client
- **WHEN** a user submits the create client form with name, POC name, POC email, and billing address
- **THEN** a new Client record is created in the database
- **THEN** the user is redirected to the client list

#### Scenario: Client fields validation
- **WHEN** a user submits the form without a client name
- **THEN** the system displays a validation error

### Requirement: Client list view
The system SHALL display all clients in a table with name, POC name, POC email, and creation date.

#### Scenario: Client list renders
- **WHEN** a user navigates to `/dashboard/clients`
- **THEN** a table of all clients is displayed sorted by most recently created
- **THEN** each row links to the client detail page

### Requirement: Client detail and edit
The system SHALL allow viewing and editing client information.

#### Scenario: View client details
- **WHEN** a user navigates to `/dashboard/clients/[id]`
- **THEN** the client's full information is displayed
- **THEN** associated projects are listed

#### Scenario: Edit client
- **WHEN** a user edits client fields and saves
- **THEN** the client record is updated
