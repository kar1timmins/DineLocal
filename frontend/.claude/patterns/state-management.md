## State Management Patterns

### When to Choose State Solution

| Use Case                                            | Solution      | Rationale                               |
| --------------------------------------------------- | ------------- | --------------------------------------- |
| **Global app state** (user auth, theme, locale)     | Zustand       | Minimal boilerplate, no context nesting |
| **Feature-specific state** (filters, search params) | Zustand slice | Modular, easy to test                   |
| **Component-level state** (open/closed, active tab) | useState      | Simple, colocated                       |
| **Shared theme/locale** (deeply nested tree)        | React Context | Built-in, no dependencies               |
| **Server state** (API data, caching)                | React Query   | Optimized for async data                |

### Decision Tree

```
Do you need to fetch data from API?
├─ Yes → Use React Query
└─ No → Is state shared across multiple features?
    ├─ Yes → Zustand (global state)
    └─ No → Is state shared within single feature?
        ├─ Yes → Zustand slice or React Context
        └─ No → useState (component-level)
```

---

### Zustand Patterns

**When to Use:**

- Global state (user, theme, cart, notifications)
- Cross-feature state sharing
- Client-side state that doesn't come from API
- Need for middleware (persistence, devtools)

**File Location:**

- Store files: `/src/stores/`
- Naming: camelCase + `Store.ts` suffix (e.g., `authStore.ts`, `cartStore.ts`)
- Export: `useAuthStore`, `useCartStore` (camelCase with `use` prefix)

**Store Creation:**

✅ **DO:**

- Keep stores small and focused (single responsibility)
- Use TypeScript interfaces for state shape
- Separate actions from state
- Use meaningful action names (verbs)
- Export typed hooks for selectors

❌ **DON'T:**

- Create one massive store for everything
- Mix server state (API data) with client state
- Put business logic in components
- Mutate state directly (use `set()`)
- Skip TypeScript types

**Example (minimal):**

```typescript
// src/stores/authStore.ts
// ✅ Good: Focused auth store
import { create } from 'zustand'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

**For full Zustand patterns, see:**

- Zustand Docs: https://docs.pmnd.rs/zustand/getting-started/introduction

---

### React Context Patterns

**When to Use:**

- Theme or locale providers (deeply nested)
- Dependency injection (services, utilities)
- Feature flags or config
- Rare updates, many consumers

**For full React Context patterns, see:**

- React Context Docs: https://react.dev/reference/react/useContext

---

### Comparison: Zustand vs React Context

| Feature         | Zustand                             | React Context               |
| --------------- | ----------------------------------- | --------------------------- |
| **Bundle Size** | ~1KB                                | 0KB (built-in)              |
| **Boilerplate** | Minimal                             | Medium (provider + hook)    |
| **Performance** | Excellent (selective subscriptions) | Good (with memoization)     |
| **DevTools**    | Yes (middleware)                    | Via React DevTools          |
| **Persistence** | Built-in middleware                 | Manual implementation       |
| **SSR Support** | Manual setup                        | Built-in                    |
| **Best For**    | Global state, frequent updates      | Config, theme, rare updates |

---

