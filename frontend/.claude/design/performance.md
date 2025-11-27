## Performance & Core Web Vitals

### 2025 Performance Targets

**Core Web Vitals:**

- **LCP (Largest Contentful Paint):** < 2.5s (Good), < 4.0s (Needs Improvement)
- **INP (Interaction to Next Paint):** < 200ms (Good), < 500ms (Needs Improvement)
- **CLS (Cumulative Layout Shift):** < 0.1 (Good), < 0.25 (Needs Improvement)

**Why These Matter:**

- **LCP:** Measures perceived load speed (when main content appears)
- **INP:** Measures responsiveness to user interactions (replaced FID in 2024)
- **CLS:** Measures visual stability (prevents layout jumps)

### Image Optimization

**Modern Image Formats:**

```tsx
// ✅ CORRECT: WebP with JPEG fallback
<Image
  src="/restaurants/hero.jpg"
  alt="Restaurant interior with warm lighting and wooden tables"
  width={1200}
  height={675}
  format="webp"
  quality={85}
  placeholder="blur"
  loading="lazy"
/>

// ✅ Use srcset for responsive images
<img
  srcset="
    /restaurant-320w.webp 320w,
    /restaurant-640w.webp 640w,
    /restaurant-1200w.webp 1200w
  "
  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1200px"
  src="/restaurant-640w.webp"
  alt="Grilled salmon with roasted vegetables"
  loading="lazy"
/>
```

**Image Size Guidelines:**

```tsx
// Hero images (above the fold)
width: 1200px, height: 675px (16:9)
format: WebP
quality: 85
max file size: 200KB
loading: "eager" or priority={true}

// Thumbnail images (below the fold)
width: 400px, height: 300px (4:3)
format: WebP
quality: 80
max file size: 50KB
loading: "lazy"

// User avatars
width: 128px, height: 128px (1:1)
format: WebP
quality: 85
max file size: 20KB
loading: "lazy"
```

**Preventing Cumulative Layout Shift (CLS):**

```tsx
// ✅ CORRECT: Always specify width/height to reserve space
<Image
  src={imageUrl}
  width={800}
  height={600}
  alt="Food photo"
  className="w-full h-auto object-cover"
/>

// ❌ INCORRECT: No dimensions (causes layout shift)
<img src={imageUrl} alt="Food photo" className="w-full" />
```

### Bundle Size Guidelines

**Target Bundle Sizes:**

- **JavaScript (per route):** < 100KB gzipped
- **CSS:** < 50KB gzipped (Tailwind with purging enabled)
- **Total initial load:** < 300KB gzipped

**Code Splitting Strategy:**

```tsx
// ✅ CORRECT: Dynamic import for heavy components
import dynamic from 'next/dynamic'

const MapView = dynamic(() => import('@/components/shared/map-view'), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false, // Don't render on server if uses browser APIs
})

// ✅ CORRECT: Route-based code splitting (Next.js handles automatically)
// Each page in /app directory gets its own bundle
```

### Lazy Loading

**Images:**

```tsx
// ✅ Lazy load below-the-fold images
<Image
  src={imageUrl}
  loading="lazy"
  className="w-full h-60 object-cover"
/>

// ✅ Priority load above-the-fold images
<Image
  src={heroImage}
  priority={true}
  className="w-full h-96 object-cover"
/>
```

**Components:**

```tsx
// ✅ Lazy load modals, drawers, tooltips
const BookingModal = dynamic(() => import('./booking-modal'), {
  loading: () => <Skeleton className="h-[600px] w-full" />,
})
```

### Performance Guidelines

**DO:**

- ✅ Use Next.js Image component for automatic optimization
- ✅ Enable Tailwind CSS purging to remove unused styles
- ✅ Lazy load images below the fold
- ✅ Code-split heavy components (maps, charts, editors)
- ✅ Use WebP format with JPEG fallback
- ✅ Specify image dimensions to prevent CLS
- ✅ Minimize JavaScript bundle size with dynamic imports

**DON'T:**

- ❌ Load all images eagerly (use lazy loading)
- ❌ Use unoptimized images (raw uploads without compression)
- ❌ Import heavy libraries globally (dynamic import instead)
- ❌ Forget to specify image dimensions (causes layout shift)
- ❌ Use large JavaScript bundles (code-split by route)
- ❌ Block rendering with synchronous scripts

---

## Loading States & Progressive Enhancement

### Loading Strategy

**Progressive Loading Hierarchy:**

1. **Instant:** Show skeleton/placeholder immediately
2. **Fast (<500ms):** Show spinner for quick operations
3. **Slow (>500ms):** Show progress indicator with estimated time
4. **Very Slow (>3s):** Show progress + cancel option

### Skeleton Screens

**Use skeleton screens for content loading (better UX than spinners):**

