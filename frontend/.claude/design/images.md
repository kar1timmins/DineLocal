# Image Accessibility & Optimization Standards

## Overview

This document defines standards for images across the DineLocal application to ensure accessibility (WCAG 2.2 AA), performance (Core Web Vitals 2025), and consistent user experience.

---

## Quick Reference

### Default Image Component

```tsx
import Image from 'next/image'

// Standard pattern
;<Image
  src="/images/example.jpg"
  alt="Descriptive text explaining the image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Loading Strategies

| Location                      | Strategy | Code                       |
| ----------------------------- | -------- | -------------------------- |
| Above-the-fold (hero, navbar) | Priority | `priority={true}`          |
| First 3-4 cards               | Eager    | `loading="eager"`          |
| Everything else               | Lazy     | `loading="lazy"` (default) |

---

## 1. Alt Text Guidelines

### Principle

**Alt text should describe the content and function of the image, not just state what it is.**

### Rules

#### A. Informative Images

Images that convey information require descriptive alt text.

```tsx
// ✅ GOOD - Descriptive
<Image
  src="/images/italian-pasta.jpg"
  alt="Homemade penne pasta with tomato sauce and parmesan cheese"
  width={800}
  height={600}
/>

// ❌ BAD - Too generic
<Image
  src="/images/italian-pasta.jpg"
  alt="Pasta"
  width={800}
  height={600}
/>

// ❌ BAD - Redundant
<Image
  src="/images/italian-pasta.jpg"
  alt="Image of pasta" // Don't say "image of" or "picture of"
  width={800}
  height={600}
/>
```

#### B. Decorative Images

Images that are purely decorative (don't add information) should have empty alt text.

```tsx
// ✅ GOOD - Decorative background
<Image src="/images/decorative-pattern.svg" alt="" aria-hidden="true" width={100} height={100} />
```

#### C. Functional Images (Buttons, Links)

Images that serve as buttons or links should describe the action.

```tsx
// ✅ GOOD - Describes action
<button aria-label="Add to favorites">
  <Image src="/icons/heart.svg" alt="" width={24} height={24} />
</button>

// Alternative: Use aria-label on parent, empty alt on image
```

#### D. Complex Images (Charts, Diagrams)

Provide both alt text (summary) and long description.

```tsx
<figure>
  <Image
    src="/images/pricing-chart.png"
    alt="Price comparison showing DineLocal 20% cheaper than competitors"
    width={800}
    height={400}
  />
  <figcaption>Detailed comparison: DineLocal €45, Competitor A €55, Competitor B €60</figcaption>
</figure>
```

### Context-Specific Alt Text Patterns

| Image Type      | Alt Text Pattern                     | Example                                      |
| --------------- | ------------------------------------ | -------------------------------------------- |
| Experience card | `{cuisine} - {dish description}`     | "Italian - Homemade pasta with tomato sauce" |
| Host avatar     | `{host name}`                        | "Maria Rossi"                                |
| Venue photo     | `{venue name} - {room/area}`         | "Cozy Italian Kitchen - dining area"         |
| Food close-up   | `{dish name} with {key ingredients}` | "Sushi platter with salmon, tuna, and eel"   |
| Decorative      | Empty `alt=""`                       | ""                                           |

---

## 2. Loading Strategy Standards

### Priority Levels

#### High Priority (Above-the-Fold)

**Load immediately, block rendering**

```tsx
<Image priority={true} src="/images/hero.jpg" alt="..." width={1920} height={1080} />
```

**When to use:**

- Hero images
- Navbar logo
- First visible content

**Impact:** Improves LCP (Largest Contentful Paint)

#### Eager Loading

**Load immediately, don't block rendering**

```tsx
<Image loading="eager" src="/images/card-1.jpg" alt="..." width={800} height={600} />
```

**When to use:**

- First 3-4 experience cards
- Important above-the-fold images
- Images user will likely interact with immediately

#### Lazy Loading (Default)

**Load when entering viewport**

```tsx
<Image
  loading="lazy" // or omit (default)
  src="/images/card-10.jpg"
  alt="..."
  width={800}
  height={600}
