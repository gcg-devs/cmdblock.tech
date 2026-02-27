## Why

The public portfolio homepage currently has minimal SEO metadata, limiting discoverability and weak social sharing previews. Public invoice share links also need explicit, branded embed metadata while all non-portfolio surfaces should remain excluded from indexing.

## What Changes

- Expand root (`/`) metadata with strong SEO defaults (title template, description, canonical, Open Graph, Twitter card, robots, and favicon references).
- Keep non-portfolio routes out of indexing (`/login`, dashboard, and other non-root app areas).
- Add custom, per-invoice embed metadata for shared invoice pages so link previews are descriptive and branded.
- Add crawl directives for the site to prioritize the portfolio root and prevent indexing of private/internal routes.

## Capabilities

### New Capabilities
- `seo-metadata`: Centralized, production-grade metadata behavior for root portfolio SEO and social previews.

### Modified Capabilities
- `shareable-invoice`: Provide custom shared-invoice embed title and description metadata while preserving noindex behavior.

## Impact

- Affected code: `src/app/layout.tsx`, route layouts/pages for private and share flows, and static SEO files under `src/app/`.
- External behavior: Improved search/social presentation for `/`; restricted indexing for non-root routes.
- No database or API contract changes.
