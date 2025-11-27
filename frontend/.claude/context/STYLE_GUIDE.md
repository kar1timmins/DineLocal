# DineLocal Style Guide

**Version:** 1.0
**Last Updated:** 2025-10-21
**Target:** AI assistants and human developers

---

## Purpose & Scope

**This document defines the visual and code style standards for DineLocal.**

### What This Document Covers

**Visual Style:**

- Color palette (specific hex/OKLCH values, semantic usage)
- Typography scale (font sizes, weights, line heights)
- Spacing values (specific pixel/rem values)
- Component visual styling (buttons, cards, forms)
- Iconography standards
- Animation durations and easing
- Image specifications and quality standards

**Code Style:**

- Code formatting standards (Tailwind class ordering, import organization)
- TypeScript naming patterns (variables, functions, interfaces)
- Content formatting (not file naming - see CLAUDE.md)

**Content Style:**

- Tone of voice
- Microcopy patterns
- Content formatting rules

### What This Document Does NOT Cover

**❌ Not Covered (See Other Documents):**

- **File Naming Conventions** → See `/frontend/.claude/CLAUDE.md` (Coding Conventions section)
- **Architecture & Project Structure** → See `/frontend/.claude/CLAUDE.md`
- **React/Next.js Component Patterns** → See `/frontend/.claude/context/COMPONENT_GUIDELINES.md`
- **UX/UI Design Philosophy & Principles** → See `/frontend/.claude/context/DESIGN_PRINCIPLES.md`
- **Accessibility Implementation** → See DESIGN_PRINCIPLES.md (WCAG 2.2 patterns)
- **Performance Optimization** → See DESIGN_PRINCIPLES.md (Core Web Vitals)
- **Marketplace Trust Patterns** → See DESIGN_PRINCIPLES.md (conversion optimization)

### Document Relationships

```
CLAUDE.md (Architecture & Project Structure)
    ├── Defines: File structure, folder organization, tech stack
    ├── When to use: Setting up project, organizing features
    └── Example: "Put API functions in /features/[feature]/api/"

COMPONENT_GUIDELINES.md (React/Next.js Patterns)
    ├── Defines: Server vs Client Components, React Query, data fetching
    ├── When to use: Writing React components, API integration
    └── Example: "Use useQuery for data fetching from NestJS"

DESIGN_PRINCIPLES.md (UX/UI Philosophy & Strategy)
    ├── Defines: User experience patterns, marketplace psychology, accessibility
    ├── When to use: Designing features, conversion optimization
    └── Example: "Progressive trust building with host verification badges"

STYLE_GUIDE.md (This Document - Visual & Code Standards)
    ├── Defines: Visual specifications, code formatting, content tone
    ├── When to use: Implementing designs, writing code, creating content
    └── Example: "Primary button: bg-primary, h-11, rounded-lg"
```

### When to Use This Document

**Use STYLE_GUIDE.md when:**

- Choosing colors for a new component ("Should I use text-primary or text-foreground?")
- Determining font sizes ("Is this heading text-2xl or text-3xl?")
- Spacing elements ("Should this gap be gap-4 or gap-6?")
- Writing button copy ("Do we say 'Book Now' or 'Reserve'?")
- Organizing Tailwind classes ("What order should these classes be in?")
- Determining animation durations ("How long should this transition be?")

**Use OTHER documents when:**

- **Naming files** → CLAUDE.md (Coding Conventions)
- Deciding component structure → COMPONENT_GUIDELINES.md
- Implementing data fetching → COMPONENT_GUIDELINES.md
- Understanding user psychology → DESIGN_PRINCIPLES.md
- Optimizing conversion → DESIGN_PRINCIPLES.md
- Organizing project files → CLAUDE.md
- Setting up API integration → CLAUDE.md

---

## Table of Contents

