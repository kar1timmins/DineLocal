## Iconography

### Icon Library

DineLocal uses **Lucide React** for consistent, accessible icons.

```tsx
import {
  Heart, // Favorites
  MapPin, // Location
  Calendar, // Booking dates
  Clock, // Time/hours
  Users, // Group size
  Star, // Ratings
  Search, // Search
  Filter, // Filters
  ChevronRight, // Navigation
  X, // Close/cancel
  Check, // Confirm/success
  AlertCircle, // Warning/error
  Info, // Information
  Menu, // Mobile menu
  ArrowLeft, // Back navigation
} from 'lucide-react'
```

### Icon Usage

```tsx
// ✅ CORRECT: Proper sizing and accessibility
<Button>
  <Heart className="h-4 w-4 mr-2" />
  <span>Add to Favorites</span>
</Button>

<Button size="icon" aria-label="Add to favorites">
  <Heart className="h-5 w-5" />
</Button>

// ❌ INCORRECT: No label for icon-only button
<Button size="icon">
  <Heart className="h-5 w-5" />
</Button>
```

### Icon Size Guidelines

```tsx
// Small icons (inline with text)
className = 'h-4 w-4' // 16px - Small buttons, inline text

// Medium icons (default)
className = 'h-5 w-5' // 20px - Standard buttons, cards

// Large icons (emphasis)
className = 'h-6 w-6' // 24px - Large buttons, headers

// Extra large icons (empty states, heroes)
className = 'h-8 w-8' // 32px - Feature sections
className = 'h-12 w-12' // 48px - Empty states
```

### Icon Color Guidelines

```tsx
// Default (inherit text color)
<MapPin className="h-5 w-5" />

// Muted (secondary information)
<Clock className="h-4 w-4 text-muted-foreground" />

// Semantic colors
<Check className="h-5 w-5 text-green-600" />      // Success
<AlertCircle className="h-5 w-5 text-amber-600" /> // Warning
<X className="h-5 w-5 text-red-600" />             // Error
<Info className="h-5 w-5 text-blue-600" />         // Info
```

### Iconography Guidelines

**DO:**

- ✅ Use consistent icon sizes within the same context
- ✅ Provide `aria-label` for icon-only buttons
- ✅ Use semantic icons (Heart for favorites, MapPin for location)
- ✅ Maintain 44px minimum touch target for icon buttons
- ✅ Add proper spacing between icon and text (mr-2, ml-2)

**DON'T:**

- ❌ Mix icon libraries (stick to Lucide React)
- ❌ Use decorative icons without semantic meaning
- ❌ Create icon-only buttons without labels
- ❌ Use icons smaller than 16px
- ❌ Overuse icons (text is often clearer)

---
