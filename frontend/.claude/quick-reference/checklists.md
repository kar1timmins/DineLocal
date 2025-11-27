## 9. Quality Gates & Checklists

### Pre-Flight Checklist (BEFORE Writing Code):

Before you start coding, complete this checklist:

#### Understanding & Clarification:

- [ ] **Do I fully understand the requirement?** (If not, ask 2-3 clarifying questions)
- [ ] **Who is the target user?** (Host, guest, admin, tourist, elderly, mobile user)
- [ ] **What device/context?** (Mobile, desktop, during booking flow, browsing)
- [ ] **What are the constraints?** (Performance, accessibility, existing patterns)
- [ ] **What should happen in edge cases?** (Empty state, error state, loading state)

#### Component Discovery:

- [ ] **Have I checked for existing components?** (Search `/components/shared/`, Shadcn docs)
- [ ] **Can I reuse/extend existing component?** (Add variant/prop instead of creating new)
- [ ] **Where should this file go?** (Use Decision Tree 2)
- [ ] **Is this Server or Client Component?** (Use Decision Tree 1)

#### UX/UI Principles Review:

- [ ] **Have I considered mobile users?** (Touch targets, thumb zones, responsive)
- [ ] **Have I considered accessibility?** (Keyboard nav, screen readers, contrast)
- [ ] **Have I considered loading/error/empty states?** (Never show blank screen)
- [ ] **Have I considered performance?** (Image optimization, lazy loading)

#### Proactive Improvements:

- [ ] **Have I identified potential UX issues?** (Confusing labels, missing feedback)
- [ ] **Have I suggested 2-3 alternatives?** (Different approaches with tradeoffs)
- [ ] **Have I challenged assumptions?** (Is this the best way? Why this approach?)
- [ ] **Have I explained WHY?** (Not just WHAT I'm building)

---

### Pre-Commit Checklist (BEFORE Committing Code):

Before committing your code, verify ALL of these:

#### Mobile-Friendly:

- [ ] **Tested at 375px width** (iPhone SE - smallest common device)
- [ ] **Touch targets ≥48px** (Buttons, icons, list items)
- [ ] **Responsive layout** (Works on mobile, tablet, desktop)
- [ ] **No horizontal scrolling** (Unless intentional, like carousel)
- [ ] **Text readable without zooming** (≥16px base font size)
- [ ] **Navigation reachable with thumb** (Bottom navigation, not top)

#### Accessibility (WCAG 2.2 AA):

- [ ] **Keyboard navigation works** (Tab, Enter, Escape, Arrow keys)
- [ ] **Focus indicators visible** (Ring/outline around focused element)
- [ ] **Color contrast ≥4.5:1** (Text), ≥3:1 (UI components)
- [ ] **ARIA labels for icons** (`aria-label` or sr-only text)
- [ ] **Semantic HTML** (button, nav, main, article - not just div)
- [ ] **Alt text for images** (Descriptive, or `alt=""` if decorative)
- [ ] **Form labels above inputs** (Not just placeholders)
- [ ] **Error messages announced** (`aria-live="polite"`)

#### Performance:

- [ ] **Images use next/image** (Not `<img>` tag)
- [ ] **Images have width/height** (Prevents CLS - layout shift)
- [ ] **Hero image has priority** (`priority` prop for LCP)
- [ ] **No unnecessary re-renders** (useMemo/useCallback where needed)
- [ ] **No layout shift** (Test: reload page, does content jump?)
- [ ] **Lazy loading below fold** (Default with next/image)

#### UX - Feedback & States:

- [ ] **Loading states for async operations** (Spinner, skeleton, disabled button)
- [ ] **Error messages clear and actionable** (Specific, tell user how to fix)
- [ ] **Success feedback provided** (Toast notification, checkmark, confirmation)
- [ ] **Empty states helpful** (Message + CTA, not blank screen)
- [ ] **Disabled elements explained** (Why is button disabled? Tell the user!)

#### Security:

- [ ] **User input sanitized** (Use DOMPurify for HTML rendering)
- [ ] **Form validation with Zod** (Type-safe, secure validation)
- [ ] **No secrets hardcoded** (Use environment variables)
- [ ] **No dangerouslySetInnerHTML** (Unless sanitized with DOMPurify)
- [ ] **CSRF tokens for mutations** (Use @edge-csrf/nextjs)

#### Code Quality:

- [ ] **Using design system components** (Box, Flex, Heading, Paragraph - not raw HTML)
- [ ] **TypeScript types defined** (Props, API responses, function params)
- [ ] **No console.logs** (Remove debug statements)
- [ ] **No TypeScript errors** (Run `pnpm run build` or check IDE)
- [ ] **No ESLint warnings** (Run `pnpm run lint`)
- [ ] **Imports organized** (Types first, external, internal, components, utils)

#### Visual Verification:

- [ ] **Tested in browser** (Not just assumed - actually open and test!)
- [ ] **No console errors** (Check browser DevTools)
- [ ] **Matches design system** (Colors, spacing, typography)
- [ ] **Hover/focus states work** (Test all interactive elements)

---

### Pre-PR Checklist (BEFORE Creating Pull Request):

Before creating a PR, complete these additional checks:

#### Comprehensive Testing:

- [ ] **All Pre-Commit checks passed** (Review checklist above)
- [ ] **Tested across breakpoints** (Mobile 375px, Tablet 768px, Desktop 1024px+)
- [ ] **Tested with keyboard only** (Unplug mouse, navigate entire flow)
- [ ] **Tested with screen reader** (If possible: macOS VoiceOver, NVDA, JAWS)
- [ ] **Tested in multiple browsers** (Chrome, Firefox, Safari minimum)
- [ ] **Tested edge cases** (Empty data, error responses, slow network)

#### Code Quality:

- [ ] **No TypeScript errors** (`pnpm run build` succeeds)
- [ ] **ESLint passes** (`pnpm run lint` succeeds)
- [ ] **No console errors/warnings** (Check browser DevTools)
- [ ] **Code follows conventions** (File naming, component structure)
- [ ] **Imports use path aliases** (`@/components/...` not `../../components/...`)

#### Documentation:

- [ ] **Documentation updated** (If needed - new patterns, APIs, components)
- [ ] **Comments explain WHY** (Not WHAT - code shows what, comments explain why)
- [ ] **Complex logic documented** (Help future developers understand)

#### Visual Evidence:

- [ ] **Screenshots taken** (If UI change - show before/after)
- [ ] **Desktop screenshot** (1440px viewport)
- [ ] **Mobile screenshot** (375px viewport)
- [ ] **Edge case screenshots** (Empty state, error state, loading state)

#### Performance:

- [ ] **Lighthouse score checked** (Run in Chrome DevTools)
- [ ] **Core Web Vitals in "Good" range** (LCP <2.5s, INP <200ms, CLS <0.1)
- [ ] **Bundle size acceptable** (No huge increases)

---

### What Makes a Component "Done"?

A component is only "done" when it meets ALL of these criteria:

1. **Functionality:** Works as intended, all user flows tested
2. **Accessibility:** WCAG 2.2 AA compliant, keyboard nav, screen reader support
3. **Mobile:** Works on 375px+ screens, touch targets ≥48px, responsive
4. **Performance:** No unnecessary re-renders, images optimized, CLS score <0.1
5. **UX:** Clear feedback for all states (loading, success, error, empty)
6. **Code Quality:** Type-safe, no errors/warnings, follows conventions
7. **Consistency:** Matches design system, uses design tokens, consistent patterns
8. **Tested:** Verified in browser, tested edge cases, no console errors

**If ANY of the above is missing, the component is NOT done.**

---
