## Mobile Form Optimization

### Auto-Focus and Input Types

**Use appropriate input types for better mobile keyboard:**

```tsx
export function MobileOptimizedForm() {
  return (
    <form className="space-y-4">
      {/* Email input - shows @ and .com keys */}
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        className="h-11"
      />

      {/* Phone input - shows number pad */}
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+1 (555) 000-0000"
        className="h-11"
      />

      {/* Number input - shows numeric keyboard */}
      <Input
        type="number"
        inputMode="numeric"
        placeholder="Number of guests"
        min="1"
        max="20"
        className="h-11"
      />

      {/* Search input - shows search key instead of return */}
      <Input type="search" inputMode="search" placeholder="Search experiences" className="h-11" />

      {/* URL input - shows .com and / keys */}
      <Input type="url" inputMode="url" placeholder="https://example.com" className="h-11" />
    </form>
  )
}
```

**Input Mode Reference:**

| Input Type | `inputMode` | Mobile Keyboard           |
| ---------- | ----------- | ------------------------- |
| Email      | `"email"`   | Shows @ and .com keys     |
| Phone      | `"tel"`     | Number pad with +\*#      |
| Number     | `"numeric"` | Number pad 0-9 only       |
| Search     | `"search"`  | Shows "Search" action key |
| URL        | `"url"`     | Shows .com and / keys     |
| Text       | `"text"`    | Standard QWERTY keyboard  |

---

### Floating Labels

**Save vertical space on mobile:**

```tsx
import { useState } from 'react'

export function FloatingLabelInput({ label, ...props }) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value !== '')
        }}
        className={cn('h-11 pt-6 pb-2', 'peer')}
      />
      <label
        className={cn(
          'pointer-events-none absolute left-3 transition-all',
          'text-muted-foreground',
          isFocused || hasValue ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
        )}
      >
        {label}
      </label>
    </div>
  )
}
```

---
