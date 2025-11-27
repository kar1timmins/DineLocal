# Clean Code Principles

**Purpose:** Defines clean code practices for readable, maintainable, and refactorable TypeScript/React code.

**Based on:** Robert C. Martin's "Clean Code" adapted for TypeScript and React (2025 best practices)

**See also:**

- [File Naming](./file-naming.md) - File and variable naming conventions
- [TypeScript Standards](../components/typescript-standards.md) - TypeScript-specific patterns
- [Component Patterns](../components/component-patterns.md) - React component best practices
- [Code Style](../design/code-style.md) - Formatting and style guide

---

## Core Principles

### 1. Single Responsibility Principle (SRP)

**"A function/component should do one thing and do it well."**

Every function, component, or module should have **only one reason to change**.

#### Functions

```typescript
// ❌ BAD: Function does multiple things
function processBookingAndSendEmail(booking: Booking) {
  // Validate booking
  if (!booking.date || !booking.guests) {
    throw new Error('Invalid booking')
  }

  // Save to database
  database.save(booking)

  // Send confirmation email
  emailService.send({
    to: booking.guestEmail,
    subject: 'Booking Confirmation',
    body: `Your booking for ${booking.date} is confirmed`,
  })

  // Update analytics
  analytics.track('booking_created')
}

// ✅ GOOD: Separate functions, each with single responsibility
function validateBooking(booking: Booking): void {
  if (!booking.date || !booking.guests) {
    throw new Error('Invalid booking')
  }
}

function saveBooking(booking: Booking): Promise<Booking> {
  return database.save(booking)
}

function sendBookingConfirmation(booking: Booking): Promise<void> {
  return emailService.send({
    to: booking.guestEmail,
    subject: 'Booking Confirmation',
    body: `Your booking for ${booking.date} is confirmed`,
  })
}

function trackBookingCreated(bookingId: string): void {
  analytics.track('booking_created', { bookingId })
}

// Orchestrate in a higher-level function
async function processBooking(booking: Booking): Promise<Booking> {
  validateBooking(booking)
  const savedBooking = await saveBooking(booking)
  await sendBookingConfirmation(savedBooking)
  trackBookingCreated(savedBooking.id)
  return savedBooking
}
```

#### Components

```typescript
// ❌ BAD: Component handles data fetching, UI, and business logic
function VenueDetailsPage({ venueId }: { venueId: string }) {
  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingDate, setBookingDate] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    fetch(`/api/venues/${venueId}`)
      .then((res) => res.json())
      .then((data) => {
        setVenue(data)
        setLoading(false)
      })
  }, [venueId])

  const handleBooking = async () => {
    const booking = { venueId, date: bookingDate, guests }
    await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    })
    alert('Booking created!')
  }

  if (loading) return <div>Loading...</div>
  if (!venue) return <div>Not found</div>

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{venue.description}</p>
      <input value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
      <input value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  )
}

// ✅ GOOD: Separate concerns into smaller components
// Data fetching (custom hook)
function useVenue(venueId: string) {
  return useQuery({
    queryKey: ['venue', venueId],
    queryFn: () => getVenue(venueId),
  })
}

// UI presentation (component)
function VenueHeader({ name, description }: { name: string; description: string }) {
  return (
    <div>
      <Heading as="h1">{name}</Heading>
      <Paragraph>{description}</Paragraph>
    </div>
  )
}

// Business logic (component)
function BookingForm({ venueId }: { venueId: string }) {
  const { mutate: createBooking } = useCreateBooking()
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBooking({ venueId, date, guests })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input value={date} onChange={(e) => setDate(e.target.value)} />
      <Input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
      <Button type="submit">Book Now</Button>
    </form>
  )
}

// Orchestration (page component)
function VenueDetailsPage({ venueId }: { venueId: string }) {
  const { data: venue, isLoading, error } = useVenue(venueId)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!venue) return <NotFoundMessage />

  return (
    <div>
      <VenueHeader name={venue.name} description={venue.description} />
      <BookingForm venueId={venueId} />
    </div>
  )
}
```

---

### 2. Open/Closed Principle (OCP)

**"Software entities should be open for extension, but closed for modification."**

