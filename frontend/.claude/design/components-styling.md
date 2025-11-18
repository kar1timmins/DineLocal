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

