## Accessibility

### WCAG 2.2 AA Compliance

DineLocal follows WCAG 2.2 AA standards. Key requirements:

**Design Philosophy:**
For comprehensive accessibility rationale, WCAG 2.2 criteria, and user experience patterns, see:
📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` → Accessibility for Global Audience

**1. Color Contrast**

```tsx
// ✅ CORRECT: 4.5:1 for normal text
text-foreground on bg-background       // 900 on white = 21:1
text-muted-foreground on bg-background // 600 on white = 4.6:1

// ✅ CORRECT: 3:1 for large text (18pt+)
text-muted-foreground on bg-muted      // Acceptable for large text

// ❌ INCORRECT: Insufficient contrast
text-gray-400 on bg-white              // 2.8:1 - fails WCAG
```

**2. Focus Indicators (WCAG 2.4.13)**

```tsx
// ✅ CORRECT: 2px thick, 3:1 contrast
<Button className="focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none">
  Book Now
</Button>

// All Shadcn/UI components have proper focus states by default
```

**3. Touch Targets (WCAG 2.5.8 Enhanced)**

```tsx
// ✅ CORRECT: 48px minimum (DineLocal standard - exceeds WCAG 2.2)
<Button className="h-12 px-6">         // 48px height
<Checkbox className="h-5 w-5 p-3">     // 48px touch area with padding

// ✅ ACCEPTABLE: 44px for compact layouts (meets WCAG 2.2 minimum)
<Button size="compact" className="h-11 px-4">  // 44px height

// ❌ INCORRECT: Too small
<Button className="h-8 px-2">          // 32px - fails WCAG 2.5.8
```

**4. Focus Not Obscured (WCAG 2.4.11)**

```tsx
// ✅ CORRECT: Ensure sticky headers don't hide focused elements
<header className="sticky top-0 z-50 bg-background">
  {/* Navigation */}
</header>

<main className="scroll-mt-16">       // Offset for sticky header
  {/* Content */}
</main>
```

**5. Keyboard Navigation**

```tsx
// ✅ CORRECT: All interactive elements keyboard accessible
<Button onKeyDown={handleKeyDown} onClick={handleClick}>
  Book Now
</Button>

// ✅ CORRECT: Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  {/* Content */}
</main>
```

**6. ARIA Labels**

```tsx
// ✅ CORRECT: Icon-only buttons
<Button size="icon" aria-label="Add to favorites">
  <Heart className="h-5 w-5" />
</Button>

// ✅ CORRECT: Form inputs
<Label htmlFor="email">Email Address</Label>
<Input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-help"
/>
<Text id="email-help" className="text-sm text-muted-foreground">
  We'll never share your email.
</Text>

// ✅ CORRECT: Live regions
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>
```

**7. Semantic HTML**

```tsx
// ✅ CORRECT: Proper heading hierarchy
<Heading as="h1">Page Title</Heading>
<Heading as="h2">Section Title</Heading>
<Heading as="h3">Subsection Title</Heading>

// ✅ CORRECT: Semantic elements
<nav aria-label="Main navigation">
<main>
<article>
<aside>
<footer>

// ❌ INCORRECT: Div soup
<div className="navigation">
<div className="main">
```

### Accessibility Guidelines

**DO:**

- ✅ Ensure 4.5:1 contrast for text (use contrast checker)
- ✅ Provide alt text for all images (8-12 words)
- ✅ Use semantic HTML (nav, main, article, button)
- ✅ Add ARIA labels for icon-only buttons
- ✅ Test with keyboard navigation (Tab, Enter, Space, Esc)
- ✅ Test with screen reader (NVDA, JAWS, VoiceOver)
- ✅ Ensure 44px+ touch targets
- ✅ Support text resizing up to 200%

**DON'T:**

- ❌ Use color alone to convey information
- ❌ Create keyboard traps
- ❌ Skip focus indicators
- ❌ Use `<div>` for buttons or links
- ❌ Use placeholders as labels
- ❌ Auto-play audio/video
- ❌ Set timeout without warning

---
