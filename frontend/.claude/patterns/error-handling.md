## Error Handling Patterns

### Next.js 15 Error Philosophy

Next.js 15 distinguishes between two types of errors:

1. **Expected Errors** - Normal operation failures (form validation, failed API calls, not found)
   - Should be **returned as values**, not thrown
   - User-friendly messages
   - Recoverable

2. **Uncaught Exceptions** - Unexpected failures (bugs, server crashes)
   - Should be **thrown** and caught by error boundaries
   - Generic error messages to users
   - Logged for developers

---

### Expected Errors - Return Values Pattern

**✅ RECOMMENDED - Return error objects instead of throwing**

```typescript
// src/features/bookings/actions/createBooking.ts
'use server'

import { createBookingSchema } from '../schemas/booking.schema'
import { apiClient } from '@/api/client'

export async function createBooking(formData: FormData) {
  // 1. Validate input
  const rawData = {
    venueId: formData.get('venueId'),
    guestCount: Number(formData.get('guestCount')),
    date: new Date(formData.get('date') as string),
  }

  const result = createBookingSchema.safeParse(rawData)

  if (!result.success) {
    // Return validation errors (don't throw)
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // 2. Call NestJS backend
  try {
    const booking = await apiClient.post('/bookings', result.data)

    return {
      success: true as const,
      data: booking,
    }
  } catch (error) {
    // Return API errors (don't throw)
    if (error instanceof ApiError) {
      return {
        success: false as const,
        message: error.message,
      }
    }

    // Unexpected errors should be thrown
    throw error
  }
}

// Type-safe return type
export type CreateBookingResult =
  | { success: true; data: Booking }
  | { success: false; errors?: Record<string, string[]>; message?: string }
```

**Client-Side Usage:**

```tsx
'use client'

import { useActionState } from 'react' // Next.js 15
import { createBooking } from '../actions/createBooking'

export function BookingForm() {
  const [state, formAction, isPending] = useActionState(createBooking, { success: false })

  return (
    <form action={formAction}>
      {/* Form fields */}

      {!state.success && state.message && <div className="text-error">{state.message}</div>}

      {!state.success && state.errors && (
        <div className="text-error">
          {Object.entries(state.errors).map(([field, messages]) => (
            <div key={field}>{messages[0]}</div>
          ))}
        </div>
      )}

      {state.success && <div className="text-success">Booking created successfully!</div>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Booking'}
      </Button>
    </form>
  )
}
```

---

### Uncaught Exceptions - Error Boundaries

**Use error boundaries for unexpected failures:**

```tsx
// src/components/shared/error-boundary.tsx
'use client'

import { Component, type ReactNode } from 'react'
import { Button } from '@/components/shared/button'
import { Flex, Box } from '@/components/shared/container'
import { Heading, Paragraph } from '@/components/shared/typography'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to error tracking service (Sentry, etc.)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!, this.reset)
      }

      return <ErrorFallback error={this.state.error!} reset={this.reset} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="min-h-[400px] p-6"
    >
      <Box className="max-w-md text-center">
        <Heading as="h2" className="mb-2">
          Something went wrong
        </Heading>
        <Paragraph textColor="muted" className="mb-4">
          We encountered an unexpected error. Please try again.
        </Paragraph>

        {process.env.NODE_ENV === 'development' && (
          <Box className="bg-destructive/10 mb-4 rounded-lg p-4 text-left">
            <Paragraph className="text-destructive font-mono text-sm">{error.message}</Paragraph>
          </Box>
        )}

        <Button onClick={reset}>Try Again</Button>
      </Box>
    </Flex>
  )
}
```

**Usage in Layouts:**

```tsx
// src/app/layout.tsx
import { ErrorBoundary } from '@/components/shared/error-boundary'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
```

**Feature-Specific Error Boundaries:**

```tsx
// src/features/bookings/components/BookingsList.tsx
import { ErrorBoundary } from '@/components/shared/error-boundary'

export function BookingsList() {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="p-6 text-center">
          <h3>Failed to load bookings</h3>
          <p>Please refresh the page or try again later.</p>
          <button onClick={reset}>Retry</button>
        </div>
      )}
    >
      <BookingsContent />
    </ErrorBoundary>
  )
}
```

---

### React Query Error Handling

**Global Error Handler:**

```typescript
// src/lib/react-query.ts
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { customToast } from '@/components/shared/toast'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      // Global error handling for queries
      console.error('Query error:', error)
      customToast({
        variant: 'error',
        title: 'Failed to load data',
        description: 'Please try again later.',
      })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      // Global error handling for mutations
      console.error('Mutation error:', error)
    },
  }),
})
```

**Component-Level Error Handling:**

```tsx
'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { getBookings, deleteBooking } from '../api/bookings'

export function BookingsList() {
  // Query with error handling
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    retry: 3,
  })

  // Mutation with error handling
  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onError: (error) => {
      customToast({
        variant: 'error',
        title: 'Failed to delete booking',
        description: error.message,
      })
    },
    onSuccess: () => {
      customToast({
        variant: 'success',
        title: 'Booking deleted',
      })
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
    },
  })

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <div className="p-6 text-center">
        <h3>Failed to load bookings</h3>
        <p>{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div>
      {data.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onDelete={() => deleteMutation.mutate(booking.id)}
        />
      ))}
    </div>
  )
}
```

