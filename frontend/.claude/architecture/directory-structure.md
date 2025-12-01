# Directory Structure

**Purpose:** Defines folder organization and file placement rules.

**See also:**

- [File Naming](./file-naming.md) - Naming conventions
- [Import Patterns](./import-patterns.md) - How to import files
- [State Management](./state-management.md) - Zustand store setup

---

## Project Structure

```
src/
├── app/                      # Next.js App Router (ROUTING ONLY)
│   ├── page.tsx             # Home page (thin wrapper)
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading UI
│   └── [route]/             # Dynamic routes (thin wrappers)
│
├── components/
│   ├── ui/                  # Raw Shadcn/UI components (DO NOT modify)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   └── shared/              # Reusable UI components (customized)
│       ├── navbar/
│       ├── typography/
│       ├── container/
│       └── index.ts         # Barrel exports
│
├── features/                # Business domain modules
│   ├── auth/
│   │   ├── pages/           # Page-level components (used by app/ routes)
│   │   ├── components/      # Auth-specific reusable components
│   │   ├── hooks/           # Auth-specific hooks
│   │   ├── api/             # Auth API functions
│   │   ├── types/           # Auth TypeScript types
│   │   ├── enums/           # Auth enums
│   │   ├── lib/             # Auth utilities
│   │   └── constants/       # Auth constants
│   │
│   ├── bookings/
│   │   └── [same structure as auth/]
│   │
│   └── venues/
│       └── [same structure as auth/]
│
├── stores/                  # Zustand global state
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── uiStore.ts
│
├── lib/                     # Common utilities
│   ├── utils.ts             # Shared utility functions
│   └── constants.ts         # App-wide constants
│
├── hooks/                   # Common React hooks
│   ├── useDebounce.ts
│   └── useMediaQuery.ts
│
├── api/                     # Common API utilities
│   ├── client.ts            # Base API client
│   └── interceptors.ts      # Request/response interceptors
│
├── types/                   # Common TypeScript types
│   ├── api.types.ts
│   └── common.types.ts
│
├── enums/                   # Common enums
│   └── userRole.enum.ts
│
├── config/                  # App-wide configuration
│   ├── site.config.ts
│   └── api.config.ts
│
└── public/                  # Static assets
    ├── images/
    └── fonts/
```

---

## Component Organization Rules

### `/app/` - Next.js App Router (Routing Only)

**Purpose:** Route definitions and thin wrappers only

**Rules:**

- ✅ **ONLY** routing files: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- ✅ Keep `page.tsx` as thin wrappers that import from `/features/`
- ❌ **NEVER** add page-level components (e.g., `SearchPageContent.tsx`) in `/app/`
- ❌ **NEVER** add business logic in `/app/` - delegate to features

---

### `/components/ui/` - Raw Shadcn/UI Components

**Purpose:** Unmodified Shadcn/UI installations

**Rules:**

- ❌ **DO NOT modify these files** - treat as third-party dependencies
- ✅ Import and use as-is
- ✅ If customization needed → create wrapper in `/components/shared/`

**Example:**

```typescript
// ❌ BAD: Don't modify ui/button.tsx
// ✅ GOOD: Create shared/custom-button.tsx that uses ui/button
```

---

### `/components/shared/` - Reusable UI Components

**Purpose:** Customized, generic components shared across features

**When to use:**

- ✅ Used in 2+ features
- ✅ Generic, no business logic
- ✅ Reusable patterns (cards, layouts, typography)

**When NOT to use:**

- ❌ Feature-specific logic (put in `/features/[feature]/components/`)
- ❌ Business rules (put in `/features/[feature]/components/`)

**Characteristics:**

- Styled with Tailwind CSS + design system
- Export from `index.ts` for common components
- Use `class-variance-authority` for variants
- Use `cn()` utility to merge Tailwind classes

**Example:**

```typescript
// ✅ GOOD: Generic, reusable
// src/components/shared/date-picker.tsx
export function DatePicker({ value, onChange }: DatePickerProps) {
  // Generic date picking logic, no business rules
}
```

---

### `/features/[feature]/` - Business Domain Modules

**Purpose:** Feature-specific components with business logic

**When to use:**

- ✅ Feature-specific business logic
- ✅ Domain models and rules
- ✅ API integrations
- ✅ State management for the feature

**Structure per feature:**

```
/features/bookings/
├── pages/             # Page-level components (imported by app/ routes)
│   └── BookingPageContent.tsx
├── components/        # Reusable feature-specific components
│   ├── BookingForm.tsx
│   └── BookingCard.tsx
├── hooks/             # Booking-specific hooks
│   └── useCreateBooking.ts
├── api/               # Booking API functions
│   └── createBooking.ts
├── types/             # Booking types
│   └── booking.types.ts
├── enums/             # Booking enums
├── lib/               # Booking utilities
└── constants/         # Booking constants
```

