## Mobile-First Design

**Context:** 73% of tourists book on mobile while traveling (Google Travel Study 2024).

---

### Mobile Design Principles

**1. One-handed usage is default**

- Primary actions in bottom 40% of screen (thumb zone)
- Large touch targets (48px minimum)
- No critical UI in top corners

**2. Slow connections are common**

- Optimize images (WebP, lazy load)
- Show content immediately (skeleton screens)
- Offline support where possible

**3. Screen space is precious**

- Progressive disclosure (hide complexity)
- Collapsible sections
- Bottom sheets over modals

**4. Touch gestures are expected**

- Swipe for photo galleries
- Pull-to-refresh
- Long-press for contextual actions

---

### Mobile Navigation: Do's and Don'ts

**✅ DO:**

- **Bottom navigation** for 4-5 main sections
- **Hamburger menu** for secondary items
- **Sticky header** with search and cart (scroll aware)
- **Bottom sheet** for filters (not full page)
- **Breadcrumbs** for wayfinding

**❌ DON'T:**

- Top navigation with 10+ items
- Slide-out drawer for primary actions
- Non-sticky headers (users lose context)
- Full-page filters (takes over screen)
- No back button or escape

**WHY:**

- Bottom nav is 33% faster to access (thumb zone)
- Bottom sheets reduce cognitive load (context preserved)
- Sticky headers reduce scrolling by 40%

**REFERENCE:** For implementation → See [MOBILE_PATTERNS.md](/frontend/.claude/context/MOBILE_PATTERNS.md)

---

### Touch Targets: Do's and Don'ts

**✅ DO:**

- **Primary CTAs:** 56×56px (h-14) - "Book Experience"
- **Standard buttons:** 48×48px (h-12)
- **Compact buttons:** 44×44px (h-11) minimum
- **Icon buttons:** 48×48px
- **List items:** 48px height minimum

**❌ DON'T:**

- Touch targets under 44px (WCAG 2.2 violation)
- Close buttons under 48px
- Tiny icons (16px × 16px)
- Adjacent buttons with no spacing

**WHY:**

- WCAG 2.2 Level AA requires 24px minimum, but **48px is industry best practice**
- Elderly users (40% of target) need larger targets
- Small targets cause **55% more tap errors**

**REFERENCE:** For sizing details → See [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Button Size Guidelines

---

### Mobile Forms: Do's and Don'ts

**✅ DO:**

- **One field per screen** (or very few)
- **Auto-advance** after input (phone, OTP)
- **Appropriate keyboards** (number pad for phone, email keyboard for email)
- **Autofill support** (name, email, phone, address)
- **Visual feedback** (checkmarks for completed)

**❌ DON'T:**

- 10 fields on one screen
- No auto-advance (user must tap next)
- Generic keyboard for all inputs
- No autofill hints
- No indication of progress

**WHY:**

- One field per screen increases mobile completion by 38%
- Appropriate keyboards reduce typing errors by 42%
- Autofill saves time and reduces abandonment

**MOBILE FORM (Good):**

```
Screen 1:
─────────────────
What's your email?

[___________________]
      @

[Continue]
─────────────────

Screen 2:
─────────────────
Phone number (for booking updates)

[___________________]
   📞  (auto keyboard: number pad)

[Continue]
─────────────────
```

**MOBILE FORM (Bad):**

```
One screen with 10 fields:

Name: [_____]
Email: [_____]
Phone: [_____]
Address: [_____]
City: [_____]
...

(Overwhelming, high abandonment)
```

---

### Mobile Images: Do's and Don'ts

**✅ DO:**

- **Swipeable galleries** (not click through)
- **Lazy load** below-fold images
- **WebP format** (smaller file size)
- **Blur placeholder** while loading
- **Pinch to zoom** for detail inspection

**❌ DON'T:**

- Click/tap to advance photos (friction)
- Load all images at once (slow)
- JPEG only (larger files)
- Blank space while loading
- No zoom capability

**WHY:**

- Swipe is 2x faster than tap-to-advance
- Lazy loading improves LCP by 45%
- WebP reduces image size by 30% vs JPEG

**REFERENCE:** For implementation → See [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Image Optimization

---
