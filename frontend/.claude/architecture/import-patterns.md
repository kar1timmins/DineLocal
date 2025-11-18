# Import Patterns

**Purpose:** Defines how to import and reference files across the project.

**See also:**
- [Directory Structure](./directory-structure.md) - Folder organization
- [File Naming](./file-naming.md) - Naming conventions
- [State Management](./state-management.md) - Zustand store imports

---

## Path Aliases

The project uses `@/*` to reference `src/*`. **Always use this alias for imports:**

```typescript
//  GOOD: Use @ alias
import { Button } from '@/components/shared/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/features/auth/hooks/useAuth'

// L BAD: Relative paths (harder to maintain)
import { Button } from '../../../components/shared/button'
import { cn } from '../../lib/utils'
```

---

## Import Order

**Automatic Sorting:** ESLint automatically organizes imports into groups:

1. **Side effects** (CSS, etc.)
2. **Node.js builtins** (`fs`, `path`)
3. **React and Next.js** (`react`, `next/*`)
4. **External packages** (npm packages)
5. **Internal packages** (`@/` alias)
6. **Parent imports** (`../`)
7. **Sibling imports** (`./`)
8. **Style imports**

**Example:**

```typescript
// 1. Side effects
import './styles.css'

// 2. Node.js builtins
import path from 'path'

// 3. React and Next.js
import { useState } from 'react'
import Link from 'next/link'

// 4. External packages
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'

// 5. Internal packages (@/ alias)
import { Button } from '@/components/shared'
import { cn } from '@/lib/utils'
import { createBooking } from '@/features/bookings/api/createBooking'

// 6. Parent imports
import { BookingCard } from '../components/BookingCard'

// 7. Sibling imports
import { BookingForm } from './BookingForm'

// 8. Types (can be mixed with regular imports using `import type`)
import type { Booking } from '@/features/bookings/types'
```

---

## Feature Imports

###  Recommended Pattern

**Feature components import from shared UI:**

```typescript
//  GOOD: Import shared components
import { Button, Card } from '@/components/shared'
import { Heading, Paragraph } from '@/components/shared/typography'

//  GOOD: Import feature-specific functions
import { createBooking } from '@/features/bookings/api/createBooking'
import { useBookings } from '@/features/bookings/hooks/useBookings'
```

### L Avoid Cross-Feature Imports

**Don't import from other features:**

```typescript
// L BAD: Cross-feature import
import { VenueCard } from '@/features/venues/components/VenueCard'

//  GOOD: Move VenueCard to /components/shared if needed elsewhere
import { VenueCard } from '@/components/shared'
```

**Why?** Features should be loosely coupled. If you need a component from another feature, move it to `/components/shared/`.

---

## API Client Imports

**Use base API client:**

```typescript
//  GOOD: Import base client
import { apiClient } from '@/api/client'

//  GOOD: Import feature-specific API functions
import { getVenues } from '@/features/venues/api/getVenues'
import { createBooking } from '@/features/bookings/api/createBooking'

//  GOOD: Use React Query for data fetching
import { useQuery, useMutation } from '@tanstack/react-query'
```

---

## Component Imports

### Shared Components

```typescript
//  GOOD: Import from barrel export (index.ts)
import { Button, Card, Input } from '@/components/shared'

//  GOOD: Import specific component (better tree-shaking)
import { Button } from '@/components/shared/button'
```

### Raw UI Components

```typescript
//  GOOD: Import raw Shadcn/UI component
import { Button as UIButton } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

//  GOOD: Use utility functions
import { cn } from '@/lib/utils'
```

### Feature Components

```typescript
//  GOOD: Import from feature barrel export
import { BookingForm, BookingCard } from '@/features/bookings/components'

//  GOOD: Import specific feature component
import { BookingForm } from '@/features/bookings/components/BookingForm'
```

---

## Type Imports

**Use `import type` for types (better for tree-shaking):**

```typescript
//  GOOD: Separate type imports
import type { User } from '@/features/auth/types'
import type { Booking } from '@/features/bookings/types'

//  ALSO GOOD: Mixed import
import { createBooking } from '@/features/bookings/api/createBooking'
import type { CreateBookingDto } from '@/features/bookings/types'

// L BAD: Importing type as value (increases bundle size)
import { User } from '@/features/auth/types'
```

---

## Barrel Exports (index.ts)

**Purpose:** Export public API of a folder

**Example:**

```typescript
// src/features/bookings/components/index.ts

//  GOOD: Export only what other features/modules need
export { BookingForm } from './BookingForm'
export { BookingCard } from './BookingCard'

// L BAD: Don't re-export everything (causes circular dependencies)
export * from './BookingForm'
export * from './BookingCard'
export * from './internal/PrivateComponent'  // Don't export internal components
```

**Usage:**

```typescript
// Other files can now import like this:
import { BookingForm, BookingCard } from '@/features/bookings/components'

// Instead of:
import { BookingForm } from '@/features/bookings/components/BookingForm'
import { BookingCard } from '@/features/bookings/components/BookingCard'
```

---

## Best Practices

###  DO

- Use `@/` path alias for all imports
- Use `import type` for TypeScript types
- Import from barrel exports (`index.ts`) for cleaner code
- Keep imports organized (ESLint handles this automatically)
- Import only what you need (named imports, not default exports)

### L DON'T

- Use relative paths (`../../../`) when `@/` alias is available
- Import from other features (cross-feature imports)
- Re-export everything in barrel exports (use selective exports)
- Mix side effect imports with regular imports
- Import types as values (use `import type`)

---

## Examples

### Feature Component with Imports

```typescript
// src/features/bookings/components/BookingForm.tsx

// External packages
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Internal packages (@/ alias)
import { Button } from '@/components/shared'
import { Form, FormField } from '@/components/shared/form'
import { useCreateBooking } from '@/features/bookings/hooks/useCreateBooking'

// Types
import type { CreateBookingDto } from '@/features/bookings/types'

const bookingSchema = z.object({
  // ... schema definition
})

export function BookingForm() {
  const { mutate: createBooking, isPending } = useCreateBooking()
  const form = useForm<CreateBookingDto>({
    resolver: zodResolver(bookingSchema),
  })

  // ... component logic
}
```

### API Client Function

```typescript
// src/features/bookings/api/createBooking.ts

// Internal API client
import { apiClient } from '@/api/client'

// Types
import type { CreateBookingDto, Booking } from '@/features/bookings/types'

export async function createBooking(data: CreateBookingDto): Promise<Booking> {
  return apiClient.post<Booking>('/bookings', data)
}
```

### React Query Hook

```typescript
// src/features/bookings/hooks/useCreateBooking.ts

// External packages
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Feature-specific API function (relative import within feature)
import { createBooking } from '../api/createBooking'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}
```

---

**See also:**
- [Directory Structure](./directory-structure.md) - Where to put files
- [File Naming](./file-naming.md) - How to name files
- [Component Patterns](../components/component-patterns.md) - How to structure components
- [SSOT Mapping](../SINGLE_SOURCE_OF_TRUTH.md) - Authoritative sources
