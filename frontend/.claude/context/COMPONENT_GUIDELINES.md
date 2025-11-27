# Next.js Component Design Principles

> Guidelines for creating high-quality components, features, and pages in Next.js App Router projects.

## Core Principles

### 1. Server Components by Default

**Always start with Server Components unless you need client-side interactivity.**

```tsx
// ✅ Default: Server Component (for DineLocal - fetch from NestJS backend)
export default async function UserProfilePage({ params }: { params: { userId: string } }) {
  // Server Components can fetch from NestJS API directly
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.userId}`, {
    cache: 'no-store', // or configure caching as needed
  })
  const user = await response.json()

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

// ❌ Don't add 'use client' unnecessarily
;('use client')
export default function StaticContent() {
  return <div>This doesn't need client-side JS</div>
}
```

**Note for DineLocal:**

- Server Components fetch from **NestJS backend API** (not direct database access)
- For dynamic/interactive data, prefer **React Query in Client Components**
- Server Components are great for initial page loads and SEO

**When to use 'use client':**

- Event handlers (`onClick`, `onChange`, etc.)
- React hooks (`useState`, `useEffect`, etc.)
- Browser APIs (`localStorage`, `window`, etc.)
- Third-party libraries that require client-side code

---

### 2. Single Responsibility Principle

**Each component should do one thing well.**

```tsx
// ❌ Component doing too much
export function UserDashboard() {
  return (
    <div>
      <Header />
      <Sidebar />
      <UserProfile />
      <RecentOrders />
      <ActivityFeed />
      <Footer />
    </div>
  )
}

// ✅ Break into focused components
export function UserDashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardContent />
    </DashboardLayout>
  )
}

export function DashboardContent() {
  return (
    <Grid className="gap-6">
      <UserProfileSection />
      <RecentOrdersSection />
      <ActivityFeedSection />
    </Grid>
  )
}
```

---

### 3. Composition Over Props Drilling

**Use component composition to avoid passing props through multiple levels.**

```tsx
// ❌ Props drilling
export function Page() {
  const user = await getUser()
  return (
    <Layout user={user}>
      <Content user={user} />
    </Layout>
  )
}

// ✅ Composition with children
export function Page() {
  const user = await getUser()
  return (
    <Layout>
      <UserContext user={user}>
        <Content />
      </UserContext>
    </Layout>
  )
}

// ✅ Or use React Context/Server Context where appropriate
```

---

### 4. Type Safety First

**Always define explicit TypeScript types. No `any` types.**

```tsx
// ❌ Implicit any
export function UserCard({ user }) {
  return <div>{user.name}</div>
}

// ✅ Explicit types
interface UserCardProps {
  user: {
    id: string
    name: string
    email: string
  }
}

export function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>
}

// ✅ Even better: Import from shared types
import { User } from '@/types/user.types'

interface UserCardProps {
  user: User
}
```

---

## Component Patterns

### 5. Co-locate Related Files

**Keep related files together for better maintainability.**

**For DineLocal feature components:**

```
/features/auth/components/signup
  ├── SignupForm.tsx           # Main component
  ├── SignupFormSkeleton.tsx   # Loading state
  ├── SignupForm.test.tsx      # Tests (optional)
  └── index.ts                 # Barrel export

/features/auth/hooks
  └── useSignup.ts             # Feature-specific hook

/features/auth/types
  └── auth.types.ts            # Feature-specific types
```

**For shared components:**

```
/components/shared/date-picker
  ├── DatePicker.tsx           # Main component
  ├── DatePicker.test.tsx      # Tests
  └── index.ts                 # Export
```

**Note for DineLocal:**

- Use **Tailwind CSS** for styling (not CSS modules)
- Types go in `/features/[feature]/types/` (not co-located)
- Hooks go in `/features/[feature]/hooks/` (not co-located)
- Follow the feature-based architecture defined in claude.md

````

---

### 6. Separate Presentation from Logic
**Keep UI components clean by extracting business logic.**
```tsx
// ❌ Mixed concerns
'use client'
export function ProductCard({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(r => r.json())
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [productId])

  if (loading) return <div>Loading...</div>

  return <div>{product.name}</div>
}

