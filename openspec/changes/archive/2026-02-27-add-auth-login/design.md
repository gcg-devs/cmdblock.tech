## Context

The cmdblock.tech portfolio is a public Next.js App Router site with no authentication. The three team members (Chan, Ghegi, Gudo) need gated access to an internal dashboard. The site uses a monochrome dark-first design system with Syne/Geist Mono fonts, zero border-radius, and shadcn/ui components.

## Goals / Non-Goals

**Goals:**
- Simple cookie-based session auth for 3 pre-seeded users
- Login page that matches the existing design system aesthetic
- Middleware-protected `/dashboard` route
- Seed script to populate initial users

**Non-Goals:**
- User registration / self-signup
- OAuth / social login
- Role-based access control
- Password reset flow
- Email verification

## Decisions

### 1. Session Strategy: Encrypted HTTP-only cookies (no session table)

Use a signed/encrypted cookie containing user ID and expiry. No server-side session table needed for 3 users.

**Rationale**: Simplest approach for a tiny user base. No session cleanup, no extra DB queries on every request. A `Session` table adds complexity with no benefit for 3 users.

**Alternative considered**: DB-backed sessions — overkill for this scale.

### 2. Password Hashing: bcryptjs (pure JS)

Use `bcryptjs` instead of native `bcrypt` to avoid native compilation issues with Bun/Docker.

**Alternative considered**: `argon2` — better security properties but requires native bindings.

### 3. Auth Feature Structure

```
src/features/auth/
├── actions.ts        # login/logout server actions
├── components/
│   └── login-form.tsx
├── lib.ts            # session cookie helpers (encrypt, decrypt, validate)
└── types.ts          # auth types
```

### 4. Middleware: Single `middleware.ts` at src root

Protect `/dashboard*` routes. Redirect unauthenticated users to `/login`. Redirect authenticated users from `/login` to `/dashboard`.

### 5. Seed approach: Prisma seed script

`prisma/seed.ts` run via `bunx prisma db seed`. Upserts 3 users with bcrypt-hashed passwords.

## Risks / Trade-offs

- **[Cookie-only sessions]** → No server-side revocation. Acceptable for 3 trusted users. Mitigated by short expiry (7 days).
- **[Pre-seeded passwords in seed script]** → Passwords in code. Acceptable for internal tool. Could move to env vars later.
- **[No rate limiting on login]** → Low risk for internal use. Can add later if exposed publicly.
