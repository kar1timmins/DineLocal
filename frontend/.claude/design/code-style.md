## Code Style

**Note:** For file naming conventions (PascalCase vs kebab-case, etc.), see `/frontend/.claude/CLAUDE.md` → Coding Conventions → File Naming Guidelines.

### Component Structure

```tsx
// ✅ CORRECT: Clean, organized component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flex } from '@/components/shared/container/flex'
import { Text } from '@/components/shared/typography/text'

interface RestaurantCardProps {
  name: string
  cuisine: string
  price: string
  onBook: () => void
}

export function RestaurantCard({ name, cuisine, price, onBook }: RestaurantCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="gap-2">
          <Text className="text-muted-foreground">{cuisine}</Text>
          <Text fontWeight="semi-bold">{price}</Text>
          <Button onClick={onBook} className="w-full">
            Book Now
          </Button>
        </Flex>
      </CardContent>
    </Card>
  )
}
```

### Tailwind Class Organization

```tsx
// ✅ CORRECT: Organized by category
<div className={cn(
  // Layout
  'flex flex-col',
  // Spacing
  'gap-4 p-6',
  // Sizing
  'w-full max-w-4xl',
  // Borders
  'border border-border rounded-lg',
  // Background
  'bg-card',
  // Typography
  'text-foreground',
  // Effects
  'shadow-sm hover:shadow-md',
  // Transitions
  'transition-all',
  // Responsive
  'md:flex-row md:gap-6 md:p-8'
)}>
  {/* Content */}
</div>

// ❌ INCORRECT: Random order
<div className="hover:shadow-md text-foreground gap-4 flex shadow-sm w-full border bg-card rounded-lg p-6 md:gap-6 flex-col transition-all">
```

### Import Organization

```tsx
// ✅ CORRECT: Organized imports
// 1. React/Next.js
import { useState } from 'react'
import Image from 'next/image'

// 2. External libraries
import { useQuery } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internal components (UI)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 4. Internal components (Shared)
import { Flex } from '@/components/shared/container/flex'
import { Heading } from '@/components/shared/typography/heading'

// 5. Internal utilities/types
import { cn } from '@/lib/utils'
import type { Restaurant } from '@/types/restaurant'

// 6. API functions
import { getRestaurants } from '@/lib/api/restaurants'
```

### TypeScript Guidelines

```tsx
// ✅ CORRECT: Explicit types, interfaces
interface Restaurant {
  id: string
  name: string
  cuisine: string
  priceRange: 'budget' | 'moderate' | 'expensive'
  availableSlots: number
}

function BookingForm({ restaurant }: { restaurant: Restaurant }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  // ...
}

// ❌ INCORRECT: No types, any
function BookingForm({ restaurant }: any) {
  const [selectedDate, setSelectedDate] = useState(null)
  // ...
}
```

### Code Style Guidelines

**DO:**

- ✅ Use PascalCase for component file names (RestaurantCard.tsx) - see CLAUDE.md for full file naming conventions
- ✅ Use PascalCase for component names (RestaurantCard)
- ✅ Use camelCase for functions/variables (getRestaurants)
- ✅ Extract magic numbers/strings to constants
- ✅ Add JSDoc comments for complex functions
- ✅ Use TypeScript strict mode (no `any`)
- ✅ Organize Tailwind classes by category

**DON'T:**

- ❌ Mix naming conventions
- ❌ Use inline styles instead of Tailwind
- ❌ Create deeply nested components (max 3 levels)
- ❌ Duplicate code (use shared components)
- ❌ Skip prop validation (use TypeScript interfaces)

---