---

### API Error Handling (Centralized)

**Custom Error Classes:**

```typescript
// src/api/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public errors: Record<string, string[]>
  ) {
    super(400, message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication required') {
    super(401, message, 'AUTHENTICATION_ERROR')
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = 'Permission denied') {
    super(403, message, 'AUTHORIZATION_ERROR')
    this.name = 'AuthorizationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class RateLimitError extends ApiError {
  constructor(public retryAfter: number) {
    super(429, 'Too many requests', 'RATE_LIMIT_ERROR')
    this.name = 'RateLimitError'
  }
}

export class ServerError extends ApiError {
  constructor(message: string = 'Internal server error') {
    super(500, message, 'SERVER_ERROR')
    this.name = 'ServerError'
  }
}
```

**API Client with Error Handling:**

```typescript
// src/api/client.ts
import {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  ServerError,
} from './errors'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Send cookies
      })

      // Handle error responses
      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      // Parse JSON response
      return await response.json()
    } catch (error) {
      // Network errors, JSON parse errors, etc.
      if (error instanceof ApiError) {
        throw error
      }

      throw new ServerError('Network error or server unreachable')
    }
  },

  async handleErrorResponse(response: Response): Promise<never> {
    let errorData: any

    try {
      errorData = await response.json()
    } catch {
      errorData = { message: response.statusText }
    }

    const message = errorData.message || 'An error occurred'

    switch (response.status) {
      case 400:
        if (errorData.errors) {
          throw new ValidationError(message, errorData.errors)
        }
        throw new ApiError(400, message, 'BAD_REQUEST')

      case 401:
        throw new AuthenticationError(message)

      case 403:
        throw new AuthorizationError(message)

      case 404:
        throw new NotFoundError(errorData.resource || 'Resource')

      case 429:
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60')
        throw new RateLimitError(retryAfter)

      case 500:
      case 502:
      case 503:
        throw new ServerError(message)

      default:
        throw new ApiError(response.status, message)
    }
  },

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  },

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
}
```

**Using API Client in Features:**

```typescript
// src/features/bookings/api/getBookings.ts
import { apiClient } from '@/api/client'
import { AuthenticationError, NotFoundError } from '@/api/errors'
import type { Booking } from '../types'

export async function getBookings(): Promise<Booking[]> {
  try {
    return await apiClient.get<Booking[]>('/bookings')
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // Redirect to login
      window.location.href = '/login'
      throw error
    }

    if (error instanceof NotFoundError) {
      // Return empty array if no bookings found
      return []
    }

    // Re-throw other errors to be handled by React Query
    throw error
  }
}
```

---

### Higher-Order Function for Error Wrapping

**Eliminate repetitive try/catch blocks:**

```typescript
// src/lib/error-wrapper.ts
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '@/api/errors'

type RouteHandler = (request: NextRequest, context: any) => Promise<Response | NextResponse>

export function withErrorHandling(handler: RouteHandler): RouteHandler {
  return async (request, context) => {
    try {
      return await handler(request, context)
    } catch (error) {
      console.error('Route handler error:', error)

      if (error instanceof ApiError) {
        return NextResponse.json(
          { error: error.message, code: error.code },
          { status: error.statusCode }
        )
      }

      // Unexpected errors - don't expose details to client
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}

// Usage in Route Handlers
export const POST = withErrorHandling(async (request: NextRequest) => {
  const body = await request.json()
  // ... handle request
  return NextResponse.json({ success: true })
})
```

---

### Error Handling Checklist

**Expected Errors (Return Values):**

- [ ] Form validation errors returned from Server Actions
- [ ] API errors handled and returned from Server Actions
- [ ] Use `useActionState` hook for form state management
- [ ] User-friendly error messages displayed in UI
- [ ] Field-level validation errors shown next to inputs

**Uncaught Exceptions (Error Boundaries):**

- [ ] Root layout has error boundary
- [ ] Feature-specific error boundaries for isolated failures
- [ ] Custom fallback UI for better UX
- [ ] Error logged to tracking service (Sentry, etc.)
- [ ] Generic error messages shown to users

**React Query:**

- [ ] Global error handlers configured in QueryClient
- [ ] Component-level error handling for critical queries
- [ ] Retry logic configured (3 retries for queries, 0 for mutations)
- [ ] Error messages displayed with toast notifications
- [ ] Refetch on error with user-triggered retry

**API Client:**

- [ ] Custom error classes for different HTTP status codes
- [ ] Centralized error handling in API client
- [ ] Network errors caught and handled
- [ ] Authentication errors trigger redirect to login
- [ ] Rate limit errors display retry time to user
- [ ] Server errors don't expose internal details to client

**Logging:**

- [ ] All errors logged to console (development)
- [ ] Errors sent to tracking service (production)
- [ ] Include context (user ID, request ID, timestamp)
- [ ] Don't log sensitive information (passwords, tokens)

---

