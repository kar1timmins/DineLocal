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