```tsx
// Restaurant card skeleton
<Card className="p-6 space-y-4">
  <Skeleton className="w-full h-48 rounded-lg" />
  <Skeleton className="w-3/4 h-6" />
  <Skeleton className="w-1/2 h-4" />
  <Flex className="gap-2">
    <Skeleton className="w-16 h-4" />
    <Skeleton className="w-16 h-4" />
  </Flex>
</Card>

// List skeleton
<div className="space-y-4">
  {Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} className="w-full h-24 rounded-lg" />
  ))}
</div>

// Text content skeleton
<div className="space-y-2">
  <Skeleton className="w-full h-4" />
  <Skeleton className="w-5/6 h-4" />
  <Skeleton className="w-4/6 h-4" />
</div>
```

### Loading Spinner

**Use sparingly - only for quick operations (<1s expected):**

```tsx
// Button loading state
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  Book Now
</Button>

// Page loading
<Flex justifyContent="center" alignItems="center" className="min-h-[400px]">
  <Loader2 className="h-8 w-8 animate-spin text-primary" />
</Flex>
```

### Progress Indicators

**For operations with known duration:**

```tsx
// Upload progress
<div className="space-y-2">
  <Flex justifyContent="between">
    <Text className="text-sm">Uploading photos...</Text>
    <Text className="text-sm text-muted-foreground">{progress}%</Text>
  </Flex>
  <Progress value={progress} className="h-2" />
</div>

// Multi-step process
<div className="space-y-4">
  <Flex justifyContent="between" className="text-sm">
    <span>Processing booking...</span>
    <span className="text-muted-foreground">Step 2 of 3</span>
  </Flex>
  <Progress value={66} className="h-2" />
</div>
```

### Error States

**Friendly, actionable error messages:**

```tsx
// ✅ CORRECT: Specific, helpful error with action
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Couldn't load restaurants</AlertTitle>
  <AlertDescription>
    Check your internet connection and try again.
  </AlertDescription>
  <Button variant="outline" onClick={retry} className="mt-2">
    Retry
  </Button>
</Alert>

// ✅ CORRECT: Inline form error
<div className="space-y-2">
  <Input
    className="border-red-600"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <Text id="email-error" className="text-sm text-red-700">
    Please enter a valid email address (e.g., you@example.com)
  </Text>
</div>

// ❌ INCORRECT: Vague error
<div>Error</div>
<div>Something went wrong</div>
```

### Empty States

**Encouraging, actionable empty states:**

```tsx
// ✅ CORRECT: Helpful empty state with CTA
<Flex direction="column" alignItems="center" className="gap-4 py-12">
  <CalendarOff className="h-12 w-12 text-muted-foreground" />
  <Heading as="h3" textColor="muted">No bookings yet</Heading>
  <Paragraph textAlign="center" className="max-w-md text-muted-foreground">
    Start exploring authentic local dining experiences near you!
  </Paragraph>
  <Button onClick={navigateToExplore}>
    Discover Experiences
  </Button>
</Flex>

// Search with no results
<Flex direction="column" alignItems="center" className="gap-4 py-12">
  <Search className="h-12 w-12 text-muted-foreground" />
  <Heading as="h3" textColor="muted">No results for "{searchQuery}"</Heading>
  <Paragraph textAlign="center" className="max-w-md text-muted-foreground">
    Try adjusting your filters or search for different keywords.
  </Paragraph>
  <Button variant="outline" onClick={clearFilters}>
    Clear Filters
  </Button>
</Flex>
```

### Optimistic UI Updates

**Show instant feedback, rollback on error:**

```tsx
const { mutate: addToFavorites } = useMutation({
  mutationFn: addFavorite,
  onMutate: async (experienceId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['favorites'] })

    // Snapshot previous value
    const previousFavorites = queryClient.getQueryData(['favorites'])

    // Optimistically update to show as favorited
    queryClient.setQueryData(['favorites'], (old) => [...old, experienceId])

    return { previousFavorites }
  },
  onError: (error, experienceId, context) => {
    // Rollback on error
    queryClient.setQueryData(['favorites'], context.previousFavorites)
    toast.error('Failed to add to favorites. Please try again.')
  },
  onSuccess: () => {
    toast.success('Added to favorites')
  },
})
```

### Loading State Guidelines

**DO:**

- ✅ Use skeleton screens for predictable content layouts
- ✅ Show specific error messages with recovery actions
- ✅ Provide encouraging, helpful empty states
- ✅ Use optimistic UI for instant perceived feedback
- ✅ Disable buttons during submission (prevents double-click)
- ✅ Show progress for operations >3 seconds
- ✅ Provide cancel option for long operations

**DON'T:**

- ❌ Show generic "Loading..." text without visual indicator
- ❌ Display vague error messages ("Error 500")
- ❌ Show empty states without actionable next steps
- ❌ Block entire page for partial data loading
- ❌ Forget to disable submit buttons during processing
- ❌ Use spinners for content that takes >2 seconds

---
