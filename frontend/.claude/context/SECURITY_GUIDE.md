# SECURITY_GUIDE.md

# DineLocal Security Best Practices

**Purpose:** Comprehensive security guidelines for protecting the DineLocal platform and its users from common web vulnerabilities.

**Scope:** Frontend (Next.js 15) and integration patterns with NestJS backend.

---

## Table of Contents

1. [Security Philosophy](#security-philosophy)
2. [XSS (Cross-Site Scripting) Prevention](#xss-cross-site-scripting-prevention)
3. [CSRF (Cross-Site Request Forgery) Protection](#csrf-cross-site-request-forgery-protection)
4. [Input Validation & Sanitization](#input-validation--sanitization)
5. [Authentication Security](#authentication-security)
6. [Content Security Policy (CSP)](#content-security-policy-csp)
7. [File Upload Security](#file-upload-security)
8. [Payment Security](#payment-security)
9. [API Security](#api-security)
10. [Security Checklist](#security-checklist)

---

## Security Philosophy

**Core Principles:**

1. **Never trust user input** - All input is potentially malicious until validated
2. **Defense in depth** - Multiple layers of security (client + server + infrastructure)
3. **Principle of least privilege** - Users/code should only have necessary permissions
4. **Fail securely** - Errors should not expose sensitive information
5. **Security by default** - Secure configurations should be the default

**DineLocal-Specific Concerns:**

- **Marketplace Trust:** Hosts and guests must feel safe sharing personal information
- **Payment Security:** Financial transactions require PCI compliance
- **User-Generated Content:** Photos, reviews, and messages must be sanitized
- **Multi-Tenant Data:** Ensure hosts can't access other hosts' data

---

## XSS (Cross-Site Scripting) Prevention

### What is XSS?

Cross-Site Scripting occurs when malicious JavaScript code is injected into your website and executes in other users' browsers. This can lead to:

- Stolen session cookies and authentication tokens
- Unauthorized actions on behalf of users
- Data theft (personal information, payment details)
- Defacement of the site

### Types of XSS Attacks

1. **Stored XSS:** Malicious script is stored in the database (e.g., in a review or venue description) and executed every time the page loads
2. **Reflected XSS:** Malicious script is in a URL parameter and reflected back to the user
3. **DOM-based XSS:** Client-side JavaScript modifies the DOM with unsafe data

---

### React's Built-in XSS Protection

**Good News:** React escapes all values rendered in JSX by default.

```tsx
// ✅ SAFE - React automatically escapes the content
export function VenueName({ name }: { name: string }) {
  return <h1>{name}</h1>
}

// Example: If name = "<script>alert('XSS')</script>"
// React renders: &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;
// Result: Displayed as text, not executed as code
```

**What React Does:**

- Converts `<` to `&lt;`
- Converts `>` to `&gt;`
- Converts `"` to `&quot;`
- Converts `'` to `&#x27;`
- Converts `&` to `&amp;`

---

### Dangerous Patterns to Avoid

#### 1. dangerouslySetInnerHTML 🚨

This prop is **explicitly named "dangerous"** for a reason. It bypasses React's protection.

```tsx
// ❌ DANGEROUS - Never use with user input
export function VenueDescription({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// ✅ SAFE - Use sanitization library if HTML is required
import DOMPurify from 'isomorphic-dompurify'

export function VenueDescription({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  })

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

#### 2. Inline Event Handlers with User Data ❌

```tsx
// ❌ VULNERABLE - User input in event handler
export function SearchButton({ query }: { query: string }) {
  return <button onClick={() => eval(query)}>Search</button>
}

// ✅ SAFE - Never use eval or similar with user input
export function SearchButton({ onSearch }: { onSearch: () => void }) {
  return <button onClick={onSearch}>Search</button>
}
```

#### 3. Dynamic Script Tags ❌

```tsx
// ❌ VULNERABLE - Never construct scripts from user input
const userCode = getUserInput()
return <script>{userCode}</script>

// ✅ SAFE - Use Next.js Script component for third-party scripts only
import Script from 'next/script'

export function Analytics() {
  return <Script src="https://trusted-analytics.com/script.js" strategy="afterInteractive" />
}
```

#### 4. Direct DOM Manipulation ❌

```tsx
// ❌ VULNERABLE - Direct DOM manipulation with user input
useEffect(() => {
  document.getElementById('content')!.innerHTML = userInput
}, [userInput])

// ✅ SAFE - Use React state and JSX
const [content, setContent] = useState('')

return <div>{content}</div>
```

---

### DOMPurify Integration

**Installation:**

```bash
pnpm add isomorphic-dompurify
```

**Basic Usage:**

```tsx
import DOMPurify from 'isomorphic-dompurify'

// Sanitize user-generated HTML content
export function sanitizeHTML(dirtyHTML: string): string {
  return DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
}

// Usage in component
export function HostBio({ bio }: { bio: string }) {
  const sanitizedBio = useMemo(() => sanitizeHTML(bio), [bio])

  return <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
}
```

**Strict Configuration for User Reviews:**

```tsx
export function sanitizeReviewContent(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'], // Very restrictive
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text even if tags are removed
  })
}
```

---

### URL Sanitization

**Problem:** User-submitted links can execute JavaScript.

```tsx
// ❌ VULNERABLE - javascript: protocol can execute code
;<a href={userSubmittedURL}>Click here</a>

// ✅ SAFE - Validate URL protocol
export function sanitizeURL(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url
    }
    return null
  } catch {
    return null // Invalid URL
  }
}

// Usage
export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const safeHref = sanitizeURL(href)

  if (!safeHref) {
    return <span>{children}</span> // Render as text if invalid
  }

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer" // Security: prevents window.opener access
    >
      {children}
    </a>
  )
}
```

---

### XSS Prevention Checklist

- [ ] Never use `dangerouslySetInnerHTML` with unsanitized user input
- [ ] Always sanitize HTML content with DOMPurify before rendering
- [ ] Validate URL protocols (only allow http/https)
- [ ] Use `rel="noopener noreferrer"` for external links with `target="_blank"`
- [ ] Never use `eval()`, `Function()`, or similar with user input
- [ ] Avoid direct DOM manipulation with `innerHTML`, `outerHTML`
- [ ] Encode user input when rendering in HTML attributes
- [ ] Use Content Security Policy headers (see CSP section)
- [ ] Sanitize data on both client and server

---

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

## Input Validation & Sanitization

### Validation Principle

**Validate on both client AND server:**

- **Client-side:** User experience (immediate feedback)
- **Server-side:** Security (client validation can be bypassed)

**DineLocal uses Zod for validation** (already in tech stack).

---

### Zod Validation Patterns

**Installation:**

```bash
pnpm add zod
```

**Basic Schema:**

```typescript
// src/features/bookings/schemas/booking.schema.ts
import { z } from 'zod'

export const createBookingSchema = z.object({
  venueId: z.string().uuid('Invalid venue ID'),
  guestCount: z.number().int().min(1).max(20),
  date: z.date().min(new Date(), 'Date must be in the future'),
  specialRequests: z.string().max(500, 'Maximum 500 characters').optional(),
  dietaryRestrictions: z
    .array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'halal', 'kosher']))
    .optional(),
})

export type CreateBookingDto = z.infer<typeof createBookingSchema>
```

**Server Action Validation:**

```typescript
'use server'

import { createBookingSchema } from './booking.schema'

export async function createBooking(formData: FormData) {
  // Parse and validate
  const rawData = {
    venueId: formData.get('venueId'),
    guestCount: Number(formData.get('guestCount')),
    date: new Date(formData.get('date') as string),
    specialRequests: formData.get('specialRequests'),
  }

  // Validate with Zod
  const result = createBookingSchema.safeParse(rawData)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Safe to use validated data
  const validatedData = result.data

  // Call NestJS backend
  const response = await apiClient.post('/bookings', validatedData)

  return { success: true, booking: response }
}
```

**Client-Side Form Validation (React Hook Form + Zod):**

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBookingSchema, type CreateBookingDto } from './booking.schema'

export function BookingForm() {
  const form = useForm<CreateBookingDto>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      guestCount: 2,
      dietaryRestrictions: [],
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    // Data is already validated by Zod
    const formData = new FormData()
    formData.append('venueId', data.venueId)
    formData.append('guestCount', String(data.guestCount))
    formData.append('date', data.date.toISOString())

    const result = await createBooking(formData)

    if (!result.success) {
      // Display server-side errors
      Object.entries(result.errors).forEach(([field, messages]) => {
        form.setError(field as any, { message: messages[0] })
      })
    }
  })

  return <form onSubmit={onSubmit}>{/* Form fields */}</form>
}
```

---

### String Validation Patterns

**Email:**

```typescript
const emailSchema = z.string().email('Invalid email address')
```

**Password:**

```typescript
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
```

**URL:**

```typescript
const urlSchema = z
  .string()
  .url('Invalid URL')
  .refine(
    (url) => {
      const parsed = new URL(url)
      return parsed.protocol === 'https:' // Enforce HTTPS
    },
    { message: 'URL must use HTTPS' }
  )
```

**Phone Number (International):**

```typescript
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (E.164 format)')
```

---

### SQL Injection Prevention

**Problem:** Raw SQL queries with user input can be exploited.

```sql
-- ❌ VULNERABLE
SELECT * FROM users WHERE email = '${userInput}'

-- If userInput = "'; DROP TABLE users; --"
-- Result: SELECT * FROM users WHERE email = ''; DROP TABLE users; --'
```

**Solution:** Use parameterized queries (NestJS backend with TypeORM).

```typescript
// ✅ SAFE - Parameterized query (NestJS backend)
const user = await this.userRepository.findOne({
  where: { email: userInput }, // TypeORM sanitizes this
})

// ✅ SAFE - QueryBuilder with parameters
const users = await this.userRepository
  .createQueryBuilder('user')
  .where('user.email = :email', { email: userInput })
  .getMany()
```

**Frontend Responsibility:**

- Frontend can't directly prevent SQL injection (backend's job)
- Frontend MUST validate input types/formats to reduce attack surface
- Use Zod schemas to ensure data types match backend expectations

