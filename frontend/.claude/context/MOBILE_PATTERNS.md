# DineLocal Mobile Interaction Patterns

**Version:** 1.0
**Last Updated:** 2025-01-05
**Target:** AI assistants and developers implementing mobile-specific features

---

## Purpose & Scope

**This document covers mobile-specific interaction patterns and behaviors for DineLocal.**

### What This Document Covers

**Mobile Interaction Patterns:**

- Touch gestures (swipe, long-press, pinch-to-zoom)
- Mobile navigation patterns (bottom sheets, drawers, tabs)
- Mobile-optimized forms and inputs
- Pull-to-refresh and infinite scroll
- Mobile performance patterns
- Device-specific considerations (safe areas, orientation)

### What This Document Does NOT Cover

**❌ Not Covered (See Other Documents):**

- **Visual styling (colors, typography, spacing)** → See `/frontend/.claude/context/STYLE_GUIDE.md`
- **Responsive CSS breakpoints** → See STYLE_GUIDE.md → Responsive Design
- **Accessibility implementation** → See STYLE_GUIDE.md → Accessibility
- **Design philosophy and rationale** → See `/frontend/.claude/context/DESIGN_PRINCIPLES.md`
- **Component architecture** → See `/frontend/.claude/CLAUDE.md`

### Document Relationships

```
MOBILE_PATTERNS.md (This Document)
    ├── Defines: Mobile-specific interactions, gestures, behaviors
    ├── When to use: Implementing mobile features, touch interactions, mobile UX
    └── Example: "Implement swipe-to-dismiss for notifications"

STYLE_GUIDE.md (Visual & Code Standards)
    ├── Defines: Responsive breakpoints, touch target sizes, Tailwind classes
    ├── When to use: Styling mobile layouts, responsive design
    └── Example: "Use h-12 for 48px touch targets"

DESIGN_PRINCIPLES.md (UX Philosophy)
    ├── Defines: Mobile-first philosophy, why mobile matters, user psychology
    ├── When to use: Understanding mobile strategy, user needs
    └── Example: "Tourists rely on mobile devices 80% of the time"
```

---

## Table of Contents

