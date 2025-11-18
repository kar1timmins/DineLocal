## Mobile Testing Guidelines

### Essential Test Devices

**Minimum test matrix:**

| Device Type      | Example           | Viewport | Notes                |
| ---------------- | ----------------- | -------- | -------------------- |
| Small phone      | iPhone SE         | 375×667  | Smallest common size |
| Standard phone   | iPhone 13/14      | 390×844  | Most common          |
| Large phone      | iPhone 14 Pro Max | 430×932  | Largest common       |
| Tablet portrait  | iPad              | 768×1024 | Tablet breakpoint    |
| Tablet landscape | iPad              | 1024×768 | Horizontal tablet    |

### Browser DevTools Testing

**Chrome DevTools:**

1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Select device from presets or set custom dimensions
4. Test touch mode (click touch icon in toolbar)
5. Throttle network (Fast 3G or Slow 3G)

**Safari Responsive Design Mode:**

1. Develop → Enter Responsive Design Mode (Cmd+Opt+R)
2. Select iOS device presets
3. Test with Safari-specific behaviors

---

## Checklist

**Before shipping mobile features:**

- [ ] Touch targets are 48px+ (primary: 56px+)
- [ ] Swipe gestures work in both directions
- [ ] Bottom sheets have sticky footers
- [ ] Forms use appropriate input types (`email`, `tel`, `numeric`)
- [ ] Safe areas accounted for (iOS notches, Android bars)
- [ ] Tested on slow 3G network
- [ ] Tested on iPhone SE (375px width)
- [ ] Pull-to-refresh doesn't conflict with scroll
- [ ] Haptic feedback on key interactions
- [ ] No horizontal scroll on mobile viewports
- [ ] Images optimized for mobile (WebP, lazy load)
- [ ] Infinite scroll triggers before reaching bottom
- [ ] Bottom navigation doesn't cover content

---

## Additional Resources

**Internal Documents:**

- 📖 STYLE_GUIDE.md → Responsive breakpoints, touch target sizes
- 📖 DESIGN_PRINCIPLES.md → Mobile-first philosophy, user psychology
- 📖 COMPONENT_GUIDELINES.md → React patterns, data fetching

**External Resources:**

- [iOS Human Interface Guidelines - Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
- [Material Design - Mobile Best Practices](https://m3.material.io/)
- [MDN - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

---

**Questions or Updates?**
If you need to add new mobile patterns, ensure they align with STYLE_GUIDE.md and DESIGN_PRINCIPLES.md.

- Propose changes with rationale and examples
