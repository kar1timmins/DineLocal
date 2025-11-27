## CSRF (Cross-Site Request Forgery) Protection

### What is CSRF?

Cross-Site Request Forgery tricks a user's browser into making unwanted requests to a website where they're authenticated. Example:

1. User logs into DineLocal (gets session cookie)
2. User visits malicious site `evil.com`
3. `evil.com` has hidden form: `<form action="https://dinelocal.com/api/bookings" method="POST">`
4. Form auto-submits, browser sends DineLocal cookies
5. Malicious booking is created without user's knowledge

---

### Next.js 15 Built-in Protection

**Good News:** Server Actions have automatic CSRF protection.

**How it Works:**

1. **POST-only:** Server Actions only accept POST requests
2. **Origin Check:** Next.js compares `Origin` header to `Host` header (or `X-Forwarded-Host`)
3. **Same-Site Cookies:** Modern browsers default to `SameSite=Lax` for cookies

```tsx
// ✅ SAFE - Server Actions are automatically protected
'use server'

export async function createBooking(formData: FormData) {
  // Next.js validates:
  // 1. Request is POST
  // 2. Origin header matches Host header
  // 3. CSRF token (internal)

  const venueId = formData.get('venueId')
  // ... create booking
}
```

---

### Custom Route Handlers - Manual CSRF Protection

For custom API routes, you need to implement CSRF protection manually.

**Installation:**

```bash
pnpm add @edge-csrf/nextjs
```

**Setup:**

```typescript
// src/lib/csrf.ts
import { createCsrfProtect } from '@edge-csrf/nextjs'

export const csrfProtect = createCsrfProtect({
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax',
    httpOnly: true,
    name: '__Host-csrf-token', // __Host- prefix enforces secure cookies
  },
})
```

**Apply to Route Handlers:**

```typescript
// src/app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { csrfProtect } from '@/lib/csrf'

export async function GET(request: NextRequest) {
  // Generate CSRF token for forms
  const token = await csrfProtect.generateToken(request)

  return NextResponse.json({ csrfToken: token })
}

export async function POST(request: NextRequest) {
  // Validate CSRF token
  const isValid = await csrfProtect.validateToken(request)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
  }

  // Process the request
  const body = await request.json()
  // ... create booking

  return NextResponse.json({ success: true })
}
```

**Client-Side Usage:**

```tsx
'use client'

import { useState, useEffect } from 'react'

export function BookingForm() {
  const [csrfToken, setCsrfToken] = useState('')

  // Fetch CSRF token on mount
  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Include token in header
      },
      body: JSON.stringify({ venueId: 123 }),
    })

    if (!response.ok) {
      // Handle CSRF error
    }
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>
}
```

---

### SameSite Cookie Configuration

**Modern Defense:** Browsers now default to `SameSite=Lax` for cookies.

**Cookie Levels:**

- **Strict:** Cookie never sent on cross-site requests (even links)
- **Lax:** Cookie sent on top-level GET requests (link clicks), not POST
- **None:** Cookie always sent (requires `Secure` flag)

```typescript
// Backend (NestJS) - Session Cookie Configuration
{
  httpOnly: true,        // Prevents JavaScript access
  secure: true,          // HTTPS only
  sameSite: 'lax',       // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/'
}
```

---

### Double-Submit Cookie Pattern (Alternative)

For stateless CSRF protection without server-side storage:

```typescript
// Generate CSRF token (cryptographically random)
import { randomBytes } from 'crypto'

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

// Set token in cookie and return to client
export function setCSRFCookie(response: NextResponse, token: string) {
  response.cookies.set('csrf-token', token, {
    httpOnly: false, // Client needs to read this
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
  })
}

// Validate: compare cookie value with header value
export function validateDoubleSubmit(request: NextRequest): boolean {
  const cookieToken = request.cookies.get('csrf-token')?.value
  const headerToken = request.headers.get('X-CSRF-Token')

  return cookieToken === headerToken && cookieToken !== undefined
}
```

---

### CSRF Prevention Checklist

- [ ] Use Server Actions (automatic CSRF protection)
- [ ] For custom API routes, implement CSRF tokens (@edge-csrf/nextjs)
- [ ] Set SameSite=Lax (minimum) or Strict for session cookies
- [ ] Always use HTTPS in production (`Secure` flag on cookies)
- [ ] Validate Origin/Referer headers for state-changing operations
- [ ] Use \_\_Host- prefix for cookie names (enforces secure cookies)
- [ ] Never expose CSRF tokens in URL parameters (use headers or body)
- [ ] Implement rate limiting on sensitive endpoints

---