/>
```

**When to use:**

- Everything else
- Images below the fold
- Pagination/infinite scroll content

**Impact:** Reduces initial page load, saves bandwidth

---

## 3. Image Optimization Standards

### File Formats

| Format   | Use Case                       | Quality  | Notes                                  |
| -------- | ------------------------------ | -------- | -------------------------------------- |
| **WebP** | Photos, complex images         | 80-85%   | Primary format (Next.js auto-converts) |
| **PNG**  | Logos, icons with transparency | Lossless | Small file size                        |
| **SVG**  | Icons, logos, simple graphics  | N/A      | Scalable, tiny file size               |
| **JPEG** | Fallback for photos            | 85%      | Compatibility                          |

### Responsive Images (`sizes` prop)

**Always provide `sizes` for responsive images:**

```tsx
<Image
  src="/images/experience.jpg"
  alt="..."
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**Common patterns:**

```tsx
// Full width on mobile, 50% on tablet, 33% on desktop
sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

// Hero image (always full width)
sizes = '100vw'

// Avatar (fixed size)
sizes = '48px'

// Experience card grid
// Mobile: 1 column (100vw)
// Tablet: 2 columns (50vw)
// Desktop: 3-4 columns (33vw)
sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
```

### Quality Settings

```tsx
// Default quality (recommended)
<Image quality={85} ... />

// High quality (hero images)
<Image quality={90} ... />

// Lower quality (thumbnails, avatars)
<Image quality={75} ... />
```

### Aspect Ratio & Image Sizing Standards (Industry Research)

**Principle:** Use aspect ratios and sizing that align with food delivery marketplace standards (Deliveroo, UberEats, DoorDash).

#### Research-Backed Recommendations (2024-2025)

**Deliveroo:**
- Upload format: 16:9 (1920×1080px minimum)
- Mobile display: **Cropped to 1:1 square** (1080×1080 safe zone)
- Philosophy: "Always have the core of the image within the 1080×1080 box"

**UberEats:**
- Profile photos: 16:9 (1920×1080px)
- Menu items: **5:4 portrait** (2880×2304px)

**Industry Consensus:**
> "Square cards look better on mobile devices, while rectangular cards work best for web apps or sites." - UX Industry Standard 2024

#### DineLocal Implementation

| Layout      | Context                    | Sizing Approach           | Rationale                                    |
| ----------- | -------------------------- | ------------------------- | -------------------------------------------- |
| Compact     | Mobile sheet, command      | **140px width, flex height** | Matches text height, industry-aligned     |
| Comfortable | Desktop /search page       | 220-240px height (4:3+)   | Flexible for grid layouts                    |
| Avatar      | Profile images             | 48×48px (1:1)             | Universal circular standard                  |
| Hero        | Landing page, banners      | 1920×1080 (16:9)          | Cinematic, full-width impact                 |

**Why 140px Fixed Width + Flexible Height for Compact:**
- ✅ **Visual balance**: Image height automatically matches text content height (~140px typical)
- ✅ **Space-efficient**: ~37% image width, ~63% text (industry standard 35-40%/60-65%)
- ✅ **Consistent**: Works across all screen sizes and content lengths
- ✅ **Aligns with expectations**: Matches Deliveroo/UberEats mobile patterns
- ✅ **Prevents imbalance**: No fixed square causing vertical mismatch with variable text
- ✅ **Browsing-optimized**: Better for discovery behavior vs. specific search

**Research Sources:**
- Deliveroo Image Guidelines (2024): 16:9 upload, 1:1 display, 1080×1080 safe zone
- UberEats Menu Guidelines (2024): 5:4 portrait ratio (2880×2304)
- Nielsen Norman Group: Card-based designs optimize for browsing scenarios
- Food delivery app study (2024): High-quality visuals increase engagement by 40%

