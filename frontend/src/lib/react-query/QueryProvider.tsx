'use client'

import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * React Query Provider for Next.js 15 App Router
 *
 * This component wraps the application with QueryClientProvider and sets up
 * React Query with optimized defaults for data fetching from the NestJS backend.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each request (SSR-safe)
  // Using useState ensures the client is only created once per component mount
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 5 minutes
            staleTime: 1000 * 60 * 5, // 5 minutes

            // Cache data for 10 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

            // Refetch on window focus (good for realtime data)
            refetchOnWindowFocus: true,

            // Refetch on reconnect (good for offline scenarios)
            refetchOnReconnect: true,

            // Refetch on mount if data is stale
            refetchOnMount: true,

            // Retry failed requests
            retry: 3,

            // Exponential backoff for retries
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
          mutations: {
            // Retry failed mutations once
            retry: 1,

            // Don't retry on 4xx errors (client errors)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* React Query Devtools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" position="bottom" />
      )}
    </QueryClientProvider>
  )
}
