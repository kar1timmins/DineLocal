## Touch Gestures

### Swipe Gestures

**Use Cases:**

- Image galleries (swipe left/right to navigate)
- Card dismissal (swipe to delete/archive)
- Tab navigation (swipe between tabs)

**Implementation:**

```tsx
import { useSwipeable } from 'react-swipeable'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SwipeableGalleryProps {
  images: { src: string; alt: string }[]
}

export function SwipeableGallery({ images }: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((i) => Math.min(i + 1, images.length - 1)),
    onSwipedRight: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    onSwiping: () => setIsSwiping(true),
    onSwiped: () => setIsSwiping(false),
    trackMouse: true, // Also works with mouse drag on desktop
    preventScrollOnSwipe: true, // Prevent vertical scroll during horizontal swipe
    delta: 10, // Minimum distance (px) before swipe is detected
  })

  return (
    <div className="relative">
      {/* Swipeable image container */}
      <div
        {...handlers}
        className={cn(
          'relative overflow-hidden rounded-lg',
          'touch-pan-y', // Allow vertical scrolling
          isSwiping && 'cursor-grabbing'
        )}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />

        {/* Navigation arrows (desktop) */}
        <div className="hidden md:block">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            disabled={currentIndex === 0}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentIndex((i) => Math.min(i + 1, images.length - 1))}
            disabled={currentIndex === images.length - 1}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Pagination dots */}
      <Flex justifyContent="center" className="mt-4 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              'focus:ring-primary focus:ring-2 focus:outline-none',
              i === currentIndex
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
            )}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : 'false'}
          />
        ))}
      </Flex>

      {/* Image counter */}
      <Text className="text-muted-foreground mt-2 text-center text-sm">
        {currentIndex + 1} / {images.length}
      </Text>
    </div>
  )
}
```

**Best Practices:**

- ✅ Provide visual feedback during swipe (cursor change, slight translate)
- ✅ Include pagination dots for context
- ✅ Add fallback buttons for desktop (arrows)
- ✅ Prevent accidental vertical scroll during horizontal swipe
- ✅ Set minimum swipe distance to avoid accidental triggers
- ❌ Don't use swipe for critical actions (use explicit buttons)
- ❌ Don't swipe horizontally if page scrolls horizontally

---

### Long Press (Context Menu)

**Use Cases:**

- Show additional options for a card/item
- Copy text or save images
- Quick actions on list items

**Implementation:**

```tsx
import { useState } from 'react'

export function LongPressCard({ experience }) {
  const [showMenu, setShowMenu] = useState(false)
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null)

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowMenu(true)
      // Haptic feedback (if supported)
      if ('vibrate' in navigator) {
        navigator.vibrate(50)
      }
    }, 500) // 500ms long press duration
    setPressTimer(timer)
  }

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer)
      setPressTimer(null)
    }
  }

  return (
    <>
      <Card
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        className="cursor-pointer transition-transform active:scale-95"
      >
        <CardContent>
          <Heading as="h3">{experience.title}</Heading>
          <Paragraph>{experience.description}</Paragraph>
        </CardContent>
      </Card>

      {/* Context menu (bottom sheet on mobile) */}
      {showMenu && (
        <Sheet open={showMenu} onOpenChange={setShowMenu}>
          <SheetContent side="bottom">
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Experience
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Add to Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Flag className="mr-2 h-4 w-4" />
                Report Issue
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
```

**Best Practices:**

- ✅ 500ms is the standard long-press duration
- ✅ Provide haptic feedback (vibration) when menu appears
- ✅ Clear timer on touch end to prevent accidental triggers
- ✅ Show visual indicator during long press (scale animation)
- ❌ Don't use long-press for primary actions
- ❌ Don't require long-press without alternative (accessibility)

---
