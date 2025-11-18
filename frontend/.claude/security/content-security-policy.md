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

