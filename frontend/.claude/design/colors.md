## Color Palette

### Primary Colors

```tsx
// Primary Brand Color (Used for CTAs, links, key actions)
bg-primary          // Main brand color
text-primary        // Primary text on light backgrounds
border-primary      // Primary borders

// Usage:
<Button className="bg-primary hover:bg-primary/90">Book Now</Button>
```

### Semantic Colors

```tsx
// Success (Confirmations, availability)
bg - green - 600 // Success background
text - green - 600 // Success text
border - green - 600 // Success border

// Warning (Low availability, important notices)
bg - amber - 500 // Warning background
text - amber - 600 // Warning text
border - amber - 500 // Warning border

// Error (Validation errors, unavailable)
bg - red - 600 // Error background
text - red - 600 // Error text (must be red-700+ on white for WCAG)
border - red - 600 // Error border

// Info (Tips, helpful information)
bg - blue - 600 // Info background
text - blue - 600 // Info text
border - blue - 600 // Info border
```

### Neutral Colors

```tsx
// Backgrounds
bg - background // Main page background (white/near-white)
bg - card // Card background
bg - muted // Subtle background (f9fafb equivalent)

// Text
text - foreground // Primary text (900)
text - muted - foreground // Secondary text (500-600)

// Borders
border - border // Default border color (200-300)
border - input // Input borders

// Interactive States
hover: bg - accent // Hover background
focus: ring - ring // Focus ring color
```

### Gradient Accents

```tsx
// Hero sections, premium features
className = 'bg-gradient-to-r from-blue-600 to-purple-600'
className = 'bg-gradient-to-br from-primary to-purple-600'

// Text gradients (for headings)
className = 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
```

### Color Usage Guidelines

**DO:**

- ✅ Use `bg-primary` for primary CTAs (Book Now, Reserve, Confirm)
- ✅ Use semantic colors consistently (green=success, red=error, amber=warning)
- ✅ Ensure 4.5:1 contrast for text, 3:1 for UI elements
- ✅ Use `text-muted-foreground` for secondary information
- ✅ Test colors in light/dark mode if implementing dark mode

**DON'T:**

- ❌ Use raw Tailwind colors (red-500, blue-600) without semantic meaning
- ❌ Mix gradient styles (stick to one gradient direction per section)
- ❌ Use low-contrast text colors (text-gray-400 on white)
- ❌ Overuse bright colors (reserve for important actions)

---
