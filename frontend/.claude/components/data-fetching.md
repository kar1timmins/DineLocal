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
