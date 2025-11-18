## Typography

### Font Families

```tsx
// Primary Font (Body, UI)
font - inter // Inter (default, clean, readable)

// Display Font (Headings, Hero)
font - righteous // Righteous (bold, distinctive, brand personality)
```

### Heading Styles

```tsx
// H1 - Hero Headlines, Page Titles
<Heading as="h1" fontFamily="righteous" fontWeight="bold" className="text-4xl">
  Discover Local Dining Experiences
</Heading>

// H2 - Section Headings
<Heading as="h2" fontFamily="righteous" fontWeight="semi-bold" className="text-3xl">
  Featured Restaurants
</Heading>

// H3 - Subsection Headings
<Heading as="h3" fontWeight="semi-bold" className="text-2xl">
  Restaurant Name
</Heading>

// H4 - Card Headings, Small Sections
<Heading as="h4" fontWeight="semi-bold" className="text-xl">
  Experience Details
</Heading>

// H5 - Small Headings, Labels
<Heading as="h5" fontWeight="medium" className="text-lg">
  About the Chef
</Heading>

// H6 - Micro Headings
<Heading as="h6" fontWeight="medium" className="text-base">
  Additional Info
</Heading>
```

### Body Text Styles

```tsx
// Large Body (Intros, important paragraphs)
<Text as="p" className="text-lg text-foreground">
  Experience authentic local cuisine...
</Text>

// Regular Body (Default)
<Text as="p" className="text-base text-foreground">
  This restaurant offers a unique dining experience...
</Text>

// Small Body (Captions, secondary info)
<Text as="span" className="text-sm text-muted-foreground">
  Last updated 2 hours ago
</Text>

// Extra Small (Fine print, metadata)
<Text as="span" className="text-xs text-muted-foreground">
  © 2025 DineLocal
</Text>
```

### Typography Guidelines

**DO:**

- ✅ Use `font-righteous` for H1-H2 to create brand personality
- ✅ Use `font-inter` for H3-H6 and body text for readability
- ✅ Maintain consistent line-height (leading-relaxed for body, leading-tight for headings)
- ✅ Use `text-muted-foreground` for secondary information
- ✅ Ensure text is resizable up to 200% without breaking layout

**DON'T:**

- ❌ Use more than 2 font families
- ❌ Use font sizes smaller than 14px (text-sm) for body text
- ❌ Set line-height below 1.5 for body text
- ❌ Use ALL CAPS for long sentences (okay for short labels)
- ❌ Use light font weights (300 or below) for small text

---

