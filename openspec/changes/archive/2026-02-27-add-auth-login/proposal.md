## Why

The cmdblock.tech portfolio site needs a gated dashboard accessible only to authenticated team members. Currently the site is fully public with no authentication. A login page with pre-seeded users (Chan, Ghegi, Gudo) provides team access to an internal dashboard.

## What Changes

- Add a `/login` route with a login page matching the existing monochrome design system (Syne + Geist Mono, zero radius, dark theme)
- Add a Prisma `User` model with pre-seeded credentials for three team members
- Implement cookie-based session authentication (login/logout server actions)
- Add Next.js middleware to protect `/dashboard` routes behind auth
- Add a `/dashboard` route that authenticated users land on after login
- Add a seed script to pre-populate the three users

## Capabilities

### New Capabilities
- `auth`: Cookie-based session authentication with login/logout, middleware route protection, and pre-seeded user credentials
- `dashboard`: Protected dashboard page accessible after login, serving as the authenticated landing page

### Modified Capabilities

## Impact

- **Database**: New `User` and `Session` tables in Prisma schema; migration required
- **Dependencies**: `bcrypt` (or similar) for password hashing
- **Routes**: New `/login` and `/dashboard` routes
- **Middleware**: New `middleware.ts` at app root for route protection
- **Seed script**: New Prisma seed file to create the three users
