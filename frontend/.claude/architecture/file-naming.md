# File Naming Conventions

**Purpose:** Defines naming patterns for all file types in the project.

**See also:**
- [Directory Structure](./directory-structure.md) - Where files should go
- [Import Patterns](./import-patterns.md) - How to import files
- [TypeScript Standards](../components/typescript-standards.md) - Code naming conventions

---

## File Naming Guidelines

**General Principles:**

- Be descriptive and concise (e.g., `authService.ts`, `UserProfile.tsx`)
- Avoid special characters (e.g., avoid `data@2025.ts`)
- Use singular nouns for entity/model files (e.g., `user.types.ts`, not `users.types.ts`)
- Plural is acceptable for utility collections (e.g., `constants.ts`, `utils.ts`)

### Conventions by File Type

**React Components:**

- **Components**: PascalCase
  - Example: `UserProfile.tsx`, `ProductCard.tsx`
  - File name must match component name for easy imports

- **Context Providers**: PascalCase with `Provider` or `Context` suffix
  - Example: `AuthProvider.tsx`, `ThemeContext.tsx`
  - File should match the export name

**TypeScript Files:**

- **Types**: camelCase + `.types.ts` suffix
  - Example: `user.types.ts`, `api.types.ts`
  - Use separate file when types are shared across multiple files or complex (10+ lines)
  - Keep inline when types are component-specific and simple

- **Enums**: camelCase + `.enum.ts` suffix
  - File format: `userRole.enum.ts`
  - Enum name: PascalCase (`UserRole`)
  - Enum keys: SCREAMING_SNAKE_CASE (`ADMIN = 'admin'`)

- **Constants**: camelCase + `.constants.ts` suffix
  - File: `routes.constants.ts`
  - Values: SCREAMING_SNAKE_CASE (`export const MAX_FILE_SIZE = 5000000`)

- **Validation Schemas**: camelCase + `.schema.ts` suffix
  - File: `userSignup.schema.ts`, `booking.schema.ts`
  - Schema name: camelCase with "Schema" suffix
  - Example: `export const userSignupSchema = z.object({...})`

**Logic & Utilities:**

- **Utilities & Helpers**: camelCase
  - Example: `formatDate.ts`, `dateFormatter.ts`

- **API Client Functions**: camelCase
  - Example: `createUser.ts`, `getVenues.ts`, `updateBooking.ts`
  - These make HTTP calls to NestJS backend

- **API/Service Files**: camelCase with descriptive suffix
  - Example: `authService.ts`, `venueApi.ts`, `bookingClient.ts`
  - Use consistent suffix across project (e.g., all `Service.ts` or all `Api.ts`)

- **Custom Hooks**: camelCase with `use` prefix
  - Example: `useAuth.ts`, `useDebounce.ts`

- **Zustand Stores**: camelCase + `Store.ts` suffix
  - File: `authStore.ts`, `cartStore.ts`, `uiStore.ts`
  - Store hook name: camelCase with `use` prefix (e.g., `useAuthStore`, `useCartStore`)
  - Example: `export const useAuthStore = create<AuthState>(...)`

**Configuration:**

- **Config Files**: camelCase + `.config.ts` suffix
  - Example: `site.config.ts`, `database.config.ts`

- **Environment Files**:
  - Local development: `.env.local`
  - Other environments: `.env.production`, `.env.staging`
  - Template (commit this): `.env.example`
  - Never commit `.env.local` (add to `.gitignore`)

- **Middleware**: `middleware.ts` for root, camelCase + `.middleware.ts` for custom
  - Example: `auth.middleware.ts`, `logging.middleware.ts`

**Next.js Specific:**

- **Routes**: kebab-case folders
  - Static: `/user-profile`, `/checkout-success`
  - Dynamic: `/venues/[id]`, `/bookings/[bookingId]`
  - Catch-all: `/blog/[...slug]`
  - Optional catch-all: `/docs/[[...slug]]`

- **Special Files** (exact names required by Next.js):
  - Pages: `page.tsx`
  - Layouts: `layout.tsx`
  - Loading: `loading.tsx`
  - Error: `error.tsx`
  - Not Found: `not-found.tsx`
  - Template: `template.tsx`

**Module Organization:**

- **Index Files (Barrel Exports)**: `index.ts`
  - Purpose: Export public API of a folder
  - Example: `/features/auth/components/index.ts`
  - Do: Export only what other features/modules need
  - Don't: Re-export everything (causes circular dependencies)

**Testing:**

- **Test Files**: Match source file + `.test.ts` or `.spec.ts`
  - Example: `UserProfile.test.tsx`, `formatDate.spec.ts`

**Styling:**

- **CSS Modules**: Match component + `.module.css`
  - Example: `UserProfile.module.css`

## Component Patterns

- Use Server Components by default (for static pages and layouts)
- Add 'use client' for interactive components (forms, buttons with state, hooks)
- Co-locate related files (Component.tsx, Component.module.css, Component.test.tsx)

---

## Quick Reference

| File Type | Naming Convention | Example |
|-----------|------------------|---------|
| React Components | PascalCase | `UserProfile.tsx` |
| Custom Hooks | camelCase + `use` prefix | `useAuth.ts` |
| Types | camelCase + `.types.ts` | `user.types.ts` |
| Enums | camelCase + `.enum.ts` | `userRole.enum.ts` |
| Constants | camelCase + `.constants.ts` | `routes.constants.ts` |
| Utilities | camelCase | `formatDate.ts` |
| API Functions | camelCase | `createUser.ts` |
| Zustand Stores | camelCase + `Store.ts` | `authStore.ts` |
| Config Files | camelCase + `.config.ts` | `site.config.ts` |
| Routes | kebab-case folders | `/user-profile` |

---

**See also:**
- [Directory Structure](./directory-structure.md) - Folder organization and file placement rules
- [Import Patterns](./import-patterns.md) - How to import and reference files
- [SSOT Mapping](../SINGLE_SOURCE_OF_TRUTH.md) - Authoritative sources for concepts

