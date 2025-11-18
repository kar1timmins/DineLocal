## Animation & Motion

### Animation Principles

**DineLocal animations should be:**

- ⚡ **Fast:** 150-300ms for UI interactions
- 🎯 **Purposeful:** Guide attention, indicate state changes
- ♿ **Respectful:** Honor `prefers-reduced-motion`
- 🪶 **Subtle:** Enhance, don't distract

### Transition Utilities

```tsx
// Standard transitions
transition-all          // All properties (use sparingly)
transition-colors       // Color changes (buttons, links)
transition-opacity      // Fade in/out
transition-transform    // Scale, translate
transition-shadow       // Shadow changes (cards)

// Duration
duration-150            // 150ms - Fast (hover states)
duration-200            // 200ms - Default (most UI)
duration-300            // 300ms - Slower (drawers, modals)
duration-500            // 500ms - Slow (page transitions)

// Easing
ease-in                 // Start slow
ease-out                // End slow (default for most)
ease-in-out             // Both (smooth)
```

### Common Animation Patterns

**Button Hover:**

```tsx
<Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">Book Now</Button>
```

**Card Hover:**

```tsx
<Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  {/* Content */}
</Card>
```

**Fade In (loading content):**

```tsx
<div className="animate-in fade-in opacity-0 duration-500">{/* Content */}</div>
```

**Slide In (drawers, modals):**

```tsx
<Sheet>
  <SheetContent className="animate-in slide-in-from-right duration-300">
    {/* Drawer content */}
  </SheetContent>
</Sheet>
```

**Loading Spinner:**

```tsx
<div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
```

### Respecting User Preferences

```tsx
// ✅ CORRECT: Honor prefers-reduced-motion
<Card className="
  hover:shadow-lg
  transition-shadow
  motion-reduce:transition-none
">
  {/* Content */}
</Card>

// Global CSS (tailwind.config.js handles this)
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Guidelines

**DO:**

- ✅ Use `transition-colors` for button hovers
- ✅ Use `transition-shadow` for card elevation
- ✅ Keep durations under 500ms
- ✅ Use `ease-out` for most transitions
- ✅ Add `motion-reduce:transition-none` for accessibility
- ✅ Test animations on slower devices

**DON'T:**

- ❌ Use `transition-all` excessively (performance)
- ❌ Animate layout properties (width, height) frequently
- ❌ Create infinite animations without pause
- ❌ Ignore `prefers-reduced-motion`
- ❌ Use animations longer than 1 second
- ❌ Animate purely for decoration

---

