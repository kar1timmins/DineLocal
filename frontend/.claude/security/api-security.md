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