// ✅ GOOD: Separated concerns with React Query (DineLocal pattern)
// features/products/api/getProduct.ts
import { apiClient } from '@/api/client'
import type { Product } from '../types'

export async function getProduct(productId: string): Promise<Product> {
  return apiClient.get<Product>(`/products/${productId}`)
}

// features/products/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '../api/getProduct'

export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['products', productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  })
}

// features/products/components/ProductCard.tsx
'use client'
import { useProduct } from '../hooks/useProduct'
import { Card } from '@/components/ui/card'

export function ProductCard({ productId }: { productId: string }) {
  const { data: product, isLoading, error } = useProduct(productId)

  if (isLoading) return <ProductCardSkeleton />
  if (error) return <ErrorMessage error={error} />
  if (!product) return null

  return (
    <Card>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span className="text-muted-foreground">${product.price}</span>
    </Card>
  )
}
````

---

### 7. Loading and Error States

**Always handle loading, error, and empty states.**

```tsx
// ❌ Missing states
export async function ProductList() {
  const products = await getProducts()
  return (
    <div>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

// ✅ Complete states
export async function ProductList() {
  const products = await getProducts()

  if (products.length === 0) {
    return <EmptyState message="No products found" />
  }

  return (
    <div className="grid gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

// With Suspense boundary (in parent)
<Suspense fallback={<ProductListSkeleton />}>
  <ProductList />
</Suspense>

// With Error boundary
<ErrorBoundary fallback={<ErrorState />}>
  <ProductList />
</ErrorBoundary>
```

---

### 8. Prop Validation & Defaults

**Validate props and provide sensible defaults.**

```tsx
// ❌ No validation or defaults
interface ButtonProps {
  variant: string
  size: string
  onClick: () => void
  children: React.ReactNode
}

// ✅ Type-safe with defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

---

### 8.5. Shadcn/UI Component Integration with Radix UI

**For DineLocal: Use Shadcn/UI components built on Radix UI primitives with WAI-ARIA patterns.**

**Key points:**

- Shadcn/UI components use **Radix UI** primitives underneath
- Radix UI implements **WAI-ARIA design patterns** automatically
- Components are **WCAG 2.2 AA compliant** out of the box
- Includes keyboard navigation, focus management, and screen reader support

```tsx
// ❌ Don't modify raw Shadcn components
// components/ui/button.tsx
export function Button() {
  // NEVER edit this file after installation from shadcn/ui
  // Treat as third-party dependency
}

// ✅ Create customized shared components
// components/shared/PrimaryButton.tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean
}

export function PrimaryButton({
  isLoading,
  children,
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      className={cn('bg-primary hover:bg-primary/90', className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="mr-2 animate-spin">⏳</span>
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

// ✅ Use Shadcn Dialog (built on Radix Dialog with ARIA)
// components/shared/ConfirmDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function ConfirmDialog({ title, description, onConfirm }: ConfirmDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        {/* Radix automatically handles:
            - Focus trapping
            - Escape key to close
            - Click outside to close
            - aria-labelledby, aria-describedby
            - Focus return on close */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ✅ Use in feature components
// features/bookings/components/BookingCard.tsx
import { PrimaryButton } from '@/components/shared'

export function BookingCard({ booking }: BookingCardProps) {
  const { mutate: cancelBooking, isPending } = useCancelBooking()

  return (
    <div className="card">
      <h3>{booking.venueName}</h3>
      <PrimaryButton isLoading={isPending} onClick={() => cancelBooking(booking.id)}>
        Cancel Booking
      </PrimaryButton>
    </div>
  )
}
```

**Shadcn/UI components with built-in Radix accessibility:**

- Dialog, AlertDialog - Focus trap, escape handling, ARIA labels
- DropdownMenu, Select - Keyboard navigation, typeahead search
- Popover, Tooltip - Hover/focus behavior, ARIA descriptions
- Tabs - Arrow key navigation, role="tablist"
- Accordion - Keyboard expansion, aria-expanded
- RadioGroup, Checkbox - Form semantics, keyboard focus

---

## Data Fetching Patterns

### 9. Fetch Data at the Highest Level Possible

**Fetch once at the page level, pass down as props.**

```tsx
// ✅ Fetch in page/layout (Server Component)
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const relatedProducts = await getRelatedProducts(params.id)

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  )
}

// ❌ Don't fetch in multiple child components
export function ProductDetail({ productId }: { productId: string }) {
  const product = await getProduct(productId) // Redundant fetch
  // ...
}
```

---

### 9.5. Use React Query for NestJS Backend Communication

**For DineLocal: All data fetching from NestJS backend should use React Query.**

```tsx
// ✅ GOOD: Create API client function
// features/venues/api/getVenues.ts
import { apiClient } from '@/api/client'
import type { Venue } from '../types'

export async function getVenues(): Promise<Venue[]> {
  return apiClient.get<Venue[]>('/venues')
}

// ✅ GOOD: React Query hook for reads
// features/venues/hooks/useVenues.ts
import { useQuery } from '@tanstack/react-query'
import { getVenues } from '../api/getVenues'

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
    staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
  })
}

