## Spacing & Layout

### Spacing Scale

DineLocal uses Tailwind's default spacing scale (4px base unit):

```tsx
// Extra Small (4px, 8px)
gap - 1 // 4px - Tight icon spacing
gap - 2 // 8px - Form field spacing

// Small (12px, 16px)
gap - 3 // 12px - Inline elements
gap - 4 // 16px - Card content spacing

// Medium (20px, 24px)
gap - 5 // 20px - Section spacing
gap - 6 // 24px - Card padding

// Large (32px, 40px, 48px)
gap - 8 // 32px - Major sections
gap - 10 // 40px - Page sections
gap - 12 // 48px - Hero sections

// Extra Large (64px, 80px, 96px)
gap - 16 // 64px - Page margins
gap - 20 // 80px - Major dividers
gap - 24 // 96px - Hero padding
```

### Container Widths

```tsx
// Page Container
<Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</Container>

// Narrow Container (Forms, articles)
<Container className="max-w-3xl mx-auto px-4">
  {/* Content */}
</Container>

// Wide Container (Grids, galleries)
<Container className="max-w-screen-2xl mx-auto px-4">
  {/* Content */}
</Container>

// Full Width (Hero, maps)
<Container className="w-full px-4">
  {/* Content */}
</Container>
```

### Card Spacing

```tsx
// Standard Card
<Card className="p-6 space-y-4">
  <Heading as="h3">Card Title</Heading>
  <Text>Card content with consistent spacing</Text>
</Card>

// Compact Card (Mobile, lists)
<Card className="p-4 space-y-3">
  {/* Tighter spacing for mobile */}
</Card>

// Spacious Card (Featured, hero)
<Card className="p-8 space-y-6">
  {/* More breathing room */}
</Card>
```

### Spacing Guidelines

**DO:**

- ✅ Use consistent spacing multiples (4, 8, 12, 16, 24, 32, 48, 64)
- ✅ Use `space-y-{n}` for vertical stacking
- ✅ Use `gap-{n}` for Flexbox/Grid layouts
- ✅ Add extra spacing around important CTAs (my-8, my-12)
- ✅ Use padding for content areas, margin for section separation

**DON'T:**

- ❌ Use arbitrary values like `px-[17px]` unless absolutely necessary
- ❌ Mix padding and margin inconsistently
- ❌ Create cramped layouts (minimum 16px touch targets)
- ❌ Forget responsive spacing adjustments (sm:p-6, lg:p-8)

---

