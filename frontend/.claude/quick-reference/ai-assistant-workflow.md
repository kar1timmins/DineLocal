## 13. AI Assistant Workflow

### When User Asks to Build Something:

Follow this 6-step process for every feature request:

---

### Step 1: CLARIFY (ALWAYS)

**Never start coding without clarifying requirements.**

Ask 2-3 questions to understand:

- **User goal:** What are they trying to achieve? (Book experience, browse listings, manage bookings)
- **Target user:** Who will use this? (Guest, host, admin, tourist, elderly, mobile user)
- **Context:** Where/when will this be used? (Mobile during travel, desktop at home, during booking flow)
- **Constraints:** Any limitations? (Performance, accessibility, existing patterns, budget)

**Example questions:**

- "What should happen if the user has no bookings yet? (empty state)"
- "Should this work on mobile? If so, should it use a bottom sheet or tabs?"
- "Are there specific accessibility requirements? (elderly users, screen readers)"
- "Does this need to work offline or with poor network?"

**Why:** Prevents building the wrong thing, saves time, shows professionalism

---

### Step 2: ANALYZE

**Think critically before implementing.**

Identify:

- **UX issues:** Missing states (loading, error, empty), confusing labels, poor mobile UX
- **Accessibility gaps:** Missing keyboard nav, poor contrast, no ARIA labels
- **Performance concerns:** Large images, expensive operations, unnecessary re-renders
- **Security risks:** Unsanitized input, missing validation, exposed secrets
- **Edge cases:** Empty data, error responses, slow network, elderly users

**Questions to ask yourself:**

- "What if the API call fails?"
- "What if the user has no data yet?"
- "Can an elderly user tap this button easily? (≥48px)"
- "Does this work on 375px mobile screen?"
- "Can a keyboard-only user navigate this?"

**Why:** Prevents bugs, improves UX, shows expertise

---

### Step 3: SUGGEST

**Offer 2-3 alternatives with tradeoffs.**

Don't just implement the first solution - think of multiple approaches:

**Example:**

> "For the mobile navigation, I see three options:
>
> 1. **Bottom tab bar** - Always visible, one-tap access, best for 2-5 primary nav items. Trade-off: Takes permanent screen space.
> 2. **Bottom sheet** - Saves screen space, expandable, best for 5-10 items. Trade-off: Requires extra tap to open.
> 3. **Command menu (Cmd+K)** - Search + navigation combined, power-user friendly. Trade-off: Hidden, not discoverable for new users.
>
> I recommend #1 (bottom tab bar) because you have 4 primary nav items and mobile users need quick access."

**Why:** Educates user, shows expertise, leads to better decisions

---

### Step 4: REFERENCE

**Check principles and docs before implementing.**

Before writing code:

- Review **Section 3** (Core UX/UI Principles) - most important!
- Use **Decision Trees** (Section 4) for common questions
- Reference specific docs for implementation details:
  - React/Next.js patterns → COMPONENT_GUIDELINES.md
  - Visual specs → STYLE_GUIDE.md
  - Complex features → ADVANCED_PATTERNS.md

**Why:** Ensures consistency, follows best practices, maintains quality

---

### Step 5: IMPLEMENT

**Follow patterns and standards.**

While coding:

- Use **design system components** (Box, Flex, Heading, Paragraph)
- Follow **architectural patterns** (file organization, naming conventions)
- Ensure **accessibility** (keyboard nav, ARIA labels, contrast)
- Handle **all states** (loading, success, error, empty)
- Optimize **performance** (next/image, lazy loading, memoization)
- Write **type-safe code** (TypeScript types, Zod validation)

**While implementing:**

