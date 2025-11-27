## React/Next.js 15 Best Practices (2025)

### Functional Components & Hooks

**Always use functional components with hooks (not class components):**

```tsx
// ✅ CORRECT: Functional component with hooks
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setIsLoading(false))
  }, [userId])

  return <div>{/* ... */}</div>
}

// ❌ INCORRECT: Class component (outdated pattern)
class UserProfile extends React.Component {
  // Don't use class components in 2025
}
```

**Hook Rules (CRITICAL):**

1. **Only call hooks at the top level** - Never in loops, conditions, or nested functions
2. **Only call hooks in function components or custom hooks**
3. **Name custom hooks with `use` prefix** - `useAuth`, `useDebounce`

```tsx
// ❌ INCORRECT: Hook in conditional
function BadComponent() {
  if (condition) {
    const [state, setState] = useState() // BREAKS REACT!
  }
}

// ✅ CORRECT: State at top level
function GoodComponent() {
  const [state, setState] = useState()
  if (condition) {
    // Use state here
  }
}
```

---

### Server Components Best Practices (Next.js 15)

**Default to Server Components, opt-in to Client Components:**

```tsx
// ✅ CORRECT: Server Component (default)
// app/experiences/[id]/page.tsx
export default async function ExperiencePage({ params }: { params: { id: string } }) {
  // Direct fetch in Server Component (no React Query needed)
  const experience = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/experiences/${params.id}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
  }).then((res) => res.json())

  return (
    <div>
      <ExperienceHero experience={experience} /> {/* Server Component */}
      <BookingForm experienceId={params.id} /> {/* Client Component */}
    </div>
  )
}

// ✅ CORRECT: Client Component for interactivity
// components/features/bookings/BookingForm.tsx
;('use client')

import { useState } from 'react'
import { useCreateBooking } from '@/features/bookings/hooks/useCreateBooking'

export function BookingForm({ experienceId }: { experienceId: string }) {
  const [date, setDate] = useState<Date>()
  const { mutate: createBooking, isPending } = useCreateBooking()

  const handleSubmit = () => {
    createBooking({ experienceId, date })
  }

  return <form onSubmit={handleSubmit}>{/* Form fields with event handlers */}</form>
}
```

**Server Component Rendering Strategies:**

```tsx
// ✅ Static (SSG) - Build time generation
export const dynamic = 'force-static'

// ✅ Dynamic (SSR) - Every request
export const dynamic = 'force-dynamic'

// ✅ ISR - Revalidate every N seconds
export const revalidate = 60 // seconds

// ✅ Auto (Default) - Next.js decides
// (no export needed)
```

**When to use Server vs Client Components:**

| Feature              | Server Component            | Client Component         |
| -------------------- | --------------------------- | ------------------------ |
| Fetch data from API  | ✅ Yes (async/await)        | ✅ Yes (React Query)     |
| Access env variables | ✅ Yes (server-side)        | ⚠️ Only `NEXT_PUBLIC_*`  |
| Event handlers       | ❌ No                       | ✅ Yes                   |
| React hooks          | ❌ No                       | ✅ Yes                   |
| Browser APIs         | ❌ No                       | ✅ Yes                   |
| Large dependencies   | ✅ Yes (not sent to client) | ⚠️ Increases bundle size |
| SEO-critical content | ✅ Yes (rendered on server) | ⚠️ Rendered on client    |

---

### Custom Hooks Patterns

**Extract reusable logic into custom hooks:**

```tsx
// ✅ CORRECT: Custom hook for form state
export function useFormState<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = (field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, resetForm, setErrors }
}

// Usage
function SignUpForm() {
  const { values, errors, touched, handleChange, handleBlur } = useFormState({
    email: '',
    password: '',
  })

  return (
    <form>
      <Input
        value={values.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
      />
    </form>
  )
}
```

**Common Custom Hook Patterns:**

