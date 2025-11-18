# State Management

**Purpose:** Defines state management patterns and when to use each approach.

**See also:**
- [Directory Structure](./directory-structure.md) - Where to put state files
- [Decision Trees](../quick-reference/decision-trees.md) - State management decision tree
- [State Management Patterns](../patterns/state-management.md) - Advanced patterns

---

## State Management Approaches

DineLocal uses three primary state management approaches:

1. **Zustand** (`/stores/`) - Global state across multiple features
2. **React Context** - Feature-scoped state or dependency injection
3. **useState/useReducer** - Component-local state

---

## Zustand Stores

### When to Use Zustand

 **Use Zustand for:**
- Global app state accessed by multiple features
- State that needs to persist (with middleware)
- Complex state with multiple actions
- Performance-critical state (better re-render optimization than Context)

**Examples:**
- Authentication state (user, tokens, isAuthenticated)
- Shopping cart state
- User preferences (theme, language, currency)
- UI state (modals, sidebars, notifications)

### Store Structure

**Location:** `/stores/`

**File naming:** `camelCase + Store.ts` suffix
- Example: `authStore.ts`, `cartStore.ts`, `uiStore.ts`

**Store hook naming:** `camelCase with use prefix`
- Example: `useAuthStore`, `useCartStore`, `useUIStore`

### Example: Auth Store

```typescript
// src/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/features/auth/types'

interface AuthState {
  // State
  user: User | null
  token: string | null
  isAuthenticated: boolean

  // Actions
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,

      // Actions
      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
```

### Usage

```typescript
// src/features/auth/components/LoginForm.tsx
import { useAuthStore } from '@/stores/authStore'

export function LoginForm() {
  const login = useAuthStore((state) => state.login)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const handleLogin = async (credentials) => {
    const { user, token } = await loginApi(credentials)
    login(user, token)
  }

  // ... rest of component
}
```

### Best Practices

** DO:**
- One store per file for better code splitting
- Use TypeScript interfaces for state shape
- Use selector functions for better performance: `useAuthStore((state) => state.user)`
- Use middleware for persistence, devtools, logging
- Keep stores focused (auth, cart, ui - separate stores)

**L DON'T:**
- Put all state in one giant store
- Access entire store: `const state = useAuthStore()` (causes unnecessary re-renders)
- Store server state (use React Query instead)
- Put feature-specific state in global store (use feature-scoped context instead)

---

## React Context

### When to Use Context

 **Use React Context for:**
- Feature-scoped state (create context within feature directory)
- Simple state that doesn't change frequently
- Dependency injection patterns (theme, i18n providers)
- State that needs to be accessed by many nested components within a feature

**Examples:**
- Theme provider (light/dark mode)
- Internationalization (i18n) provider
- Feature-specific wizard state
- Form wizard context

### Context Structure

**Location:** `/features/[feature]/context/` or `/components/shared/context/`

**File naming:** `PascalCase + Provider.tsx` or `PascalCase + Context.tsx`
- Example: `ThemeProvider.tsx`, `BookingWizardContext.tsx`

### Example: Theme Provider

```typescript
// src/components/shared/context/ThemeProvider.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### Usage

```typescript
// src/app/layout.tsx
import { ThemeProvider } from '@/components/shared/context/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

// src/components/shared/navbar/ThemeToggle.tsx
import { useTheme } from '@/components/shared/context/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Best Practices

** DO:**
- Split context and provider into separate components
- Export custom hook (`useTheme`) with error checking
- Use TypeScript for type safety
- Keep context focused on single concern
- Memoize context value if it contains objects/functions

**L DON'T:**
- Use for frequently changing state (use Zustand or useState instead)
- Put entire app state in one context (causes unnecessary re-renders)
- Use for server state (use React Query instead)
- Forget error handling in custom hooks

---

## useState/useReducer

### When to Use useState

 **Use useState for:**
- Component-local state (form inputs, toggles, UI state)
- Simple state that doesn't need to be shared
- State that only affects one component
- Temporary UI state (dropdowns, modals, tooltips)

**Examples:**
- Form input values (controlled components)
- Modal open/close state
- Dropdown menu open state
- Loading/error states (component-level)

### Example: Component State

```typescript
// src/features/bookings/components/BookingForm.tsx
import { useState } from 'react'

export function BookingForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestCount, setGuestCount] = useState(1)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Form
      </button>

      {isOpen && (
        <form>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
          />
        </form>
      )}
    </div>
  )
}
```

### When to Use useReducer

 **Use useReducer for:**
- Complex component state with multiple sub-values
- State updates that depend on previous state
- State with multiple related actions
- When next state depends on previous state in complex ways

### Example: Reducer State

```typescript
// src/features/bookings/components/BookingWizard.tsx
import { useReducer } from 'react'

type State = {
  step: number
  formData: {
    date?: string
    guests?: number
    specialRequests?: string
  }
}

type Action =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_FIELD'; field: string; value: unknown }
  | { type: 'RESET' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 }
    case 'PREV_STEP':
      return { ...state, step: Math.max(0, state.step - 1) }
    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
      }
    case 'RESET':
      return { step: 0, formData: {} }
    default:
      return state
  }
}

export function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, {
    step: 0,
    formData: {},
  })

  return (
    <div>
      <p>Step {state.step + 1}</p>
      <button onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
      <button onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next</button>
    </div>
  )
}
```

---

## Decision Tree

**"Which state management should I use?"**

```
Is this server state (data from API)?
    YES ’ Use React Query (NOT Zustand/Context/useState)
    NO  “

Is this global state needed by multiple features?
    YES ’ Use Zustand (/stores/)
    NO  “

Is this feature-scoped state (many nested components)?
    YES ’ Use React Context (/features/[feature]/context/)
    NO  “

Is this component-local state?
    YES ’ Use useState/useReducer
```

**Complex component state?**

```
Does state have multiple sub-values or complex updates?
    YES ’ Use useReducer
    NO  ’ Use useState
```

---

## Server State (React Query)

**L NEVER use Zustand/Context/useState for server state**

** ALWAYS use React Query for:**
- Data fetched from NestJS backend
- Caching API responses
- Synchronizing server state
- Optimistic updates
- Automatic refetching
- Background updates

**Example:**

```typescript
// L BAD: Using Zustand for server state
const useVenuesStore = create((set) => ({
  venues: [],
  fetchVenues: async () => {
    const data = await getVenues()
    set({ venues: data })
  },
}))

//  GOOD: Using React Query for server state
import { useQuery } from '@tanstack/react-query'
import { getVenues } from '@/features/venues/api/getVenues'

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

**For more details, see:**
- [Data Fetching](../components/data-fetching.md) - React Query patterns
- [Advanced API Patterns](../patterns/advanced-api.md) - Caching, polling, optimistic updates

---

## Summary

| State Type | Solution | Location |
|------------|----------|----------|
| **Server state** (API data) | React Query | `/features/[feature]/hooks/` |
| **Global state** (multi-feature) | Zustand | `/stores/` |
| **Feature state** (nested components) | React Context | `/features/[feature]/context/` |
| **Component state** (local) | useState/useReducer | Component file |
| **Complex component state** | useReducer | Component file |

---

**See also:**
- [Decision Trees](../quick-reference/decision-trees.md) - State management decision tree
- [State Management Patterns](../patterns/state-management.md) - Advanced patterns
- [Data Fetching](../components/data-fetching.md) - React Query usage
- [Directory Structure](./directory-structure.md) - Where to put state files
