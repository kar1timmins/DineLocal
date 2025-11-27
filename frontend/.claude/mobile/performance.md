## Mobile Performance

### Reduce Animations on Low-End Devices

**Detect device performance tier:**

```tsx
import { useEffect, useState } from 'react'

export function useDevicePerformance() {
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2

    // Check device memory (GB)
    const memory = (navigator as any).deviceMemory || 4

    // Determine tier
    if (cores >= 8 && memory >= 8) {
      setTier('high')
    } else if (cores >= 4 && memory >= 4) {
      setTier('medium')
    } else {
      setTier('low')
    }
  }, [])

  return tier
}

// Usage in components
export function AnimatedCard() {
  const performanceTier = useDevicePerformance()

  return (
    <Card
      className={cn(
        'cursor-pointer',
        performanceTier !== 'low' && 'transition-transform hover:scale-105'
      )}
    >
      {/* Card content */}
    </Card>
  )
}
```

---
