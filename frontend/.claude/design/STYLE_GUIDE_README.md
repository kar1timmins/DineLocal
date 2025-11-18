# DineLocal Style Guide

**Purpose:** Specific visual values, code formatting standards, and content patterns for implementing DineLocal designs.

**Relationship to other docs:**
- **Design Principles** (`design/README.md`) - WHY we design this way
- **Style Guide** (this folder) - WHAT specific values to use
- **Component Guidelines** (`/components/`) - HOW to implement components

---

## 📚 Style Guide Index

### Visual Design
1. **[Colors](./colors.md)** - Color palette, semantic usage, accessibility contrast
2. **[Typography](./typography.md)** - Font sizes, weights, line heights, text styles
3. **[Spacing & Layout](./spacing-layout.md)** - Spacing scale, layout patterns, grid system
4. **[Components Styling](./components-styling.md)** - Buttons, cards, forms, badges, pills, chips, toasts
5. **[Iconography](./iconography.md)** - Icon library (Lucide React), sizes, usage
6. **[Imagery & Photos](./imagery-photos.md)** - Image specs, quality, optimization, placeholders
7. **[Animation & Motion](./animation-motion.md)** - Durations, easing functions, patterns

### Code Standards
8. **[Code Style](./code-style.md)** - Imports, Tailwind class order, TypeScript naming, file structure

### Content
9. **[Content & Copywriting](./content-copywriting.md)** - Tone of voice, microcopy, error messages

### Technical Standards
10. **[Performance](./performance.md)** - Core Web Vitals, loading states, progressive enhancement, optimization
11. **[Responsive Design](./responsive.md)** - Breakpoints, mobile-first patterns, viewport testing
12. **[Accessibility Standards](./accessibility-standards.md)** - WCAG 2.2 AA, ARIA, keyboard navigation
13. **[Internationalization](./i18n.md)** - Multi-language support, RTL, currencies, date/time formats

### Reference
14. **[Style Checklist](./style-checklist.md)** - Pre-commit checklist, additional resources

---

## Quick Reference

### Common Design Values

**Colors (Primary)**
```
Primary: oklch(62% 0.21 259) - #5b4cdb
Primary Hover: oklch(57% 0.21 259) - #4a3bc4
```

**Typography**
```
Display: 3.5rem (56px) / 1.1 / 700
H1: 2.5rem (40px) / 1.2 / 700
H2: 2rem (32px) / 1.2 / 600
Body: 1rem (16px) / 1.5 / 400
```

**Spacing**
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
```

**Touch Targets**
- Minimum: 48px × 48px (WCAG 2.2 AA)
- Recommended: 56px × 56px for primary actions

**Breakpoints**
```
sm: 640px (Mobile landscape)
md: 768px (Tablet portrait)
lg: 1024px (Tablet landscape / Desktop)
xl: 1280px (Desktop)
2xl: 1536px (Large desktop)
```

---

## Quick Access by Need

**"What color should this button be?"**
→ [Colors](./colors.md) → Component Usage

**"What font size should I use?"**
→ [Typography](./typography.md) → Typography Scale

**"How much spacing between elements?"**
→ [Spacing & Layout](./spacing-layout.md) → Spacing Scale

**"How should I style this button?"**
→ [Components Styling](./components-styling.md) → Buttons

**"What icons are available?"**
→ [Iconography](./iconography.md)

**"How should I format this error message?"**
→ [Content & Copywriting](./content-copywriting.md) → Error Messages

**"What animation duration should I use?"**
→ [Animation & Motion](./animation-motion.md) → Duration Scale

**"How do I optimize images?"**
→ [Performance](./performance.md) → Image Optimization

**"What responsive breakpoints?"**
→ [Responsive Design](./responsive.md) → Breakpoints

**"How do I ensure accessibility?"**
→ [Accessibility Standards](./accessibility-standards.md)

**"How do I handle multiple languages?"**
→ [Internationalization](./i18n.md)

**"What should I check before committing?"**
→ [Style Checklist](./style-checklist.md)

---

## Scope

**This Style Guide covers:**
✅ Specific values to use (colors: `#5b4cdb`, spacing: `1rem`)
✅ Code formatting standards (import order, Tailwind class order)
✅ Content patterns (tone of voice, error message formats)
✅ Visual component specifications (button heights, card padding)
✅ Performance targets (LCP <2.5s, INP <200ms)

**This Style Guide does NOT cover:**
❌ WHY we make design decisions → See `design/README.md` (Design Principles)
❌ HOW to implement React components → See `/components/` folder
❌ Architecture decisions → See `/architecture/` folder
❌ Feature-specific patterns → See `/patterns/` folder

---

**Next Steps:**
1. Review [Colors](./colors.md) and [Typography](./typography.md) for core design values
2. Reference [Components Styling](./components-styling.md) when building UI elements
3. Check [Performance](./performance.md) and [Accessibility Standards](./accessibility-standards.md) for technical standards
4. Use [Style Checklist](./style-checklist.md) before committing code
