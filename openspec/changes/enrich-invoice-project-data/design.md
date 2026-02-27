## Context

Projects currently have `title`, `totalContractValue`, `currency`, and `status`. Line items only have `description` and `amount`. The invoice form and detail pages need richer data to support professional SOA document output.

## Goals / Non-Goals

**Goals:**
- Add `scopeDescription` and `showScopeOnInvoice` to Project
- Add `name` to LineItem (short label separate from long description)
- Update all forms and detail pages to use new fields
- Create a utility function that produces the structured invoice output JSON

**Non-Goals:**
- HTML/PDF invoice rendering or preview
- Changing invoice numbering or status logic
- Billing logic (split vs full settlement auto-detection)

## Decisions

1. **Schema additions**: `Project.scopeDescription` as optional String (default ""), `Project.showScopeOnInvoice` as Boolean (default true). `LineItem.name` as String (default "").

2. **Toggle component**: Use shadcn `Switch` for the "Show Scope on Invoice" toggle in the project form.

3. **Line item editor expansion**: Add a `name` input field above the existing description (which becomes a textarea). Grid changes from `[1fr_150px_40px]` to a stacked layout: name + description textarea + amount per item.

4. **Invoice output shape**: A server-side utility at `src/features/invoices/lib/invoice-output.ts` that takes an invoice (with relations) and returns the structured JSON shape. No API route needed yet — just the function.

5. **Detail page display**: Project detail shows scope description when present. Invoice detail shows line item names as bold headers above descriptions.

## Risks / Trade-offs

- [Migration] Adding columns with defaults is safe — no data loss, existing rows get defaults
- [Form complexity] Line item editor gets more fields — mitigated by clear visual grouping
