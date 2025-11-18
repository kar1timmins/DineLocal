# Single Source of Truth (SSOT) Mapping

**Purpose:** This document defines where each major concept is THE authoritative source. All other references should **link** to these locations, not duplicate content.

---

## 🎯 Core Principles & Standards

| Concept | Authoritative Source | Other Files Should |
|---------|---------------------|-------------------|
| **Touch Targets (48px)** | `/quick-reference/core-principles.md` → Mobile-First section | Link to this, mention "48px (see core principles)" |
| **WCAG 2.2 AA Compliance** | `/design/accessibility.md` | Link to this, mention "WCAG 2.2 AA compliant (see accessibility guide)" |
| **Core Web Vitals 2025** | `/design/performance.md` → Core Web Vitals section | Link to this, reference targets without duplicating |
| **Mobile-First Design** | `/quick-reference/core-principles.md` → Section 3A | Link to this |
| **Server vs Client Components** | `/quick-reference/decision-trees.md` → Decision Tree 1 | Link to decision tree, don't duplicate logic |
| **File Organization Rules** | `/architecture/directory-structure.md` | Link to this |
| **File Naming Conventions** | `/architecture/file-naming.md` | Link to this |
| **Import Patterns** | `/architecture/import-patterns.md` | Link to this |
| **Clean Code Principles** ⭐ NEW | `/architecture/clean-code.md` | Link to this for SOLID, DRY, function best practices |
| **State Management Decision** | `/quick-reference/decision-trees.md` → Decision Tree 3 | Link to decision tree |
| **Color Palette** | `/design/colors.md` | Link to this, don't duplicate hex values |
| **Typography Scale** | `/design/typography.md` | Link to this, don't duplicate sizes |
| **Spacing Scale** | `/design/spacing-layout.md` | Link to this, don't duplicate values |
| **Component Styling** | `/design/components-styling.md` | Link to this for button/card/form specs |
| **XSS Prevention** | `/security/xss-prevention.md` | Link to this for DOMPurify usage |
| **CSRF Protection** | `/security/csrf-protection.md` | Link to this for token patterns |
| **Input Validation** | `/security/input-validation.md` | Link to this for Zod patterns |

---

## 📋 Decision Trees (Don't Duplicate Logic!)

| Decision | Authoritative Source |
|----------|---------------------|
| Server Component vs Client Component? | `/quick-reference/decision-trees.md` → Tree 1 |
| Where should this file go? | `/quick-reference/decision-trees.md` → Tree 2 |
| Which state management? | `/quick-reference/decision-trees.md` → Tree 3 |
| How to fetch data? | `/quick-reference/decision-trees.md` → Tree 4 |

**Rule:** Other files can **reference** these decisions but should NOT duplicate the decision tree logic.

---

## 🔍 Checklists (No Duplication!)

| Checklist | Authoritative Source |
|-----------|---------------------|
| Pre-Commit Checklist | `/quick-reference/checklists.md` → Pre-Commit section |
| Pre-PR Checklist | `/quick-reference/checklists.md` → Pre-PR section |
| Component Creation Checklist | `/components/checklists.md` → Component Creation |
| Code Quality Checklist | `/components/checklists.md` → Code Quality |
| Security Checklist | `/security/checklist.md` |
| Mobile Testing Checklist | `/mobile/testing-checklist.md` |

---

## 📚 Implementation Patterns

| Pattern | Authoritative Source | Brief Mentions Allowed In |
|---------|---------------------|--------------------------|
| React Query for Data Fetching | `/components/data-fetching.md` | Quick reference can link |
| Form Validation (React Hook Form + Zod) | `/components/component-patterns.md` → Forms | Examples can reference |
| Error Boundaries | `/patterns/error-handling.md` → Error Boundaries | Components can mention & link |
| Stripe Integration | `/patterns/payments-stripe.md` | Security can mention & link |
| File Uploads | `/patterns/file-uploads.md` | Security can mention & link |
| WebSockets/SSE | `/patterns/real-time.md` | Quick ref can link |
| Zustand Store Setup | `/architecture/state-management.md` | Components can link |

---

## 🎨 Design Values (Never Duplicate Exact Values!)

**Rule:** Design values (colors, sizes, spacing) should ONLY exist in their authoritative source. Other docs can:
- ✅ Reference them ("Use primary color - see colors.md")
- ✅ Link to them
- ❌ NOT duplicate hex codes, pixel values, or rem values

| Design Value | Authoritative Source |
|--------------|---------------------|
| Color hex codes | `/design/colors.md` |
| Font sizes (rem/px) | `/design/typography.md` |
| Spacing values (rem/px) | `/design/spacing-layout.md` |
| Button heights | `/design/components-styling.md` → Buttons |
| Touch target sizes | `/quick-reference/core-principles.md` (principle) + `/design/components-styling.md` (implementation) |
| Border radius values | `/design/components-styling.md` |
| Animation durations | `/design/animation-motion.md` |
| Breakpoint values | `/design/responsive.md` |