1. [Touch Gestures](#touch-gestures)
2. [Mobile Navigation Patterns](#mobile-navigation-patterns)
3. [Mobile Form Optimization](#mobile-form-optimization)
4. [Scroll Behaviors](#scroll-behaviors)
5. [Mobile Performance](#mobile-performance)
6. [Device-Specific Features](#device-specific-features)
7. [Mobile Testing Guidelines](#mobile-testing-guidelines)

---

## Touch Gestures

### Swipe Gestures

**Use Cases:**

- Image galleries (swipe left/right to navigate)
- Card dismissal (swipe to delete/archive)
- Tab navigation (swipe between tabs)

**Implementation:**

```tsx
import { useSwipeable } from 'react-swipeable'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SwipeableGalleryProps {
  images: { src: string; alt: string }[]
}

export function SwipeableGallery({ images }: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((i) => Math.min(i + 1, images.length - 1)),
    onSwipedRight: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    onSwiping: () => setIsSwiping(true),
    onSwiped: () => setIsSwiping(false),
    trackMouse: true, // Also works with mouse drag on desktop
    preventScrollOnSwipe: true, // Prevent vertical scroll during horizontal swipe
    delta: 10, // Minimum distance (px) before swipe is detected
  })

  return (
    <div className="relative">
      {/* Swipeable image container */}
      <div
        {...handlers}
        className={cn(
          'relative overflow-hidden rounded-lg',
          'touch-pan-y', // Allow vertical scrolling
          isSwiping && 'cursor-grabbing'
        )}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />

        {/* Navigation arrows (desktop) */}
        <div className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentIndex((i) => Math.min(i + 1, images.length - 1))}
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Pagination dots */}
      <Flex justifyContent="center" className="mt-4 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              'focus:ring-primary focus:ring-2 focus:outline-none',
              i === currentIndex
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
            )}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : 'false'}
          />
        ))}
      </Flex>

      {/* Image counter */}
      <Text className="text-muted-foreground mt-2 text-center text-sm">
        {currentIndex + 1} / {images.length}
      </Text>
    </div>
  )
}
```

**Best Practices:**

- ✅ Provide visual feedback during swipe (cursor change, slight translate)
- ✅ Include pagination dots for context
- ✅ Add fallback buttons for desktop (arrows)
- ✅ Prevent accidental vertical scroll during horizontal swipe
- ✅ Set minimum swipe distance to avoid accidental triggers
- ❌ Don't use swipe for critical actions (use explicit buttons)
- ❌ Don't swipe horizontally if page scrolls horizontally

---

### Long Press (Context Menu)

**Use Cases:**

- Show additional options for a card/item
- Copy text or save images
- Quick actions on list items

**Implementation:**

```tsx
import { useState } from 'react'

export function LongPressCard({ experience }) {
  const [showMenu, setShowMenu] = useState(false)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowMenu(true)
      // Haptic feedback (if supported)
      if ('vibrate' in navigator) {
        navigator.vibrate(50)
      }
    }, 500) // 500ms long press duration
    setPressTimer(timer)
  }

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
  }

  return (
    <>
      <Card
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        className="cursor-pointer transition-transform active:scale-95"
      >
        <CardContent>
          <Heading as="h3">{experience.title}</Heading>
          <Paragraph>{experience.description}</Paragraph>
        </CardContent>
      </Card>

      {/* Context menu (bottom sheet on mobile) */}
      {showMenu && (
        <Sheet open={showMenu} onOpenChange={setShowMenu}>
          <SheetContent side="bottom">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Experience
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Add to Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Flag className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
```

**Best Practices:**

- ✅ 500ms is the standard long-press duration
- ✅ Provide haptic feedback (vibration) when menu appears
- ✅ Clear timer on touch end to prevent accidental triggers
- ✅ Show visual indicator during long press (scale animation)
- ❌ Don't use long-press for primary actions
- ❌ Don't require long-press without alternative (accessibility)

---

## Mobile Navigation Patterns

### Bottom Sheet / Drawer

**Use Cases:**

- Filters on mobile
- Quick actions (share, save, report)
- Form inputs (date picker, location selector)
- Confirmation dialogs

**Implementation:**

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/shared/button'
import { Filter } from 'lucide-react'

export function MobileFilters() {
  return (
    <>
      {/* Desktop: Sidebar */}
      <aside className="hidden w-64 space-y-4 border-r p-4 md:block">
        <Heading as="h3" className="text-lg font-semibold">
          Filters
        </Heading>
        <FilterForm />
      </aside>

      {/* Mobile: Bottom sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full md:hidden">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Filter Experiences</SheetTitle>
          </SheetHeader>
          <div className="mt-4 h-[calc(80vh-120px)] overflow-y-auto">
            <FilterForm />
          </div>
          <div className="bg-background absolute right-0 bottom-0 left-0 border-t p-4">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
```

**Design Guidelines:**

- **Height:** 60-80% of viewport height (allows background context)
- **Handle:** Show drag handle at top for discoverability
- **Backdrop:** Dim background to focus attention
- **Sticky Footer:** Fixed "Apply" button at bottom
- **Scroll:** Content area scrollable if overflows
- **Close:** Swipe down or tap backdrop to dismiss

---

### Bottom Navigation Bar

**Use Cases:**

- Primary app navigation (Home, Search, Bookings, Profile)
- Quick access to 3-5 main sections

**Implementation:**

```tsx
export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: Home, label: 'Explore' },
    { href: '/search', icon: Search, label: 'Search' },
    { href: '/bookings', icon: Calendar, label: 'Bookings' },
    { href: '/favorites', icon: Heart, label: 'Saved' },
    { href: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="bg-background safe-area-bottom fixed right-0 bottom-0 left-0 z-50 border-t md:hidden">
      <Flex justifyContent="around" className="py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1',
                'min-w-[64px] px-2 py-1',
                'rounded-lg transition-colors',
                'focus:ring-primary focus:ring-2 focus:outline-none',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('h-6 w-6', isActive && 'fill-primary')} />
              <Text className={cn('text-xs font-medium', isActive && 'text-primary')}>
                {item.label}
              </Text>
            </Link>
          )
        })}
      </Flex>
    </nav>
  )
}
```

**Best Practices:**

- ✅ Use 3-5 items maximum (more = cluttered)
- ✅ Always show labels (icons alone are ambiguous)
- ✅ Highlight active section with color + filled icon
- ✅ Account for safe area on iOS/Android (`safe-area-bottom`)
- ✅ 48px+ touch target height
- ❌ Don't hide on scroll (persistent navigation)
- ❌ Don't use for secondary actions

---

## Mobile Form Optimization

### Auto-Focus and Input Types

**Use appropriate input types for better mobile keyboard:**

```tsx
export function MobileOptimizedForm() {
  return (
    <form className="space-y-4">
      {/* Email input - shows @ and .com keys */}
      <Input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        className="h-11"
      />

      {/* Phone input - shows number pad */}
      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+1 (555) 000-0000"
        className="h-11"
      />

      {/* Number input - shows numeric keyboard */}
      <Input
        type="number"
        inputMode="numeric"
        placeholder="Number of guests"
        min="1"
        max="20"
        className="h-11"
      />

      {/* Search input - shows search key instead of return */}
      <Input type="search" inputMode="search" placeholder="Search experiences" className="h-11" />

      {/* URL input - shows .com and / keys */}
      <Input type="url" inputMode="url" placeholder="https://example.com" className="h-11" />
    </form>
  )
}
```

**Input Mode Reference:**

| Input Type | `inputMode` | Mobile Keyboard           |
| ---------- | ----------- | ------------------------- |
| Email      | `"email"`   | Shows @ and .com keys     |
| Phone      | `"tel"`     | Number pad with +\*#      |
| Number     | `"numeric"` | Number pad 0-9 only       |
| Search     | `"search"`  | Shows "Search" action key |
| URL        | `"url"`     | Shows .com and / keys     |
| Text       | `"text"`    | Standard QWERTY keyboard  |

---

### Floating Labels

**Save vertical space on mobile:**

```tsx
import { useState } from 'react'

export function FloatingLabelInput({ label, ...props }) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(e.target.value !== '')
        }}
        className={cn('h-11 pt-6 pb-2', 'peer')}
      />
      <label
        className={cn(
          'pointer-events-none absolute left-3 transition-all',
          'text-muted-foreground',
          isFocused || hasValue ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2 text-base'
        )}
      >
        {label}
      </label>
    </div>
  )
}
```

---

## Scroll Behaviors

### Pull-to-Refresh

**Use for feed-style content:**

```tsx
import PullToRefresh from 'react-simple-pull-to-refresh'
import { useQueryClient } from '@tanstack/react-query'

export function ExperienceFeed({ experiences }) {
  const queryClient = useQueryClient()

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['experiences'] })
  }

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullingContent={
        <div className="flex justify-center py-4">
          <ArrowDown className="text-muted-foreground h-6 w-6 animate-bounce" />
        </div>
      }
      refreshingContent={
        <div className="flex justify-center py-4">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
      }
      resistance={2} // Higher = harder to pull
    >
      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </PullToRefresh>
  )
}
```

**Best Practices:**

- ✅ Use for content that updates frequently (feeds, lists)
- ✅ Show clear loading indicator
- ✅ Provide haptic feedback when refresh triggers
- ❌ Don't use on pages that rarely update
- ❌ Don't use if there's a fixed header (gesture conflicts)

---

### Infinite Scroll

**Load more content as user scrolls:**

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export function InfiniteExperienceList() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // Start loading 200px before reaching bottom
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['experiences'],
    queryFn: ({ pageParam = 0 }) => fetchExperiences(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="space-y-4">
      {data?.pages.map((page) =>
        page.experiences.map((exp) => <ExperienceCard key={exp.id} experience={exp} />)
      )}

      {/* Loading trigger */}
      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <Flex justifyContent="center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </Flex>
        )}
      </div>

      {/* End of results */}
      {!hasNextPage && (
        <Text className="text-muted-foreground py-8 text-center">You've reached the end!</Text>
      )}
    </div>
  )
}
```

