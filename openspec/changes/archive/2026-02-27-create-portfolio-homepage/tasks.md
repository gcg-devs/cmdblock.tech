## 1. Design System Foundation

- [x] 1.1 Update `globals.css`: set `--radius: 0`, replace all color tokens with pure monochrome black/white values for both `:root` and `.dark`
- [x] 1.2 Update `layout.tsx`: replace Geist Sans with Syne via `next/font/google`, keep Geist Mono, update CSS variable mappings and metadata for cmdblock.tech
- [x] 1.3 Add staggered reveal animation keyframes and utility classes to `globals.css`

## 2. Homepage Structure

- [x] 2.1 Create `src/features/homepage/components/hero-section.tsx` with `>_ cmdblock.tech` heading, tagline, and spacious layout
- [x] 2.2 Create `src/features/homepage/components/unit-section.tsx` with three team member blocks (Ghegi, Gudo, Chan)
- [x] 2.3 Create `src/features/homepage/components/capabilities-section.tsx` with four capability blocks
- [x] 2.4 Create `src/features/homepage/components/philosophy-section.tsx` with three principles
- [x] 2.5 Create `src/features/homepage/components/contact-section.tsx` with minimal contact footer

## 3. Page Composition

- [x] 3.1 Replace `src/app/page.tsx` with homepage composing all section components with staggered reveal classes and hairline dividers
