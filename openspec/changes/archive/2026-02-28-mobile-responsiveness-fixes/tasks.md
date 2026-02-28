# Tasks: mobile-responsiveness-fixes

## 1. Shared Invoice Mobile Layout

- [x] 1.1 Change outer flex container to `flex-col md:flex-row` for responsive stacking
- [x] 1.2 Hide HTML preview div on mobile with `hidden md:block`
- [x] 1.3 Make sidebar full-width on mobile (remove `w-72 shrink-0`, add `w-full md:w-72 md:shrink-0`)
- [x] 1.4 Reorder so download button + details appear first on mobile (move sidebar above preview in DOM, use `order` classes)

## 2. Invoice Form Dropdown Fix

- [x] 2.1 Change Project + Type grid from `grid-cols-1 sm:grid-cols-2` to `grid-cols-1` (always stacked vertically)

## 3. Verify

- [x] 3.1 Build passes with no errors
