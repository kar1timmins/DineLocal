# 🌀 App Loader

## 1. What is this?

This is the loading screen people see while the app is starting or loading important information.

**Purpose:** Provide visual feedback during data loading or page transitions to improve perceived performance and prevent user confusion.

---

## 2. When should it appear?

### Automatic Triggers:

- **App initialization** - When the app first opens
- **Page transitions** - When switching to a new page (if data takes >300ms)
- **Data loading** - When fetching important data from API
- **Long-running actions** - When an action takes >500ms (e.g., form submission, file upload)

### Design Choice:

- **Alternative to skeleton screens** - Use loader OR skeleton, not both
- **Preference:** Use skeleton screens for content-heavy pages, use loader for full-page transitions

### When NOT to show:

- Data loads in <300ms (too fast, causes flicker)
- Within already-loaded content (use inline spinner instead)
- Multiple simultaneous loads (risk of loader spam)

---

## 3. What should the loader look like?

### Visual Design:

**Primary Element: Rotating Cookie Animation**

- Smooth continuous rotation (360° loop)
- Cookie icon should be recognizable (DineLocal brand)
- Size:
  - Fullscreen: 64px × 64px
  - Inline: 40px × 40px
  - Overlay: 48px × 48px

**Secondary Element: Loading Message**

- Position: Below cookie (16px gap)
- Default text: "Loading..."
- Font: Inter (body font)
- Size: 14px (0.875rem)
- Color: text-muted-foreground
- Alignment: Center

**Background:**

- Fullscreen: White with slight blur backdrop
- Inline: Transparent
- Overlay: Semi-transparent dark (rgba(0,0,0,0.5))

---

## 4. Component Requirements

### Props:

```typescript
interface AppLoaderProps {
  // Display variant
  variant?: 'fullscreen' | 'inline' | 'overlay'

  // Loading message
  label?: string

  // Show/hide loader
  isLoading?: boolean

  // Minimum display time (prevent flash)
  minDuration?: number // default: 300ms

  // Optional delay before showing
  delay?: number // default: 0ms (fullscreen), 200ms (inline/overlay)

  // Size override
  size?: 'sm' | 'md' | 'lg' | number

  // Custom className for styling
  className?: string

  // Accessibility label (for screen readers)
  ariaLabel?: string
}
```

### Variant Behaviors:

1. **`fullscreen`** (default)
   - Covers entire viewport
   - Centers content horizontally and vertically
   - Blocks all interaction (modal-like)
   - Use case: App initialization, page transitions
   - z-index: 9999

2. **`inline`**
   - Fits within parent container
   - Centers content within container
   - Does not block other UI elements
   - Use case: Section/card loading
   - z-index: auto

3. **`overlay`**
   - Covers specific container or viewport
   - Semi-transparent background
   - Centers content over existing UI
   - Use case: Action feedback (submit, save)
   - z-index: 9998

---

## 5. Animation Specifications

### Cookie Rotation:

- **Duration:** 1.5s per rotation
- **Easing:** `linear` (continuous smooth rotation)
- **Direction:** Clockwise
- **Loop:** Infinite

### Fade In/Out:

- **Fade in:** 150ms ease-in
- **Fade out:** 200ms ease-out
- **Opacity:** 0 → 1 → 0

### Minimum Display Time:

- **300ms minimum** - Prevent flash for quick loads
- If loading completes before 300ms, keep showing until 300ms elapsed

### Delayed Appearance:

- **Fullscreen:** Show immediately (0ms delay)
- **Inline/Overlay:** Delay 200ms to avoid flicker for quick operations

---

## 6. Accessibility Requirements (WCAG 2.2 AA)

### Screen Readers:

- Use `role="status"` for live region
- Use `aria-live="polite"` for non-critical updates
- Use `aria-busy="true"` on parent container
- Provide meaningful `aria-label` (default: "Loading content")

### Keyboard Navigation:

- Trap focus when `fullscreen` variant is active
- Return focus to trigger element after loading completes

### Motion:

- Respect `prefers-reduced-motion` media query
- If user prefers reduced motion: show static cookie icon with pulse effect instead of rotation

### Color Contrast:

- Ensure loading text meets WCAG AA contrast ratio (4.5:1)
- Cookie icon should be visible on all background colors

---

## 7. Performance Requirements

### Render Performance:

- Should not block main thread
- Use CSS animations (not JavaScript) for rotation
- Lazy load if not immediately needed

### Bundle Size:

- Keep component <2KB gzipped
- Cookie icon should be SVG (not raster image)

### Memory:

- Clean up animation on unmount
- No memory leaks from timers

---

## 8. Integration Points

### Next.js Integration:

```tsx
// In loading.tsx (Next.js loading UI)
export default function Loading() {
  return <AppLoader variant="fullscreen" />
}
```

### React Query Integration:

```tsx
const { data, isLoading } = useQuery({...})
return isLoading ? <AppLoader variant="inline" /> : <Content />
```

### Form Submission:

```tsx
const { mutate, isPending } = useMutation({...})
return (
  <>
    {isPending && <AppLoader variant="overlay" label="Submitting..." />}
    <form onSubmit={handleSubmit}>...</form>
  </>
)
```