### Border Radius Standards (Premium Feel)

**Principle:** Consistent, premium border radius creates visual hierarchy and polish.

#### Card Containers

| Layout      | Border Radius | Tailwind Class | Use Case                           |
| ----------- | ------------- | -------------- | ---------------------------------- |
| Comfortable | 16px          | `rounded-2xl`  | Desktop grids, /search page        |
| Compact     | 8px           | `rounded-lg`   | Mobile lists, drawer/command       |
| Minimal     | 8px           | `rounded-lg`   | Dense layouts, admin panels        |
| Subtle      | 6px           | `rounded-md`   | Thumbnails, small cards            |

#### Image Containers (Within Cards)

| Context     | Border Radius | Tailwind Class | Notes                                  |
| ----------- | ------------- | -------------- | -------------------------------------- |
| Comfortable | Inherit       | None           | Parent card already has `rounded-2xl`  |
| Compact     | 4px           | `rounded-md`   | Subtle corners within compact card     |
| Avatar      | Full circle   | `rounded-full` | Always circular for profile images     |
| Thumbnail   | 6px           | `rounded-md`   | Small previews, gallery grids          |

#### Implementation Examples

```tsx
// Comfortable layout (Desktop /search page)
<div className="group rounded-2xl border overflow-hidden">
  {/* Image inherits rounded corners from parent overflow-hidden */}
  <div className="relative h-[240px]">
    <Image src={...} alt={...} fill className="object-cover" />
  </div>
</div>

// Compact layout (Mobile, drawer/command) - Flexible height
<div className="group flex items-stretch gap-4 rounded-lg border p-3">
  {/* Image: 140px width, flexible height (matches text content) */}
  <div className="relative w-[140px] flex-shrink-0 rounded-md overflow-hidden">
    <Image src={...} alt={...} fill className="object-cover" sizes="140px" />
  </div>
  <div className="flex flex-1 flex-col gap-3">
    {/* Text content drives the height */}
  </div>
</div>

// Avatar (Always circular)
<div className="relative h-12 w-12 rounded-full overflow-hidden">
  <Image src={host.avatar} alt={host.name} fill className="object-cover" />
</div>
```

#### UX Rationale

- **16px (`rounded-2xl`)**: Premium, spacious feeling - ideal for comfortable desktop layouts
- **8px (`rounded-lg`)**: Balanced - works well for compact mobile layouts and card containers
- **4px (`rounded-md`)**: Subtle rounding - good for images within already-rounded containers
- **Full circle**: Always use for avatars/profile images (universal pattern)

### Modern Image Formats (2025)

**Next-generation formats offer 25-35% better compression than JPEG while maintaining visual quality.**

#### Format Comparison

| Format   | Compression vs JPEG | Browser Support 2025   | Use Case                |
| -------- | ------------------- | ---------------------- | ----------------------- |
| **AVIF** | -30% (best)         | Chrome, Firefox, Safari 16+ | Primary (if supported)  |
| **WebP** | -25%                | Universal              | Fallback for AVIF       |
| **JPEG** | Baseline            | Universal              | Final fallback          |

#### Next.js Automatic Format Conversion

**Next.js automatically serves WebP/AVIF when the browser supports it!**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // ✅ Enable modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

**How it works:**
1. You provide a JPEG/PNG source
2. Next.js converts to AVIF/WebP automatically
3. Browser receives the best format it supports
4. No code changes needed in components!

#### Manual Format Control (Advanced)

**For maximum control, use the `<picture>` element:**

```tsx
<picture>
  {/* AVIF - smallest file, newest browsers */}
  <source srcSet="/images/hero.avif" type="image/avif" />

  {/* WebP - smaller file, universal support */}
  <source srcSet="/images/hero.webp" type="image/webp" />

  {/* JPEG - fallback for older browsers */}
  <Image
    src="/images/hero.jpg"
    alt="Authentic home dining experience"
    width={1920}
    height={1080}
    quality={85}
  />
</picture>
```

