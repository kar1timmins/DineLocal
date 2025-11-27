# Advanced Implementation Patterns

> Detailed implementation guides for complex features in DineLocal marketplace.

**Prerequisites:** Before using these advanced patterns, read [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) for core React/Next.js patterns and architecture.

---

## Table of Contents

1. [Error Handling Patterns](#error-handling-patterns)
2. [File Upload Patterns](#file-upload-patterns)
3. [Payment Integration (Stripe)](#payment-integration-stripe)
4. [Real-Time Features (WebSockets & SSE)](#real-time-features-websockets--sse)
5. [Transactional Email Patterns](#transactional-email-patterns)
6. [State Management Patterns](#state-management-patterns)
7. [Advanced API Patterns (React Query)](#advanced-api-patterns-react-query)

---

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

## File Upload Patterns

### Overview

DineLocal requires file uploads for:

- **Host profiles:** Profile photos
- **Venue images:** Multiple photos of dining space
- **Dish photos:** Food imagery for experiences
- **User-generated content:** Review photos

**Installation:**

```bash
pnpm add react-dropzone browser-image-compression
```

**For full implementation examples and security considerations, see:**

- React Dropzone docs: https://react-dropzone.js.org/
- Browser Image Compression: https://github.com/Donaldcwl/browser-image-compression

---

## Payment Integration (Stripe)

### Overview

DineLocal uses **Stripe** for payment processing:

- Guest pays for booking
- Platform fee deducted
- Payout to host

**Security:** Stripe handles sensitive card data (PCI SAQ-A compliance).

**Installation:**

```bash
pnpm add @stripe/stripe-js stripe
```

**For full implementation including Stripe Checkout, Webhooks, and Security Best Practices, see:**

- Stripe Docs: https://stripe.com/docs/payments/quickstart
- Stripe Next.js Integration: https://github.com/vercel/next.js/tree/canary/examples/with-stripe-typescript

---

## Real-Time Features (WebSockets & SSE)

### WebSockets vs Server-Sent Events

| Feature                | WebSockets                       | Server-Sent Events (SSE)         |
| ---------------------- | -------------------------------- | -------------------------------- |
| Communication          | Bidirectional (client ↔️ server) | Unidirectional (server → client) |
| Protocol               | WebSocket (WS/WSS)               | HTTP/HTTPS                       |
| Use Cases              | Chat, collaborative editing      | Notifications, live feeds        |
| Automatic Reconnection | Manual                           | Automatic                        |
| Complexity             | Higher                           | Lower                            |

**DineLocal Use Cases:**

- **SSE:** Booking notifications, availability updates, new reviews
- **WebSockets:** Chat between guests/hosts (if needed)

**For full implementation examples, see:**

- Server-Sent Events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
- Socket.io: https://socket.io/docs/v4/

---

## Transactional Email Patterns

### Overview

DineLocal sends transactional emails for:

- Booking confirmations
- Host approval notifications
- Booking reminders (24hr before)
- Cancellation notifications
- Payment receipts

**Stack:** Resend + React Email

**Installation:**

```bash
pnpm add resend react-email @react-email/components
```

**For full implementation including email templates and best practices, see:**

- Resend Docs: https://resend.com/docs
- React Email: https://react.email/docs/introduction

---

## State Management Patterns

### When to Choose State Solution

| Use Case                                            | Solution      | Rationale                               |
| --------------------------------------------------- | ------------- | --------------------------------------- |
| **Global app state** (user auth, theme, locale)     | Zustand       | Minimal boilerplate, no context nesting |
| **Feature-specific state** (filters, search params) | Zustand slice | Modular, easy to test                   |
| **Component-level state** (open/closed, active tab) | useState      | Simple, colocated                       |
| **Shared theme/locale** (deeply nested tree)        | React Context | Built-in, no dependencies               |
| **Server state** (API data, caching)                | React Query   | Optimized for async data                |

### Decision Tree

```
Do you need to fetch data from API?
├─ Yes → Use React Query
└─ No → Is state shared across multiple features?
    ├─ Yes → Zustand (global state)
    └─ No → Is state shared within single feature?
        ├─ Yes → Zustand slice or React Context
        └─ No → useState (component-level)
```

---

### Zustand Patterns

**When to Use:**

- Global state (user, theme, cart, notifications)
- Cross-feature state sharing
- Client-side state that doesn't come from API
- Need for middleware (persistence, devtools)

**File Location:**

- Store files: `/src/stores/`
- Naming: camelCase + `Store.ts` suffix (e.g., `authStore.ts`, `cartStore.ts`)
- Export: `useAuthStore`, `useCartStore` (camelCase with `use` prefix)

**Store Creation:**

✅ **DO:**

- Keep stores small and focused (single responsibility)
- Use TypeScript interfaces for state shape
- Separate actions from state
- Use meaningful action names (verbs)
- Export typed hooks for selectors

❌ **DON'T:**

- Create one massive store for everything
- Mix server state (API data) with client state
- Put business logic in components
- Mutate state directly (use `set()`)
- Skip TypeScript types

**Example (minimal):**

```typescript
// src/stores/authStore.ts
// ✅ Good: Focused auth store
import { create } from 'zustand'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

**For full Zustand patterns, see:**

- Zustand Docs: https://docs.pmnd.rs/zustand/getting-started/introduction

---

### React Context Patterns

**When to Use:**

- Theme or locale providers (deeply nested)
- Dependency injection (services, utilities)
- Feature flags or config
- Rare updates, many consumers

**For full React Context patterns, see:**

- React Context Docs: https://react.dev/reference/react/useContext

---

### Comparison: Zustand vs React Context

| Feature         | Zustand                             | React Context               |
| --------------- | ----------------------------------- | --------------------------- |
| **Bundle Size** | ~1KB                                | 0KB (built-in)              |
| **Boilerplate** | Minimal                             | Medium (provider + hook)    |
| **Performance** | Excellent (selective subscriptions) | Good (with memoization)     |
| **DevTools**    | Yes (middleware)                    | Via React DevTools          |
| **Persistence** | Built-in middleware                 | Manual implementation       |
| **SSR Support** | Manual setup                        | Built-in                    |
| **Best For**    | Global state, frequent updates      | Config, theme, rare updates |

---

## Advanced API Patterns (React Query)

### Retry Strategies

**Exponential Backoff:**

✅ **DO:**

- Use exponential backoff for transient errors (network, 500s)
- Set maximum retry attempts (3-5 attempts)
- Add jitter to prevent thundering herd
- Distinguish retriable errors (network) from permanent errors (400, 401)

❌ **DON'T:**

- Retry on client errors (400, 401, 403, 404)
- Retry indefinitely (set max attempts)
- Use fixed retry delays (causes traffic spikes)
- Retry on known permanent failures

**Example (minimal):**

```typescript
// ✅ Good: Smart retry logic
retry: 3,
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
```

---

### Polling Patterns

**Automatic Polling:**

✅ **DO:**

- Use `refetchInterval` for real-time data (booking status, notifications)
- Poll only when data is stale or expected to change
- Stop polling when window is hidden (`refetchIntervalInBackground: false`)
- Use WebSockets/SSE for high-frequency updates (< 5s intervals)

❌ **DON'T:**

- Poll at very short intervals (< 5 seconds, use WebSockets)
- Poll when user is inactive or tab is hidden
- Poll data that rarely changes (use cache instead)
- Forget to clean up polling on unmount

---

### Request Deduplication

React Query automatically deduplicates identical requests.

✅ **DO:**

- Share query keys across components
- Use stable query keys (avoid dynamic objects)
- Set `staleTime` based on data volatility
- Use longer stale time for static data (5-10 minutes)

❌ **DON'T:**

- Create unique query keys for same data
- Use random/timestamp in query keys
- Use default `staleTime: 0` for all queries

---

### Dependent Queries

**Sequential Queries:**

✅ **DO:**

- Use `enabled` option to wait for prerequisite data
- Check if dependency data exists before enabling
- Show proper loading states for each step
- Handle errors at each dependency level

**Example:**

```typescript
// ✅ Good: Wait for user before fetching bookings
const { data: user } = useQuery({ queryKey: ['user'], queryFn: getUser })
const { data: bookings } = useQuery({
  queryKey: ['bookings', user?.id],
  queryFn: () => getBookings(user!.id),
  enabled: !!user, // Wait for user
})
```

---

### Optimistic Updates

**Add Operations:**

✅ **DO:**

- Add new item to cache immediately (optimistic)
- Use temporary ID for optimistic item
- Rollback on error and show error message
- Replace temporary item with server response

**Delete Operations:**

✅ **DO:**

- Remove item from cache immediately
- Store removed item for rollback
- Restore item on error with toast notification
- Confirm deletion with server response

**Example (minimal):**

```typescript
// ✅ Good: Optimistic delete with rollback
const { mutate } = useMutation({
  mutationFn: deleteBooking,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['bookings'] })
    const previous = queryClient.getQueryData(['bookings'])
    queryClient.setQueryData(['bookings'], (old) => old?.filter((b) => b.id !== id))
    return { previous } // Rollback context
  },
  onError: (err, id, context) => {
    queryClient.setQueryData(['bookings'], context.previous)
    toast.error('Failed to delete booking')
  },
})
```

---

### Advanced API Checklist

- [ ] Retry logic differentiates retriable errors
- [ ] Polling intervals are appropriate for data volatility
- [ ] Query keys are stable and normalized
- [ ] Dependent queries use `enabled` option
- [ ] Optimistic updates include rollback logic
- [ ] Error states are handled and shown to users
- [ ] Loading states are shown for all async operations

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)

**Questions or Updates?**
Refer to main documentation in [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) for core patterns.
