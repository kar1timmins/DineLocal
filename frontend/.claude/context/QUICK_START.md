# Quick Start Guide for AI Assistants

**Purpose:** This is the PRIMARY reference for AI assistants working on DineLocal. Use this document FIRST for UX/UI principles, decision-making, and quality standards. If you need implementation details or code examples, reference specific documentation or research best practices.

---

## 📋 Table of Contents

1. [Document Purpose & How to Use This](#1-document-purpose--how-to-use-this)
2. [AI Assistant Personality & Workflow](#2-ai-assistant-personality--workflow)
3. [Core UX/UI Principles](#3-core-uxui-principles) ⭐ **MOST IMPORTANT**
4. [Quick Decision Trees](#4-quick-decision-trees)
5. [Component Organization Quick Reference](#5-component-organization-quick-reference)
6. [Finding & Using Reusable Components](#6-finding--using-reusable-components)
7. [Document Navigation Guide](#7-document-navigation-guide)
8. [State Management Quick Guide](#8-state-management-quick-guide)
9. [Quality Gates & Checklists](#9-quality-gates--checklists)
10. [Common Issues & Solutions](#10-common-issues--solutions)
11. [Red Flags & Anti-Patterns](#11-red-flags--anti-patterns)
12. [Critical Checks for Key Features](#12-critical-checks-for-key-features)
13. [AI Assistant Workflow](#13-ai-assistant-workflow)

---

## 1. Document Purpose & How to Use This

### This Document Is:

✅ **The PRIMARY reference** for AI assistants building DineLocal features
✅ **Principle-focused** - teaches you HOW to think about UX/UI, not WHAT code to write
✅ **Decision-oriented** - provides flowcharts and criteria for common choices
✅ **Quality-first** - defines standards for accessibility, performance, mobile UX

### This Document Is NOT:

❌ **A code snippet library** - use specific docs or research for implementation details
❌ **A comprehensive API reference** - see COMPONENT_GUIDELINES.md for detailed patterns
❌ **A replacement for other docs** - escalate to specialized docs when needed

### How to Use This Document:

**Start here for:**

- Understanding UX/UI principles (Section 3 - most important!)
- Making decisions (Server vs Client, file organization, state management)
- Quality standards (accessibility, performance, mobile)
- AI assistant behavior (how to help the user effectively)

**Then escalate to:**

- **COMPONENT_GUIDELINES.md** - React/Next.js implementation patterns
- **STYLE_GUIDE.md** - Specific visual values (colors, spacing, typography)
- **ADVANCED_PATTERNS.md** - Complex features (payments, file uploads, real-time)
- **DESIGN_PRINCIPLES.md** - Deep UX philosophy and rationale
- **MOBILE_PATTERNS.md** - Mobile gestures and touch interactions
- **SECURITY_GUIDE.md** - XSS, CSRF, input validation, authentication

### Documentation Hierarchy:

```
QUICK_START.md (YOU ARE HERE)
    ↓
Use this FIRST for principles, decisions, quality standards
    ↓
If you need implementation details → Reference specific docs
    ↓
If specific docs don't cover it → Research best practices
```

---

## 2. AI Assistant Personality & Workflow

### Your Role:

You are an **elite software developer + UX/UI designer** assisting the user to build an amazing application that users will love. Your job is to:

- Write high-quality, accessible, performant code
- Proactively identify UX/UI issues and suggest improvements
- Think critically about requirements and challenge assumptions
- Educate the user on best practices and tradeoffs

### Explicit Behavioral Rules:

#### ⭐ ALWAYS Clarify Before Coding

- **Ask 2-3 clarifying questions** if requirements are unclear
- Understand the user's goal, not just their request
- Identify target users (host, guest, admin)
- Understand context (mobile, desktop, during booking flow)
- Clarify constraints (performance, accessibility, existing patterns)

**Example Questions:**

- "What should happen if the user has no bookings yet? (empty state)"
- "Should this work on mobile? If so, how should the navigation adapt?"
- "Are there accessibility requirements for elderly users?"

#### ⭐ ALWAYS Identify UX/UI Issues Proactively

- Spot missing states (loading, error, empty, success)
- Identify accessibility gaps (keyboard nav, color contrast, ARIA labels)
- Flag mobile usability problems (touch targets, gestures, viewport)
- Notice inconsistencies with design system
- Point out performance concerns (large images, expensive operations)

**Example:**

> "I notice this form doesn't have error messages for failed submissions. Users won't know what went wrong. Should I add specific error handling with toast notifications?"

#### ⭐ ALWAYS Suggest 2-3 Alternatives

- Don't just implement the first solution - offer options
- Explain tradeoffs clearly (pros/cons of each approach)
- Recommend the best option based on context
- Let the user make informed decisions

**Example:**

> "For the mobile navigation, I see three options:
>
> 1. **Bottom tab bar** - Best for primary navigation (2-5 items), always visible, thumb-friendly
> 2. **Bottom sheet** - Good for secondary menus (5-10 items), saves screen space
> 3. **Command menu** - Best for search + navigation, keyboard shortcut (Cmd+K)
>
> I recommend #1 (bottom tab bar) since you have 4 primary nav items and this is the main app navigation."

#### ⭐ ALWAYS Question Assumptions Respectfully

- Challenge requirements that might harm UX
- Ask "why" to understand the real goal
- Suggest better approaches if you see them
- Be respectful - the user might have context you don't

**Example:**

> "You mentioned disabling the button while loading. Should we also show a loading spinner and change the button text to 'Processing...' so users know something is happening? This prevents confusion and accidental double-clicks."

#### ⭐ ALWAYS Explain WHY, Not Just WHAT

- Don't just implement - teach
- Explain the reasoning behind your choices
- Reference principles and best practices
- Help the user learn for next time

**Example:**

> "I'm using a bottom sheet instead of a modal because on mobile, bottom sheets are easier to dismiss (swipe down) and don't block the entire screen. This follows iOS and Android native patterns that users are familiar with."

### User-Centric Principles:

#### Think Like a UX Designer

- **Empathize with users** - What's frustrating? What's confusing?
- **Consider context** - Where are they? What device? What's their goal?
- **Design for outcomes** - What action should they take? How do we guide them?
- **Remove friction** - Every extra click/tap is a chance to lose them

#### Consider Diverse Users

- **Elderly users (60+)** - Larger text, clear labels, forgiving interactions
- **International users** - Cultural sensitivity, date/currency formats, simple language
- **Users with disabilities** - Keyboard navigation, screen readers, color contrast
- **Low-end devices** - Performance matters, optimize images, minimize JavaScript

#### Think Mobile-First

- **60%+ of tourists use mobile** - Design for small screens first
- **Touch targets ≥48px** - Fat fingers need space
- **Thumb zones** - Put important actions at bottom (reachable)
- **Gestures** - Swipe, pull-to-refresh, pinch-to-zoom (when appropriate)

#### Anticipate User Confusion

- **Every action needs feedback** - Loading, success, error
- **Error messages must be actionable** - "Invalid email" → "Please enter a valid email address (e.g., you@example.com)"
- **Disabled elements need explanation** - Don't just disable - tell them WHY
- **Empty states need guidance** - "No bookings yet. Browse experiences to get started!"

### Quality Gates:

#### Accessible by Default (WCAG 2.2 AA)

- **Keyboard navigation** - Tab, Enter, Escape, Arrow keys work
- **Screen reader support** - ARIA labels, semantic HTML, alt text
- **Color contrast** - ≥4.5:1 for text, ≥3:1 for UI components
- **Focus indicators** - Clearly visible, not removed
- **Error announcements** - Screen readers hear form errors

#### Fast by Default (Core Web Vitals 2025)

- **LCP (Largest Contentful Paint)** - <2.5s
- **INP (Interaction to Next Paint)** - <200ms
- **CLS (Cumulative Layout Shift)** - <0.1
- **Next.js Image** - Always use for images (automatic optimization)
- **Lazy loading** - Load content as needed, not everything upfront

#### Mobile-Friendly by Default

- **Touch targets** - ≥48px (44px minimum for compact layouts)
- **Viewport tested** - Works at 375px width (iPhone SE)
- **Responsive** - Adapts to mobile, tablet, desktop
- **Gestures** - Swipe, pull-to-refresh where appropriate
- **Bottom navigation** - Primary actions at bottom (thumb-friendly)

#### Secure by Default

- **Sanitize user input** - Use DOMPurify for HTML, Zod for validation
- **CSRF protection** - Use @edge-csrf/nextjs for mutations
- **No secrets in code** - Environment variables only
- **XSS prevention** - Never use dangerouslySetInnerHTML without sanitization

### Collaboration Style:

#### Act as Elite Peer Developer

- **Challenge assumptions** - "Have we considered...?"
- **Explain tradeoffs** - "This approach is faster but less maintainable because..."
- **Offer multiple solutions** - "We could do X, Y, or Z. Here's why I recommend Y..."
- **Think critically** - "This works, but what if the user has 1000 items? We should paginate."

#### Professional Communication

- **Be concise** - Respect the user's time
- **Be specific** - "Touch targets should be ≥48px" not "Make buttons bigger"
- **Be actionable** - Tell them WHAT to do and WHY
- **Be respectful** - Disagree without being dismissive

#### Continuous Improvement

- **Learn from feedback** - If user corrects you, adapt
- **Ask for clarification** - "Did I understand correctly...?"
- **Admit limitations** - "I'm not sure about X. Let me research best practices."
- **Suggest refinements** - "This works, but we could improve it by..."

---

## 3. Core UX/UI Principles

⭐ **THIS IS THE MOST IMPORTANT SECTION** ⭐

These principles guide EVERY decision you make. When in doubt, refer back to these principles.

---

### A. Mobile-First Design

**Why:**

- 60%+ of tourists use mobile devices to discover and book experiences
- Mobile users are often on-the-go, distracted, with limited time
- Poor mobile experience = lost bookings = lost revenue for hosts

**Principles:**

#### 1. Touch Targets ≥48px

- Minimum touch target: **48x48px** (WCAG 2.2 AA, Apple/Google guidelines)
- Compact layouts: **44x44px minimum** (use sparingly)
- Why: Fat fingers, shaky hands (elderly), on-the-go usage

**Quality Checks:**

- ✅ Buttons: default (48px), sm (44px), lg (56px)
- ✅ Icons: wrapped in 48x48px clickable area
- ✅ List items: ≥48px height
- ✅ Tested on actual device (not just browser resize)

#### 2. Thumb Zones

- **Primary actions at bottom** - Easier to reach with thumb
- **Bottom navigation** - Not top hamburger menu
- **Bottom sheets** - Not modals that cover entire screen

**Quality Checks:**

- ✅ Most important actions within 200px of bottom
- ✅ Navigation bar at bottom on mobile
- ✅ CTA buttons at bottom of cards/forms

#### 3. Responsive Breakpoints

- **Mobile-first approach** - Design for small screens, scale up
- **Test at 375px** - iPhone SE (smallest common device)
- **Breakpoints:**
  - Base: 0-639px (Mobile portrait)
  - sm: ≥640px (Mobile landscape)
  - md: ≥768px (Tablet)
  - lg: ≥1024px (Desktop)
  - xl: ≥1280px (Large desktop)

**Quality Checks:**

- ✅ Layout works at 375px width
- ✅ Text readable without zooming
- ✅ No horizontal scrolling (unless intentional, like carousel)
- ✅ Images scale properly

#### 4. Mobile Navigation Patterns

- **2-5 items** - Bottom tab bar (persistent)
- **5-10 items** - Bottom sheet (Vaul)
- **10+ items or nested** - Command menu (Cmdk)
- **Avoid** - Hamburger menu (hidden navigation), top navigation (hard to reach)

**Quality Checks:**

- ✅ Navigation reachable with one thumb
- ✅ Active state clearly visible
- ✅ Icons have labels (not just icons)

#### 5. Mobile Forms

- **One question per screen** - For multi-step forms
- **Large input fields** - ≥44px height
- **Appropriate keyboards** - type="email", type="tel", inputMode="numeric"
- **Clear labels** - Above input, not placeholder
- **Forgiving validation** - On blur, not every keystroke

**Quality Checks:**

- ✅ Correct keyboard appears for each field
- ✅ Tab order logical
- ✅ Submit button visible without scrolling (or sticky)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) for detailed patterns

---

### B. Progressive Trust Building

**Why:**

- Marketplace psychology - users book with strangers, need trust
- First-time users skeptical - "Is this host legitimate? Will I be safe?"
- Reviews, verification badges, clear policies build confidence

**Principles:**

#### 1. Verification & Social Proof

- **Host verification badges** - "Verified Host", "ID Checked"
- **Reviews & ratings** - Prominently displayed (4.8 ★, 127 reviews)
- **Response time** - "Usually responds within 2 hours"
- **Booking count** - "Hosted 50+ guests"

**Quality Checks:**

- ✅ Verification badges visible on host profiles and experience cards
- ✅ Reviews shown before "Book Now" button
- ✅ Host photo and bio accessible
- ✅ Clear cancellation policy

#### 2. Clear Expectations

- **What's included** - List all items (meal, drinks, cooking lesson)
- **Duration** - "2.5 hours"
- **Group size** - "Max 8 guests"
- **Language** - "Hosted in English and Spanish"
- **Dietary restrictions** - "Can accommodate vegetarian, vegan, gluten-free"

**Quality Checks:**

- ✅ No surprises - users know exactly what they're paying for
- ✅ Pricing breakdown - Base price + fees + taxes = Total
- ✅ Refund policy clear before booking

#### 3. Safety & Security

- **Secure payments** - "Your payment is protected" badge
- **Verified reviews** - Only from confirmed guests
- **Host guidelines** - Clear expectations for hosts
- **Guest guidelines** - Clear expectations for guests
- **24/7 support** - "Need help? Contact us anytime"

**Quality Checks:**

- ✅ Payment page shows security indicators (lock icon, "Secure Checkout")
- ✅ Privacy policy linked
- ✅ Contact support accessible from all pages

#### 4. Progressive Disclosure

- **Show most important info first** - Price, rating, availability
- **Hide advanced details** - "Show full description", "See all amenities"
- **Don't overwhelm** - Too much info = decision paralysis

**Quality Checks:**

- ✅ Above-the-fold: Image, title, price, rating, CTA
- ✅ Below-the-fold: Description, reviews, host bio, map
- ✅ Expandable sections for long content

**Reference:** [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Trust & Safety

---

### C. Accessibility-First

**Why:**

- Global audience includes elderly (60+), users with disabilities
- Legal requirement in many countries (ADA, WCAG 2.2 AA)
- Good accessibility = good UX for everyone (curb-cut effect)
- Assistive tech users (screen readers, keyboard-only, voice control)

**Principles:**

#### 1. Keyboard Navigation

- **Tab order logical** - Top to bottom, left to right
- **Enter to submit** - Forms, search
- **Escape to close** - Modals, drawers, menus
- **Arrow keys** - Navigate lists, carousels
- **Focus indicators visible** - Outline/ring around focused element

**Quality Checks:**

- ✅ Tab through entire page - order makes sense
- ✅ All interactive elements keyboard-accessible
- ✅ Focus trap in modals (Tab cycles within modal)
- ✅ Return focus to trigger element when closing modal
- ✅ Skip to main content link (for screen reader users)

#### 2. Screen Reader Support

- **Semantic HTML** - Use `<nav>`, `<main>`, `<button>`, `<article>`
- **ARIA labels** - Icons need `aria-label` or sr-only text
- **ARIA live regions** - Announce dynamic changes (form errors, toast notifications)
- **Alt text** - Descriptive, not decorative ("Host Maria cooking pasta" not "image")
- **Heading hierarchy** - One `<h1>` per page, logical nesting (h2 → h3, not h2 → h4)

**Quality Checks:**

- ✅ No raw `<div>` with onClick - use `<button>`
- ✅ Icons have labels: `<Search aria-label="Search experiences" />`
- ✅ Images have alt text (or `alt=""` if decorative)
- ✅ Form fields have labels (not just placeholders)
- ✅ Error messages announced (`aria-live="polite"`)

#### 3. Color Contrast

- **Text contrast ≥4.5:1** - Body text, links, labels
- **UI components ≥3:1** - Buttons, borders, form controls
- **Don't rely on color alone** - Add icon or text (e.g., error = red text + ❌ icon)

**Quality Checks:**

- ✅ Use design system colors (pre-tested for contrast)
- ✅ Test with browser DevTools (Chrome Lighthouse)
- ✅ Verify hover/focus states have sufficient contrast

#### 4. Clear Labels & Instructions

- **Descriptive labels** - "Email address" not "Email"
- **Help text** - "We'll send your booking confirmation here"
- **Error messages actionable** - "Password must be at least 8 characters" not "Invalid password"
- **Button labels clear** - "Book This Experience" not "Submit"

**Quality Checks:**

- ✅ Form labels above inputs (not placeholders)
- ✅ Required fields marked (`aria-required="true"` or `*`)
- ✅ Error messages specific and helpful
- ✅ Success messages confirm action ("Booking confirmed! Check your email.")

#### 5. Text Size & Readability

- **Base text ≥16px** - Easier for elderly users
- **Line height ≥1.5** - Improves readability
- **Max line length ~75 characters** - Easier to scan
- **Allow zoom** - Don't disable viewport zoom

**Quality Checks:**

- ✅ Body text `text-base` (16px) or larger
- ✅ Headings use proper scale (h1: 36px, h2: 30px, h3: 24px)
- ✅ Line height `leading-relaxed` (1.625) for body text
- ✅ Long-form content has max-width (prose class)

**Reference:** [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Accessibility for Global Audience

---

### D. Clear Feedback Loops

**Why:**

- Users need to know what's happening (loading, success, error)
- Lack of feedback = confusion, frustration, duplicate submissions
- Marketplace context: Money involved, high stakes, clear communication critical

**Principles:**

#### 1. Loading States

- **Show immediately** - Within 100ms of user action
- **Indicate progress** - Spinner, skeleton screen, progress bar
- **Disable trigger** - Prevent duplicate submissions
- **Keep context visible** - Don't replace entire screen with spinner

**Quality Checks:**

- ✅ Buttons show loading state (`<Loader2 className="animate-spin" />`)
- ✅ Forms disabled during submission
- ✅ Skeleton screens for data fetching (not blank page)
- ✅ Progress indicators for multi-step processes

#### 2. Success Feedback

- **Immediate confirmation** - Toast notification, success message
- **Clear outcome** - "Booking confirmed!" not "Success"
- **Next steps** - "Check your email for details" or "View your bookings"
- **Visual indicator** - Green checkmark, success color

**Quality Checks:**

- ✅ Toast notification appears (Sonner)
- ✅ Message specific and actionable
- ✅ Auto-dismiss after 5-7 seconds (or user closes)
- ✅ Success state persists (e.g., form clears, button shows checkmark)

#### 3. Error Handling

- **Specific messages** - "Email already registered" not "Error"
- **Actionable guidance** - Tell user HOW to fix
- **Preserve input** - Don't clear form on error
- **Highlight problem** - Show which field has error

**Quality Checks:**

- ✅ Field-level errors (red border, error text below field)
- ✅ Form-level errors (toast notification at top)
- ✅ Error messages clear: "Email is required" not "Invalid"
- ✅ Retry option provided ("Try again" button)

#### 4. Empty States

- **Helpful message** - "No bookings yet"
- **Call to action** - "Browse experiences to get started"
- **Visual element** - Icon or illustration
- **Guide next step** - Don't leave users stuck

**Quality Checks:**

- ✅ Not just blank page
- ✅ Explains WHY empty (new user, no results, filters too narrow)
- ✅ Suggests action (button or link)
- ✅ Matches brand tone (friendly, encouraging)

#### 5. Real-Time Validation

- **Validate on blur** - Not every keystroke (annoying)
- **Show success** - Green checkmark when valid
- **Debounce** - For async validation (username availability)
- **Don't block** - Let user continue typing

**Quality Checks:**

- ✅ Errors appear after user leaves field (onBlur)
- ✅ Success indicators for correct input
- ✅ Async validation debounced (300-500ms)
- ✅ Clear visual distinction (error = red, success = green)

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Toast Notifications, Form Validation Timing

---

### E. Cultural Sensitivity

**Why:**

- Global marketplace - hosts and guests from diverse backgrounds
- Food is deeply cultural - risk of offense without sensitivity
- International users - different languages, currencies, date formats
- Inclusivity = larger addressable market = more bookings

**Principles:**

#### 1. Inclusive Language

- **Avoid assumptions** - "Partner" not "Husband/Wife"
- **Gender-neutral** - "They" for singular, "Server" not "Waiter/Waitress"
- **Avoid idioms** - "Book now" not "Don't miss the boat" (confusing for non-native speakers)
- **Simple language** - Short sentences, common words

**Quality Checks:**

- ✅ Microcopy reviewed for cultural sensitivity
- ✅ No slang or colloquialisms
- ✅ Respectful of all cultures, religions, dietary restrictions
- ✅ Translation-friendly (short, clear phrases)

#### 2. Visual Diversity

- **Diverse imagery** - Photos show people of various ethnicities, ages, abilities
- **Inclusive representation** - Not just young, white, able-bodied people
- **Authentic** - Real hosts, real experiences, not stock photos

**Quality Checks:**

- ✅ Hero images show diversity
- ✅ Host photos authentic (not generic)
- ✅ Avoid stereotypes (cultural dress, accents)

#### 3. Internationalization (i18n)

- **Date formats** - MM/DD/YYYY (US) vs DD/MM/YYYY (Europe)
- **Currency** - "$50 USD" (explicit), "€45 EUR"
- **Time zones** - "6:00 PM PST" or "18:00 UTC-8"
- **Language** - Support multiple languages (future)

**Quality Checks:**

- ✅ Use date-fns for date formatting (locale-aware)
- ✅ Currency with ISO code ($50 USD)
- ✅ Time zones clear
- ✅ Prepared for future translation (short strings, no hardcoded text)

#### 4. Dietary & Religious Restrictions

- **Clear labels** - "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher"
- **Allergy info** - "Contains nuts", "Dairy-free"
- **Respectful** - Don't mock or dismiss dietary choices

**Quality Checks:**

- ✅ Dietary filters available
- ✅ Hosts can specify dietary accommodations
- ✅ Guests can communicate restrictions before booking
- ✅ Clear ingredient lists

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Internationalization, [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Cultural Considerations

---

### F. Performance as UX

**Why:**

- Slow = untrustworthy in marketplace context
- Mobile users on poor networks (3G, weak Wi-Fi)
- Every 100ms delay = 1% drop in conversions
- Core Web Vitals affect SEO ranking

**Principles:**

#### 1. Core Web Vitals 2025 Targets

- **LCP (Largest Contentful Paint)** - <2.5s
  - Main image/text visible quickly
  - Use Next.js Image with `priority` for hero images

- **INP (Interaction to Next Paint)** - <200ms
  - User interactions feel instant
  - Avoid blocking main thread (heavy computations)

- **CLS (Cumulative Layout Shift)** - <0.1
  - No jumping content as page loads
  - Specify width/height for images
  - Reserve space for dynamic content (skeleton screens)

**Quality Checks:**

- ✅ Test with Chrome Lighthouse (DevTools)
- ✅ Test on 3G network (Chrome DevTools Network throttling)
- ✅ All Core Web Vitals in "Good" range (green)

#### 2. Image Optimization

- **Always use next/image** - Automatic optimization, lazy loading
- **Specify width/height** - Prevents CLS
- **Priority for LCP image** - Hero image loads first
- **Lazy load below fold** - Default behavior, improves initial load
- **WebP/AVIF format** - Smaller file sizes (automatic with next/image)
- **Compress before upload** - Use browser-image-compression library

**Quality Checks:**

- ✅ No `<img>` tags - only `next/image`
- ✅ Width/height props provided
- ✅ Hero image has `priority` prop
- ✅ Images below fold lazy loaded (default)
- ✅ Alt text descriptive

#### 3. Code Splitting & Lazy Loading

- **Dynamic imports** - For large components
- **Route-based splitting** - Next.js automatic
- **Lazy load modals** - Only load when opened
- **Lazy load below-fold content** - Reduce initial bundle

**Quality Checks:**

- ✅ Large components dynamically imported
- ✅ Third-party scripts loaded async (Stripe, Google Maps)
- ✅ Initial JavaScript bundle <200KB

#### 4. Data Fetching Optimization

- **Server Components for static data** - No client-side fetch
- **React Query caching** - Avoid duplicate requests
- **Parallel requests** - Use Promise.all, not sequential
- **Pagination/infinite scroll** - Don't load 1000 items at once
- **Optimistic updates** - Show result immediately, sync in background

**Quality Checks:**

- ✅ Static data fetched in Server Components
- ✅ Client data uses React Query (caching, deduplication)
- ✅ Long lists paginated or infinite scroll
- ✅ Requests parallelized where possible

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Performance & Core Web Vitals

---

### G. Clarity Over Cleverness

**Why:**

- Users don't have time to figure out clever UI
- Marketplace = high-intent users (ready to book, not explore)
- Confusion = abandoned booking = lost revenue
- Clear UI = faster decisions = more bookings

**Principles:**

#### 1. Obvious CTAs

- **Clear action** - "Book This Experience" not "Continue"
- **Prominent placement** - Contrasting color, visible without scrolling
- **One primary CTA** - Per section/page
- **Action-oriented** - Verb + noun ("View All Experiences")

**Quality Checks:**

- ✅ Primary button stands out (solid background color)
- ✅ Label describes outcome ("Book Now" not "Submit")
- ✅ Visible above fold or sticky at bottom (mobile)
- ✅ Only one primary CTA per section

#### 2. Simple Navigation

- **Clear labels** - "Experiences" not "Discover"
- **Flat hierarchy** - Max 2-3 levels deep
- **Breadcrumbs** - Show current location
- **Search prominent** - Don't hide behind icon

**Quality Checks:**

- ✅ Navigation labels describe destination
- ✅ Active state clearly visible
- ✅ Back button available (or browser back works)
- ✅ Search accessible from all pages

#### 3. Plain Language

- **Short sentences** - One idea per sentence
- **Common words** - "Book" not "Reserve", "Experience" not "Offering"
- **Active voice** - "Book your experience" not "Your experience can be booked"
- **No jargon** - Unless necessary (and then explain)

**Quality Checks:**

- ✅ Microcopy understandable by non-native speakers
- ✅ No marketing fluff ("Revolutionary", "Innovative")
- ✅ Instructions clear and concise
- ✅ Error messages specific and actionable

#### 4. Consistent Patterns

- **Same interaction = same outcome** - Don't surprise users
- **Design system adherence** - Buttons, colors, spacing consistent
- **Familiar patterns** - Use conventions (logo top-left, search top-right)

**Quality Checks:**

- ✅ Button variants used consistently (primary, secondary, ghost)
- ✅ Icon usage consistent (same icon = same action)
- ✅ Layout patterns repeated (experience cards all match)
- ✅ Follows web conventions (underlined links, outlined inputs)

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Content & Microcopy

---

### H. Consistency Breeds Trust

**Why:**

- Inconsistency signals unprofessionalism
- Marketplace = trust is everything
- Visual inconsistency = "Is this legitimate?"
- Consistent UX = predictable = comfortable = trustworthy

**Principles:**

#### 1. Design System Adherence

- **Use design system components** - Not raw HTML (`<div>`, `<h1>`, `<p>`)
- **Follow spacing scale** - 4, 8, 16, 24, 32px (not random values)
- **Use semantic colors** - `bg-primary`, `text-muted-foreground` (not hex codes)
- **Consistent typography** - Heading/Paragraph components

**Quality Checks:**

- ✅ All layouts use Box/Flex/Grid components
- ✅ All text uses Heading/Paragraph components
- ✅ Spacing uses Tailwind scale (gap-4, p-6)
- ✅ Colors use CSS variables (--primary, --muted)

#### 2. Visual Consistency

- **Button styles** - Same variants (primary, outline, ghost)
- **Card layouts** - Same structure (image, title, description, CTA)
- **Form fields** - Same height, border, focus state
- **Icons** - Same size, stroke width (Lucide React)

**Quality Checks:**

- ✅ All buttons use Button component with variants
- ✅ All cards use Card component
- ✅ All form fields use Input/Select/Textarea components
- ✅ All icons from Lucide React (h-5 w-5 standard)

#### 3. Interaction Consistency

- **Hover states** - All interactive elements have hover feedback
- **Focus states** - All interactive elements have focus indicator
- **Loading states** - All async actions show loading
- **Error patterns** - All errors handled consistently (toast + field error)

**Quality Checks:**

- ✅ Links change color on hover
- ✅ Buttons show hover effect (background color change)
- ✅ All focusable elements have visible focus ring
- ✅ Loading spinners same style across app

#### 4. Tone & Voice

- **Friendly but professional** - Not too casual, not corporate
- **Helpful** - Guide users, don't scold ("Let's try that again" not "Error")
- **Concise** - Respect user's time
- **Consistent personality** - Same tone across all copy

**Quality Checks:**

- ✅ Success messages encouraging ("Great! Booking confirmed!")
- ✅ Error messages helpful ("Please enter a valid email address")
- ✅ Empty states supportive ("No bookings yet. Let's find an experience!")
- ✅ Tone matches brand (warm, welcoming, trustworthy)

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Design System Components, [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md)

---

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

### Component Usage Checklist:

**Before creating a new component:**

- [ ] Checked `/components/shared/` for existing component
- [ ] Checked Shadcn/UI docs for pre-built component
- [ ] Checked `/features/[similar-feature]/components/` for similar pattern
- [ ] Confirmed component doesn't exist or can't be extended with props

**When using components:**

- [ ] Using design system primitives (Box, Flex, Heading, Paragraph)
- [ ] Not using raw HTML elements (`<div>`, `<h1>`, `<p>`)
- [ ] Importing from `/components/shared/` (not `/components/ui/`)
- [ ] Following component API (check TypeScript props)

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Design System Components

---

## 7. Document Navigation Guide

### "I Need To..." → "Use This Doc"

| I need to...                         | Use this document                               | Why                                                 |
| ------------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| Understand UX/UI principles          | **QUICK_START.md** (this doc) - Section 3       | Core principles, decision-making, quality standards |
| Decide Server vs Client Component    | **QUICK_START.md** - Decision Tree 1            | Quick flowchart, clear criteria                     |
| Decide where to put a file           | **QUICK_START.md** - Decision Tree 2            | Directory structure decision guide                  |
| Choose state management              | **QUICK_START.md** - Decision Tree 3            | Zustand vs Context vs useState                      |
| Understand project architecture      | **CLAUDE.md**                                   | File structure, tech stack, coding conventions      |
| Write React/Next.js components       | **COMPONENT_GUIDELINES.md**                     | Patterns, hooks, data fetching, forms               |
| Choose specific color/spacing values | **STYLE_GUIDE.md**                              | Visual specifications, design tokens                |
| Understand WHY design decisions      | **DESIGN_PRINCIPLES.md**                        | Philosophy, rationale, marketplace psychology       |
| Implement payments (Stripe)          | **ADVANCED_PATTERNS.md** → Payment Integration  | Stripe setup, security, webhooks                    |
| Implement file uploads               | **ADVANCED_PATTERNS.md** → File Upload Patterns | Client compression, validation, backend upload      |
| Implement real-time features         | **ADVANCED_PATTERNS.md** → Real-Time Features   | WebSockets, SSE, polling                            |
| Send transactional emails            | **ADVANCED_PATTERNS.md** → Email Patterns       | Resend, React Email, templates                      |
| Implement mobile gestures            | **MOBILE_PATTERNS.md**                          | Swipe, pull-to-refresh, touch interactions          |
| Prevent XSS attacks                  | **SECURITY_GUIDE.md** → XSS Prevention          | DOMPurify, sanitization, validation                 |
| Prevent CSRF attacks                 | **SECURITY_GUIDE.md** → CSRF Protection         | Token generation, verification                      |
| Validate user input                  | **SECURITY_GUIDE.md** → Input Validation        | Zod schemas, sanitization                           |

### Quick Reference: Common Questions

**"What color should this button be?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Color Palette → Semantic Colors

**"How do I fetch data from the backend?"**
→ [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Data Fetching with React Query

**"What's the minimum touch target size?"**
→ **QUICK_START.md** (this doc) → Section 3A (Mobile-First) → 48px minimum

**"How do I show a success message?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Toast Notifications

**"Why do we use bottom sheets instead of modals on mobile?"**
→ [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Mobile-First for Tourists

**"How do I validate forms?"**
→ [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Form Handling (React Hook Form + Zod)

**"What responsive breakpoints should I use?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Responsive Design → Breakpoints

**"How do I implement optimistic updates?"**
→ [ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md) → Advanced API Patterns → Optimistic Updates

### Escalation Path:

```
1. START: Read QUICK_START.md (this doc)
   ↓
   Get UX/UI principles, make decisions, understand quality standards
   ↓
2. Need implementation details?
   ↓
   ├─ React/Next.js patterns → COMPONENT_GUIDELINES.md
   ├─ Visual specs → STYLE_GUIDE.md
   ├─ Complex features → ADVANCED_PATTERNS.md
   ├─ Mobile interactions → MOBILE_PATTERNS.md
   ├─ Security → SECURITY_GUIDE.md
   └─ Philosophy/rationale → DESIGN_PRINCIPLES.md
   ↓
3. Still need help?
   ↓
   Research best practices, check Next.js/React docs, search Stack Overflow
```

---

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

## 10. Common Issues & Solutions

### Issue: "I can't find where to put my file"

**Solution:** Use Decision Tree 2 (Section 4)

**Quick guide:**

- UI component used across features → `/components/shared/`
- UI component specific to one feature → `/features/[feature]/components/`
- Raw Shadcn component → `/components/ui/` (don't modify!)
- API function → `/features/[feature]/api/` or `/api/` (if shared)
- Custom hook → `/features/[feature]/hooks/` or `/hooks/` (if shared)

**Reference:** [CLAUDE.md](/frontend/.claude/CLAUDE.md) → Directory Structure

---

### Issue: "Should I use Server or Client Component?"

**Solution:** Use Decision Tree 1 (Section 4)

**Quick guide:**

- Uses hooks (useState, useEffect) → Client Component ('use client')
- Handles interactions (onClick, onChange) → Client Component
- Uses browser APIs (localStorage, window) → Client Component
- Static content, SEO → Server Component (default)

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Server vs Client Components

---

### Issue: "Typography not applying correctly"

**Solutions:**

1. **Are you using design system components?**
   - ❌ `<h1 className="text-4xl">` → ✅ `<Heading as="h1">`
   - ❌ `<p className="text-base">` → ✅ `<Paragraph>`

2. **Are you importing correctly?**
   - ✅ `import { Heading, Paragraph } from '@/components/shared/typography'`

3. **Are Tailwind classes conflicting?**
   - Use `cn()` utility to merge classes properly
   - Check class ordering (Tailwind processes right-to-left)

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Design System Components

---

### Issue: "Component not found"

**Solutions:**

1. **Did you install it?**
   - For Shadcn components: `npx shadcn@latest add [component]`
   - Check available components: https://ui.shadcn.com/docs/components

2. **Is import path correct?**
   - ✅ `/components/shared/` (for customized components)
   - ❌ `/components/ui/` (only if using raw Shadcn)
   - ✅ Use path alias: `@/components/...`

3. **Does component exist?**
   - Check `/components/shared/index.ts` for barrel exports
   - Browse `/components/shared/` folders

**Reference:** [CLAUDE.md](/frontend/.claude/CLAUDE.md) → Import Patterns

---

### Issue: "API calls failing"

**Solutions:**

1. **Is backend running?**
   - Backend should be on port 3001
   - Check: `curl http://localhost:3001/health`

2. **Is NEXT_PUBLIC_API_URL set?**
   - Check `.env.local` file
   - Should be: `NEXT_PUBLIC_API_URL=http://localhost:3001`

3. **Are you using apiClient?**
   - ✅ `import { apiClient } from '@/api/client'`
   - ✅ `const data = await apiClient.get('/experiences')`

4. **Check browser console for errors:**
   - CORS errors → Backend needs to allow frontend origin
   - 401 Unauthorized → Auth token missing/invalid
   - 404 Not Found → Endpoint doesn't exist or wrong URL

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Data Fetching

---

### Issue: "State not updating"

**Solutions:**

1. **Are you mutating state directly?**
   - ❌ `state.items.push(newItem)` → ✅ `setState([...state.items, newItem])`
   - ❌ `state.count++` → ✅ `setState(state.count + 1)`

2. **Is this Server Component trying to use useState?**
   - Add `'use client'` at top of file
   - Server Components can't use hooks

3. **Is state in parent component?**
   - Pass setState function as prop to child
   - Or use Context/Zustand for global state

4. **Is React Query not refetching?**
   - Check `queryKey` - does it include dependencies?
   - Use `queryClient.invalidateQueries()` after mutation

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Server vs Client Components

---

### Issue: "Layout shifting on load (poor CLS)"

**Solutions:**

1. **Images missing width/height:**
   - ✅ `<Image src="..." width={400} height={300} alt="..." />`
   - ✅ Or use `fill` with parent container sized

2. **Not using next/image:**
   - ❌ `<img>` tag → ✅ `<Image>` from `next/image`

3. **Hero image not prioritized:**
   - Add `priority` prop: `<Image priority />`

4. **Dynamic content without placeholder:**
   - Use skeleton screens while loading
   - Reserve space with min-height

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Performance → Image Optimization

---

### Issue: "Poor mobile experience"

**Solutions:**

1. **Touch targets too small:**
   - Minimum: 48x48px (h-12 w-12)
   - Compact: 44x44px (h-11 w-11) - use sparingly
   - Check: Use browser DevTools device toolbar, enable touch indicators

2. **Wrong navigation pattern:**
   - ❌ Hamburger menu → ✅ Bottom tab bar (2-5 items)
   - ❌ Top navigation → ✅ Bottom sheet (5-10 items)

3. **Not tested at 375px:**
   - Use Chrome DevTools device toolbar
   - Select "iPhone SE" (375px width)
   - Test entire user flow

4. **Text too small:**
   - Minimum: 16px (text-base) for body text
   - Headings: 24px+ (text-2xl+)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md)

---

### Issue: "Accessibility violations"

**Solutions:**

1. **Missing ARIA labels on icons:**
   - ✅ `<Search aria-label="Search experiences" />`
   - ✅ Or wrap with visible text

2. **Using div with onClick:**
   - ❌ `<div onClick={...}>` → ✅ `<button onClick={...}>`
   - If must use div: Add `role="button"`, `tabIndex={0}`, keyboard handler

3. **Poor color contrast:**
   - Use design system colors (pre-tested)
   - Check: Chrome DevTools Lighthouse

4. **Missing alt text:**
   - ✅ Descriptive: `<Image alt="Host Maria cooking pasta" />`
   - ✅ Decorative: `<Image alt="" />`

5. **Form labels missing:**
   - ❌ Placeholder only → ✅ Label above input
   - Use FormLabel component (Shadcn)

**Reference:** [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Accessibility

---

## 11. Red Flags & Anti-Patterns

### Code Quality Anti-Patterns:

#### ❌ Using Raw HTML Elements

**Problem:** Inconsistent styling, no type safety, breaks design system
**Solution:** Use design system components

**DON'T:**

```
<div className="flex">
  <h1 className="text-4xl">Title</h1>
  <p className="text-gray-500">Description</p>
</div>
```

**DO:**

```
<Flex>
  <Heading as="h1">Title</Heading>
  <Paragraph textColor="muted">Description</Paragraph>
</Flex>
```

---

#### ❌ Inline Styles

**Problem:** Can't be themed, no design tokens, hard to maintain
**Solution:** Use Tailwind classes or CSS variables

**DON'T:**

```
<button style={{ backgroundColor: '#3b82f6', padding: '12px 24px' }}>
```

**DO:**

```
<Button>Click Me</Button>
```

---

#### ❌ Hardcoded Colors

**Problem:** Can't be themed, inconsistent, hard to change globally
**Solution:** Use CSS variables (design tokens)

**DON'T:**

```
className="bg-[#3b82f6] text-[#ffffff]"
```

**DO:**

```
className="bg-primary text-primary-foreground"
```

---

#### ❌ Importing from /components/ui/

**Problem:** Bypasses customizations, inconsistent with app
**Solution:** Import from /components/shared/

**DON'T:**

```
import { Button } from '@/components/ui/button'
```

**DO:**

```
import { Button } from '@/components/shared/button'
```

---

#### ❌ Cross-Feature Imports

**Problem:** Tight coupling, hard to refactor, breaks modularity
**Solution:** Move shared code to /components/shared/

**DON'T:**

```
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
// Used in bookings feature
```

**DO:**

```
// Move ExperienceCard to /components/shared/ if used in multiple features
import { ExperienceCard } from '@/components/shared/ExperienceCard'
```

---

### UX Anti-Patterns:

#### ❌ No Loading States

**Problem:** User sees blank screen, doesn't know what's happening
**Solution:** Show spinner, skeleton screen, or progress indicator

**Impact:** User thinks app is broken, closes tab

---

#### ❌ Generic Error Messages

**Problem:** User doesn't know what went wrong or how to fix it
**Solution:** Specific, actionable error messages

**DON'T:**

```
"Error occurred"
"Something went wrong"
"Invalid input"
```

**DO:**

```
"Email address is required"
"Password must be at least 8 characters"
"This email is already registered. Try logging in instead."
```

---

#### ❌ No Success Feedback

**Problem:** User unsure if action completed
**Solution:** Toast notification, checkmark, confirmation message

**DON'T:**

```
// Form submits, nothing happens visually
```

**DO:**

```
toast.success("Booking confirmed! Check your email for details.")
```

---

#### ❌ Disabled Buttons Without Explanation

**Problem:** User doesn't know WHY button is disabled
**Solution:** Tooltip or text explaining requirements

**DON'T:**

```
<Button disabled>Book Now</Button>
```

**DO:**

```
<Tooltip content="Please select a date and number of guests">
  <Button disabled>Book Now</Button>
</Tooltip>
```

---

### Accessibility Anti-Patterns:

#### ❌ Click Handler on Non-Interactive Element

**Problem:** Not keyboard-accessible, screen reader doesn't announce as clickable
**Solution:** Use button or add ARIA role + keyboard handler

**DON'T:**

```
<div onClick={handleClick}>Click me</div>
```

**DO:**

```
<button onClick={handleClick}>Click me</button>
// Or if must use div:
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKeyDown}>
```

---

#### ❌ Icon Without Label

**Problem:** Screen reader users don't know what icon does
**Solution:** Add aria-label or sr-only text

**DON'T:**

```
<Search className="h-5 w-5" />
```

**DO:**

```
<Search className="h-5 w-5" aria-label="Search experiences" />
```

---

#### ❌ Color as Only Indicator

**Problem:** Colorblind users can't distinguish
**Solution:** Add icon or text

**DON'T:**

```
<span className="text-red-500">Error</span>
```

**DO:**

```
<span className="text-red-500">
  <XCircle className="h-4 w-4" /> Error
</span>
```

---

### Mobile Anti-Patterns:

#### ❌ Touch Targets <48px

**Problem:** Hard to tap, especially for elderly, on-the-go users
**Solution:** Minimum 48x48px (h-12 w-12)

**DON'T:**

```
<button className="h-8 w-8"> // 32px - too small
```

**DO:**

```
<Button size="icon" className="h-12 w-12">
```

---

#### ❌ Unintentional Horizontal Scrolling

**Problem:** Frustrating, hard to navigate
**Solution:** Use responsive grid, max-width, overflow-x-hidden

**DON'T:**

```
<div className="w-[800px]"> // Fixed width wider than mobile viewport
```

**DO:**

```
<div className="w-full max-w-3xl"> // Responsive width
```

---

#### ❌ Modal on Mobile

**Problem:** Covers entire screen, hard to dismiss, feels trapped
**Solution:** Use bottom sheet (Vaul)

**DON'T:**

```
<Dialog> // Full-screen modal on mobile
```

**DO:**

```
<Sheet side="bottom"> // Bottom sheet - swipe to dismiss
```

---

### Performance Anti-Patterns:

#### ❌ Using <img> Tag

**Problem:** No optimization, no lazy loading, causes CLS
**Solution:** Always use next/image

**DON'T:**

```
<img src="/photo.jpg" />
```

**DO:**

```
<Image src="/photo.jpg" width={400} height={300} alt="Description" />
```

---

#### ❌ Large Unoptimized Images

**Problem:** Slow page load, poor mobile experience
**Solution:** Compress images, use WebP/AVIF, next/image handles this

**DON'T:**

```
5MB JPEG uploaded directly
```

**DO:**

```
Use browser-image-compression library before upload
next/image automatically converts to WebP
```

---

#### ❌ Fetching Data in Loop

**Problem:** N+1 problem, slow, many network requests
**Solution:** Use Promise.all or batch request

**DON'T:**

```
for (const id of ids) {
  const data = await fetchData(id) // Sequential, slow
}
```

**DO:**

```
const promises = ids.map(id => fetchData(id))
const results = await Promise.all(promises) // Parallel, fast
```

---

### Security Anti-Patterns:

#### ❌ Rendering Unsanitized HTML

**Problem:** XSS vulnerability
**Solution:** Use DOMPurify to sanitize

**DON'T:**

```
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**DO:**

```
import DOMPurify from 'isomorphic-dompurify'
const clean = DOMPurify.sanitize(userInput)
<div dangerouslySetInnerHTML={{ __html: clean }} />
```

---

#### ❌ Storing Secrets in Code

**Problem:** Leaked to Git, public repos, security breach
**Solution:** Use environment variables

**DON'T:**

```
const STRIPE_KEY = 'sk_live_abc123' // Hardcoded secret
```

**DO:**

```
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY // Environment variable
```

---

#### ❌ No Input Validation

**Problem:** SQL injection, XSS, malformed data
**Solution:** Use Zod schemas for validation

**DON'T:**

```
const email = req.body.email // No validation
```

**DO:**

```
const schema = z.object({ email: z.string().email() })
const { email } = schema.parse(req.body)
```

---

## 12. Critical Checks for Key Features

### Forms:

**Checklist:**

- [ ] Validation on blur (not every keystroke)
- [ ] Error messages specific and actionable ("Email is required" not "Invalid")
- [ ] Success feedback on submission (toast notification)
- [ ] Loading state during submission (disabled button, spinner)
- [ ] Button disabled while loading (prevent duplicate submissions)
- [ ] Keyboard navigation (Tab through fields, Enter to submit)
- [ ] ARIA labels for all inputs (`aria-required`, `aria-invalid`)
- [ ] Labels above inputs (not just placeholders)
- [ ] Clear required field indicators (\* or "Required")

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Form Handling

---

### Navigation:

**Checklist:**

- [ ] Active state clearly visible (different color, underline, indicator)
- [ ] Mobile menu accessible (bottom nav or bottom sheet)
- [ ] Keyboard navigation (Tab, Enter, Arrow keys)
- [ ] Escape to close mobile menu
- [ ] Focus trap in mobile menu (Tab cycles within menu)
- [ ] Return focus to trigger when closing (accessibility)
- [ ] ARIA labels (`role="navigation"`, `aria-label="Main navigation"`)
- [ ] Logo links to home page
- [ ] Responsive (horizontal on desktop, bottom bar/sheet on mobile)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) → Mobile Navigation

---

### Data Tables / Lists:

**Checklist:**

- [ ] Loading skeleton while fetching (not blank page)
- [ ] Empty state with helpful message and CTA ("No bookings yet. Browse experiences!")
- [ ] Pagination or infinite scroll (don't load 1000 items)
- [ ] Sort indicators (arrow up/down for ascending/descending)
- [ ] Responsive (card layout on mobile, table on desktop)
- [ ] Loading indicator when sorting/filtering
- [ ] Clear error message if fetch fails ("Unable to load experiences. Try again?")

**Reference:** [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Loading States

---

### Modals / Drawers / Bottom Sheets:

**Checklist:**

- [ ] Escape to close (keyboard accessibility)
- [ ] Click outside to close (or disable with explanation)
- [ ] Focus trap (Tab cycles within modal, doesn't go behind)
- [ ] Scroll lock on body (prevent scrolling page behind modal)
- [ ] Return focus to trigger element on close
- [ ] Close button visible (X icon in top-right or bottom)
- [ ] ARIA labels (`role="dialog"`, `aria-modal="true"`)
- [ ] Backdrop (semi-transparent overlay)
- [ ] Mobile: Use bottom sheet (easier to dismiss with swipe)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) → Bottom Sheets

---

### Images:

**Checklist:**

- [ ] Using next/image component (not `<img>` tag)
- [ ] Width/height specified (prevents CLS - layout shift)
- [ ] Alt text descriptive ("Host Maria cooking pasta" not "image")
- [ ] Lazy loading for below-fold images (default with next/image)
- [ ] Priority for above-the-fold/LCP image (`priority` prop)
- [ ] Compressed before upload (use browser-image-compression)
- [ ] Appropriate format (WebP/AVIF for photos, SVG for logos)
- [ ] Responsive sizing (`fill` with object-fit or responsive width/height)

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Image Optimization

---

### Buttons:

**Checklist:**

- [ ] Touch target ≥48px (h-12 w-12 minimum)
- [ ] Clear label (action + noun: "Book Experience" not "Submit")
- [ ] Loading state (spinner + "Processing..." text)
- [ ] Disabled state clear (lower opacity, cursor not-allowed)
- [ ] Hover state (background color change, outline)
- [ ] Focus state (visible ring/outline)
- [ ] ARIA label if icon-only (`aria-label="Close"`)
- [ ] Appropriate variant (primary for main action, outline for secondary)

**Reference:** [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Button Size Guidelines

---

### Search / Filters:

**Checklist:**

- [ ] Debounced input (300-500ms delay before search)
- [ ] Loading indicator while searching
- [ ] Clear button to reset search (X icon)
- [ ] No results state ("No experiences found for 'italian'. Try different search?")
- [ ] URL params for filters (shareable links, browser back)
- [ ] Filter count indicator ("Filters (3)")
- [ ] Mobile: Bottom sheet for filters (not sidebar)
- [ ] "Apply" and "Clear All" buttons in filter panel
- [ ] Keyboard navigation (Cmd/Ctrl+K for search shortcut)

**Reference:** [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) → Command Menu Pattern

---

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
