## 4. Quick Decision Trees

Use these flowcharts to make quick decisions about common questions.

---

### Decision Tree 1: Server Component vs Client Component?

```
START: Am I creating a new component?
│
├─ Q: Does it use React hooks (useState, useEffect, useContext)?
│  ├─ YES → Client Component ('use client' at top)
│  └─ NO → Continue
│
├─ Q: Does it handle user interactions (onClick, onChange, onSubmit)?
│  ├─ YES → Client Component ('use client' at top)
│  └─ NO → Continue
│
├─ Q: Does it use browser APIs (localStorage, window, document)?
│  ├─ YES → Client Component ('use client' at top)
│  └─ NO → Continue
│
├─ Q: Does it use React Query (useQuery, useMutation)?
│  ├─ YES → Client Component ('use client' at top)
│  └─ NO → Continue
│
├─ Q: Does it use Zustand or client-side state management?
│  ├─ YES → Client Component ('use client' at top)
│  └─ NO → Continue
│
└─ NO to all above → Server Component (default, no directive needed)
```

**Examples:**

- ✅ **Server Component:** Static pages, layouts, SEO content, data fetching for initial render
- ❌ **Client Component:** Forms, modals, navigation with state, search, filters, anything interactive

**When in doubt:** Start with Server Component. Add 'use client' only when you get an error about hooks or browser APIs.

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Server vs Client Components

---

### Decision Tree 2: Where Should I Put This File?

```
START: I have a new file to create
│
├─ Q: Is it a React component?
│  ├─ YES
│  │  ├─ Q: Is it a raw Shadcn/UI component just installed (unmodified)?
│  │  │  └─ YES → /components/ui/ (DON'T MODIFY THESE!)
│  │  │
│  │  ├─ Q: Is it used across multiple features?
│  │  │  ├─ YES → /components/shared/ (reusable UI components)
│  │  │  └─ NO → Continue
│  │  │
│  │  └─ Q: Is it feature-specific business logic?
│  │     └─ YES → /features/[feature]/components/
│  │
│  └─ NO → Continue
│
├─ Q: Is it an API function (fetch data from backend)?
│  ├─ YES
│  │  ├─ Q: Is it feature-specific (e.g., getExperiences, createBooking)?
│  │  │  └─ YES → /features/[feature]/api/
│  │  │
│  │  └─ Q: Is it shared utility (e.g., uploadImage, handleError)?
│  │     └─ YES → /api/
│  │
│  └─ NO → Continue
│
├─ Q: Is it a custom React hook?
│  ├─ YES
│  │  ├─ Q: Is it feature-specific (e.g., useBookings)?
│  │  │  └─ YES → /features/[feature]/hooks/
│  │  │
│  │  └─ Q: Is it used across multiple features (e.g., useDebounce)?
│  │     └─ YES → /hooks/
│  │
│  └─ NO → Continue
│
├─ Q: Is it a Zustand store (global state management)?
│  ├─ YES → /stores/
│  │  Example: authStore.ts, cartStore.ts, uiStore.ts
│  │  Naming: camelCase + Store.ts suffix
│  │  Export: useAuthStore, useCartStore
│  │
│  └─ NO → Continue
│
├─ Q: Is it a TypeScript type/interface?
│  ├─ YES
│  │  ├─ Q: Is it feature-specific?
│  │  │  └─ YES → /features/[feature]/types/
│  │  │
│  │  └─ Q: Is it used across multiple features?
│  │     └─ YES → /types/
│  │
│  └─ NO → Continue
│
├─ Q: Is it an enum?
│  ├─ YES
│  │  ├─ Q: Is it feature-specific?
│  │  │  └─ YES → /features/[feature]/enums/
│  │  │
│  │  └─ Q: Is it used across multiple features?
│  │     └─ YES → /enums/
│  │
│  └─ NO → Continue
│
├─ Q: Is it a constant (e.g., routes, config values)?
│  ├─ YES
│  │  ├─ Q: Is it feature-specific?
│  │  │  └─ YES → /features/[feature]/constants/
│  │  │
│  │  └─ Q: Is it used across multiple features?
│  │     └─ YES → /constants/
│  │
│  └─ NO → Continue
│
└─ Q: Is it a utility function (helper, formatter)?
   ├─ YES
   │  ├─ Q: Is it feature-specific?
   │  │  └─ YES → /features/[feature]/lib/
   │  │
   │  └─ Q: Is it used across multiple features?
   │     └─ YES → /lib/
   │
   └─ NO → /config/ (app-wide configuration)
```

**When to Promote from Feature to Shared:**

- Used in **2+ different features**
- Represents **cross-cutting concern** (auth, error handling, formatting)
- Has **no feature-specific business logic**