#### Format Selection Decision Tree

```
Is the image dynamic (from API/database)?
├─ Yes → Use Next.js Image with automatic conversion ✅
└─ No (static asset) →
   ├─ Need maximum optimization → Use <picture> with AVIF/WebP/JPEG
   └─ Standard optimization → Use Next.js Image (auto-converts)
```

#### Backend Recommendations (Future Enhancement)

**For API-served images, recommend CDN with automatic format conversion:**

- **Cloudinary**: Automatic AVIF/WebP delivery based on browser
- **Imgix**: Format parameter (`?fm=avif`)
- **Cloudflare Images**: Automatic format selection
- **Self-hosted**: Use Sharp library to pre-generate AVIF/WebP variants

**Example API response with multiple formats:**

```json
{
  "image": {
    "avif": "https://cdn.dinelocal.com/experiences/123.avif",
    "webp": "https://cdn.dinelocal.com/experiences/123.webp",
    "jpeg": "https://cdn.dinelocal.com/experiences/123.jpg"
  }
}
```

#### Performance Impact

**Real-world compression savings:**

| Original JPEG | WebP     | AVIF     | Savings  |
| ------------- | -------- | -------- | -------- |
| 500KB         | 375KB    | 350KB    | -30%     |
| 200KB         | 150KB    | 140KB    | -30%     |
| 100KB         | 75KB     | 70KB     | -30%     |

**Result:** Faster load times, lower bandwidth costs, better Core Web Vitals (LCP).

### Placeholder & Loading UX

**Principle:** Show placeholders while images load to improve perceived performance and reduce layout shift (CLS).

#### Technique Comparison

| Technique   | File Size | Quality | Backend Required | Use Case                |
| ----------- | --------- | ------- | ---------------- | ----------------------- |
| BlurHash    | ~20 bytes | High    | Yes              | Dynamic API images      |
| LQIP        | ~1-2KB    | Medium  | Yes              | Static assets           |
| Solid Color | 0 bytes   | Low     | No               | Simple placeholders     |
| Shimmer     | 0 bytes   | N/A     | No               | Loading skeleton states |

#### 1. BlurHash (Recommended for API Images)

**Best for:** Dynamic images from API/database (experience photos, host avatars)

**How it works:**
1. Backend generates tiny blur hash on image upload (~20 bytes)
2. Store blur hash in database alongside image URL
3. Frontend decodes blur hash and displays blurred preview
4. Replace with actual image when loaded

**Implementation:**

```bash
# Install dependencies
pnpm add blurhash react-blurhash
```

```typescript
// API response includes blur hash
interface ExperienceImage {
  url: string
  blurHash: string // "LGF5]+Yk^6#M@-5c,1J5@[or[Q6."
  width: number
  height: number
}

// Component usage
import { Blurhash } from 'react-blurhash'

export function ExperienceCard({ experience }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative h-[240px]">
      {/* Blur placeholder */}
      {!imageLoaded && (
        <Blurhash
          hash={experience.image.blurHash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}

      {/* Actual image */}
      <Image
        src={experience.image.url}
        alt={experience.name}
        fill
        className={cn('object-cover transition-opacity', imageLoaded ? 'opacity-100' : 'opacity-0')}
        onLoad={() => setImageLoaded(true)}
        quality={85}
      />
    </div>
  )
}
```

**Backend Example (Generate BlurHash):**

```typescript
// Using Sharp + BlurHash
import sharp from 'sharp'
import { encode } from 'blurhash'

async function generateBlurHash(imagePath: string): Promise<string> {
  const image = await sharp(imagePath)
    .raw()
    .ensureAlpha()
    .resize(32, 32, { fit: 'inside' })
    .toBuffer({ resolveWithObject: true })

  return encode(
    new Uint8ClampedArray(image.data),
    image.info.width,
    image.info.height,
    4,
    4
  )
}

// Store in database
{
  imageUrl: 'https://cdn.dinelocal.com/experience-123.jpg',
  blurHash: 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
}
```

