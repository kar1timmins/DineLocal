## Style Checklist

### Pre-Commit Checklist

**Visual Design:**

- [ ] Colors use design tokens (bg-primary, text-muted-foreground)
- [ ] Text contrast meets WCAG 2.2 AA (4.5:1 minimum)
- [ ] Touch targets are 44px+ in height
- [ ] Consistent spacing (multiples of 4px)
- [ ] Responsive design tested (mobile, tablet, desktop)

**Typography:**

- [ ] Headings use `font-righteous` (H1-H2) or `font-inter` (H3-H6)
- [ ] Body text is 16px minimum (text-base)
- [ ] Line height is 1.5+ for body text
- [ ] Text is resizable up to 200%

**Components:**

- [ ] Buttons have hover and focus states
- [ ] Forms have proper labels and error messages
- [ ] Icons have proper sizing (h-4 w-4, h-5 w-5)
- [ ] Cards have consistent border radius (rounded-lg)

**Accessibility:**

- [ ] All images have descriptive alt text
- [ ] Icon-only buttons have aria-label
- [ ] Focus indicators visible (2px, 3:1 contrast)
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Semantic HTML used (nav, main, button)

**Code Style:**

- [ ] File naming follows CLAUDE.md conventions (PascalCase for components)
- [ ] Imports organized by category
- [ ] Tailwind classes organized by category
- [ ] TypeScript interfaces defined
- [ ] No console.logs or commented code

**Content:**

- [ ] Copy is clear and concise
- [ ] Action-oriented CTAs (Book Now, not Submit)
- [ ] Specific details included (numbers, times)
- [ ] Error messages are helpful
- [ ] Empty states are encouraging

**Performance:**

- [ ] Images optimized (WebP, lazy loading)
- [ ] Animations respect prefers-reduced-motion
- [ ] No layout shift (CLS = 0)
- [ ] Fast interactions (<200ms)

### Pre-PR Checklist

**Accessibility Audit:**

- [ ] Lighthouse accessibility score 95+
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Keyboard navigation complete
- [ ] Color contrast verified (WebAIM tool)
- [ ] Form validation accessible

**Code Quality:**

- [ ] No TypeScript errors
- [ ] No console errors/warnings
- [ ] Component props documented
- [ ] Reusable components extracted
- [ ] Dead code removed

**Documentation:**

- [ ] README updated (if new feature)
- [ ] Storybook stories added (if UI component)
- [ ] API documented (if new endpoint)
- [ ] Design decisions documented

---

## Additional Resources

**Internal Documentation (By Purpose):**

📖 **STYLE_GUIDE.md** (This Document)

- **Purpose:** Visual and code style specifications
- **Use for:** Colors, typography, spacing, code formatting (not file naming)
- **Example:** "What color should this error message be?" → text-red-700

📖 **CLAUDE.md** - `/frontend/.claude/CLAUDE.md`

- **Purpose:** Project architecture and file organization
- **Use for:** Where to put files, how to structure features, tech stack, **file naming conventions**
- **Example:** "Should component files be PascalCase or kebab-case?" → PascalCase (UserProfile.tsx)

📖 **COMPONENT_GUIDELINES.md** - `/frontend/.claude/context/COMPONENT_GUIDELINES.md`

- **Purpose:** React/Next.js component patterns and data fetching
- **Use for:** Writing components, using React Query, Server vs Client
- **Example:** "How do I fetch data from NestJS?" → Use React Query

📖 **DESIGN_PRINCIPLES.md** - `/frontend/.claude/context/DESIGN_PRINCIPLES.md`

- **Purpose:** UX/UI design philosophy and user experience patterns
- **Use for:** Understanding marketplace psychology, conversion optimization, accessibility patterns
- **Example:** "How do we build trust with users?" → Progressive verification

---

**External Resources:**

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/) - Accessibility standards
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility class reference
- [Shadcn/UI Components](https://ui.shadcn.com/) - Component library
- [Lucide Icons](https://lucide.dev/) - Icon library
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast tool

---

## Version History

**v1.0 (2025-10-21):**

- Initial style guide creation
- Visual design system defined
- Code style conventions established
- Content guidelines documented
- Accessibility standards included

---

**Questions or Updates?**
If you need to update this style guide, ask for approval first. Style changes affect the entire codebase and require team alignment.

- Propose changes with rationale and examples