**Reference:** [CLAUDE.md](/frontend/.claude/CLAUDE.md) → Directory Structure

---

### Decision Tree 3: State Management (Zustand vs Context vs useState)

```
START: I need to manage state
│
├─ Q: Is state used only in ONE component?
│  └─ YES → useState
│     Example: Toggle, form input, local UI state
│     Implementation: const [isOpen, setIsOpen] = useState(false)
│
├─ Q: Is state shared between parent and direct children (2-3 levels)?
│  └─ YES
│     ├─ Q: Does it update frequently (>10 times per minute)?
│     │  ├─ YES → Zustand (avoid re-render performance issues)
│     │  └─ NO → React Context (simpler for infrequent updates)
│     │
│     └─ Example Context: Theme, auth status, language preference
│        Example Zustand: Shopping cart, real-time notifications
│
├─ Q: Is state global (used across unrelated features/pages)?
│  └─ YES → Zustand
│     Example: User profile, shopping cart, notification center
│     Implementation: Create store in /stores/
│
├─ Q: Is state server-side data (from API)?
│  └─ YES → React Query (useQuery, useMutation)
│     Why: Automatic caching, refetching, error handling
│     Implementation: Create hook in /features/[feature]/hooks/
│
└─ Q: Is state URL-based (filters, pagination)?
   └─ YES → URL search params (useSearchParams)
      Why: Shareable links, browser back/forward, SEO
      Implementation: Use Next.js useSearchParams hook
```

**Decision Matrix:**

| Use Case                  | Solution    | Why                           |
| ------------------------- | ----------- | ----------------------------- |
| Toggle button open/closed | useState    | Single component, simple      |
| Theme (light/dark)        | Context     | Shared across app, infrequent |
| Shopping cart             | Zustand     | Global, frequent updates      |
| User profile              | Zustand     | Global, used everywhere       |
| Form input values         | useState    | Local to form component       |
| Filter state              | URL params  | Shareable, bookmarkable       |
| API data                  | React Query | Caching, automatic refetch    |

**Reference:** [ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md) → State Management Patterns

---

### Decision Tree 4: How Should I Fetch Data?

```
START: I need to fetch data from the backend
│
├─ Q: Is data needed for SEO (meta tags, open graph, content crawled by Google)?
│  └─ YES → Server Component fetch (async/await in component)
│     Why: Rendered on server, available to crawlers
│     Implementation: async function Page() { const data = await fetch(...) }
│
├─ Q: Is data user-specific (requires authentication)?
│  └─ YES → useQuery (React Query) in Client Component
│     Why: Client-side only, includes auth tokens
│     Implementation: const { data } = useQuery({ queryKey: [...], queryFn: ... })
│
├─ Q: Does data change frequently (real-time updates)?
│  └─ YES
│     ├─ Q: Is it truly real-time (<1 second updates)?
│     │  ├─ YES → WebSocket (Socket.io)
│     │  │  Reference: ADVANCED_PATTERNS.md → Real-Time Features
│     │  │
│     │  └─ NO → useQuery with polling
│     │     Implementation: useQuery({ refetchInterval: 5000 })
│     │
│     └─ Continue
│
├─ Q: Does data change based on user interaction (filters, search)?
│  └─ YES → useQuery (React Query) in Client Component
│     Why: Reactive to user input, cached, deduplication
│     Implementation: const { data } = useQuery({ queryKey: ['items', filters], ... })
│
├─ Q: Is data static (doesn't change often, same for all users)?
│  └─ YES
│     ├─ Q: Is page dynamic (different for each request)?
│     │  └─ YES → Server Component fetch with caching
│     │     Implementation: fetch(url, { next: { revalidate: 3600 } })
│     │
│     └─ Q: Is page static (same for all users, pre-rendered)?
│        └─ YES → Server Component fetch at build time
│           Implementation: async function Page() { const data = await fetch(...) }
│
└─ Default: useQuery (React Query) in Client Component
   Why: Most flexible, handles loading/error states, caching
```

**Examples:**

| Data Type           | Solution               | Reason                              |
| ------------------- | ---------------------- | ----------------------------------- |
| Blog posts (SEO)    | Server Component fetch | Crawlable, static                   |
| User bookings       | useQuery               | User-specific, auth required        |
| Experience listings | Server Component fetch | SEO, can cache                      |
| Search results      | useQuery               | Reactive to input                   |
| Notifications       | WebSocket or polling   | Real-time updates                   |
| User profile        | useQuery               | User-specific, updates occasionally |

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Data Fetching with React Query

---

### Decision Tree 5: When Should I Create a New Component?

