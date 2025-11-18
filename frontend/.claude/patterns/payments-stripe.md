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

