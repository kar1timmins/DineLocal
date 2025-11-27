# Image Accessibility Audit Report

**Date:** 2025-01-22
**Scope:** All Next.js Image components and HTML img tags in `/src`
**Reference:** [Image Accessibility Standards](./images.md)

---

## Executive Summary

**Total Images Found:** 2 Image instances in 1 component
**Components Using Images:** 1
**HTML `<img>` Tags:** 0 (✅ Good - all using Next.js Image)

**Overall Status:** 🟡 Partially Compliant

**Priority Fixes Needed:**

- [ ] Improve alt text (2 instances)
- [ ] Add `sizes` prop (2 instances)
- [ ] Implement loading strategies (2 instances)
- [ ] Differentiate first 3 cards with `loading="eager"`

---

## Detailed Audit

### ✅ Compliant Components

**None** - All components need improvements

---

### 🟡 Partially Compliant Components

#### 1. ExperienceCard.tsx

**File:** `/src/features/experiences/components/ExperienceCard.tsx`

**Usage:** Displays experience images in search results, homepage, host dashboard

**Images Found:** 2 instances (comfortable + compact layouts)

##### Comfortable Layout Image (Lines 76-82)

```tsx
<div className="relative h-[220px] overflow-hidden md:h-[240px]">
  <Image
    src={image}
    alt={name}
    fill
    className="object-cover transition-transform group-hover:scale-105"
  />
</div>
```

**Compliance Checklist:**

- [x] ✅ Using Next.js Image component
- [x] ✅ Width/height specified (using `fill`)
- [x] ✅ Alt text provided
- [ ] ❌ **Alt text not descriptive** - Currently just `{name}`, should be `{cuisine} - {dish description}`
- [ ] ❌ **Missing `sizes` prop** - Should specify responsive sizes
- [ ] ❌ **Missing loading strategy** - Defaults to lazy, but first 3 should be eager
- [x] ✅ Object-fit appropriate (`object-cover`)
- [ ] ⚠️ **No quality prop** - Using default (75), should be 85 for main images

**Priority:** 🔴 High (Above-the-fold on search page)

**Recommended Fix:**

```tsx
<Image
  src={image}
  alt={`${experience.cuisine} - ${experience.description}`}
  fill
  className="object-cover transition-transform group-hover:scale-105"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading={cardIndex < 3 ? 'eager' : 'lazy'}
  quality={85}
/>
```

##### Compact Layout Image (Line 151)

```tsx
<div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-md">
  <Image src={image} alt={name} fill className="object-cover" />
</div>
```

**Compliance Checklist:**

- [x] ✅ Using Next.js Image component
- [x] ✅ Fixed dimensions (100x100px)
- [x] ✅ Alt text provided
- [ ] ❌ **Alt text not descriptive** - Same issue as comfortable layout
- [ ] ❌ **Missing `sizes` prop** - Should be `100px`
- [ ] ❌ **Missing loading strategy** - Should be eager for drawer/command results
- [x] ✅ Object-fit appropriate (`object-cover`)

**Priority:** 🟡 Medium (Used in mobile drawer/command)

**Recommended Fix:**

```tsx
<Image
  src={image}
  alt={`${experience.cuisine} - ${experience.description}`}
  fill
  className="object-cover"
  sizes="100px"
  loading="eager"
/>
```

---

## Priority Fixes

### 🔴 High Priority

**Location:** ExperienceCard.tsx - Comfortable layout (search page)

**Issues:**

1. Alt text not descriptive enough
2. Missing `sizes` prop for responsive optimization
3. No loading strategy differentiation for first 3 cards

**Impact:**

- **Accessibility:** Screen reader users don't get meaningful image descriptions
- **Performance:** Missing `sizes` means Next.js can't optimize image selection
- **LCP:** First 3 cards should load eagerly to improve Largest Contentful Paint

**Fix:** Update ExperienceCard to accept optional `cardIndex` prop for loading strategy

---

### 🟡 Medium Priority

**Location:** ExperienceCard.tsx - Compact layout (mobile drawer/command)

**Issues:**

1. Alt text not descriptive
2. Missing `sizes` prop

**Impact:**

- **Accessibility:** Same alt text issue
- **Performance:** Less critical (small images), but should still optimize

---

## Implementation Plan

### Phase 1: Update ExperienceCard Component

**File:** `/src/features/experiences/components/ExperienceCard.tsx`

**Changes:**

1. **Add `cardIndex` prop:**

```tsx
export interface ExperienceCardProps {
  experience: ExperienceItem
  layout?: 'compact' | 'comfortable'
  showHeart?: boolean
  onFavoriteClick?: (id: string) => void
  onClick?: () => void
  className?: string
  cardIndex?: number // NEW: For loading strategy
}
```

2. **Improve alt text:**

```tsx
// Create descriptive alt text
const altText = `${experience.cuisine} - ${experience.name}`
```

3. **Add loading strategy:**

```tsx
// Determine loading strategy
const shouldEagerLoad = cardIndex !== undefined && cardIndex < 3
const loadingStrategy = shouldEagerLoad ? 'eager' : 'lazy'
```

4. **Update comfortable layout Image:**

```tsx
<Image
  src={image}
  alt={altText}
  fill
  className="object-cover transition-transform group-hover:scale-105"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading={loadingStrategy}
  quality={85}
/>
```

5. **Update compact layout Image:**

```tsx
<Image
  src={image}
  alt={altText}
  fill
  className="object-cover"
  sizes="100px"
  loading="eager" // Always eager in drawer/command (immediate visibility)
/>
```

### Phase 2: Update Component Usage

**Files to update:**

- `/src/app/search/SearchPageContent.tsx` - Pass `cardIndex` when mapping experiences
- `/src/features/guest-navbar/components/ExperienceSearchResults.tsx` - Pass `cardIndex` for search results
- Any other components rendering ExperienceCard

**Example:**

```tsx
experiences.map((exp, index) => (
  <ExperienceCard
    key={exp.id}
    experience={exp}
    cardIndex={index} // Pass index for loading strategy
  />
))
```

---

## Verification Checklist

After implementing fixes:

- [ ] Alt text reads naturally with screen reader (test with VoiceOver/NVDA)
- [ ] First 3 cards load eagerly (check Network tab)
- [ ] Remaining cards lazy load as user scrolls
- [ ] `sizes` prop generates appropriate srcset (check Inspect Element)
- [ ] No console warnings about missing image props
- [ ] LCP improved (check Lighthouse)
- [ ] No layout shift (CLS < 0.1)

---

## Additional Recommendations

### Future Images (When Added)

When adding new images to the app:

1. **Always use Next.js Image component** (never `<img>`)
2. **Reference the standards:** [Image Accessibility Guide](./images.md)
3. **Follow the patterns:**
   - Hero images: `priority={true}`, `quality={90}`
   - Above-fold cards: `loading="eager"`
   - Below-fold: `loading="lazy"` (default)
4. **Descriptive alt text:** Describe content, not filename
5. **Always include `sizes` prop** for responsive images

### Potential Enhancements

1. **Create AccessibleImage wrapper component** (Optional)
   - Enforces accessibility standards
   - Smart loading strategies based on viewport position
   - TypeScript-enforced required alt text

2. **Add image loading skeleton** (UX improvement)
   - Show skeleton while images load
   - Prevents layout shift perception
   - Better user experience

---

## Resources

- [Image Accessibility Standards](./images.md)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WCAG 2.2 Images](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [Core Web Vitals](https://web.dev/vitals/)
