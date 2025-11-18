## 5. Component Organization Quick Reference

### Directory Structure:

```
/components
  /ui               ← Raw Shadcn/UI installations (DON'T MODIFY!)
    /button.tsx
    /card.tsx
    /dialog.tsx

  /shared           ← Reusable UI components (customized Shadcn + custom)
    /container      ← Box, Flex, Grid (layout primitives)
    /typography     ← Heading, Paragraph (text primitives)
    /button         ← Customized Button (extends /ui/button)
    /card           ← Customized Card (extends /ui/card)
    /navigation     ← NavigationBar, NavLink
    /index.ts       ← Barrel exports for common components

/features/[feature] ← Feature-specific code
  /components       ← Feature-specific components (business logic)
    /BookingForm.tsx
    /ExperienceCard.tsx
    /HostProfileCard.tsx
  /api              ← Feature-specific API functions
    /getExperiences.ts
    /createBooking.ts
  /hooks            ← Feature-specific React hooks
    /useExperiences.ts
    /useCreateBooking.ts
  /types            ← Feature-specific TypeScript types
    /experience.types.ts
  /lib              ← Feature-specific utilities
    /formatExperience.ts

/stores             ← Zustand stores for global state management
  /authStore.ts
  /cartStore.ts
  /uiStore.ts
```

### File Naming Conventions:

| File Type        | Convention                  | Example                                   |
| ---------------- | --------------------------- | ----------------------------------------- |
| React Component  | PascalCase                  | `NavigationBar.tsx`, `ExperienceCard.tsx` |
| Utility function | camelCase                   | `formatDate.ts`, `calculatePrice.ts`      |
| API function     | camelCase                   | `getExperiences.ts`, `createBooking.ts`   |
| Custom hook      | camelCase with `use` prefix | `useAuth.ts`, `useDebounce.ts`            |
| Zustand store    | camelCase + `Store.ts`      | `authStore.ts`, `cartStore.ts`            |
| Types            | camelCase + `.types.ts`     | `user.types.ts`, `booking.types.ts`       |
| Enums            | camelCase + `.enum.ts`      | `userRole.enum.ts`                        |
| Constants        | camelCase + `.constants.ts` | `routes.constants.ts`                     |
| Config           | camelCase + `.config.ts`    | `site.config.ts`                          |

### When to Promote from Feature to Shared:

**Promote to `/components/shared/` when:**

- ✅ Used in **2+ different features**
- ✅ Represents **cross-cutting concern** (auth, formatting, error handling)
- ✅ Has **no feature-specific business logic**
- ✅ Generic enough to be reusable

**Keep in `/features/[feature]/` when:**

- ✅ Only used within **one feature**
- ✅ Contains **feature-specific business rules**
- ✅ Tightly coupled to **feature domain models**

**Examples:**

| Component      | Location                          | Reason                                      |
| -------------- | --------------------------------- | ------------------------------------------- |
| BookingForm    | /features/bookings/components/    | Feature-specific business logic             |
| DatePicker     | /components/shared/               | Generic, reusable across features           |
| ExperienceCard | /features/experiences/components/ | Initially feature-specific                  |
| StarRating     | /components/shared/               | Used in experiences, reviews, host profiles |

### Export Patterns:

**Feature components (optional barrel export):**

```
/features/bookings/components/
  /BookingForm.tsx
  /BookingList.tsx
  /index.ts  ← export { BookingForm } from './BookingForm'
```

**Shared components (barrel export for common components):**

```
/components/shared/
  /button.tsx
  /card.tsx
  /index.ts  ← export { Button } from './button'; export { Card } from './card'
```

**Import examples:**

```tsx
// ✅ GOOD: Import from shared barrel
import { Button, Card } from '@/components/shared'

// ✅ GOOD: Import specific shared component
import { NavigationBar } from '@/components/shared/navigation/NavigationBar'

// ✅ GOOD: Import feature component
import { BookingForm } from '@/features/bookings/components/BookingForm'

// ❌ BAD: Import from /ui directly (use /shared customized versions)
import { Button } from '@/components/ui/button'

// ❌ BAD: Cross-feature import
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
// Instead: Move ExperienceCard to /components/shared if needed elsewhere
```