---

### Path Traversal Prevention

**Problem:** User-supplied file paths can access unauthorized files.

```typescript
// ❌ VULNERABLE
const filePath = `/uploads/${req.query.filename}`
const file = fs.readFileSync(filePath)

// If filename = "../../etc/passwd"
// Result: Reads /etc/passwd instead of /uploads/ file
```

**Solution:** Validate file paths and use allow-lists.

```typescript
// ✅ SAFE - Validate filename
import path from 'path'

export function sanitizeFilename(filename: string): string | null {
  // Remove path separators
  const basename = path.basename(filename)

  // Allow only alphanumeric, hyphens, underscores, and periods
  if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(basename)) {
    return null
  }

  return basename
}

// Usage
const safeFilename = sanitizeFilename(req.query.filename)
if (!safeFilename) {
  return res.status(400).json({ error: 'Invalid filename' })
}

const filePath = path.join('/uploads', safeFilename)
```

---

### Input Validation Checklist

- [ ] Use Zod schemas for all user input validation
- [ ] Validate on both client (UX) and server (security)
- [ ] Use React Hook Form + zodResolver for forms
- [ ] Sanitize HTML content with DOMPurify before rendering
- [ ] Validate email, URL, phone number formats
- [ ] Enforce strong password requirements
- [ ] Use parameterized queries (TypeORM) to prevent SQL injection
- [ ] Sanitize file names to prevent path traversal
- [ ] Set maximum lengths for text inputs (prevent DoS)
- [ ] Validate number ranges (min/max)
- [ ] Use enum validation for fixed sets of values
- [ ] Return user-friendly error messages (don't expose internal details)

---

## Authentication Security

### Session Management

**DineLocal Architecture:**

- Backend (NestJS) manages authentication and sessions
- Frontend (Next.js) stores session token in httpOnly cookie
- Frontend makes authenticated requests to NestJS backend

---

### Secure Cookie Configuration

**Backend (NestJS) sets session cookie:**

```typescript
// NestJS backend configuration
{
  httpOnly: true,        // Prevents XSS attacks (JavaScript can't access)
  secure: true,          // HTTPS only
  sameSite: 'lax',       // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
  domain: process.env.COOKIE_DOMAIN // e.g., '.dinelocal.com'
}
```

**Why these settings matter:**

- **httpOnly:** Prevents JavaScript from reading the cookie (XSS protection)
- **secure:** Cookie only sent over HTTPS (prevents interception)
- **sameSite:** Protects against CSRF attacks
- **maxAge:** Limits session lifetime
- **domain:** Allows cookie to be shared across subdomains

---

### JWT Token Security

If using JWT tokens for authentication:

**Storage Options:**

1. **httpOnly Cookie (Recommended):** Secure, can't be accessed by JavaScript
2. **LocalStorage (NOT Recommended):** Vulnerable to XSS
3. **SessionStorage (NOT Recommended):** Vulnerable to XSS

```typescript
// ✅ RECOMMENDED - Store JWT in httpOnly cookie (backend sets this)
// Frontend doesn't need to handle JWT directly

// ❌ AVOID - LocalStorage
localStorage.setItem('token', jwt) // Vulnerable to XSS

// ❌ AVOID - SessionStorage
sessionStorage.setItem('token', jwt) // Vulnerable to XSS
```

**JWT Best Practices:**

- Use short expiration times (15 minutes for access tokens)
- Implement refresh tokens with longer expiration (7 days)
- Rotate refresh tokens on use
- Store refresh tokens in httpOnly cookies
- Validate JWT signature on every request (backend)
- Include user roles/permissions in JWT payload

---

### Password Security (Backend Guidance)

**Frontend Responsibility:**

- Enforce strong password requirements
- Use password strength indicator
- Never send passwords via GET requests
- Always use HTTPS

**Backend Responsibility (NestJS):**

- Hash passwords with bcrypt (cost factor 12-14)
- Never store plaintext passwords
- Use salt for each password (bcrypt does this automatically)
- Implement password reset with secure tokens

```typescript
// Frontend - Password strength validation
export const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Include uppercase')
  .regex(/[a-z]/, 'Include lowercase')
  .regex(/[0-9]/, 'Include number')
  .regex(/[^A-Za-z0-9]/, 'Include special character')

// Frontend - Password strength indicator
export function getPasswordStrength(password: string): number {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  return Math.min(strength, 5) // 0-5 scale
}
```

---

### Multi-Factor Authentication (MFA)

**Implementation Options:**

1. **TOTP (Time-based One-Time Password):** Google Authenticator, Authy
2. **SMS OTP:** Text message verification codes
3. **Email OTP:** Email verification codes

**Frontend Integration:**

```tsx
// OTP Input Component (using input-otp library from tech stack)
'use client'

import { OTPInput } from 'input-otp'

export function MFAVerification({ onVerify }: { onVerify: (code: string) => void }) {
  return (
    <div>
      <h2>Enter Verification Code</h2>
      <OTPInput length={6} onComplete={(code) => onVerify(code)} autoFocus />
    </div>
  )
}
```

---

### Rate Limiting

**Prevent brute force attacks on:**

- Login endpoints
- Password reset endpoints
- Registration endpoints
- API endpoints

**Backend Implementation (NestJS with @nestjs/throttler):**

```typescript
// 10 login attempts per 15 minutes per IP
@Throttle(10, 15 * 60)
@Post('login')
async login(@Body() credentials: LoginDto) {
  // ...
}
```

**Frontend Indication:**

```tsx
// Show rate limit error
if (error.status === 429) {
  toast.error('Too many attempts. Please try again in 15 minutes.')
}
```

---

### Session Invalidation

**When to invalidate sessions:**

- User logs out
- User changes password
- User enables/disables MFA
- Suspicious activity detected
- User logs in from new device (optional: invalidate old sessions)

**Frontend Logout Flow:**

```typescript
'use server'

export async function logout() {
  // Call backend to invalidate session
  await apiClient.post('/auth/logout')

  // Redirect to login page
  redirect('/login')
}
```

---

### Authentication Checklist

- [ ] Use httpOnly, secure, sameSite cookies for session tokens
- [ ] Never store JWT tokens in localStorage or sessionStorage
- [ ] Enforce strong password requirements (8+ chars, mixed case, numbers, symbols)
- [ ] Hash passwords with bcrypt (backend, cost factor 12-14)
- [ ] Implement rate limiting on auth endpoints (10 attempts / 15 min)
- [ ] Use HTTPS for all authentication requests
- [ ] Implement session expiration (7 days max)
- [ ] Provide secure password reset flow with time-limited tokens
- [ ] Consider implementing MFA for host accounts
- [ ] Invalidate sessions on password change
- [ ] Log authentication events (login, logout, failed attempts)
- [ ] Implement "Remember Me" with extended session (opt-in only)

---

## Content Security Policy (CSP)

### What is CSP?

Content Security Policy is an HTTP header that restricts which resources (scripts, styles, images) can be loaded on your page. It's the strongest defense against XSS attacks.

**How it Works:**

- Browser enforces restrictions defined in CSP header
- Only whitelisted sources can load resources
- Inline scripts/styles blocked by default (requires nonce or hash)

---

### Next.js 15 CSP Configuration

**Basic CSP (Strict):**

```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{{NONCE}}';
  style-src 'self' 'nonce-{{NONCE}}';
  img-src 'self' blob: data: https:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

**CSP for Production with Third-Party Services:**

```typescript
// next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{{NONCE}}' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'nonce-{{NONCE}}' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.dinelocal.com https://analytics.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
```

**Directive Explanations:**

- `default-src 'self'`: Only load resources from same origin by default
- `script-src`: Where JavaScript can be loaded from
- `style-src`: Where CSS can be loaded from
- `img-src`: Where images can be loaded from
- `font-src`: Where fonts can be loaded from
- `connect-src`: Allowed fetch/XHR/WebSocket URLs
- `object-src 'none'`: Block `<object>`, `<embed>`, `<applet>`
- `base-uri 'self'`: Restrict `<base>` tag URLs
- `form-action 'self'`: Forms can only submit to same origin
- `frame-ancestors 'none'`: Prevent page from being embedded in iframes (clickjacking protection)
- `upgrade-insecure-requests`: Convert HTTP to HTTPS requests

---

### Nonce-based CSP (Recommended)

**Why Nonces?**

- Allows inline scripts/styles (needed for Next.js)
- More secure than 'unsafe-inline'
- Unique nonce per request prevents injection

**Implementation with Next.js Middleware:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { randomBytes } from 'crypto'

export function middleware(request: NextRequest) {
  // Generate nonce for this request
  const nonce = randomBytes(16).toString('base64')

  // Create CSP header with nonce
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Clone response and add headers
  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Nonce', nonce) // Pass nonce to page

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

**Using Nonce in Components:**

```tsx
// src/app/layout.tsx
import { headers } from 'next/headers'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('X-Nonce') || ''

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <style nonce={nonce}>{`/* Critical CSS */`}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

### CSP Reporting

**Monitor CSP violations:**

```typescript
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{{NONCE}}';
  style-src 'self' 'nonce-{{NONCE}}';
  report-uri /api/csp-report;
  report-to csp-endpoint;
`

// Report-To header
const reportToHeader = JSON.stringify({
  group: 'csp-endpoint',
  max_age: 10886400,
  endpoints: [{ url: '/api/csp-report' }],
})
```

**CSP Report Handler:**

```typescript
// src/app/api/csp-report/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const report = await request.json()

  // Log CSP violation
  console.error('CSP Violation:', {
    documentUri: report['document-uri'],
    violatedDirective: report['violated-directive'],
    blockedUri: report['blocked-uri'],
    sourceFile: report['source-file'],
    lineNumber: report['line-number'],
  })

  // Optionally send to error tracking service (Sentry, etc.)

  return NextResponse.json({ received: true })
}
```

---

### CSP Checklist

- [ ] Implement Content Security Policy headers
- [ ] Use nonce-based CSP for inline scripts/styles
- [ ] Whitelist only necessary third-party domains
- [ ] Set `object-src 'none'` to block plugins
- [ ] Set `base-uri 'self'` to prevent base tag injection
- [ ] Set `frame-ancestors 'none'` to prevent clickjacking
- [ ] Use `upgrade-insecure-requests` to enforce HTTPS
- [ ] Set up CSP reporting to monitor violations
- [ ] Test CSP in Report-Only mode before enforcing
- [ ] Review CSP directives when adding new third-party services

---

## File Upload Security

See **COMPONENT_GUIDELINES.md → File Upload Patterns** for implementation details.

**Security Considerations:**

- **File Type Validation:** Check MIME type and file extension (both client and server)
- **File Size Limits:** Prevent DoS attacks with large uploads
- **Virus Scanning:** Integrate ClamAV or similar for uploaded files
- **Content Verification:** Validate image headers (not just extension)
- **Secure Storage:** Store uploads outside web root, serve via CDN
- **Access Control:** Ensure users can only access their own uploads
- **Filename Sanitization:** Remove special characters, prevent path traversal

**Quick Example:**

```typescript
// Validate file type
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export function validateFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'File type not allowed. Use JPEG, PNG, or WebP.'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds 10 MB limit.'
  }

  return null // Valid
}
```

---

## Payment Security

See **COMPONENT_GUIDELINES.md → Payment Integration** for implementation details.

**Security Principles:**

1. **Never handle raw card numbers:** Use Stripe Checkout or Elements
2. **PCI Compliance:** Let Stripe handle card data (SAQ-A compliance)
3. **Webhook Signature Verification:** Always verify Stripe signatures
4. **HTTPS Only:** All payment pages must use HTTPS
5. **Idempotency:** Use idempotency keys for payment operations

**Critical Security Checks:**

```typescript
// Verify Stripe webhook signature
const signature = request.headers.get('stripe-signature')

