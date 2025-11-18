## Accessibility

### 14. Semantic HTML and ARIA (WCAG 2.2 AA Compliance)

**DineLocal follows WCAG 2.2 AA standards (updated 2024). Shadcn/UI components built on Radix UI provide accessibility by default.**

**WCAG 2.2 AA Requirements:**

- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Focus indicators**: Visible focus states (2px thick, 3:1 contrast - WCAG 2.4.13)
- **Touch targets**: Minimum 24×24px (WCAG 2.5.8) - DineLocal uses 44px+ for better UX
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Text resizing**: Support up to 200% zoom without loss of functionality
- **Focus not obscured**: Focused elements not hidden by sticky headers/footers (WCAG 2.4.11)

**Note:** See `/frontend/.claude/context/DESIGN_PRINCIPLES.md` for comprehensive WCAG 2.2 implementation patterns including the 9 new success criteria added in October 2023.

**Shadcn/UI Accessibility Benefits:**

- Radix UI primitives implement WAI-ARIA design patterns automatically
- Components include proper roles, states, and keyboard interactions
- Focus management handled automatically (dialogs, dropdowns, etc.)

```tsx
// ❌ Non-semantic, inaccessible
<div onClick={handleClick}>Click me</div>

// ✅ Semantic with proper attributes
<button
  onClick={handleClick}
  aria-label="Add to cart"
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add to cart'}
</button>

// ✅ Semantic structure
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ✅ Accessible form with Shadcn/UI (Radix primitives)
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div>
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <span id="email-error" role="alert" className="text-destructive">
      {errors.email.message}
    </span>
  )}
</div>

// ✅ Color contrast with OKLCH variables
<button className="
  bg-primary text-primary-foreground  /* WCAG AA compliant contrast */
  hover:bg-primary/90
  focus-visible:ring-2 focus-visible:ring-ring  /* Clear focus indicator */
">
  Submit
</button>
```

**Accessibility Checklist:**

- [ ] Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Provide ARIA labels for icon-only buttons
- [ ] Ensure color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] Add focus indicators (Shadcn/UI provides these)
- [ ] Use Shadcn/UI components for complex interactions (dialogs, dropdowns)
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)

---

### 15. Keyboard Navigation

**Ensure all interactive elements are keyboard accessible.**

```tsx
'use client'

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    // Trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {children}
    </div>
  )
}
```

---