**Pages vs Components:**

| Folder | Purpose | Naming | Used By |
|--------|---------|--------|---------|
| `pages/` | Page-level compositions, full page content | `*PageContent.tsx` | `app/[route]/page.tsx` |
| `components/` | Reusable pieces within the feature | `*.tsx` | Pages & other components |

**Feature Naming:**

- ✅ Domain-driven: `/features/auth`, `/features/bookings`, `/features/venues`
- ❌ Technical: `/features/forms`, `/features/buttons`

**Feature Scope:**

- Each feature = business capability or user journey
- Features loosely coupled (minimal cross-dependencies)
- If Feature A heavily depends on Feature B → consider merging

**Example:**

```typescript
// ✅ GOOD: Feature-specific component
// src/features/bookings/components/BookingForm.tsx
import { useCreateBooking } from '@/features/bookings/hooks/useCreateBooking'
import { Button } from '@/components/shared'

export function BookingForm() {
  const { mutate: createBooking, isPending } = useCreateBooking()

  const handleSubmit = (data) => {
    createBooking(data, {
      onSuccess: () => toast.success('Booking created!'),
      onError: (error) => toast.error(error.message),
    })
  }
  // Business logic for bookings...
}
```

---

## When to Move Code from Feature to Common

### Promote to Common When:

- ✅ Used in **2+ different features**
- ✅ Represents **cross-cutting concern** (logging, auth, API)
- ✅ Has **no feature-specific business logic**

### Keep in Feature When:

- ✅ Only used within **one feature**
- ✅ Contains **feature-specific business rules**
- ✅ Tightly coupled to **feature domain models**

**Example:**

```typescript
// Used only in bookings feature → Keep in /features/bookings/
;(BookingForm, BookingCard, BookingList)

// Used in bookings AND venues → Move to /components/shared/
;(DatePicker, PriceDisplay, RatingStars)
```

---

## API Client Organization

### Feature-Specific API Functions

**Location:** `/features/[feature]/api/`

**Purpose:** API calls for specific features

**Example:**

```typescript
// src/features/bookings/api/createBooking.ts
import { apiClient } from '@/api/client'
import type { CreateBookingDto, Booking } from '@/features/bookings/types'

export async function createBooking(data: CreateBookingDto): Promise<Booking> {
  return apiClient.post<Booking>('/bookings', data)
}
```

### Common API Utilities

**Location:** `/api/`

**Purpose:** Shared API configuration and utilities

**Files:**

- `client.ts` - Base fetch wrapper
- `interceptors.ts` - Request/response interceptors
- Cross-cutting functions: `uploadImage.ts`, `handleError.ts`

---

## Quick Decision Guide

**"Where should this component go?"**

```
Is it a page-level component (imported by app/[route]/page.tsx)?
    YES → /features/[feature]/pages/
    NO  ↓

Is it feature-specific with business logic?
    YES → /features/[feature]/components/
    NO  ↓

Is it used across multiple features?
    YES → /components/shared/
    NO  → /features/[feature]/components/

Is it a raw Shadcn component?
    YES → /components/ui/ (don't modify!)
```

**"Where should this function go?"**

```
Is it an API call for a specific feature?
    YES → /features/[feature]/api/
    NO  ↓

Is it a common utility?
    YES → /lib/
    NO  ↓

Is it a common hook?
    YES → /hooks/
```

**"Where should this type go?"**

```
Is it feature-specific?
    YES → /features/[feature]/types/
    NO  → /types/
```

---

## Examples

### Feature Component with API Integration

```typescript
// ✅ GOOD: Feature-specific component
// src/features/bookings/components/BookingForm.tsx
import { useCreateBooking } from '@/features/bookings/hooks/useCreateBooking'
import { Button } from '@/components/shared'

export function BookingForm() {
  const { mutate: createBooking, isPending } = useCreateBooking()
  // Feature-specific business logic...
}
```

### React Query Hook

```typescript
// ✅ GOOD: Feature-specific hook
// src/features/bookings/hooks/useCreateBooking.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
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

### Shared Component

```typescript
// ✅ GOOD: Generic, reusable
// src/components/shared/date-picker.tsx
export function DatePicker({ value, onChange }: DatePickerProps) {
  // Generic date picking logic, no business rules
}
```

---

**See also:**

- [File Naming Conventions](./file-naming.md)
- [Import Patterns](./import-patterns.md)
- [State Management](./state-management.md)
- [SSOT Mapping](../SINGLE_SOURCE_OF_TRUTH.md)