```tsx
// Data fetching hook
export function useExperiences(filters: FilterParams) {
  return useQuery({
    queryKey: ['experiences', filters],
    queryFn: () => getExperiences(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Local storage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

---

### Component Composition Over Inheritance

**Use composition to build complex UIs:**

```tsx
// ✅ CORRECT: Composition pattern
interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('rounded-lg border p-4', className)}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2 border-b pb-2">{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

// Usage: Compose cards flexibly
;<Card>
  <CardHeader>
    <Heading as="h3">Experience Title</Heading>
  </CardHeader>
  <CardBody>
    <Paragraph>Description...</Paragraph>
  </CardBody>
</Card>

// ❌ INCORRECT: Inheritance (not used in React)
class Card extends Component {
  // Don't use inheritance in React
}
```

**Compound Component Pattern:**

```tsx
// ✅ Advanced composition with context
const TabsContext = createContext<{
  activeTab: string
  setActiveTab: (tab: string) => void
} | null>(null)

export function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 border-b">{children}</div>
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={cn('px-4 py-2', context.activeTab === value && 'border-primary border-b-2')}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.activeTab !== value) return null
  return <div>{children}</div>
}

// Usage
;<Tabs defaultTab="about">
  <TabsList>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="menu">Menu</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="about">About content</TabsContent>
  <TabsContent value="menu">Menu content</TabsContent>
  <TabsContent value="reviews">Reviews content</TabsContent>
</Tabs>
```

---

### Performance Optimization

**Use React.memo for expensive components:**

```tsx
// ✅ Memoize components that receive same props often
export const ExperienceCard = React.memo(function ExperienceCard({
  experience,
}: {
  experience: Experience
}) {
  return <Card>{/* Expensive render logic */}</Card>
})

// Only re-render if experience.id changes
export const ExperienceCard = React.memo(
  function ExperienceCard({ experience }: { experience: Experience }) {
    return <Card>{/* ... */}</Card>
  },
  (prevProps, nextProps) => prevProps.experience.id === nextProps.experience.id
)
```

**Use useMemo and useCallback appropriately:**

```tsx
// ✅ CORRECT: Memoize expensive calculations
function ExperienceList({ experiences }: { experiences: Experience[] }) {
  // Memoize expensive filter/sort operations
  const sortedExperiences = useMemo(() => {
    return experiences.filter((exp) => exp.availability > 0).sort((a, b) => b.rating - a.rating)
  }, [experiences])

  // Memoize callback passed to child components
  const handleBooking = useCallback((experienceId: string) => {
    // Booking logic
  }, []) // Empty deps if no external values needed

  return (
    <div>
      {sortedExperiences.map((exp) => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          onBook={handleBooking} // Stable reference
        />
      ))}
    </div>
  )
}

// ❌ INCORRECT: Overusing memoization
function SimpleComponent({ name }: { name: string }) {
  // Don't memoize simple operations
  const greeting = useMemo(() => `Hello, ${name}!`, [name]) // Overkill!
  return <h1>{greeting}</h1>
}
```

**When to use memoization:**

- ✅ Expensive calculations (filtering large arrays, complex math)
- ✅ Callbacks passed to memoized child components
- ✅ Values used as dependencies in other hooks
- ❌ Simple string concatenation or basic operations
- ❌ Every single function or value (premature optimization)

---

### Error Boundaries

**Always handle errors gracefully:**

```tsx
// ✅ CORRECT: Error boundary component
'use client' // Error boundaries must be Client Components

import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-600 p-4">
            <Heading as="h3" className="text-red-700">
              Something went wrong
            </Heading>
            <Paragraph className="text-muted-foreground text-sm">
              {this.state.error?.message}
            </Paragraph>
            <Button onClick={() => this.setState({ hasError: false })} className="mt-4">
              Try Again
            </Button>
          </div>
        )
      )
    }

    return this.props.children
  }
}

// Usage: Wrap components that might error
;<ErrorBoundary fallback={<ErrorFallback />}>
  <ExperienceList />
</ErrorBoundary>
```

---
