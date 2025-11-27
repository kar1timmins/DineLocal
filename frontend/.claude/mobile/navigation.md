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