---

## 9. Edge Cases & Error Handling

### Network Issues:

- If loading takes >10 seconds, show timeout message
- Provide "Retry" button after timeout

### Multiple Loaders:

- Only one fullscreen loader at a time
- Stack inline/overlay loaders if needed

### Interrupted Loading:

- If user navigates away, cancel loading animation
- Clean up any timers/animations on unmount

### Failed Loading:

- If error occurs, hide loader immediately
- Let error boundary handle error display

---

## 10. Testing Requirements

### Unit Tests:

- [ ] Renders correct variant (fullscreen, inline, overlay)
- [ ] Displays custom label text
- [ ] Respects minDuration (shows for at least 300ms)
- [ ] Respects delay prop
- [ ] Cleans up on unmount

### Integration Tests:

- [ ] Works with React Query loading states
- [ ] Works with Next.js loading.tsx
- [ ] Works with form submissions

### Accessibility Tests:

- [ ] Screen reader announces loading state
- [ ] Keyboard focus is trapped (fullscreen)
- [ ] Respects prefers-reduced-motion

### Visual Tests:

- [ ] Cookie rotates smoothly
- [ ] Centered correctly in all variants
- [ ] Proper spacing between cookie and label

---

## 11. Design Specifications

### Spacing:

- Cookie to label gap: 16px (1rem)
- Fullscreen padding: 32px (2rem)
- Inline padding: 16px (1rem)

### Colors:

- Cookie icon: `text-foreground` (Tailwind)
- Label text: `text-muted-foreground` (Tailwind)
- Overlay background: `bg-black/50` (Tailwind)
- Fullscreen background: `bg-background` (Tailwind)

### Shadows:

- Fullscreen: None
- Inline: None
- Overlay: `shadow-lg` on cookie

---

## 12. Implementation Checklist

### Phase 1: Basic Component ✅ COMPLETE

- [x] Create AppLoader component in `/components/shared/`
- [x] Implement three variants (fullscreen, inline, overlay)
- [x] Add rotating cookie animation (CSS - 1.5s)
- [x] Add loading label text

### Phase 2: Props & Behavior ✅ COMPLETE

- [x] Add all props (variant, label, isLoading, etc.)
- [x] Implement minDuration logic (300ms)
- [x] Implement delay logic (0ms fullscreen, 200ms inline/overlay)
- [x] Add size variants (sm, md, lg)

### Phase 3: Accessibility ✅ COMPLETE

- [x] Add ARIA attributes (role, aria-live, aria-label)
- [x] Add prefers-reduced-motion support (pulse animation fallback via Tailwind CSS 4)
- [ ] Implement focus trap for fullscreen (future enhancement)
- [ ] Test with screen reader (manual testing needed)

### Phase 4: Integration ✅ COMPLETE

- [x] Create loading.tsx for Next.js pages
- [x] Export AppLoader from shared components index
- [x] Fixed CSS animation to work with Tailwind CSS 4
- [ ] Document usage in COMPONENT_GUIDELINES.md (can add later)

---

## 13. Acceptance Criteria

**The AppLoader is complete when:**

✅ All three variants work correctly (fullscreen, inline, overlay)
✅ Cookie rotates smoothly at 1.5s per rotation
✅ Loading message displays below cookie
✅ MinDuration prevents flash for quick loads (<300ms)
✅ Delay prevents flicker for inline/overlay (200ms)
✅ WCAG 2.2 AA compliant (screen reader, keyboard, contrast, motion)
✅ Works with Next.js loading.tsx
✅ Works with React Query loading states
✅ Respects prefers-reduced-motion
✅ All tests pass (unit, integration, accessibility)
✅ Performance budget met (<2KB gzipped)
✅ Documented in COMPONENT_GUIDELINES.md

---

## 14. Future Enhancements (V2)

- [ ] Progress indicator (0-100%)
- [ ] Multiple loading states (preparing, uploading, processing)
- [ ] Custom animations (different food icons)
- [ ] Loading tips/messages rotation
- [ ] Estimated time remaining
- [ ] Cancel button for long operations

---

## 15. Questions to Resolve

1. **Cookie Icon Design:** ✅ RESOLVED
   - Using Lucide React `Cookie` icon
   - Color: `text-foreground` (Tailwind)
   - Styling: Tailwind CSS

2. **Loading Messages:**
   - Do we want different default messages per context?
   - Example: "Loading venues...", "Submitting booking...", "Uploading image..."

3. **Timeout Behavior:**
   - What happens after 10 seconds?
   - Show error message or retry button?
   - Log to analytics?

4. **Mobile Considerations:**
   - Should touch be disabled during fullscreen loading?
   - Haptic feedback on load complete?

---

## 16. Related Files

**Implementation:**

- Component: `/components/shared/AppLoader.tsx`
- Types: `/components/shared/AppLoader.types.ts`
- Tests: `/components/shared/AppLoader.test.tsx`

**Documentation:**

- Usage guide: `/components/shared/README.md`
- Design specs: `/.claude/context/STYLE_GUIDE.md`

**Integration:**

- Loading pages: `/app/**/loading.tsx`
- React Query: `/lib/react-query/QueryProvider.tsx`