// ✅ GOOD: React Query hook for mutations
// features/bookings/hooks/useCreateBooking.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBooking } from '../api/createBooking'

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })
}

// ✅ GOOD: Using in component
// features/bookings/components/BookingForm.tsx
;('use client')
import { useCreateBooking } from '../hooks/useCreateBooking'
import { Button } from '@/components/shared'
import { toast } from 'sonner'

export function BookingForm() {
  const { mutate: createBooking, isPending } = useCreateBooking()

  const handleSubmit = (data: BookingFormData) => {
    createBooking(data, {
      onSuccess: () => toast.success('Booking created!'),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Booking'}
      </Button>
    </form>
  )
}
```

**When to use Server Components vs React Query:**

- **Server Components**: For initial page loads and static data
- **React Query (Client Components)**: For dynamic data, mutations, caching, optimistic updates, real-time data

---

### 10. Use React Query for Backend Mutations

**For DineLocal: Handle form submissions and mutations via React Query to NestJS backend.**

```tsx
// ❌ Don't use Server Actions for DineLocal (we use separate NestJS backend)
'use server'
export async function createProduct(formData: FormData) {
  // This bypasses the NestJS backend - DON'T DO THIS
}

// ✅ Create API client function
// features/products/api/createProduct.ts
import { apiClient } from '@/api/client'
import type { CreateProductDto, Product } from '../types'

export async function createProduct(data: CreateProductDto): Promise<Product> {
  return apiClient.post<Product>('/products', data)
}

// ✅ Create React Query mutation hook
// features/products/hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../api/createProduct'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// ✅ Use in form component with React Hook Form + Zod
// features/products/components/ProductForm.tsx
;('use client')
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from '../schemas/product.schema'
import { useCreateProduct } from '../hooks/useCreateProduct'
import { Button } from '@/components/shared'
import { toast } from 'sonner'

export function ProductForm() {
  const { mutate: create, isPending } = useCreateProduct()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data) => {
    create(data, {
      onSuccess: () => toast.success('Product created!'),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('price')} type="number" />
      {errors.price && <span>{errors.price.message}</span>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  )
}
```

**Note**: Server Actions are useful for applications with Next.js API routes, but DineLocal uses a separate NestJS backend at `http://localhost:3001`.

---

## Performance Optimization

### 11. Minimize Client-Side JavaScript

**Keep bundle size small by maximizing Server Components.**

```tsx
// ✅ Split client/server boundaries strategically
// app/products/page.tsx (Server Component)
export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <ProductList products={products} /> {/* Server */}
      <ProductFilters /> {/* Client - only this needs 'use client' */}
    </div>
  )
}

// components/ProductFilters.tsx (Client Component)
;('use client')
export function ProductFilters() {
  const [filters, setFilters] = useState({})
  // Interactive filtering logic
}
```

---

### 12. Optimize Images and Assets

**Always use Next.js Image component with proper sizing.**

```tsx
// ❌ Regular img tag
;<img src="/product.jpg" alt="Product" />

// ✅ Optimized Next.js Image
import Image from 'next/image'

;<Image
  src="/product.jpg"
  alt="Product"
  width={600}
  height={400}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL={product.blurHash}
/>
```

---

### 13. Implement Proper Caching with React Query

**For DineLocal: Use React Query's caching strategies for backend data.**

```tsx
// Configure query cache times based on data freshness needs

// ✅ Medium freshness - venues data (5 minutes)
export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: getVenues,
    staleTime: 5 * 60 * 1000, // Data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  })
}

// ✅ High freshness - real-time data (always fetch)
export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'current'],
    queryFn: getCurrentUser,
    staleTime: 0, // Always refetch on mount
    gcTime: 5 * 60 * 1000, // Short cache time
  })
}

// ✅ Low freshness - static/rarely changing data
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity, // Never consider stale
    gcTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  })
}

// ✅ Conditional fetching
export function useBooking(bookingId?: string) {
  return useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId!),
    enabled: !!bookingId, // Only fetch when ID is available
  })
}

// ✅ Dependent queries
export function useUserBookings(userId: string) {
  // First fetch user
  const { data: user } = useUser(userId)

  // Then fetch bookings (only when user is loaded)
  return useQuery({
    queryKey: ['bookings', 'user', userId],
    queryFn: () => getUserBookings(userId),
    enabled: !!user, // Only fetch when user exists
  })
}
```

**React Query Cache Guidelines:**

- `staleTime`: How long data is considered fresh
- `gcTime` (formerly `cacheTime`): How long unused data stays in cache
- User-specific data: Short stale time (0-1 min)
- Public data: Medium stale time (5-10 min)
- Reference data: Long stale time (Infinity)

---

## Accessibility

### 14. Semantic HTML and ARIA (WCAG 2.2 AA Compliance)

**DineLocal follows WCAG 2.2 AA standards (updated 2024). Shadcn/UI components built on Radix UI provide accessibility by default.**

**WCAG 2.2 AA Requirements:**

- **Color contrast**: 4.5:1 for normal text, 3:1 for large text
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **Focus indicators**: Visible focus states (2px thick, 3:1 contrast - WCAG 2.4.13)
- **Touch targets**: Minimum 24×24px (WCAG 2.5.8) - DineLocal uses 44px+ for better UX
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Text resizing**: Support up to 200% zoom without loss of functionality
- **Focus not obscured**: Focused elements not hidden by sticky headers/footers (WCAG 2.4.11)

**Note:** See `/frontend/.claude/context/DESIGN_PRINCIPLES.md` for comprehensive WCAG 2.2 implementation patterns including the 9 new success criteria added in October 2023.

**Shadcn/UI Accessibility Benefits:**

- Radix UI primitives implement WAI-ARIA design patterns automatically
- Components include proper roles, states, and keyboard interactions
- Focus management handled automatically (dialogs, dropdowns, etc.)

```tsx
// ❌ Non-semantic, inaccessible
<div onClick={handleClick}>Click me</div>

// ✅ Semantic with proper attributes
<button
  onClick={handleClick}
  aria-label="Add to cart"
  disabled={isLoading}
>
  {isLoading ? 'Adding...' : 'Add to cart'}
</button>

// ✅ Semantic structure
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ✅ Accessible form with Shadcn/UI (Radix primitives)
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

<div>
  <Label htmlFor="email">Email address</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <span id="email-error" role="alert" className="text-destructive">
      {errors.email.message}
    </span>
  )}
</div>

// ✅ Color contrast with OKLCH variables
<button className="
  bg-primary text-primary-foreground  /* WCAG AA compliant contrast */
  hover:bg-primary/90
  focus-visible:ring-2 focus-visible:ring-ring  /* Clear focus indicator */
">
  Submit
</button>
```

**Accessibility Checklist:**

- [ ] Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Provide ARIA labels for icon-only buttons
- [ ] Ensure color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- [ ] Add focus indicators (Shadcn/UI provides these)
- [ ] Use Shadcn/UI components for complex interactions (dialogs, dropdowns)
- [ ] Test with screen reader (VoiceOver, NVDA, JAWS)

---

### 15. Keyboard Navigation

**Ensure all interactive elements are keyboard accessible.**

```tsx
'use client'

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    // Trap focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      {children}
    </div>
  )
}
```

---

## Error Handling

### 16. Graceful Error Boundaries

**Implement error.tsx for error handling in route segments.**

```tsx
// app/products/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

---

### 17. Validate User Input

**Always validate on both client and server.**

**For DineLocal: Client-side validation with React Hook Form + Zod, Server-side validation in NestJS backend**

```tsx
// ✅ Client-side validation (Frontend)
// features/products/schemas/product.schema.ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
})

export type ProductFormData = z.infer<typeof productSchema>

// features/products/components/ProductForm.tsx
;('use client')
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductFormData } from '../schemas/product.schema'
import { useCreateProduct } from '../hooks/useCreateProduct'

