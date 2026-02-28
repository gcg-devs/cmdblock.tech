## Context

Two mobile responsiveness bugs in the invoice feature. The shared invoice view has no responsive breakpoints and the edit form uses a 2-column grid that breaks with long project names.

## Goals / Non-Goals

**Goals:**
- Make shared invoice view usable on mobile
- Fix dropdown overlap on invoice edit form

**Non-Goals:**
- Full mobile redesign of the entire invoice feature
- Changing the invoice HTML template itself

## Decisions

1. **Shared invoice mobile layout**: Use Tailwind `hidden md:block` to hide the HTML preview on mobile. Show the sidebar content (details card + download button) as full-width on mobile using `flex-col md:flex-row`. The download button becomes the primary CTA on mobile.

2. **Invoice form dropdowns**: Change the Project + Type row from `grid-cols-1 sm:grid-cols-2` to always stack vertically (`grid-cols-1`). This is cleaner and prevents the overlap regardless of project name length. Type dropdown moves below Project.

## Risks / Trade-offs

- Hiding the preview on mobile means users must download the PDF to see content — acceptable since the 960px HTML preview was already unreadable on mobile anyway
- Stacking dropdowns vertically uses more vertical space on desktop — minimal impact since the form already scrolls
