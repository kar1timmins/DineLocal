# Security Guide

Security best practices and threat mitigation.

⚠️ **CRITICAL:** Review BEFORE implementing user input, payments, file uploads, authentication.

---

## 📋 Index

1. **[XSS Prevention](./xss-prevention.md)** - DOMPurify, sanitization
2. **[CSRF Protection](./csrf-protection.md)** - Token patterns
3. **[Input Validation](./input-validation.md)** - Zod validation, sanitization
4. **[Authentication](./authentication.md)** - Secure auth, session management
5. **[Content Security Policy](./content-security-policy.md)** - CSP configuration
6. **[File Upload Security](./file-upload-security.md)** - Secure file handling
7. **[Payment Security](./payment-security.md)** - Stripe security, PCI compliance
8. **[API Security](./api-security.md)** - Rate limiting, CORS, headers
9. **[Checklist](./checklist.md)** - Pre-deployment security checklist

---

## Critical Rules

### ⚠️ ALWAYS
✅ Sanitize ALL user input (DOMPurify)
✅ Validate client AND server (Zod)
✅ Use HTTPS in production
✅ Store secrets in env vars (never commit)

### ❌ NEVER
❌ Trust user input
❌ Use `dangerouslySetInnerHTML` without sanitization
❌ Commit API keys or credentials
❌ Store sensitive data in localStorage

---

**Threat Model:** Payments, Auth, File Uploads, User-Generated Content, Bookings
