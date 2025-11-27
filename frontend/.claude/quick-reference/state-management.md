## 8. State Management Quick Guide

### Decision: useState vs Context vs Zustand

#### Use `useState` When:

- State used in **single component only**
- Simple, local UI state
- No need to share with other components

**Examples:**

- Toggle (open/closed)
- Form input values (controlled components)
- Local loading state
- Hover state

**Implementation:**

```
const [isOpen, setIsOpen] = useState(false)
```

**Pros:** Simple, performant, co-located with component
**Cons:** Can't share state with other components

---

#### Use React Context When:

- State shared across **component tree** (parent → children)
- Updates **infrequent** (<10 times per minute)
- Read more than write
- Simple state (not complex objects)

**Examples:**

- Theme (light/dark)
- Language preference
- Auth status (logged in/out)
- User profile (rarely changes)

**Implementation:**

```
Create: /lib/context/ThemeContext.tsx
Use: const { theme, setTheme } = useTheme()
```

**Pros:** Built-in React, simple API, good for infrequent updates
**Cons:** All consumers re-render on update (performance issue if frequent updates)

---

#### Use Zustand When:

- State is **global** (used across unrelated features)
- Updates **frequent** (>10 times per minute)
- Complex state with multiple actions
- Need fine-grained subscriptions (only re-render what changed)

**Examples:**

- Shopping cart (add/remove items, update quantity)
- Notification center (real-time notifications)
- Filter state (multiple filters updating frequently)
- UI state across features (sidebar open/closed, modal stack)

**Implementation:**

```
Create: /lib/store/cartStore.ts
Use: const { items, addItem, removeItem } = useCartStore()
```

**Pros:** Performant (selective re-renders), simple API, TypeScript-friendly
**Cons:** Extra dependency, overkill for simple state

---

#### Use React Query When:

- State is **server-side data** (from API)
- Need caching, refetching, optimistic updates
- Synchronize client state with server state

**Examples:**

- User bookings (fetched from backend)
- Experience listings (API data)
- Host profile (server data)
- Any data fetched from NestJS backend

**Implementation:**

```
const { data, isLoading, error } = useQuery({
  queryKey: ['bookings'],
  queryFn: getBookings
})
```

**Pros:** Automatic caching, refetching, error handling, optimistic updates
**Cons:** Not for truly local state

---

#### Use URL Search Params When:

- State affects page content (filters, pagination)
- Want **shareable links**
- Want browser back/forward to work
- SEO important (search engines can index)

**Examples:**

- Filters (cuisine, price, date)
- Pagination (page=2)
- Sort (sortBy=price)
- Search query (q=italian)

**Implementation:**

```
const searchParams = useSearchParams()
const cuisine = searchParams.get('cuisine')
```

**Pros:** Shareable, bookmarkable, SEO-friendly, browser history
**Cons:** Limited to serializable values (strings, numbers)

---

### Decision Matrix:

| Scenario                    | Solution           | Why                                          |
| --------------------------- | ------------------ | -------------------------------------------- |
| Button toggle (open/closed) | useState           | Single component, simple                     |
| Form input values           | useState           | Local to form, controlled components         |
| Theme (light/dark)          | Context            | Shared across app, infrequent changes        |
| Auth status                 | Context            | Global, rarely changes (login/logout)        |
| Shopping cart               | Zustand            | Global, frequent updates (add/remove items)  |
| Notification center         | Zustand            | Global, real-time updates                    |
| User bookings (API data)    | React Query        | Server data, caching, refetching             |
| Experience filters          | URL params         | Shareable links, SEO, browser history        |
| Sidebar open/closed         | Zustand or Context | Global UI state, depends on update frequency |

---

### Anti-Patterns (DON'T DO THIS):

❌ **Using Context for frequently updated state**

- Problem: All consumers re-render, performance issues
- Solution: Use Zustand for frequent updates

❌ **Using Zustand for simple component state**

- Problem: Overkill, unnecessary complexity
- Solution: Use useState for local state

❌ **Not using React Query for API data**

- Problem: Manual caching, refetching, error handling
- Solution: Always use React Query for server data

❌ **Storing server data in Zustand**

- Problem: Duplicate source of truth, manual sync
- Solution: Use React Query, store only derived/UI state in Zustand

❌ **Prop drilling through 5+ levels**

- Problem: Verbose, hard to maintain
- Solution: Use Context or Zustand

**Reference:** [ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md) → State Management Patterns

---