---

## Mobile Performance

### Reduce Animations on Low-End Devices

**Detect device performance tier:**

```tsx
import { useEffect, useState } from 'react'

export function useDevicePerformance() {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2

    // Check device memory (GB)
    const memory = (navigator as any).deviceMemory || 4

    // Determine tier
    if (cores >= 8 && memory >= 8) {
      setTier('high')
    } else if (cores >= 4 && memory >= 4) {
      setTier('medium')
    } else {
      setTier('low')
    }
  }, [])

  return tier
}

// Usage in components
export function AnimatedCard() {
  const performanceTier = useDevicePerformance()

  return (
    <Card
      className={cn(
        'cursor-pointer',
        performanceTier !== 'low' && 'transition-transform hover:scale-105'
      )}
    >
      {/* Card content */}
    </Card>
  )
}
```

---

## Device-Specific Features

### iOS Safe Areas

**Handle iPhone notches and home indicator:**

```css
/* globals.css */
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
// Fixed header
<header className="fixed top-0 w-full bg-background z-50 safe-area-top">
  <nav className="px-4 py-3">
    {/* Nav content */}
  </nav>
</header>

// Fixed bottom navigation
<nav className="fixed bottom-0 w-full bg-background border-t safe-area-bottom">
  <MobileBottomNav />
</nav>
```

