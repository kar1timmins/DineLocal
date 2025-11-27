## Performance & Loading States

**Target:** Core Web Vitals 2025 standards

---

### Core Web Vitals 2025 Targets

| Metric                              | Target  | Purpose                   |
| ----------------------------------- | ------- | ------------------------- |
| **LCP (Largest Contentful Paint)**  | < 2.5s  | Page feels fast to load   |
| **INP (Interaction to Next Paint)** | < 200ms | Page feels responsive     |
| **CLS (Cumulative Layout Shift)**   | < 0.1   | Page doesn't jump around  |
| **FCP (First Contentful Paint)**    | < 1.8s  | Something appears quickly |
| **TTFB (Time to First Byte)**       | < 800ms | Server responds fast      |

**WHY IT MATTERS:**

- **53% of mobile users** abandon if page takes > 3s to load (Google)
- **1 second delay** = 7% reduction in conversions (Amazon study)
- **Core Web Vitals** are Google ranking factors (affects SEO)

---

### Loading States: Do's and Don'ts

#### Skeleton Screens

**✅ DO:**

- **Use for predictable layouts** (card grids, lists)
- **Match final content size** (reduces CLS)
- **Animate with shimmer** (feels alive)
- **Show immediately** (< 100ms)
- **Replace with real content** (no flash)

**❌ DON'T:**

- Use spinners for structured content
- Mismatched skeleton size (causes layout shift)
- Static gray boxes (feels broken)
- Delay showing skeleton (blank screen)
- Keep skeleton visible after content loads

**WHY:**

- Skeleton screens perceived as **36% faster** than spinners
- Reduces perceived wait time
- Prevents layout shift (CLS)

**WHEN TO USE:**

- Experience card grids
- Search results
- Profile pages
- Detail pages

**WHEN NOT TO USE:**

- Short actions (< 300ms) - show nothing or subtle indicator
- Unpredictable content
- Small components (use spinner)

**REFERENCE:** For implementation → See [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Loading States

---

#### Spinners vs Skeletons

**Use Skeletons When:**

- Layout is predictable
- Loading time > 500ms
- Content has structure (cards, lists)

**Use Spinners When:**

- Layout is unpredictable
- Loading time < 500ms
- Button actions (form submit)
- Small components

**Use Progress Bar When:**

- File upload
- Multi-step process
- Determinate progress (know percentage)

---

#### Image Loading

**✅ DO:**

- **Blur placeholder** (Next.js Image with `placeholder="blur"`)
- **Lazy load** below-fold images
- **WebP format** (30% smaller than JPEG)
- **Responsive images** (srcset for different sizes)
- **Priority loading** for hero images

**❌ DON'T:**

- Blank space while loading (causes CLS)
- Load all images at once
- JPEG for all images (larger files)
- Same image for all screen sizes
- No priority loading (LCP suffers)

**WHY:**

- Images cause 45% of Cumulative Layout Shift
- Lazy loading improves initial page load by 50%
- WebP reduces bandwidth by 30%

**REFERENCE:** For implementation → See [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Image Optimization

---

#### Button Loading States

**✅ DO:**

- **Disable button** during action
- **Show loading indicator** (spinner inside button)
- **Keep button text** or change to "Processing..."
- **Maintain button size** (prevent layout shift)
- **Re-enable on completion** or error

**❌ DON'T:**

- No indication of loading
- Button disappears (confusing)
- Button changes size (causes CLS)
- Leave button disabled after error

**WHY:**

- Clear loading state prevents duplicate submissions
- Maintained size prevents layout shift
- User knows action is processing

**BUTTON LOADING (Good):**

```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Processing...
    </>
  ) : (
    'Book Experience'
  )}
</Button>
```

**BUTTON LOADING (Bad):**

```tsx
<Button disabled={isLoading}>
  Book Experience
</Button>
(No indication that anything is happening)
```

---
