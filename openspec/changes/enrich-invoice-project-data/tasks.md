## 1. Schema & Migration

- [x] 1.1 Add `scopeDescription` (String, default "") and `showScopeOnInvoice` (Boolean, default true) to Project model; add `name` (String, default "") to LineItem model; run migration

## 2. Project Form & Actions

- [x] 2.1 Install shadcn Switch component
- [x] 2.2 Update project form with scope description textarea and show-scope-on-invoice toggle
- [x] 2.3 Update createProject and updateClient actions to handle new project fields

## 3. Invoice Form & Line Items

- [x] 3.1 Update LineItemEditor to include name input + description textarea per item
- [x] 3.2 Update createInvoice action to persist line item `name` field

## 4. Detail Pages & Output

- [x] 4.1 Update project detail page to display scope description
- [x] 4.2 Update invoice detail page to show line item names as bold headers
- [x] 4.3 Create invoice output shape utility at `src/features/invoices/lib/invoice-output.ts`

## 5. Edit Capabilities

- [x] 5.1 Make ProjectForm dual-mode (create/edit) with defaultValues, add updateProject action
- [x] 5.2 Make InvoiceForm dual-mode (create/edit) with defaultValues, add updateInvoice action
- [x] 5.3 Add edit forms to project and invoice detail pages (two-column grid layout)