try {
  const event = stripe.webhooks.constructEvent(
    await request.text(),
    signature!,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  // Process event
} catch (err) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
}
```

---

## API Security

### Rate Limiting

**Prevent API abuse:**

```typescript
// Backend (NestJS) - Rate limiting configuration
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 60 seconds
      limit: 100, // 100 requests per 60 seconds
    }),
  ],
})
export class AppModule {}
```

**Frontend Handling:**

```typescript
// Handle rate limit errors
if (error.response?.status === 429) {
  const retryAfter = error.response.headers['retry-after']
  toast.error(`Too many requests. Try again in ${retryAfter} seconds.`)
}
```

---

### API Key Security

**Never expose API keys in frontend code:**

```typescript
// ❌ VULNERABLE - API key in client-side code
const API_KEY = 'sk_live_abc123' // Never do this!

// ✅ SAFE - API keys only in backend environment variables
// Backend (NestJS) .env file
STRIPE_SECRET_KEY = sk_live_abc123

// Frontend only uses public keys
// Frontend .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xyz789
```

**Environment Variable Naming:**

- `NEXT_PUBLIC_*`: Available in browser (public keys only)
- No prefix: Server-side only (secret keys, database URLs)

---

### CORS Configuration

**Backend (NestJS) CORS setup:**

```typescript
// main.ts
const app = await NestFactory.create(AppModule)

