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

