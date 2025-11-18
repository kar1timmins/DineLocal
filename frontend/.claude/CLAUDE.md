# CLAUDE.md

# Project Name: DineLocal

## Overview

**DineLocal** is a peer-to-peer marketplace connecting **hosts** who offer authentic home dining experiences with **guests** (locals and tourists) seeking to experience authentic cuisine and culture. Think Airbnb for home-cooked meals.

---

## 🚀 Starting the Project

### Option 1: Docker (Recommended)

```bash
# Start all services in development mode
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f frontend

# Stop services
docker compose -f docker-compose.dev.yml down
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5433

**Environment:** Ensure root `.env` has correct PostgreSQL settings.

**Seed Database:**
```bash
docker compose -f docker-compose.dev.yml exec backend pnpm run seed
```

### Option 2: Manual Setup

**Prerequisites:** Node.js 18.x+, PostgreSQL 15.x, pnpm

**Backend:**
```bash
cd backend
pnpm install
pnpm run start:dev  # Runs on http://localhost:3001
```

**Frontend:**
```bash
cd frontend
pnpm install
pnpm dev  # Runs on http://localhost:3000
```

**Development Commands:**
```bash
# Frontend
pnpm dev          # Start with Turbopack
pnpm lint:fix     # Auto-fix linting
pnpm format       # Format code
pnpm check        # Format check + lint

# Backend
pnpm run start:dev
pnpm run seed
pnpm run lint
```

---

## Tech Stack

**Package Manager:** pnpm

**Frontend Core:**
- Next.js 15.5.4 (App Router)
- React 19.1.0 + TypeScript 5
- Tailwind CSS 4.1.13 (custom design system, OKLCH color space)
- Shadcn/UI + Radix UI (accessibility primitives)

**Data & State:**
- @tanstack/react-query 5.90 (data fetching, caching)
- Zustand (global state management)
- React Hook Form + Zod (form validation)

**Backend:**
- NestJS API (http://localhost:3001)
- PostgreSQL 15.x

**Code Quality:**
- ESLint 9 + Prettier 3.6
- TypeScript strict mode

---

## 📚 Documentation Navigation

### ⭐ Start Here (AI Assistants)
**[/quick-reference/](./quick-reference/README.md)** - Your PRIMARY reference
- [Core UX/UI Principles](./quick-reference/core-principles.md) - MOST IMPORTANT!
- [Decision Trees](./quick-reference/decision-trees.md) - Server vs Client, file organization, state, data fetching
- [Checklists](./quick-reference/checklists.md) - Pre-commit, pre-PR quality gates
- [AI Workflow](./quick-reference/ai-workflow.md) - How to assist effectively

### Project Structure
**[/architecture/](./architecture/README.md)** - File organization, naming, conventions
- [Directory Structure](./architecture/directory-structure.md) - Folder organization
- [File Naming](./architecture/file-naming.md) - Naming conventions for all file types
- [Import Patterns](./architecture/import-patterns.md) - Path aliases, best practices
- [State Management](./architecture/state-management.md) - Zustand vs Context vs useState

### React/Next.js Patterns
**[/components/](./components/README.md)** - How to build components
- [Component Patterns](./components/component-patterns.md) - Server vs Client, composition
- [Data Fetching](./components/data-fetching.md) - React Query, Server Components
- [Error Handling](./components/error-handling.md) - Error boundaries, API errors
- [Accessibility](./components/accessibility.md) - WCAG 2.2 AA implementation
- [React/Next.js Best Practices](./components/react-nextjs-best-practices.md) - Modern patterns 2025

### Design & UX
**[/design/](./design/README.md)** - Design philosophy & visual values
- [UX Laws](./design/ux-laws.md) - Laws of UX for marketplaces (Look First!)
- [Colors](./design/colors.md) - Color palette, semantic usage
- [Typography](./design/typography.md) - Font sizes, weights, line heights
- [Spacing & Layout](./design/spacing-layout.md) - Spacing scale
- [Components Styling](./design/components-styling.md) - Button/card/form specs
- [Accessibility](./design/accessibility.md) - WCAG 2.2 AA standards
- [Performance](./design/performance.md) - Core Web Vitals 2025
- [Mobile-First Design](./design/mobile-first.md) - Touch targets, progressive disclosure

### Complex Features
**[/patterns/](./patterns/README.md)** - Implementation guides
- [Error Handling](./patterns/error-handling.md) - Comprehensive strategies
- [File Uploads](./patterns/file-uploads.md) - Image validation, compression
- [Payments (Stripe)](./patterns/payments-stripe.md) - Integration, webhooks
- [Real-Time Features](./patterns/real-time.md) - WebSockets, SSE
- [State Management](./patterns/state-management.md) - Complex state patterns

### Mobile
**[/mobile/](./mobile/README.md)** - Mobile-specific patterns
- [Touch Gestures](./mobile/touch-gestures.md) - Swipe, tap, long-press
- [Navigation](./mobile/navigation.md) - Bottom nav, bottom sheets
- [Forms & Inputs](./mobile/forms-inputs.md) - Mobile keyboards, validation

### Security
**[/security/](./security/README.md)** - Security best practices
- [XSS Prevention](./security/xss-prevention.md) - DOMPurify, sanitization
- [CSRF Protection](./security/csrf-protection.md) - Token patterns
- [Input Validation](./security/input-validation.md) - Zod validation
- [Authentication](./security/authentication.md) - Secure auth patterns

---

## Visual Testing & Design Review

### Quick Visual Check

IMMEDIATELY after implementing any front-end changes:

1. **Identify what changed** - Review modified components/features/pages/layouts
2. **Navigate to affected pages** - Use `mcp_playwright_browser_navigate`
3. **Verify design compliance** - Compare against:
   - [Core Principles](./quick-reference/core-principles.md)
   - [Design folder](./design/)
   - [Mobile patterns](./mobile/)
4. **Validate feature implementation** - Ensure change fulfills user's request
5. **Check acceptance criteria** - Review provided context files
6. **Capture evidence** - Full page screenshot at desktop viewport (1440px)
7. **Check for errors** - Run `mcp_playwright_browser_console_messages`

### Comprehensive Design Review

For **significant UI changes or before merging PRs**, use `/design-review` command for thorough 7-phase review:

1. Initial Assessment
2. Visual Design & Polish
3. Responsive Design Testing (Mobile/tablet/desktop with Playwright)
4. Accessibility Compliance (WCAG 2.2 AA)
5. User Experience & Interaction Quality
6. Cross-Browser Consistency
7. Design System & Code Quality

### Playwright MCP Tools

```javascript
// Navigation & Screenshots
mcp__playwright__browser_navigate(url)
mcp__playwright__browser_take_screenshot()
mcp__playwright__browser_resize(width, height)

