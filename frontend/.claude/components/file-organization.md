## File Organization

### 19. Consistent Directory Structure

**Organize files logically and consistently.**

**DineLocal Directory Structure:**

```
src/
  /app                          # Next.js App Router
    /products                   # Products route
      /[id]                     # Dynamic product detail route
        page.tsx                # Product detail page
        loading.tsx             # Loading state for [id]
        error.tsx               # Error boundary for [id]
      page.tsx                  # Products list page
      layout.tsx                # Products layout
      loading.tsx               # Loading state for list
      error.tsx                 # Error boundary for list

  /components
    /ui                         # Raw Shadcn/UI components (DO NOT modify)
    /shared                     # Reusable UI components (customized Shadcn + custom)

  /features                     # Feature modules by business domain
    /auth
      /api                      # API client functions (NestJS calls)
      /components               # Auth-specific components
      /hooks                    # Auth-specific hooks
      /types                    # Auth-specific types
      /schemas                  # Zod validation schemas
      /constants                # Auth constants
    /bookings
      /api
      /components
      /hooks
      /types
      /schemas
      /constants
    /venues
      /api
      /components
      /hooks
      /types
      /schemas
      /constants

  /lib                          # Cross-cutting utilities
  /hooks                        # Common custom React hooks
  /api                          # Common API utilities (base client, interceptors)
  /types                        # Common TypeScript types
  /enums                        # Common enums
  /config                       # App-wide configurations
  /public                       # Static assets (images, fonts)
```

---

### 20. Mobile-First Responsive Design

**DineLocal uses mobile-first approach with Tailwind CSS breakpoints.**

**Breakpoints:**

- `default`: < 640px (mobile)
- `sm`: ≥ 640px (large mobile)
- `md`: ≥ 768px (tablet)
- `lg`: ≥ 1024px (desktop)
- `xl`: ≥ 1280px (large desktop)
- `2xl`: ≥ 1536px (extra large desktop)

```tsx
// ✅ Mobile-first Tailwind classes
export function VenueCard({ venue }: VenueCardProps) {
  return (
    <div className="/* Mobile: 16px padding */ /* Tablet: 24px padding */ /* Desktop: 32px padding */ /* Mobile: stacked layout */ /* Tablet: 2 columns */ /* Desktop: 3 columns */ /* Mobile: 16px gap */ /* Tablet: 24px gap */ /* Desktop: 32px gap */ grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 lg:gap-8 lg:p-8">
      <h2 className="/* Mobile: 20px */ /* Tablet: 24px */ /* Desktop: 30px */ text-xl md:text-2xl lg:text-3xl">
        {venue.name}
      </h2>

      {/* Image aspect ratios change on different screens */}
      <div className="/* Mobile: square */ /* Tablet+: 16:9 */ aspect-square md:aspect-video">
        <Image src={venue.image} alt={venue.name} fill />
      </div>
    </div>
  )
}

// ✅ Responsive visibility
export function Navigation() {
  return (
    <nav>
      {/* Mobile: Hamburger menu */}
      <button className="md:hidden">
        <MenuIcon />
      </button>

      {/* Desktop: Full navigation */}
      <ul className="hidden md:flex md:gap-4">
        <li>
          <a href="/venues">Venues</a>
        </li>
        <li>
          <a href="/experiences">Experiences</a>
        </li>
        <li>
          <a href="/bookings">My Bookings</a>
        </li>
      </ul>
    </nav>
  )
}

// ✅ Use responsive hooks for complex behavior
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)')

  if (isMobile) {
    return <MobileLayout />
  }

  if (isTablet) {
    return <TabletLayout />
  }

  return <DesktopLayout />
}

// ✅ Responsive containers
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="/* Mobile: 16px side padding */ /* Tablet: 24px */ /* Desktop: 32px */ /* Center */ /* Max width on large screens */ container mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
      {children}
    </div>
  )
}
```

**Mobile-First Best Practices:**

- Design for smallest screen first, then enhance
- Touch targets minimum 44x44px for accessibility
- Use responsive typography scales
- Test on real devices, not just browser resize
- Consider thumb zones for mobile navigation
- Use `useMediaQuery` hook for conditional rendering

---

### 21. Date Formatting with Date-Fns

**Use date-fns for all date manipulation in DineLocal.**

```tsx
import {
  format,
  parseISO,
  addDays,
  isAfter,
  differenceInDays,
  startOfDay,
  endOfDay,
} from 'date-fns'

// ✅ Format dates consistently
export function BookingDate({ date }: { date: string | Date }) {
  const formattedDate = format(
    typeof date === 'string' ? parseISO(date) : date,
    'MMMM d, yyyy' // "January 15, 2025"
  )

  return (
    <time dateTime={typeof date === 'string' ? date : date.toISOString()}>{formattedDate}</time>
  )
}

// ✅ Date calculations
export function getAvailableDates(startDate: Date, numberOfDays: number): Date[] {
  return Array.from({ length: numberOfDays }, (_, i) => addDays(startDate, i))
}

// ✅ Date comparisons
export function isBookingExpired(bookingDate: string): boolean {
  return isAfter(new Date(), parseISO(bookingDate))
}

// ✅ Common date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMMM d, yyyy', // January 15, 2025
  SHORT: 'MMM d, yyyy', // Jan 15, 2025
  TIME: 'h:mm a', // 2:30 PM
  DATETIME: 'MMM d, yyyy h:mm a', // Jan 15, 2025 2:30 PM
  ISO: "yyyy-MM-dd'T'HH:mm:ss", // 2025-01-15T14:30:00
} as const

// ✅ Reusable date formatter
export function formatBookingDate(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, DATE_FORMATS.DISPLAY)
}

// ✅ Relative time display
export function getBookingStatus(bookingDate: string): string {
  const today = startOfDay(new Date())
  const booking = startOfDay(parseISO(bookingDate))
  const daysUntil = differenceInDays(booking, today)

  if (daysUntil < 0) return 'Past'
  if (daysUntil === 0) return 'Today'
  if (daysUntil === 1) return 'Tomorrow'
  return `In ${daysUntil} days`
}

// ✅ Date picker integration
import { Calendar } from '@/components/ui/calendar'

export function BookingDatePicker({
  value,
  onChange,
}: {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
}) {
  return (
    <Calendar
      mode="single"
      selected={value}
      onSelect={onChange}
      disabled={
        (date) =>
          date < startOfDay(new Date()) || // Disable past dates
          date > addDays(new Date(), 90) // Only allow 90 days ahead
      }
    />
  )
}
```

**Date-Fns Best Practices:**

- Always use `parseISO()` for ISO date strings from backend
- Use semantic time element with `dateTime` attribute
- Store dates in ISO 8601 format in database
- Display dates in user-friendly formats
- Consider time zones (use `date-fns-tz` if needed)

---

