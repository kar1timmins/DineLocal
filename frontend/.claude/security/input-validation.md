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

