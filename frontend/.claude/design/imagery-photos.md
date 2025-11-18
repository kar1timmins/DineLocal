## Imagery & Photos

### Restaurant Photos

**Required Specifications:**

```tsx
// List view thumbnail
width: 320px
height: 240px
aspect-ratio: 4/3
format: WebP (with JPEG fallback)
quality: 80

// Detail view hero
width: 1200px
height: 675px
aspect-ratio: 16/9
format: WebP (with JPEG fallback)
quality: 85
```

**Next.js Image Component:**

```tsx
// ✅ CORRECT: Optimized, accessible images
<Image
  src="/restaurants/restaurant-hero.jpg"
  alt="Interior of La Trattoria showing rustic wooden tables and warm lighting"
  width={1200}
  height={675}
  className="rounded-lg object-cover"
  priority={false}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>

// ❌ INCORRECT: No alt text, no optimization
<img src="/restaurants/photo.jpg" />
```

### Image Alt Text Guidelines

```tsx
// ✅ CORRECT: Descriptive alt text
alt="Grilled salmon with roasted vegetables and lemon garnish"
alt="Chef Maria preparing fresh pasta in open kitchen"
alt="Outdoor terrace with city skyline view at sunset"

// ❌ INCORRECT: Generic or missing alt text
alt="food"
alt="restaurant"
alt="" (unless truly decorative)
```

### Placeholder Images

```tsx
// Loading skeleton
<Skeleton className="w-full h-60 rounded-lg" />

// Error fallback
<Flex
  className="w-full h-60 bg-muted rounded-lg"
  justifyContent="center"
  alignItems="center"
>
  <ImageOff className="h-8 w-8 text-muted-foreground" />
</Flex>

// Blur-up loading (Next.js)
<Image
  src={imageUrl}
  placeholder="blur"
  blurDataURL={shimmer(700, 475)}
  alt={altText}
/>
```

### Image Quality Guidelines

**DO:**

- ✅ Use WebP format with JPEG fallback
- ✅ Optimize images (max 200KB for thumbnails, 500KB for heroes)
- ✅ Use responsive images with `srcset`
- ✅ Provide descriptive alt text (8-12 words)
- ✅ Use lazy loading for images below the fold
- ✅ Implement blur-up loading for better UX

**DON'T:**

- ❌ Use raw uploads without optimization
- ❌ Forget alt text (accessibility)
- ❌ Use images over 1MB in size
- ❌ Skip aspect ratio (causes layout shift)
- ❌ Use generic filenames (IMG_1234.jpg)

---

