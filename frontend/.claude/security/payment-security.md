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
