## Accessibility Design

**Standard:** WCAG 2.2 Level AA (minimum) - updated October 2023

---

### Why WCAG 2.2 (Not 2.1)

**What Changed:**
WCAG 2.2 (October 2023) added **9 new success criteria**, including:

- **2.4.11 Focus Not Obscured (Minimum)** - Level AA
- **2.4.12 Focus Not Obscured (Enhanced)** - Level AAA
- **2.5.7 Dragging Movements** - Level AA
- **2.5.8 Target Size (Minimum)** - Level AA (24×24px minimum)
- **3.2.6 Consistent Help** - Level A

**Why It Matters for DineLocal:**

- **Elderly users** (40% of target) benefit from larger touch targets (2.5.8)
- **Mobile tourists** with poor motor control need accessible drag (2.5.7)
- **Keyboard users** need visible focus (2.4.11)

---

### Accessibility: Do's and Don'ts

#### Keyboard Navigation

**✅ DO:**

- **All interactive elements** accessible via Tab key
- **Visible focus indicators** (3px outline, high contrast)
- **Skip to main content** link
- **Logical tab order** (left-to-right, top-to-bottom)
- **Escape key** closes modals/menus
- **Arrow keys** navigate lists/menus

**❌ DON'T:**

- Require mouse for any functionality
- Invisible focus (outline: none with no alternative)
- No skip link (keyboard users must tab through nav every page)
- Random tab order
- Trapped focus (can't escape modal with keyboard)

**WHY:**

- 15% of users rely on keyboard navigation
- Visible focus required by WCAG 2.2 Level AA
- Skip links save time for screen reader users

**FOCUS INDICATOR (Good):**

```
Button with visible focus:
┌──────────────────┐
│  Book Experience │  ← 3px blue outline, visible
└──────────────────┘
```

**FOCUS INDICATOR (Bad):**

```
Button with no focus:
┌──────────────────┐
│  Book Experience │  ← No visual indication when focused
└──────────────────┘
```

---

#### Screen Reader Compatibility

**✅ DO:**

- **Semantic HTML** (`<nav>`, `<main>`, `<article>`, `<button>`)
- **ARIA labels** for icon buttons (`aria-label="Close"`)
- **Alt text** for all images (descriptive, not "image123.jpg")
- **ARIA live regions** for dynamic content
- **Proper heading hierarchy** (h1 → h2 → h3, no skipping)

**❌ DON'T:**

- Use `<div>` for everything
- Icon buttons without labels
- Missing or generic alt text
- No announcement for dynamic updates
- Skip heading levels (h1 → h3)

**WHY:**

- 2.3% of web users rely on screen readers (WebAIM 2024)
- Semantic HTML provides context
- Proper landmarks enable navigation shortcuts

**SEMANTIC HTML (Good):**

```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/experiences">Experiences</a></li>
  </ul>
</nav>

<main>
  <h1>Italian Home Cooking</h1>
  <article>
    <h2>About this experience</h2>
    <p>...</p>
  </article>
</main>
```

**NON-SEMANTIC HTML (Bad):**

```tsx
<div class="nav">
  <div><span onclick="...">Experiences</span></div>
</div>

<div class="content">
  <div class="big-text">Italian Home Cooking</div>
  <div class="section">
    <div class="heading">About this experience</div>
    <div>...</div>
  </div>
</div>
```

---

#### Color Contrast

**✅ DO:**

- **Text contrast:** 4.5:1 minimum (normal text), 3:1 minimum (large text 18px+)
- **Interactive elements:** 3:1 contrast against background
- **Don't rely on color alone** (use icons + color)
- **Test with color blindness simulators**

**❌ DON'T:**

- Light gray text on white background (poor contrast)
- Color as only indicator (red = error, no icon)
- Assume all users see color the same

**WHY:**

- 8% of men have color blindness
- Low contrast causes readability issues for elderly users
- Required by WCAG 2.2 Level AA

**CONTRAST EXAMPLES:**

**Good:**

```
Black text on white: 21:1 (excellent)
Dark gray (#333) on white: 12:1 (excellent)
Blue (#0066CC) on white: 4.5:1 (minimum AA)
```

**Bad:**

```
Light gray (#CCCCCC) on white: 1.6:1 (fails AA)
Yellow text on white: 1.2:1 (fails AA)
```

---

#### Touch Target Sizing

**✅ DO:**

- **Primary CTAs:** 56×56px (h-14)
- **Standard buttons:** 48×48px (h-12)
- **Minimum:** 44×44px (h-11) - WCAG 2.2 best practice
- **Spacing:** 8px minimum between interactive elements

**❌ DON'T:**

- Touch targets under 44px (poor usability)
- Touch targets under 24px (WCAG 2.2 violation)
- No spacing between adjacent buttons

**WHY:**

- WCAG 2.2 Level AA requires **24×24px minimum** (Success Criterion 2.5.8)
- Industry best practice is **48×48px**
- Elderly users and motor impairments need larger targets

**REFERENCE:** For detailed specs → See [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Touch Target Sizing

---

#### Form Accessibility

**✅ DO:**

- **Labels for all inputs** (visible, not placeholder)
- **Error messages** clear and specific
- **Required field indicators** (`*` or "Required")
- **Inline validation** with ARIA live regions
- **Group related fields** (`<fieldset>` + `<legend>`)

**❌ DON'T:**

- Placeholder as label (disappears on focus)
- Generic error ("Error")
- No required indication until submit
- Validation only on submit
- No grouping for complex forms

**WHY:**

- Proper labels enable screen reader navigation
- Inline validation reduces errors by 42%
- Clear error messages reduce support tickets by 35%

**ACCESSIBLE FORM (Good):**

```tsx
<form>
  <label htmlFor="email">
    Email Address <span aria-label="required">*</span>
  </label>
  <input id="email" type="email" required aria-describedby="email-error" aria-invalid={hasError} />
  {hasError && (
    <div id="email-error" role="alert">
      Please enter a valid email address
    </div>
  )}
</form>
```

**INACCESSIBLE FORM (Bad):**

```tsx
<form>
  <input placeholder="Email*" />
  {hasError && <div>Error</div>}
</form>
```

---

