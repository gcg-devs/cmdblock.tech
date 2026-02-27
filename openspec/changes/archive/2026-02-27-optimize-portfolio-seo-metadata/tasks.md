## 1. Global metadata foundation

- [x] 1.1 Upgrade `src/app/layout.tsx` metadata with canonical, Open Graph, Twitter, robots, and favicon entries for the portfolio root.
- [x] 1.2 Add explicit noindex metadata on non-portfolio internal surfaces (`/login` and dashboard layout).

## 2. Shared invoice embed metadata

- [x] 2.1 Add route-level `generateMetadata` for `/share/invoice/[shareToken]` that builds safe, custom title/description from invoice context.
- [x] 2.2 Preserve noindex behavior for shared invoice pages while enabling rich social preview tags.

## 3. Crawl directives and validation

- [x] 3.1 Add `src/app/robots.ts` with crawl rules that prioritize root portfolio and disallow private/internal paths.
- [x] 3.2 Add `src/app/sitemap.ts` with at least the root URL and validate metadata behavior with targeted checks.