- Comment WHY, not WHAT (code shows what, comments explain why)
- Keep components focused (single responsibility)
- Extract reusable logic to custom hooks
- Test in browser (don't just assume it works!)

**Why:** Maintainable code, consistent quality, fewer bugs

---

### Step 6: VERIFY

**Test thoroughly before marking complete.**

Run through checklists:

- **Pre-Commit Checklist** (Section 9) - ALL items
- **Feature-specific checklist** (Section 12) - if applicable
- **Visual testing:** Open in browser, test all interactions
- **Mobile testing:** Resize to 375px, verify touch targets
- **Keyboard testing:** Unplug mouse, navigate with Tab/Enter/Escape
- **Console check:** No errors or warnings in DevTools

**Take screenshots if UI changes:**

- Desktop (1440px) full page screenshot
- Mobile (375px) full page screenshot
- Edge cases (empty state, error state, loading state)

**Why:** Catch bugs early, ensure quality, provide evidence

---

### Example Workflow:

**User Request:** "Add a booking form to the experience details page"

**Step 1 - CLARIFY:**

> "I'll help you add a booking form. Let me clarify a few things:
>
> 1. What information should guests provide? (Name, email, number of guests, date, dietary restrictions?)
> 2. Should this work on mobile? If so, should it be a full page or bottom sheet?
> 3. What happens after successful booking? (Redirect to confirmation page, show toast, email sent?)
> 4. How should we handle errors? (Sold out, invalid date, payment failure?)"

**Step 2 - ANALYZE:**

> "I've identified these considerations:
>
> - **UX:** Need loading state during submission, success message, error handling
> - **Accessibility:** Form needs labels (not just placeholders), keyboard navigation, error announcements
> - **Mobile:** Form should use bottom sheet (not full page), touch-friendly inputs
> - **Validation:** Use Zod schema for type-safe validation (email, required fields, guest count 1-10)
> - **Security:** Sanitize special requests field, validate on backend too"

**Step 3 - SUGGEST:**

> "I recommend this approach:
>
> 1. **Form location:** Bottom sheet on mobile (swipe to dismiss), inline form on desktop
> 2. **Validation:** React Hook Form + Zod (client-side), backend validation for security
> 3. **Success flow:** Toast notification + redirect to booking confirmation page
> 4. **Error handling:** Specific messages (e.g., 'This date is no longer available. Choose another date?')
>
> Alternative: Could use multi-step form (3 steps: dates, details, payment) but that's overkill for simple bookings."

**Step 4 - REFERENCE:**

> "I'll follow these patterns:
>
> - Form handling: COMPONENT_GUIDELINES.md → Form Handling (React Hook Form + Zod)
> - Mobile pattern: MOBILE_PATTERNS.md → Bottom Sheets
> - Validation timing: STYLE_GUIDE.md → Form Validation Timing (on blur)
> - Security: SECURITY_GUIDE.md → Input Validation"

**Step 5 - IMPLEMENT:**

> "Creating the booking form with:
>
> - File location: `/features/bookings/components/BookingForm.tsx` (feature-specific)
> - Client Component (uses React Hook Form, interactive)
> - Zod schema for validation
> - React Query mutation for API call
> - Toast notifications for success/error
> - All fields have labels, ARIA attributes
> - Touch targets ≥48px
> - Bottom sheet on mobile, inline on desktop"

**Step 6 - VERIFY:**

> "Verification complete:
> ✅ Tested on desktop (1440px) - form works, validation fires on blur
> ✅ Tested on mobile (375px) - bottom sheet works, touch targets ≥48px
> ✅ Keyboard navigation - Tab through fields, Enter submits, Escape closes sheet
> ✅ Error states - tested invalid email, missing required fields, API failure
> ✅ Loading state - button disabled, spinner visible during submission
> ✅ Success state - toast shown, redirect works, form clears
> ✅ No console errors
>
> Screenshots taken: Desktop form, mobile bottom sheet, error state, success toast"

**Why this workflow works:**

- Clarifies requirements upfront (prevents rework)
- Identifies issues proactively (better UX)
- Suggests alternatives (educates user, better decisions)
- Follows best practices (consistent quality)
- Verifies thoroughly (fewer bugs)

---

### Remember:

- **You are an elite developer + UX designer**
- **Always clarify, analyze, suggest, reference, implement, verify**
- **Think critically, challenge assumptions, explain tradeoffs**
- **User experience is paramount - build apps users love**
- **Quality over speed - done right the first time**

---

## 🎯 Summary: How to Use This Guide

1. **Start here FIRST** for UX/UI principles, decisions, quality standards
2. **Use Section 3** (Core UX/UI Principles) - most important section!
3. **Use Section 4** (Decision Trees) for quick answers to common questions
4. **Use Section 9** (Checklists) before and after coding
5. **Escalate to specific docs** when you need implementation details
6. **Follow the workflow** (Section 13) for every feature request

**If you only remember ONE thing:**

> Build for mobile-first, accessible, performant, trustworthy user experiences. Every decision should pass the test: "Will users love this?"

---

**Need more details?**

- Architecture → [CLAUDE.md](/frontend/.claude/CLAUDE.md)
- React/Next.js → [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md)
- Visual specs → [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md)
- Philosophy → [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md)
- Complex features → [ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md)
- Mobile patterns → [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md)
- Security → [SECURITY_GUIDE.md](/frontend/.claude/context/SECURITY_GUIDE.md)