Use **composition** and **props** to extend behavior without changing existing code.

```typescript
// ❌ BAD: Modifying component to add new variants
function Button({ variant, children }: { variant: 'primary' | 'secondary' | 'danger'; children: ReactNode }) {
  let className = 'btn'
  if (variant === 'primary') className += ' btn-primary'
  if (variant === 'secondary') className += ' btn-secondary'
  if (variant === 'danger') className += ' btn-danger'

  return <button className={className}>{children}</button>
}

// Adding new variant requires modifying the component
// What if we need 'success', 'warning', 'ghost', etc.?

// ✅ GOOD: Open for extension via props
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
}

// Adding new variant doesn't require changing Button component
// Just add to buttonVariants object
```

---

### 3. Liskov Substitution Principle (LSP)

**"Subtypes must be substitutable for their base types."**

In React: Components that accept the same props should be **interchangeable**.

```typescript
// ❌ BAD: Components with same interface but different behavior
interface CardProps {
  title: string
  description: string
}

function ProductCard({ title, description }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button>Add to Cart</button> {/* Unexpected behavior! */}
    </div>
  )
}

function VenueCard({ title, description }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href="/venues">View Details</a> {/* Different action! */}
    </div>
  )
}

// ✅ GOOD: Components are truly interchangeable
interface CardProps {
  title: string
  description: string
  action: ReactNode // Accept action as prop
}

function Card({ title, description, action }: CardProps) {
  return (
    <div>
      <Heading as="h2">{title}</Heading>
      <Paragraph>{description}</Paragraph>
      {action}
    </div>
  )
}

// Usage
<Card
  title="Venue Name"
  description="Description"
  action={<Button as={Link} href="/venues/123">View Details</Button>}
/>

<Card
  title="Product Name"
  description="Description"
  action={<Button onClick={addToCart}>Add to Cart</Button>}
/>
```

---

### 4. Interface Segregation Principle (ISP)

**"Clients should not be forced to depend on interfaces they don't use."**

In React: Components shouldn't have **props they don't need**.

```typescript
// ❌ BAD: Component receives props it doesn't use
interface UserProfileProps {
  user: {
    id: string
    name: string
    email: string
    avatar: string
    bio: string
    settings: {
      theme: string
      notifications: boolean
      language: string
    }
  }
}

function UserAvatar({ user }: UserProfileProps) {
  // Only needs avatar and name, but receives entire user object
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
    </div>
  )
}

// ✅ GOOD: Component only receives what it needs
interface UserAvatarProps {
  avatar: string
  name: string
}

function UserAvatar({ avatar, name }: UserAvatarProps) {
  return (
    <div>
      <img src={avatar} alt={name} />
    </div>
  )
}

// Usage
<UserAvatar avatar={user.avatar} name={user.name} />
```

---

### 5. Dependency Inversion Principle (DIP)

**"Depend on abstractions, not concretions."**

In React: Use **dependency injection** via props/context instead of hard-coded dependencies.

```typescript
// ❌ BAD: Component depends on concrete implementation
import { apiClient } from '@/api/client'

function BookingList() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    apiClient.get('/bookings').then(setBookings)
  }, [])

  return <div>{/* ... */}</div>
}

// Hard to test, can't swap implementation

// ✅ GOOD: Component depends on abstraction (React Query hook)
function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings, // Abstraction (can be mocked for testing)
  })
}

function BookingList() {
  const { data: bookings } = useBookings()

  return <div>{/* ... */}</div>
}

// Easy to test:
// const mockUseBookings = jest.fn(() => ({ data: mockBookings }))
```

---

## Function Best Practices

### 1. Descriptive Names

**Use clear, self-documenting names that reveal intent.**

```typescript
// ❌ BAD: Vague, abbreviated names
function proc(d: Date): number {
  const x = d.getTime()
  return x / 1000
}

// ✅ GOOD: Descriptive, clear names
function convertDateToUnixTimestamp(date: Date): number {
  const milliseconds = date.getTime()
  return milliseconds / 1000
}
```

### 2. Small Functions

**Keep functions small (ideally < 20 lines, max 50 lines).**

