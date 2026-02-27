## 1. Database & Dependencies

- [x] 1.1 Add `bcryptjs` dependency and its types
- [x] 1.2 Add `User` model to Prisma schema and run migration
- [x] 1.3 Create seed script (`prisma/seed.ts`) to upsert chan, ghegi, gudo with hashed passwords

## 2. Auth Feature Core

- [x] 2.1 Create `src/features/auth/lib.ts` — session cookie helpers (encrypt, decrypt, validate using jose)
- [x] 2.2 Create `src/features/auth/actions.ts` — login and logout server actions
- [x] 2.3 Create `src/middleware.ts` — protect `/dashboard*`, redirect logic for `/login`

## 3. Login Page

- [x] 3.1 Add shadcn `input` and `label` components
- [x] 3.2 Create `src/features/auth/components/login-form.tsx` — client form component
- [x] 3.3 Create `src/app/login/page.tsx` — login route page matching monochrome design

## 4. Dashboard Page

- [x] 4.1 Create `src/features/dashboard/components/dashboard-header.tsx` — header with user name and logout
- [x] 4.2 Create `src/app/dashboard/page.tsx` — protected dashboard landing page