#### 2. LQIP (Low Quality Image Placeholder)

**Best for:** Static assets, hero images

**How it works:**
1. Generate ultra-low-quality version of image (~1-2KB)
2. Inline as base64 or serve separately
3. Display blurred while actual image loads

**Next.js Implementation:**

```tsx
import Image from 'next/image'

// Static import automatically generates blur placeholder
import heroImage from '@/public/images/hero.jpg'

<Image
  src={heroImage}
  alt="Hero image"
  placeholder="blur" // ✅ Next.js generates LQIP automatically
  quality={90}
/>
```

**For external images (requires blurDataURL):**

```tsx
<Image
  src="https://api.dinelocal.com/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Backend provides
  quality={90}
/>
```

#### 3. Solid Color Placeholder (Simplest)

**Best for:** Quick implementation, minimal complexity

```tsx
<div className="relative h-[240px] bg-muted">
  <Image
    src={image}
    alt={alt}
    fill
    className="object-cover"
    quality={85}
  />
</div>
```

#### 4. Shimmer/Skeleton (Loading States)

**Best for:** Cards, lists, grids (when data hasn't loaded yet)

```tsx
// Loading skeleton for experience card
export function ExperienceCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border p-4">
      <div className="h-[240px] bg-muted rounded-xl" />
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>
    </div>
  )
}
```

#### Performance Impact

**Medium.com case study:** 25% decrease in initial page load time with lazy loading + placeholders.

**Benefits:**
- ✅ Improves perceived performance (users see something immediately)
- ✅ Reduces CLS (Cumulative Layout Shift) - layout doesn't jump
- ✅ Better UX on slow connections

#### Implementation Priority

1. **Immediate:** Solid color placeholders (easiest)
2. **Short-term:** Shimmer skeletons for loading states
3. **Medium-term:** BlurHash for API images (requires backend)
4. **Long-term:** LQIP for all static assets

---

## 4. Accessibility Checklist

### Before Adding Any Image

- [ ] **Alt text provided** (or explicitly empty if decorative)
- [ ] **Alt text is descriptive** (not "image of..." or filename)
- [ ] **Loading strategy chosen** (priority, eager, or lazy)
- [ ] **Width & height specified** (prevents layout shift - CLS)
- [ ] **Sizes prop provided** (for responsive images)
- [ ] **Quality setting appropriate** (default 85%)
- [ ] **Decorative images hidden from screen readers** (`aria-hidden="true"`)

### For Functional Images (Buttons, Links)

- [ ] **Parent element has aria-label**
- [ ] **Image has empty alt** (to avoid duplication)
- [ ] **Focus indicator visible** (keyboard navigation)
- [ ] **Touch target ≥48px** (mobile accessibility)

### For Complex Images

- [ ] **Alt text summarizes key info**
- [ ] **Long description provided** (figcaption, adjacent text)
- [ ] **Data table alternative** (if chart/graph)

---

## 5. Common Patterns

### Experience Card Image

**Compact Layout (Mobile sheet, Desktop command):**
```tsx
// Horizontal card with flexible height image
<div className="flex items-stretch gap-4 rounded-lg border p-3">
  {/* Image: 140px width, flexible height (matches text) */}
  <div className="relative w-[140px] flex-shrink-0 overflow-hidden rounded-md">
    <Image
      src={experience.image}
      alt={`${experience.cuisine} - ${experience.description}`}
      fill
      className="object-cover"
      sizes="140px"
      loading="lazy" // or "eager" for first 3 cards
      quality={85}
    />
  </div>
  <div className="flex flex-1 flex-col gap-3">
    {/* Text content */}
  </div>
</div>
```

**Comfortable Layout (Desktop /search page grid):**
```tsx
<div className="relative h-[220px] overflow-hidden md:h-[240px]">
  <Image
    src={experience.image}
    alt={`${experience.cuisine} - ${experience.description}`}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy" // or "eager" for first 3 cards
    quality={85}
  />
</div>
```

### Avatar

```tsx
<div className="relative h-12 w-12 overflow-hidden rounded-full">
  <Image src={host.avatar} alt={host.name} fill className="object-cover" sizes="48px" />
</div>
```

### Hero Image

```tsx
<div className="relative h-[400px] md:h-[600px]">
  <Image
    src="/images/hero.jpg"
    alt="Authentic home dining experiences connecting hosts and guests"
    fill
    className="object-cover"
    sizes="100vw"
    priority={true}
    quality={90}
  />
</div>
```

### Decorative Image

```tsx
<Image
  src="/images/pattern-bg.svg"
  alt=""
  aria-hidden="true"
  width={1920}
  height={1080}
  className="opacity-10"
/>
```

---

## 6. Performance Targets

### Core Web Vitals 2025

| Metric                              | Target | Image Impact                   |
| ----------------------------------- | ------ | ------------------------------ |
| **LCP** (Largest Contentful Paint)  | <2.5s  | Use `priority` for hero images |
| **CLS** (Cumulative Layout Shift)   | <0.1   | Always specify width/height    |
| **INP** (Interaction to Next Paint) | <200ms | Use lazy loading               |

### Image Size Limits

| Type            | Max File Size | Recommended Size   |
| --------------- | ------------- | ------------------ |
| Hero            | 300KB         | 1920x1080px        |
| Experience card | 150KB         | 800x600px          |
| Avatar          | 30KB          | 200x200px          |
| Icon            | 10KB          | 24x24px to 48x48px |

---

## 7. Testing

### Accessibility Testing

```bash
# Run axe DevTools in browser
# Check for:
# - Missing alt text
# - Redundant alt text (filename, "image of")
# - Color contrast on text overlays
```

### Performance Testing

```bash
# Lighthouse CI
npx lighthouse <url> --view

# Check:
# - Image format (WebP)
# - Properly sized images
# - Lazy loading implemented
# - Priority loading for hero
```

### Screen Reader Testing

1. **VoiceOver (macOS):** `Cmd + F5`
2. **NVDA (Windows):** Free download
3. **Test:** Navigate through images, ensure alt text reads correctly

---

## 8. Anti-Patterns (Don't Do This)

### ❌ Missing Alt Text

```tsx
// ❌ BAD - Screen readers can't interpret
<Image src="/food.jpg" width={800} height={600} />
```

### ❌ Filename as Alt Text

```tsx
// ❌ BAD - Not descriptive
<Image src="/IMG_1234.jpg" alt="IMG_1234" width={800} height={600} />
```

### ❌ Redundant Alt Text

```tsx
// ❌ BAD - Says "image" twice
<Image src="/pasta.jpg" alt="Image of pasta dish" width={800} height={600} />
```

### ❌ Missing Width/Height

```tsx
// ❌ BAD - Causes layout shift (CLS)
<Image src="/hero.jpg" alt="..." />
```

### ❌ All Images Priority

```tsx
// ❌ BAD - Defeats the purpose
<Image priority={true} src="/card-50.jpg" alt="..." />
```

### ❌ Lazy Load Above-the-Fold

```tsx
// ❌ BAD - Delays LCP
<Image loading="lazy" src="/hero.jpg" alt="..." />
```

---

## 9. Migration Checklist

### Audit Existing Images

1. Search for all `<Image>` components
2. Check alt text quality
3. Verify loading strategies
4. Update as needed

### Priority Order

1. **High Priority:** Hero images, navbar
2. **Medium Priority:** First 3 experience cards
3. **Low Priority:** Below-the-fold content

---

## 10. Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WCAG 2.2 Images](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [WebAIM Alt Text Guide](https://webaim.org/techniques/alttext/)
- [Core Web Vitals](https://web.dev/vitals/)
- [BlurHash](https://blurha.sh/)
- [Image Optimization 2025 Guide](https://aibudwp.com/image-optimization-in-2025-webp-avif-srcset-and-preload/)

---

## 11. AI Assistant Implementation Rules

**For AI assistants creating or reviewing image components in DineLocal.**

### Before Creating ANY Component with Images

**MANDATORY Pre-Implementation Checklist:**

- [ ] Read this entire document (`/design/images.md`)
- [ ] Check existing patterns in `/features/experiences/components/ExperienceCard.tsx`
- [ ] Identify layout context: Comfortable (desktop) vs Compact (mobile)
- [ ] Determine loading strategy based on viewport position
- [ ] Plan border radius based on context
- [ ] Verify alt text pattern matches use case

### When Creating a New Image Component

#### Step 1: Determine Context

```typescript
// Ask yourself:
// 1. Where is this component used? (Hero, card, avatar, thumbnail)
// 2. Is it above-the-fold? (Priority loading)
// 3. Is it in a list? (First 3 eager, rest lazy)
// 4. Desktop or mobile layout? (Border radius varies)
```

#### Step 2: Apply Standards Template

```tsx
// ✅ REQUIRED: Use this template for all image components
import Image from 'next/image'

interface [ComponentName]Props {
  image: string
  alt: string // NEVER optional!
  // ... other props
}

export function [ComponentName]({ image, alt }: [ComponentName]Props) {
  return (
    <div className="relative h-[Xpx] overflow-hidden rounded-[size]">
      <Image
        src={image}
        alt={alt} // ✅ Descriptive, not filename
        fill
        className="object-cover"
        sizes="..." // ✅ ALWAYS provide for responsive
        loading="..." // ✅ Choose: priority, eager, or lazy
        quality={85} // ✅ Default 85, hero 90, thumbnails 75
      />
    </div>
  )
}
```

#### Step 3: Border Radius & Image Sizing Decision Tree

```
What layout is this?
├─ Comfortable (Desktop grid) → Card: rounded-2xl, Image: inherit
├─ Compact (Mobile/command) → Card: rounded-lg, Image: w-[140px] flex-height, rounded-md
├─ Avatar → rounded-full
└─ Thumbnail → rounded-md
```

#### Step 4: Loading Strategy Decision Tree

```
Where is the image?
├─ Hero/above-fold → priority={true}
├─ First 3 cards → loading="eager"
└─ Everything else → loading="lazy"
```

#### Step 5: Alt Text Pattern Matching

```typescript
// ✅ Use context-specific patterns from Section 1
const altPatterns = {
  experienceCard: `${cuisine} - ${description}`, // "Italian - Homemade pasta"
  hostAvatar: host.name, // "Maria Rossi"
  venuePhoto: `${venue} - ${area}`, // "Cozy Kitchen - dining area"
  decorative: '', // Empty for decorative
}
```

### Code Review Checklist (AI Self-Review)

**Before submitting code, verify:**

#### ✅ Required Properties

- [ ] `src` provided
- [ ] `alt` is **descriptive** (not filename, not "image of...")
- [ ] `width` & `height` OR `fill` specified (prevents CLS)
- [ ] `sizes` prop for responsive images
- [ ] `quality` set (default 85)
- [ ] `loading` strategy chosen

#### ✅ Border Radius

- [ ] Matches layout context (comfortable/compact)
- [ ] Card container has appropriate `rounded-*`
- [ ] Image container has correct nesting radius

#### ✅ Accessibility

- [ ] Alt text follows patterns from Section 1
- [ ] Decorative images have `alt=""` AND `aria-hidden="true"`
- [ ] Functional images (buttons) have `aria-label` on parent

#### ✅ Performance

- [ ] Loading strategy appropriate for position
- [ ] Quality setting appropriate for use case
- [ ] Image size optimized (check Section 6 limits)

### Common Mistakes to Avoid

#### ❌ Don't Copy-Paste Without Context

```tsx
// ❌ BAD - Blindly copied from ExperienceCard
<div className="rounded-2xl"> // Wrong! This might be compact layout
  <Image loading="eager" ... /> // Wrong! This might be card #50
</div>

// ✅ GOOD - Context-aware
<div className={cn(
  layout === 'comfortable' ? 'rounded-2xl' : 'rounded-xl'
)}>
  <Image loading={cardIndex < 3 ? 'eager' : 'lazy'} ... />
</div>
```

#### ❌ Don't Skip Alt Text Thinking

```tsx
// ❌ BAD - Generic/lazy
<Image alt="Food" ... />
<Image alt={experience.name} ... /> // Just the name, no context

// ✅ GOOD - Descriptive
<Image alt={`${experience.cuisine} - ${experience.description}`} ... />
```

#### ❌ Don't Hardcode Values

```tsx
// ❌ BAD - Magic numbers
<div className="rounded-xl"> // Why xl? Document it or use variable

// ✅ GOOD - Documented pattern
<div className="rounded-xl"> {/* Compact layout standard: 12px */}
```

### Implementation Priority for New Components

1. **MUST HAVE (Implement immediately):**
   - Descriptive alt text
   - Width/height or fill
   - Quality setting
   - Loading strategy
   - Border radius (context-appropriate)

2. **SHOULD HAVE (Next iteration):**
   - Solid color placeholder
   - Shimmer skeleton for loading state

3. **NICE TO HAVE (Future enhancement):**
   - BlurHash integration (requires backend)
   - WebP/AVIF format optimization

### When to Escalate/Ask Questions

**Ask the user for clarification if:**

- Image layout context is ambiguous (comfortable vs compact?)
- Loading priority is unclear (above-fold vs below?)
- Alt text pattern doesn't match existing patterns
- Border radius doesn't fit established contexts

**DO NOT blindly implement - ask first!**

### Template: New Image Component Checklist

```markdown
## Creating [ComponentName]

**Context:**
- Layout: [Comfortable | Compact | Avatar | Thumbnail]
- Position: [Above-fold | First 3 cards | Below-fold]
- Use case: [Card | Hero | Avatar | Thumbnail | Decorative]

**Standards Applied:**
- Border radius: `rounded-[size]` because [reason]
- Loading: `[priority | eager | lazy]` because [reason]
- Quality: `[75 | 85 | 90]` because [reason]
- Alt pattern: [pattern] because [reason]

**Implementation:**
[Code here]

**Self-Review:**
- [x] All required props
- [x] Alt text descriptive
- [x] Border radius matches context
- [x] Loading strategy appropriate
- [x] Performance optimized
```

### Example: Creating a HostAvatar Component

```tsx
/**
 * HostAvatar - Displays host profile image
 *
 * Context: Avatar (circular, small)
 * Position: Varies (card, header, etc.)
 * Loading: Lazy (not critical)
 * Border: rounded-full (avatar standard)
 */
interface HostAvatarProps {
  name: string
  avatar: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-8 w-8', // 32px
  md: 'h-12 w-12', // 48px - default
  lg: 'h-16 w-16', // 64px
}

export function HostAvatar({ name, avatar, size = 'md' }: HostAvatarProps) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', sizeMap[size])}>
      <Image
        src={avatar}
        alt={name} // ✅ Alt text = host name (pattern from Section 1)
        fill
        className="object-cover"
        sizes={size === 'sm' ? '32px' : size === 'md' ? '48px' : '64px'}
        loading="lazy" // ✅ Not critical, lazy load
        quality={75} // ✅ Small size, can use lower quality
      />
    </div>
  )
}
```

### Final Reminder

**Every image component MUST:**
1. Have descriptive alt text
2. Prevent layout shift (width/height or fill)
3. Use appropriate loading strategy
4. Match design system border radius
5. Be accessible (WCAG 2.2 AA)

**When in doubt, refer to existing `ExperienceCard.tsx` as the reference implementation.**

---

## Questions?

For questions or clarification, refer to:

- [Accessibility Guide](./accessibility.md)
- [Performance Guide](./performance.md)
- [Component Guidelines](../components/component-patterns.md)