---

### Haptic Feedback

**Provide tactile feedback on interactions:**

```tsx
export function useHapticFeedback() {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!('vibrate' in navigator)) return

    const patterns = {
      light: 10,
      medium: 50,
      heavy: 100,
    }

    navigator.vibrate(patterns[type])
  }

  return { triggerHaptic }
}

// Usage
export function FavoriteButton({ experienceId }) {
  const { triggerHaptic } = useHapticFeedback()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const handleClick = () => {
    triggerHaptic('light')
    toggleFavorite(experienceId)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon">
      <Heart className="h-5 w-5" />
    </Button>
  )
}
```

---

## Mobile Testing Guidelines

### Essential Test Devices

**Minimum test matrix:**

| Device Type      | Example           | Viewport | Notes                |
| ---------------- | ----------------- | -------- | -------------------- |
| Small phone      | iPhone SE         | 375×667  | Smallest common size |
| Standard phone   | iPhone 13/14      | 390×844  | Most common          |
| Large phone      | iPhone 14 Pro Max | 430×932  | Largest common       |
| Tablet portrait  | iPad              | 768×1024 | Tablet breakpoint    |
| Tablet landscape | iPad              | 1024×768 | Horizontal tablet    |

### Browser DevTools Testing

**Chrome DevTools:**

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device from presets or set custom dimensions
4. Test touch mode (click touch icon in toolbar)
5. Throttle network (Fast 3G or Slow 3G)

**Safari Responsive Design Mode:**

1. Develop → Enter Responsive Design Mode (Cmd+Opt+R)
2. Select iOS device presets
3. Test with Safari-specific behaviors

---

## Checklist

**Before shipping mobile features:**

- [ ] Touch targets are 48px+ (primary: 56px+)
- [ ] Swipe gestures work in both directions
- [ ] Bottom sheets have sticky footers
- [ ] Forms use appropriate input types (`email`, `tel`, `numeric`)
- [ ] Safe areas accounted for (iOS notches, Android bars)
- [ ] Tested on slow 3G network
- [ ] Tested on iPhone SE (375px width)
- [ ] Pull-to-refresh doesn't conflict with scroll
- [ ] Haptic feedback on key interactions
- [ ] No horizontal scroll on mobile viewports
- [ ] Images optimized for mobile (WebP, lazy load)
- [ ] Infinite scroll triggers before reaching bottom
- [ ] Bottom navigation doesn't cover content

---

## Additional Resources

**Internal Documents:**

- 📖 STYLE_GUIDE.md → Responsive breakpoints, touch target sizes
- 📖 DESIGN_PRINCIPLES.md → Mobile-first philosophy, user psychology
- 📖 COMPONENT_GUIDELINES.md → React patterns, data fetching

**External Resources:**

- [iOS Human Interface Guidelines - Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
- [Material Design - Mobile Best Practices](https://m3.material.io/)
- [MDN - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

---

**Questions or Updates?**
If you need to add new mobile patterns, ensure they align with STYLE_GUIDE.md and DESIGN_PRINCIPLES.md.

- Propose changes with rationale and examples
