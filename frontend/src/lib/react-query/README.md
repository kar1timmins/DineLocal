# React Query Setup & Usage

This directory contains the React Query configuration for data fetching from the NestJS backend.

## Files

- **`QueryProvider.tsx`** - Client-side QueryClient provider (wrap app in layout.tsx)
- **`queryClient.ts`** - Server-side QueryClient factory and query key utilities

## Usage Examples

### 1. Basic Data Fetching (Client Component)

```tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'

interface Venue {
  id: string
  name: string
  description: string
}

export function VenuesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['venues'],
    queryFn: () => apiClient.get<Venue[]>('/venues'),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data?.map((venue) => (
        <li key={venue.id}>{venue.name}</li>
      ))}
    </ul>
  )
}
```

### 2. Data Mutation (Create/Update/Delete)

```tsx
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { toast } from 'sonner'

interface CreateVenueDto {
  name: string
  description: string
}

export function CreateVenueForm() {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateVenueDto) => apiClient.post('/venues', data),

    onSuccess: () => {
      // Invalidate and refetch venues list
      queryClient.invalidateQueries({ queryKey: ['venues'] })
      toast.success('Venue created!')
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ name: 'New Venue', description: 'Description' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Venue'}
      </button>
    </form>
  )
}
```

### 3. Feature-Specific Hook Pattern

Create hooks in `/features/[feature]/hooks/`:

```tsx
// src/features/venues/hooks/useVenues.ts
import { useQuery } from '@tanstack/react-query'
import { getVenues } from '../api/getVenues'

export function useVenues(filters?: VenueFilters) {
  return useQuery({
    queryKey: ['venues', 'list', filters],
    queryFn: () => getVenues(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
```

```tsx
// src/features/venues/api/getVenues.ts
import { apiClient } from '@/api/client'
import type { Venue, VenueFilters } from '../types'

export async function getVenues(filters?: VenueFilters): Promise<Venue[]> {
  return apiClient.get('/venues', { params: filters })
}
```

### 4. Query Keys Factory (Recommended)

Organize query keys in `queryClient.ts`:

```tsx
export const queryKeys = {
  venues: {
    all: ['venues'] as const,
    lists: () => [...queryKeys.venues.all, 'list'] as const,
    list: (filters: VenueFilters) => [...queryKeys.venues.lists(), filters] as const,
    details: () => [...queryKeys.venues.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.venues.details(), id] as const,
  },
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (filters: BookingFilters) => [...queryKeys.bookings.lists(), filters] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
  },
}
```

Then use in hooks:

```tsx
import { queryKeys } from '@/lib/react-query/queryClient'

export function useVenue(id: string) {
  return useQuery({
    queryKey: queryKeys.venues.detail(id),
    queryFn: () => getVenue(id),
  })
}
```

### 5. Server-Side Prefetching (Server Components)

```tsx
// app/venues/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { VenuesList } from './VenuesList'

export default async function VenuesPage() {
  const queryClient = new QueryClient()

  // Prefetch data on server
  await queryClient.prefetchQuery({
    queryKey: ['venues'],
    queryFn: () => fetch('http://localhost:3001/venues').then((res) => res.json()),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VenuesList />
    </HydrationBoundary>
  )
}
```

## Configuration

### Query Defaults (Applied Globally)

- **staleTime**: 5 minutes (data considered fresh)
- **gcTime**: 10 minutes (cache garbage collection)
- **refetchOnWindowFocus**: true
- **refetchOnReconnect**: true
- **retry**: 3 attempts with exponential backoff

### Devtools

React Query Devtools are enabled in development mode. Access via the floating icon in the bottom-right corner.

## Best Practices

1. **Use query keys factory** for consistent keys across the app
2. **Create feature-specific hooks** in `/features/[feature]/hooks/`
3. **Invalidate queries** after mutations to refetch fresh data
4. **Use optimistic updates** for better UX (see ADVANCED_PATTERNS.md)
5. **Prefetch on server** for critical data (improves initial page load)
6. **Handle loading and error states** appropriately

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Next.js Integration](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)
- [ADVANCED_PATTERNS.md](/.claude/context/ADVANCED_PATTERNS.md) - Advanced patterns and examples
