# 🧭 Navigation Bar (Navbar)

## 1. What is this?

A responsive, auto-hiding navigation bar that provides primary navigation for the DineLocal app.

**Purpose:** Enable users to navigate the app, access their account, and perform key actions (search, bookings, hosting) with minimal intrusion on content consumption.

---

## 2. Core Requirements

### User's Requirements:

1. **Navbar Wrapper**: Container that holds navigation items, logo, and actions
2. **Auto-hide on Scroll**: Disappears when user scrolls down
3. **Auto-show on Idle**: Reappears when scrolling stops
4. **Smooth Transitions**: All show/hide animations are fluid and polished

### Additional Requirements (Research-based):

5. **Mobile Menu**: Collapsible drawer/sheet using `src/components/shared/drawer.tsx` or `src/components/shared/sheet.tsx`
6. **Sticky Positioning**: Remains accessible at top of viewport when shown
7. **Elevated on Scroll**: Gains shadow/border after scrolling past threshold
8. **Responsive Design**: Adapts layout for mobile, tablet, desktop using Tailwind breakpoints
9. **Search Integration**: Quick access to venue/experience search
10. **User Actions**: Login, Signup, Profile menu, Notifications

### Technology Stack:

- **Styling**: Tailwind CSS exclusively (no custom CSS files, use Tailwind utilities)
- **Mobile Menu**: `Drawer` or `Sheet` from `src/components/shared/`
- **Dropdowns**: Radix UI + Tailwind (if needed from `src/components/shared/`)
- **Icons**: Lucide React
- **Animations**: Tailwind CSS utilities (`transition-*`, `duration-*`, `ease-*`)

---

## 3. When should it appear?

### Desktop Behavior:

- **Always visible initially** - Shows on page load
- **Hides on scroll down** - Slides up out of view when scrolling down >50px
- **Shows on scroll up** - Slides back into view when scrolling up
- **Shows on scroll idle** - Reappears after 300ms of no scrolling
- **Shows on page top** - Always visible when scrolled to top (0px)

### Mobile Behavior:

- **Same scroll behavior** as desktop
- **Hamburger menu** - Opens full-screen or bottom sheet menu
- **Logo remains visible** - Even when menu is collapsed

### Special Cases:

- **Modal open** - Navbar remains in last state (don't hide/show)
- **Search active** - Navbar stays visible with expanded search
- **Mobile menu open** - Navbar stays visible, body scroll disabled

---

## 4. What should it look like?

### Visual Design:

**Desktop Layout (≥1024px):**

```
┌────────────────────────────────────────────────────────────────┐
│  [Logo]    [Explore] [Experiences] [Become a Host]   [Search] [Profile] │
└────────────────────────────────────────────────────────────────┘
```

**Tablet Layout (768px - 1023px):**

```
┌────────────────────────────────────────────────────┐
│  [Logo]    [Explore] [Experiences]   [☰] │
└────────────────────────────────────────────────────┘
```

**Mobile Layout (<768px):**

```
┌─────────────────────────────────────┐
│  [Logo]              [Search] [☰] │
└─────────────────────────────────────┘
```

### Spacing & Sizing:

- **Height**: 64px (desktop), 56px (mobile)
- **Horizontal padding**: 24px (desktop), 16px (mobile)
- **Logo height**: 32px (desktop), 28px (mobile)
- **Touch targets**: ≥48px × 48px (mobile)
- **Gap between items**: 24px (desktop), 16px (tablet)

### Colors:

- **Background (default)**: `bg-background` (white)
- **Background (scrolled)**: `bg-background/95` with backdrop blur
- **Border (scrolled)**: `border-b border-border` (subtle gray)
- **Shadow (scrolled)**: `shadow-sm` (subtle drop shadow)
- **Text**: `text-foreground` (dark gray/black)
- **Active link**: `text-primary` (purple)
- **Hover**: `hover:text-primary-600` (darker purple)

### Typography:

- **Font**: Inter (sans-serif, --font-sans)
- **Nav links**: 14px (0.875rem), font-medium (500)
- **Logo text**: 18px (1.125rem), Righteous (--font-display), font-bold

---

## 5. Component Structure

### Navbar Component Hierarchy:

```tsx
<Navbar>
  <NavbarContainer>
    <NavbarLogo />
    <NavbarNav>
      <NavbarLink />
      <NavbarLink />
      <NavbarDropdown />
    </NavbarNav>
    <NavbarActions>
      <SearchButton />
      <NotificationButton />
      <ProfileMenu />
    </NavbarActions>
    <MobileMenuToggle />
  </NavbarContainer>
  <MobileMenu />
</Navbar>
```

### Component Props:

```typescript
interface NavbarProps {
  // Behavior
  hideOnScroll?: boolean // Default: true
  scrollThreshold?: number // Default: 50px
  idleDelay?: number // Default: 300ms

  // Layout
  variant?: 'default' | 'transparent' | 'elevated' // Default: 'default'
  sticky?: boolean // Default: true

  // Content
  logo?: React.ReactNode
  logoHref?: string // Default: '/'
  links?: NavLink[]
  actions?: React.ReactNode

  // Mobile
  mobileMenuSide?: 'left' | 'right' | 'bottom' // Default: 'right'

  // Styling
  className?: string

  // Callbacks
  onLogoClick?: () => void
  onLinkClick?: (link: NavLink) => void
  onMobileMenuToggle?: (isOpen: boolean) => void
}

interface NavLink {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string | number // For notification count
  active?: boolean
  disabled?: boolean
  children?: NavLink[] // For dropdowns
}
```

---

## 6. Scroll Behavior Specifications

### Scroll Detection:

**Hide Conditions:**

- User scrolls **down** >50px from current position
- Scroll speed >200px/s (fast scroll = immediate hide)
- Direction change from up to down

**Show Conditions:**

- User scrolls **up** any amount
- Scroll is **idle** for 300ms (no scroll events)
- User reaches **top** of page (scrollY < 10px)

### Animation Timing:

- **Hide animation**: 300ms ease-out
- **Show animation**: 200ms ease-in
- **Translate distance**: -100% (full height up)
- **Opacity**: Fade from 1 → 0.95 → 0 (hide), 0 → 1 (show)

### CSS Transforms:

```css
/* Hidden state */
transform: translateY(-100%);
opacity: 0;
pointer-events: none;

/* Visible state */
transform: translateY(0);
opacity: 1;
pointer-events: auto;

/* Transition */
transition:
  transform 300ms ease-out,
  opacity 300ms ease-out;
```

### Elevated State (Scrolled):

**Trigger**: `scrollY > 10px`

**Styles:**

- Add shadow: `shadow-sm`
- Add border: `border-b border-border`
- Add backdrop blur: `backdrop-blur-md bg-background/95`
- Transition: `all 200ms ease-in-out`

---

## 7. Mobile Menu Specifications

### Menu Trigger:

- **Icon**: Hamburger (☰) → Close (✕) animation
- **Position**: Top right (16px from edge)
- **Size**: 48px × 48px touch target
- **Animation**: Smooth icon morph (300ms)

### Menu Panel:

**Use Drawer or Sheet from `src/components/shared/`**

**Variant A: Right Drawer (Recommended - use `Drawer` component)**

```
┌─────────────────────────┐
│                    ┌────┤
│                    │    │
│                    │ M  │
│                    │ e  │
│                    │ n  │
│                    │ u  │
│                    │    │
│                    └────┤
└─────────────────────────┘
```

```tsx
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/shared/drawer'

;<Drawer>
  <DrawerTrigger>Menu Button</DrawerTrigger>
  <DrawerContent side="right">{/* Nav links */}</DrawerContent>
</Drawer>
```

**Variant B: Bottom Sheet (Alternative - use `Sheet` component)**

```
┌─────────────────────────┐
│                         │
│                         │
│       Content           │
├─────────────────────────┤
│  ┌──────────────────┐   │
│  │  Mobile Menu     │   │
│  └──────────────────┘   │
└─────────────────────────┘
```

```tsx
import { Sheet, SheetTrigger, SheetContent } from '@/components/shared/sheet'

;<Sheet>
  <SheetTrigger>Menu Button</SheetTrigger>
  <SheetContent side="bottom">{/* Nav links */}</SheetContent>
</Sheet>
```

### Menu Contents:

- **Search bar** (prominent at top)
- **Primary nav links** (list format)
- **User actions** (Login/Signup or Profile)
- **Secondary links** (Help, About, Terms)
- **Language/Currency** (if applicable)

### Menu Animations:

- **Slide in**: 300ms ease-out from right/bottom
- **Backdrop**: Fade in 200ms, `bg-black/50`
- **Close**: Slide out 250ms ease-in

### Accessibility:

- **Focus trap**: Keep focus within menu when open
- **Escape key**: Closes menu
- **Backdrop click**: Closes menu
- **Scroll lock**: Disable body scroll when menu open

---

## 8. Accessibility Requirements (WCAG 2.2 AA)

### Keyboard Navigation:

- **Tab**: Navigate through nav links
- **Enter/Space**: Activate links/buttons
- **Escape**: Close dropdowns/mobile menu
- **Arrow keys**: Navigate within dropdowns
- **Focus visible**: Clear focus indicator (ring)

### Screen Readers:

- `<nav>` with `aria-label="Main navigation"`
- `aria-current="page"` for active link
- `aria-expanded` for dropdowns/mobile menu
- `aria-hidden="true"` for decorative icons
- `aria-label` for icon-only buttons (search, menu toggle)

### Color Contrast:

- Text on background: ≥4.5:1 (WCAG AA)
- Active link: Indicated by color + underline (not color alone)
- Focus indicator: ≥3:1 against background

### Motion:

- Respect `prefers-reduced-motion`
- If reduced motion: Use instant show/hide (no slide animation)
- If reduced motion: Use fade only, no transforms

---

## 9. Responsive Breakpoints

### Mobile (<768px):

- Show: Logo, Search button, Menu toggle
- Hide: Nav links, Profile menu (move to mobile menu)
- Layout: Flex row, justify-between

### Tablet (768px - 1023px):

- Show: Logo, 2-3 primary links, Menu toggle
- Hide: Full nav links (move remaining to menu)
- Layout: Flex row, justify-between

### Desktop (≥1024px):

- Show: Logo, All nav links, Actions (Search, Profile)
- Hide: Menu toggle
- Layout: Flex row, justify-between

### Large Desktop (≥1440px):

- Same as desktop
- Max width: 1280px (centered)

---

## 10. Search Integration

### Search Button (Collapsed):

- **Icon**: Magnifying glass (🔍)
- **Size**: 40px × 40px
- **Position**: Right side (before profile)
- **Action**: Expands search bar or opens search modal

### Search Bar (Expanded - Desktop):

- **Width**: Grows from 40px → 300px
- **Animation**: 300ms ease-out
- **Input**: `placeholder="Search venues, experiences..."`
- **Icon**: Search icon (left), Clear icon (right)
- **Dropdown**: Search suggestions/results below

### Search Modal (Mobile):

- **Full screen** overlay
- **Auto-focus** on input
- **Recent searches** displayed
- **Suggestions** as user types
- **Close button** (top right)

---

## 11. User Actions & Profile Menu

### Not Logged In:

- **Login button**: `variant="ghost"` or `variant="link"`
- **Sign up button**: `variant="default"` (primary purple)
- **Gap**: 12px between buttons

### Logged In:

- **Notification button**: Bell icon with badge count
- **Profile button**: Avatar (32px circle) or initials
- **Dropdown**: Opens on click (desktop) or navigates to profile page (mobile)

### Profile Dropdown (Desktop):

```
┌─────────────────────────┐
│ [Avatar] User Name      │
│ user@email.com          │
├─────────────────────────┤
│ ➤ Profile               │
│ ➤ My Bookings           │
│ ➤ My Listings           │
│ ➤ Favorites             │
├─────────────────────────┤
│ ➤ Settings              │
│ ➤ Help Center           │
├─────────────────────────┤
│ ➤ Logout                │
└─────────────────────────┘
```

**Specs:**

- Width: 240px
- Padding: 8px
- Border: `border border-border`
- Shadow: `shadow-lg`
- Backdrop: `bg-background`

---

## 12. Performance Requirements

### Render Performance:

- **Avoid rerenders**: Memoize nav items
- **Lazy load**: Mobile menu content (render on open)
- **Debounce scroll**: Throttle scroll handler to 16ms (60fps)
- **Passive listeners**: Use `{ passive: true }` for scroll events

### Animation Performance:

- **Use transforms**: `transform` and `opacity` only (GPU accelerated)
- **Avoid layout thrashing**: Batch DOM reads/writes
- **will-change**: Apply `will-change: transform` during animation only
- **60fps target**: All animations must run at 60fps

### Bundle Size:

- **Navbar bundle**: <5KB gzipped
- **Mobile menu**: Code split, lazy loaded
- **Icons**: Use SVG from Lucide React (tree-shakable)

---

## 13. State Management

### Navbar State:

```typescript
interface NavbarState {
  // Visibility
  isVisible: boolean
  isElevated: boolean // Scrolled past threshold

  // Mobile
  isMobileMenuOpen: boolean

  // Search
  isSearchExpanded: boolean
  searchQuery: string

  // User
  isLoggedIn: boolean
  user?: User

  // Scroll tracking (internal)
  lastScrollY: number
  scrollDirection: 'up' | 'down' | null
  isScrollIdle: boolean
}
```

### State Updates:

- **On scroll**: Update `isVisible`, `isElevated`, `scrollDirection`
- **On idle**: Set `isScrollIdle` to true, show navbar
- **On menu toggle**: Toggle `isMobileMenuOpen`, lock body scroll
- **On search toggle**: Toggle `isSearchExpanded`

---

## 14. Component Files Structure

```
/src/components/shared/
  /navbar/
    index.ts                    # Barrel export
    Navbar.tsx                  # Main container
    NavbarContainer.tsx         # Inner wrapper (max-width, padding)
    NavbarLogo.tsx              # Logo component
    NavbarNav.tsx               # Nav links wrapper
    NavbarLink.tsx              # Individual nav link
    NavbarDropdown.tsx          # Dropdown menu
    NavbarActions.tsx           # Right-side actions wrapper
    NavbarSearch.tsx            # Search button + expanded bar
    NavbarProfile.tsx           # Profile menu
    MobileMenu.tsx              # Mobile menu drawer/sheet
    MobileMenuToggle.tsx        # Hamburger button
    useNavbarScroll.ts          # Scroll behavior hook
    navbar.types.ts             # TypeScript types
```

---

## 15. Implementation Checklist

### Phase 1: Core Structure ⬜

- [ ] Create Navbar component with basic layout
- [ ] Add NavbarContainer with responsive max-width
- [ ] Implement NavbarLogo with link
- [ ] Create NavbarNav with links
- [ ] Add NavbarActions wrapper
- [ ] Set up responsive breakpoint handling

### Phase 2: Scroll Behavior ⬜

- [ ] Create `useNavbarScroll` custom hook
- [ ] Implement scroll direction detection
- [ ] Add scroll idle detection (300ms timeout)
- [ ] Implement hide/show logic
- [ ] Add smooth transitions (transform + opacity)
- [ ] Add elevated state on scroll (shadow + border)
- [ ] Add `prefers-reduced-motion` support

### Phase 3: Mobile Menu ⬜

- [ ] Create MobileMenuToggle with hamburger icon
- [ ] Implement icon animation (hamburger ↔ close)
- [ ] Create MobileMenu drawer component
- [ ] Add backdrop overlay with blur
- [ ] Implement slide-in animation
- [ ] Add body scroll lock when menu open
- [ ] Add focus trap for accessibility
- [ ] Handle Escape key to close

### Phase 4: Search Integration ⬜

- [ ] Create NavbarSearch component
- [ ] Implement collapsed state (icon button)
- [ ] Add expanded state (input + suggestions)
- [ ] Create search modal for mobile
- [ ] Add search suggestions dropdown
- [ ] Integrate with search API

### Phase 5: User Actions ⬜

- [ ] Add Login/Signup buttons (not logged in)
- [ ] Create NavbarProfile component
- [ ] Implement profile dropdown menu
- [ ] Add notification button with badge
- [ ] Handle user state (logged in/out)

### Phase 6: Accessibility ⬜

- [ ] Add ARIA labels and roles
- [ ] Implement keyboard navigation
- [ ] Add focus indicators
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Add `aria-current` for active link
- [ ] Ensure color contrast ≥4.5:1

### Phase 7: Polish & Testing ⬜

- [ ] Add loading states for user data
- [ ] Test on mobile devices (iOS Safari, Chrome)
- [ ] Test on tablet (iPad)
- [ ] Test scroll performance (throttle/debounce)
- [ ] Verify 60fps animations (Chrome DevTools)
- [ ] Test with keyboard only
- [ ] Test with screen reader
- [ ] Test reduced motion preference

---

## 16. Edge Cases & Error Handling

### Scroll Edge Cases:

- **Rapid direction changes**: Debounce scroll handler to avoid jank
- **Scroll restoration**: Handle browser back/forward scroll position
- **Hash navigation**: Don't hide navbar on scroll to hash link
- **Smooth scroll**: Detect programmatic scroll vs user scroll

### Mobile Menu Edge Cases:

- **Orientation change**: Close menu, recalculate layout
- **Resize during open**: Close menu if crossing breakpoint
- **Deep link with hash**: Open page with menu closed
- **Focus restoration**: Return focus to toggle button on close

### User State Edge Cases:

- **Login during session**: Update navbar without full page reload
- **Logout**: Clear user data, hide profile menu
- **Token expiry**: Show login prompt, preserve navigation state
- **Network error**: Show cached user data or fallback state

---

## 17. Testing Requirements

### Unit Tests:

- [ ] Navbar renders with default props
- [ ] Scroll hook detects direction correctly
- [ ] Idle detection triggers after 300ms
- [ ] Hide animation triggers on scroll down
- [ ] Show animation triggers on scroll up/idle
- [ ] Mobile menu opens/closes correctly
- [ ] Focus trap works in mobile menu
- [ ] Active link highlighted correctly

### Integration Tests:

- [ ] Navbar works with authentication state
- [ ] Search integration works end-to-end
- [ ] Profile dropdown fetches user data
- [ ] Logout flow works correctly
- [ ] Mobile menu closes on navigation
- [ ] Scroll behavior works on all pages

### Visual Tests:

- [ ] Navbar renders correctly on mobile
- [ ] Navbar renders correctly on tablet
- [ ] Navbar renders correctly on desktop
- [ ] Hide/show animation is smooth
- [ ] Elevated state displays correctly
- [ ] Mobile menu slides in smoothly
- [ ] Profile dropdown positioned correctly

### Accessibility Tests:

- [ ] Passes axe-core audit
- [ ] Keyboard navigation works
- [ ] Screen reader announces links
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Reduced motion respected

---

## 18. Design Specifications

### Shadows:

- **Elevated (scrolled)**: `shadow-sm` (subtle)
  ```css
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  ```

### Borders:

- **Elevated (scrolled)**: `border-b border-border`
  ```css
  border-bottom: 1px solid oklch(0.92 0.004 286.32);
  ```

### Backdrop Blur:

- **Elevated (scrolled)**: `backdrop-blur-md`
  ```css
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  ```

### Z-Index Layers:

- **Navbar**: `z-[1000]`
- **Mobile menu backdrop**: `z-[999]`
- **Mobile menu panel**: `z-[1001]`
- **Dropdowns**: `z-[1002]`

---

## 19. Content Guidelines

### Navigation Labels:

- **Keep short**: 1-2 words max
- **Action-oriented**: "Explore", "Host", not "Explore Venues"
- **Consistent casing**: Sentence case (not Title Case)

### Link Organization:

**Primary links (always visible on desktop):**

- Home / Explore
- Experiences
- Become a Host

**Secondary links (mobile menu):**

- How it Works
- Help Center
- About Us

**User links (profile dropdown):**

- My Bookings
- My Listings
- Favorites
- Settings
- Logout

---

## 20. Future Enhancements (V2)

- [ ] Multi-level dropdown menus
- [ ] Mega menu for desktop (large dropdown with categories)
- [ ] Location selector (city/region)
- [ ] Currency selector
- [ ] Language selector (i18n)
- [ ] Notification center panel
- [ ] Unread message badge
- [ ] Quick booking shortcut
- [ ] Dark mode support
- [ ] Sticky CTA banner (promotional)
- [ ] Progress indicator for multi-step flows

---

## 21. Related Documentation

**DineLocal Docs:**

- [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) - Overall design philosophy
- [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) - React component patterns
- [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) - Visual design tokens
- [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md) - Mobile interaction patterns

**Available Components:**

- **Drawer** (`src/components/shared/drawer.tsx`) - For right-side mobile menu
- **Sheet** (`src/components/shared/sheet.tsx`) - For bottom-side mobile menu
- **Button** (`src/components/shared/button.tsx`) - For nav actions
- **Container components** (`src/components/shared/container.tsx`) - Box, Flex, Grid
- **Typography** (`src/components/shared/typography.tsx`) - Heading, Paragraph

**External Resources:**

- [Radix UI Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu) - Accessible nav primitive
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Icon library

---

## 22. Questions to Resolve

1. **Logo Design:**
   - Text-only or icon + text?
   - SVG or PNG format?
   - Light/dark mode variants?

2. **Search Behavior:**
   - Instant search or submit required?
   - Show results inline or navigate to search page?
   - Recent searches stored locally or server-side?

3. **Authentication:**
   - OAuth providers (Google, Facebook)?
   - Show avatar or initials in profile button?
   - Email verification required?

4. **Notifications:**
   - Real-time updates (WebSocket)?
   - Badge count limit (e.g., 9+)?
   - Notification center or just badge?

5. **Mobile Menu:**
   - Right drawer or bottom sheet?
   - Full screen or partial overlay?
   - Nested navigation or flat list?

6. **Performance:**
   - Server-side render navbar or client-only?
   - Fetch user data on mount or SSR?
   - Cache navigation links?

---

## 23. Acceptance Criteria

**The Navbar is complete when:**

✅ Hides smoothly on scroll down (>50px)
✅ Shows on scroll up or after 300ms idle
✅ Gains shadow/border when scrolled (elevated state)
✅ Mobile menu opens with smooth animation
✅ Hamburger icon animates to close icon
✅ All links navigate correctly
✅ Search works on desktop and mobile
✅ Profile dropdown shows user info
✅ Keyboard navigation works (Tab, Enter, Escape)
✅ Screen reader announces all interactive elements
✅ Color contrast passes WCAG AA (≥4.5:1)
✅ Animations run at 60fps
✅ Reduced motion preference respected
✅ Works on mobile (iOS Safari, Chrome)
✅ Works on tablet (iPad)
✅ Works on desktop (Chrome, Firefox, Safari)
✅ No console errors or warnings
✅ Bundle size <5KB gzipped

---

**Research Sources:**

- Airbnb navigation patterns (auto-hide on scroll)
- Booking.com navbar (elevated state on scroll)
- Stripe navbar (smooth transitions, mobile drawer)
- GitHub navigation (keyboard shortcuts, search)
- Vercel navbar (minimal, modern, fast)
