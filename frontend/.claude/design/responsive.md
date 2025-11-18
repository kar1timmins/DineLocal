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

