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
