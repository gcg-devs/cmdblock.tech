# auth Specification

## Purpose
Cookie-based session authentication with login/logout, middleware route protection, and pre-seeded user credentials for the cmdblock.tech internal dashboard.

## Requirements
### Requirement: User login with credentials
The system SHALL authenticate users via username and password. Only pre-seeded users SHALL be able to log in.

#### Scenario: Successful login
- **WHEN** a user submits valid credentials (username + password)
- **THEN** the system creates an encrypted session cookie
- **THEN** the user is redirected to `/dashboard`

#### Scenario: Failed login with wrong password
- **WHEN** a user submits a valid username but incorrect password
- **THEN** the system displays "Invalid credentials" error
- **THEN** no session cookie is created

#### Scenario: Failed login with unknown user
- **WHEN** a user submits a username that does not exist
- **THEN** the system displays "Invalid credentials" error (same message as wrong password)

### Requirement: User logout
The system SHALL allow authenticated users to end their session.

#### Scenario: Logout clears session
- **WHEN** an authenticated user triggers logout
- **THEN** the session cookie is deleted
- **THEN** the user is redirected to `/login`

### Requirement: Session cookie authentication
The system SHALL use encrypted HTTP-only cookies to maintain user sessions.

#### Scenario: Valid session cookie
- **WHEN** a request includes a valid, non-expired session cookie
- **THEN** the user is considered authenticated

#### Scenario: Expired session cookie
- **WHEN** a request includes an expired session cookie
- **THEN** the user is considered unauthenticated
- **THEN** the cookie is cleared

### Requirement: Route protection via middleware
The system SHALL protect dashboard routes and manage auth redirects via Next.js middleware.

#### Scenario: Unauthenticated access to dashboard
- **WHEN** an unauthenticated user navigates to `/dashboard` or any `/dashboard/*` route
- **THEN** the user is redirected to `/login`

#### Scenario: Authenticated access to login page
- **WHEN** an authenticated user navigates to `/login`
- **THEN** the user is redirected to `/dashboard`

### Requirement: Pre-seeded users
The system SHALL include a seed script that creates three users: Chan, Ghegi, and Gudo.

#### Scenario: Seed script creates users
- **WHEN** the seed script runs
- **THEN** three users are upserted: `chan`, `ghegi`, `gudo`
- **THEN** each user has a bcrypt-hashed password

### Requirement: Login page design
The login page SHALL match the existing monochrome design system: dark background, Syne headings, Geist Mono body, zero border-radius, thin borders.

#### Scenario: Login page renders
- **WHEN** a user navigates to `/login`
- **THEN** a centered login form displays with username and password fields
- **THEN** the page uses the `>_` prompt accent consistent with the homepage
- **THEN** typography, colors, and spacing match the existing design system
