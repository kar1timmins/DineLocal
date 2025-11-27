# 🧭 Guest Navigation Bar (GuestNavbar)

## 📋 Table of Contents

1. [Overview](#1-overview)
2. [User States](#2-user-states)
3. [Component Breakdown](#3-component-breakdown)
4. [Visual Specifications](#4-visual-specifications)
5. [Icon Specifications](#5-icon-specifications)
6. [Navigation & Routing](#6-navigation--routing)
7. [Data Structure](#7-data-structure)
8. [Interactions & Behavior](#8-interactions--behavior)
9. [Accessibility Requirements](#9-accessibility-requirements)
10. [Responsive Behavior](#10-responsive-behavior)
11. [Edge Cases & Error States](#11-edge-cases--error-states)
12. [Testing Checklist](#12-testing-checklist)

---

## 1. Overview

### Purpose

A responsive navigation bar that allows guests to:

- Search for experiences
- Navigate to key pages (Discover, Bookings, Profile, Help)
- Login/Register or access their account
- Become a host or switch to host mode
- Access their wishlist/favourites

### User Types

- **Unregistered User**: Not logged in (State 1)
- **Guest (Logged In)**: Authenticated user (State 2)

---

## 2. User States

### State 1: Unregistered User (Not Logged In)

#### Mobile (< 768px)

**NavbarLeft:**

- Logo (text: "DineLocal")

**NavbarRight:**

- Search Icon (triggers Sheet with placeholder)
- Burger Menu Icon (triggers UnregisterMenu Sheet)
  - On open: Icon changes to X
  - On close: Icon changes back to Burger

**UnregisterMenu Sheet Contents:**

```
┌─────────────────────────────┐
│  Discover                   │  ← Link
│  Help                       │  ← Link
├─────────────────────────────┤  ← Separator
│  [Login/Register]           │  ← Primary Button
│  [Become a Host]            │  ← Outline Button
└─────────────────────────────┘
```

#### Desktop (≥ 768px / md breakpoint)

**NavbarLeft:**

- Logo (text: "DineLocal")

**NavbarRight:**

- Search Icon (triggers Command component with placeholder)
- Discover (Link)
- Help (Link)
- [Become a Host] (Outline Button)
- [Login/Register] (Primary Button)

---

### State 2: Guest (Logged In)

#### Mobile (< 768px)

**NavbarLeft:**

- Logo (text: "DineLocal")

**NavbarRight:**

- Search Icon (triggers Sheet with placeholder)
- Avatar Button (triggers UserProfileMenu Sheet)
  - On open: Icon changes to X
  - On close: Icon changes back to Avatar

**UserProfileMenu Sheet Contents:**

```
┌─────────────────────────────────┐
│  John Doe                       │  ← User's full name
│  [Become a Host]                │  ← Primary Button (if not host)
│  OR                             │
│  [Switch to Host]               │  ← Primary Button (if is host)
├─────────────────────────────────┤  ← Separator 1
│  View Profile      [icon]       │  ← Link
│  Discover          [icon]       │  ← Link
│  Bookings          [icon]       │  ← Link
│  Favourites        [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 2
│  Inbox             [icon]       │  ← Link
│  Notifications     [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 3
│  Help              [icon]       │  ← Link
│  App Settings      [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 4
│  Log Out           [icon]       │  ← Action
└─────────────────────────────────┘
```

#### Desktop (≥ 768px / md breakpoint)

**NavbarLeft:**

- Logo (text: "DineLocal")

**NavbarRight:**

- Search Icon (triggers Command component with placeholder)
- Discover Icon (with tooltip)
- Bookings Icon (with tooltip)
- Favourites Icon (with tooltip)
- Avatar Button (triggers UserProfileMenu Dropdown)

**UserProfileMenu Dropdown Contents:**

```
┌─────────────────────────────────┐
│  John Doe                       │  ← User's full name
│  [Become a Host]                │  ← Primary Button (if not host)
│  OR                             │
│  [Switch to Host]               │  ← Primary Button (if is host)
├─────────────────────────────────┤  ← Separator 1
│  View Profile      [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 2
│  Inbox             [icon]       │  ← Link
│  Notifications     [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 3
│  Help              [icon]       │  ← Link
│  App Settings      [icon]       │  ← Link
├─────────────────────────────────┤  ← Separator 4
│  Log Out           [icon]       │  ← Action
└─────────────────────────────────┘
```

---

## 3. Component Breakdown

**Architecture:** This is a **feature**, not a shared component. It will be located in `/src/features/guest-navbar/` and will use the existing shared navbar components as building blocks.

### Existing Shared Components (Already Built)

These components are in `/src/components/shared/navbar/`:

- `Navbar` - Main container with scroll behavior, variants (default/transparent/elevated), positioning (static/sticky/fixed), sizes
- `NavbarContent` - Content wrapper with max-width and gap control
- `NavbarLeft` - Left section for logo
- `NavbarRight` - Right section for actions/links
- `useNavbarScroll` - Hook for scroll-based show/hide and elevation

### New Feature Components (To Be Built)

#### 3.1. Main Component

**File:** `/src/features/guest-navbar/components/GuestNavbar.tsx`

- Uses existing `Navbar`, `NavbarContent`, `NavbarLeft`, `NavbarRight` components
- Handles responsive layout switching (mobile vs desktop)
- Renders different UI based on auth state (logged in vs not logged in)
- Shows skeleton loading state while app/user data is loading

#### 3.2. Logo Component

**File:** `/src/features/guest-navbar/components/Logo.tsx`

- Text: "DineLocal"
- Links to: `/` (Discover page)
- Styling: `<Link href="/" className="text-foreground hover:text-primary text-xl font-bold">DineLocal</Link>`

#### 3.3. UnregisteredMenu Component (State 1)

**File:** `/src/features/guest-navbar/components/UnregisteredMenu.tsx`

- Used when user is not logged in
- Mobile: Burger icon triggers Sheet component
- Desktop: Inline links and buttons (visible in navbar)

#### 3.4. UserProfileMenu Component (State 2)

**File:** `/src/features/guest-navbar/components/UserProfileMenu.tsx`

- Used when user is logged in
- Mobile: Avatar button triggers Sheet component
- Desktop: Avatar button triggers Dropdown menu component
- Conditionally shows "Become a Host" vs "Switch to Host" based on `user.registeredAsHost`

#### 3.5. SearchTrigger Component

**File:** `/src/features/guest-navbar/components/SearchTrigger.tsx`

- Search icon button
- Mobile: Triggers Sheet with "Coming soon" placeholder
- Desktop: Triggers Command component with "Coming soon" placeholder

#### 3.6. DesktopNavLinks Component (State 2)

**File:** `/src/features/guest-navbar/components/DesktopNavLinks.tsx`

- Icon links with tooltips (Discover, Bookings, Favourites)
- Only visible on desktop (≥ 768px) when logged in
- Uses Tooltip component from shared

#### 3.7. NavbarSkeleton Component (Loading State)

**File:** `/src/features/guest-navbar/components/NavbarSkeleton.tsx`

- Skeleton loader shown during app initialization or when user data is loading
- Matches navbar height and structure
- Uses Skeleton component from shared

---

## 4. Visual Specifications

### Navbar Container

- **Height:** `64px` (h-16) - **TODO: Confirm this height**
- **Background:** `bg-background` (white in light mode)
- **Border:** `border-b border-border` (subtle bottom border)
- **Position:** `sticky top-0 z-50` (stays at top on scroll)
- **Padding:** `px-4 md:px-6 lg:px-8` (responsive horizontal padding)

### Logo

- Use <Link href="/" className="text-foreground hover:text-primary text-xl font-bold">
  DineLocal
  </Link>

### Buttons

- **Primary Button:**
  - Variant: `default` from Button component
  - Size: Default for now

- **Outline Button:**
  - Variant: `outline` from Button component
  - Size: Default for now

### Menu Items (Sheet/Dropdown)

- **Spacing:** `gap-2` between items **TODO: Confirm** Yes
- **Padding:** `p-4` for menu container **TODO: Confirm** Yes
- **Link Height:** `h-12` for touch targets (48px minimum) **TODO: Confirm** Yes

### Avatar

- **Size:** **TODO: Should fit in the Navbar sm maybe**
- **Fallback:** User's initials (e.g., "JD" for John Doe)

### Separators

- Component: `<Separator />` from `@/components/shared/separator`
- **Margin:** `my-2` **TODO: Confirm** Yes

---

## 5. Icon Specifications

### Lucide React Icons

#### Navbar Icons (All States)

- **Search:** `Search` from lucide-react
- **Burger Menu:** `Menu` from lucide-react
- **Close (X):** `X` from lucide-react

#### Desktop Icon Links (State 2)

- **Discover:** `Home` from lucide-react
- **Bookings:** `BookOpen` from lucide-react
- **Favourites:** `Heart` from lucide-react

#### Menu Item Icons

- **View Profile:** **TODO: Decide (User, UserCircle, UserRound?)**
- **Discover:** `Home` from lucide-react
- **Bookings:** **TODO: Same as above**
- **Favourites:** `Heart` from lucide-react
- **Inbox:** **TODO: message-circle Icon from lucide-react**
- **Notifications:** Bell Icon\*\*
- **Help:** **TODO: Decide (badge-question-mark)**
- **App Settings:** Cog\*\*
- **Log Out:** **TODO: DoorOpen**

### Icon Sizing

- **Default:** `size={20}` **TODO: Confirm** Yes
- **Stroke Width:** `strokeWidth={1.5}` **TODO: Confirm** Yes

---

## 6. Navigation & Routing

### URL Paths

| Link/Button    | URL Path         | Notes                          |
| -------------- | ---------------- | ------------------------------ |
| Logo           | `/`              | Discover page                  |
| Discover       | `/`              | Discover page                  |
| Help           | `/help`          | Help/Support page              |
| Bookings       | `/bookings`      | User's bookings                |
| Favourites     | `/favourites`    | /favourites                    |
| Profile        | `/profile`       | User profile page              |
| Inbox          | `/inbox`         | /messages                      |
| Notifications  | `/notifications` | Notifications page             |
| App Settings   | `/settings`      | /account/settings              |
| Login/Register | `/auth/login`    | this maybe open a Dailog/PopUp |
| Become a Host  | `/become-host`   | Placeholder for now            |
| Switch to Host | `#`              | Host route (/host)             |
| Log Out        | `#`              | Action (Prompt/PopUp)          |

---

## 7. Data Structure

### 7.1. Zustand Auth Store

**File:** `/src/stores/authStore.ts`

```typescript
// TODO: Review and approve this structure
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string // Optional avatar URL
  registeredAsHost: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean

  // Actions
  login: (user: User) => void
  logout: () => void
  toggleHostMode: () => void // TODO: Decide if needed
}

// Dummy Data for Testing
const DUMMY_USER: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  registeredAsHost: false, // Change to true to test "Switch to Host"
}
```

### 7.2. Menu Items Data Structure

**File:** `/src/components/shared/navbar/constants.ts` (or within component)

```typescript
// TODO: Review and approve this structure
import { LucideIcon } from 'lucide-react'

interface MenuItem {
  label: string
  href: string
  icon?: LucideIcon
}

// UnregisterMenu items
const UNREGISTER_LINKS: MenuItem[] = [
  { label: 'Discover', href: '/' },
  { label: 'Help', href: '/help' },
]

// UserProfileMenu items (Mobile - includes Discover)
const USER_MENU_MOBILE_ITEMS: MenuItem[][] = [
  [
    { label: 'View Profile', href: '/profile', icon: User },
    { label: 'Discover', href: '/', icon: Home },
    { label: 'Bookings', href: '/bookings', icon: Calendar },
    { label: 'Favourites', href: '/favourites', icon: Heart },
  ],
  [
    { label: 'Inbox', href: '/inbox', icon: Mail },
    { label: 'Notifications', href: '/notifications', icon: Bell },
  ],
  [
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'App Settings', href: '/settings', icon: Settings },
  ],
  [{ label: 'Log Out', href: '#', icon: LogOut }],
]

// UserProfileMenu items (Desktop - no Discover)
const USER_MENU_DESKTOP_ITEMS: MenuItem[][] = [
  [{ label: 'View Profile', href: '/profile', icon: User }],
  [
    { label: 'Inbox', href: '/inbox', icon: Mail },
    { label: 'Notifications', href: '/notifications', icon: Bell },
  ],
  [
    { label: 'Help', href: '/help', icon: HelpCircle },
    { label: 'App Settings', href: '/settings', icon: Settings },
  ],
  [{ label: 'Log Out', href: '#', icon: LogOut }],
]
```

---

## 8. Interactions & Behavior

### 8.1. Search Icon Click

**Mobile:**

- Opens Sheet component from bottom
- Shows placeholder: "Coming soon" or "Search functionality coming soon"
- Close button (X) in top-right corner

**Desktop:**

- Opens Command component (center of screen)
- Shows placeholder: "Coming soon" or "Search functionality coming soon"
- Close with Escape key or click outside

**TODO: Decide exact placeholder text and styling**

### 8.2. Burger Menu / Avatar Click (Mobile)

- Opens Sheet component from right side **Direction from the Right**
- Burger/Avatar icon changes to X icon
- Clicking X closes the Sheet
- Clicking outside (overlay) closes the Sheet
- **Animation:** **You can decide**

### 8.3. Avatar Click (Desktop)

- Opens Dropdown menu below avatar
- Clicking outside closes dropdown
- Clicking a menu item closes dropdown (unless it's a submenu)
- **Animation:** **You can decide**

### 8.4. Tooltip Behavior (Desktop Icon Links)

- Hover over icon → show tooltip after : use shared/tooltip
- Tooltip position: **Bottom**

### 8.5. Link Navigation

- Clicking a link:
  - Closes any open menu (Sheet/Dropdown)
  - Navigates to the route
  - **TODO: Decide on Next.js Link prefetching (enabled)**

### 8.6. Login/Register Button

**Action:** **TODO: Decide**

- Option 1: Navigate to `/auth/login` page
- Option 2: Open a modal/dialog for login (This one)
- Option 3: Open Sheet with login form

### 8.7. Become a Host / Switch to Host Button

**Action:** **TODO: Decide**

- Become a Host: Unsure for now but modal
- Switch to Host: Navigate to host dashboard

### 8.8. Log Out Action

**Action:** **TODO: Decide**

1. Call `authStore.logout()`
2. Show toast notification: "You've been logged out"
3. Redirect to `/` (Discover page)
4. do all 3 so `authStore.logout()` -> Show toast notification: "You've been logged out" -> redirect

---

## 9. Accessibility Requirements

### 9.1. Keyboard Navigation

- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space)
- [ ] Escape key closes open menus (Sheet/Dropdown/Command)
- [ ] Focus is trapped in open Sheet/Command component
- [ ] Focus returns to trigger element when menu closes

### 9.2. ARIA Labels

- [ ] Search icon: `aria-label="Search experiences"`
- [ ] Burger menu: `aria-label="Open menu"` / `aria-label="Close menu"`
- [ ] Avatar button: `aria-label="Open user menu"` / `aria-label="Close user menu"`
- [ ] Logo link: `aria-label="DineLocal home"`
- [ ] Icon-only links (desktop): Rely on tooltip + `aria-label`
  - Discover: `aria-label="Discover"`
  - Bookings: `aria-label="Bookings"`
  - Favourites: `aria-label="Favourites"`
- [ ] **TODO: All good for now**

### 9.3. Screen Reader Support

- [ ] Announce when menus open/close (via ARIA live regions if needed)
- [ ] User name is readable by screen readers
- [ ] **TODO: No need of 9.3**

### 9.4. Touch Targets

- [ ] All clickable elements ≥ 48px height (WCAG 2.2 AA)
- [ ] Adequate spacing between touch targets (8px minimum)
- [ ] **TODO: Test on 430 px x 932px**

### 9.5. Color Contrast

- [ ] Text meets WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- [ ] Icons meet WCAG AA contrast ratio
- [ ] **TODO: No, need**

---

## 10. Responsive Behavior

### Breakpoints

- **Mobile:** `< 768px` (default, mobile-first)
- **Desktop:** `≥ 768px` (Tailwind `md:` prefix)

### Layout Changes

#### Mobile (< 768px)

- Logo on left
- Search + Burger/Avatar on right
- Burger/Avatar triggers Sheet menu (full-screen or slide-in)
- No visible links in navbar (hidden in menu)

#### Desktop (≥ 768px)

- Logo on left
- Search + Links + Buttons/Avatar on right
- All navigation visible in navbar (no Sheet)
- Avatar triggers Dropdown menu (not full-screen)

### Component Visibility (Tailwind Classes)

**Mobile Only:**

- Burger Menu Icon (State 1): `md:hidden`
- Avatar Sheet Trigger (State 2): `md:hidden`

**Desktop Only:**

- Inline Links (State 1): `hidden md:flex`
- Icon Links + Dropdown Trigger (State 2): `hidden md:flex`

**TODO: Confirm exact Tailwind utility classes**

---

## 11. Edge Cases & Error States

### 11.1. User Data Not Available

**Scenario:** User is authenticated but `user` object is null/undefined
**Solution:** **TODO: Decide**

- Option 1: Show loading skeleton in place of user name (This one)
- Option 2: Show "Guest" as placeholder name
- Option 3: Log out user automatically

### 11.2. Avatar Image Fails to Load

**Solution:**

- Use Avatar component's built-in fallback
- Show user initials (e.g., "JD" for John Doe)
- **TODO: Confirm this is handled by Avatar component**

### 11.3. Long User Names

**Scenario:** User name is very long (e.g., "Christopher Alexander")
**Solution:** **TODO: Decide**

- Option 1: Truncate with ellipsis: "Christopher Ale..." (This one)
- Option 2: Show full name, let it wrap
- Option 3: Show only first name: "Christopher"

### 11.4. Network Error (Future - when API is connected)

**Scenario:** API call to fetch user data fails
**Solution:** **TODO: Decide**

- Show error toast (show this one)
- Retry mechanism
- Fallback to cached data

### 11.5. Multiple Rapid Clicks

**Scenario:** User clicks burger/avatar multiple times quickly
**Solution:**

- Disable button while Sheet is opening/closing
- **TODO: Use debounce**

---

## 12. Testing Checklist

### 12.1. Visual Testing (Playwright)

- [ ] **Desktop (1440px):**
  - [ ] State 1: Unregistered user UI
  - [ ] State 2: Logged in guest UI (not host)
  - [ ] State 2: Logged in guest UI (is host) - "Switch to Host" button
- [ ] **Mobile (375px):**
  - [ ] State 1: Unregistered user UI
  - [ ] State 2: Logged in guest UI (not host)
  - [ ] State 2: Logged in guest UI (is host)
- [ ] **Tablet (768px):**
  - [ ] Breakpoint transition looks correct

### 12.2. Interaction Testing

- [ ] Search icon opens placeholder (mobile: Sheet, desktop: Command)
- [ ] Burger menu opens/closes correctly (State 1, mobile)
- [ ] Avatar menu opens/closes correctly (State 2, mobile)
- [ ] Avatar dropdown opens/closes correctly (State 2, desktop)
- [ ] Icon changes: Burger ↔ X, Avatar ↔ X
- [ ] Tooltips appear on hover (desktop icon links)
- [ ] All links navigate correctly
- [ ] "Become a Host" button shows when `registeredAsHost: false`
- [ ] "Switch to Host" button shows when `registeredAsHost: true`

### 12.3. Accessibility Testing

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus management (focus trap, focus return)
- [ ] All ARIA labels present and correct
- [ ] Screen reader announces elements correctly
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥ 48px

### 12.4. Responsive Testing

- [ ] Looks correct at 375px (iPhone SE)
- [ ] Looks correct at 768px (iPad)
- [ ] Looks correct at 1440px (Desktop)
- [ ] Smooth transition at `md` breakpoint

### 12.5. State Management Testing

- [ ] Toggle between logged in/logged out states
- [ ] Toggle `registeredAsHost` value
- [ ] User name displays correctly
- [ ] Avatar fallback (initials) works

---

## 13. Open Questions & Decisions Needed

**TODO: Please review and provide answers to the following:**

### Design Decisions

- [ ] **Navbar height:** 64px (h-16) or different?
- [ ] **Logo styling:** Font size, weight, color?
- [ ] **Button sizes:** default, sm, or lg?
- [ ] **Avatar size:** sm, md, or lg?
- [ ] **Menu item spacing:** gap-2 or different?
- [ ] **Separator margins:** my-2 or different?
- [ ] **Icon sizing:** size={20} or different?

### Icon Decisions

- [ ] **Bookings icon:** Calendar, CalendarDays, BookOpen, or other?
- [ ] **View Profile icon:** User, UserCircle, UserRound, or other?
- [ ] **Inbox icon:** Mail, MessageSquare, Inbox, or other?
- [ ] **Notifications icon:** Bell, BellRing, or other?
- [ ] **Help icon:** HelpCircle, CircleHelp, Info, or other?
- [ ] **App Settings icon:** Settings, Cog, or other?
- [ ] **Log Out icon:** LogOut, DoorOpen, ArrowRightFromLine, or other?

### Routing Decisions

- [ ] **Favourites path:** /favourites or /wishlist?
- [ ] **Inbox path:** /inbox or /messages?
- [ ] **App Settings path:** /settings or /account/settings?
- [ ] **Login path:** /auth/login, /login, or other?
- [ ] **Become a Host path:** /become-host or other?
- [ ] **Switch to Host:** How does this work? (toggle mode, navigate to host dashboard, other?)

### Interaction Decisions

- [ ] **Sheet slide direction (mobile):** Right, left, or bottom?
- [ ] **Animation duration:** 200ms, 300ms, or default?
- [ ] **Tooltip delay:** 300ms, 500ms, or other?
- [ ] **Search placeholder text:** Exact wording?
- [ ] **Login action:** Navigate to page or open modal?
- [ ] **Log out flow:** Toast message text? Redirect to /?

### Error Handling Decisions

- [ ] **User data not available:** Loading skeleton, placeholder name, or log out?
- [ ] **Long user names:** Truncate, wrap, or show first name only?

### Accessibility Decisions

- [ ] **Focus trap:** Should focus be trapped in Sheet/Dropdown?
- [ ] **Announce menu open/close:** Use ARIA live regions or rely on component defaults?

---

## 14. Implementation Notes

### Directory Structure

```
/src
  /features
    /guest-navbar
      /components
        - GuestNavbar.tsx (main component)
        - Logo.tsx
        - SearchTrigger.tsx
        - UnregisteredMenu.tsx
        - UserProfileMenu.tsx
        - DesktopNavLinks.tsx
        - NavbarSkeleton.tsx
        - index.ts (barrel export)
      /types
        - index.ts (User, MenuItem, etc.)
      /constants
        - menuItems.ts (menu item configurations)
        - routes.ts (URL paths)
      /hooks (optional)
        - useAuth.ts (wrapper around authStore if needed)
  /stores
    - authStore.ts (Zustand auth store with dummy data)
```

### Files to Create

1. `/src/stores/authStore.ts` - Zustand auth store with dummy data
2. `/src/features/guest-navbar/types/index.ts` - TypeScript types
3. `/src/features/guest-navbar/constants/menuItems.ts` - Menu item configurations
4. `/src/features/guest-navbar/constants/routes.ts` - URL paths
5. `/src/features/guest-navbar/components/Logo.tsx` - Logo component
6. `/src/features/guest-navbar/components/SearchTrigger.tsx` - Search icon + placeholder
7. `/src/features/guest-navbar/components/UnregisteredMenu.tsx` - State 1 menu
8. `/src/features/guest-navbar/components/UserProfileMenu.tsx` - State 2 menu
9. `/src/features/guest-navbar/components/DesktopNavLinks.tsx` - Desktop icon links
10. `/src/features/guest-navbar/components/NavbarSkeleton.tsx` - Loading skeleton
11. `/src/features/guest-navbar/components/GuestNavbar.tsx` - Main component
12. `/src/features/guest-navbar/components/index.ts` - Barrel export

### Dependencies (Already Installed)

- `lucide-react` - Icons
- `zustand` - State management
- `@/components/shared/sheet` - Sheet component (Vaul)
- `@/components/shared/dropdown-menu` - Dropdown menu (Radix)
- `@/components/shared/command` - Command component (cmdk)
- `@/components/shared/button` - Button component
- `@/components/shared/avatar` - Avatar component
- `@/components/shared/separator` - Separator component
- `@/components/shared/tooltip` - Tooltip component

### Next Steps

1. **Review this requirements document** and answer all TODO items
2. **Approve the structure and data models**
3. **Begin implementation** following QUICK_START.md principles
4. **Test visually** with Playwright at each milestone
5. **Iterate based on feedback**

---

**Last Updated:** 2025-11-17
**Status:** ⚠️ Awaiting approval and TODO answers before implementation