```typescript
// ❌ BAD: Large function doing multiple things
function createBookingAndNotifyHost(bookingData: CreateBookingDto) {
  // Validate (10 lines)
  if (!bookingData.date) throw new Error('Date required')
  if (!bookingData.guests) throw new Error('Guests required')
  if (bookingData.guests < 1) throw new Error('At least 1 guest')

  // Check availability (15 lines)
  const venue = await getVenue(bookingData.venueId)
  const existingBookings = await getBookingsByDate(bookingData.date)
  if (existingBookings.length >= venue.capacity) throw new Error('Fully booked')

  // Create booking (10 lines)
  const booking = await saveBooking(bookingData)

  // Send notification (20 lines)
  const host = await getHost(venue.hostId)
  await emailService.send({
    to: host.email,
    subject: 'New Booking',
    body: generateBookingEmail(booking),
  })

  // Update analytics (10 lines)
  await analytics.track('booking_created', { bookingId: booking.id })

  return booking
}

// ✅ GOOD: Small, focused functions
async function validateBookingData(data: CreateBookingDto): Promise<void> {
  if (!data.date) throw new Error('Date required')
  if (!data.guests || data.guests < 1) throw new Error('At least 1 guest required')
}

async function checkVenueAvailability(venueId: string, date: string): Promise<void> {
  const venue = await getVenue(venueId)
  const existingBookings = await getBookingsByDate(date)

  if (existingBookings.length >= venue.capacity) {
    throw new Error('Venue is fully booked for this date')
  }
}

async function notifyHostOfBooking(booking: Booking): Promise<void> {
  const venue = await getVenue(booking.venueId)
  const host = await getHost(venue.hostId)

  await emailService.send({
    to: host.email,
    subject: 'New Booking Received',
    body: generateBookingEmail(booking),
  })
}

// Orchestrate
async function createBookingAndNotifyHost(bookingData: CreateBookingDto): Promise<Booking> {
  await validateBookingData(bookingData)
  await checkVenueAvailability(bookingData.venueId, bookingData.date)

  const booking = await saveBooking(bookingData)

  await notifyHostOfBooking(booking)
  await analytics.track('booking_created', { bookingId: booking.id })

  return booking
}
```

### 3. Few Parameters

**Limit function parameters (ideal: 0-2, max: 3).**

```typescript
// ❌ BAD: Too many parameters
function createBooking(
  venueId: string,
  date: string,
  guests: number,
  specialRequests: string,
  guestName: string,
  guestEmail: string,
  guestPhone: string
) {
  // ...
}

// ✅ GOOD: Use objects for multiple parameters
interface CreateBookingParams {
  venueId: string
  date: string
  guests: number
  specialRequests?: string
  guest: {
    name: string
    email: string
    phone: string
  }
}

function createBooking(params: CreateBookingParams) {
  // ...
}

// Usage
createBooking({
  venueId: '123',
  date: '2025-12-25',
  guests: 4,
  guest: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
  },
})
```

### 4. No Side Effects

**Pure functions: same input → same output, no side effects.**

```typescript
// ❌ BAD: Function has side effects
let totalBookings = 0

function addBooking(booking: Booking): Booking {
  totalBookings++ // Side effect!
  return booking
}

// ✅ GOOD: Pure function, no side effects
function addBooking(
  booking: Booking,
  currentTotal: number
): { booking: Booking; newTotal: number } {
  return {
    booking,
    newTotal: currentTotal + 1,
  }
}
```

### 5. Error Handling

**Use try/catch, avoid returning error codes.**

```typescript
// ❌ BAD: Returning error codes
function parseBookingDate(dateString: string): { success: boolean; date?: Date; error?: string } {
  try {
    const date = new Date(dateString)
    return { success: true, date }
  } catch (e) {
    return { success: false, error: 'Invalid date' }
  }
}

// ✅ GOOD: Throw errors, let caller handle
function parseBookingDate(dateString: string): Date {
  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}`)
  }

  return date
}

