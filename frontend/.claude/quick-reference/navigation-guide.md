## 7. Document Navigation Guide

### "I Need To..." → "Use This Doc"

| I need to...                         | Use this document                               | Why                                                 |
| ------------------------------------ | ----------------------------------------------- | --------------------------------------------------- |
| Understand UX/UI principles          | **QUICK_START.md** (this doc) - Section 3       | Core principles, decision-making, quality standards |
| Decide Server vs Client Component    | **QUICK_START.md** - Decision Tree 1            | Quick flowchart, clear criteria                     |
| Decide where to put a file           | **QUICK_START.md** - Decision Tree 2            | Directory structure decision guide                  |
| Choose state management              | **QUICK_START.md** - Decision Tree 3            | Zustand vs Context vs useState                      |
| Understand project architecture      | **CLAUDE.md**                                   | File structure, tech stack, coding conventions      |
| Write React/Next.js components       | **COMPONENT_GUIDELINES.md**                     | Patterns, hooks, data fetching, forms               |
| Choose specific color/spacing values | **STYLE_GUIDE.md**                              | Visual specifications, design tokens                |
| Understand WHY design decisions      | **DESIGN_PRINCIPLES.md**                        | Philosophy, rationale, marketplace psychology       |
| Implement payments (Stripe)          | **ADVANCED_PATTERNS.md** → Payment Integration  | Stripe setup, security, webhooks                    |
| Implement file uploads               | **ADVANCED_PATTERNS.md** → File Upload Patterns | Client compression, validation, backend upload      |
| Implement real-time features         | **ADVANCED_PATTERNS.md** → Real-Time Features   | WebSockets, SSE, polling                            |
| Send transactional emails            | **ADVANCED_PATTERNS.md** → Email Patterns       | Resend, React Email, templates                      |
| Implement mobile gestures            | **MOBILE_PATTERNS.md**                          | Swipe, pull-to-refresh, touch interactions          |
| Prevent XSS attacks                  | **SECURITY_GUIDE.md** → XSS Prevention          | DOMPurify, sanitization, validation                 |
| Prevent CSRF attacks                 | **SECURITY_GUIDE.md** → CSRF Protection         | Token generation, verification                      |
| Validate user input                  | **SECURITY_GUIDE.md** → Input Validation        | Zod schemas, sanitization                           |

### Quick Reference: Common Questions

**"What color should this button be?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Color Palette → Semantic Colors

**"How do I fetch data from the backend?"**
→ [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Data Fetching with React Query

**"What's the minimum touch target size?"**
→ **QUICK_START.md** (this doc) → Section 3A (Mobile-First) → 48px minimum

**"How do I show a success message?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Toast Notifications

**"Why do we use bottom sheets instead of modals on mobile?"**
→ [DESIGN_PRINCIPLES.md](/frontend/.claude/context/DESIGN_PRINCIPLES.md) → Mobile-First for Tourists

**"How do I validate forms?"**
→ [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) → Form Handling (React Hook Form + Zod)

**"What responsive breakpoints should I use?"**
→ [STYLE_GUIDE.md](/frontend/.claude/context/STYLE_GUIDE.md) → Responsive Design → Breakpoints

**"How do I implement optimistic updates?"**
→ [ADVANCED_PATTERNS.md](/frontend/.claude/context/ADVANCED_PATTERNS.md) → Advanced API Patterns → Optimistic Updates

### Escalation Path:

```
1. START: Read QUICK_START.md (this doc)
   ↓
   Get UX/UI principles, make decisions, understand quality standards
   ↓
2. Need implementation details?
   ↓
   ├─ React/Next.js patterns → COMPONENT_GUIDELINES.md
   ├─ Visual specs → STYLE_GUIDE.md
   ├─ Complex features → ADVANCED_PATTERNS.md
   ├─ Mobile interactions → MOBILE_PATTERNS.md
   ├─ Security → SECURITY_GUIDE.md
   └─ Philosophy/rationale → DESIGN_PRINCIPLES.md
   ↓
3. Still need help?
   ↓
   Research best practices, check Next.js/React docs, search Stack Overflow
```

---

