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

