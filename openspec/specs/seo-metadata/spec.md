# seo-metadata Specification

## Purpose
TBD - created by archiving change optimize-portfolio-seo-metadata. Update Purpose after archive.
## Requirements
### Requirement: Portfolio root metadata quality
The system SHALL provide production-grade metadata for the portfolio root (`/`), including canonical URL, descriptive title/description, Open Graph metadata, and Twitter card metadata suitable for social sharing previews.

#### Scenario: Root metadata is complete
- **WHEN** a crawler or social scraper requests the portfolio root
- **THEN** the response includes canonical metadata for `/`
- **THEN** Open Graph metadata contains title, description, URL, and site name
- **THEN** Twitter card metadata contains summary card fields aligned with root branding

### Requirement: Non-portfolio indexing controls
The system SHALL prevent indexing of non-portfolio routes by applying noindex metadata on internal/private surfaces while keeping the portfolio root indexable.

#### Scenario: Internal route is noindexed
- **WHEN** a crawler requests `/login` or `/dashboard` routes
- **THEN** the response metadata includes `robots` directives with `noindex, nofollow`

#### Scenario: Portfolio root remains indexable
- **WHEN** a crawler requests the portfolio root
- **THEN** metadata does not include `noindex`
- **THEN** robots directives allow indexing of the root page

### Requirement: Branded favicon support
The system SHALL use the provided brand icon as the site favicon for metadata consumers and browsers.

#### Scenario: Favicon is served
- **WHEN** the browser or crawler requests the favicon
- **THEN** the provided brand icon is served as the primary favicon asset

