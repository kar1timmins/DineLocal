import { QueryClient } from '@tanstack/react-query'

/**
 * Create a new QueryClient for server-side usage
 *
 * This is used for prefetching data in Server Components.
 * Each request gets a fresh QueryClient instance.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Server-side queries don't refetch automatically
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })
}

/**
 * Type-safe query key factory
 *
 * Use this to create consistent query keys across the application
 *
 * @example
 * ```ts
 * const venuesKeys = {
 *   all: ['venues'] as const,
 *   lists: () => [...venuesKeys.all, 'list'] as const,
 *   list: (filters: string) => [...venuesKeys.lists(), { filters }] as const,
 *   details: () => [...venuesKeys.all, 'detail'] as const,
 *   detail: (id: string) => [...venuesKeys.details(), id] as const,
 * }
 * ```
 */
export const queryKeys = {
  // Add your query key factories here
  // Example:
  // venues: {
  //   all: ['venues'] as const,
  //   lists: () => [...queryKeys.venues.all, 'list'] as const,
  //   list: (filters: Record<string, unknown>) => [...queryKeys.venues.lists(), filters] as const,
  //   details: () => [...queryKeys.venues.all, 'detail'] as const,
  //   detail: (id: string) => [...queryKeys.venues.details(), id] as const,
  // },
} as const