app.enableCors({
  origin: process.env.FRONTEND_URL, // e.g., 'https://dinelocal.com'
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})
```

---

### API Security Checklist

- [ ] Implement rate limiting on all API endpoints
- [ ] Use authentication for all non-public endpoints
- [ ] Validate all input with Zod schemas
- [ ] Never expose API secret keys in frontend code
- [ ] Use environment variables for sensitive configuration
- [ ] Enable CORS with specific origins (not wildcard \*)
- [ ] Log all API errors and suspicious activity
- [ ] Implement request signing for critical operations
- [ ] Use HTTPS for all API communications
- [ ] Set appropriate HTTP security headers

---

## Security Checklist

### Pre-Deployment Security Audit

#### XSS Prevention

- [ ] No usage of `dangerouslySetInnerHTML` with unsanitized input
- [ ] All user-generated HTML sanitized with DOMPurify
- [ ] URL protocols validated (only http/https)
- [ ] External links use `rel="noopener noreferrer"`
- [ ] Content Security Policy configured and tested

#### CSRF Prevention

- [ ] Server Actions used for state-changing operations
- [ ] Custom API routes protected with CSRF tokens
- [ ] SameSite=Lax (minimum) set on session cookies
- [ ] Origin/Referer headers validated

#### Input Validation

- [ ] All user input validated with Zod schemas
- [ ] Validation on both client and server
- [ ] Email, URL, phone number formats validated
- [ ] File uploads validated (type, size, content)
- [ ] Maximum lengths enforced on text inputs

#### Authentication

- [ ] Session tokens in httpOnly, secure, sameSite cookies
- [ ] JWT tokens not stored in localStorage/sessionStorage
- [ ] Strong password requirements enforced
- [ ] Rate limiting on auth endpoints (10 attempts / 15 min)
- [ ] Passwords hashed with bcrypt (backend, cost 12-14)
- [ ] Sessions expire after inactivity (7 days max)

#### HTTPS

- [ ] All pages served over HTTPS in production
- [ ] HSTS header configured (`Strict-Transport-Security`)
- [ ] Mixed content warnings resolved
- [ ] Redirect HTTP to HTTPS

#### Security Headers

- [ ] Content-Security-Policy configured
- [ ] X-Frame-Options: DENY (clickjacking protection)
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy configured

#### API Security

- [ ] Rate limiting on all endpoints
- [ ] Authentication required for non-public endpoints
- [ ] CORS configured with specific origins
- [ ] API keys never exposed in frontend code
- [ ] Request/response logging enabled

#### Dependencies

- [ ] No known vulnerabilities in dependencies (`pnpm audit`)
- [ ] Dependencies kept up to date
- [ ] Unnecessary dependencies removed

#### Error Handling

- [ ] Errors don't expose sensitive information
- [ ] Generic error messages shown to users
- [ ] Detailed errors logged server-side
- [ ] 404 pages don't reveal file structure

#### Monitoring

- [ ] Error tracking configured (Sentry, etc.)
- [ ] CSP violation reporting enabled
- [ ] Failed login attempts logged
- [ ] Suspicious activity alerts configured

---

### Code Review Security Checklist

When reviewing pull requests:

- [ ] No `dangerouslySetInnerHTML` with user input
- [ ] No `eval()`, `Function()`, or similar dangerous functions
- [ ] All user input validated with Zod
- [ ] No API keys in frontend code
- [ ] No SQL queries with string concatenation (use parameterized)
- [ ] No hardcoded secrets or passwords
- [ ] File paths validated (no path traversal)
- [ ] Authentication checks on all protected routes
- [ ] Rate limiting on new API endpoints
- [ ] New third-party scripts added to CSP whitelist

---

## Security Resources

### Documentation

- [OWASP Top 10](https://owasp.org/Top10/) - Most critical web security risks
- [Next.js Security](https://nextjs.org/blog/security-nextjs-server-components-actions) - Official Next.js security guide
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security) - Comprehensive web security reference

### Tools

- [pnpm audit](https://pnpm.io/cli/audit) - Check for vulnerabilities in dependencies
- [Snyk](https://snyk.io/) - Security scanning for dependencies
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Test Content Security Policy
- [Security Headers](https://securityheaders.com/) - Scan HTTP security headers

### Testing

- [OWASP ZAP](https://www.zaproxy.org/) - Security testing tool
- [Burp Suite](https://portswigger.net/burp) - Web vulnerability scanner

---

## Summary

**Key Takeaways:**

1. **Never trust user input** - Validate everything
2. **Use framework protections** - React, Next.js have built-in security
3. **Defense in depth** - Multiple security layers
4. **Stay updated** - Security is ongoing, not one-time

**Most Critical for DineLocal:**

1. XSS prevention (user reviews, venue descriptions)
2. CSRF protection (bookings, payments)
3. Payment security (Stripe webhook verification)
4. File upload security (venue photos)
5. Authentication security (host/guest accounts)

**Remember:** Security is everyone's responsibility. When in doubt, ask for security review.

---

**Last Updated:** 2025-11-06
**Maintained By:** DineLocal Engineering Team

**Questions or Updates?**

If you need to update this security guide, ask for approval first.

- Propose changes with rationale and examples
