## Device-Specific Features

### iOS Safe Areas

**Handle iPhone notches and home indicator:**

```css
/* globals.css */
.safe-area-inset {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.safe-area-top {
  padding-top: max(1rem, env(safe-area-inset-top));
}

.safe-area-bottom {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

```tsx
// Fixed header
<header className="fixed top-0 w-full bg-background z-50 safe-area-top">
  <nav className="px-4 py-3">
    {/* Nav content */}
  </nav>
</header>

// Fixed bottom navigation
<nav className="fixed bottom-0 w-full bg-background border-t safe-area-bottom">
  <MobileBottomNav />
</nav>
```

---

### Haptic Feedback

**Provide tactile feedback on interactions:**

```tsx
export function useHapticFeedback() {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!('vibrate' in navigator)) return

    const patterns = {
      light: 10,
      medium: 50,
      heavy: 100,
    }

    navigator.vibrate(patterns[type])
  }

  return { triggerHaptic }
}

// Usage
export function FavoriteButton({ experienceId }) {
  const { triggerHaptic } = useHapticFeedback()
  const { mutate: toggleFavorite } = useToggleFavorite()

  const handleClick = () => {
    triggerHaptic('light')
    toggleFavorite(experienceId)
  }

  return (
    <Button onClick={handleClick} variant="ghost" size="icon">
      <Heart className="h-5 w-5" />
    </Button>
  )
}
```

---