---

## 📖 Documentation Purpose (What Each Doc Should Contain)

### CLAUDE.md
**Purpose:** Entry point, project setup, tech stack overview
- ✅ Project overview (what DineLocal is)
- ✅ Docker/manual setup instructions
- ✅ Tech stack list (packages installed)
- ✅ Documentation navigation (links to folders)
- ✅ MCP tools reference
- ❌ NO detailed design principles
- ❌ NO detailed component patterns
- ❌ NO detailed conventions (link instead)

### /quick-reference/ folder
**Purpose:** PRIMARY reference for AI assistants - principles, decisions, quality standards
- ✅ Core UX/UI principles (the "why")
- ✅ Decision trees (architectural choices)
- ✅ Checklists (quality gates)
- ✅ AI assistant workflow
- ❌ NO implementation details (link to components/)
- ❌ NO exact design values (link to design/)

### /architecture/ folder
**Purpose:** Project structure, file organization, conventions
- ✅ Directory structure rules
- ✅ File naming conventions (complete reference)
- ✅ Import patterns
- ✅ State management setup
- ❌ NO component implementation patterns (that's /components/)
- ❌ NO design values (that's /design/)

### /components/ folder
**Purpose:** HOW to build React/Next.js components
- ✅ Component patterns (Server vs Client, composition)
- ✅ Data fetching patterns (React Query)
- ✅ Form handling (React Hook Form + Zod)
- ✅ Performance optimization
- ✅ Accessibility implementation
- ❌ NO design values (link to /design/)
- ❌ NO architecture rules (link to /architecture/)

### /design/ folder
**Purpose:** Design philosophy + exact visual values
- ✅ UX philosophy (why we design this way)
- ✅ Exact color values (hex codes)
- ✅ Exact typography values (rem/px)
- ✅ Exact spacing values
- ✅ Component visual specs
- ❌ NO implementation code (that's /components/)

### /patterns/ folder
**Purpose:** Complex feature implementation (payments, uploads, real-time)
- ✅ Step-by-step implementation guides
- ✅ Complete code examples
- ✅ Security considerations
- ❌ NO basic component patterns (that's /components/)

### /security/ folder
**Purpose:** Security threats and mitigations
- ✅ Threat explanations
- ✅ Prevention patterns
- ✅ Code examples for sanitization/validation
- ❌ NO general component patterns (that's /components/)

### /mobile/ folder
**Purpose:** Mobile-specific interactions and patterns
- ✅ Touch gestures
- ✅ Mobile navigation patterns
- ✅ Mobile form optimization
- ❌ NO general responsive design (that's /design/responsive.md)

---

## 🔗 Cross-Referencing Rules

### ✅ Good Cross-Reference Example:
```markdown
Ensure touch targets are at least 48px (see [Core Principles](../quick-reference/core-principles.md#mobile-first)).
```

### ❌ Bad Cross-Reference Example:
```markdown
Touch targets should be at least 48px × 48px (WCAG 2.2 AA). This is important because...
[duplicates entire explanation from core-principles.md]
```

### Linking Pattern:
```markdown
For [specific topic], see [Document Name](./path/to/doc.md).
For exact [design value], see [Design Doc](./design/specific.md#section).
For implementation, see [Component Pattern](./components/pattern.md).
```

---

## 📊 Redundancy Audit Results

**Before SSOT Implementation:**
- "48px touch targets" appeared in 23 files ❌
- "WCAG 2.2 AA" appeared in 19 files ❌
- "Server vs Client" appeared in 12 files ❌
- "Core Web Vitals" appeared in 10 files ❌

**After SSOT Implementation (Target):**
- "48px touch targets" - ONLY in `/quick-reference/core-principles.md` (authoritative) ✅
  - All other files: link or brief mention with link ✅
- "WCAG 2.2 AA" - ONLY in `/design/accessibility.md` (authoritative) ✅
  - All other files: link or mention "WCAG 2.2 AA compliant (see accessibility guide)" ✅
- "Server vs Client" - ONLY in `/quick-reference/decision-trees.md` (decision tree) ✅
  - All other files: link to decision tree ✅
- "Core Web Vitals" - ONLY in `/design/performance.md` (with targets) ✅
  - All other files: link to performance guide ✅

---

## 🎯 Next Steps

1. ✅ Created this SSOT mapping
2. ⏳ Streamline CLAUDE.md (remove redundancy, add links)
3. ⏳ Consolidate README files (make them index-only)
4. ⏳ Update cross-references throughout docs
5. ⏳ Verify no content is lost (all concepts have ONE authoritative home)

---

**Last Updated:** 2025-11-18
**Maintained By:** DineLocal Team
