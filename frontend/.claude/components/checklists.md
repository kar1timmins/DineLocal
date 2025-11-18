## Component Creation Checklist

### Before Creating a Component

- [ ] **Check if it already exists** - Search `/components/shared` and `/components/ui`
- [ ] **Determine scope** - Feature-specific or shared?
- [ ] **Choose location** - `/features/[feature]/components` or `/components/shared`
- [ ] **Decide Server vs Client** - Does it need interactivity?
- [ ] **Plan props interface** - What data does it need?

### During Development

**1. Component Structure:**

- [ ] Named export for feature components, default for pages
- [ ] Props interface defined with TypeScript
- [ ] Single responsibility (does ONE thing well)
- [ ] Compound components for complex UI (e.g., Card, CardHeader, CardBody)

**2. TypeScript:**

- [ ] Explicit types for all props
- [ ] No `any` types used
- [ ] Return type specified for functions
- [ ] Generic types where appropriate

**3. Styling:**

- [ ] Uses Tailwind CSS (no inline styles)
- [ ] Uses design system components (`<Box>`, `<Flex>`, `<Heading>`)
- [ ] Uses `cn()` utility for conditional classes
- [ ] Responsive modifiers (`md:`, `lg:`)

**4. Accessibility:**

- [ ] Semantic HTML elements (`<button>`, `<nav>`, `<main>`)
- [ ] ARIA labels for icon-only buttons
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible (2px ring)
- [ ] Touch targets 48px+ height

**5. Performance:**

- [ ] Server Component by default (unless needs client features)
- [ ] Images use Next.js `<Image>` component
- [ ] Heavy components use `React.memo` if re-rendering often
- [ ] Expensive calculations use `useMemo`

**6. State Management:**

- [ ] Local state uses `useState`
- [ ] Side effects use `useEffect` with proper dependencies
- [ ] Data fetching uses React Query (`useQuery`, `useMutation`)
- [ ] Form state uses React Hook Form + Zod

**7. Error Handling:**

- [ ] Loading states handled (`isPending`, `isLoading`)
- [ ] Error states handled (show error message, retry button)
- [ ] Empty states handled (show helpful message)
- [ ] Wrapped in `<ErrorBoundary>` if can throw errors

### Before Committing

**Code Quality:**

- [ ] Component name matches file name (PascalCase)
- [ ] Imports organized by category
- [ ] No console.logs or commented code
- [ ] No TypeScript errors or warnings
- [ ] ESLint passes (`pnpm run lint`)

**Testing:**

- [ ] Manually tested in browser
- [ ] Tested at 375px, 768px, 1280px widths
- [ ] Tested with keyboard navigation
- [ ] Tested loading/error states

**Documentation:**

- [ ] JSDoc comment for complex components
- [ ] Props interface documented
- [ ] Usage example (if shared component)

---

## Code Quality Checklist

Before committing, ensure your component:

**TypeScript:**

- [ ] Uses TypeScript with explicit types (no `any`)
- [ ] All props have interface/type definition
- [ ] Functions have return types specified
- [ ] Uses utility types where appropriate (Partial, Pick, Omit)

**React Patterns:**

- [ ] Is a Server Component unless it needs client interactivity
- [ ] Uses functional components with hooks (not class components)
- [ ] Hooks called at top level (not in conditionals or loops)
- [ ] Custom hooks named with `use` prefix
- [ ] Uses composition over inheritance

**Performance:**

- [ ] Server Component for static content
- [ ] React.memo for expensive re-renders
- [ ] useMemo for expensive calculations
- [ ] useCallback for memoized callbacks
- [ ] Images optimized (Next.js Image, WebP, lazy load)

**State & Data:**

- [ ] React Query for API data fetching
- [ ] React Hook Form + Zod for forms
- [ ] Local state for UI-only state
- [ ] Context/Zustand for global state

**UI & Accessibility:**

- [ ] Handles loading, error, and empty states
- [ ] Follows naming conventions (PascalCase for components)
- [ ] Has proper prop validation
- [ ] Is accessible (semantic HTML, ARIA labels, keyboard nav)
- [ ] Touch targets 48px+ height
- [ ] Focus indicators visible (2px ring, 3:1 contrast)

**Code Quality:**

- [ ] Has single responsibility
- [ ] Follows project structure conventions
- [ ] No console.logs or commented code
- [ ] ESLint passes
- [ ] Is properly tested (if applicable)

**Styling:**

- [ ] Uses Tailwind CSS with design tokens
- [ ] Uses design system components (`<Box>`, `<Flex>`, `<Heading>`)
- [ ] Responsive (mobile-first approach)
- [ ] Consistent spacing (4px multiples)

---

## Quick Reference

**DineLocal Tech Stack Quick Reference:**

| Scenario               | Approach                                           |
| ---------------------- | -------------------------------------------------- |
| Need interactivity     | Use 'use client'                                   |
| Fetch data from NestJS | React Query (useQuery) in Client Component         |
| Mutations to NestJS    | React Query (useMutation)                          |
| Initial page data      | Server Component with async/await (optional)       |
| Form management        | React Hook Form + Zod validation                   |
| Form submission        | React Query useMutation + onSubmit handler         |
| Global state           | React Context or Zustand                           |
| Styling                | Tailwind CSS with OKLCH variables                  |
| UI components          | Shadcn/UI (raw in `/ui`) + customized in `/shared` |
| Component variants     | Class Variance Authority (CVA)                     |
| Images                 | Next.js Image component                            |
| Icons                  | Lucide React                                       |
| Error handling         | error.tsx boundaries + React Query error states    |
| Loading states         | loading.tsx, Suspense, or React Query isPending    |
| Validation             | Zod schema (client + server)                       |
| Toast notifications    | Sonner                                             |
| Date formatting        | Date-Fns                                           |
| Drawer component       | Vaul                                               |
| Command menu           | Cmdk                                               |
| Accessibility          | WCAG 2.2 AA (Shadcn/Radix provides baseline)       |

**For detailed UX/UI patterns, see:**

- 📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` - Comprehensive design guide with WCAG 2.2, marketplace patterns, loading states, and design checklists

---

## Advanced Patterns

**For complex implementation patterns, see:**

📖 **[ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md)** - Detailed guides for:

- Error Handling Patterns (Expected errors, error boundaries, React Query errors, API error handling)
- File Upload Patterns (React Dropzone, image compression, file validation)
- Payment Integration (Stripe Checkout, webhooks, security best practices)
- Real-Time Features (WebSockets vs SSE, implementation examples)
- Transactional Email Patterns (Resend + React Email, email templates)
- State Management Patterns (Zustand vs React Context, decision trees)
- Advanced API Patterns (Retry strategies, polling, dependent queries, optimistic updates)

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)

**Questions or Updates?**
Refer to the documentation hierarchy in [CLAUDE.md](/frontend/.claude/CLAUDE.md) for guidance on where to find specific information.
