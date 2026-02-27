## Context

The app uses Next.js App Router metadata exports, but currently only has minimal global metadata and limited route-level controls. The requested outcome is to maximize portfolio (`/`) SEO while preventing indexing of non-portfolio routes, and to provide richer social embeds for public shared invoices.

## Goals / Non-Goals

**Goals:**
- Define a consistent metadata baseline in the root layout for stronger search and social previews.
- Ensure non-portfolio surfaces remain excluded from indexing.
- Add route-level shared invoice metadata that creates custom embed titles/descriptions while preserving noindex behavior.
- Add crawl directives to reinforce index policy.

**Non-Goals:**
- Changing homepage visible content or section structure.
- Changing authentication or invoice data models.
- Introducing external SEO services or analytics dependencies.

## Decisions

1. Use Next.js Metadata API (`metadata` and `generateMetadata`) instead of manual `<head>` tags.
   - Rationale: native App Router support, type-safe, and route-composable.
   - Alternative considered: custom `Head` usage per page; rejected due to duplication and weaker consistency.

2. Keep noindex policy for non-portfolio routes through route-level metadata on private/internal layouts.
   - Rationale: explicit route boundaries avoid accidental indexing.
   - Alternative considered: robots.txt-only approach; rejected because meta-level noindex is still needed for defense-in-depth.

3. Generate invoice-specific share metadata from server-side invoice data on `/share/invoice/[shareToken]`.
   - Rationale: better social preview context per shared link.
   - Alternative considered: static generic share metadata; rejected due to poor preview quality.

4. Add `robots.ts` and `sitemap.ts` in `src/app/` for crawl guidance.
   - Rationale: centralized crawl behavior and clean indexing intent for portfolio-first visibility.
   - Alternative considered: manual static files in `public/`; rejected to keep behavior close to route metadata and typed generation.

## Risks / Trade-offs

- [Risk] Invoice metadata could leak too much billing detail in previews → Mitigation: use minimal, non-sensitive fields (invoice number/status/company context), no line-item or payment details.
- [Risk] Overly strict robots rules could reduce desired discoverability → Mitigation: keep `/` and public assets indexable while disallowing internal/private paths only.
- [Risk] Metadata conflicts across nested layouts → Mitigation: set clear route-level metadata ownership for root, dashboard/login, and share surfaces.
