## TypeScript Coding Standards

### Enable Strict Mode

**Always use TypeScript strict mode:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true, // Enables all strict type checking options
    "noUncheckedIndexedAccess": true, // Prevent undefined array access
    "noImplicitReturns": true, // Function must return explicitly
    "noFallthroughCasesInSwitch": true // Switch must have breaks
  }
}
```

---

### Explicit Typing

**Always provide explicit types for functions and complex data:**

```tsx
// ✅ CORRECT: Explicit types
interface User {
  id: string
  name: string
  email: string
  role: 'host' | 'guest' | 'admin'
}

function getUserById(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((res) => res.json())
}

// ✅ CORRECT: Generic types
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
}

// ❌ INCORRECT: Implicit any
function getUser(id) {
  // id is 'any'
  return fetch(`/api/users/${id}`).then((res) => res.json()) // returns 'any'
}

// ❌ INCORRECT: Using 'any'
function processData(data: any): any {
  // Lost all type safety!
}
```

---

### Avoid 'any' - Use Proper Types

**Replace 'any' with specific types:**

```tsx
// ❌ BAD: Using 'any'
function handleResponse(response: any) {
  return response.data
}

// ✅ GOOD: Use 'unknown' for truly unknown data
function handleResponse(response: unknown) {
  if (isValidResponse(response)) {
    return response.data
  }
  throw new Error('Invalid response')
}

function isValidResponse(response: unknown): response is { data: unknown } {
  return typeof response === 'object' && response !== null && 'data' in response
}

// ✅ GOOD: Use generics for flexible but type-safe code
function apiRequest<T>(endpoint: string): Promise<T> {
  return fetch(endpoint).then((res) => res.json())
}

// Usage with specific type
const user = await apiRequest<User>('/api/users/123')
```

---

### Interface vs Type

**Prefer interfaces for object shapes, types for unions/intersections:**

```tsx
// ✅ CORRECT: Interface for object shapes
interface Experience {
  id: string
  title: string
  hostId: string
  price: number
}

// ✅ CORRECT: Extend interfaces
interface VerifiedExperience extends Experience {
  verificationBadge: string
  verifiedAt: Date
}

// ✅ CORRECT: Type for unions and complex types
type ExperienceStatus = 'draft' | 'published' | 'archived'

type ApiResponse<T> = { success: true; data: T } | { success: false; error: string }

// ✅ CORRECT: Type for intersections
type WithTimestamps = {
  createdAt: Date
  updatedAt: Date
}

type Experience = BaseExperience & WithTimestamps
```

---

### Type Guards

**Create type guards for runtime type checking:**

```tsx
// ✅ CORRECT: Type guard function
function isExperience(value: unknown): value is Experience {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'price' in value &&
    typeof (value as Experience).id === 'string' &&
    typeof (value as Experience).title === 'string' &&
    typeof (value as Experience).price === 'number'
  )
}

// Usage
function processData(data: unknown) {
  if (isExperience(data)) {
    // TypeScript knows 'data' is Experience here
    console.log(data.title)
  }
}
```

---

### Utility Types

**Leverage TypeScript utility types:**

```tsx
interface Experience {
  id: string
  title: string
  description: string
  price: number
  hostId: string
}

// ✅ Partial: Make all properties optional
type PartialExperience = Partial<Experience>
// { id?: string; title?: string; ... }

// ✅ Required: Make all properties required
type RequiredExperience = Required<Experience>

// ✅ Pick: Select specific properties
type ExperiencePreview = Pick<Experience, 'id' | 'title' | 'price'>
// { id: string; title: string; price: number }

// ✅ Omit: Exclude specific properties
type ExperienceWithoutHost = Omit<Experience, 'hostId'>
// { id: string; title: string; description: string; price: number }

// ✅ Record: Create object type with keys
type ExperiencesByCategory = Record<string, Experience[]>
// { [category: string]: Experience[] }
```

---