```
START: I'm about to create a new component
│
├─ FIRST: Search existing components
│  ├─ Check /components/shared/
│  ├─ Check /components/ui/ (Shadcn installed)
│  └─ Check /features/[similar-feature]/components/
│
├─ Q: Does similar component already exist?
│  ├─ YES
│  │  ├─ Q: Can I extend it with props/variants?
│  │  │  ├─ YES → Reuse existing component, add variant
│  │  │  │  Example: <Button variant="outline" /> instead of new OutlineButton
│  │  │  │
│  │  │  └─ NO → Continue (create new component)
│  │  │
│  │  └─ Continue
│  │
│  └─ NO → Continue
│
├─ Q: Is this pattern used (or will be used) in 2+ places?
│  ├─ YES → Create in /components/shared/
│  │  Why: Reusable across features, maintains consistency
│  │
│  └─ NO → Create in /features/[feature]/components/
│     Why: Feature-specific, encapsulates business logic
│
├─ Q: Does this component contain business logic?
│  ├─ YES → Create in /features/[feature]/components/
│  │  Example: BookingForm, ExperienceFilter, HostProfileCard
│  │  Why: Tightly coupled to feature domain, not generic
│  │
│  └─ NO → Create in /components/shared/
│     Example: DatePicker, SearchBar, StarRating
│     Why: Generic, reusable, no business logic
│
└─ Q: Is this a raw Shadcn/UI component?
   └─ YES → Install to /components/ui/ (DON'T CREATE, USE CLI)
      Command: npx shadcn@latest add [component]
```

**Red Flags (DON'T CREATE NEW COMPONENT):**

- ❌ Button with slightly different color → Use variant instead
- ❌ Card with different layout → Use composition (Card + Flex/Box)
- ❌ Form with different fields → Reuse form components (Input, Label, Button)
- ❌ Component used only once → Keep inline unless complex

**Green Lights (CREATE NEW COMPONENT):**

- ✅ Used in 2+ places
- ✅ Encapsulates complex logic
- ✅ Improves readability (long component split into smaller ones)
- ✅ Reusable pattern (date picker, star rating, avatar)

**Reference:** [CLAUDE.md](/frontend/.claude/CLAUDE.md) → Component Organization

---

### Decision Tree 6: Which Mobile Navigation Pattern?

```
START: I need mobile navigation
│
├─ Q: Is this primary app navigation (always visible)?
│  └─ YES
│     ├─ Q: How many nav items?
│     │  ├─ 2-5 items → Bottom Tab Bar
│     │  │  Why: Always visible, one-tap access, thumb-friendly
│     │  │  Example: Home, Search, Bookings, Profile
│     │  │
│     │  └─ 6+ items → Too many for bottom bar
│     │     Consider: Do you really need 6+ primary nav items?
│     │     Alternative: Use 4 primary + "More" tab
│     │
│     └─ Continue
│
├─ Q: Is this secondary navigation (within a feature)?
│  └─ YES
│     ├─ Q: How many items?
│     │  ├─ 2-4 items → Tabs (horizontal scroll)
│     │  │  Why: Clear, visible, easy to switch
│     │  │  Example: "Overview", "Reviews", "Location"
│     │  │
│     │  └─ 5+ items → Bottom Sheet
│     │     Why: Saves screen space, expandable
│     │     Example: Experience filtering options
│     │
│     └─ Continue
│
├─ Q: Does navigation include search functionality?
│  └─ YES → Command Menu (Cmdk)
│     Why: Search + navigation combined, keyboard shortcut (Cmd+K)
│     Example: Search experiences, quick navigation
│
├─ Q: Is this filtering/sorting options?
│  └─ YES → Bottom Sheet (mobile) + Sidebar (desktop)
│     Why: Doesn't take permanent screen space, easy to close
│     Example: Price range, cuisine type, dietary filters
│
└─ Q: Is this a temporary overlay (settings, menu)?
   └─ YES → Drawer (right/left) or Bottom Sheet
      Why: Full-screen temporary content
      Example: User settings, notifications panel
```

**Mobile Navigation Patterns:**

| Pattern           | When to Use                          | Items | Example                          |
| ----------------- | ------------------------------------ | ----- | -------------------------------- |
| Bottom Tab Bar    | Primary navigation, always visible   | 2-5   | Home, Search, Bookings, Profile  |
| Tabs (horizontal) | Secondary navigation, within feature | 2-4   | Overview, Reviews, Map           |
| Bottom Sheet      | Filters, menus, secondary actions    | 5-10  | Experience filters, sort options |
| Command Menu      | Search + navigation                  | Any   | Cmd+K quick search               |
| Drawer            | Temporary content, settings          | Any   | User menu, notifications         |

**❌ Avoid on Mobile:**

- Hamburger menu (hides navigation, hard to reach)
- Top navigation bar (hard to reach with thumb)
- Too many bottom tabs (>5 items = cluttered)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) → Mobile Navigation Patterns

---
