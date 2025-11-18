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