export function ProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductFormData) => {
    createProduct(data, {
      onSuccess: () => toast.success('Product created!'),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span className="text-destructive">{errors.name.message}</span>}

      <input {...register('price', { valueAsNumber: true })} type="number" />
      {errors.price && <span className="text-destructive">{errors.price.message}</span>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  )
}
```

**Server-side validation (NestJS Backend):**

```typescript
// backend/src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  @IsOptional()
  description?: string
}

// backend/src/products/products.controller.ts
@Post()
async create(@Body() createProductDto: CreateProductDto) {
  // NestJS automatically validates using class-validator
  return this.productsService.create(createProductDto)
}
```

**Note**: Frontend validates for UX, Backend validates for security. Never trust client-side validation alone!

---

## Testing Considerations

### 18. Write Testable Components

**Structure components to be easily testable.**

```tsx
// ✅ Testable: Pure function, clear inputs/outputs
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

// ✅ Testable: Props-based component
export function PriceDisplay({ price, currency }: PriceDisplayProps) {
  return <span>{formatPrice(price, currency)}</span>
}

// PriceDisplay.test.tsx
describe('PriceDisplay', () => {
  it('formats price correctly', () => {
    render(<PriceDisplay price={99.99} currency="USD" />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
```

---

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

## TypeScript Coding Standards

### Enable Strict Mode

**Always use TypeScript strict mode:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true, // Enables all strict type checking options
    "noUncheckedIndexedAccess": true, // Prevent undefined array access
    "noImplicitReturns": true, // Function must return explicitly
    "noFallthroughCasesInSwitch": true // Switch must have breaks
  }
}
```

---

### Explicit Typing

**Always provide explicit types for functions and complex data:**

```tsx
// ✅ CORRECT: Explicit types
interface User {
  id: string
  name: string
  email: string
  role: 'host' | 'guest' | 'admin'
}

function getUserById(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json())
}

// ✅ CORRECT: Generic types
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

// ❌ INCORRECT: Implicit any
function getUser(id) {
  // id is 'any'
  return fetch(`/api/users/${id}`).then((res) => res.json()) // returns 'any'
}

// ❌ INCORRECT: Using 'any'
function processData(data: any): any {
  // Lost all type safety!
}
```

---

### Avoid 'any' - Use Proper Types

**Replace 'any' with specific types:**

```tsx
// ❌ BAD: Using 'any'
function handleResponse(response: any) {
  return response.data
}

// ✅ GOOD: Use 'unknown' for truly unknown data
function handleResponse(response: unknown) {
  if (isValidResponse(response)) {
    return response.data
  }
  throw new Error('Invalid response')
}

function isValidResponse(response: unknown): response is { data: unknown } {
  return typeof response === 'object' && response !== null && 'data' in response
}

// ✅ GOOD: Use generics for flexible but type-safe code
function apiRequest<T>(endpoint: string): Promise<T> {
  return fetch(endpoint).then((res) => res.json())
}

// Usage with specific type
const user = await apiRequest<User>('/api/users/123')
```

---

### Interface vs Type

**Prefer interfaces for object shapes, types for unions/intersections:**

```tsx
// ✅ CORRECT: Interface for object shapes
interface Experience {
  id: string
  title: string
  hostId: string
  price: number
}

// ✅ CORRECT: Extend interfaces
interface VerifiedExperience extends Experience {
  verificationBadge: string
  verifiedAt: Date
}

// ✅ CORRECT: Type for unions and complex types
type ExperienceStatus = 'draft' | 'published' | 'archived'

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

// ✅ CORRECT: Type for intersections
type WithTimestamps = {
  createdAt: Date
  updatedAt: Date
}

type Experience = BaseExperience & WithTimestamps
```

---

### Type Guards

**Create type guards for runtime type checking:**

```tsx
// ✅ CORRECT: Type guard function
function isExperience(value: unknown): value is Experience {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'price' in value &&
    typeof (value as Experience).id === 'string' &&
    typeof (value as Experience).title === 'string' &&
    typeof (value as Experience).price === 'number'
  )
}

// Usage
function processData(data: unknown) {
  if (isExperience(data)) {
    // TypeScript knows 'data' is Experience here
    console.log(data.title)
  }
}
```

---

### Utility Types

**Leverage TypeScript utility types:**

```tsx
interface Experience {
  id: string
  title: string
  description: string
  price: number
  hostId: string
}

// ✅ Partial: Make all properties optional
type PartialExperience = Partial<Experience>
// { id?: string; title?: string; ... }

// ✅ Required: Make all properties required
type RequiredExperience = Required<Experience>

// ✅ Pick: Select specific properties
type ExperiencePreview = Pick<Experience, 'id' | 'title' | 'price'>
// { id: string; title: string; price: number }

// ✅ Omit: Exclude specific properties
type ExperienceWithoutHost = Omit<Experience, 'hostId'>
// { id: string; title: string; description: string; price: number }

// ✅ Record: Create object type with keys
type ExperiencesByCategory = Record<string, Experience[]>
// { [category: string]: Experience[] }
```

---

## Component Creation Checklist

### Before Creating a Component

- [ ] **Check if it already exists** - Search `/components/shared` and `/components/ui`
- [ ] **Determine scope** - Feature-specific or shared?
- [ ] **Choose location** - `/features/[feature]/components` or `/components/shared`
- [ ] **Decide Server vs Client** - Does it need interactivity?
- [ ] **Plan props interface** - What data does it need?

### During Development

**1. Component Structure:**

- [ ] Named export for feature components, default for pages
- [ ] Props interface defined with TypeScript
- [ ] Single responsibility (does ONE thing well)
- [ ] Compound components for complex UI (e.g., Card, CardHeader, CardBody)

**2. TypeScript:**

- [ ] Explicit types for all props
- [ ] No `any` types used
- [ ] Return type specified for functions
- [ ] Generic types where appropriate

**3. Styling:**

- [ ] Uses Tailwind CSS (no inline styles)
- [ ] Uses design system components (`<Box>`, `<Flex>`, `<Heading>`)
- [ ] Uses `cn()` utility for conditional classes
- [ ] Responsive modifiers (`md:`, `lg:`)

**4. Accessibility:**

- [ ] Semantic HTML elements (`<button>`, `<nav>`, `<main>`)
- [ ] ARIA labels for icon-only buttons
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators visible (2px ring)
- [ ] Touch targets 48px+ height

**5. Performance:**

- [ ] Server Component by default (unless needs client features)
- [ ] Images use Next.js `<Image>` component
- [ ] Heavy components use `React.memo` if re-rendering often
- [ ] Expensive calculations use `useMemo`

**6. State Management:**

- [ ] Local state uses `useState`
- [ ] Side effects use `useEffect` with proper dependencies
- [ ] Data fetching uses React Query (`useQuery`, `useMutation`)
- [ ] Form state uses React Hook Form + Zod

**7. Error Handling:**

- [ ] Loading states handled (`isPending`, `isLoading`)
- [ ] Error states handled (show error message, retry button)
- [ ] Empty states handled (show helpful message)
- [ ] Wrapped in `<ErrorBoundary>` if can throw errors

### Before Committing

**Code Quality:**

- [ ] Component name matches file name (PascalCase)
- [ ] Imports organized by category
- [ ] No console.logs or commented code
- [ ] No TypeScript errors or warnings
- [ ] ESLint passes (`pnpm run lint`)

**Testing:**

- [ ] Manually tested in browser
- [ ] Tested at 375px, 768px, 1280px widths
- [ ] Tested with keyboard navigation
- [ ] Tested loading/error states

**Documentation:**

- [ ] JSDoc comment for complex components
- [ ] Props interface documented
- [ ] Usage example (if shared component)

---

## Code Quality Checklist

Before committing, ensure your component:

**TypeScript:**

- [ ] Uses TypeScript with explicit types (no `any`)
- [ ] All props have interface/type definition
- [ ] Functions have return types specified
- [ ] Uses utility types where appropriate (Partial, Pick, Omit)

**React Patterns:**

- [ ] Is a Server Component unless it needs client interactivity
- [ ] Uses functional components with hooks (not class components)
- [ ] Hooks called at top level (not in conditionals or loops)
- [ ] Custom hooks named with `use` prefix
- [ ] Uses composition over inheritance

**Performance:**

- [ ] Server Component for static content
- [ ] React.memo for expensive re-renders
- [ ] useMemo for expensive calculations
- [ ] useCallback for memoized callbacks
- [ ] Images optimized (Next.js Image, WebP, lazy load)

**State & Data:**

- [ ] React Query for API data fetching
- [ ] React Hook Form + Zod for forms
- [ ] Local state for UI-only state
- [ ] Context/Zustand for global state

**UI & Accessibility:**

- [ ] Handles loading, error, and empty states
- [ ] Follows naming conventions (PascalCase for components)
- [ ] Has proper prop validation
- [ ] Is accessible (semantic HTML, ARIA labels, keyboard nav)
- [ ] Touch targets 48px+ height
- [ ] Focus indicators visible (2px ring, 3:1 contrast)

**Code Quality:**

- [ ] Has single responsibility
- [ ] Follows project structure conventions
- [ ] No console.logs or commented code
- [ ] ESLint passes
- [ ] Is properly tested (if applicable)

**Styling:**

- [ ] Uses Tailwind CSS with design tokens
- [ ] Uses design system components (`<Box>`, `<Flex>`, `<Heading>`)
- [ ] Responsive (mobile-first approach)
- [ ] Consistent spacing (4px multiples)

---

## Quick Reference

**DineLocal Tech Stack Quick Reference:**

| Scenario               | Approach                                           |
| ---------------------- | -------------------------------------------------- |
| Need interactivity     | Use 'use client'                                   |
| Fetch data from NestJS | React Query (useQuery) in Client Component         |
| Mutations to NestJS    | React Query (useMutation)                          |
| Initial page data      | Server Component with async/await (optional)       |
| Form management        | React Hook Form + Zod validation                   |
| Form submission        | React Query useMutation + onSubmit handler         |
| Global state           | React Context or Zustand                           |
| Styling                | Tailwind CSS with OKLCH variables                  |
| UI components          | Shadcn/UI (raw in `/ui`) + customized in `/shared` |
| Component variants     | Class Variance Authority (CVA)                     |
| Images                 | Next.js Image component                            |
| Icons                  | Lucide React                                       |
| Error handling         | error.tsx boundaries + React Query error states    |
| Loading states         | loading.tsx, Suspense, or React Query isPending    |
| Validation             | Zod schema (client + server)                       |
| Toast notifications    | Sonner                                             |
| Date formatting        | Date-Fns                                           |
| Drawer component       | Vaul                                               |
| Command menu           | Cmdk                                               |
| Accessibility          | WCAG 2.2 AA (Shadcn/Radix provides baseline)       |

**For detailed UX/UI patterns, see:**

- 📖 `/frontend/.claude/context/DESIGN_PRINCIPLES.md` - Comprehensive design guide with WCAG 2.2, marketplace patterns, loading states, and design checklists

---

## Advanced Patterns

**For complex implementation patterns, see:**

📖 **[ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md)** - Detailed guides for:

- Error Handling Patterns (Expected errors, error boundaries, React Query errors, API error handling)
- File Upload Patterns (React Dropzone, image compression, file validation)
- Payment Integration (Stripe Checkout, webhooks, security best practices)
- Real-Time Features (WebSockets vs SSE, implementation examples)
- Transactional Email Patterns (Resend + React Email, email templates)
- State Management Patterns (Zustand vs React Context, decision trees)
- Advanced API Patterns (Retry strategies, polling, dependent queries, optimistic updates)

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)

**Questions or Updates?**
Refer to the documentation hierarchy in [CLAUDE.md](/frontend/.claude/CLAUDE.md) for guidance on where to find specific information.