1. [Visual Design System](#visual-design-system)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Styling](#component-styling)
   - [Buttons](#buttons)
   - [Cards](#cards)
   - [Forms](#forms)
   - [Badges & Pills](#badges--pills)
   - [Toast Notifications](#toast-notifications) ⭐ NEW
   - [Tooltips & Popovers](#tooltips--popovers) ⭐ NEW
   - [Card Interaction States](#card-interaction-states) ⭐ NEW
   - [Form Validation Timing](#form-validation-timing) ⭐ NEW
6. [Code Style](#code-style)
7. [Content & Copywriting](#content--copywriting)
8. [Iconography](#iconography)
9. [Imagery & Photos](#imagery--photos)
10. [Animation & Motion](#animation--motion)
11. [Performance & Core Web Vitals](#performance--core-web-vitals) ⭐ NEW
12. [Loading States & Progressive Enhancement](#loading-states--progressive-enhancement) ⭐ NEW
13. [Responsive Design](#responsive-design) (includes Mobile-Specific Patterns)
14. [Accessibility](#accessibility)
15. [Internationalization (i18n)](#internationalization-i18n) ⭐ NEW
16. [Style Checklist](#style-checklist)

---

## Visual Design System

### Design Tokens

DineLocal uses Tailwind CSS 4.1.13 with OKLCH color space for consistent, accessible design.

**Core Principles:**

- **Consistency:** Use design tokens (colors, spacing, typography) from Tailwind config
- **Accessibility:** WCAG 2.2 AA compliant (4.5:1 contrast for text, 3:1 for UI)
- **Mobile-First:** Design for mobile (375px) first, scale up to desktop
- **Trust & Clarity:** Clean, professional design that builds marketplace trust

### Brand Personality

**DineLocal is:**

- 🌟 **Welcoming:** Warm, approachable, tourist-friendly
- 🎯 **Trustworthy:** Professional, reliable, transparent
- 🌍 **Local:** Authentic, community-focused, cultural
- ⚡ **Efficient:** Fast, intuitive, mobile-optimized

**DineLocal is NOT:**

- ❌ Overly corporate or sterile
- ❌ Cluttered or overwhelming
- ❌ Gimmicky or trendy
- ❌ Difficult to navigate

### Dark Mode Status

**Current Implementation:** Light mode only

DineLocal currently implements **light mode only**. Dark mode tokens are defined in `globals.css` but commented out. Focus all design and development efforts on perfecting the light mode experience.

**Future Considerations:**

- Dark mode tokens already defined in design system (currently disabled)
- Can be enabled later by uncommenting CSS variables in `globals.css`
- When implementing dark mode, ensure all components support both themes
- Test for accessibility (contrast ratios may differ in dark mode)

---

## Color Palette

### Primary Colors

```tsx
// Primary Brand Color (Used for CTAs, links, key actions)
bg-primary          // Main brand color
text-primary        // Primary text on light backgrounds
border-primary      // Primary borders

// Usage:
<Button className="bg-primary hover:bg-primary/90">Book Now</Button>
```

### Semantic Colors

```tsx
// Success (Confirmations, availability)
bg - green - 600 // Success background
text - green - 600 // Success text
border - green - 600 // Success border

// Warning (Low availability, important notices)
bg - amber - 500 // Warning background
text - amber - 600 // Warning text
border - amber - 500 // Warning border

// Error (Validation errors, unavailable)
bg - red - 600 // Error background
text - red - 600 // Error text (must be red-700+ on white for WCAG)
border - red - 600 // Error border

// Info (Tips, helpful information)
bg - blue - 600 // Info background
text - blue - 600 // Info text
border - blue - 600 // Info border
```

### Neutral Colors

```tsx
// Backgrounds
bg - background // Main page background (white/near-white)
bg - card // Card background
bg - muted // Subtle background (f9fafb equivalent)

// Text
text - foreground // Primary text (900)
text - muted - foreground // Secondary text (500-600)

// Borders
border - border // Default border color (200-300)
border - input // Input borders

// Interactive States
hover: bg - accent // Hover background
focus: ring - ring // Focus ring color
```

### Gradient Accents

```tsx
// Hero sections, premium features
className = 'bg-gradient-to-r from-blue-600 to-purple-600'
className = 'bg-gradient-to-br from-primary to-purple-600'

// Text gradients (for headings)
className = 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
```

### Color Usage Guidelines

**DO:**

- ✅ Use `bg-primary` for primary CTAs (Book Now, Reserve, Confirm)
- ✅ Use semantic colors consistently (green=success, red=error, amber=warning)
- ✅ Ensure 4.5:1 contrast for text, 3:1 for UI elements
- ✅ Use `text-muted-foreground` for secondary information
- ✅ Test colors in light/dark mode if implementing dark mode

**DON'T:**

- ❌ Use raw Tailwind colors (red-500, blue-600) without semantic meaning
- ❌ Mix gradient styles (stick to one gradient direction per section)
- ❌ Use low-contrast text colors (text-gray-400 on white)
- ❌ Overuse bright colors (reserve for important actions)

---

## Typography

### Font Families

```tsx
// Primary Font (Body, UI)
font - inter // Inter (default, clean, readable)

// Display Font (Headings, Hero)
font - righteous // Righteous (bold, distinctive, brand personality)
```

### Heading Styles

```tsx
// H1 - Hero Headlines, Page Titles
<Heading as="h1" fontFamily="righteous" fontWeight="bold" className="text-4xl">
  Discover Local Dining Experiences
</Heading>

// H2 - Section Headings
<Heading as="h2" fontFamily="righteous" fontWeight="semi-bold" className="text-3xl">
  Featured Restaurants
</Heading>

// H3 - Subsection Headings
<Heading as="h3" fontWeight="semi-bold" className="text-2xl">
  Restaurant Name
</Heading>

// H4 - Card Headings, Small Sections
<Heading as="h4" fontWeight="semi-bold" className="text-xl">
  Experience Details
</Heading>

// H5 - Small Headings, Labels
<Heading as="h5" fontWeight="medium" className="text-lg">
  About the Chef
</Heading>

// H6 - Micro Headings
<Heading as="h6" fontWeight="medium" className="text-base">
  Additional Info
</Heading>
```

### Body Text Styles

```tsx
// Large Body (Intros, important paragraphs)
<Text as="p" className="text-lg text-foreground">
  Experience authentic local cuisine...
</Text>

// Regular Body (Default)
<Text as="p" className="text-base text-foreground">
  This restaurant offers a unique dining experience...
</Text>

// Small Body (Captions, secondary info)
<Text as="span" className="text-sm text-muted-foreground">
  Last updated 2 hours ago
</Text>

// Extra Small (Fine print, metadata)
<Text as="span" className="text-xs text-muted-foreground">
  © 2025 DineLocal
</Text>
```

### Typography Guidelines

**DO:**

- ✅ Use `font-righteous` for H1-H2 to create brand personality
- ✅ Use `font-inter` for H3-H6 and body text for readability
- ✅ Maintain consistent line-height (leading-relaxed for body, leading-tight for headings)
- ✅ Use `text-muted-foreground` for secondary information
- ✅ Ensure text is resizable up to 200% without breaking layout

**DON'T:**

- ❌ Use more than 2 font families
- ❌ Use font sizes smaller than 14px (text-sm) for body text
- ❌ Set line-height below 1.5 for body text
- ❌ Use ALL CAPS for long sentences (okay for short labels)
- ❌ Use light font weights (300 or below) for small text

---

## Spacing & Layout

### Spacing Scale

DineLocal uses Tailwind's default spacing scale (4px base unit):

```tsx
// Extra Small (4px, 8px)
gap - 1 // 4px - Tight icon spacing
gap - 2 // 8px - Form field spacing

// Small (12px, 16px)
gap - 3 // 12px - Inline elements
gap - 4 // 16px - Card content spacing

// Medium (20px, 24px)
gap - 5 // 20px - Section spacing
gap - 6 // 24px - Card padding

// Large (32px, 40px, 48px)
gap - 8 // 32px - Major sections
gap - 10 // 40px - Page sections
gap - 12 // 48px - Hero sections

// Extra Large (64px, 80px, 96px)
gap - 16 // 64px - Page margins
gap - 20 // 80px - Major dividers
gap - 24 // 96px - Hero padding
```

### Container Widths

```tsx
// Page Container
<Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</Container>

// Narrow Container (Forms, articles)
<Container className="max-w-3xl mx-auto px-4">
  {/* Content */}
</Container>

// Wide Container (Grids, galleries)
<Container className="max-w-screen-2xl mx-auto px-4">
  {/* Content */}
</Container>

// Full Width (Hero, maps)
<Container className="w-full px-4">
  {/* Content */}
</Container>
```

### Page Container Alignment ⭐ CRITICAL

**Rule:** All page content containers MUST align horizontally with navbar content.

**Standard Container Classes:**

```tsx
// Page container pattern (align with navbar)
<Box className="container mx-auto max-w-screen-2xl px-4 py-8">{/* Page content */}</Box>
```

**Navbar Configuration (must match):**

```tsx
// GuestNavbar.tsx
<Navbar padding="sm">           {/* px-4 */}
  <NavbarContent maxWidth="2xl"> {/* max-w-screen-2xl */}
```

**Critical Values:**

- **Padding:** `px-4` (16px horizontal) - MUST match navbar
- **Max-width:** `max-w-screen-2xl` (1536px) - MUST match navbar
- **Centering:** `mx-auto` - Center container on page

**Examples:**

```tsx
// ✅ CORRECT - Perfectly aligned with navbar
<Box className="container mx-auto max-w-screen-2xl px-4 py-8">
  <Heading>Search Results</Heading>
  <Grid>...</Grid>
</Box>

// ❌ WRONG - Misaligned padding
<Box className="container mx-auto max-w-screen-2xl px-6 py-8">
  {/* px-6 creates 8px offset from navbar (navbar uses px-4) */}
</Box>

// ❌ WRONG - Misaligned max-width
<Box className="container mx-auto max-w-7xl px-4 py-8">
  {/* max-w-7xl (1280px) narrower than navbar max-w-screen-2xl (1536px) */}
</Box>

// ❌ WRONG - Different padding AND max-width
<Box className="container mx-auto max-w-7xl px-6 py-8">
  {/* Both values misaligned */}
</Box>
```

**Why This Matters:**

- Prevents visual misalignment between navbar and page content
- Creates cohesive, professional layout across all screen sizes
- Follows marketplace UX patterns (Airbnb, Booking.com)
- Improves visual consistency and user trust

**When to Use Different Values:**

- **Narrow content** (articles, forms): Use `max-w-3xl` but keep `px-4`
- **Full-width sections** (hero, maps): Use `w-full px-4` (keep padding consistent)
- **NEVER change `px-4`** unless you also update navbar padding

### Card Spacing

```tsx
// Standard Card
<Card className="p-6 space-y-4">
  <Heading as="h3">Card Title</Heading>
  <Text>Card content with consistent spacing</Text>
</Card>

// Compact Card (Mobile, lists)
<Card className="p-4 space-y-3">
  {/* Tighter spacing for mobile */}
</Card>

// Spacious Card (Featured, hero)
<Card className="p-8 space-y-6">
  {/* More breathing room */}
</Card>
```

### Spacing Guidelines

**DO:**

- ✅ Use consistent spacing multiples (4, 8, 12, 16, 24, 32, 48, 64)
- ✅ Use `space-y-{n}` for vertical stacking
- ✅ Use `gap-{n}` for Flexbox/Grid layouts
- ✅ Add extra spacing around important CTAs (my-8, my-12)
- ✅ Use padding for content areas, margin for section separation

**DON'T:**

- ❌ Use arbitrary values like `px-[17px]` unless absolutely necessary
- ❌ Mix padding and margin inconsistently
- ❌ Create cramped layouts (minimum 16px touch targets)
- ❌ Forget responsive spacing adjustments (sm:p-6, lg:p-8)

---

## Component Styling

### Buttons

```tsx
// Primary CTA (Book Now, Reserve, Confirm)
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Book Now
</Button>

// Secondary (Cancel, Back, Alternative actions)
<Button variant="secondary" className="bg-secondary text-secondary-foreground">
  View Details
</Button>

// Outline (Filters, toggles)
<Button variant="outline" className="border-border hover:bg-accent">
  Filter
</Button>

// Ghost (Icon buttons, subtle actions)
<Button variant="ghost" className="hover:bg-accent">
  <Heart className="h-4 w-4" />
</Button>

// Destructive (Delete, cancel booking)
<Button variant="destructive" className="bg-red-600 text-white hover:bg-red-700">
  Cancel Booking
</Button>
```

**Button Size Guidelines:**

**Design Rationale:**
For accessibility justification and user psychology behind these sizes, see:
📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` → Accessibility for Global Audience → Touch Target Sizing

```tsx
// Default (48px height minimum - Industry best practice, WCAG 2.2+ compliant)
<Button size="default" className="h-12 px-6">

// Large (Hero CTAs, important actions)
<Button size="lg" className="h-14 px-8">

// Compact (Inline actions, space-constrained layouts - still WCAG 2.2 compliant at 44px)
<Button size="compact" className="h-11 px-4">

// Small (Use sparingly, 36px - below recommended minimum)
<Button size="sm" className="h-9 px-4">

// Icon (Square, icon-only)
<Button size="icon" className="h-12 w-12">
```

### Cards

```tsx
// Standard Card
<Card className="border border-border bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle>Restaurant Name</CardTitle>
    <CardDescription>Italian Cuisine • $$</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    <Button className="w-full">View Details</Button>
  </CardFooter>
</Card>

// Featured Card (Highlighted listings)
<Card className="border-2 border-primary bg-card shadow-lg">
  {/* Featured content */}
</Card>

// Interactive Card (Clickable, hoverable)
<Card className="cursor-pointer hover:border-primary hover:shadow-lg transition-all">
  {/* Interactive content */}
</Card>
```

### Forms

```tsx
// Input Fields
<Input
  className="h-11 border-border focus:border-primary focus:ring-primary"
  placeholder="Enter your email"
/>

// Text Areas
<Textarea
  className="min-h-[100px] border-border focus:border-primary"
  placeholder="Tell us about your experience"
/>

// Select Dropdowns
<Select>
  <SelectTrigger className="h-11 border-border">
    <SelectValue placeholder="Select cuisine" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="italian">Italian</SelectItem>
  </SelectContent>
</Select>

// Form Labels
<Label className="text-sm font-medium text-foreground">
  Email Address <span className="text-red-600">*</span>
</Label>

// Helper Text
<Text className="text-sm text-muted-foreground">
  We'll never share your email with anyone else.
</Text>

// Error Messages
<Text className="text-sm text-red-700">
  Please enter a valid email address.
</Text>
```

### Badges & Pills

```tsx
// Status Badge (Available, Booked, Closed)
<Badge variant="default" className="bg-green-600">
  Available
</Badge>

<Badge variant="secondary" className="bg-amber-500">
  Low Availability
</Badge>

<Badge variant="destructive">
  Fully Booked
</Badge>

// Category Pills (Cuisine, tags)
<Badge variant="outline" className="rounded-full">
  Italian
</Badge>

// Count Badge (Notifications)
<Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-xs">
  3
</Badge>
```

### Toast Notifications

**Use Sonner for toast notifications (already installed):**

```tsx
import { customToast } from '@/components/shared/toast'

// Success toast
customToast({
  variant: 'success',
  title: 'Booking confirmed!',
  description: 'Check your email for details.',
})

// Error toast
customToast({
  variant: 'error',
  title: 'Payment failed',
  description: 'Please check your card details and try again.',
})

// Info toast
customToast({
  variant: 'info',
  title: 'Pro tip',
  description: 'Hosts with 5+ photos get 60% more bookings.',
})

// Warning toast
customToast({
  variant: 'warning',
  title: 'Low availability',
  description: 'Only 2 spots left for tonight.',
})

// Toast with action buttons
customToast({
  variant: 'default',
  title: 'Booking request received',
  description: 'The host will respond within 24 hours.',
  actionButton: {
    label: 'View Booking',
    variant: 'secondary',
    onClick: () => router.push('/bookings'),
  },
  cancelButton: {
    label: 'Dismiss',
    variant: 'ghost',
    onClick: () => {},
  },
})
```

**Toast Positioning:**

```tsx
// In app layout or root component
import { Toaster } from 'sonner'

;<Toaster
  position="top-right" // Desktop: top-right
  mobilePosition="bottom-center" // Mobile: bottom-center (easier to reach)
  expand={false} // Don't expand on hover
  richColors // Use semantic colors
  closeButton // Show close button
  duration={5000} // 5 seconds default
/>
```

**Toast Guidelines:**

- ✅ Use success for confirmations (booking confirmed, added to favorites)
- ✅ Use error for failures (payment declined, network error)
- ✅ Use warning for important notices (low availability, account limits)
- ✅ Use info for helpful tips (no action required)
- ✅ Keep messages concise (1-2 sentences)
- ✅ Include action buttons for reversible actions (Undo, View)
- ❌ Don't use toasts for critical errors (use modal instead)
- ❌ Don't stack more than 3 toasts at once
- ❌ Don't use toasts for form validation (use inline errors)

---

### Tooltips & Popovers

**Tooltips for supplementary information:**

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Icon with tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <InfoIcon className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p className="max-w-xs">
        Verified hosts have completed identity verification
        and have a 4.5+ rating.
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Text with tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help">
        Instant Book
      </span>
    </TooltipTrigger>
    <TooltipContent>
      <p>Book immediately without waiting for host approval</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**Tooltip Guidelines:**

- ✅ Show on hover (desktop) and long-press (mobile)
- ✅ Keep text brief (1-2 sentences, max 200 characters)
- ✅ Position intelligently (avoid covering important content)
- ✅ Use for icon buttons without labels
- ✅ Use for abbreviated terms or jargon
- ❌ Don't use for critical information (put in UI instead)
- ❌ Don't use for mobile-only interfaces (hard to discover)
- ❌ Don't nest tooltips inside other tooltips

---

### Card Interaction States

**Interactive cards with proper states:**

```tsx
// ✅ CORRECT: All states defined
<Card
  className={cn(
    'border-border rounded-lg border',
    'cursor-pointer transition-all duration-200',
    // Default
    'bg-card',
    // Hover (desktop)
    'hover:border-primary hover:shadow-lg',
    // Focus (keyboard)
    'focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none',
    // Active (mouse down / touch)
    'active:scale-[0.98]',
    // Selected state (if applicable)
    isSelected && 'border-primary bg-primary/5',
    // Disabled state
    isDisabled && 'cursor-not-allowed opacity-50 hover:shadow-sm'
  )}
  onClick={!isDisabled ? handleClick : undefined}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="button"
  aria-pressed={isSelected}
  aria-disabled={isDisabled}
>
  <CardContent className="p-4">{/* Card content */}</CardContent>
</Card>
```

**Card State Variants:**

```tsx
// Read-only card (no interaction)
<Card className="border border-border rounded-lg bg-card">
  <CardContent>{/* Non-interactive content */}</CardContent>
</Card>

// Hoverable card (shows more info on hover)
<Card className="transition-shadow hover:shadow-md">
  <CardContent>{/* Content */}</CardContent>
</Card>

// Clickable card (navigates or opens modal)
<Card
  className="
    cursor-pointer
    hover:shadow-lg hover:border-primary
    active:scale-[0.98]
    transition-all
  "
  onClick={handleClick}
>
  <CardContent>{/* Content */}</CardContent>
</Card>

// Selectable card (checkbox behavior)
<Card
  className={cn(
    'cursor-pointer transition-all',
    isSelected
      ? 'border-2 border-primary bg-primary/5'
      : 'border border-border hover:border-primary'
  )}
  onClick={() => setIsSelected(!isSelected)}
>
  <CardContent>
    {isSelected && (
      <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
    )}
    {/* Content */}
  </CardContent>
</Card>
```

---

### Form Validation Timing

**When to show validation errors:**

```tsx
// ✅ CORRECT: Show errors after blur (on-touch)
;<Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => setTouched({ ...touched, email: true })}
  className={cn(touched.email && errors.email && 'border-red-600')}
  aria-invalid={touched.email && !!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{
  touched.email && errors.email && (
    <Text id="email-error" className="mt-1 text-sm text-red-700">
      {errors.email}
    </Text>
  )
}

// ❌ INCORRECT: Show errors immediately on change (too aggressive)
;<Input
  value={email}
  onChange={(e) => {
    setEmail(e.target.value)
    validateEmail(e.target.value) // Don't do this!
  }}
/>
```

**Validation Timing Strategy:**

1. **On Blur (Recommended):**
   - Show errors when user leaves field
   - Best balance of feedback and annoyance
   - Standard for most forms

2. **On Submit (For simple forms):**
   - Validate all fields when form submitted
   - Good for 1-3 field forms
   - Less intrusive

3. **Real-Time (After first blur):**
   - Show errors on blur, then update on every change
   - Good for password strength, username availability
   - Provides immediate feedback once engaged

```tsx
// Real-time validation after first touch
const [touched, setTouched] = useState(false)

<Input
  value={password}
  onChange={(e) => {
    setPassword(e.target.value)
    if (touched) validatePassword(e.target.value) // Only if touched
  }}
  onBlur={() => {
    setTouched(true)
    validatePassword(password)
  }}
/>
```

**Validation UX Guidelines:**

- ✅ Show success indicators (green checkmark) after valid input
- ✅ Show inline errors below field (not in tooltip)
- ✅ Disable submit button until form is valid
- ✅ Show field-level errors + form-level summary
- ❌ Don't show errors before user has interacted with field
- ❌ Don't clear error messages too quickly (keep until fixed)
- ❌ Don't use red text alone (add icon for color-blind users)

---

### Component Styling Guidelines

**DO:**

- ✅ Use Shadcn/UI variants (default, secondary, outline, ghost, destructive)
- ✅ Maintain 48px minimum height for all interactive elements (industry best practice, enhances usability)
- ✅ Use 44px minimum for space-constrained layouts (WCAG 2.2 compliant)
- ✅ Add hover states with `transition-all` or `transition-colors`
- ✅ Use consistent border radius (rounded-lg for cards, rounded-md for inputs)
- ✅ Add focus rings with 2px thickness and 3:1 contrast (WCAG 2.4.13)
- ✅ Define all interaction states (hover, focus, active, disabled)
- ✅ Use toast notifications for transient feedback
- ✅ Show validation errors on blur, not on every keystroke

**DON'T:**

- ❌ Create custom button variants unless absolutely necessary
- ❌ Use inconsistent border radius across similar components
- ❌ Forget disabled states (opacity-50, cursor-not-allowed)
- ❌ Skip hover/focus states for interactive elements
- ❌ Use tooltips for critical information
- ❌ Show form errors before user interaction
- ❌ Stack more than 3 toasts simultaneously

---

## Code Style

**Note:** For file naming conventions (PascalCase vs kebab-case, etc.), see `/frontend/.claude/CLAUDE.md` → Coding Conventions → File Naming Guidelines.

### Component Structure

```tsx
// ✅ CORRECT: Clean, organized component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/shared/container/flex'
import { Text } from '@/components/shared/typography/text'

interface RestaurantCardProps {
  name: string
  cuisine: string
  price: string
  onBook: () => void
}

export function RestaurantCard({ name, cuisine, price, onBook }: RestaurantCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="gap-2">
          <Text className="text-muted-foreground">{cuisine}</Text>
          <Text fontWeight="semi-bold">{price}</Text>
          <Button onClick={onBook} className="w-full">
            Book Now
          </Button>
        </Flex>
      </CardContent>
    </Card>
  )
}
```

### Tailwind Class Organization

```tsx
// ✅ CORRECT: Organized by category
<div className={cn(
  // Layout
  'flex flex-col',
  // Spacing
  'gap-4 p-6',
  // Sizing
  'w-full max-w-4xl',
  // Borders
  'border border-border rounded-lg',
  // Background
  'bg-card',
  // Typography
  'text-foreground',
  // Effects
  'shadow-sm hover:shadow-md',
  // Transitions
  'transition-all',
  // Responsive
  'md:flex-row md:gap-6 md:p-8'
)}>
  {/* Content */}
</div>

// ❌ INCORRECT: Random order
<div className="hover:shadow-md text-foreground gap-4 flex shadow-sm w-full border bg-card rounded-lg p-6 md:gap-6 flex-col transition-all">
```

### Import Organization

```tsx
// ✅ CORRECT: Organized imports
// 1. React/Next.js
import { useState } from 'react'
import Image from 'next/image'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internal components (UI)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 4. Internal components (Shared)
import { Flex } from '@/components/shared/container/flex'
import { Heading } from '@/components/shared/typography/heading'

// 5. Internal utilities/types
import { cn } from '@/lib/utils'
import type { Restaurant } from '@/types/restaurant'

// 6. API functions
import { getRestaurants } from '@/lib/api/restaurants'
```

### TypeScript Guidelines

```tsx
// ✅ CORRECT: Explicit types, interfaces
interface Restaurant {
  id: string
  name: string
  cuisine: string
  priceRange: 'budget' | 'moderate' | 'expensive'
  availableSlots: number
}

function BookingForm({ restaurant }: { restaurant: Restaurant }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // ...
}

// ❌ INCORRECT: No types, any
function BookingForm({ restaurant }: any) {
  const [selectedDate, setSelectedDate] = useState(null)
  // ...
}
```

### Code Style Guidelines

**DO:**

- ✅ Use PascalCase for component file names (RestaurantCard.tsx) - see CLAUDE.md for full file naming conventions
- ✅ Use PascalCase for component names (RestaurantCard)
- ✅ Use camelCase for functions/variables (getRestaurants)
- ✅ Extract magic numbers/strings to constants
- ✅ Add JSDoc comments for complex functions
- ✅ Use TypeScript strict mode (no `any`)
- ✅ Organize Tailwind classes by category

**DON'T:**

- ❌ Mix naming conventions
- ❌ Use inline styles instead of Tailwind
- ❌ Create deeply nested components (max 3 levels)
- ❌ Duplicate code (use shared components)
- ❌ Skip prop validation (use TypeScript interfaces)

---

## Content & Copywriting

### Tone of Voice

**DineLocal speaks like:**

- 🗣️ A friendly local guide (not a corporate robot)
- 🎯 Clear and direct (not vague or wordy)
- 🌟 Encouraging and helpful (not pushy or salesy)
- 🌍 Culturally aware (not assuming or insensitive)

### Copywriting Principles

**1. Be Clear and Concise**

```
✅ CORRECT:
"Book your table in 60 seconds"
"3 spots left for tonight"
"Italian • $$ • Open Now"

❌ INCORRECT:
"Utilize our streamlined reservation system to secure your dining experience"
"Limited availability remaining for this evening's service"
"Italian Cuisine • Moderately Priced • Currently Accepting Reservations"
```

**2. Use Action-Oriented Language**

```
✅ CORRECT:
- "Book Now" (not "Make a Reservation")
- "Find Restaurants" (not "Search")
- "View Menu" (not "See Menu Items")
- "Confirm Booking" (not "Submit")

❌ INCORRECT:
- "Proceed to Reservation"
- "Browse Options"
- "Access Menu"
- "Finalize"
```

**3. Build Trust with Specificity**

```
✅ CORRECT:
"Hosted by Chef Maria, 15 years experience"
"4.8★ from 127 verified guests"
"Free cancellation until 6pm today"
"Instant confirmation"

❌ INCORRECT:
"Experienced host"
"Highly rated"
"Flexible cancellation"
"Quick confirmation"
```

**4. Address Tourist Needs**

```
✅ CORRECT:
"English menu available"
"Vegetarian options: 8 dishes"
"Near Central Station (5 min walk)"
"Credit cards accepted"

❌ INCORRECT:
"Menu available"
"Dietary options"
"Centrally located"
"Payment accepted"
```

### Microcopy Examples

**Empty States:**

```
✅ "No bookings yet. Discover restaurants near you!"
✅ "Your favorites list is empty. Start exploring!"

❌ "No results found."
❌ "0 items"
```

**Loading States:**

```
✅ "Finding the perfect restaurants for you..."
✅ "Confirming your booking..."

❌ "Loading..."
❌ "Please wait"
```

**Error States:**

```
✅ "Oops! This restaurant is fully booked. Try these alternatives:"
✅ "We couldn't process your payment. Please check your card details."

❌ "Error 404"
❌ "Payment failed"
```

**Success States:**

```
✅ "Booking confirmed! Check your email for details."
✅ "Added to favorites ❤️"

❌ "Success"
❌ "Operation completed"
```

### Content Guidelines

**DO:**

- ✅ Use sentence case for headings ("Discover local dining")
- ✅ Write in second person ("You'll love this...")
- ✅ Include specific details (times, numbers, locations)
- ✅ Use contractions ("you'll", "we're") for warmth
- ✅ Address accessibility needs explicitly
- ✅ Provide context for tourists (currency, local customs)

**DON'T:**

- ❌ Use jargon or technical terms
- ❌ Write in third person ("Users can...")
- ❌ Be vague ("Various options available")
- ❌ Use formal language ("Please be advised...")
- ❌ Assume local knowledge
- ❌ Use marketing fluff ("Amazing!", "Incredible!")

---

## Iconography

### Icon Library

DineLocal uses **Lucide React** for consistent, accessible icons.

```tsx
import {
  Heart, // Favorites
  MapPin, // Location
  Calendar, // Booking dates
  Clock, // Time/hours
  Users, // Group size
  Star, // Ratings
  Search, // Search
  Filter, // Filters
  ChevronRight, // Navigation
  X, // Close/cancel
  Check, // Confirm/success
  AlertCircle, // Warning/error
  Info, // Information
  Menu, // Mobile menu
  ArrowLeft, // Back navigation
} from 'lucide-react'
```

### Icon Usage

```tsx
// ✅ CORRECT: Proper sizing and accessibility
<Button>
  <Heart className="h-4 w-4 mr-2" />
  <span>Add to Favorites</span>
</Button>

<Button size="icon" aria-label="Add to favorites">
  <Heart className="h-5 w-5" />
</Button>

// ❌ INCORRECT: No label for icon-only button
<Button size="icon">
  <Heart className="h-5 w-5" />
</Button>
```

### Icon Size Guidelines

```tsx
// Small icons (inline with text)
className = 'h-4 w-4' // 16px - Small buttons, inline text

// Medium icons (default)
className = 'h-5 w-5' // 20px - Standard buttons, cards

// Large icons (emphasis)
className = 'h-6 w-6' // 24px - Large buttons, headers

// Extra large icons (empty states, heroes)
className = 'h-8 w-8' // 32px - Feature sections
className = 'h-12 w-12' // 48px - Empty states
```

### Icon Color Guidelines

```tsx
// Default (inherit text color)
<MapPin className="h-5 w-5" />

// Muted (secondary information)
<Clock className="h-4 w-4 text-muted-foreground" />

// Semantic colors
<Check className="h-5 w-5 text-green-600" />      // Success
<AlertCircle className="h-5 w-5 text-amber-600" /> // Warning
<X className="h-5 w-5 text-red-600" />             // Error
<Info className="h-5 w-5 text-blue-600" />         // Info
```

### Iconography Guidelines

**DO:**

- ✅ Use consistent icon sizes within the same context
- ✅ Provide `aria-label` for icon-only buttons
- ✅ Use semantic icons (Heart for favorites, MapPin for location)
- ✅ Maintain 44px minimum touch target for icon buttons
- ✅ Add proper spacing between icon and text (mr-2, ml-2)

**DON'T:**

- ❌ Mix icon libraries (stick to Lucide React)
- ❌ Use decorative icons without semantic meaning
- ❌ Create icon-only buttons without labels
- ❌ Use icons smaller than 16px
- ❌ Overuse icons (text is often clearer)

---

## Imagery & Photos

### Restaurant Photos

**Required Specifications:**

```tsx
// List view thumbnail
width: 320px
height: 240px
aspect-ratio: 4/3
format: WebP (with JPEG fallback)
quality: 80

// Detail view hero
width: 1200px
height: 675px
aspect-ratio: 16/9
format: WebP (with JPEG fallback)
quality: 85
```

**Next.js Image Component:**

```tsx
// ✅ CORRECT: Optimized, accessible images
<Image
  src="/restaurants/restaurant-hero.jpg"
  alt="Interior of La Trattoria showing rustic wooden tables and warm lighting"
  width={1200}
  height={675}
  className="rounded-lg object-cover"
  priority={false}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>

// ❌ INCORRECT: No alt text, no optimization
<img src="/restaurants/photo.jpg" />
```

### Image Alt Text Guidelines

```tsx
// ✅ CORRECT: Descriptive alt text
alt="Grilled salmon with roasted vegetables and lemon garnish"
alt="Chef Maria preparing fresh pasta in open kitchen"
alt="Outdoor terrace with city skyline view at sunset"

// ❌ INCORRECT: Generic or missing alt text
alt="food"
alt="restaurant"
alt="" (unless truly decorative)
```

### Placeholder Images

```tsx
// Loading skeleton
<Skeleton className="w-full h-60 rounded-lg" />

// Error fallback
<Flex
  className="w-full h-60 bg-muted rounded-lg"
  justifyContent="center"
  alignItems="center"
>
  <ImageOff className="h-8 w-8 text-muted-foreground" />
</Flex>

// Blur-up loading (Next.js)
<Image
  src={imageUrl}
  placeholder="blur"
  blurDataURL={shimmer(700, 475)}
  alt={altText}
/>
```

### Image Quality Guidelines

**DO:**

- ✅ Use WebP format with JPEG fallback
- ✅ Optimize images (max 200KB for thumbnails, 500KB for heroes)
- ✅ Use responsive images with `srcset`
- ✅ Provide descriptive alt text (8-12 words)
- ✅ Use lazy loading for images below the fold
- ✅ Implement blur-up loading for better UX

**DON'T:**

- ❌ Use raw uploads without optimization
- ❌ Forget alt text (accessibility)
- ❌ Use images over 1MB in size
- ❌ Skip aspect ratio (causes layout shift)
- ❌ Use generic filenames (IMG_1234.jpg)

---

## Animation & Motion

### Animation Principles

**DineLocal animations should be:**

- ⚡ **Fast:** 150-300ms for UI interactions
- 🎯 **Purposeful:** Guide attention, indicate state changes
- ♿ **Respectful:** Honor `prefers-reduced-motion`
- 🪶 **Subtle:** Enhance, don't distract

### Transition Utilities

```tsx
// Standard transitions
transition-all          // All properties (use sparingly)
transition-colors       // Color changes (buttons, links)
transition-opacity      // Fade in/out
transition-transform    // Scale, translate
transition-shadow       // Shadow changes (cards)

// Duration
duration-150            // 150ms - Fast (hover states)
duration-200            // 200ms - Default (most UI)
duration-300            // 300ms - Slower (drawers, modals)
duration-500            // 500ms - Slow (page transitions)

// Easing
ease-in                 // Start slow
ease-out                // End slow (default for most)
ease-in-out             // Both (smooth)
```

### Common Animation Patterns

**Button Hover:**

```tsx
<Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">Book Now</Button>
```

**Card Hover:**

```tsx
<Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  {/* Content */}
</Card>
```

**Fade In (loading content):**

```tsx
<div className="animate-in fade-in opacity-0 duration-500">{/* Content */}</div>
```

**Slide In (drawers, modals):**

```tsx
<Sheet>
  <SheetContent className="animate-in slide-in-from-right duration-300">
    {/* Drawer content */}
  </SheetContent>
</Sheet>
```

**Loading Spinner:**

```tsx
<div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
```

### Respecting User Preferences

```tsx
// ✅ CORRECT: Honor prefers-reduced-motion
<Card className="
  hover:shadow-lg
  transition-shadow
  motion-reduce:transition-none
">
  {/* Content */}
</Card>

// Global CSS (tailwind.config.js handles this)
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Guidelines

**DO:**

- ✅ Use `transition-colors` for button hovers
- ✅ Use `transition-shadow` for card elevation
- ✅ Keep durations under 500ms
- ✅ Use `ease-out` for most transitions
- ✅ Add `motion-reduce:transition-none` for accessibility
- ✅ Test animations on slower devices

**DON'T:**

- ❌ Use `transition-all` excessively (performance)
- ❌ Animate layout properties (width, height) frequently
- ❌ Create infinite animations without pause
- ❌ Ignore `prefers-reduced-motion`
- ❌ Use animations longer than 1 second
- ❌ Animate purely for decoration

---

## Performance & Core Web Vitals

### 2025 Performance Targets

**Core Web Vitals:**

- **LCP (Largest Contentful Paint):** < 2.5s (Good), < 4.0s (Needs Improvement)
- **INP (Interaction to Next Paint):** < 200ms (Good), < 500ms (Needs Improvement)
- **CLS (Cumulative Layout Shift):** < 0.1 (Good), < 0.25 (Needs Improvement)

**Why These Matter:**

- **LCP:** Measures perceived load speed (when main content appears)
- **INP:** Measures responsiveness to user interactions (replaced FID in 2024)
- **CLS:** Measures visual stability (prevents layout jumps)

### Image Optimization

**Modern Image Formats:**

```tsx
// ✅ CORRECT: WebP with JPEG fallback
<Image
  src="/restaurants/hero.jpg"
  alt="Restaurant interior with warm lighting and wooden tables"
  width={1200}
  height={675}
  format="webp"
  quality={85}
  placeholder="blur"
  loading="lazy"
/>

// ✅ Use srcset for responsive images
<img
  srcset="
    /restaurant-320w.webp 320w,
    /restaurant-640w.webp 640w,
    /restaurant-1200w.webp 1200w
  "
  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1200px"
  src="/restaurant-640w.webp"
  alt="Grilled salmon with roasted vegetables"
  loading="lazy"
/>
```

**Image Size Guidelines:**

```tsx
// Hero images (above the fold)
width: 1200px, height: 675px (16:9)
format: WebP
quality: 85
max file size: 200KB
loading: "eager" or priority={true}

// Thumbnail images (below the fold)
width: 400px, height: 300px (4:3)
format: WebP
quality: 80
max file size: 50KB
loading: "lazy"

// User avatars
width: 128px, height: 128px (1:1)
format: WebP
quality: 85
max file size: 20KB
loading: "lazy"
```

**Preventing Cumulative Layout Shift (CLS):**

```tsx
// ✅ CORRECT: Always specify width/height to reserve space
<Image
  src={imageUrl}
  width={800}
  height={600}
  alt="Food photo"
  className="w-full h-auto object-cover"
/>

// ❌ INCORRECT: No dimensions (causes layout shift)
<img src={imageUrl} alt="Food photo" className="w-full" />
```

### Bundle Size Guidelines

**Target Bundle Sizes:**

- **JavaScript (per route):** < 100KB gzipped
- **CSS:** < 50KB gzipped (Tailwind with purging enabled)
- **Total initial load:** < 300KB gzipped

**Code Splitting Strategy:**

```tsx
// ✅ CORRECT: Dynamic import for heavy components
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/shared/map-view'), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false, // Don't render on server if uses browser APIs
})

// ✅ CORRECT: Route-based code splitting (Next.js handles automatically)
// Each page in /app directory gets its own bundle
```

### Lazy Loading

**Images:**

```tsx
// ✅ Lazy load below-the-fold images
<Image
  src={imageUrl}
  loading="lazy"
  className="w-full h-60 object-cover"
/>

// ✅ Priority load above-the-fold images
<Image
  src={heroImage}
  priority={true}
  className="w-full h-96 object-cover"
/>
```

**Components:**

```tsx
// ✅ Lazy load modals, drawers, tooltips
const BookingModal = dynamic(() => import('./booking-modal'), {
  loading: () => <Skeleton className="h-[600px] w-full" />,
})
```

### Performance Guidelines

**DO:**

- ✅ Use Next.js Image component for automatic optimization
- ✅ Enable Tailwind CSS purging to remove unused styles
- ✅ Lazy load images below the fold
- ✅ Code-split heavy components (maps, charts, editors)
- ✅ Use WebP format with JPEG fallback
- ✅ Specify image dimensions to prevent CLS
- ✅ Minimize JavaScript bundle size with dynamic imports

**DON'T:**

- ❌ Load all images eagerly (use lazy loading)
- ❌ Use unoptimized images (raw uploads without compression)
- ❌ Import heavy libraries globally (dynamic import instead)
- ❌ Forget to specify image dimensions (causes layout shift)
- ❌ Use large JavaScript bundles (code-split by route)
- ❌ Block rendering with synchronous scripts

---

## Loading States & Progressive Enhancement

### Loading Strategy

**Progressive Loading Hierarchy:**

1. **Instant:** Show skeleton/placeholder immediately
2. **Fast (<500ms):** Show spinner for quick operations
3. **Slow (>500ms):** Show progress indicator with estimated time
4. **Very Slow (>3s):** Show progress + cancel option

### Skeleton Screens

**Use skeleton screens for content loading (better UX than spinners):**

```tsx
// Restaurant card skeleton
<Card className="p-6 space-y-4">
  <Skeleton className="w-full h-48 rounded-lg" />
  <Skeleton className="w-3/4 h-6" />
  <Skeleton className="w-1/2 h-4" />
  <Flex className="gap-2">
    <Skeleton className="w-16 h-4" />
    <Skeleton className="w-16 h-4" />
  </Flex>
</Card>

// List skeleton
<div className="space-y-4">
  {Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} className="w-full h-24 rounded-lg" />
  ))}
</div>

// Text content skeleton
<div className="space-y-2">
  <Skeleton className="w-full h-4" />
  <Skeleton className="w-5/6 h-4" />
  <Skeleton className="w-4/6 h-4" />
</div>
```

### Loading Spinner

**Use sparingly - only for quick operations (<1s expected):**

```tsx
// Button loading state
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Book Now
</Button>

// Page loading
<Flex justifyContent="center" alignItems="center" className="min-h-[400px]">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</Flex>
```

### Progress Indicators

**For operations with known duration:**

```tsx
// Upload progress
<div className="space-y-2">
  <Flex justifyContent="between">
    <Text className="text-sm">Uploading photos...</Text>
    <Text className="text-sm text-muted-foreground">{progress}%</Text>
  </Flex>
  <Progress value={progress} className="h-2" />
</div>

// Multi-step process
<div className="space-y-4">
  <Flex justifyContent="between" className="text-sm">
    <span>Processing booking...</span>
    <span className="text-muted-foreground">Step 2 of 3</span>
  </Flex>
  <Progress value={66} className="h-2" />
</div>
```

### Error States

**Friendly, actionable error messages:**

```tsx
// ✅ CORRECT: Specific, helpful error with action
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Couldn't load restaurants</AlertTitle>
  <AlertDescription>
    Check your internet connection and try again.
  </AlertDescription>
  <Button variant="outline" onClick={retry} className="mt-2">
    Retry
  </Button>
</Alert>

// ✅ CORRECT: Inline form error
<div className="space-y-2">
  <Input
    className="border-red-600"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <Text id="email-error" className="text-sm text-red-700">
    Please enter a valid email address (e.g., you@example.com)
  </Text>
</div>

// ❌ INCORRECT: Vague error
<div>Error</div>
<div>Something went wrong</div>
```

### Empty States

**Encouraging, actionable empty states:**

```tsx
// ✅ CORRECT: Helpful empty state with CTA
<Flex direction="column" alignItems="center" className="gap-4 py-12">
  <CalendarOff className="h-12 w-12 text-muted-foreground" />
  <Heading as="h3" textColor="muted">No bookings yet</Heading>
  <Paragraph textAlign="center" className="max-w-md text-muted-foreground">
    Start exploring authentic local dining experiences near you!
  </Paragraph>
  <Button onClick={navigateToExplore}>
    Discover Experiences
  </Button>
</Flex>

// Search with no results
<Flex direction="column" alignItems="center" className="gap-4 py-12">
  <Search className="h-12 w-12 text-muted-foreground" />
  <Heading as="h3" textColor="muted">No results for "{searchQuery}"</Heading>
  <Paragraph textAlign="center" className="max-w-md text-muted-foreground">
    Try adjusting your filters or search for different keywords.
  </Paragraph>
  <Button variant="outline" onClick={clearFilters}>
    Clear Filters
  </Button>
</Flex>
```

### Optimistic UI Updates

**Show instant feedback, rollback on error:**

```tsx
const { mutate: addToFavorites } = useMutation({
  mutationFn: addFavorite,
  onMutate: async (experienceId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['favorites'] })

    // Snapshot previous value
    const previousFavorites = queryClient.getQueryData(['favorites'])

    // Optimistically update to show as favorited
    queryClient.setQueryData(['favorites'], (old) => [...old, experienceId])

    return { previousFavorites }
  },
  onError: (error, experienceId, context) => {
    // Rollback on error
    queryClient.setQueryData(['favorites'], context.previousFavorites)
    toast.error('Failed to add to favorites. Please try again.')
  },
  onSuccess: () => {
    toast.success('Added to favorites')
  },
})
```

### Loading State Guidelines

**DO:**

- ✅ Use skeleton screens for predictable content layouts
- ✅ Show specific error messages with recovery actions
- ✅ Provide encouraging, helpful empty states
- ✅ Use optimistic UI for instant perceived feedback
- ✅ Disable buttons during submission (prevents double-click)
- ✅ Show progress for operations >3 seconds
- ✅ Provide cancel option for long operations

**DON'T:**

- ❌ Show generic "Loading..." text without visual indicator
- ❌ Display vague error messages ("Error 500")
- ❌ Show empty states without actionable next steps
- ❌ Block entire page for partial data loading
- ❌ Forget to disable submit buttons during processing
- ❌ Use spinners for content that takes >2 seconds

---

## Responsive Design

**Design Strategy:**
For mobile-first philosophy, responsive UX patterns, and design rationale, see:
📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` → Mobile-First for Tourists

### Breakpoints

**Tailwind Default Breakpoints (Validated for 2025):**

```tsx
// Mobile-first approach: base styles = mobile (320-639px)
// Then scale up with breakpoint prefixes

sm:   640px   // Small tablets, large phones in landscape
md:   768px   // Tablets (portrait), iPad (768×1024)
lg:   1024px  // Small laptops, tablets (landscape)
xl:   1280px  // Desktops, laptops (1280×800, 1366×768)
2xl:  1536px  // Large desktops (1920×1080)
```

**Common Device Widths (2025 Data):**

| Device Type             | Common Widths          | DineLocal Breakpoint | Notes                          |
| ----------------------- | ---------------------- | -------------------- | ------------------------------ |
| **Small phones**        | 320px, 360px           | Base (no prefix)     | iPhone SE, budget Android      |
| **Standard phones**     | 375px, 390px, 414px    | Base (no prefix)     | iPhone 13/14, most smartphones |
| **Large phones**        | 430px                  | Base (no prefix)     | iPhone 14 Pro Max              |
| **Phones (landscape)**  | 640-800px              | `sm:`                | Rare but possible              |
| **Tablets (portrait)**  | 768px, 800px           | `md:`                | iPad, Android tablets          |
| **Tablets (landscape)** | 1024px                 | `lg:`                | iPad landscape                 |
| **Laptops**             | 1280px, 1366px, 1440px | `xl:`                | Most common laptop sizes       |
| **Desktops**            | 1920px+                | `2xl:`               | External monitors              |

**Why These Breakpoints Work for DineLocal:**

1. **Base (320-639px):** Covers **59% of web traffic** (mobile devices)
   - Tourists primarily use phones to browse while traveling
   - Must be fully functional at 360px width (most common mobile)

2. **sm: 640px:** Catches edge cases (large phones in landscape, small tablets)
   - Use for minor layout adjustments (e.g., 2-column grid instead of 1)

3. **md: 768px:** Tablet breakpoint (aligns with **iPad standard**)
   - Significant layout changes (sidebar appears, multi-column layouts)
   - DineLocal: Show desktop navigation, hide mobile drawer

4. **lg: 1024px:** Small desktop / tablet landscape
   - Full desktop experience begins here
   - 3-column grids, larger images, more spacing

5. **xl: 1280px:** Standard desktop
   - Most comfortable desktop experience
   - Max content width, optimal reading line length

6. **2xl: 1536px:** Large displays
   - Primarily for max-width constraints (prevent overly wide layouts)
   - DineLocal: Max content container width to maintain readability

**Testing Priority (based on analytics):**

1. **375px** (iPhone 13/14) - **Highest priority**
2. **390px** (iPhone 14) - High priority
3. **360px** (Budget Android) - High priority
4. **768px** (iPad portrait) - Medium priority
5. **1280px** (Laptop) - Medium priority
6. **430px** (iPhone 14 Pro Max) - Low priority (rare edge case)

**Breakpoint Validation Result: ✅ KEEP CURRENT TAILWIND BREAKPOINTS**

The default Tailwind breakpoints align perfectly with 2025 device usage patterns. No changes needed.

### Mobile-First Approach

```tsx
// ✅ CORRECT: Mobile-first (base = mobile, scale up)
<Flex
  direction="column"           // Mobile: stack vertically
  gap="gap-4"                  // Mobile: smaller gap
  className="p-4"              // Mobile: smaller padding
  md:direction="row"           // Tablet: horizontal
  md:gap="gap-6"               // Tablet: larger gap
  md:className="md:p-6"        // Tablet: larger padding
  lg:className="lg:p-8"        // Desktop: even larger
>
  {/* Content */}
</Flex>

// ❌ INCORRECT: Desktop-first
<Flex
  direction="row"
  md:direction="column"
>
  {/* Wrong approach */}
</Flex>
```

### Responsive Typography

```tsx
// ✅ CORRECT: Responsive text sizes
<Heading
  as="h1"
  className="
    text-2xl          // Mobile: 24px
    sm:text-3xl       // Tablet: 30px
    md:text-4xl       // Desktop: 36px
    lg:text-5xl       // Large: 48px
  "
>
  Discover Local Dining
</Heading>

// Body text (usually doesn't need responsive sizing)
<Text className="text-base">
  {/* 16px on all devices */}
</Text>
```

### Responsive Grids

```tsx
// ✅ CORRECT: Responsive grid layout
<div className="// Mobile: 1 column // Tablet: 2 columns // Desktop: 3 columns // Large: 4 columns grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
  {restaurants.map((restaurant) => (
    <RestaurantCard key={restaurant.id} {...restaurant} />
  ))}
</div>
```

### Responsive Spacing

```tsx
// ✅ CORRECT: Responsive padding/margin
<section className="// Mobile: smaller padding // Tablet: medium padding // Desktop: larger padding px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
  {/* Content */}
</section>
```

### Mobile-Specific Patterns

**Mobile Navigation:**

```tsx
// Hamburger menu on mobile, full nav on desktop
<nav className="hidden md:flex md:gap-6">
  {/* Desktop navigation */}
</nav>

<Sheet>
  <SheetTrigger className="md:hidden">
    <Menu className="h-6 w-6" />
  </SheetTrigger>
  {/* Mobile drawer */}
</Sheet>
```

**Touch-Friendly Targets:**

```tsx
// ✅ CORRECT: 48px+ touch targets (industry best practice)
<Button className="h-12 px-6">           // 48px height
<Button size="icon" className="h-12 w-12">  // 48px square

// ✅ ACCEPTABLE: 44px for compact layouts (WCAG 2.2 compliant)
<Button size="compact" className="h-11 px-4">  // 44px height

// ❌ INCORRECT: Too small for touch
<Button className="h-8 px-2">            // 32px - too small
```

**Responsive Images:**

```tsx
// ✅ CORRECT: Responsive image sizing
<Image
  src={imageUrl}
  alt={altText}
  width={800}
  height={600}
  className="// Mobile (320-639px): 192px // Small tablet (640px+): 240px // Tablet/Desktop (768px+): 288px h-48 w-full rounded-lg object-cover sm:h-60 md:h-72"
/>
```

**Container Max Widths:**

```tsx
// ✅ Prevent overly wide layouts on large screens
<Container className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{/* Page content */}</Container>

// Breakpoint-specific max-widths
// Mobile (base): No max-width, 100% with horizontal padding
// sm (640px+): max-w-screen-sm (640px)
// md (768px+): max-w-screen-md (768px)
// lg (1024px+): max-w-7xl (1280px) - DineLocal standard
// xl (1280px+): max-w-7xl (stays at 1280px)
// 2xl (1536px+): max-w-7xl (stays at 1280px)
```

### Mobile-Specific Interaction Patterns

#### Swipe Gestures

**Use for image galleries and card interactions:**

```tsx
import { useSwipeable } from 'react-swipeable'

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((i) => Math.min(i + 1, images.length - 1)),
    onSwipedRight: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    trackMouse: true, // Also works with mouse drag on desktop
    preventScrollOnSwipe: true,
  })

  return (
    <div {...handlers} className="relative touch-pan-y overflow-hidden">
      <Image src={images[currentIndex]} alt="" />
      {/* Pagination dots */}
      <Flex justifyContent="center" className="mt-4 gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
            )}
          />
        ))}
      </Flex>
    </div>
  )
}
```

#### Bottom Sheet / Drawer Patterns

**Use for filters, actions, confirmations on mobile:**

```tsx
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'

// Mobile filters (drawer from bottom)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" className="md:hidden">
      <Filter className="mr-2 h-4 w-4" />
      Filters
    </Button>
  </SheetTrigger>
  <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
    <SheetHeader>
      <SheetTitle>Filter Experiences</SheetTitle>
    </SheetHeader>
    <FilterForm />
  </SheetContent>
</Sheet>

// Desktop filters (sidebar or inline)
<aside className="hidden md:block w-64 space-y-4">
  <Heading as="h3" className="text-lg font-semibold">Filters</Heading>
  <FilterForm />
</aside>
```

#### Pull-to-Refresh (Optional)

**For feed-style content (experiences list, bookings):**

```tsx
import PullToRefresh from 'react-simple-pull-to-refresh'

;<PullToRefresh
  onRefresh={async () => {
    await queryClient.invalidateQueries({ queryKey: ['experiences'] })
  }}
  pullingContent={<div className="py-4 text-center">Pull to refresh...</div>}
  refreshingContent={<Loader2 className="mx-auto h-6 w-6 animate-spin" />}
>
  <ExperienceList experiences={data} />
</PullToRefresh>
```

#### Safe Area Handling

**Account for device notches and navigation bars:**

```css
/* globals.css - Add safe area support */
.safe-area-inset {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.safe-area-top {
  padding-top: max(1rem, env(safe-area-inset-top));
}

.safe-area-bottom {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

```tsx
// Fixed header with safe area
<header className="fixed top-0 w-full bg-background z-50 safe-area-top">
  <nav className="px-4 py-3">
    {/* Navigation content */}
  </nav>
</header>

// Fixed bottom navigation (iOS/Android safe area)
<nav className="fixed bottom-0 w-full bg-background border-t safe-area-bottom">
  <Flex justifyContent="around" className="py-2">
    {/* Bottom nav items */}
  </Flex>
</nav>
```

#### Touch-Friendly Spacing

**Extra padding for better tap targets on mobile:**

```tsx
// ✅ CORRECT: Generous touch targets on mobile
<Button
  className="
    h-12 px-6              /* 48px height */
    min-w-[120px]          /* Prevent tiny buttons */
    touch-manipulation     /* Disable double-tap zoom */
    active:scale-95        /* Visual feedback on tap */
    transition-transform
  "
>
  Book Now
</Button>

// ✅ CORRECT: List items with padding for easier tapping
<Card
  className="
    p-4                    /* Mobile: generous padding */
    md:p-6                 /* Desktop: more padding */
    cursor-pointer
    active:bg-accent       /* Mobile tap feedback */
    hover:shadow-lg        /* Desktop hover effect */
    transition-all
  "
  onClick={handleClick}
>
  {/* Card content */}
</Card>
```

### Responsive Design Guidelines

**DO:**

- ✅ Design mobile-first (320px base, scale up)
- ✅ Test on actual devices (not just browser resize)
- ✅ Use responsive typography (text-2xl sm:text-3xl lg:text-4xl)
- ✅ Ensure 48px touch targets on mobile (44px minimum)
- ✅ Use responsive grids (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- ✅ Hide/show content appropriately (hidden md:block)
- ✅ Add swipe gestures for image galleries on mobile
- ✅ Use bottom sheets for mobile filters/actions
- ✅ Account for safe areas (notches, navigation bars)
- ✅ Add active states for mobile tap feedback

**DON'T:**

- ❌ Design desktop-first
- ❌ Use fixed pixel widths (w-[500px])
- ❌ Assume mouse/hover on mobile
- ❌ Create horizontal scrolling on mobile
- ❌ Use small touch targets (<48px, absolute minimum 44px)
- ❌ Forget landscape tablet orientation
- ❌ Ignore safe areas on iOS/Android
- ❌ Use hover-only interactions on mobile

---

## Accessibility

### WCAG 2.2 AA Compliance

DineLocal follows WCAG 2.2 AA standards. Key requirements:

**Design Philosophy:**
For comprehensive accessibility rationale, WCAG 2.2 criteria, and user experience patterns, see:
📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` → Accessibility for Global Audience

**1. Color Contrast**

```tsx
// ✅ CORRECT: 4.5:1 for normal text
text-foreground on bg-background       // 900 on white = 21:1
text-muted-foreground on bg-background // 600 on white = 4.6:1

// ✅ CORRECT: 3:1 for large text (18pt+)
text-muted-foreground on bg-muted      // Acceptable for large text

// ❌ INCORRECT: Insufficient contrast
text-gray-400 on bg-white              // 2.8:1 - fails WCAG
```

**2. Focus Indicators (WCAG 2.4.13)**

```tsx
// ✅ CORRECT: 2px thick, 3:1 contrast
<Button className="focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-none">
  Book Now
</Button>

// All Shadcn/UI components have proper focus states by default
```

**3. Touch Targets (WCAG 2.5.8 Enhanced)**

```tsx
// ✅ CORRECT: 48px minimum (DineLocal standard - exceeds WCAG 2.2)
<Button className="h-12 px-6">         // 48px height
<Checkbox className="h-5 w-5 p-3">     // 48px touch area with padding

// ✅ ACCEPTABLE: 44px for compact layouts (meets WCAG 2.2 minimum)
<Button size="compact" className="h-11 px-4">  // 44px height

// ❌ INCORRECT: Too small
<Button className="h-8 px-2">          // 32px - fails WCAG 2.5.8
```

**4. Focus Not Obscured (WCAG 2.4.11)**

```tsx
// ✅ CORRECT: Ensure sticky headers don't hide focused elements
<header className="sticky top-0 z-50 bg-background">
  {/* Navigation */}
</header>

<main className="scroll-mt-16">       // Offset for sticky header
  {/* Content */}
</main>
```

**5. Keyboard Navigation**

```tsx
// ✅ CORRECT: All interactive elements keyboard accessible
<Button onKeyDown={handleKeyDown} onClick={handleClick}>
  Book Now
</Button>

// ✅ CORRECT: Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  {/* Content */}
</main>
```

**6. ARIA Labels**

```tsx
// ✅ CORRECT: Icon-only buttons
<Button size="icon" aria-label="Add to favorites">
  <Heart className="h-5 w-5" />
</Button>

// ✅ CORRECT: Form inputs
<Label htmlFor="email">Email Address</Label>
<Input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-help"
/>
<Text id="email-help" className="text-sm text-muted-foreground">
  We'll never share your email.
</Text>

// ✅ CORRECT: Live regions
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>
```

**7. Semantic HTML**

```tsx
// ✅ CORRECT: Proper heading hierarchy
<Heading as="h1">Page Title</Heading>
<Heading as="h2">Section Title</Heading>
<Heading as="h3">Subsection Title</Heading>

// ✅ CORRECT: Semantic elements
<nav aria-label="Main navigation">
<main>
<article>
<aside>
<footer>

// ❌ INCORRECT: Div soup
<div className="navigation">
<div className="main">
```

### Accessibility Guidelines

**DO:**

- ✅ Ensure 4.5:1 contrast for text (use contrast checker)
- ✅ Provide alt text for all images (8-12 words)
- ✅ Use semantic HTML (nav, main, article, button)
- ✅ Add ARIA labels for icon-only buttons
- ✅ Test with keyboard navigation (Tab, Enter, Space, Esc)
- ✅ Test with screen reader (NVDA, JAWS, VoiceOver)
- ✅ Ensure 44px+ touch targets
- ✅ Support text resizing up to 200%

**DON'T:**

- ❌ Use color alone to convey information
- ❌ Create keyboard traps
- ❌ Skip focus indicators
- ❌ Use `<div>` for buttons or links
- ❌ Use placeholders as labels
- ❌ Auto-play audio/video
- ❌ Set timeout without warning

---

## Internationalization (i18n)

### Overview

DineLocal serves a **global tourist audience** visiting destinations worldwide. While English is the primary language now, the design system should be prepared for internationalization.

### RTL (Right-to-Left) Language Support

**Prepare for Arabic, Hebrew, Urdu, Persian:**

```tsx
// Layout component with RTL support
<html dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'} lang={locale}>

// ✅ CORRECT: Use logical properties (auto-flip in RTL)
<div className="ms-4 me-2 ps-6 pe-4">
  {/* ms = margin-inline-start, me = margin-inline-end */}
  {/* ps = padding-inline-start, pe = padding-inline-end */}
</div>

// ❌ INCORRECT: Directional properties (don't flip in RTL)
<div className="ml-4 mr-2 pl-6 pr-4">
  {/* ml/mr/pl/pr stay fixed, breaking RTL layout */}
</div>

// ✅ CORRECT: Use start/end for text alignment
<Text className="text-start">Aligns left in LTR, right in RTL</Text>
<Text className="text-end">Aligns right in LTR, left in RTL</Text>

// ❌ INCORRECT: Fixed directional alignment
<Text className="text-left">Always left, even in RTL</Text>
```

**Tailwind Logical Properties Reference:**

```tsx
// Margins
ms - 4 // margin-inline-start (left in LTR, right in RTL)
me - 4 // margin-inline-end (right in LTR, left in RTL)

// Padding
ps - 6 // padding-inline-start
pe - 6 // padding-inline-end

// Borders
border - s // border-inline-start
border - e // border-inline-end

// Rounding
rounded - s // rounded-inline-start
rounded - e // rounded-inline-end
```

### Date & Time Formatting

**Use `date-fns` with locale support:**

```tsx
import { format, formatDistance, formatRelative } from 'date-fns'
import { enUS, ja, es, fr, de, ar, zh } from 'date-fns/locale'

const locales = {
  en: enUS,
  ja: ja,
  es: es,
  fr: fr,
  de: de,
  ar: ar,
  zh: zh
}

// Format date based on user locale
<Paragraph>
  {format(bookingDate, 'PPP', { locale: locales[userLocale] })}
</Paragraph>
{/*
  en: January 15, 2025
  ja: 2025年1月15日
  es: 15 de enero de 2025
  fr: 15 janvier 2025
  de: 15. Januar 2025
  ar: ١٥ يناير ٢٠٢٥
*/}

// Relative time formatting
<Text className="text-sm text-muted-foreground">
  {formatDistance(bookingDate, new Date(), {
    addSuffix: true,
    locale: locales[userLocale]
  })}
</Text>
{/*
  en: in 3 days
  ja: 3 日後
  es: dentro de 3 días
  fr: dans 3 jours
*/}
```

### Currency Display

**Format currency based on user locale and detected currency:**

```tsx
const formatCurrency = (
  amount: number,
  currency: string,
  locale: string
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

// Examples:
formatCurrency(45, 'USD', 'en-US')  // $45
formatCurrency(45, 'EUR', 'de-DE')  // 45 €
formatCurrency(45, 'EUR', 'fr-FR')  // 45 €
formatCurrency(45, 'JPY', 'ja-JP')  // ¥45
formatCurrency(45, 'GBP', 'en-GB')  // £45
formatCurrency(4500, 'INR', 'en-IN') // ₹4,500

// Usage in component
<Paragraph textColor="primary" fontWeight="bold" className="text-2xl">
  {formatCurrency(experience.price, experience.currency, userLocale)}
  <Text as="span" className="text-sm text-muted-foreground">
    {' '}per person
  </Text>
</Paragraph>
```

### Number Formatting

**Handle different decimal separators and thousands separators:**

```tsx
const formatNumber = (value: number, locale: string): string => {
  return new Intl.NumberFormat(locale).format(value)
}

formatNumber(1234.56, 'en-US')  // 1,234.56
formatNumber(1234.56, 'de-DE')  // 1.234,56
formatNumber(1234.56, 'fr-FR')  // 1 234,56
formatNumber(1234.56, 'en-IN')  // 1,234.56

// Display review count
<Flex alignItems="center" className="gap-2">
  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
  <Text fontWeight="semi-bold">4.8</Text>
  <Text className="text-sm text-muted-foreground">
    ({formatNumber(127, userLocale)} reviews)
  </Text>
</Flex>
```

### Translation Keys (Future Preparation)

**Structure content for future translation system:**

```tsx
// ✅ CORRECT: Separate strings for translation
const translations = {
  'booking.cta': 'Book Now',
  'booking.confirmation': 'Booking confirmed! Check your email for details.',
  'booking.guests': '{count, plural, one {# guest} other {# guests}}',
  'error.network': 'Check your internet connection and try again.',
  'empty.bookings.title': 'No bookings yet',
  'empty.bookings.description': 'Start exploring local dining experiences near you!',
  'empty.bookings.cta': 'Discover Experiences'
}

// Use translation function (prepare for future i18n library)
const t = (key: string, params?: Record<string, any>) => {
  // For now, return English strings
  // Later: Use i18next, react-intl, or next-intl
  return translations[key] || key
}

<Button>{t('booking.cta')}</Button>

// ❌ INCORRECT: Hardcoded strings scattered everywhere
<Button>Book Now</Button>
<Button>Reserve</Button>  // Inconsistent terminology
<Button>Book This Experience</Button>  // Different wording
```

### Text Overflow in Different Languages

**Some languages (German, Finnish, Thai) are 30-40% longer than English:**

```tsx
// ✅ CORRECT: Allow text to wrap or truncate gracefully
<Button className="min-w-[120px] max-w-[200px]">
  <span className="truncate">{t('booking.cta')}</span>
</Button>

// ✅ CORRECT: Multi-line labels for longer text
<Label className="leading-relaxed">
  {t('form.allergenInfo.label')}
</Label>

// ❌ INCORRECT: Fixed width that breaks in other languages
<Button className="w-32">
  {t('booking.cta')}  // May overflow in German: "Jetzt buchen"
</Button>
```

### Language-Specific Typography

**Font families may need to change per language:**

```tsx
const fontFamilies = {
  en: 'font-inter',           // Latin (English, Spanish, French, German)
  ja: 'font-noto-sans-jp',    // Japanese
  zh: 'font-noto-sans-sc',    // Chinese Simplified
  ko: 'font-noto-sans-kr',    // Korean
  ar: 'font-noto-sans-arabic', // Arabic
  th: 'font-noto-sans-thai'   // Thai
}

// Apply font based on locale
<body className={cn(fontFamilies[locale] || fontFamilies.en)}>
```

### Input Placeholders and Labels

**Never rely on placeholders alone (they disappear on focus):**

```tsx
// ✅ CORRECT: Visible label + placeholder
<div className="space-y-2">
  <Label htmlFor="email">{t('form.email.label')}</Label>
  <Input
    id="email"
    placeholder={t('form.email.placeholder')}
  />
  <Text className="text-sm text-muted-foreground">
    {t('form.email.helper')}
  </Text>
</div>

// ❌ INCORRECT: Placeholder-only (inaccessible + translation issues)
<Input placeholder="Enter your email" />
```

### Internationalization Guidelines

**DO:**

- ✅ Use logical properties (ms/me/ps/pe) for future RTL support
- ✅ Format dates with `date-fns` locale support
- ✅ Format currency and numbers with `Intl` APIs
- ✅ Prepare translation keys in structured format
- ✅ Allow text to wrap/truncate (some languages are longer)
- ✅ Use explicit labels (not placeholder-only)
- ✅ Test with longer text strings (German, Finnish)
- ✅ Consider font support for non-Latin scripts

**DON'T:**

- ❌ Use directional properties (ml/mr/pl/pr) for layout
- ❌ Hardcode date formats (MM/DD/YYYY vs DD/MM/YYYY)
- ❌ Hardcode currency symbols ($45 vs 45€)
- ❌ Scatter strings throughout components
- ❌ Use fixed widths that break with longer text
- ❌ Rely on placeholder-only form fields
- ❌ Assume English text length for layout
- ❌ Use Latin-only fonts globally

---

## Style Checklist

### Pre-Commit Checklist

**Visual Design:**

- [ ] Colors use design tokens (bg-primary, text-muted-foreground)
- [ ] Text contrast meets WCAG 2.2 AA (4.5:1 minimum)
- [ ] Touch targets are 44px+ in height
- [ ] Consistent spacing (multiples of 4px)
- [ ] Responsive design tested (mobile, tablet, desktop)

**Typography:**

- [ ] Headings use `font-righteous` (H1-H2) or `font-inter` (H3-H6)
- [ ] Body text is 16px minimum (text-base)
- [ ] Line height is 1.5+ for body text
- [ ] Text is resizable up to 200%

**Components:**

- [ ] Buttons have hover and focus states
- [ ] Forms have proper labels and error messages
- [ ] Icons have proper sizing (h-4 w-4, h-5 w-5)
- [ ] Cards have consistent border radius (rounded-lg)

**Accessibility:**

- [ ] All images have descriptive alt text
- [ ] Icon-only buttons have aria-label
- [ ] Focus indicators visible (2px, 3:1 contrast)
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Semantic HTML used (nav, main, button)

**Code Style:**

- [ ] File naming follows CLAUDE.md conventions (PascalCase for components)
- [ ] Imports organized by category
- [ ] Tailwind classes organized by category
- [ ] TypeScript interfaces defined
- [ ] No console.logs or commented code

**Content:**

- [ ] Copy is clear and concise
- [ ] Action-oriented CTAs (Book Now, not Submit)
- [ ] Specific details included (numbers, times)
- [ ] Error messages are helpful
- [ ] Empty states are encouraging

**Performance:**

- [ ] Images optimized (WebP, lazy loading)
- [ ] Animations respect prefers-reduced-motion
- [ ] No layout shift (CLS = 0)
- [ ] Fast interactions (<200ms)

### Pre-PR Checklist

**Accessibility Audit:**

- [ ] Lighthouse accessibility score 95+
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Keyboard navigation complete
- [ ] Color contrast verified (WebAIM tool)
- [ ] Form validation accessible

**Code Quality:**

- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Component props documented
- [ ] Reusable components extracted
- [ ] Dead code removed

**Documentation:**

- [ ] README updated (if new feature)
- [ ] Storybook stories added (if UI component)
- [ ] API documented (if new endpoint)
- [ ] Design decisions documented

---

## Additional Resources

**Internal Documentation (By Purpose):**

📖 **STYLE_GUIDE.md** (This Document)

- **Purpose:** Visual and code style specifications
- **Use for:** Colors, typography, spacing, code formatting (not file naming)
- **Example:** "What color should this error message be?" → text-red-700

📖 **CLAUDE.md** - `/frontend/.claude/CLAUDE.md`

- **Purpose:** Project architecture and file organization
- **Use for:** Where to put files, how to structure features, tech stack, **file naming conventions**
- **Example:** "Should component files be PascalCase or kebab-case?" → PascalCase (UserProfile.tsx)

📖 **COMPONENT_GUIDELINES.md** - `/frontend/.claude/context/COMPONENT_GUIDELINES.md`

- **Purpose:** React/Next.js component patterns and data fetching
- **Use for:** Writing components, using React Query, Server vs Client
- **Example:** "How do I fetch data from NestJS?" → Use React Query

📖 **DESIGN_PRINCIPLES.md** - `/frontend/.claude/context/DESIGN_PRINCIPLES.md`

- **Purpose:** UX/UI design philosophy and user experience patterns
- **Use for:** Understanding marketplace psychology, conversion optimization, accessibility patterns
- **Example:** "How do we build trust with users?" → Progressive verification

---

**External Resources:**

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/) - Accessibility standards
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility class reference
- [Shadcn/UI Components](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast tool

---

## Version History

**v1.0 (2025-10-21):**

- Initial style guide creation
- Visual design system defined
- Code style conventions established
- Content guidelines documented
- Accessibility standards included

---

**Questions or Updates?**
If you need to update this style guide, ask for approval first. Style changes affect the entire codebase and require team alignment.

- Propose changes with rationale and examples
