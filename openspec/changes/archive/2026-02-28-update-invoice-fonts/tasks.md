# Tasks: update-invoice-fonts

## 1. Update PDF Font Registration

- [x] 1.1 Replace Inter `Font.register` with Syne (weights 400, 600, 700, 800) using verified gstatic TTF URLs
- [x] 1.2 Replace Fira Code `Font.register` with Geist Mono (weights 400, 600, 700) using verified gstatic TTF URLs
- [x] 1.3 Update all `fontFamily: "Inter"` → `fontFamily: "Syne"` in PDF styles
- [x] 1.4 Update all `fontFamily: "Fira Code"` → `fontFamily: "Geist Mono"` in PDF styles

## 2. Update HTML Template Fonts

- [x] 2.1 Change `mono` constant to `"'Geist Mono', var(--font-geist-mono), monospace"`
- [x] 2.2 Change `sans` constant to `"'Syne', var(--font-syne), system-ui, sans-serif"`

## 3. Verify

- [x] 3.1 Build passes with no errors