// Interaction
mcp__playwright__browser_click(element)
mcp__playwright__browser_type(element, text)
mcp__playwright__browser_hover(element)

// Validation
mcp__playwright__browser_console_messages()
mcp__playwright__browser_snapshot()
mcp__playwright__browser_wait_for(text / element)
```

---

## Code Quality

**Before committing:**
```bash
pnpm run check  # Format check + lint
```

**Auto-fix:**
```bash
pnpm run lint:fix
pnpm run format
```

**Standards:**
- Use single quotes, no semicolons
- 2-space indentation, 100 char line width
- Tailwind classes auto-sorted by Prettier
- Imports auto-sorted by ESLint

**For detailed standards, see:**
- [Clean Code Principles](./architecture/clean-code.md) - SOLID, DRY, function best practices ⭐ NEW
- [TypeScript Standards](./components/typescript-standards.md)
- [Code Style](./design/code-style.md)
- [File Naming](./architecture/file-naming.md)

---

## Backend Integration (NestJS)

**API URL:** `http://localhost:3001`

**Configuration:** Set in `.env`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**API Communication:**
- All API calls via `/api/client.ts` base client
- Use React Query for data fetching, caching, synchronization
- Feature-specific API functions in `/features/[feature]/api/`

**For implementation details, see:** [Data Fetching](./components/data-fetching.md)

---

## MCP Tools

**Context7 MCP:** Fetch up-to-date documentation for libraries and frameworks.

---

## Quick Reference

**Need principles?** → [Core Principles](./quick-reference/core-principles.md)
**Need to decide?** → [Decision Trees](./quick-reference/decision-trees.md)
**Need to check quality?** → [Checklists](./quick-reference/checklists.md)
**Need clean code guidance?** → [Clean Code Principles](./architecture/clean-code.md) ⭐ NEW
**Need component patterns?** → [Components](./components/)
**Need design values?** → [Design](./design/)
**Need security guidance?** → [Security](./security/)

**Single Source of Truth:** [SSOT Mapping](./SINGLE_SOURCE_OF_TRUTH.md)