**Reference:** [CLAUDE.md](/frontend/.claude/CLAUDE.md) → Directory Structure, Import Patterns

---

## 6. Finding & Using Reusable Components

### Design System Primitives (ALWAYS USE THESE):

**Why:** Type-safe, consistent, maintainable. Enforces design system patterns.

#### Layout Components:

- **`<Box>`** - Generic container (replaces `<div>`, `<span>`)
- **`<Flex>`** - Flexbox layouts (replaces `<div className="flex">`)
- **`<Grid>`** - Grid layouts (replaces `<div className="grid">`)

**Location:** `/components/shared/container`

#### Typography Components:

- **`<Heading>`** - Headings (replaces `<h1>`, `<h2>`, etc.)
- **`<Paragraph>`** - Paragraphs (replaces `<p>`)

**Location:** `/components/shared/typography`

**❌ DON'T DO THIS:**

```tsx
<div className="flex items-center gap-4">
  <h2 className="text-2xl font-bold">Experience Title</h2>
  <p className="text-muted-foreground">Hosted by Maria</p>
</div>
```

**✅ DO THIS:**

```tsx
import { Flex, Box } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'
;<Flex alignItems="center" className="gap-4">
  <Heading as="h2" fontWeight="bold">
    Experience Title
  </Heading>
  <Paragraph textColor="muted">Hosted by Maria</Paragraph>
</Flex>
```

### Shadcn/UI Components Available:

**Location:** `/components/ui/` (installed via CLI)
**How to install:** `npx shadcn@latest add [component]`

**Common components:**

- Button, Card, Dialog, Sheet, Tabs, Command
- Form, Input, Label, Textarea, Select
- Popover, Tooltip, Dropdown Menu
- Avatar, Badge, Progress, Skeleton

**⚠️ IMPORTANT:**

- DON'T modify files in `/components/ui/`
- If you need customization, create wrapper in `/components/shared/`
- Treat `/components/ui/` as third-party dependencies

**Reference:** https://ui.shadcn.com/docs/components

### Shared Components:

**Location:** `/components/shared/`

**Check here FIRST before creating new components:**

- Navigation components (NavigationBar, NavLink)
- Layout components (Box, Flex, Grid, Container)
- Typography components (Heading, Paragraph)
- Customized Shadcn components (Button, Card, etc.)

**How to find:**

1. Check `/components/shared/index.ts` for barrel exports
2. Browse `/components/shared/` folders
3. Ask: "Does a similar component already exist?"

### When to Use Class Variance Authority (CVA):

**What is CVA?** A utility for creating type-safe component variants with Tailwind CSS. Used throughout our design system and Shadcn/UI.

**Use CVA for:**

- ✅ Shared components in `/components/shared/` with multiple visual variants
- ✅ Components with variant props (size, color, variant, padding, etc.)
- ✅ Reusable components needing type-safe, composable styling API
- ✅ Design system primitives (Button, Card, Navbar, etc.)

**Use plain Tailwind for:**

- ❌ One-off feature components with fixed styling
- ❌ Components with no variants (single appearance)
- ❌ Highly dynamic styling based on data/state
- ❌ Simple wrappers that just pass className

**Quick Decision:** If component is in `/components/shared/` AND has 2+ visual variants → Use CVA. Otherwise → Plain Tailwind.

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) for implementation examples

---

### Component Usage Checklist:

**Before creating a new component:**

- [ ] Checked `/components/shared/` for existing component
- [ ] Checked Shadcn/UI docs for pre-built component
- [ ] Checked `/features/[similar-feature]/components/` for similar pattern
- [ ] Confirmed component doesn't exist or can't be extended with props

**When creating shared components:**

- [ ] Use CVA if component has 2+ visual variants
- [ ] Define clear variant options with sensible defaults
- [ ] Export both component and variants (for extending)

**When using components:**

- [ ] Using design system primitives (Box, Flex, Heading, Paragraph)
- [ ] Not using raw HTML elements (`<div>`, `<h1>`, `<p>`)
- [ ] Importing from `/components/shared/` (not `/components/ui/`)
- [ ] Following component API (check TypeScript props)

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Design System Components

---

