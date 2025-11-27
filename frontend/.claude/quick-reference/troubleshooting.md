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