// Usage
try {
  const date = parseBookingDate(input)
  // Use date
} catch (error) {
  // Handle error
  toast.error(error.message)
}
```

---

## DRY Principle

**"Don't Repeat Yourself"**

```typescript
// ❌ BAD: Duplicate logic
function formatBookingDate(booking: Booking): string {
  const date = new Date(booking.date)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function formatVenueOpenDate(venue: Venue): string {
  const date = new Date(venue.openDate)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

// ✅ GOOD: Reusable utility
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

// Usage
formatDate(booking.date)
formatDate(venue.openDate)
```

---

## Comments vs Self-Documenting Code

**"Good code is self-documenting."**

```typescript
// ❌ BAD: Comments explain unclear code
function calc(d: Date): boolean {
  // Check if date is within the next 30 days
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  const days = diff / (1000 * 60 * 60 * 24)
  return days <= 30 && days >= 0
}

// ✅ GOOD: Clear names eliminate need for comments
function isDateWithinNext30Days(date: Date): boolean {
  const now = new Date()
  const differenceInMilliseconds = date.getTime() - now.getTime()
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24)

  const DAYS_IN_MONTH = 30
  return differenceInDays >= 0 && differenceInDays <= DAYS_IN_MONTH
}
```

**When to use comments:**

```typescript
// ✅ GOOD: Explain WHY, not WHAT
function calculateBookingPrice(booking: Booking): number {
  // Apply 20% discount for bookings made 30+ days in advance
  // (Business requirement from stakeholder meeting 2025-11-01)
  if (isBookingMadeInAdvance(booking, 30)) {
    return booking.basePrice * 0.8
  }

  return booking.basePrice
}
```

---

## Naming Conventions

### Variables

```typescript
// ✅ camelCase for variables
const userName = 'John Doe'
const bookingDate = new Date()
const venueList = []

// ✅ Descriptive, not abbreviated
const guestCount = 4 // Not 'gc' or 'gstCnt'
const totalPrice = 150 // Not 'tp' or 'totPrc'
```

### Functions

```typescript
// ✅ Verbs for functions
function calculateTotal() {}
function fetchVenues() {}
function validateBooking() {}

// ✅ Boolean functions start with is/has/can
function isAvailable() {}
function hasDiscount() {}
function canBook() {}
```

### Components

```typescript
// ✅ PascalCase for components
function BookingForm() {}
function VenueCard() {}
function UserProfile() {}

// ✅ Descriptive, reveals purpose
function BookingConfirmationModal() {} // Not 'Modal' or 'Dialog'
function VenueSearchFilters() {} // Not 'Filters' or 'Search'
```

### Constants

```typescript
// ✅ SCREAMING_SNAKE_CASE for constants
const MAX_GUESTS = 10
const API_TIMEOUT_MS = 5000
const DEFAULT_PAGE_SIZE = 20
```

---

## Quick Reference

| Principle      | Guideline                                      | Example                                             |
| -------------- | ---------------------------------------------- | --------------------------------------------------- |
| **SRP**        | One responsibility per function/component      | `validateBooking()`, not `validateAndSaveBooking()` |
| **OCP**        | Open for extension, closed for modification    | Use props/composition, not if/else chains           |
| **LSP**        | Components with same props are interchangeable | Consistent prop interfaces                          |
| **ISP**        | No unused props                                | `{ name, avatar }`, not entire user object          |
| **DIP**        | Depend on abstractions                         | Use hooks, not direct API calls                     |
| **DRY**        | Don't repeat yourself                          | Extract reusable utilities                          |
| **Small**      | Functions < 20 lines (max 50)                  | Break large functions into smaller ones             |
| **Few params** | Max 3 parameters                               | Use objects for multiple params                     |
| **Pure**       | No side effects                                | Same input → same output                            |
| **Names**      | Self-documenting                               | `isDateWithinNext30Days()`, not `check()`           |

---

**See also:**

- [File Naming](./file-naming.md) - Naming conventions for files
- [TypeScript Standards](../components/typescript-standards.md) - TypeScript-specific patterns
- [Component Patterns](../components/component-patterns.md) - React component best practices
- [Code Style](../design/code-style.md) - Formatting standards
- [SSOT Mapping](../SINGLE_SOURCE_OF_TRUTH.md) - Single source of truth
