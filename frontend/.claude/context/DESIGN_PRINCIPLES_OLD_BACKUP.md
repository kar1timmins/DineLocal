# DineLocal Design Principles

> UX/UI Design Guidelines for Building a Trusted Peer-to-Peer Home Dining Marketplace

---

## About DineLocal

**DineLocal** is a peer-to-peer marketplace connecting **hosts** who offer authentic home dining experiences with **guests** (locals and tourists) seeking to experience authentic cuisine and culture. Think Airbnb for home-cooked meals.

**Key Differentiators:**

- Authentic cultural experiences in hosts' homes
- Two-sided marketplace (Hosts create, Guests discover & book)
- Instant booking model with trust & safety features
- Global audience (tourists experiencing local cuisine)
- Community & cultural exchange focus

---

## How to Use This Document

**This is a DESIGN GUIDE, not a USER MANUAL.**

This document exists to help designers and developers build frontend features that enable and support our users. It should guide **how we design UI/UX**, not prescribe **what users must do**.

### What This Document Covers

**✅ Design and Development Guidance:**

- How to design UI/UX features that enable users
- Component patterns and technical specifications
- Design decisions and rationale
- Accessibility standards, conversion optimization, visual design systems
- Best practices from competitors (Airbnb, Resy, Meetup) applied to DineLocal

**❌ NOT Covered Here (Separate Documents):**

- What hosts/guests must do (that's for Host Guide, Guest FAQ)
- Platform policies (that's for Terms of Service, Community Standards)
- Review processes and compliance rules (that's for Operations Manual)
- Content requirements (that's for Content Guidelines)

### Language and Framing

When reading this document, you'll see design-focused language:

**✅ CORRECT - Design Perspective:**

- "Design buttons that encourage users to..."
- "Provide tools for hosts to..."
- "Enable guests to filter by..."
- "Create UI that suggests..."
- "Display helper text: 'Consider adding...'"

**❌ INCORRECT - User Instruction Perspective:**

- "Hosts must upload 5 photos"
- "Guests should message the host"
- "Users are required to..."
- "You need to include..."

### UI Copy Examples

Throughout this document, you'll see examples of button labels, helper text, and error messages. These are **design specifications**, not literal user instructions:

**Example:**

```markdown
Button label: "Reserve Experience"
Rationale: Softer commitment than "Book Now", tested at +8% conversion
Helper text below: "You won't be charged yet"
Goal: Reduce commitment anxiety
```

This tells you:

- What copy to use in the UI
- Why we chose that wording
- What user psychology it addresses

### Our Philosophy: Enable, Don't Control

**DineLocal is a peer-to-peer marketplace.** We don't control what hosts cook, how they photograph their homes, or how they express their culture. We **provide tools, suggestions, and helpful guidance** through thoughtful UI/UX design.

**Example of Enablement:**

- ❌ Don't: Require hosts to upload exactly 5 photos with specific lighting
- ✅ Do: Design a photo upload UI that suggests 5-8 photos and provides real-time feedback like "This photo looks great!" or "Consider a brighter shot for better visibility"

**Example of Helpful Guidance:**

- ❌ Don't: Block hosts from uploading photos with "imperfect" composition
- ✅ Do: Show optional tips in the UI: "Hosts with natural lighting get 40% more bookings. Try shooting near a window!"

### Competitive Context

This document references competitors (Airbnb, Resy, OpenTable, Meetup) to:

- Learn from their successful UX patterns
- Identify opportunities to differentiate visually and functionally
- Understand industry standards users expect

We aim to be **uniquely DineLocal** while learning from proven patterns.

### About Code Examples

Throughout this document, you'll find code snippets in TypeScript/React/Tailwind CSS. These are **illustrative examples** that demonstrate design patterns and implementation approaches.

**What Code Examples Show:**

- Design patterns and component structure
- Typical prop interfaces and data flow
- UI/UX implementation approaches
- Best practices for accessibility and responsiveness

**Important Clarifications:**

- ✅ Use these as **inspiration and guidance**
- ✅ Adapt examples to your specific implementation needs
- ✅ Code shows the **design intent**, not exact specifications
- ❌ These are NOT copy/paste requirements
- ❌ Library versions, APIs, and project structure may differ
- ❌ Actual implementation will evolve based on technical constraints

**Example:**

```tsx
// This shows DESIGN INTENT:
<Button onClick={handleSubmit}>
  Reserve Experience
</Button>

// Your actual implementation might be:
<CustomButton onPress={submitReservation} variant="primary">
  Reserve Experience
</CustomButton>
```

The **design decision** (button label "Reserve Experience" instead of "Book Now") matters. The exact component API doesn't.

**When in Doubt:**

- Focus on the **why** (design rationale) over the **how** (exact code)
- Design principles and user psychology apply universally
- Implementation details are flexible

---

## Table of Contents

### PART 1: STRATEGIC FOUNDATIONS

1. [DineLocal Design Philosophy](#dinelocal-design-philosophy)
2. [Design Strategy & Positioning](#design-strategy--positioning)
3. [Research-Backed UX Frameworks](#research-backed-ux-frameworks)
4. [Jobs-to-be-Done Framework](#jobs-to-be-done-framework)
5. [Core UX Principles](#core-ux-principles)

### PART 2: USER EXPERIENCE DESIGN

6. [Guest Experience Design](#guest-experience-design)
7. [Host Experience Design](#host-experience-design)
8. [Trust & Safety Design Patterns](#trust--safety-design-patterns)
9. [Cultural Sensitivity Design](#cultural-sensitivity-design)
10. [Conversion Psychology & Optimization](#conversion-psychology--optimization)

### PART 3: DESIGN SYSTEMS & COMPONENTS

11. [Component Design Guidelines](#component-design-guidelines)
12. [Visual Design System](#visual-design-system)
13. [Food Photography Design Principles](#food-photography-design-principles)
14. [Accessibility for Global Audience](#accessibility-for-global-audience)

### PART 4: TECHNICAL & TESTING

15. [SEO & Discoverability](#seo--discoverability)
16. [Design Testing & Validation](#design-testing--validation)

### PART 5: REFERENCE & TOOLS

17. [Inspiration Websites & Analysis](#inspiration-websites--analysis)
18. [Design Decision Framework](#design-decision-framework)
19. [Design Checklist](#design-checklist)
20. [Quick Reference Tables](#quick-reference-tables)
21. [Competitive Best Practices](#competitive-best-practices)

---

## DineLocal Design Philosophy

### Dual-Sided Marketplace Principles

**Balance Both User Types:**

- **Hosts**: Empowered to create, manage, and promote their experiences
- **Guests**: Effortless discovery, booking, and communication

Design decisions must consider both perspectives:

- Is this feature helping hosts attract guests?
- Is this feature making it easier for guests to trust and book?

### Trust Through Transparency

In a peer-to-peer marketplace where strangers meet in homes, **trust is everything**:

- Make safety features visible, not hidden
- Show verification badges prominently
- Display reviews and ratings clearly
- Communicate cancellation policies upfront
- Transparent pricing (no hidden fees)

### Cultural Authenticity & Storytelling

DineLocal isn't just about food—it's about **cultural exchange**:

**Platform Philosophy:**

- **Hosts are the cultural experts** — we enable, not dictate
- **Authentic = Host-defined** — hosts present their culture their way
- **Platform ensures** safety, legality, and quality (not cultural "correctness")

**Design Implications:**

- Highlight host stories and backgrounds (host-written, not platform-edited)
- Showcase cultural context through host narratives (not just recipes)
- Enable authentic photography (hosts show their real home settings)
- Provide tools and guidelines to help hosts succeed

**What We Control:**

- ✅ Safety standards (no illegal content, hate speech, dangerous activities)
- ✅ Quality standards (photo clarity, complete information, accurate descriptions)
- ✅ Legal compliance (food safety disclosures, local regulations)

**What Hosts Control:**

- ✅ Cultural presentation and authenticity
- ✅ Photography style and home presentation
- ✅ Menu choices and traditional recipes
- ✅ Cultural etiquette and customs to share

### Designing the Experience Submission Flow

**UX Goal:** Help hosts create high-quality, compliant experiences through guided workflows and real-time feedback—not enforcement or gate-keeping.

**Design Philosophy:**

- **Progressive validation** - Catch issues early with helpful inline feedback before submission
- **Educational approach** - Show why requirements exist, not just what they are
- **Clear success criteria** - Let hosts know exactly what makes a great submission
- **Transparent progress** - Show submission status and next steps clearly at all times
- **Positive reinforcement** - Celebrate completions and good choices with encouraging messages

---

#### 1. Creation Wizard UI Design

**Multi-Step Form Pattern:**
Design a guided wizard that breaks experience creation into manageable steps with clear progress indication.

**Progress Indicator Component:**

```tsx
<div className="mb-8">
  <ProgressSteps
    current={3}
    total={6}
    steps={[
      { label: 'Basic Info', status: 'complete' },
      { label: 'Menu & Dietary', status: 'complete' },
      { label: 'Photos', status: 'active' },
      { label: 'Pricing', status: 'pending' },
      { label: 'Availability', status: 'pending' },
      { label: 'Review', status: 'pending' },
    ]}
  />
</div>
```

**Design Rationale:**

- Shows hosts where they are in the process (reduces anxiety)
- Clear indication of completed vs. pending steps
- Can navigate back to edit previous steps
- Mobile-friendly: Stack vertically on small screens

**Inline Validation Design:**
Provide real-time feedback as hosts complete each field:

```tsx
{
  /* Photo upload with instant validation */
}
;<PhotoUploadZone
  onUpload={(file) => {
    const validation = validatePhoto(file)
    if (validation.resolution < MIN_RESOLUTION) {
      return {
        status: 'warning',
        message:
          'This photo may appear pixelated on larger screens. Try uploading a higher resolution version for best results!',
        icon: <AlertTriangle />,
        allowContinue: true, // Warning, not blocker
      }
    }
    return {
      status: 'success',
      message: 'Photo looks great! Clear and well-lit.',
      icon: <CheckCircle className="text-green-600" />,
    }
  }}
/>
```

**Design Pattern:**

- ✅ Green checkmarks appear as fields are completed correctly
- ⚠️ Yellow warnings for suggestions (don't block submission)
- ❌ Red errors for required fixes (block submission)
- 💡 Blue info tooltips explain "Why we ask for this"

---

#### 2. Required Field Guidance

**Helper Text Strategy:**
Use contextual helper text to explain requirements without sounding demanding.

**Example - Allergen Information Field:**

```tsx
<FormField name="allergenInfo">
  <Label>
    Allergen Information
    <Tooltip>
      <InfoIcon className="ml-1 h-4 w-4" />
      <TooltipContent>
        Helps guests with allergies stay safe. We display this prominently on your experience page.
      </TooltipContent>
    </Tooltip>
  </Label>
  <Textarea
    placeholder="e.g., Contains nuts, gluten, dairy. Prepared in kitchen that handles shellfish."
    helperText="List common allergens in your dishes. If allergen-free, write 'None'."
  />
  {touched && !value && (
    <FieldError>
      This helps guests with allergies. Please list allergens or write "None".
    </FieldError>
  )}
</FormField>
```

**Copy Tone:**

- ❌ Demanding: "You must provide allergen information"
- ✅ Helpful: "This helps guests with allergies stay safe"

---

#### 3. Photo Upload Interface Design

**Real-Time Quality Feedback:**
Show automated checks with friendly, encouraging language.

**Upload Status UI Pattern:**

```tsx
<div className="space-y-3">
  {photos.map((photo, index) => (
    <PhotoPreviewCard key={photo.id}>
      <img src={photo.preview} alt="" className="h-24 w-24 rounded object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {photo.validation.status === 'success' && (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">{photo.validation.message}</span>
            </>
          )}
          {photo.validation.status === 'warning' && (
            <>
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-yellow-700">{photo.validation.message}</span>
              <Button variant="ghost" size="sm">
                Keep it
              </Button>
              <Button variant="outline" size="sm">
                Replace
              </Button>
            </>
          )}
        </div>
        {photo.validation.suggestions && (
          <p className="text-muted-foreground mt-1 text-xs">💡 {photo.validation.suggestions}</p>
        )}
      </div>
    </PhotoPreviewCard>
  ))}
</div>
```

**Validation Messages Examples:**

- ✅ Success: "Great! Clear and well-lit"
- ✅ Success: "Perfect! Shows your dining space nicely"
- ⚠️ Warning: "A bit dark—consider a brighter shot (but this works!)"
- ⚠️ Warning: "Slightly blurry—try another? (still acceptable)"
- 💡 Suggestion: "Hosts with 5+ photos get 60% more bookings"

**Design Decision:** Warnings don't block submission—they're helpful nudges, not requirements.

---

#### 4. Pre-Submit Review Page

**Design Pattern:** Side-by-side preview showing host's edit view vs. guest's public view.

```tsx
<div className="grid gap-6 lg:grid-cols-2">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Your Draft</h3>
    <ExperienceEditView data={draftData} />
    <ReadinessChecklist
      items={[
        { label: 'At least 3 photos uploaded', completed: photos.length >= 3 },
        { label: 'Menu description added', completed: !!menuDescription },
        { label: 'Allergen info provided', completed: !!allergenInfo },
        { label: 'Pricing set', completed: !!pricing },
        { label: 'Availability dates added', completed: availableDates.length > 0 },
      ]}
    />
  </div>

  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Guest Preview</h3>
    <div className="bg-muted/20 rounded-lg border p-4">
      <p className="text-muted-foreground mb-4 text-sm">
        This is exactly what guests will see on your experience page
      </p>
      <ExperiencePublicView data={draftData} />
    </div>
  </div>
</div>
```

**Design Goal:** Eliminate surprises—hosts see exactly what guests see before submitting.

---

#### 5. Submission Status Dashboard

**Transparent Communication Throughout Review:**

**Status Display Component:**

```tsx
<Card className="p-6">
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      {status === 'submitted' && <Clock className="h-8 w-8 animate-pulse text-blue-600" />}
      {status === 'under_review' && <SearchCheck className="h-8 w-8 text-purple-600" />}
      {status === 'approved' && <CheckCircle className="h-8 w-8 text-green-600" />}
      {status === 'needs_changes' && <AlertCircle className="h-8 w-8 text-orange-600" />}
    </div>

    <div className="flex-1">
      <h3 className="mb-2 text-xl font-semibold">{statusMessages[status].title}</h3>
      <p className="text-muted-foreground mb-4">{statusMessages[status].description}</p>

      {status === 'under_review' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Estimated review time:</span>
            <span className="font-medium">24-48 hours</span>
          </div>
          <Progress value={65} className="h-2" />
          <p className="text-muted-foreground text-xs">
            Most experiences are reviewed within 1 business day
          </p>
        </div>
      )}

      {status === 'needs_changes' && (
        <Alert variant="warning">
          <AlertTitle>Quick fixes needed</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {feedbackItems.map((item) => (
                <li key={item.id}>{item.message}</li>
              ))}
            </ul>
          </AlertDescription>
          <Button className="mt-4" onClick={handleEdit}>
            Make Changes
          </Button>
        </Alert>
      )}
    </div>
  </div>
</Card>
```

**Status Messages (Design Copy):**

```typescript
const statusMessages = {
  submitted: {
    title: 'Submitted for Review',
    description: "We're checking to make sure everything looks great. You'll hear from us soon!",
  },
  under_review: {
    title: 'Under Review',
    description: "Our team is reviewing your experience. We'll notify you as soon as it's live.",
  },
  approved: {
    title: 'Live on DineLocal!',
    description: 'Your experience is now visible to guests. Get ready for bookings!',
  },
  needs_changes: {
    title: 'Almost There',
    description: 'Just a few quick updates needed to get your experience live.',
  },
}
```

**Copy Tone:**

- Positive and encouraging (not bureaucratic)
- Clear next steps (actionable)
- Specific feedback (not vague rejection)

---

#### 6. Feedback & Resubmission Flow

**Design Pattern:** When changes are needed, show specific, actionable feedback with easy fixes.

```tsx
{
  feedbackItems.map((item) => (
    <FeedbackCard key={item.id} severity={item.severity}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {item.severity === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
          {item.severity === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
        </div>
        <div className="flex-1">
          <h4 className="mb-1 font-medium">{item.title}</h4>
          <p className="text-muted-foreground mb-3 text-sm">{item.description}</p>
          {item.howToFix && (
            <Alert variant="info" className="text-xs">
              <Lightbulb className="h-4 w-4" />
              <AlertDescription>
                <strong>How to fix:</strong> {item.howToFix}
              </AlertDescription>
            </Alert>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => navigateToField(item.fieldId)}
          >
            Fix This Now
          </Button>
        </div>
      </div>
    </FeedbackCard>
  ))
}
```

**Example Feedback Messages:**

- ❌ Error: "Missing allergen information" → How to fix: "Add allergen details or write 'None' if allergen-free"
- ⚠️ Warning: "Photo resolution is low" → How to fix: "Upload a photo at least 1200×800px for best quality"

**Design Goal:** Make it easy to fix issues—direct link to the problematic field with clear guidance.

---

#### 7. Design System Components Needed

**Components to Build:**

- `<ProgressSteps>` - Multi-step form progress indicator
- `<PhotoUploadZone>` - Drag-and-drop with validation feedback
- `<ReadinessChecklist>` - Pre-submit checklist with completion status
- `<ExperiencePreview>` - Side-by-side draft/public view
- `<SubmissionStatus>` - Status dashboard with progress tracking
- `<FeedbackCard>` - Actionable feedback display
- `<FormField>` with inline validation states (success/warning/error)

**Validation Helper Functions:**

```typescript
// Photo validation
validatePhoto(file: File): ValidationResult
validatePhotoResolution(dimensions: {width, height}): ValidationResult
detectPhotoBlur(imageData): number  // 0-1 blur score

// Form validation
validateRequiredFields(formData): ValidationResult[]
validateAllergenInfo(text: string): ValidationResult
validateMenuDescription(text: string): ValidationResult

// Display helpers
getStatusMessage(status: ReviewStatus): {title, description}
getFeedbackSeverity(issue: Issue): "error" | "warning" | "info"
```

---

**Key Takeaway:** This entire flow is designed to feel like **helpful guidance**, not bureaucratic approval. Hosts should feel supported, not policed.

### Instant Booking Confidence

Remove friction while maintaining safety:

- Clear availability calendars
- Immediate confirmation upon booking
- Dietary restrictions handled upfront
- Secure payment with buyer protection
- Easy cancellation process

---

## Design Strategy & Positioning

### Blend Positioning: The DineLocal Advantage

DineLocal occupies a unique position combining three successful models:

```
┌─────────────────────────────────────────────────────────────┐
│  AIRBNB EXPERIENCES    +    RESY/OPENTABLE    +    MEETUP   │
│  (Marketplace Trust)    (Food Aesthetics)   (Human Connection)│
└─────────────────────────────────────────────────────────────┘
                              ↓
                      ┌─────────────┐
                      │  DINELOCAL  │
                      └─────────────┘
      "Trusted marketplace meets culinary storytelling
                meets human connection"
```

### What We Take From Each

#### From Airbnb Experiences

**Adopt:**

- Search pattern (Location + Date + Guests)
- Trust badge system (Verified Host, Superhost equivalent)
- Review structure and prominence
- Sticky booking card on detail pages
- Photo gallery grid layout
- Clear pricing breakdown
- Host profile emphasis
- Cancellation policy transparency

**Differentiate:**

- **Airbnb**: Focus on activities and sightseeing
- **DineLocal**: Focus on cultural food exchange in intimate home settings
- **Visual tone**: Airbnb = Aspirational adventure / DineLocal = Warm, intimate, authentic

#### From Resy/OpenTable

**Adopt:**

- Sophisticated food photography standards
- Atmosphere and ambiance emphasis
- Menu preview prominence
- Cuisine type filtering
- Time-of-day availability patterns
- Reservation confirmation flow

**Differentiate:**

- **Resy/OpenTable**: Professional restaurants, polished presentations
- **DineLocal**: Home kitchens, authentic cultural settings, host storytelling
- **Visual tone**: Resy = Polished luxury / DineLocal = Authentic homey warmth

#### From Meetup/Eventbrite

**Adopt:**

- Community-first messaging
- Host story and background emphasis
- Small group gathering patterns
- Social connection design (icebreakers, shared interests)
- Micro-event focus (intimate gatherings)

**Differentiate:**

- **Meetup**: Various activities, public venues
- **DineLocal**: Specifically food-focused, private homes
- **Visual tone**: Meetup = Casual social / DineLocal = Cultural exchange + hospitality

### Visual Differentiation Strategy

#### Competitive Visual Analysis

| Element               | Airbnb                        | Resy                            | Meetup                   | **DineLocal**                             |
| --------------------- | ----------------------------- | ------------------------------- | ------------------------ | ----------------------------------------- |
| **Primary Color**     | Pink (#FF385C)                | Black/White                     | Red (#F64060)            | **Purple/Violet** (OKLCH 274°)            |
| **Photography Style** | Professional, aspirational    | Moody, sophisticated            | Casual, candid           | **Authentic, home-setting, warm**         |
| **Typography**        | Circular (rounded)            | Serif (elegant)                 | Sans-serif (friendly)    | **Inter/Plus Jakarta (warm, accessible)** |
| **Layout Density**    | Spacious, airy                | Minimal, focused                | Dense, content-rich      | **Balanced: Clear but intimate**          |
| **Card Design**       | Large images, minimal overlay | Dark overlays, text-heavy       | Small images, info-heavy | **Photo-forward + cultural context**      |
| **Trust Signals**     | Badges, ratings, superhost    | Reservations count, exclusivity | RSVP count, attendees    | **Verification + reviews + host story**   |

#### DineLocal's Visual Identity

**Color Strategy: Purple Primary for Brand Differentiation**

**Why Purple?**

1. **Visual Differentiation**: Stands out from competitors (Airbnb pink, Meetup red, Resy black/white)
2. **Premium Positioning**: Purple conveys quality, sophistication, and cultural depth
3. **Trust & Creativity**: Balances trustworthiness with cultural creativity
4. **Consistency**: ONE action color across entire app (critical for conversion)

**Color Psychology:**

- **Primary (Purple/Violet - OKLCH 274°)**: Brand color, ALL CTAs, links, interactive elements
  - Luxury and premium experiences
  - Cultural sophistication and creativity
  - Trust and reliability (peer-to-peer safety)
  - Visual differentiation from competitors
- **Success (Green)**: Confirmations, verified badges, dietary accommodations, positive states
- **Warning (Orange)**: Actual warnings and alerts ONLY (NOT for CTAs)
- **Error (Red)**: Errors, critical allergies, destructive actions, cancellations

**CRITICAL RULE: One CTA Color**

- ✅ **USE primary-600 (purple) for ALL call-to-action buttons**
- ❌ **NEVER mix colors for CTAs** (causes confusion, reduces conversion)
- ❌ **NEVER use orange/warning for "Book Now" or action buttons**
- Example: "Book Experience", "Reserve", "Continue", "Submit" = ALL purple

**Photography Direction:**

- **Not Airbnb**: Less staged perfection, more authentic home moments
- **Not Resy**: Less moody lighting, more natural daylight warmth
- **Not Meetup**: Less casual snapshots, more intentional cultural storytelling

**DineLocal Look = "Warm Authenticity"**

- Natural lighting (window-lit dining tables)
- Real home settings (not studios)
- Hosts in photos (faces, stories, connection)
- Cultural artifacts visible (authentic context)
- Food as centerpiece but not sole focus

### Brand Positioning Statement

> **For** global travelers and local food enthusiasts **who** seek authentic cultural experiences through food,
> **DineLocal** is a **peer-to-peer home dining marketplace** **that** connects guests with verified local hosts offering genuine home-cooked meals in intimate settings.
> **Unlike** Airbnb Experiences (activity-focused) or Resy (restaurant-focused),
> **DineLocal** blends marketplace trust, culinary storytelling, and human connection to create meaningful cultural exchanges over shared meals.

### Design Differentiation Principles

1. **Transparency Over Polish**
   - Show real homes, not staged perfection
   - Host photos with genuine smiles, not stock imagery
   - Imperfect authenticity beats professional staging

2. **Story Before Transaction**
   - Host backstory prominent before booking
   - Cultural context in every experience
   - "Why I cook this" matters as much as "What I cook"

3. **Intimacy Over Scale**
   - Small group emphasis (2-8 guests typical)
   - Conversational tone in UI copy
   - Personal touches (host messages, custom menus)

4. **Cultural Respect Over Generic Global**
   - Region-specific dietary tags (not just "vegetarian")
   - Cultural sensitivity warnings (alcohol, meat handling)
   - Local hosting norms respected in design

---

## Research-Backed UX Frameworks

### Nielsen Norman Group's 10 Usability Heuristics

Applied to DineLocal's peer-to-peer dining marketplace:

#### 1. **Visibility of System Status**

**Principle:** Keep users informed about what's happening through appropriate feedback within a reasonable time.

**DineLocal Application:**

- **Booking flow progress**: Step indicators (1/4 Select Date → 2/4 Dietary Info → 3/4 Payment → 4/4 Confirmed)
- **Photo upload**: Real-time upload progress bars
- **Message status**: Read receipts ("Read 2 hours ago" / "Host typically responds in 1 hour")
- **Availability checking**: "Checking availability..." → "Available for 4 guests on May 15"
- **Payment processing**: Clear status ("Processing..." → "Payment confirmed")

**Bad Example:**

```
❌ Clicking "Reserve" with no feedback for 5 seconds
❌ Uploading photos with no progress indicator
```

**Good Example:**

```
✅ "Booking confirmed! You'll receive an email with details."
✅ "Uploading photo 3 of 5 (60%)..."
✅ "Host Maria usually replies within 2 hours"
```

#### 2. **Match Between System and Real World**

**Principle:** Use language and concepts familiar to the user rather than system-oriented terms.

**DineLocal Application:**

- Use **"Reserve a spot"** not "Create booking record"
- Use **"Message host"** not "Initiate communication thread"
- Use **"Dietary restrictions"** not "Food intake parameters"
- Show prices as **"$45 per person"** not "4500 cents per guest entity"
- Date format matches user's locale (MM/DD/YYYY vs DD/MM/YYYY)

**Cultural Adaptation:**

- In India: "Home-cooked traditional meal"
- In Italy: "Family-style dining experience"
- In Japan: "Authentic home cooking experience (家庭料理)"

#### 3. **User Control and Freedom**

**Principle:** Users often make mistakes and need a clearly marked "emergency exit."

**DineLocal Application:**

- **Easy cancellation**: Clear "Cancel booking" button visible on booking details
- **Undo photo upload**: "Remove" option immediately after upload
- **Edit dietary restrictions**: Change anytime before booking confirmation
- **Save drafts**: Host experience creation auto-saves, can exit and resume
- **Back button**: Wizard flows always have clear "Back" button

**Flexibility Examples:**

```
✅ "Cancel this booking" (with policy reminder)
✅ "Edit guest count" (before payment)
✅ "Save draft and finish later"
✅ "Undo" for removed menu items
```

#### 4. **Consistency and Standards**

**Principle:** Follow platform conventions and maintain internal consistency.

**DineLocal Application:**

- **Button placement**: Primary actions always right-aligned ("Continue", "Reserve")
- **Color coding**: Green = confirmed, Orange = pending, Red = cancelled
- **Icon usage**: Heart = favorite (not bookmark), Star = rating (not quality)
- **Trust badges**: Always top-left of photos across all card types
- **Pricing display**: Always "$/person" format throughout app

**Cross-Platform Consistency:**

- Mobile and desktop use same component library (Shadcn/UI)
- Icons from single library (Lucide React)
- OKLCH color system consistent across themes

#### 5. **Error Prevention**

**Principle:** Prevent problems from occurring in the first place.

**DineLocal Application:**

- **Date selection**: Disable past dates, show host's blocked dates
- **Dietary restrictions**: Show "Host cannot accommodate this restriction" before booking
- **Guest count**: Limit selector to host's max capacity (1-20)
- **Photo upload**: Accept only image files, show size limits upfront
- **Payment**: Confirm total price before processing ("You'll pay $180 for 4 guests")

**Constraint Design:**

```tsx
// Prevent invalid guest counts
<GuestCounter
  min={1}
  max={experience.maxGuests}
  disabled={experience.maxGuests < guestCount}
  helperText={`Host can accommodate up to ${experience.maxGuests} guests`}
/>

// Prevent booking unavailable dates
<Calendar
  disabled={(date) => !isAvailable(date) || isPast(date)}
  modifiers={{ booked: bookedDates, blocked: blockedDates }}
/>
```

#### 6. **Recognition Rather Than Recall**

**Principle:** Minimize memory load by making elements, actions, and options visible.

**DineLocal Application:**

- **Search history**: Show recent searches ("Italian in Rome", "Vegan in Tokyo")
- **Saved favorites**: Quick access to liked experiences
- **Autofill**: Remember dietary restrictions across bookings
- **Visual calendar**: Show availability visually, not text list
- **Photo previews**: Show uploaded photos during experience creation (not just filenames)

**Memory Aid Examples:**

```
✅ Dropdown shows previously selected cuisines
✅ Location search suggests recently searched cities
✅ Dietary restrictions pre-filled from profile
✅ Booking summary repeats all selections before payment
```

#### 7. **Flexibility and Efficiency of Use**

**Principle:** Accelerators for expert users while remaining usable for novices.

**DineLocal Application:**

- **Quick filters**: One-click filters ("Tonight", "This Weekend", "Vegan-Friendly")
- **Keyboard shortcuts**: "/" to focus search, "Esc" to close modals
- **Bulk actions**: Hosts can block multiple dates at once
- **Smart defaults**: Pre-select most common options (2 guests, flexible cancellation)
- **Favorites**: Instant re-booking from saved experiences

**Expert User Patterns:**

```
✅ "Book again" button for repeat guests (skip search)
✅ Host dashboard bulk calendar management
✅ Quick message templates for common questions
✅ One-click dietary filter combinations ("Vegan + Gluten-Free")
```

#### 8. **Aesthetic and Minimalist Design**

**Principle:** Dialogues should not contain irrelevant or rarely needed information.

**DineLocal Application:**

- **Experience cards**: Show only essential info (price, rating, cuisine, photo)
- **Progressive disclosure**: Full menu visible only on detail page, not card
- **Booking card**: Only show fields needed for current step
- **Host dashboard**: Prioritize upcoming bookings, hide archived
- **Filters**: Show common filters first, "More filters" for advanced

**Information Hierarchy:**

```
Experience Card (Search Results):
  PRIMARY: Photo, Price, Rating, Title
  SECONDARY: Cuisine type, Host name
  HIDDEN: Full menu, cancellation policy (available on detail page)

Experience Detail Page:
  PROGRESSIVE: Menu → Photos → Reviews → Location → Cancellation
```

#### 9. **Help Users Recognize, Diagnose, and Recover from Errors**

**Principle:** Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.

**DineLocal Application:**

**Bad Error Messages:**

```
❌ "Error 422: Invalid input"
❌ "Booking failed"
❌ "Upload error"
```

**Good Error Messages:**

```
✅ "This experience is already booked for May 15. Try selecting another date."
✅ "Photo must be under 5MB. Your file is 8MB. Try compressing it first."
✅ "Payment declined. Please check your card details or try another card."
✅ "Host cannot accommodate vegan diet. Remove this restriction or choose another experience."
```

**Error Message Structure:**

1. **What happened**: "This date is unavailable"
2. **Why it happened**: "Another guest just booked it"
3. **What to do**: "Select another date or add to favorites to get notified when host opens new dates"

#### 10. **Help and Documentation**

**Principle:** Provide help that's easy to search and focused on the user's task.

**DineLocal Application:**

- **Contextual tooltips**: Hover over verification badge to see what it means
- **Inline help**: "What's this?" links next to complex fields (cancellation policy)
- **Help center**: Searchable FAQ organized by user journey
- **Onboarding**: First-time host experience creation shows helpful tips
- **Video guides**: Photo guidelines shown as short video

**Contextual Help Examples:**

```
✅ Tooltip on "Verified Host": "This host has completed identity verification and background check"
✅ Help text under dietary restrictions: "Select all that apply. Host will see these before confirming."
✅ Photo upload tips: "💡 Tip: Use natural lighting and show your dining space!"
```

---

### The 31 Laws of UX (Prioritized for DineLocal)

#### Critical Laws for Marketplace Trust

**1. Jakob's Law**

> "Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know."

**DineLocal Application:**

- Use familiar search patterns (like Airbnb/Google Flights)
- Standard e-commerce checkout flow
- Common icon meanings (heart = favorite, star = rating)
- Expected touch gestures (swipe for gallery, pinch to zoom)

**Implementation:**

```
✅ Search bar at top (standard position)
✅ Shopping cart/booking summary in top-right
✅ "Continue" buttons right-aligned
✅ Red for errors, green for success (universal)
```

**2. Hick's Law**

> "The time it takes to make a decision increases with the number and complexity of choices."

**DineLocal Application:**

- Limit cuisine filters to 8-10 visible, hide rest in "More"
- Booking flow: Ask for one thing at a time (date → guests → dietary)
- Photo upload: Suggest 3-5 photos, not "up to 50"
- Search results: Show 12-20 experiences per page (not 100)

**Simplification Strategy:**

```
❌ BAD: 30 dietary options shown at once
✅ GOOD: 6 common options + "Other dietary needs (specify)"

❌ BAD: One page with 20 form fields
✅ GOOD: 5 steps with 4 fields each
```

**3. Miller's Law**

> "The average person can only keep 7 (plus or minus 2) items in their working memory."

**DineLocal Application:**

- Show 5-7 filters visible at once
- Limit menu items display to 5-7 dishes before "See full menu"
- Experience card: Focus on 5 key pieces of info
  1. Photo
  2. Title
  3. Price
  4. Rating
  5. Cuisine type

**4. Aesthetic-Usability Effect**

> "Users often perceive aesthetically pleasing design as design that's more usable."

**DineLocal Application:**

- High-quality food photography (makes platform feel trustworthy)
- Consistent spacing and typography (creates professionalism)
- Smooth transitions and animations (feels polished)
- OKLCH color harmony (visually pleasing = perceived quality)

**Impact on Trust:**

```
Beautiful food photos + Clean layout = "This platform is professional and safe"
Poor images + Cluttered UI = "This might be scammy or unprofessional"
```

**5. Fitts's Law**

> "The time to acquire a target is a function of the distance to and size of the target."

**DineLocal Application:**

- **Large touch targets**: "Book Now" button minimum 48×48px (primary CTAs: 56×56px)
- **Close proximity**: Related actions grouped (Edit/Delete near each item)
- **Corner placement**: Favorite heart in consistent top-right of photos
- **Thumb zones**: Primary mobile actions in bottom 1/3 of screen

**Mobile Optimization:**

```tsx
// Easy to tap (bottom of screen, large target)
<Button className="fixed bottom-4 left-4 right-4 min-h-14">
  Reserve for $180
</Button>

// Hard to tap (small, top corner)
<button className="absolute top-1 right-1 w-6 h-6 text-xs">×</button>
```

**6. Serial Position Effect**

> "Users have a propensity to best remember the first and last items in a series."

**DineLocal Application:**

- **Search filters**: Put most important first (Location, Date) and last (Price)
- **Booking wizard**: First step = exciting (choose date), last step = reassuring (confirmation)
- **Experience photos**: Best photo first, second-best last
- **Review list**: Show highest and most recent ratings first

**7. Von Restorff Effect (Isolation Effect)**

> "When multiple similar objects are present, the one that differs from the rest is most likely to be remembered."

**DineLocal Application:**

- **Verification badge**: Bright color on gray card makes it stand out
- **Call-to-action**: Orange "Book Now" stands out from neutral card
- **Superhost badge**: Gold/yellow contrasts with other badges
- **Dietary warnings**: Red alert for critical allergies

**Visual Hierarchy:**

```
Card with 10 neutral elements + 1 bright orange "Book" button =
User immediately sees the booking action
```

**8. Tesler's Law (Law of Conservation of Complexity)**

> "For any system, there is a certain amount of complexity which cannot be reduced."

**DineLocal Application:**

- **Cannot simplify**: Dietary restrictions (critical for safety)
- **Cannot simplify**: Verification process (critical for trust)
- **Can simplify**: Experience creation (use wizard instead of one huge form)
- **Can simplify**: Search (progressive filters, not all at once)

**Complexity Management:**

```
INHERENT COMPLEXITY (must keep):
  - Dietary accommodations
  - Cancellation policies
  - Payment processing
  - Identity verification

MANAGEABLE COMPLEXITY (can simplify):
  - Experience creation → Multi-step wizard
  - Advanced search → Progressive disclosure
  - Photo upload → Drag & drop with previews
```

#### Conversion-Critical Laws

**9. Peak-End Rule**

> "People judge an experience largely based on how they felt at its peak and at its end."

**DineLocal Application:**

- **Peak moment**: Booking confirmation with exciting email ("You're going to dine with Maria!")
- **End moment**: Post-experience review request with memorable photo
- **Photography peak**: Hero image = most delicious-looking dish
- **Messaging peak**: Host's warm welcome message after booking

**Design for Memorable Moments:**

```
✅ Booking confirmed → Celebration animation + personal host message
✅ Experience complete → Beautiful recap email with photos
✅ First time host → Congratulations badge when first experience published
```

**10. Zeigarnik Effect**

> "People remember uncompleted or interrupted tasks better than completed tasks."

**DineLocal Application:**

- **Save draft**: Incomplete experience creation auto-saves, shows "Complete your listing" reminder
- **Saved searches**: "You searched for 'Italian in Rome' - new experiences available!"
- **Wishlist**: "3 of your favorited experiences have new dates!"
- **Incomplete profile**: "Add dietary preferences to get better recommendations"

**Gentle Nudges:**

```
✅ "Your experience draft is 80% complete. Finish it to start getting bookings!"
✅ "You started booking this experience yesterday. Still available!"
```

---

## Jobs-to-be-Done Framework

### Overview

The Jobs-to-be-Done (JTBD) framework helps us design around **what users are trying to accomplish** rather than user demographics.

**Core Insight:**

> "People don't want a quarter-inch drill. They want a quarter-inch hole."
> — Theodore Levitt

For DineLocal:

> "People don't want a booking platform. They want authentic cultural connection through food."

### DineLocal User Jobs

#### Guest Jobs-to-be-Done

**Primary Functional Jobs:**

1. **"Help me experience authentic local culture through food"**
   - **Context**: Tourist in foreign country, wants genuine experience (not tourist traps)
   - **Success criteria**: Meal in real home, host shares culture, learns local food customs
   - **Design implications**:
     - Host backstory prominent (why they cook, family history)
     - Cultural context in descriptions (not just ingredients)
     - Photos show home setting (not restaurant-like staging)
     - Reviews mention cultural exchange, not just food quality

2. **"Help me find safe and trustworthy strangers to dine with"**
   - **Context**: Solo traveler or couple, safety concerns about entering stranger's home
   - **Success criteria**: Verified host, good reviews, clear policies, secure payment
   - **Design implications**:
     - Verification badges highly visible
     - Review prominence (social proof)
     - Cancellation policy upfront (exit strategy)
     - Secure payment messaging ("Protected by DineLocal")
     - Host response time visible (communication reliability)

3. **"Help me accommodate my dietary needs in unfamiliar places"**
   - **Context**: Vegetarian in meat-heavy culture, allergies, religious restrictions
   - **Success criteria**: Clear dietary communication, host confirmation before booking
   - **Design implications**:
     - Dietary filters on search
     - "Host can accommodate" confirmation before payment
     - Direct messaging for complex allergies
     - Warning for critical restrictions (peanut allergies, cross-contamination)

**Emotional/Social Jobs:**

4. **"Help me feel like a local, not a tourist"**
   - **Context**: Wants insider experience, tired of tourist restaurants
   - **Success criteria**: Feels welcomed into local life, learns something new
   - **Design implications**:
     - Emphasize "local hosts" not "service providers"
     - Show neighborhood context (not just food)
     - Reviews mention "felt like family" moments
     - Host photos show warmth and personality

5. **"Help me create memorable stories to share"**
   - **Context**: Seeking unique experiences for social media, dinner party stories
   - **Success criteria**: Shareable moments, interesting narrative
   - **Design implications**:
     - High-quality, share-worthy photos
     - Unique experience titles (not generic "Italian Dinner")
     - Easy photo sharing after experience
     - "Share your experience" prompts

**Design Decisions Driven by JTBD:**

| Traditional Feature-Based  | JTBD-Based (DineLocal)                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "Add search filter"        | "Which filters help guests find culturally authentic experiences?" → Cuisine + Neighborhood prioritized                       |
| "Show host photo"          | "How do we make hosts feel trustworthy and warm?" → Candid photo + bio story + verified badge                                 |
| "Dietary options checkbox" | "How do we prevent dietary disasters?" → Prominent checkbox + host confirmation + warning for critical allergies              |
| "5-star rating"            | "What makes guests trust a stranger's home?" → Rating + review count + specific review categories (Food, Hospitality, Safety) |

#### Host Jobs-to-be-Done

**Primary Functional Jobs:**

1. **"Help me share my culture and cooking passion with others"**
   - **Context**: Home cook who loves their cuisine, wants cultural exchange
   - **Success criteria**: Guests appreciate food and culture, positive interactions
   - **Design implications**:
     - Experience creation emphasizes "your story" not just menu
     - Prompts for cultural context ("Why this dish matters to my family")
     - Photo upload tips: "Show your home and personality"

2. **"Help me earn money from my cooking skills"**
   - **Context**: Supplemental income, retired person, stay-at-home parent
   - **Success criteria**: Fair compensation, manageable effort, reliable bookings
   - **Design implications**:
     - Clear pricing guidance ("Similar experiences in your area: $35-50/person")
     - Transparent fee structure (not hidden costs)
     - Earnings dashboard prominent
     - Flexible scheduling (not forced to commit)

3. **"Help me manage bookings without technical overwhelm"**
   - **Context**: May not be tech-savvy (older hosts, digital literacy varies)
   - **Success criteria**: Easy calendar, clear notifications, simple communication
   - **Design implications**:
     - Large touch targets, clear labels
     - Calendar visual (not text-based)
     - Email + SMS notifications (not just app)
     - Wizard for experience creation (not one overwhelming form)

**Emotional/Social Jobs:**

4. **"Help me feel safe inviting strangers into my home"**
   - **Context**: Home privacy, safety concerns, property protection
   - **Success criteria**: Guest screening, clear policies, insurance coverage
   - **Design implications**:
     - Guest profiles visible before accepting
     - Guest reviews from other hosts (trust signals)
     - Clear house rules setting
     - Cancellation protection messaging

5. **"Help me feel like a valued host, not just a service provider"**
   - **Context**: Wants appreciation, recognition for effort and hospitality
   - **Success criteria**: Positive feedback, superhost status, community belonging
   - **Design implications**:
     - Superhost badge program
     - Highlighted reviews mentioning hospitality
     - Host community features (forums, tips)
     - Celebration of milestones (first 10 bookings, 5-star streak)

**Design Decisions Driven by JTBD:**

| Traditional Feature-Based | JTBD-Based (DineLocal)                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| "Add calendar"            | "How do we make scheduling easy for non-tech-savvy hosts?" → Visual calendar + bulk date selection + recurring events |
| "Upload menu"             | "How do we help hosts tell their food story?" → Menu + cultural context field + family recipe prompts                 |
| "Set price"               | "How do we help hosts feel fairly compensated?" → Market pricing suggestions + transparent fee breakdown              |
| "Guest profile"           | "How do we help hosts feel safe?" → Guest verification status + review history + dietary needs upfront                |

### JTBD-Driven Design Process

**Step 1: Identify the Job**

```
User says: "I want to book a meal in Rome"
Real job: "I want an authentic Italian experience, not tourist-trap pasta"
```

**Step 2: Understand Context (When/Where/Why)**

```
When: Tourist planning trip, 2 weeks before arrival
Where: Researching on mobile during commute
Why: Wants memorable experience, not just food
Constraints: Limited Italian language, dietary restrictions (vegetarian)
```

**Step 3: Define Success Criteria**

```
✅ Found experience in 2 minutes
✅ Host profile feels trustworthy
✅ Vegetarian options clearly confirmed
✅ Booking process felt secure
✅ Received confirmation with clear next steps
```

**Step 4: Design to Job (Not User Type)**

```
DON'T design for: "Millennial tourists"
DO design for: "People seeking authentic cultural food experiences"

Features driven by job:
- Cuisine + Neighborhood search (not just location)
- Host story prominence (not just menu)
- Cultural tags ("Family recipes", "3rd generation chef")
- Dietary accommodation front and center
```

### Applying JTBD to Feature Prioritization

**Feature Request: "Add calendar sync (iCal export)"**

Traditional prioritization:

- How many users requested it? (10 users)
- Engineering effort? (Medium)
- Decision: Backlog

JTBD prioritization:

- **Which job does this serve?** → "Help me manage my schedule across multiple apps"
- **How many users have this job?** → Hosts with busy lives (60%+ of hosts)
- **Is there a better way to solve the job?** → Email/SMS reminders might be simpler for non-tech-savvy hosts
- **Decision**: Email reminders first (easier), calendar sync later

**Feature Request: "Add video profiles for hosts"**

Traditional: Nice-to-have, copy from Airbnb

JTBD:

- **Job:** "Help guests trust strangers enough to dine in their homes"
- **Does video solve this better than photos + text?** → Yes (voice, personality, home preview)
- **Constraint:** Older hosts may struggle with video
- **Decision:** Optional video (not required), provide simple recording tips

---

## Core UX Principles

### 1. Simplicity in Complexity

Marketplace platforms are inherently complex, but users shouldn't feel that complexity.

**Guest Flow Simplification:**

```
Home → Search (Location + Date + Guests) → Results → Experience Detail → Book → Confirmed
```

**Host Flow Simplification:**

```
Dashboard → Create Experience → Set Menu → Upload Photos → Set Pricing → Publish → Manage Bookings
```

**Design Pattern:**

```tsx
// ❌ Bad: Overwhelming with options
<ExperienceForm>
  {/* 20+ form fields on one page */}
</ExperienceForm>

// ✅ Good: Progressive disclosure with stepper
<ExperienceCreationWizard>
  <Step1BasicInfo />      {/* Name, cuisine, capacity */}
  <Step2MenuDetails />    {/* Dishes, dietary options */}
  <Step3PhotosUpload />   {/* Experience photos */}
  <Step4PricingCalendar />{/* Price & availability */}
  <Step5Review />         {/* Preview before publish */}
</ExperienceCreationWizard>
```

### 2. User-Centered Design

**User Research Must Drive Decisions:**

- Conduct interviews with both hosts and guests
- Test flows with international users (language barriers)
- Validate dietary filter usability
- A/B test booking conversion paths

**Personas:**

**Guest Personas:**

1. **Tourist Emma** (28, UK, visiting India for 2 weeks)
   - Needs: Authentic experiences, dietary accommodations (vegetarian), safety assurance
   - Pain Points: Language barriers, unfamiliar neighborhoods, food safety concerns

2. **Local Foodie Marcus** (35, Local, exploring own city)
   - Needs: Unique experiences, variety of cuisines, convenience
   - Pain Points: Time constraints, last-minute booking

**Host Personas:**

1. **Host Priya** (42, India, passionate home cook)
   - Needs: Easy experience creation, guest communication tools, fair compensation
   - Pain Points: Technology complexity, payment delays, difficult guests

2. **Host Maria** (55, Italy, retiree sharing family recipes)
   - Needs: Simple interface, flexible scheduling, cultural exchange
   - Pain Points: Digital literacy, booking management, photo uploading

### 3. Mobile-First for Tourists

**Tourists book on-the-go:**

- 70%+ of bookings may happen on mobile
- Location-based search with maps
- Quick filters (tonight, this weekend)
- One-handed operation for thumb zones
- Offline-friendly (save favorites, cache content)

**Mobile Optimization:**

```tsx
// Mobile-first search experience
<SearchBar className="/* Stays accessible */ /* Above content */ /* Touch-friendly padding */ bg-background/95 /* Slightly transparent */ /* Elegant effect */ sticky top-0 z-50 p-4 blur backdrop-blur-sm">
  <Input
    type="search"
    placeholder="Location, cuisine, or host"
    className="min-h-12" /* 48px touch target */
  />
</SearchBar>
```

### 4. Progressive Disclosure

Don't overwhelm users with all information at once.

**Experience Card (Collapsed):**

- Host photo
- Experience title
- Cuisine type
- Price per person
- Rating & review count
- Main photo

**Experience Card (Expanded/Detail Page):**

- Full menu
- Host bio & story
- All photos (gallery)
- Dietary accommodations
- Location (neighborhood, not exact until booking)
- Reviews
- Availability calendar
- Cancellation policy

### 5. Feedback & Reassurance

Every action needs clear feedback, especially in financial transactions.

**Booking Flow Feedback:**

```tsx
// Step-by-step confirmation
<BookingFlow>
  <Step current>
    <AvailabilityCheck>✓ Available for 4 guests on May 15</AvailabilityCheck>
  </Step>

  <Step current>
    <DietaryConfirmation>✓ Host can accommodate vegetarian + gluten-free</DietaryConfirmation>
  </Step>

  <Step current>
    <PaymentProcessing>
      <Spinner /> Processing payment...
    </PaymentProcessing>
  </Step>

  <Step completed>
    <BookingConfirmed>
      ✓ Booking confirmed! Check your email.
      <Button>Message Host</Button>
    </BookingConfirmed>
  </Step>
</BookingFlow>
```

---

## Modern Next.js 15 & React 19 Patterns

### Server Components vs Client Components Decision Guide

**Design Philosophy:** Start with Server Components by default, only add 'use client' when absolutely necessary.

**Server Components (Default):**
Use for static content, data fetching, and layout components that don't need interactivity.

```tsx
// app/experiences/[id]/page.tsx
// Server Component - NO 'use client' directive
import { getExperience } from '@/features/experiences/api/getExperience'
import { ExperienceGallery } from './ExperienceGallery' // Can be client component
import { BookingCard } from './BookingCard' // Client component

export default async function ExperiencePage({ params }: { params: { id: string } }) {
  // Fetch data directly in Server Component
  const experience = await getExperience(params.id)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1>{experience.title}</h1>
        <p>{experience.description}</p>

        {/* Server Component - no interactivity */}
        <div className="mt-6">
          <h2>What's Included</h2>
          <ul>
            {experience.inclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Client Component - needs interactivity (carousel) */}
        <ExperienceGallery photos={experience.photos} />
      </div>

      {/* Client Component - needs state for booking */}
      <BookingCard experience={experience} />
    </div>
  )
}
```

**Client Components ('use client'):**
Use only when you need:

- State (useState, useReducer)
- Effects (useEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, geolocation)
- Custom hooks that use the above

```tsx
// components/BookingCard.tsx
'use client' // Required for useState

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

export function BookingCard({ experience }) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [guestCount, setGuestCount] = useState(1)

  return (
    <Card className="sticky top-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => !experience.availableDates.includes(date)}
      />

      <GuestSelector value={guestCount} onChange={setGuestCount} max={experience.maxGuests} />

      <Button onClick={() => handleBooking()}>Reserve</Button>
    </Card>
  )
}
```

**Decision Tree:**

```
Does this component need...
  ↓
State or effects?
  YES → Client Component ('use client')
  NO  → Continue
  ↓
Event handlers (onClick, etc)?
  YES → Client Component
  NO  → Continue
  ↓
Browser APIs?
  YES → Client Component
  NO  → Server Component (default)
```

---

### React Query + NestJS for Forms & Mutations

**Design Pattern:** Use React Query with React Hook Form for form submissions and data mutations to the NestJS backend.

**Architecture Note:** DineLocal uses a separate NestJS backend API (localhost:3001), so we use React Query for all data fetching and mutations instead of Next.js Server Actions.

**Benefits:**

- Type-safe mutations with Zod validation
- Optimistic updates and cache invalidation
- Better error handling with retry logic
- Centralized API client configuration
- Loading states managed by React Query

**Example: Experience Creation Form**

```tsx
// features/experiences/api/createExperience.ts
import { apiClient } from '@/api/client'
import type { CreateExperienceDto, Experience } from '../types'

export async function createExperience(data: CreateExperienceDto): Promise<Experience> {
  return apiClient.post<Experience>('/experiences', data)
}
```

```tsx
// features/experiences/hooks/useCreateExperience.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createExperience } from '../api/createExperience'

export function useCreateExperience() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: createExperience,
    onSuccess: (experience) => {
      // Invalidate experiences list cache
      queryClient.invalidateQueries({ queryKey: ['experiences'] })

      toast.success('Experience created successfully!')
      router.push(`/experiences/${experience.id}`)
    },
    onError: (error) => {
      toast.error('Failed to create experience. Please try again.')
    },
  })
}
```

**Client Component Using React Query:**

```tsx
// features/experiences/components/ExperienceForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { experienceSchema } from '../schemas/experience.schema'
import { useCreateExperience } from '../hooks/useCreateExperience'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Textarea } from '@/components/shared/textarea'

export function ExperienceForm() {
  const { mutate: createExperience, isPending } = useCreateExperience()

  const form = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = (data) => {
    createExperience(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Experience Title</label>
        <Input id="title" {...form.register('title')} disabled={isPending} />
        {form.formState.errors.title && (
          <p className="text-destructive text-sm">{form.formState.errors.title.message}</p>
        )}
      </div>

      <Textarea
        {...form.register('description')}
        placeholder="Describe your experience..."
        disabled={isPending}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Experience'}
      </Button>
    </form>
  )
}
```

**Design Implications:**

- Forms validated with Zod schemas (client + server)
- Loading states managed via React Query's `isPending`
- Errors displayed inline with React Hook Form
- Toast notifications for success/error feedback
- Automatic cache invalidation after mutations
- Type-safe API calls to NestJS backend

---

### Suspense Boundaries & Streaming UI

**Design Pattern:** Stream UI to users progressively, show content as it becomes available.

**Benefits:**

- Faster perceived performance
- Better UX (no blank page while waiting)
- Isolated loading states

**Example: Experience Detail Page with Streaming**

```tsx
// app/experiences/[id]/page.tsx
import { Suspense } from 'react'
import { ExperienceHeader } from './ExperienceHeader'
import { ExperienceReviews } from './ExperienceReviews'
import { SimilarExperiences } from './SimilarExperiences'
import { ExperienceHeaderSkeleton, ReviewsSkeleton } from './Skeletons'

export default function ExperiencePage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Stream: Header loads first (fast) */}
      <Suspense fallback={<ExperienceHeaderSkeleton />}>
        <ExperienceHeader id={params.id} />
      </Suspense>

      {/* Stream: Reviews load independently (slower) */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ExperienceReviews experienceId={params.id} />
      </Suspense>

      {/* Stream: Similar experiences load last (slowest) */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <SimilarExperiences experienceId={params.id} />
      </Suspense>
    </div>
  )
}
```

**Skeleton Screen Components:**

```tsx
// ExperienceHeaderSkeleton.tsx
export function ExperienceHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" /> {/* Title */}
      <Skeleton className="h-4 w-1/2" /> {/* Host name */}
      <Skeleton className="h-64 w-full rounded-lg" /> {/* Photo gallery */}
    </div>
  )
}

export function ReviewsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
```

**Design Guidelines:**

- Show skeleton screens for expected content structure
- Match skeleton to actual content layout (same height, width proportions)
- Use subtle animation (shimmer effect optional)
- Prioritize above-the-fold content

---

### Optimistic UI Updates

**Design Pattern:** Update UI immediately, then sync with server.

**Use Cases for DineLocal:**

- Adding to favorites/wishlist
- Sending messages
- Updating booking details
- Rating experiences

**Example: Favorite Toggle**

```tsx
'use client'

import { useOptimistic } from 'react'
import { toggleFavorite } from './actions'

export function FavoriteButton({ experienceId, initialIsFavorite }: Props) {
  const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(
    initialIsFavorite,
    (state, newState: boolean) => newState
  )

  async function handleToggle() {
    // Immediately update UI (optimistic)
    setOptimisticIsFavorite(!optimisticIsFavorite)

    // Then sync with server
    try {
      await toggleFavorite(experienceId, !optimisticIsFavorite)
    } catch (error) {
      // If server fails, UI will revert automatically
      toast.error('Failed to update favorite')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={optimisticIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={optimisticIsFavorite ? 'fill-red-500 text-red-500' : ''} />
    </Button>
  )
}
```

**Design Implications:**

- Instant feedback (no waiting for server)
- Automatically reverts if server fails
- Shows loading state subtly (optional opacity change)
- Great for non-critical actions

---

### Parallel Routes & Intercept Modals

**Design Pattern:** Show modals without navigation, preserve background context.

**Use Case:** Photo gallery modal that intercepts route

**File Structure:**

```
app/
├── experiences/
│   ├── [id]/
│   │   ├── page.tsx              # Experience detail
│   │   ├── @modal/
│   │   │   └── (..)photo/[photoId]/
│   │   │       └── page.tsx      # Photo modal (intercepted)
│   │   └── layout.tsx
│   └── photo/[photoId]/
│       └── page.tsx               # Full photo page (direct access)
```

**Implementation:**

```tsx
// app/experiences/[id]/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

// app/experiences/[id]/@modal/(..)photo/[photoId]/page.tsx
import { Modal } from '@/components/ui/modal'

export default function PhotoModal({ params }: { params: { photoId: string } }) {
  return (
    <Modal>
      <img src={`/api/photos/${params.photoId}`} alt="" className="max-h-screen" />
    </Modal>
  )
}
```

**User Experience:**

1. Click photo → Modal opens (soft navigation)
2. Close modal → Returns to experience page (no page reload)
3. Share URL → Direct photo page (hard navigation)
4. Browser back → Closes modal gracefully

**Design Benefits:**

- Preserves scroll position
- Faster perceived performance
- Better mobile UX
- Shareable URLs still work

---

### Performance Optimization Patterns

#### Image Optimization with next/image

```tsx
import Image from 'next/image'

// Experience card photo
<Image
  src={experience.coverPhoto}
  alt={experience.title}
  width={400}
  height={300}
  className="rounded-lg object-cover"
  priority={isAboveFold} // Only for hero images
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Photo gallery
<Image
  src={photo.url}
  alt={photo.caption}
  fill
  className="object-cover"
  loading="lazy" // Below-the-fold images
  placeholder="blur"
  blurDataURL={photo.blurDataUrl} // Low-quality placeholder
/>
```

#### Font Optimization with next/font

```tsx
// app/layout.tsx
import { Inter, Righteous } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-righteous',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${righteous.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
```

**Benefits:**

- Self-hosted fonts (no external requests)
- Automatic font subsetting
- Zero layout shift
- Optimized loading

---

### Edge Runtime Considerations

**When to Use Edge:**

- Authentication checks
- A/B testing
- Geolocation-based content
- Simple API routes

**When NOT to Use Edge:**

- Database-heavy operations
- File system access
- Complex computations

```tsx
// middleware.ts (runs on Edge)
export async function middleware(request: NextRequest) {
  // Check if user is authenticated
  const session = await getSession(request)

  // Redirect to login if not authenticated
  if (!session && request.nextUrl.pathname.startsWith('/host')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // A/B test: Show different booking flow to 50% of users
  if (request.nextUrl.pathname === '/experiences/[id]/book') {
    const bucket = Math.random() > 0.5 ? 'A' : 'B'
    const response = NextResponse.next()
    response.cookies.set('booking-flow-variant', bucket)
    return response
  }
}

export const config = {
  matcher: ['/host/:path*', '/experiences/:path*/book'],
}
```

---

**Key Takeaways for DineLocal:**

1. Default to Server Components - only use Client when needed
2. Use React Query + React Hook Form for forms - type-safe mutations to NestJS backend
3. Stream UI with Suspense - faster perceived performance
4. Implement Optimistic UI - instant feedback for favorites, messages
5. Use Parallel Routes - better modal/photo gallery UX
6. Optimize images/fonts - Next.js built-ins handle heavy lifting
7. Leverage Edge - for auth checks and A/B testing

---

## Loading States & Skeleton Screens

### When to Use Skeleton Screens vs Spinners

**Decision Matrix:**

| Scenario                              | Use                         | Rationale                                               |
| ------------------------------------- | --------------------------- | ------------------------------------------------------- |
| **Known layout, predictable content** | Skeleton Screen             | Reduces perceived load time, maintains layout stability |
| **Unknown layout, dynamic content**   | Spinner                     | Skeleton would be misleading                            |
| **< 300ms load time**                 | Nothing (instant)           | Adding loading UI increases perceived time              |
| **300ms - 1s load time**              | Subtle spinner or pulse     | User notices delay, needs feedback                      |
| **> 1s load time**                    | Skeleton Screen             | User expects content, skeleton reduces bounce           |
| **Full page load**                    | Skeleton Screen             | Shows structure, reduces CLS (Cumulative Layout Shift)  |
| **Button action (save, submit)**      | Button loading state        | Inline feedback, prevents double-clicks                 |
| **Infinite scroll**                   | Bottom spinner              | Indicates more content loading                          |
| **Image loading**                     | Blur placeholder or shimmer | Smooth visual transition                                |

---

### Skeleton Screen Patterns for DineLocal

#### Experience Card Skeleton

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export function ExperienceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />

      {/* Content skeleton */}
      <div className="space-y-3 p-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Host name */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Rating & reviews */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

// Usage in search results
export function SearchResults({ query }: { query: string }) {
  const { data: experiences, isLoading } = useSearchExperiences(query)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ExperienceCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {experiences?.map((exp) => (
        <ExperienceCard key={exp.id} {...exp} />
      ))}
    </div>
  )
}
```

#### Experience Detail Page Skeleton

```tsx
export function ExperienceDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column - Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image gallery skeleton */}
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="col-span-2 aspect-[16/9] rounded-lg" />
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="aspect-square rounded-lg" />
          </div>

          {/* Title & host */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Menu section */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        </div>

        {/* Right column - Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4 rounded-lg border p-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### Shimmer Effect for Polish

```tsx
// components/ui/skeleton.tsx
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-muted animate-pulse rounded-md',
        // Add shimmer effect
        'relative overflow-hidden',
        'before:absolute before:inset-0',
        'before:-translate-x-full',
        'before:animate-[shimmer_2s_infinite]',
        'before:bg-gradient-to-r',
        'before:from-transparent before:via-white/10 before:to-transparent',
        className
      )}
      {...props}
    />
  )
}

// Add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
}
```

---

### Progressive Loading with Suspense Boundaries

**Problem:** Entire page waits for slowest data fetch.

**Solution:** Wrap slow-loading sections in `<Suspense>` to stream UI progressively.

```tsx
import { Suspense } from 'react'

export default function ExperiencePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Fast: Experience header (loads immediately) */}
          <Suspense fallback={<ExperienceHeaderSkeleton />}>
            <ExperienceHeader id={params.id} />
          </Suspense>

          {/* Fast: Menu (cached, loads quickly) */}
          <Suspense fallback={<MenuSkeleton />}>
            <ExperienceMenu id={params.id} />
          </Suspense>

          {/* Slow: Reviews (heavy query, can wait) */}
          <Suspense fallback={<ReviewsSkeleton />}>
            <ExperienceReviews experienceId={params.id} />
          </Suspense>

          {/* Slow: Similar experiences (recommendation engine, can wait) */}
          <Suspense fallback={<SimilarExperiencesSkeleton />}>
            <SimilarExperiences experienceId={params.id} />
          </Suspense>
        </div>

        {/* Critical: Booking card (priority load) */}
        <div className="lg:col-span-1">
          <Suspense fallback={<BookingCardSkeleton />}>
            <BookingCard experienceId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

// Server Component - fetches data
async function ExperienceReviews({ experienceId }: { experienceId: string }) {
  // This can take 500ms-1s, but page loads without waiting
  const reviews = await getReviews(experienceId)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  )
}
```

**Benefits:**

- **Faster FCP (First Contentful Paint)**: Header loads instantly
- **Perceived performance**: User sees content progressively, not blank screen
- **Lower bounce rate**: Users see value before slow queries complete
- **Better UX**: Critical content (booking card) prioritized

---

### Button Loading States

**Best Practices:**

```tsx
'use client'

import { Button } from '@/components/shared/button'
import { Loader2 } from 'lucide-react'

export function BookingForm({ experienceId }: { experienceId: string }) {
  const { mutate: createBooking, isPending } = useCreateBooking()

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      createBooking({ experienceId, /* ... */ })
    }}>
      {/* ... form fields ... */}

      {/* ✅ Good: Disabled + loading spinner + text change */}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Reserve Experience'
        )}
      </Button>
    </form>
  )
}

// ❌ BAD: No loading state, button stays active
<Button type="submit">Reserve Experience</Button>
// Result: Users click multiple times, duplicate bookings

// ❌ BAD: Only disables button, no visual feedback
<Button type="submit" disabled={isPending}>Reserve Experience</Button>
// Result: Users think it's broken, refresh page
```

**Inline Action Feedback (Optimistic UI):**

```tsx
'use client'

export function FavoriteButton({ experienceId, initialIsFavorite }: Props) {
  const [optimisticIsFavorite, setOptimisticIsFavorite] = useOptimistic(
    initialIsFavorite,
    (state, newState: boolean) => newState
  )
  const [isPending, startTransition] = useTransition()

  async function handleToggle() {
    startTransition(async () => {
      // Optimistic update (instant UI feedback)
      setOptimisticIsFavorite(!optimisticIsFavorite)

      try {
        // Actual API call (background)
        await toggleFavorite(experienceId, !optimisticIsFavorite)
      } catch (error) {
        // Revert on error
        toast.error('Failed to update favorite')
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label={optimisticIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className="relative"
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all',
          optimisticIsFavorite && 'fill-red-500 text-red-500',
          isPending && 'opacity-50' // Subtle loading state
        )}
      />
      {isPending && <Loader2 className="text-muted-foreground absolute h-4 w-4 animate-spin" />}
    </Button>
  )
}
```

---

### Image Loading Patterns

#### Blur Placeholder (Next.js)

```tsx
import Image from 'next/image'

// ✅ Best: BlurHash placeholder for smooth transition
<Image
  src={experience.coverPhoto}
  alt={experience.title}
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={experience.blurHash} // Generated server-side with blurhash library
  className="rounded-lg"
/>

// ✅ Good: Base64 tiny placeholder
<Image
  src={photo.url}
  alt={photo.caption}
  width={400}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Tiny 20px version
/>

// ❌ Bad: No placeholder, layout shift on load
<Image
  src={photo.url}
  alt={photo.caption}
  width={400}
  height={300}
  // Result: Image pops in, pushes content down (bad CLS)
/>
```

#### Shimmer Placeholder for Unknown Images

```tsx
export function ImageWithShimmer({ src, alt, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative">
      {isLoading && (
        <div className="bg-muted absolute inset-0 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        onLoadingComplete={() => setIsLoading(false)}
        className={cn('transition-opacity duration-300', isLoading ? 'opacity-0' : 'opacity-100')}
        {...props}
      />
    </div>
  )
}
```

---

### Empty States vs Loading States

**Loading State (fetching data):**

```tsx
if (isLoading) {
  return <ExperienceCardSkeleton />
}
```

**Empty State (no data found):**

```tsx
if (experiences.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <Search className="text-muted-foreground mb-4 h-16 w-16" />
      <h3 className="mb-2 text-xl font-semibold">No experiences found</h3>
      <p className="text-muted-foreground mb-6 text-center">
        Try adjusting your filters or search in a different location
      </p>
      <Button onClick={resetFilters}>Clear Filters</Button>
    </div>
  )
}
```

**Error State (fetch failed):**

```tsx
if (error) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <AlertCircle className="text-destructive mb-4 h-16 w-16" />
      <h3 className="mb-2 text-xl font-semibold">Something went wrong</h3>
      <p className="text-muted-foreground mb-6 text-center">
        We couldn't load experiences. Please try again.
      </p>
      <Button onClick={() => refetch()}>Try Again</Button>
    </div>
  )
}
```

---

### Skeleton Screen Anti-Patterns

**❌ DON'T:**

1. **Show skeleton for > 5 seconds** - Use spinner + "Taking longer than expected" message
2. **Use skeleton for < 300ms loads** - Adds perceived latency
3. **Mismatch skeleton and actual content** - Jarring transition, breaks trust
4. **Animate skeleton excessively** - Distracting, feels slower
5. **Show skeleton for error states** - Misleading, use error UI instead

**✅ DO:**

1. **Match skeleton to actual layout** - Same spacing, structure, sizing
2. **Use subtle animations** - Gentle pulse or shimmer
3. **Show real data ASAP** - Don't wait for all data to render something
4. **Prioritize above-fold content** - Skeleton for visible area only
5. **Combine with optimistic UI** - Instant feedback for user actions

---

**Key Takeaways for DineLocal:**

1. Use skeleton screens for search results, experience cards, detail pages (> 1s load)
2. Use button loading states for all form submissions (prevent double-clicks)
3. Implement Suspense boundaries for progressive page loading
4. Add optimistic UI for favorites, likes, saves (instant feedback)
5. Use blur placeholders for images (reduce CLS)
6. Show empty states, not infinite loading, when no results
7. Match skeleton structure to actual content (reduce perceived layout shift)

---

## Guest Experience Design

### Discovery Flow (Search & Browse)

**Primary Search Pattern (Airbnb-style):**

```tsx
<HeroSearch className="mx-auto max-w-4xl">
  <SearchInputs className="grid grid-cols-1 gap-2 rounded-full border p-2 shadow-lg md:grid-cols-4">
    {/* Location */}
    <LocationInput placeholder="Where do you want to dine?" icon={<MapPin />} />

    {/* Date */}
    <DatePicker placeholder="When?" icon={<Calendar />} minDate={new Date()} />

    {/* Party Size */}
    <GuestCounter placeholder="Guests" icon={<Users />} min={1} max={20} />

    {/* Search Button */}
    <Button size="lg" className="rounded-full">
      <Search /> Search
    </Button>
  </SearchInputs>
</HeroSearch>
```

**Secondary Filters (After Search):**

```tsx
<FilterBar className="sticky top-16 z-40 bg-background border-b">
  <ScrollableFilters>
    <CuisineFilter options={['Italian', 'Indian', 'Thai', 'Mexican', ...]} />
    <DietaryFilter options={['Vegetarian', 'Vegan', 'Gluten-Free', ...]} />
    <PriceRangeFilter min={10} max={200} />
    <RatingFilter minRating={4} />
    <AvailabilityFilter options={['Tonight', 'This Weekend', 'Flexible']} />
  </ScrollableFilters>
</FilterBar>
```

### Experience Card Design

**Card Anatomy:**

```tsx
<ExperienceCard className="group cursor-pointer transition-all hover:shadow-xl">
  {/* Hero Image */}
  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
    <Image
      src={experience.coverPhoto}
      alt={experience.title}
      fill
      className="object-cover transition-transform group-hover:scale-105"
    />

    {/* Trust Badges Overlay */}
    <div className="absolute top-2 left-2 flex gap-1">
      {experience.isVerified && (
        <Badge variant="secondary" className="bg-white/90">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      )}
      {experience.isSuperhost && (
        <Badge variant="secondary" className="bg-white/90">
          ⭐ Superhost
        </Badge>
      )}
    </div>

    {/* Favorite Button */}
    <button
      className="absolute top-2 right-2 rounded-full bg-white/90 p-2"
      aria-label="Add to favorites"
    >
      <Heart className="h-4 w-4" />
    </button>
  </div>

  {/* Card Content */}
  <div className="space-y-2 p-4">
    {/* Host Info */}
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={experience.host.photo} />
        <AvatarFallback>{experience.host.initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{experience.host.name}</span>
    </div>

    {/* Title & Cuisine */}
    <h3 className="line-clamp-2 text-lg font-semibold">{experience.title}</h3>
    <p className="text-muted-foreground text-sm">
      {experience.cuisineType} • {experience.neighborhood}
    </p>

    {/* Dietary Tags */}
    <div className="flex flex-wrap gap-1">
      {experience.dietaryOptions.map((diet) => (
        <Badge key={diet} variant="outline" className="text-xs">
          {diet}
        </Badge>
      ))}
    </div>

    {/* Rating & Reviews */}
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="font-semibold">{experience.rating}</span>
      <span className="text-muted-foreground text-sm">({experience.reviewCount} reviews)</span>
    </div>

    {/* Price */}
    <div className="flex items-baseline gap-1 border-t pt-2">
      <span className="text-2xl font-bold">${experience.pricePerPerson}</span>
      <span className="text-muted-foreground text-sm">per person</span>
    </div>
  </div>
</ExperienceCard>
```

### Experience Detail Page

**Layout Structure:**

```tsx
<ExperienceDetailPage>
  {/* Photo Gallery */}
  <PhotoGallery photos={experience.photos} className="mb-8" />

  <div className="grid gap-8 lg:grid-cols-3">
    {/* Main Content (2/3 width) */}
    <div className="space-y-8 lg:col-span-2">
      {/* Title & Host */}
      <header>
        <h1 className="mb-2 text-3xl font-bold">{experience.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <span>🍽️ {experience.cuisineType}</span>
          <span>👥 Up to {experience.maxGuests} guests</span>
          <span>⏱️ {experience.duration} hours</span>
        </div>
      </header>

      {/* Host Profile */}
      <HostCard host={experience.host} />

      {/* What's Included */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">What's included</h2>
        <MenuPreview menu={experience.menu} />
      </section>

      {/* Dietary Accommodations */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Dietary options</h2>
        <DietaryAccommodations options={experience.dietaryOptions} />
      </section>

      {/* Location (Approximate) */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Location</h2>
        <p className="text-muted-foreground mb-4">
          {experience.neighborhood}, {experience.city}
        </p>
        <p className="text-muted-foreground text-sm">Exact address shared after booking</p>
        <MapPreview
          center={experience.approximateLocation}
          zoom={13}
          className="mt-4 h-64 rounded-lg"
        />
      </section>

      {/* Reviews */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">
          ⭐ {experience.rating} ({experience.reviewCount} reviews)
        </h2>
        <ReviewsList reviews={experience.reviews} />
      </section>

      {/* Cancellation Policy */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Cancellation policy</h2>
        <CancellationPolicy policy={experience.cancellationPolicy} />
      </section>
    </div>

    {/* Booking Card (1/3 width, sticky) */}
    <aside className="lg:col-span-1">
      <BookingCard experience={experience} className="sticky top-24" />
    </aside>
  </div>
</ExperienceDetailPage>
```

### Booking Card (Sticky Sidebar)

```tsx
<Card className="space-y-4 p-6 shadow-xl">
  {/* Price */}
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold">${experience.pricePerPerson}</span>
    <span className="text-muted-foreground">per person</span>
  </div>

  {/* Date Selection */}
  <div>
    <Label>Select a date</Label>
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      disabled={(date) => !isAvailable(date)}
      className="rounded-md border"
    />
  </div>

  {/* Guest Count */}
  <div>
    <Label>Number of guests</Label>
    <GuestCounter value={guestCount} onChange={setGuestCount} min={1} max={experience.maxGuests} />
  </div>

  {/* Dietary Restrictions */}
  <div>
    <Label>Any dietary restrictions?</Label>
    <DietarySelector
      selected={dietaryRestrictions}
      onChange={setDietaryRestrictions}
      availableOptions={experience.dietaryOptions}
    />
  </div>

  {/* Price Breakdown */}
  <div className="space-y-2 border-t pt-4">
    <div className="flex justify-between">
      <span>
        ${experience.pricePerPerson} × {guestCount} guests
      </span>
      <span>${experience.pricePerPerson * guestCount}</span>
    </div>
    <div className="flex justify-between">
      <span>Service fee</span>
      <span>${serviceFee}</span>
    </div>
    <div className="flex justify-between border-t pt-2 text-lg font-semibold">
      <span>Total</span>
      <span>${total}</span>
    </div>
  </div>

  {/* Book Button */}
  <Button
    size="lg"
    className="w-full"
    onClick={handleBooking}
    disabled={!selectedDate || !guestCount}
  >
    Reserve
  </Button>

  <p className="text-muted-foreground text-center text-xs">You won't be charged yet</p>

  {/* Trust Signals */}
  <div className="text-muted-foreground flex items-center justify-center gap-4 pt-4 text-sm">
    <span className="flex items-center gap-1">
      <ShieldCheck className="h-4 w-4" />
      Secure payment
    </span>
    <span className="flex items-center gap-1">
      <Calendar className="h-4 w-4" />
      Free cancellation
    </span>
  </div>
</Card>
```

### Messaging Interface

**Pre-Booking Messages:**

```tsx
<MessagingDrawer>
  <DrawerHeader>
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={host.photo} />
      </Avatar>
      <div>
        <p className="font-semibold">{host.name}</p>
        <p className="text-muted-foreground text-sm">Usually responds in 2 hours</p>
      </div>
    </div>
  </DrawerHeader>

  <DrawerContent className="flex-1 space-y-4 overflow-y-auto p-4">
    {messages.map((message) => (
      <MessageBubble
        key={message.id}
        message={message}
        isOwn={message.senderId === currentUser.id}
      />
    ))}
  </DrawerContent>

  <DrawerFooter className="border-t p-4">
    <div className="flex gap-2">
      <Textarea
        placeholder="Ask about dietary options, arrival time, etc."
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="min-h-20"
      />
      <Button onClick={handleSendMessage}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </DrawerFooter>
</MessagingDrawer>
```

---

## Host Experience Design

### Host Dashboard

**Dashboard Overview:**

```tsx
<HostDashboard>
  {/* Stats Cards */}
  <div className="mb-8 grid gap-4 md:grid-cols-4">
    <StatsCard
      title="Upcoming experiences"
      value={upcomingCount}
      icon={<Calendar />}
      trend="+12% from last month"
    />
    <StatsCard
      title="Total earnings"
      value={`$${totalEarnings}`}
      icon={<DollarSign />}
      trend="+8% from last month"
    />
    <StatsCard title="Average rating" value={averageRating} icon={<Star />} suffix="/ 5.0" />
    <StatsCard
      title="Response rate"
      value={`${responseRate}%`}
      icon={<MessageCircle />}
      trend="Excellent!"
    />
  </div>

  {/* Quick Actions */}
  <div className="mb-8 flex gap-4">
    <Button size="lg">
      <Plus className="mr-2" />
      Create New Experience
    </Button>
    <Button variant="outline" size="lg">
      <MessageSquare className="mr-2" />
      Messages ({unreadCount})
    </Button>
  </div>

  {/* Upcoming Bookings */}
  <Card className="mb-8">
    <CardHeader>
      <CardTitle>Upcoming bookings</CardTitle>
    </CardHeader>
    <CardContent>
      <BookingsList bookings={upcomingBookings} />
    </CardContent>
  </Card>

  {/* Your Experiences */}
  <Card>
    <CardHeader>
      <CardTitle>Your experiences</CardTitle>
    </CardHeader>
    <CardContent>
      <ExperiencesList experiences={hostExperiences} actions={['Edit', 'Pause', 'Delete']} />
    </CardContent>
  </Card>
</HostDashboard>
```

### Experience Creation Wizard

**Multi-Step Form Pattern:**

```tsx
<ExperienceCreationWizard
  steps={['Basic Info', 'Menu & Dietary', 'Photos', 'Pricing & Availability', 'Review & Publish']}
  currentStep={currentStep}
>
  {/* Step 1: Basic Info */}
  {currentStep === 0 && (
    <BasicInfoStep>
      <Input
        label="Experience title"
        placeholder="e.g., Authentic Italian Pasta Making"
        required
        maxLength={60}
      />
      <Select label="Cuisine type" required>
        <SelectItem value="italian">Italian</SelectItem>
        <SelectItem value="indian">Indian</SelectItem>
        {/* ... */}
      </Select>
      <Textarea
        label="Description"
        placeholder="Tell guests what makes your experience special..."
        required
        maxLength={500}
      />
      <Input label="Maximum guests" type="number" min={1} max={20} required />
      <Input label="Duration (hours)" type="number" min={1} max={8} step={0.5} required />
    </BasicInfoStep>
  )}

  {/* Step 2: Menu & Dietary */}
  {currentStep === 1 && (
    <MenuDietaryStep>
      <Label>What will you serve?</Label>
      <DynamicList
        items={menuItems}
        onAdd={addMenuItem}
        onRemove={removeMenuItem}
        renderItem={(item, index) => (
          <Input
            placeholder={`Course ${index + 1}`}
            value={item}
            onChange={(e) => updateMenuItem(index, e.target.value)}
          />
        )}
      />

      <Label>Dietary options you can accommodate</Label>
      <CheckboxGroup>
        <Checkbox value="vegetarian">Vegetarian</Checkbox>
        <Checkbox value="vegan">Vegan</Checkbox>
        <Checkbox value="gluten-free">Gluten-free</Checkbox>
        <Checkbox value="dairy-free">Dairy-free</Checkbox>
        <Checkbox value="halal">Halal</Checkbox>
        <Checkbox value="kosher">Kosher</Checkbox>
      </CheckboxGroup>
    </MenuDietaryStep>
  )}

  {/* Step 3: Photos */}
  {currentStep === 2 && (
    <PhotosStep>
      <Label>Experience photos (minimum 3)</Label>
      <p className="text-muted-foreground mb-4 text-sm">
        Tip: Show your dining space, dishes, and yourself!
      </p>
      <ImageUploader
        maxFiles={10}
        accept="image/*"
        onUpload={handlePhotoUpload}
        preview={uploadedPhotos}
      />

      {/* Photo Guidelines */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Photo tips for success</AlertTitle>
        <AlertDescription>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>Use natural lighting</li>
            <li>Show the authentic home setting</li>
            <li>Include yourself in at least one photo</li>
            <li>Horizontal photos work best</li>
          </ul>
        </AlertDescription>
      </Alert>
    </PhotosStep>
  )}

  {/* Step 4: Pricing & Availability */}
  {currentStep === 3 && (
    <PricingAvailabilityStep>
      <Input
        label="Price per person"
        type="number"
        min={10}
        step={5}
        prefix="$"
        required
        helpText="We'll deduct a 15% service fee"
      />

      <Label>Set your availability</Label>
      <AvailabilityCalendar value={availability} onChange={setAvailability} minDate={new Date()} />

      <CheckboxGroup>
        <Checkbox value="flexible">I'm flexible with dates</Checkbox>
        <Checkbox value="recurring">Offer this experience weekly</Checkbox>
      </CheckboxGroup>
    </PricingAvailabilityStep>
  )}

  {/* Step 5: Review & Publish */}
  {currentStep === 4 && (
    <ReviewPublishStep>
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Almost there!</AlertTitle>
        <AlertDescription>Review your experience before publishing</AlertDescription>
      </Alert>

      {/* Preview */}
      <ExperiencePreview experience={formData} />

      {/* Terms */}
      <Checkbox required>
        I agree to DineLocal's <Link href="/terms">Host Terms</Link> and{' '}
        <Link href="/standards">Community Standards</Link>
      </Checkbox>
    </ReviewPublishStep>
  )}

  {/* Navigation */}
  <div className="mt-8 flex justify-between border-t pt-6">
    <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
      Back
    </Button>

    <Button onClick={handleNext}>{currentStep === 4 ? 'Publish Experience' : 'Continue'}</Button>
  </div>
</ExperienceCreationWizard>
```

### Booking Management

```tsx
<BookingManagementCard booking={booking}>
  <div className="mb-4 flex items-start justify-between">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={booking.guest.photo} />
      </Avatar>
      <div>
        <p className="font-semibold">{booking.guest.name}</p>
        <p className="text-muted-foreground text-sm">
          {booking.guestCount} guests • {format(booking.date, 'MMM d, yyyy')}
        </p>
      </div>
    </div>

    <Badge variant={getBookingStatusVariant(booking.status)}>{booking.status}</Badge>
  </div>

  {/* Guest Details */}
  <div className="mb-4 space-y-2">
    <div className="flex items-center gap-2 text-sm">
      <MessageCircle className="h-4 w-4" />
      <span>{booking.guest.messagesSent} messages</span>
    </div>
    <div className="flex items-center gap-2 text-sm">
      <Star className="h-4 w-4" />
      <span>
        {booking.guest.rating} rating from {booking.guest.reviewCount} hosts
      </span>
    </div>
    {booking.dietaryRestrictions.length > 0 && (
      <div className="flex items-start gap-2 text-sm">
        <AlertCircle className="mt-0.5 h-4 w-4" />
        <div>
          <p className="font-medium">Dietary restrictions:</p>
          <p className="text-muted-foreground">{booking.dietaryRestrictions.join(', ')}</p>
        </div>
      </div>
    )}
  </div>

  {/* Actions */}
  <div className="flex gap-2">
    <Button variant="outline" className="flex-1">
      <MessageSquare className="mr-2 h-4 w-4" />
      Message
    </Button>
    <Button variant="outline" className="flex-1">
      <MapPin className="mr-2 h-4 w-4" />
      Share Address
    </Button>
  </div>
</BookingManagementCard>
```

---

## Trust & Safety Design Patterns

### Verification Badge System

**Visual Trust Indicators:**

```tsx
// Badge component with tooltip
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <Badge variant="secondary" className="gap-1">
        <CheckCircle className="w-3 h-3" />
        Verified Host
      </Badge>
    </TooltipTrigger>
    <TooltipContent>
      <p className="text-sm max-w-xs">
        This host has completed identity verification and background check
      </p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Superhost badge
<Badge variant="secondary" className="bg-yellow-50 text-yellow-800 border-yellow-200">
  <Star className="w-3 h-3 mr-1 fill-yellow-500" />
  Superhost
</Badge>

// Dietary certification
<Badge variant="outline" className="gap-1">
  <Leaf className="w-3 h-3" />
  Vegan Certified
</Badge>
```

**Badge Display Hierarchy:**

1. **Verification**: Most important (ID verified, background check)
2. **Superhost**: Performance indicator (ratings, bookings, reliability)
3. **Response Time**: Communication quality ("Usually responds in 1 hour")
4. **Specialty**: Dietary certifications, culinary training

### Review & Rating Display

```tsx
;<ReviewSection>
  {/* Overall Rating */}
  <div className="mb-8 flex items-center gap-6 border-b pb-8">
    <div className="text-center">
      <div className="mb-1 text-5xl font-bold">{experience.rating}</div>
      <div className="text-muted-foreground flex items-center gap-1">
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span>{experience.reviewCount} reviews</span>
      </div>
    </div>

    {/* Rating Breakdown */}
    <div className="flex-1 space-y-2">
      <RatingBar label="Food quality" rating={4.8} total={5} />
      <RatingBar label="Hospitality" rating={4.9} total={5} />
      <RatingBar label="Value for money" rating={4.7} total={5} />
      <RatingBar label="Cleanliness" rating={4.9} total={5} />
      <RatingBar label="Experience" rating={4.8} total={5} />
    </div>
  </div>

  {/* Individual Reviews */}
  <div className="space-y-6">
    {reviews.map((review) => (
      <Review key={review.id} review={review} />
    ))}
  </div>
</ReviewSection>

// Rating bar component
function RatingBar({ label, rating, total }: RatingBarProps) {
  const percentage = (rating / total) * 100

  return (
    <div className="flex items-center gap-3">
      <span className="w-32 text-sm">{label}</span>
      <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
        <div className="bg-primary h-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="w-8 text-sm font-medium">{rating}</span>
    </div>
  )
}
```

### Guest Profile Display (For Hosts)

```tsx
<GuestProfileCard guest={guest}>
  <div className="mb-4 flex items-start justify-between">
    <div className="flex items-center gap-3">
      <Avatar className="h-16 w-16">
        <AvatarImage src={guest.photo} />
        <AvatarFallback>{guest.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-lg font-semibold">{guest.name}</p>
        <p className="text-muted-foreground text-sm">
          Member since {format(guest.joinedDate, 'MMM yyyy')}
        </p>
      </div>
    </div>

    {/* Trust Indicators */}
    <div className="flex flex-col items-end gap-1">
      {guest.isVerified && (
        <Badge variant="secondary">
          <CheckCircle className="mr-1 h-3 w-3" />
          Verified
        </Badge>
      )}
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-semibold">{guest.rating}</span>
      </div>
    </div>
  </div>

  {/* Bio */}
  <p className="mb-4 text-sm">{guest.bio}</p>

  {/* Stats */}
  <div className="grid grid-cols-3 gap-4 border-y py-4">
    <div className="text-center">
      <p className="text-2xl font-bold">{guest.bookingsCount}</p>
      <p className="text-muted-foreground text-xs">Experiences</p>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold">{guest.reviewsCount}</p>
      <p className="text-muted-foreground text-xs">Reviews</p>
    </div>
    <div className="text-center">
      <p className="text-2xl font-bold">{guest.countries}</p>
      <p className="text-muted-foreground text-xs">Countries</p>
    </div>
  </div>

  {/* Reviews from Hosts */}
  <div className="mt-4">
    <h4 className="mb-3 font-semibold">Reviews from hosts</h4>
    {guest.reviewsFromHosts.slice(0, 2).map((review) => (
      <ReviewSnippet key={review.id} review={review} />
    ))}
  </div>
</GuestProfileCard>
```

### Dietary Restriction Communication

```tsx
<DietarySection>
  <Label className="text-lg font-semibold">Dietary restrictions</Label>
  <p className="text-muted-foreground mb-4 text-sm">
    Select all that apply. The host will see these before confirming.
  </p>

  {/* Common Options */}
  <div className="mb-4 space-y-2">
    {COMMON_DIETARY_OPTIONS.map((option) => (
      <div key={option.value} className="flex items-start gap-3">
        <Checkbox
          id={option.value}
          checked={selected.includes(option.value)}
          onCheckedChange={(checked) => handleToggle(option.value, checked)}
        />
        <div className="flex-1">
          <Label htmlFor={option.value} className="cursor-pointer text-sm font-medium">
            {option.icon} {option.label}
          </Label>
          <p className="text-muted-foreground text-xs">{option.description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Allergies (Free text) */}
  <div>
    <Label htmlFor="allergies">Allergies (specify)</Label>
    <Textarea
      id="allergies"
      placeholder="e.g., peanuts, shellfish, tree nuts..."
      value={allergies}
      onChange={(e) => setAllergies(e.target.value)}
      className="min-h-20"
    />
  </div>

  {/* Important Alert */}
  <Alert variant="warning" className="mt-4">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Important</AlertTitle>
    <AlertDescription>
      Please communicate critical allergies directly with your host via messaging. While hosts will
      do their best to accommodate, cross-contamination may occur in home kitchens.
    </AlertDescription>
  </Alert>
</DietarySection>
```

### Cancellation Policy Display

```tsx
<CancellationPolicyCard policy={experience.cancellationPolicy}>
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Cancellation policy</h3>

    {policy.type === 'flexible' && (
      <div className="space-y-2">
        <Badge variant="secondary">Flexible</Badge>
        <p className="text-sm">Free cancellation up to 24 hours before the experience.</p>
        <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
          <li>Full refund if cancelled 24+ hours before</li>
          <li>50% refund if cancelled within 24 hours</li>
          <li>No refund if cancelled within 6 hours or no-show</li>
        </ul>
      </div>
    )}

    {policy.type === 'moderate' && (
      <div className="space-y-2">
        <Badge variant="secondary">Moderate</Badge>
        <p className="text-sm">Free cancellation up to 48 hours before the experience.</p>
        <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
          <li>Full refund if cancelled 48+ hours before</li>
          <li>50% refund if cancelled within 48 hours</li>
          <li>No refund if cancelled within 12 hours or no-show</li>
        </ul>
      </div>
    )}

    {policy.type === 'strict' && (
      <div className="space-y-2">
        <Badge variant="destructive">Strict</Badge>
        <p className="text-sm">Free cancellation up to 7 days before the experience.</p>
        <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
          <li>Full refund if cancelled 7+ days before</li>
          <li>50% refund if cancelled within 7 days</li>
          <li>No refund if cancelled within 72 hours or no-show</li>
        </ul>
      </div>
    )}

    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription className="text-sm">
        Cancellations due to host issues or safety concerns are always eligible for a full refund.
      </AlertDescription>
    </Alert>
  </div>
</CancellationPolicyCard>
```

---

## Cultural Sensitivity Design

### Overview

**Platform vs. Host Roles:**

DineLocal operates globally across diverse cultures, but our approach to cultural sensitivity differs between **platform UI** (what we design) and **host content** (what hosts create):

**Platform Responsibility (Our UI/UX Design):**

- ✅ Culturally inclusive interface design
- ✅ Accessible to users from all backgrounds
- ✅ Respectful color choices, iconography, and terminology
- ✅ Support for dietary restrictions, religious accommodations, privacy settings
- ✅ Inclusive language in our copy, buttons, and system messages

**Host Responsibility (User-Generated Content):**

- ✅ Hosts define their own cultural presentation
- ✅ Hosts choose their cuisine style, serving methods, etiquette
- ✅ Hosts set their own house rules and customs
- ✅ Platform enables hosts to communicate their culture authentically

**Cultural Diversity We Support Globally:**

- **Dietary norms** (vegetarian India, halal Middle East, kosher Israel)
- **Dining customs** (shoes off in Japan, eat with hands in Ethiopia, no alcohol in Muslim homes)
- **Privacy expectations** (gender-separated dining in some cultures, family-inclusive in others)
- **Visual preferences** (hand gestures, religious symbols, food imagery)

### Color Meanings Across Cultures

| Color             | Western Meaning                  | Eastern/Other Meanings                             | DineLocal Usage                                       |
| ----------------- | -------------------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| **Purple/Violet** | Royalty, luxury, creativity      | Universally positive: wealth, spirituality, wisdom | ✅ **Primary brand color** (culturally safe globally) |
| **Red**           | Danger, passion, excitement      | China/India: Luck, celebration, prosperity         | ⚠️ Errors only, avoid for CTAs (Airbnb uses red)      |
| **Orange**        | Energy, warmth, appetite         | Generally positive globally                        | ⚠️ Warnings/alerts ONLY (not CTAs)                    |
| **Green**         | Nature, health, eco-friendly     | Islam: Sacred color, prosperity                    | ✅ Success states, dietary, verified badges           |
| **Yellow**        | Caution, optimism, cheerfulness  | China: Imperial, sacred                            | ⚠️ Use sparingly for highlights                       |
| **White**         | Purity, cleanliness, simplicity  | China/India: Mourning, death                       | ✅ Background only, not primary trust signal in Asia  |
| **Black**         | Elegance, formality, mourning    | Universal mourning in many cultures                | ✅ Text only, not brand color                         |
| **Blue**          | Trust, calmness, professionalism | Rare negative associations                         | ✅ Info states, secondary trust signals               |

**DineLocal Color Strategy:**

- **Primary (Purple)**: Brand color, ALL CTAs, links — culturally neutral, conveys premium quality
- **Success (Green)**: Positive states, dietary accommodations — positive associations globally
- **Warning (Orange)**: Alerts and warnings ONLY — not for CTAs
- **Error (Red)**: Errors, destructive actions — universal danger signal
- **Avoid relying solely on color** — always pair with icons + text for accessibility and cultural clarity

### Religious & Dietary Considerations

#### Dietary Restriction Categories

**Religious Restrictions:**

- **Halal** (Islam): No pork, alcohol, must be properly slaughtered
- **Kosher** (Judaism): No pork, shellfish, meat + dairy separation, certification required
- **Hindu Vegetarian**: No beef (sacred cow), often no meat/eggs, onion/garlic avoided by some
- **Jain**: Strict vegetarian, no root vegetables (ahimsa principle)
- **Buddhist**: Often vegetarian/vegan, no alcohol

**Health/Ethical Restrictions:**

- **Vegan**: No animal products whatsoever
- **Vegetarian**: No meat, may include dairy/eggs
- **Pescatarian**: No meat except fish
- **Gluten-free**: Celiac disease, wheat allergy
- **Dairy-free**: Lactose intolerance, allergy
- **Nut-free**: Severe allergies (life-threatening)

**Design Implementation:**

```
Dietary Filter Priority (by safety + frequency):

CRITICAL (Life-Threatening):
  1. Nut allergies
  2. Shellfish allergies
  3. Severe gluten allergy (celiac)

HIGH PRIORITY (Religious/Health):
  4. Halal
  5. Kosher
  6. Vegan
  7. Vegetarian
  8. Gluten-free

MEDIUM PRIORITY:
  9. Dairy-free
  10. Pescatarian
  11. Egg-free

LOWER PRIORITY (Preference):
  12. No onion/garlic
  13. Low-carb/Keto
  14. Paleo
```

**Filtering UI Pattern:**

```tsx
<DietaryFilterSection>
  {/* Critical allergies (red warning) */}
  <FilterGroup label="Critical Allergies" variant="warning">
    <Checkbox value="nut-allergy">
      <AlertTriangle /> Nut Allergy
    </Checkbox>
    <Checkbox value="shellfish-allergy">
      <AlertTriangle /> Shellfish Allergy
    </Checkbox>
  </FilterGroup>

  {/* Religious requirements */}
  <FilterGroup label="Religious Dietary Requirements">
    <Checkbox value="halal">Halal Certified</Checkbox>
    <Checkbox value="kosher">Kosher</Checkbox>
    <Checkbox value="hindu-veg">Hindu Vegetarian</Checkbox>
  </FilterGroup>

  {/* Common dietary preferences */}
  <FilterGroup label="Dietary Preferences">
    <Checkbox value="vegan">Vegan</Checkbox>
    <Checkbox value="vegetarian">Vegetarian</Checkbox>
    <Checkbox value="gluten-free">Gluten-Free</Checkbox>
  </FilterGroup>
</DietaryFilterSection>
```

### Designing Cultural Context Display

**Design Goal:** Enable hosts to share their cultural customs through flexible, host-written content fields—not prescriptive templates.

**Philosophy:** Hosts are cultural experts. We design UI that lets them share what THEY think is important.

---

#### Cultural Etiquette Input UI (Host Side)

**Design Pattern:** Free-form text field with optional emoji support and helpful prompts:

```tsx
<FormField name="culturalEtiquette">
  <Label>
    Cultural Customs & Etiquette (Optional)
    <Tooltip>
      <InfoIcon className="ml-1 h-4 w-4" />
      <TooltipContent className="max-w-xs">
        Share any cultural customs or etiquette guests should know. This helps guests feel prepared
        and respectful.
      </TooltipContent>
    </Tooltip>
  </Label>

  <Textarea
    placeholder="Example: We remove shoes at the entrance, or It's customary to say 'Itadakimasu' before eating..."
    className="min-h-[120px]"
    value={formData.culturalEtiquette}
    onChange={(e) => updateField('culturalEtiquette', e.target.value)}
  />

  <div className="text-muted-foreground mt-2 flex items-start gap-2 text-sm">
    <InfoIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
    <div>
      <p className="mb-2">
        Share what you think guests should know about dining customs in your culture or home.
      </p>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="link" size="sm" className="h-auto p-0 text-xs">
            See examples from other hosts →
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          <ExampleCard>
            <p className="text-xs italic">
              "We eat with our hands in traditional style. I'll show you how! Also, we sit on floor
              cushions around a low table."
            </p>
            <span className="text-muted-foreground text-xs">— Host in Kerala, India</span>
          </ExampleCard>
          <ExampleCard>
            <p className="text-xs italic">
              "Please remove shoes at entrance (slippers provided). Feel free to slurp your
              ramen—it's a compliment to the chef!"
            </p>
            <span className="text-muted-foreground text-xs">— Host in Tokyo, Japan</span>
          </ExampleCard>
          <ExampleCard>
            <p className="text-xs italic">
              "Dinner is family-style with lots of sharing. Bring your appetite and your stories!"
            </p>
            <span className="text-muted-foreground text-xs">— Host in Barcelona, Spain</span>
          </ExampleCard>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>

  {/* Character counter (helpful guidance) */}
  <div className="text-muted-foreground mt-1 flex justify-between text-xs">
    <span>
      {formData.culturalEtiquette.length > 0
        ? `${formData.culturalEtiquette.length} characters`
        : ''}
    </span>
    <span>Recommended: 100-300 characters</span>
  </div>
</FormField>
```

**Design Decisions:**

- **Optional field**: Hosts decide if they want to share cultural context
- **Free-form text**: No rigid format, hosts write in their own words
- **Examples as inspiration**: Real examples from diverse cultures show variety
- **Collapsible examples**: Inspiration is hidden by default (not prescriptive)
- **Character guidance**: Recommend length, don't enforce it
- **Emoji support**: Hosts can add emojis naturally in text if they want

---

#### Cultural Context Display UI (Guest Side)

**Design Pattern:** Prominent, friendly display of host-provided cultural information:

```tsx
{
  /* On Experience Detail Page */
}
{
  experience.culturalEtiquette && (
    <Card className="border-primary/20 bg-primary/5 mb-6">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <InfoIcon className="text-primary h-5 w-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">Cultural Context</CardTitle>
            <CardDescription>
              {experience.host.firstName} shares these customs for your experience
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Display exactly what host wrote (formatted) */}
        <div className="prose prose-sm max-w-none">
          <Linkify>{formatMultiline(experience.culturalEtiquette)}</Linkify>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Formatting Helper:**

```typescript
// Preserve host's line breaks and formatting
function formatMultiline(text: string) {
  return text.split('\n').map((line, i) => (
    <p key={i} className="mb-2 last:mb-0">
      {line}
    </p>
  ))
}

// Auto-link if host mentions websites/resources
function Linkify({ children }: { children: React.ReactNode }) {
  // Simple URL detection and linking
  // Preserves host's exact wording while making URLs clickable
}
```

**Design Rationale:**

- **Visually distinct**: Uses primary color accent to draw attention
- **Host attribution**: "Maria shares these customs" personalizes it
- **Preserve formatting**: Show exactly what host wrote (their voice)
- **Auto-link URLs**: If host shares resources, make them clickable
- **Not a template**: Display whatever host chose to write

---

#### Alternative: Structured Format (If Backend Requires)

If backend needs structured data (for translations, filtering, etc.):

```tsx
<FormField name="culturalEtiquette">
  <Label>Cultural Customs (Optional)</Label>

  {/* Allow hosts to add multiple tips */}
  <div className="space-y-3">
    {culturalTips.map((tip, index) => (
      <div key={index} className="flex gap-2">
        <Input
          placeholder="e.g., Remove shoes at entrance"
          value={tip.text}
          onChange={(e) => updateTip(index, e.target.value)}
          className="flex-1"
        />
        <Button variant="ghost" size="icon" onClick={() => removeTip(index)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    ))}

    <Button variant="outline" size="sm" onClick={addTip} className="w-full">
      <Plus className="mr-2 h-4 w-4" />
      Add Custom or Etiquette Tip
    </Button>
  </div>

  {/* Same example inspiration section as above */}
</FormField>
```

**Display on Guest Side:**

```tsx
{
  experience.culturalTips && experience.culturalTips.length > 0 && (
    <Alert className="mb-6">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>What to Expect</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-2">
          {experience.culturalTips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{tip.text}</span>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
```

**Design Decision:**

- Structured format allows for:
  - Easier translation (each tip separately)
  - Bullet point formatting (auto-applied)
  - Character limits per tip (prevents walls of text)
- Trade-off: Less flexible than free-form text
- Recommendation: **Start with free-form, migrate to structured if needed**

---

**Key Takeaway:** We design flexible input fields and elegant display components. The CONTENT comes from hosts—we don't prescribe what cultural customs they should share.

### Language & Translation Considerations

#### Beyond Word-for-Word Translation

**Cultural Localization Examples:**

| English (US)       | Spanish (Spain)        | Japanese                 | Hindi (India)      | Cultural Note                 |
| ------------------ | ---------------------- | ------------------------ | ------------------ | ----------------------------- |
| "Book Now"         | "Reservar Ahora"       | "今すぐ予約"             | "अभी बुक करें"     | Direct translation works      |
| "Home-cooked meal" | "Comida casera"        | "家庭料理" (Katei ryōri) | "घर का खाना"       | Emphasizes warmth             |
| "Verified Host"    | "Anfitrión Verificado" | "認証済みホスト"         | "सत्यापित मेज़बान" | Trust signal crucial          |
| "Cancel"           | "Cancelar"             | "キャンセル"             | "रद्द करें"        | Negative action, clear needed |

**Problematic Direct Translations:**

❌ **"Dine Local"** (English idiom)

- ✅ Spanish: "Cena Auténtica" (Authentic Dining)
- ✅ French: "Cuisine Chez l'Habitant" (Cooking at the Resident's)
- ✅ Japanese: "ホームダイニング" (Home Dining)

❌ **"Superhost"** (Airbnb's term, not universal)

- ✅ Alternative: "Top-Rated Host" / "5-Star Host" / "Exceptional Host"

#### Right-to-Left (RTL) Language Support

**Languages requiring RTL:**

- Arabic (العربية)
- Hebrew (עברית)
- Persian/Farsi (فارسی)
- Urdu (اردو)

**Design Implementation:**

```css
/* Auto-flip layout for RTL */
[dir='rtl'] .experience-card {
  /* Flip horizontal padding/margins */
  padding-inline-start: var(--spacing-4);
  padding-inline-end: var(--spacing-6);
}

[dir='rtl'] .flex-row {
  flex-direction: row-reverse;
}

/* Icons that should NOT flip (neutral symbols) */
.icon-no-flip {
  transform: scaleX(1) !important; /* Prevent auto-flip */
}

/* Examples: Star, Heart, Checkmark don't need flipping */
/* Examples: Arrows, Chevrons DO need flipping (handled automatically) */
```

**RTL Layout Considerations:**

```
LTR (English):  [Photo] [Title + Price →]
RTL (Arabic):   [← Title + Price] [Photo]

LTR Navigation: [Home] > [Experiences] > [Italian Pasta]
RTL Navigation: [Italian Pasta] > [Experiences] > [Home]
```

### Visual Content Guidelines

#### Photography Sensitivity

**Alcohol Handling:**

- Show alcohol in European/Western experiences where culturally appropriate
- **Hide/blur alcohol** in Middle Eastern host photos (unless host specifies wine-pairing experience)
- Tag as "Contains Alcohol" for filtering
- Consider "Non-Alcoholic" version of photos for markets where alcohol is sensitive

**Religious Imagery:**

- Avoid religious symbols in marketing materials (crosses, crescents, stars)
- Host homes may show cultural/religious artifacts — this is authentic and acceptable
- Don't feature religious imagery in platform UI (backgrounds, decorative elements)

**Hand Gestures & Body Language:**

- ✅ Thumbs up: Positive in West, offensive in Middle East/parts of Asia
- ✅ OK gesture (👌): Offensive in Brazil, Turkey, parts of Mediterranean
- ✅ Pointing with index finger: Rude in many Asian cultures (use open hand)
- **Solution:** Use neutral hand positions, avoid close-ups of specific gestures

**Food Imagery Taboos:**

```
Pork:
  - Acceptable: Europe, Americas, East Asia (non-Muslim)
  - Avoid: Middle East, Muslim-majority countries, Jewish hosts
  - Solution: Tag "Contains Pork" for filtering

Beef:
  - Acceptable: Most regions
  - Avoid: India (sacred cow in Hinduism)
  - Solution: Tag "Contains Beef" for filtering

Dog/Unconventional Meat:
  - Controversial globally, even where legal
  - Solution: Clear labeling, age-gating, cultural context explanation
```

### Gender & Family Considerations

#### Mixed-Gender Dining

Some cultures have gender-separated dining norms:

**Host Settings:**

```tsx
<ExperienceSettings>
  <Label>Dining arrangement</Label>
  <RadioGroup>
    <Radio value="mixed">Mixed-gender dining (default)</Radio>
    <Radio value="female-only">Female guests only</Radio>
    <Radio value="male-only">Male guests only</Radio>
    <Radio value="family-separated">Gender-separated seating available</Radio>
  </RadioGroup>
  <HelpText>
    Some guests may have cultural or religious preferences for dining arrangements.
  </HelpText>
</ExperienceSettings>
```

**Guest Filtering:**

```tsx
<FilterSection>
  <Label>Hosting Style Preferences</Label>
  <Checkbox value="female-host">Female host</Checkbox>
  <Checkbox value="family-friendly">Family-friendly (children welcome)</Checkbox>
  <Checkbox value="couples-friendly">Couples-friendly</Checkbox>
  <Checkbox value="solo-friendly">Solo traveler-friendly</Checkbox>
</FilterSection>
```

### Cultural Sensitivity Checklist

Before launching in a new market, verify:

**Visual Content:**

- [ ] Color meanings reviewed for cultural context
- [ ] Hand gestures reviewed (no offensive poses)
- [ ] Food imagery appropriate (no culturally taboo foods unless tagged)
- [ ] Alcohol shown only where culturally appropriate
- [ ] Religious symbols avoided in UI (acceptable in authentic host photos)

**Language & Copy:**

- [ ] Professional translation (not just Google Translate)
- [ ] Idioms and metaphors localized
- [ ] Currency, date, time formats localized
- [ ] RTL language support tested (if applicable)
- [ ] Tone appropriate for culture (formal vs casual)

**Functionality:**

- [ ] Dietary filters include religious requirements (halal, kosher)
- [ ] Cultural etiquette tips provided for cross-cultural experiences
- [ ] Gender preferences available where culturally relevant
- [ ] Payment methods appropriate for region (not just credit cards)

**Trust & Safety:**

- [ ] Verification process respects privacy norms
- [ ] Review moderation considers cultural context
- [ ] Customer support available in local language
- [ ] Cancellation policies align with local consumer protection laws

---

## Conversion Psychology & Optimization

### Cognitive Load Theory Applied to Booking Funnel

**Cognitive Load Types:**

1. **Intrinsic Load**: Inherent difficulty of the task (booking a meal in stranger's home = inherently complex due to trust concerns)
2. **Extraneous Load**: Unnecessary complexity added by poor design (confusing UI, unclear process)
3. **Germane Load**: Cognitive effort that aids learning and understanding (trust signals, host stories that build confidence)

**DineLocal Strategy:**

- **Reduce extraneous load**: Simplify checkout, remove distractions
- **Maintain germane load**: Keep trust-building elements (reviews, verification, host story)
- **Cannot reduce intrinsic load**: Dietary restrictions, safety concerns are necessary complexity

### Working Memory Limits (7±2 Items)

**Search Results Page:**

```
❌ BAD: 15 filters visible + 50 experiences on one screen
   = Cognitive overload, user freezes

✅ GOOD: 5-7 top filters visible + 12-16 experiences per page
   = Manageable decision-making
```

**Booking Flow:**

```
❌ BAD: One page with 20 fields
   = Overwhelming, high abandonment

✅ GOOD: 4 steps × 4-5 fields each
   = Feels manageable, progress visible
```

**Experience Card Information:**

```
Limit to 7 key pieces of info:
  1. Photo (hero)
  2. Title
  3. Price
  4. Rating
  5. Cuisine type
  6. Host name/photo
  7. Dietary tags (if applicable)

Everything else → Detail page (progressive disclosure)
```

### Trust Hierarchy for Marketplace

**Trust signals in order of psychological impact:**

```
1. VERIFICATION (Third-party authority)
   ✅ "Government ID Verified"
   ✅ "Background Check Completed"
   Impact: Highest credibility

2. SOCIAL PROOF (Peer validation)
   ✅ "4.9 stars from 87 guests"
   ✅ "150+ experiences hosted"
   Impact: Strong credibility

3. VISUAL AUTHENTICITY (Transparency)
   ✅ Real photos (not stock)
   ✅ Host in photos (face visible)
   Impact: Builds emotional connection

4. COMMUNICATION RELIABILITY (Responsiveness)
   ✅ "Usually responds in 1 hour"
   ✅ "100% response rate"
   Impact: Reduces uncertainty

5. TRANSACTION SECURITY (Safety net)
   ✅ "Secure payment"
   ✅ "Free cancellation until 24hrs before"
   Impact: Lowers risk perception
```

**Visual Hierarchy Implementation:**

```tsx
<ExperienceCard>
  {/* Trust Layer 1: Verification (top-left, most visible) */}
  <Badge className="absolute top-2 left-2">
    <ShieldCheck /> Verified
  </Badge>

  {/* Trust Layer 2: Social Proof (below photo, prominent) */}
  <Rating value={4.9} count={87} />

  {/* Trust Layer 3: Visual (photo itself + host avatar) */}
  <Image src={authentic - home - photo} />
  <Avatar src={host - face - photo} />

  {/* Trust Layer 4: Communication (subtle, in description area) */}
  <ResponseTime>Usually responds in 1 hour</ResponseTime>

  {/* Trust Layer 5: Security (footer, reassurance) */}
  <SecurityNote>
    <Lock className="h-3 w-3" />
    Secure booking with free cancellation
  </SecurityNote>
</ExperienceCard>
```

---

### Marketplace Trust Patterns (2024-2025 Best Practices)

Two-sided marketplaces like DineLocal face unique trust challenges: guests trust an unknown host, hosts trust unknown guests, and both trust the platform. Building trust at every touchpoint is critical for conversion.

#### Progressive Trust Building (Multi-Touch Strategy)

**Principle:** Trust builds incrementally. Don't ask for high commitment (payment) before establishing baseline trust.

**DineLocal Trust Journey:**

```
First Touch (Homepage/Search)
   ↓ LOW COMMITMENT: Browse, no account needed
   Trust Signal: Platform credibility, verified hosts count

Second Touch (Experience Detail Page)
   ↓ MEDIUM COMMITMENT: Provide email to contact host
   Trust Signal: Host verification, reviews, response rate

Third Touch (Booking Flow)
   ↓ HIGH COMMITMENT: Provide payment info
   Trust Signal: Secure payment, cancellation policy, confirmation

Post-Booking
   ↓ RETENTION: Guest leaves review, books again
   Trust Signal: Host reciprocity, platform follow-up
```

**Implementation Pattern:**

```tsx
// ✅ Good: Guest checkout (low commitment first)
export function ExperienceDetailPage({ experience }: Props) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showBookingFlow, setShowBookingFlow] = useState(false)

  function handleReserveClick() {
    // Step 1: Collect basic info (no account required yet)
    if (!user) {
      setShowBookingFlow(true) // Opens date/guest selection
    } else {
      // Returning user: skip to booking confirmation
      setShowBookingFlow(true)
    }
  }

  function handleBookingSubmit(bookingData: BookingData) {
    // Step 2: Create account + confirm booking together
    // OR allow guest checkout with email only
    if (!user) {
      setShowLoginModal(true) // Prompt sign-up with "You're almost done!"
    } else {
      createBooking(bookingData)
    }
  }

  return (
    <div>
      {/* Trust signals above fold */}
      <ExperienceHeader experience={experience} />
      <TrustBadges host={experience.host} />

      {/* Low-friction CTA */}
      <Button onClick={handleReserveClick} size="lg">
        Reserve Experience {/* NOT "Sign up to book" */}
      </Button>

      {/* Booking flow (collects date, guests, dietary BEFORE forcing sign-up) */}
      <BookingFlowModal isOpen={showBookingFlow} onSubmit={handleBookingSubmit} />
    </div>
  )
}
```

**❌ Anti-Pattern: Forced sign-up before showing availability**

```tsx
// BAD: High friction, low trust
<Button onClick={() => setShowLoginModal(true)}>Sign Up to See Availability</Button>
// Result: 80% bounce rate
```

**✅ Best Practice: Guest checkout or deferred registration**

```tsx
// GOOD: Low friction, build trust first
<Button onClick={() => setShowDatePicker(true)}>Check Availability</Button>
// Show calendar, select date, THEN offer "Continue as Guest" or "Sign Up"
// Result: 40% higher conversion
```

---

#### Ethical Scarcity & Urgency (Anti-Dark-Pattern)

**Dark Pattern (ILLEGAL in EU, FTC violations in US):**

- Fake countdown timers ("Only 5 minutes left!")
- Fake stock levels ("Only 1 spot left" when there are 10)
- Fake social proof ("327 people viewing this")

**Ethical Scarcity (Legal & Effective):**

```tsx
'use client'

import { useRealTimeAvailability } from '@/features/experiences/hooks/useRealTimeAvailability'
import { Alert } from '@/components/ui/alert'
import { Clock, Users } from 'lucide-react'

export function EthicalScarcitySignals({ experienceId, selectedDate }: Props) {
  const { data: availability } = useRealTimeAvailability(experienceId, selectedDate)

  // Only show if TRUE (pull from database, not hardcoded)
  if (!availability) return null

  return (
    <div className="space-y-3">
      {/* Real availability (from database) */}
      {availability.spotsRemaining > 0 && availability.spotsRemaining <= 3 && (
        <Alert variant="warning" className="border-orange-200 bg-orange-50">
          <Users className="h-4 w-4" />
          <AlertTitle>Limited Availability</AlertTitle>
          <AlertDescription>
            Only {availability.spotsRemaining}{' '}
            {availability.spotsRemaining === 1 ? 'spot' : 'spots'} remaining for {selectedDate}
          </AlertDescription>
        </Alert>
      )}

      {/* Real popularity (from analytics) */}
      {availability.viewsLast24h > 50 && (
        <Alert variant="default" className="border-blue-200 bg-blue-50">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>Popular Experience</AlertTitle>
          <AlertDescription>
            {availability.viewsLast24h} travelers viewed this in the last 24 hours
          </AlertDescription>
        </Alert>
      )}

      {/* Real last booking (from database) */}
      {availability.lastBookedMinutesAgo && availability.lastBookedMinutesAgo < 360 && (
        <p className="text-muted-foreground text-sm">
          <Clock className="mr-1 inline h-3 w-3" />
          Last booked {Math.floor(availability.lastBookedMinutesAgo / 60)} hours ago
        </p>
      )}

      {/* Host's typical booking rate (from historical data) */}
      {availability.bookingRate > 0.8 && (
        <Badge variant="secondary">
          <Zap className="mr-1 h-3 w-3" />
          Often fully booked
        </Badge>
      )}
    </div>
  )
}

// ✅ Backend API returns REAL data
export async function getRealTimeAvailability(experienceId: string, date: string) {
  const [availability, analytics] = await Promise.all([
    db.experience.findUnique({
      where: { id: experienceId },
      select: {
        maxGuests: true,
        bookings: {
          where: { date, status: 'CONFIRMED' },
          select: { guestCount: true },
        },
      },
    }),
    db.analytics.findMany({
      where: {
        experienceId,
        eventType: 'VIEW',
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    }),
  ])

  const bookedGuests = availability.bookings.reduce((sum, b) => sum + b.guestCount, 0)
  const spotsRemaining = availability.maxGuests - bookedGuests

  return {
    spotsRemaining, // REAL number from database
    viewsLast24h: analytics.length, // REAL views from analytics
    // ... other REAL metrics
  }
}
```

**Key Principle:** If you show scarcity/urgency, it MUST be TRUE and VERIFIABLE from your database.

---

#### Progress Indicators for Multi-Step Booking Flow

**Why It Matters:**

- Reduces abandonment (users know how many steps remain)
- Manages expectations (prevents "How much longer?" frustration)
- Provides sense of progress (motivates completion)

**Best Practices:**

```tsx
'use client'

import { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Check } from 'lucide-react'

const BOOKING_STEPS = [
  { id: 1, label: 'Date & Guests', description: 'When are you visiting?' },
  { id: 2, label: 'Dietary Needs', description: 'Any restrictions?' },
  { id: 3, label: 'Contact Info', description: 'How can we reach you?' },
  { id: 4, label: 'Payment', description: 'Secure your booking' },
] as const

export function BookingFlowWithProgress() {
  const [currentStep, setCurrentStep] = useState(1)
  const progress = (currentStep / BOOKING_STEPS.length) * 100

  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <p className="text-sm font-medium">
            Step {currentStep} of {BOOKING_STEPS.length}
          </p>
          <p className="text-muted-foreground text-sm">{Math.round(progress)}% complete</p>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step indicators (breadcrumb style) */}
      <div className="mb-8 flex items-center justify-between">
        {BOOKING_STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  currentStep > step.id
                    ? 'bg-primary text-primary-foreground' // Completed
                    : currentStep === step.id
                      ? 'bg-primary text-primary-foreground ring-primary/20 ring-4' // Current
                      : 'bg-muted text-muted-foreground' // Upcoming
                } `}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>

              {/* Step label (hide on mobile for space) */}
              <p className="mt-2 hidden text-center text-xs md:block">{step.label}</p>
            </div>

            {/* Connector line */}
            {index < BOOKING_STEPS.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-12 md:w-24 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-background rounded-lg border p-6">
        <h2 className="mb-2 text-2xl font-semibold">{BOOKING_STEPS[currentStep - 1].label}</h2>
        <p className="text-muted-foreground mb-6">{BOOKING_STEPS[currentStep - 1].description}</p>

        {/* Step-specific form content */}
        {currentStep === 1 && <DateGuestSelector />}
        {currentStep === 2 && <DietaryPreferences />}
        {currentStep === 3 && <ContactForm />}
        {currentStep === 4 && <PaymentForm />}

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            onClick={() => setCurrentStep((prev) => Math.min(BOOKING_STEPS.length, prev + 1))}
          >
            {currentStep === BOOKING_STEPS.length ? 'Confirm Booking' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

**Mobile Optimization:**

```tsx
// Simplified progress for mobile (just bar + text, no breadcrumbs)
<div className="mb-6 md:hidden">
  <p className="mb-2 text-sm font-medium">{BOOKING_STEPS[currentStep - 1].label}</p>
  <Progress value={progress} className="h-3" />
  <p className="text-muted-foreground mt-1 text-xs">
    Step {currentStep} of {BOOKING_STEPS.length}
  </p>
</div>
```

---

#### Social Proof Beyond Reviews

**Problem:** 5-star rating + "Great experience!" reviews are expected but not differentiated.

**Solution:** Show **specific, behavioral social proof** that addresses objections.

```tsx
export function SocialProofSignals({ experience, host }: Props) {
  return (
    <div className="space-y-4">
      {/* Traditional social proof (baseline) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{experience.rating}</span>
          <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
        </div>
        <Badge variant="secondary">
          <Award className="mr-1 h-3 w-3" />
          Superhost
        </Badge>
      </div>

      {/* Behavioral social proof (differentiating) */}
      <div className="grid gap-3">
        {/* Repeat guests (high trust signal) */}
        {host.repeatGuestRate > 0.3 && (
          <div className="flex items-start gap-3">
            <RefreshCw className="text-primary mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Guest Favorite</p>
              <p className="text-muted-foreground text-sm">
                {Math.round(host.repeatGuestRate * 100)}% of guests book with {host.firstName} again
              </p>
            </div>
          </div>
        )}

        {/* Specific praise categories */}
        {experience.reviewCategories && (
          <div className="flex items-start gap-3">
            <ThumbsUp className="text-primary mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Highly Rated For</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {experience.reviewCategories.map((category) => (
                  <Badge key={category.name} variant="outline" className="text-xs">
                    {category.name}: {category.score}/5
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience longevity (trust signal) */}
        {host.yearsHosting >= 2 && (
          <div className="flex items-start gap-3">
            <Calendar className="text-primary mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Experienced Host</p>
              <p className="text-muted-foreground text-sm">
                Hosting for {host.yearsHosting} years · {host.totalExperiencesHosted} experiences
                hosted
              </p>
            </div>
          </div>
        )}

        {/* Notable guests (with permission) */}
        {experience.notableGuests && experience.notableGuests.length > 0 && (
          <div className="flex items-start gap-3">
            <Users className="text-primary mt-0.5 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Welcomed Guests From</p>
              <div className="mt-2 flex -space-x-2">
                {experience.notableGuests.slice(0, 5).map((guest) => (
                  <Avatar key={guest.id} className="border-background border-2">
                    <AvatarImage src={guest.avatar} alt={guest.location} />
                    <AvatarFallback>{guest.initials}</AvatarFallback>
                  </Avatar>
                ))}
                {experience.notableGuests.length > 5 && (
                  <div className="bg-muted border-background flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-medium">
                    +{experience.notableGuests.length - 5}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Backend Data Structure:**

```typescript
// Calculate from reviews (ML categorization or manual tags)
interface ReviewCategories {
  name: 'Food Quality' | 'Hospitality' | 'Cleanliness' | 'Authenticity' | 'Communication'
  score: number // 1-5
  count: number // # of reviews mentioning this
}

// Example query
const reviewCategories = await db.review.groupBy({
  by: ['category'],
  where: { experienceId },
  _avg: { rating: true },
  _count: true,
  having: { _count: { _gte: 3 } }, // Only show if 3+ mentions
})
```

---

#### Payment Trust Signals

**Critical Moment:** Payment page = highest abandonment rate. Combat with:

```tsx
export function PaymentTrustSignals() {
  return (
    <div className="bg-muted/50 space-y-4 rounded-lg border p-6">
      <h3 className="flex items-center gap-2 font-semibold">
        <ShieldCheck className="text-primary h-5 w-5" />
        Your Booking is Protected
      </h3>

      <div className="space-y-3 text-sm">
        {/* Money-back guarantee */}
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
          <p>
            <strong>Free cancellation</strong> up to 24 hours before your experience. Full refund,
            no questions asked.
          </p>
        </div>

        {/* Secure payment */}
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
          <p>
            <strong>Secure payment</strong> processed by Stripe. Your card details are encrypted and
            never shared with hosts.
          </p>
        </div>

        {/* When charged */}
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
          <p>
            <strong>You won't be charged yet.</strong> We'll send a payment hold confirmation, and
            charge 24 hours before your experience.
          </p>
        </div>

        {/* Support */}
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
          <p>
            <strong>24/7 customer support.</strong> Issues? We're here to help via chat, email, or
            phone.
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex items-center gap-4 border-t pt-4">
        <img src="/stripe-badge.svg" alt="Secured by Stripe" className="h-8" />
        <img src="/ssl-badge.svg" alt="256-bit SSL encryption" className="h-8" />
        <p className="text-muted-foreground ml-auto text-xs">PCI DSS Compliant</p>
      </div>
    </div>
  )
}
```

---

### Conversion Funnel Friction Points

#### Typical Conversion Funnel for DineLocal

```
Homepage (100%)
   ↓ (70% continue)
Search Results (70%)
   ↓ (40% click)
Experience Detail (28%)
   ↓ (50% click Reserve)
Booking Flow Start (14%)
   ↓ (80% complete Step 1-3)
Payment Page (11.2%)
   ↓ (70% complete payment)
Booking Confirmed (7.8%)
```

**Target Conversion Rate: 8-12%** (industry standard for marketplace bookings)

#### Friction Analysis & Solutions

**Friction Point 1: Trust Barrier on Search Results**

- **Problem:** User sees card, uncertain if host is trustworthy
- **Psychology:** Loss aversion (fear of bad experience > desire for good experience)
- **Solution:**
  - ✅ Verification badge visible immediately
  - ✅ Review count + rating prominent
  - ✅ Superhost badge for top performers
  - ✅ "Instant Book" indicator (reduces perceived effort)

**Friction Point 2: Information Overwhelm on Detail Page**

- **Problem:** User wants to book but needs to scroll through reviews, menu, policy, etc.
- **Psychology:** Cognitive load, decision fatigue
- **Solution:**
  - ✅ Sticky booking card (always visible, reduces scrolling)
  - ✅ Progressive disclosure (menu collapsed by default, "See full menu" button)
  - ✅ Quick summary section (5-bullet highlights above fold)
  - ✅ TL;DR review highlights ("Great food", "Warm host", "Clean home")

**Friction Point 3: Dietary Uncertainty**

- **Problem:** Guest unsure if dietary needs can be accommodated
- **Psychology:** Risk aversion, fear of embarrassment or hunger
- **Solution:**
  - ✅ Dietary tags visible on card ("Vegan available")
  - ✅ Pre-booking confirmation: "Host can accommodate vegetarian + gluten-free"
  - ✅ Direct messaging option before booking
  - ✅ Warning for critical allergies: "🚨 Nut-free cannot be guaranteed due to home kitchen cross-contamination"

**Friction Point 4: Payment Fear**

- **Problem:** Entering credit card details for stranger's home meal
- **Psychology:** Financial risk, fraud fear
- **Solution:**
  - ✅ "You won't be charged yet" messaging
  - ✅ "Secure payment protected by DineLocal" badge
  - ✅ Price breakdown visible (no hidden fees)
  - ✅ Cancellation policy repeated ("Free cancellation until...")
  - ✅ Trust badges (Stripe, SSL, payment provider logos)

**Friction Point 5: Commitment Anxiety**

- **Problem:** Final "Reserve" click feels like major commitment
- **Psychology:** Decision paralysis, fear of regret
- **Solution:**
  - ✅ Change CTA from "Pay Now" to "Reserve" (softer commitment)
  - ✅ Repeat cancellation policy: "Free cancellation for 24 hours"
  - ✅ Reassurance messaging: "Most guests love this experience (4.9/5)"
  - ✅ Post-booking message from host: "I'm excited to host you!"

### Persuasion Principles (Cialdini's 6 Principles)

#### 1. **Social Proof**

> "People do what others do."

**DineLocal Application:**

- "342 guests have dined with Maria"
- "87% of guests rated this 5 stars"
- "This experience is a guest favorite (top 10% in Rome)"
- Review highlighting: "See what 15 guests said about Maria's hospitality"

#### 2. **Scarcity**

> "People want what's scarce or limited."

**DineLocal Application (use ethically):**

- "Only 2 spots left for May 15"
- "This host only offers 4 experiences per month"
- "Last booked 3 hours ago"
- ⚠️ **Never fake scarcity** (illegal, destroys trust)

**Ethical Scarcity Design:**

```tsx
{
  /* Only show if TRUE */
}
{
  experience.availableSpots <= 3 && (
    <Alert variant="warning">
      <Clock className="h-4 w-4" />
      Only {experience.availableSpots} spots remaining for this date
    </Alert>
  )
}

{
  /* Show popularity without fake urgency */
}
{
  experience.bookingRate > 0.8 && (
    <Badge variant="secondary">
      <TrendingUp className="h-3 w-3" />
      Often fully booked
    </Badge>
  )
}
```

#### 3. **Authority**

> "People respect authority and expertise."

**DineLocal Application:**

- "Verified Host" badge (DineLocal endorsement)
- "Trained at Le Cordon Bleu" (culinary authority)
- "3rd generation family recipe" (tradition authority)
- "Featured in Food & Wine Magazine" (media authority)

#### 4. **Consistency**

> "People like to be consistent with past actions."

**DineLocal Application:**

- Saved searches: "You searched for Italian in Rome - new experiences available!"
- Favorites reminder: "You saved this experience 3 days ago - still interested?"
- Repeat booking: "Book again with Maria (you dined together in March)"
- Profile completion: "You're 80% done setting up your profile!"

#### 5. **Liking**

> "People say yes to those they like."

**DineLocal Application:**

- Host photo visible (warm smile, welcoming pose)
- Host story prominent ("I love sharing my grandmother's recipes...")
- Personal message after booking ("I can't wait to meet you!")
- Similarity highlighting: "Maria is also from the UK" (if guest is from UK)

#### 6. **Reciprocity**

> "People feel obligated to give back when they receive."

**DineLocal Application:**

- Free value first: Recipe PDF after booking
- Host's effort visible: "Maria customizes menu for dietary needs"
- Personal touches: "Maria includes a welcome gift for first-time guests"
- Post-experience: "Maria sent you photos from the dinner!"

### Booking Funnel Optimization Tactics

#### Step 1: Date Selection

**Goal:** Get user to commit to a date (first micro-commitment)

**Optimization:**

```tsx
<Calendar>
  {/* Show availability visually (green = available) */}
  <CalendarDays modifiers={{ available, booked, blocked }} />

  {/* Default to nearest available date */}
  <DefaultSelection value={nearestAvailableDate} />

  {/* Quick select options */}
  <QuickSelect>
    <Button onClick={() => selectDate(tonight)}>Tonight</Button>
    <Button onClick={() => selectDate(thisWeekend)}>This Weekend</Button>
  </QuickSelect>

  {/* Social proof on popular dates */}
  {popularDates.includes(selectedDate) && <Note>Popular date - often books out early</Note>}
</Calendar>
```

#### Step 2: Guest Count & Dietary

**Goal:** Collect necessary info without overwhelming

**Optimization:**

```tsx
<GuestCountStep>
  {/* Smart default (2 guests, most common) */}
  <GuestCounter defaultValue={2} max={experience.maxGuests} />

  {/* Dietary checkboxes (only show if host accommodates) */}
  {experience.dietaryOptions.length > 0 && (
    <DietarySelector
      options={experience.dietaryOptions}
      helpText="Select all that apply - host will confirm"
    />
  )}

  {/* Allergy warning (critical) */}
  <Alert variant="warning">
    <AlertTriangle />
    Severe allergies? Message host before booking to confirm safety.
  </Alert>
</GuestCountStep>
```

#### Step 3: Payment

**Goal:** Reduce abandonment at final step

**Optimization:**

```tsx
<PaymentStep>
  {/* Summary box (confirms what they're getting) */}
  <BookingSummary>
    <ExperienceTitle />
    <HostAvatar />
    <DateTime />
    <GuestCount />
  </BookingSummary>

  {/* Price breakdown (transparency) */}
  <PriceBreakdown>
    <Row label={`$45 × ${guestCount} guests`} value={subtotal} />
    <Row label="Service fee" value={serviceFee} />
    <Divider />
    <Row label="Total (USD)" value={total} large bold />
  </PriceBreakdown>

  {/* Trust reinforcement (reduce fear) */}
  <TrustSignals>
    <Signal icon={<Lock />}>Secure payment</Signal>
    <Signal icon={<Calendar />}>Free cancellation until 24hrs before</Signal>
    <Signal icon={<ShieldCheck />}>Host is ID verified</Signal>
  </TrustSignals>

  {/* Payment form (minimal friction) */}
  <PaymentForm>
    <StripeCardElement /> {/* Industry standard */}
    <SaveCardCheckbox /> {/* Convenience for next time */}
  </PaymentForm>

  {/* Clear CTA (not "Pay", use softer language) */}
  <Button size="lg" className="w-full">
    Reserve Experience
  </Button>

  {/* Post-CTA reassurance */}
  <p className="text-muted-foreground mt-2 text-center text-xs">
    You'll be charged $180. Cancellation policy applies.
  </p>
</PaymentStep>
```

#### Step 4: Confirmation

**Goal:** Reinforce positive decision, reduce post-purchase anxiety

**Optimization:**

```tsx
<ConfirmationPage>
  {/* Celebration (Peak-End Rule) */}
  <SuccessAnimation>
    <Confetti />
    <CheckCircle size={64} className="text-green-500" />
  </SuccessAnimation>

  <Heading>You're all set! 🎉</Heading>
  <Subheading>Get ready to dine with Maria on May 15</Subheading>

  {/* Immediate next steps */}
  <NextSteps>
    <Step icon={<Mail />}>Confirmation email sent to you@email.com</Step>
    <Step icon={<MessageCircle />}>Message Maria to introduce yourself</Step>
    <Step icon={<Calendar />}>Add to your calendar</Step>
  </NextSteps>

  {/* Host's personal message (Liking + Reciprocity) */}
  <HostMessage>
    <Avatar src={host.photo} />
    <MessageBubble>
      "I'm so excited to host you! I'll be making my family's famous pasta recipe. Can't wait to
      meet you on the 15th! - Maria"
    </MessageBubble>
  </HostMessage>

  {/* Social sharing (Social Proof generation) */}
  <ShareButtons>
    Share your upcoming experience:
    <Button variant="outline">Share to Instagram</Button>
    <Button variant="outline">Share to Facebook</Button>
  </ShareButtons>
</ConfirmationPage>
```

### A/B Testing Hypotheses

**Test 1: Trust Badge Placement**

- **A:** Verification badge top-left of photo
- **B:** Verification badge below title
- **Hypothesis:** Top-left (A) will have higher click-through rate (seen first)
- **Metric:** Click-through rate from search to detail page

**Test 2: CTA Language**

- **A:** "Reserve Now"
- **B:** "Request to Book"
- **Hypothesis:** "Reserve" (A) will have higher conversion (lower commitment language)
- **Metric:** Booking completion rate

**Test 3: Price Display**

- **A:** "$45 per person"
- **B:** "From $45"
- **Hypothesis:** Specific price (A) will have higher trust and conversion
- **Metric:** Booking completion rate, pricing clarity survey

**Test 4: Social Proof Type**

- **A:** "87 reviews (4.9 stars)"
- **B:** "87% of guests gave 5 stars"
- **Hypothesis:** Percentage (B) will resonate more (clearer quality signal)
- **Metric:** Click-through rate, booking conversion

### Heatmap & Behavior Analysis Targets

**Key areas to track:**

1. **Search page scroll depth**: Do users see experiences below fold?
2. **Filter usage**: Which filters clicked most? (Cuisine, Dietary, Price?)
3. **Card click zones**: Do users click photo or title or rating?
4. **Detail page scroll**: Do users read reviews? Cancellation policy?
5. **Booking card stickiness**: Does sticky booking card get more clicks?
6. **Abandonment points**: Where do users drop off in booking flow?

**Tools:**

- Hotjar / Clarity for heatmaps
- Google Analytics 4 for funnel analysis
- FullStory for session replays
- Crazy Egg for A/B testing

---

## Component Design Guidelines

### Experience Card Variants

```tsx
// Compact card (search results grid)
<CompactExperienceCard className="aspect-[3/4]">
  <Image /> {/* 60% height */}
  <Content /> {/* 40% height */}
</CompactExperienceCard>

// Horizontal card (mobile list view)
<HorizontalExperienceCard className="flex">
  <Image className="w-1/3" />
  <Content className="w-2/3" />
</HorizontalExperienceCard>

// Featured card (homepage hero)
<FeaturedExperienceCard className="aspect-[16/9]">
  <Image overlay />
  <ContentOverlay />
</FeaturedExperienceCard>
```

### Search & Filter Components

```tsx
// Location autocomplete with map integration
<LocationSearch>
  <Combobox
    placeholder="City, neighborhood, or address"
    options={locationSuggestions}
    onSelect={handleLocationSelect}
  />
  <MapPopover showing={showMap}>
    <InteractiveMap onSelectArea={handleAreaSelect} />
  </MapPopover>
</LocationSearch>

// Date range picker
<DateRangePicker
  mode="range"
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
  disabled={(date) => date < new Date()}
/>

// Guest counter with breakdown
<GuestCounter>
  <Counter label="Adults" value={adults} onChange={setAdults} min={1} />
  <Counter label="Children" value={children} onChange={setChildren} min={0} />
  <Counter label="Infants" value={infants} onChange={setInfants} min={0} />
</GuestCounter>
```

### Calendar & Availability Pickers

```tsx
<AvailabilityCalendar
  mode="multiple"
  selected={selectedDates}
  onSelect={setSelectedDates}
  modifiers={{
    available: availableDates,
    booked: bookedDates,
    blocked: blockedDates,
  }}
  modifiersStyles={{
    available: { backgroundColor: 'hsl(var(--primary) / 0.1)' },
    booked: { backgroundColor: 'hsl(var(--muted))', cursor: 'not-allowed' },
    blocked: { opacity: 0.3, pointerEvents: 'none' },
  }}
  footer={
    <div className="mt-4 flex gap-2">
      <div className="flex items-center gap-1 text-sm">
        <div className="bg-primary/10 border-primary/20 h-4 w-4 rounded border" />
        Available
      </div>
      <div className="flex items-center gap-1 text-sm">
        <div className="bg-muted border-muted-foreground/20 h-4 w-4 rounded border" />
        Booked
      </div>
    </div>
  }
/>
```

### Messaging Components

```tsx
// Message bubble
<MessageBubble
  isOwn={message.senderId === currentUser.id}
  className={cn(
    'max-w-[70%] p-3 rounded-2xl',
    message.senderId === currentUser.id
      ? 'bg-primary text-primary-foreground ml-auto rounded-br-sm'
      : 'bg-muted rounded-bl-sm'
  )}
>
  <p className="text-sm">{message.content}</p>
  <span className="text-xs opacity-70 mt-1 block">
    {format(message.timestamp, 'HH:mm')}
  </span>
</MessageBubble>

// Unread message indicator
<Badge variant="destructive" className="absolute -top-2 -right-2">
  {unreadCount}
</Badge>
```

### Photo Gallery Components

```tsx
<PhotoGallery photos={experience.photos}>
  {/* Desktop: Grid layout */}
  <div className="hidden h-[500px] gap-2 md:grid md:grid-cols-4 md:grid-rows-2">
    <button
      className="relative col-span-2 row-span-2 overflow-hidden rounded-l-xl"
      onClick={() => openLightbox(0)}
    >
      <Image src={photos[0]} fill className="object-cover" />
    </button>
    <button className="relative overflow-hidden" onClick={() => openLightbox(1)}>
      <Image src={photos[1]} fill className="object-cover" />
    </button>
    <button className="relative overflow-hidden rounded-tr-xl" onClick={() => openLightbox(2)}>
      <Image src={photos[2]} fill className="object-cover" />
    </button>
    <button className="relative overflow-hidden" onClick={() => openLightbox(3)}>
      <Image src={photos[3]} fill className="object-cover" />
    </button>
    <button className="relative overflow-hidden rounded-br-xl" onClick={() => openLightbox(4)}>
      <Image src={photos[4]} fill className="object-cover" />
      {photos.length > 5 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 font-semibold text-white">
          +{photos.length - 5} photos
        </div>
      )}
    </button>
  </div>

  {/* Mobile: Scrollable carousel */}
  <div className="md:hidden">
    <Carousel>
      {photos.map((photo, index) => (
        <CarouselItem key={index}>
          <Image src={photo} width={800} height={600} className="w-full" />
        </CarouselItem>
      ))}
    </Carousel>
  </div>
</PhotoGallery>
```

---

## Accessibility for Global Audience

### WCAG 2.2 AA Compliance (2024-2025 Standards)

**DineLocal must meet WCAG 2.2 AA for:**

- International accessibility laws (EU Accessibility Act, ADA compliance)
- Elderly travelers (60+)
- Users with varying digital literacy
- Screen reader users in different languages
- Motor impairments (touch/click precision)
- Cognitive disabilities (focus management, predictable interactions)

**WCAG 2.2 adds 9 new success criteria** (added October 2023):

| Criterion                                      | Level | What It Means for DineLocal                                               | Implementation                                          |
| ---------------------------------------------- | ----- | ------------------------------------------------------------------------- | ------------------------------------------------------- |
| **2.4.11 Focus Not Obscured (Minimum)**        | AA    | Focused element must not be fully hidden by sticky headers/footers        | Ensure sticky booking card doesn't cover focused inputs |
| **2.4.12 Focus Not Obscured (Enhanced)**       | AAA   | Focused element should be fully visible                                   | Optional: Implement scroll-into-view on focus           |
| **2.4.13 Focus Appearance**                    | AAA   | Focus indicator must be clearly visible (minimum 2px thick, 3:1 contrast) | Use thick focus rings: `ring-2 ring-primary`            |
| **2.5.7 Dragging Movements**                   | AA    | Provide alternative to drag-and-drop                                      | Photo gallery: Use arrow buttons + drag                 |
| **2.5.8 Target Size (Minimum)**                | AA    | **Touch targets ≥ 24×24px** (stricter than 2.1's 44px recommendation)     | All buttons, links, icons ≥ 24px                        |
| **3.2.6 Consistent Help**                      | A     | Help access in same location across pages                                 | Chat support always in bottom-right                     |
| **3.3.7 Redundant Entry**                      | A     | Don't ask for same info twice in a session                                | Auto-fill dietary prefs from profile                    |
| **3.3.8 Accessible Authentication**            | AA    | Don't rely solely on cognitive tests (CAPTCHAs)                           | Use reCAPTCHA v3 (invisible) or email verification      |
| **3.3.9 Accessible Authentication (Enhanced)** | AAA   | No cognitive tests at all                                                 | Implement passwordless login option                     |

**Core WCAG 2.1 Requirements (Still Apply):**

1. **Color Contrast**: 4.5:1 text, 3:1 UI components
2. **Keyboard Navigation**: All features accessible without mouse
3. **Screen Readers**: Proper ARIA labels, semantic HTML
4. **Focus Indicators**: Visible focus rings (2px, 3:1 contrast for 2.2)
5. **Text Resizing**: Readable at 200% zoom
6. **Alternative Text**: All images have descriptive alt text

---

### Focus Management (WCAG 2.2 Compliance)

#### Focus Trap for Modals & Dialogs

**Problem:** When a modal opens, keyboard users can tab out of the modal to hidden content behind it.

**Solution:** Trap focus inside modal until it's closed.

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/shared/button'

export function BookingModal({ isOpen, onClose, experience }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-focus close button when modal opens (predictable focus)
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // Focus trap is built into Radix UI Dialog
        aria-describedby="booking-description"
      >
        <DialogTitle>{experience.title}</DialogTitle>
        <DialogDescription id="booking-description">
          Complete your booking for {experience.date}
        </DialogDescription>

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <input type="text" name="name" aria-label="Full name" />
          <input type="email" name="email" aria-label="Email address" />

          <div className="mt-6 flex justify-end gap-3">
            {/* Close button gets initial focus */}
            <Button ref={closeButtonRef} type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm Booking</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

**Custom Focus Trap (if not using Radix/Shadcn):**

```tsx
'use client'

import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    function handleTabKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return

      // Shift+Tab on first element -> focus last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
      // Tab on last element -> focus first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus() // Auto-focus first element

    return () => container.removeEventListener('keydown', handleTabKey)
  }, [isActive])

  return containerRef
}

// Usage:
export function CustomModal({ isOpen, onClose, children }) {
  const modalRef = useFocusTrap(isOpen)

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-black/80"
    >
      <div className="bg-background container mx-auto mt-20 max-w-lg rounded-lg p-6">
        {children}
      </div>
    </div>
  )
}
```

#### Focus Indicator Best Practices (WCAG 2.4.13)

**Required:**

- **Minimum thickness:** 2px
- **Contrast ratio:** 3:1 against adjacent colors
- **Visible on all interactive elements**

```css
/* globals.css - Custom focus styles */
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast focus for critical actions */
button:focus-visible,
a:focus-visible {
  outline: 3px solid hsl(var(--primary));
  outline-offset: 3px;
}

/* Skip to content link (keyboard users only) */
.skip-to-content:focus {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 9999;
  padding: 12px 24px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  text-decoration: none;
  border-radius: 8px;
  outline: 3px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

**Tailwind CSS Focus Utilities:**

```tsx
import { Button } from '@/components/shared/button'

// Default focus (already in Shadcn Button)
<Button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
  Book Now
</Button>

// High-visibility focus for primary CTAs
<Button className="focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4">
  Reserve Experience
</Button>

// Custom focus color for destructive actions
<Button
  variant="destructive"
  className="focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
>
  Cancel Booking
</Button>
```

#### Focus Not Obscured (WCAG 2.4.11/2.4.12)

**Problem:** Sticky headers/footers can cover focused elements.

**Solution:** Add padding or scroll focused elements into view.

```tsx
'use client'

export function BookingForm() {
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    // Scroll element into view, ensuring it's not hidden by sticky elements
    e.target.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Center vertically (avoids sticky header/footer)
      inline: 'nearest',
    })
  }

  return (
    <form className="pb-32">
      {' '}
      {/* Add padding for sticky booking card */}
      <input
        type="text"
        name="name"
        aria-label="Full name"
        onFocus={handleFocus}
        className="focus-visible:ring-primary focus-visible:ring-2"
      />
      <input
        type="email"
        name="email"
        aria-label="Email address"
        onFocus={handleFocus}
        className="focus-visible:ring-primary focus-visible:ring-2"
      />
      {/* Sticky booking card at bottom */}
      <div className="bg-background fixed right-0 bottom-0 left-0 border-t p-4 shadow-lg">
        <Button className="w-full">Reserve - $45</Button>
      </div>
    </form>
  )
}
```

#### Keyboard Navigation Patterns

**Essential Keyboard Shortcuts:**

| Element             | Keys             | Behavior                                    |
| ------------------- | ---------------- | ------------------------------------------- |
| **Modal/Dialog**    | `Escape`         | Close modal, return focus to trigger button |
| **Dropdown/Select** | `Space`, `Enter` | Open dropdown                               |
| **Dropdown/Select** | `↑` `↓`          | Navigate options                            |
| **Dropdown/Select** | `Escape`         | Close without selecting                     |
| **Date Picker**     | `↑` `↓` `←` `→`  | Navigate calendar days                      |
| **Tabs**            | `Tab`            | Move to next focusable element              |
| **Tabs**            | `←` `→`          | Switch between tabs (roving tabindex)       |
| **Image Gallery**   | `←` `→`          | Previous/next image                         |
| **Search Input**    | `/`              | Focus search (keyboard shortcut)            |

**Roving Tabindex for Tab Navigation:**

```tsx
'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export function ExperienceTabs({ experience }) {
  // Radix UI Tabs implements roving tabindex automatically
  return (
    <Tabs defaultValue="menu" className="w-full">
      <TabsList aria-label="Experience information">
        {/* Arrow keys navigate between tabs */}
        <TabsTrigger value="menu">Menu</TabsTrigger>
        <TabsTrigger value="about">About Host</TabsTrigger>
        <TabsTrigger value="location">Location</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="menu" tabIndex={0}>
        {/* Tab panel content */}
      </TabsContent>
      {/* ... other panels */}
    </Tabs>
  )
}
```

#### ARIA Live Regions for Dynamic Content

**When to Use:**

- Booking confirmation messages
- Availability updates ("Only 2 spots left")
- Error messages
- Loading states
- Search results count

**Live Region Politeness Levels:**

| Level                   | When to Use              | Example                             |
| ----------------------- | ------------------------ | ----------------------------------- |
| `aria-live="assertive"` | Urgent, critical updates | "Booking failed - payment declined" |
| `aria-live="polite"`    | Non-urgent updates       | "Booking confirmed!"                |
| `aria-live="off"`       | No announcements         | Static content                      |

```tsx
'use client'

import { useState } from 'react'
import { useCreateBooking } from '@/features/bookings/hooks/useCreateBooking'
import { Button } from '@/components/shared/button'

export function BookingForm({ experienceId }) {
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const { mutate: createBooking, isPending } = useCreateBooking()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createBooking(
      { experienceId, /* ... */ },
      {
        onSuccess: () => {
          setMessageType('success')
          setMessage('Booking confirmed! You'll receive an email shortly.')
        },
        onError: (error) => {
          setMessageType('error')
          setMessage(`Booking failed: ${error.message}`)
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form fields ... */}

      {/* Live region for screen readers */}
      <div
        role="status"
        aria-live={messageType === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        className="sr-only" // Visually hidden, screen reader only
      >
        {message}
      </div>

      {/* Visual message */}
      {message && (
        <div
          className={`p-4 rounded-lg mb-4 ${
            messageType === 'success'
              ? 'bg-green-50 text-green-900 border border-green-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}
          role="alert" // For visual users
        >
          {message}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Processing...' : 'Reserve Experience'}
      </Button>
    </form>
  )
}
```

**Search Results Live Region:**

```tsx
'use client'

export function ExperienceSearch() {
  const [query, setQuery] = useState('')
  const { data: results } = useSearchExperiences(query)

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search experiences"
        aria-describedby="search-results-count"
      />

      {/* Live region announces result count */}
      <div id="search-results-count" role="status" aria-live="polite" aria-atomic="true">
        {results && `${results.length} experiences found`}
      </div>

      {/* Results list */}
      <ul aria-label="Search results">
        {results?.map((exp) => (
          <li key={exp.id}>
            <ExperienceCard {...exp} />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

### Multi-Language Considerations

```tsx
// Language selector
<LanguageSelector>
  <Select value={currentLanguage} onValueChange={setLanguage}>
    <SelectTrigger>
      <Globe className="w-4 h-4 mr-2" />
      {languages[currentLanguage].name}
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="en">🇺🇸 English</SelectItem>
      <SelectItem value="es">🇪🇸 Español</SelectItem>
      <SelectItem value="fr">🇫🇷 Français</SelectItem>
      <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
      <SelectItem value="ja">🇯🇵 日本語</SelectItem>
      <SelectItem value="zh">🇨🇳 中文</SelectItem>
      {/* ... more languages */}
    </SelectContent>
  </Select>
</LanguageSelector>

// RTL support for Arabic, Hebrew, etc.
<html dir={isRTL ? 'rtl' : 'ltr'} lang={currentLanguage}>
```

### Cultural Icon Recognition

**Use universally recognized symbols:**

| Concept        | Icon             | Alternative Text |
| -------------- | ---------------- | ---------------- |
| Location       | 📍 Pin           | "Location"       |
| Calendar       | 📅 Calendar      | "Date"           |
| People/Guests  | 👥 Users         | "Guests"         |
| Money/Price    | 💰 DollarSign    | "Price"          |
| Star Rating    | ⭐ Star          | "Rating"         |
| Verified       | ✓ CheckCircle    | "Verified"       |
| Message        | 💬 MessageCircle | "Message"        |
| Heart/Favorite | ❤️ Heart         | "Favorite"       |
| Food/Dining    | 🍽️ Utensils      | "Dining"         |
| Home           | 🏠 Home          | "Home"           |

**Avoid culture-specific idioms in icons/copy:**

- ❌ "Piece of cake" → ✅ "Very easy"
- ❌ Thumbs up (offensive in some cultures) → ✅ Checkmark
- ❌ Red = danger (not universal) → ✅ Red + icon + text

### Touch Target Sizing (WCAG 2.5.8)

**WCAG 2.2 Target Size Requirements:**

WCAG 2.5.8 (Level AA) requires touch targets to be **at least 24×24px**, a significant change from the previous 44×44px guideline in WCAG 2.1.

**Exceptions (targets can be < 24px if):**

1. **Spacing:** Surrounded by 24px of blank space on all sides
2. **Inline:** Within a sentence (e.g., inline links)
3. **User-controlled:** Size set by user agent (e.g., default checkbox)
4. **Essential:** Specific size is required (e.g., maps, data visualizations)

**DineLocal Target Size Recommendations:**

| Element Type                     | WCAG 2.2 Minimum | DineLocal Standard                          | Rationale                                          |
| -------------------------------- | ---------------- | ------------------------------------------- | -------------------------------------------------- |
| **Primary CTAs** (Book, Reserve) | 24×24px          | **56×56px (h-14)**                          | Easy thumb press for elderly/motor-impaired        |
| **Secondary Buttons**            | 24×24px          | **48×48px (h-12)**                          | Industry best practice, generous tap target        |
| **Icon Buttons**                 | 24×24px          | **48×48px (h-12 w-12)**                     | Consistent with standard button sizing             |
| **Links in Text**                | Exempt (inline)  | Natural size                                | Use sufficient line-height (1.5)                   |
| **Form Inputs**                  | 24×24px          | **44×44px height (h-11)**                   | Mobile-first form design, vertical space efficient |
| **Checkboxes/Radio**             | 24×24px          | **24×24px with 12px padding (h-6 w-6 p-3)** | Total clickable area: 48×48px                      |
| **Filter Chips**                 | 24×24px          | **36×36px (h-9)**                           | Compact for frequent interaction                   |

**Implementation Details:**
For exact Tailwind classes and code examples, see:
📖 `/frontend/.claude/context/STYLE_GUIDE.md` → Component Styling → Button Size Guidelines

**Spacing Between Targets:**

- **Minimum:** 8px (prevents mis-taps)
- **Recommended:** 16px (comfortable for thumbs)
- **Elderly/Motor-Impaired:** 24px (generous spacing)

**Implementation Examples:**

```tsx
import { Button } from '@/components/shared/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Heart, Share2, MapPin } from 'lucide-react'

// ✅ Primary CTA - 56px height (well above 24px minimum)
<Button
  size="lg"
  className="
    min-h-14          /* 56px for easy thumb press */
    w-full            /* Full width on mobile */
    md:w-auto         /* Auto width on desktop */
    text-lg           /* Larger text for readability */
    font-semibold     /* Bold for emphasis */
  "
>
  Reserve Experience
</Button>

// ✅ Icon button - 48px with proper padding (industry best practice)
<Button
  variant="ghost"
  size="icon"
  aria-label="Add to favorites"
  className="
    h-12 w-12        /* 48×48px clickable area */
    rounded-full
    hover:bg-muted
  "
>
  <Heart className="h-5 w-5" />
</Button>

// ✅ Filter chips - 36px with 16px spacing
<div className="flex flex-wrap gap-4"> {/* 16px spacing */}
  {filters.map(filter => (
    <Button
      key={filter.id}
      variant="outline"
      size="sm"
      className="
        h-9            /* 36px height */
        px-4
        rounded-full
      "
    >
      {filter.label}
    </Button>
  ))}
</div>

// ✅ Checkbox with sufficient padding (total 48×48px tap area)
<label className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted rounded-lg">
  <Checkbox
    className="
      h-6 w-6        /* 24×24px checkbox */
      /* 12px padding from label = 48×48px total tap area */
    "
  />
  <span>Vegetarian</span>
</label>

// ✅ Mobile form input - 44px height
<input
  type="text"
  placeholder="Search experiences"
  className="
    h-11             /* 44px height */
    px-4
    text-base        /* 16px - prevents zoom on iOS */
    rounded-lg
    border border-input
  "
/>

// ✅ Stacked action buttons with 12px gap
<div className="flex flex-col gap-3"> {/* 12px spacing */}
  <Button className="h-11 w-full">Book Now</Button>
  <Button variant="outline" className="h-11 w-full">Message Host</Button>
  <Button variant="ghost" className="h-11 w-full">Save for Later</Button>
</div>

// ❌ BAD - Icon button too small (20×20px)
<button className="h-5 w-5">
  <Heart />
</button>

// ❌ BAD - Buttons too close (4px gap)
<div className="flex gap-1">
  <Button>Option 1</Button>
  <Button>Option 2</Button>
</div>
```

**Mobile-First Touch Zone Design:**

```tsx
export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group relative">
      <Image src={experience.photo} alt={experience.title} />

      {/* Top-right actions - 40×40px with 12px gap */}
      <div className="absolute top-2 right-2 flex gap-3">
        <Button
          variant="secondary"
          size="icon"
          aria-label="Share experience"
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Save to favorites"
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{experience.title}</h3>
        <p className="text-muted-foreground">{experience.host.name}</p>

        {/* Primary CTA - full width, 44px height */}
        <Button className="mt-4 h-11 w-full">View Experience</Button>
      </div>
    </div>
  )
}
```

**Thumb Zone Considerations for Mobile:**

```
┌─────────────────────┐
│  Hard to Reach (❌) │  <- Top corners
│                     │
│   Easy Reach (✅)   │  <- Middle area
│                     │
│  Primary CTAs (✅)  │  <- Bottom (thumb zone)
└─────────────────────┘
```

**Best Practices:**

- **Bottom zone (thumb-friendly):** Primary CTAs, navigation
- **Middle zone (easy reach):** Frequent interactions, filters
- **Top zone (requires hand shift):** Secondary actions, close buttons

```tsx
// ✅ Sticky bottom CTA (thumb zone)
export function StickyBookingCard({ experience }: Props) {
  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-lg">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold">${experience.price}</p>
            <p className="text-muted-foreground text-sm">per person</p>
          </div>
          <Button size="lg" className="h-14 px-8">
            {' '}
            {/* 56px height - primary CTA */}
            Reserve
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

### Age-Inclusive Design (18+, Elderly Travelers)

**Typography:**

- Base font size: **16px** (never smaller)
- Line height: **1.5** (150%)
- Font weight: **400-600** (avoid thin fonts)
- Letter spacing: Comfortable (not too tight)

```css
body {
  font-size: 16px;
  line-height: 1.5;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}
h2 {
  font-size: 2rem;
  font-weight: 600;
}
h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
p {
  font-size: 1rem;
  font-weight: 400;
}
```

**Clear Visual Hierarchy:**

```tsx
<ExperienceCard>
  {/* Large, prominent title */}
  <h2 className="mb-2 text-2xl font-semibold">Traditional Italian Pasta Making</h2>

  {/* Clear supporting info */}
  <p className="text-muted-foreground mb-4 text-base">Italian cuisine • 4 guests max • 3 hours</p>

  {/* Obvious primary action */}
  <Button size="lg" className="min-h-12 w-full">
    Book Now - $45/person
  </Button>
</ExperienceCard>
```

**Simple Language:**

- ✅ "Book this experience"
- ❌ "Reserve your culinary adventure"

- ✅ "Free cancellation until 24 hours before"
- ❌ "Flexible cancellation policy subject to terms"

---

## SEO & Discoverability

### Structured Data for Experiences

```tsx
// Experience page JSON-LD
export default function ExperiencePage({ experience }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FoodEvent',
    name: experience.title,
    description: experience.description,
    image: experience.photos,
    startDate: experience.nextAvailableDate,
    endDate: experience.endTime,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: `${experience.neighborhood}, ${experience.city}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: experience.city,
        addressRegion: experience.state,
        addressCountry: experience.country,
      },
    },
    organizer: {
      '@type': 'Person',
      name: experience.host.name,
      image: experience.host.photo,
    },
    offers: {
      '@type': 'Offer',
      url: `https://dinelocal.com/experiences/${experience.slug}`,
      price: experience.pricePerPerson,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: experience.rating,
      reviewCount: experience.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    servesCuisine: experience.cuisineType,
  }

  return (
    <>
      {/* ✅ SAFE: dangerouslySetInnerHTML is safe here because:
          1. Data is controlled (jsonLd object), not user-generated
          2. JSON.stringify() prevents injection
          3. This is standard Next.js SEO pattern for structured data
          See SECURITY_GUIDE.md for XSS prevention with user-generated content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

### Location-Based SEO

**City Landing Pages:**

```tsx
// app/experiences/[city]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const city = await getCityData(params.city)

  return {
    title: `Authentic Home Dining Experiences in ${city.name} | DineLocal`,
    description: `Discover unique home-cooked meals and cultural dining experiences in ${city.name}. Book authentic local cuisine with verified hosts.`,
    keywords: [
      `dining experiences ${city.name}`,
      `home cooked meals ${city.name}`,
      `authentic ${city.name} food`,
      `local cuisine ${city.name}`,
    ],
    openGraph: {
      title: `Home Dining Experiences in ${city.name}`,
      description: `Experience authentic ${city.name} cuisine in local homes`,
      images: [city.featuredImage],
      type: 'website',
      url: `https://dinelocal.com/experiences/${city.slug}`,
    },
  }
}
```

**Cuisine Category Pages:**

```tsx
// app/cuisine/[type]/page.tsx
export const metadata: Metadata = {
  title: 'Authentic Italian Home Dining Experiences | DineLocal',
  description:
    'Experience authentic Italian cuisine in local homes worldwide. Book home-cooked Italian meals with verified hosts.',
  keywords: ['italian food', 'authentic italian', 'home cooked italian', 'italian dinner'],
}
```

### Performance Optimization for Image-Heavy Content

**Image Optimization:**

```tsx
// Optimized experience card images
<Image
  src={experience.coverPhoto}
  alt={experience.title}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL={experience.blurHash}
  loading="lazy" // Lazy load below fold
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Hero images - priority load
<Image
  src="/hero.jpg"
  alt="DineLocal hero"
  width={1920}
  height={1080}
  priority // Preload above fold
  quality={90}
/>
```

**Core Web Vitals 2025 Targets:**

| Metric                              | Threshold | What It Measures             | Priority for DineLocal                             |
| ----------------------------------- | --------- | ---------------------------- | -------------------------------------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5s    | How fast main content loads  | 🔴 **Critical** - Hero images, experience cards    |
| **INP** (Interaction to Next Paint) | < 200ms   | Responsiveness to user input | 🔴 **Critical** - Booking clicks, filters, search  |
| **CLS** (Cumulative Layout Shift)   | < 0.1     | Visual stability during load | 🟡 **High** - Image placeholders, skeleton screens |
| **FCP** (First Contentful Paint)    | < 1.8s    | First visible content        | 🟡 **High** - Perceived performance                |
| **TTFB** (Time to First Byte)       | < 600ms   | Server response time         | 🟢 **Medium** - Edge functions help                |

**Note:** INP replaced FID in March 2024 as an official Core Web Vital. It measures overall responsiveness, not just first input.

---

**Critical Optimizations for DineLocal:**

#### 1. Image Loading Strategy (Affects LCP)

**Priority Loading:**

```tsx
import Image from 'next/image'

// Hero/cover images (above fold) - PRIORITY
<Image
  src={experience.coverPhoto}
  alt={experience.title}
  width={1200}
  height={800}
  priority // Preloads this image
  quality={90}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={experience.blurHash}
/>

// Below-fold images - LAZY
<Image
  src={photo.url}
  alt={photo.caption}
  width={600}
  height={400}
  loading="lazy" // Browser-native lazy loading
  quality={85}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

**Modern Format Support:**

```tsx
// Next.js automatically serves WebP/AVIF when supported
// Configure in next.config.js:
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

**Responsive Images with srcset:**

```tsx
// Experience card image
<Image
  src={experience.photo}
  alt={experience.title}
  width={400}
  height={300}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  // Next.js automatically generates srcset
/>
```

#### 2. Reducing INP (Interaction Responsiveness)

**Problem:** Slow response to booking clicks, filter changes, search input.

**Solution: Optimize JavaScript Execution**

```tsx
// ❌ BAD: Heavy computation on main thread
function ExperienceList({ experiences }) {
  const filtered = experiences.filter((exp) => {
    // Complex filtering logic runs on every render
    return heavyComputation(exp)
  })

  return filtered.map((exp) => <ExperienceCard key={exp.id} {...exp} />)
}

// ✅ GOOD: Memoize expensive computations
import { useMemo } from 'react'

function ExperienceList({ experiences, filters }) {
  const filtered = useMemo(() => {
    return experiences.filter((exp) => matchesFilters(exp, filters))
  }, [experiences, filters]) // Only recompute when these change

  return filtered.map((exp) => <ExperienceCard key={exp.id} {...exp} />)
}
```

**Debounce Search Input:**

```tsx
'use client'

import { useState, useTransition } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isPending, startTransition] = useTransition()
  const debouncedQuery = useDebounce(query, 300)

  function handleSearch(value: string) {
    setQuery(value)

    // Mark search as non-urgent (won't block UI)
    startTransition(() => {
      router.push(`/search?q=${value}`)
    })
  }

  return (
    <Input
      value={query}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search experiences..."
      className={isPending ? 'opacity-60' : ''}
    />
  )
}
```

**Code Splitting for Heavy Components:**

```tsx
import dynamic from 'next/dynamic'

// Don't load map until needed (improves INP)
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  loading: () => <MapSkeleton />,
  ssr: false, // Maps need browser APIs
})

// Photo editor modal - only load when opened
const PhotoEditor = dynamic(() => import('@/features/photos/PhotoEditor'), { ssr: false })
```

#### 3. Preventing CLS (Layout Shift)

**Reserve Space for Images:**

```tsx
// ✅ GOOD: aspect-ratio reserves space
<div className="aspect-[4/3] bg-muted">
  <Image
    src={experience.photo}
    alt={experience.title}
    fill
    className="object-cover"
  />
</div>

// ❌ BAD: No reserved space = layout shift when image loads
<img src={experience.photo} alt={experience.title} />
```

**Skeleton Screens Matching Content:**

```tsx
export function ExperienceCardSkeleton() {
  return (
    <Card>
      {/* Match actual card dimensions */}
      <Skeleton className="h-48 w-full" /> {/* Photo */}
      <div className="space-y-2 p-4">
        <Skeleton className="h-6 w-3/4" /> {/* Title */}
        <Skeleton className="h-4 w-1/2" /> {/* Host name */}
        <Skeleton className="h-4 w-full" /> {/* Description */}
      </div>
    </Card>
  )
}
```

**Font Loading (Prevent FOUT/FOIT):**

```tsx
// app/layout.tsx - next/font prevents layout shift
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Swap to custom font when ready
  preload: true,
  variable: '--font-inter',
})

// CSS variable approach prevents shift
<html className={inter.variable}>
  <body className="font-sans"> {/* Uses variable */}
    {children}
  </body>
</html>
```

#### 4. Optimizing TTFB with Edge Functions

**Deploy API routes to Edge:**

```tsx
// app/api/experiences/route.ts
export const runtime = 'edge' // Runs on Cloudflare Edge

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location')

  // Fast response from edge (< 100ms globally)
  const experiences = await getExperiencesNearLocation(location)

  return Response.json(experiences)
}
```

**ISR for Dynamic Content:**

```tsx
// app/experiences/[id]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  // Pre-generate top 100 experiences
  const popular = await getPopularExperiences(100)

  return popular.map((exp) => ({ id: exp.id }))
}
```

#### 5. Virtual Scrolling for Long Lists

**For 100+ experiences:**

```tsx
'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: experiences.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350, // Estimated card height
    overscan: 5, // Render 5 extra items
  })

  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ExperienceCard experience={experiences[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Benefits:**

- Only renders visible items (not all 1000)
- Smooth scrolling even with huge lists
- Dramatically improves INP

---

**Performance Monitoring:**

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights /> {/* Tracks Core Web Vitals */}
        <Analytics /> {/* User analytics */}
      </body>
    </html>
  )
}
```

**Lighthouse CI in GitHub Actions:**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/experiences/1
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

**Performance Budget:**

| Resource Type     | Budget  | Current | Status |
| ----------------- | ------- | ------- | ------ |
| JavaScript        | < 200KB | 185KB   | ✅     |
| CSS               | < 50KB  | 42KB    | ✅     |
| Images (per page) | < 1MB   | 890KB   | ✅     |
| Total page size   | < 2MB   | 1.8MB   | ✅     |
| Requests          | < 50    | 38      | ✅     |

**Monitor with:**

```bash
# Analyze bundle size
npx @next/bundle-analyzer

# Check lighthouse score
npx lighthouse http://localhost:3000 --view

# Monitor Core Web Vitals in production
# → Vercel Analytics Dashboard
```

---

## Food Photography Design Principles

### Overview: Photography as Trust Signal

For DineLocal, food photography serves multiple purposes:

1. **Appetite Appeal**: Makes food look delicious and worth the price
2. **Authenticity Signal**: Shows real home settings (not professional studios)
3. **Cultural Context**: Displays traditional preparation and presentation
4. **Trust Building**: Real photos = trustworthy host
5. **Storytelling**: Communicates host's personality and style

**Photography Philosophy:**

> "Imperfect authenticity beats staged perfection"

We're not selling restaurant meals—we're selling authentic cultural experiences in real homes.

### Designing Photography Guidance UI

**Design Goal:** Help hosts upload high-quality photos through educational tooltips, examples, and real-time feedback—not rigid requirements.

**Philosophy:** Provide photography best practices as **helpful suggestions in the UI**, not enforce them as blocking requirements.

---

#### Photo Quality Education UI Patterns

**1. Contextual Tips in Upload Interface:**

Design pattern for showing photography best practices **during** the upload flow:

```tsx
<PhotoUploadSection>
  <SectionHeader>
    <h3>Experience Photos</h3>
    <Tooltip>
      <InfoIcon />
      <TooltipContent>
        Photos are your first impression! Experiences with 5+ clear photos get 60% more bookings.
      </TooltipContent>
    </Tooltip>
  </SectionHeader>

  {/* Expandable photography tips (optional, not required reading) */}
  <Accordion type="single" collapsible className="mb-4">
    <AccordionItem value="lighting-tips">
      <AccordionTrigger className="text-sm">💡 Photography Tips: Lighting</AccordionTrigger>
      <AccordionContent>
        <div className="text-muted-foreground space-y-2 text-sm">
          <p>
            <strong>Natural light works best:</strong> Try shooting near a window during daytime
            (10am-4pm)
          </p>
          <p>
            <strong>Avoid flash:</strong> It can wash out food and create harsh glare
          </p>
          <p className="text-xs italic">
            These are suggestions based on what works well for top hosts— but your authentic style
            is what matters most!
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="angle-tips">
      <AccordionTrigger className="text-sm">💡 Photography Tips: Angles</AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-3">
          <TipCard
            icon={<ViewIcon />}
            title="Overhead View"
            description="Great for table spreads showing multiple dishes"
            example="Mexican feast, Japanese bento"
          />
          <TipCard
            icon={<AngleIcon />}
            title="45-Degree Angle"
            description="Most versatile—shows depth and looks natural"
            example="Pasta bowls, curry plates"
          />
          <TipCard
            icon={<EyeIcon />}
            title="Eye-Level"
            description="Perfect for tall items and ambiance shots"
            example="Burgers, layered cakes"
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <PhotoDropzone />
</PhotoUploadSection>
```

**Design Rationale:**

- Tips are **collapsed by default** (optional, not forced)
- Framed as "what works well" not "what you must do"
- Includes disclaimer: "your authentic style is what matters most"
- Uses encouraging tone: "Try..." not "You must..."

---

**2. Real-Time Photo Analysis Feedback:**

When hosts upload photos, provide **automated feedback with suggestions** (not blocking errors):

```tsx
// After photo upload, show analysis results
<PhotoAnalysisCard photo={uploadedPhoto}>
  <div className="flex items-start gap-3">
    <img src={photo.preview} className="h-20 w-20 rounded object-cover" />
    <div className="flex-1">
      {/* Lighting analysis */}
      {analysis.lighting === 'too_dark' && (
        <Alert variant="info" className="mb-2 text-sm">
          <Lightbulb className="h-4 w-4" />
          <AlertDescription>
            This photo looks a bit dark. Brighter photos tend to perform better—try shooting near a
            window or adjusting brightness in editing!
            <Button variant="ghost" size="sm" className="ml-2">
              Keep it anyway
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {analysis.lighting === 'good' && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span>Great lighting! Photo looks clear and appetizing</span>
        </div>
      )}

      {/* Composition suggestions (not requirements) */}
      {analysis.composition.hasNegativeSpace < 0.3 && (
        <p className="text-muted-foreground mt-1 text-xs">
          💡 Tip: A bit of empty space around the food can make it stand out more
        </p>
      )}

      {/* Angle detection (informative, not prescriptive) */}
      {analysis.detectedAngle && (
        <p className="text-muted-foreground text-xs">
          Detected: {analysis.detectedAngle} view
          {analysis.angleRecommendation && <span> · {analysis.angleRecommendation}</span>}
        </p>
      )}
    </div>
  </div>
</PhotoAnalysisCard>
```

**Key Design Decisions:**

- Use "info" alerts (blue), not "error" (red) for suggestions
- Always provide "Keep it anyway" option—host has final say
- Frame as data-driven suggestions: "tend to perform better"
- Show positive feedback when photo is good (green checkmark)

---

**3. Example Photo Gallery (Inspiration, Not Templates):**

Provide hosts with examples showing **diverse styles** that work:

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" size="sm">
      <ImageIcon className="mr-2 h-4 w-4" />
      View Example Photos
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Photo Examples from Top Hosts</DialogTitle>
      <DialogDescription>
        These hosts have 5-star ratings and high booking rates. Notice the variety in styles—there's
        no single "right" way!
      </DialogDescription>
    </DialogHeader>

    <Tabs defaultValue="hero">
      <TabsList>
        <TabsTrigger value="hero">Hero Shots</TabsTrigger>
        <TabsTrigger value="spread">Table Spreads</TabsTrigger>
        <TabsTrigger value="space">Dining Spaces</TabsTrigger>
        <TabsTrigger value="host">Host Photos</TabsTrigger>
      </TabsList>

      <TabsContent value="hero" className="space-y-4">
        {examplePhotos.hero.map((example) => (
          <ExamplePhotoCard key={example.id}>
            <img src={example.url} alt="" className="rounded-lg" />
            <div className="mt-2">
              <p className="text-sm font-medium">{example.cuisine}</p>
              <p className="text-muted-foreground text-xs">{example.whyItWorks}</p>
              <div className="mt-2 flex gap-2 text-xs">
                <Badge variant="secondary">{example.lighting}</Badge>
                <Badge variant="secondary">{example.angle}</Badge>
                <Badge variant="secondary">{example.setting}</Badge>
              </div>
            </div>
          </ExamplePhotoCard>
        ))}
      </TabsContent>

      {/* Other tabs... */}
    </Tabs>

    <Alert className="mt-4">
      <InfoIcon className="h-4 w-4" />
      <AlertDescription>
        These examples show different styles that all work well. Your authentic home setting and
        personal style is what makes your experience unique!
      </AlertDescription>
    </Alert>
  </DialogContent>
</Dialog>
```

**Design Strategy:**

- Show variety, not a single template ("no single right way")
- Explain **why** each example works (educational)
- Tag examples with metadata (lighting type, angle) for learning
- Emphasize authenticity over perfection

---

#### Photography Education Content Structure

**Design Strategy:** Package photography knowledge as **optional educational content** accessible within the UI, not requirements.

**Content Organization Pattern:**

```tsx
// Structure educational content in easily digestible chunks
const photographyTips = {
  angles: {
    title: "Camera Angles",
    description: "Different angles work for different foods",
    tips: [
      {
        name: "Overhead (Bird's Eye)",
        icon: <ViewFromAboveIcon />,
        bestFor: ["Table spreads", "Multiple dishes", "Flat foods"],
        examples: ["Mezze spread", "Japanese bento", "Pizza"],
        visualExample: "/images/tips/overhead-example.jpg"
      },
      {
        name: "45-Degree",
        icon: <AngleIcon />,
        bestFor: ["Individual dishes", "Most versatile", "Shows depth"],
        examples: ["Pasta bowls", "Curry plates", "Salads"],
        visualExample: "/images/tips/45-degree-example.jpg"
      },
      {
        name: "Eye-Level",
        icon: <EyeIcon />,
        bestFor: ["Tall items", "Stacked foods", "People + food"],
        examples: ["Burgers", "Layered cakes", "Ambiance shots"],
        visualExample: "/images/tips/eye-level-example.jpg"
      }
    ]
  },
  composition: {
    title: "Composition Basics",
    description: "Simple tricks to make photos more engaging",
    tips: [
      {
        name: "Rule of Thirds",
        concept: "Place the main dish at intersection points, not dead center",
        visual: "/images/tips/rule-of-thirds-grid.jpg",
        beforeAfter: {
          before: "/images/tips/centered-plate.jpg",
          after: "/images/tips/thirds-plate.jpg",
          improvement: "+24% engagement"
        }
      },
      {
        name: "Negative Space",
        concept: "Leave some empty space around food—it makes the dish stand out",
        visual: "/images/tips/negative-space.jpg",
        benefit: "Makes room for text overlays on cards, less overwhelming"
      }
    ]
  },
  colorTheory: {
    title: "Color Combinations",
    description: "Colors that make food look more appetizing",
    tips: [
      {
        category: "Warm Tones (Appetite Boost)",
        colors: ["Reds", "Oranges", "Yellows", "Browns"],
        examples: [
          { combination: "Red tomatoes + Green basil", cuisine: "Italian" },
          { combination: "Orange curry + White rice", cuisine: "Indian" }
        ],
        note: "Warm colors naturally stimulate appetite"
      },
      {
        category: "Cool Tones (Use as Accent)",
        colors: ["Blues", "Grays"],
        examples: [
          { combination: "Blue plate under warm food", effect: "Nice contrast" }
        ],
        note: "Cool backgrounds can make warm food pop"
      }
    ]
  }
}

// Display in UI as optional learning resource
<PhotographyLearningCenter>
  <DialogTrigger asChild>
    <Button variant="link" size="sm">
      <BookIcon className="w-4 h-4 mr-2" />
      Photography Learning Center
    </Button>
  </DialogTrigger>
  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
    <Tabs defaultValue="angles">
      <TabsList>
        <TabsTrigger value="angles">Camera Angles</TabsTrigger>
        <TabsTrigger value="composition">Composition</TabsTrigger>
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="editing">Editing</TabsTrigger>
      </TabsList>

      {/* Each tab shows educational content with visuals */}
      <TabsContent value="angles">
        <div className="space-y-4">
          {photographyTips.angles.tips.map(tip => (
            <Card key={tip.name}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {tip.icon}
                  <CardTitle className="text-lg">{tip.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-2">
                      <strong>Works well for:</strong>
                    </p>
                    <ul className="text-sm space-y-1">
                      {tip.bestFor.map(use => (
                        <li key={use}>• {use}</li>
                      ))}
                    </ul>
                    <p className="text-sm mt-3">
                      <strong>Examples:</strong> {tip.examples.join(", ")}
                    </p>
                  </div>
                  <img
                    src={tip.visualExample}
                    alt={tip.name}
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mt-4">
          <InfoIcon className="w-4 h-4" />
          <AlertDescription className="text-sm">
            These are suggestions based on what typically works well. Experiment
            and use what feels natural for your style!
          </AlertDescription>
        </Alert>
      </TabsContent>

      {/* Other tabs follow similar pattern */}
    </Tabs>
  </DialogContent>
</PhotographyLearningCenter>
```

**Design Principles:**

- **Opt-in education**: Hidden behind "Learning Center" link (not forced)
- **Visual examples**: Show, don't just tell
- **Data-backed**: When possible, show performance benefits ("+24% engagement")
- **Encouraging disclaimer**: "Experiment and use what feels natural"
- **Organized by topic**: Easy to find specific guidance
- **Before/after comparisons**: Help hosts see the difference

---

### Designing Photo Category Guidance

**Design Goal:** Help hosts understand what types of photos work well through **categorized suggestions** in the upload UI.

**UI Pattern:** Photo upload interface with category recommendations (not strict requirements).

```tsx
<PhotoUploadInterface>
  <div className="mb-6">
    <h3 className="mb-2 text-lg font-semibold">Add Your Photos</h3>
    <p className="text-muted-foreground text-sm">
      Upload 5-8 photos to give guests a complete picture of your experience. Diverse shots tell
      your story best!
    </p>
  </div>

  {/* Photo category suggestions (not enforced) */}
  <div className="bg-muted/30 mb-4 rounded-lg p-4">
    <p className="mb-3 text-sm font-medium">Suggested photo variety:</p>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
      {photoCategorySuggestions.map((category) => (
        <div key={category.id} className="flex items-center gap-2 text-xs">
          {uploadedPhotos.some((p) => p.suggestedCategory === category.id) ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <Circle className="text-muted-foreground h-4 w-4" />
          )}
          <span>{category.label}</span>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="h-3 w-3" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">{category.tip}</p>
              <p className="text-muted-foreground mt-1 text-xs">{category.example}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
    <p className="text-muted-foreground mt-3 text-xs italic">
      These are suggestions based on what guests typically want to see. Upload what feels right for
      your experience!
    </p>
  </div>

  {/* Photo upload dropzone */}
  <PhotoDropzone onUpload={handleUpload} />

  {/* Uploaded photos with auto-detected categories */}
  <div className="mt-6 space-y-3">
    {uploadedPhotos.map((photo, index) => (
      <PhotoPreviewCard key={photo.id} photo={photo}>
        <div className="mt-2 flex items-center gap-2">
          {photo.autoDetectedCategory && (
            <Badge variant="secondary" className="text-xs">
              {photo.autoDetectedCategory.icon} {photo.autoDetectedCategory.name}
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={() => setAsCoverPhoto(photo.id)}>
            {photo.isCover ? <Star className="h-4 w-4 fill-yellow-500" /> : <StarOutline />}
            {photo.isCover ? 'Cover Photo' : 'Set as Cover'}
          </Button>
        </div>
      </PhotoPreviewCard>
    ))}
  </div>
</PhotoUploadInterface>
```

**Photo Category Data Structure:**

```typescript
const photoCategorySuggestions = [
  {
    id: 'hero',
    label: 'Hero Shot',
    icon: '🍽️',
    tip: 'Your signature dish up close—this becomes your cover photo',
    example: 'Example: Steaming pasta, colorful curry, fresh sushi',
    detectionCriteria: {
      hasFoodFocus: true,
      isCloseUp: true,
      hasGoodLighting: true,
    },
  },
  {
    id: 'table_spread',
    label: 'Table Spread',
    icon: '📸',
    tip: 'Overhead view showing multiple dishes',
    example: 'Example: Full Mexican feast, Japanese homestyle meal',
    detectionCriteria: {
      angle: 'overhead',
      multipleDishes: true,
    },
  },
  {
    id: 'dining_space',
    label: 'Dining Space',
    icon: '🏠',
    tip: 'Where guests will sit and eat',
    example: 'Example: Cozy table, outdoor patio, traditional setting',
    detectionCriteria: {
      hasInterior: true,
      hasTable: true,
      noFoodFocus: true,
    },
  },
  {
    id: 'host_photo',
    label: 'You!',
    icon: '👤',
    tip: 'Helps guests connect with you personally',
    example: 'Example: You cooking, plating, or welcoming',
    detectionCriteria: {
      hasFace: true,
      inKitchenOrDining: true,
    },
  },
  {
    id: 'details',
    label: 'Details',
    icon: '✨',
    tip: 'Close-ups of ingredients, cooking, cultural elements',
    example: 'Example: Hands rolling dough, spices, fresh ingredients',
    detectionCriteria: {
      isCloseUp: true,
      showsCraftsmanship: true,
    },
  },
]
```

**Auto-Detection Feedback UI:**

```tsx
// After photo upload, show AI-detected category suggestion
{
  photo.autoDetectedCategory && (
    <Alert className="mt-2 text-xs">
      <Sparkles className="h-3 w-3" />
      <AlertDescription>
        This looks like a great <strong>{photo.autoDetectedCategory.name}</strong>!
        {photo.autoDetectedCategory.name === 'Hero Shot' && (
          <Button variant="link" size="sm" onClick={() => setAsCoverPhoto(photo.id)}>
            Use as cover photo?
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
```

**Design Decisions:**

- **Suggestions, not requirements**: Checkmarks show coverage, but hosts can skip categories
- **Auto-detection helps**: AI suggests category, hosts can override
- **Cover photo guidance**: Suggest hero shot for cover, but host chooses
- **Example tooltips**: Show what each category means with examples
- **Flexibility emphasized**: "Upload what feels right for your experience"

---

### Designing Photo Editing Guidance & Tools

**Design Goal:** Provide optional editing tools and guidance within the platform—don't require hosts to use external apps.

**Strategy:** Offer simple in-app editing with helpful presets, plus links to external resources for advanced users.

---

#### In-App Photo Editor UI

**Design Pattern:** Lightweight editing interface accessible from photo upload:

```tsx
;<PhotoUploadCard photo={photo}>
  <img src={photo.preview} alt="" className="rounded-lg" />

  {/* Quick edit button */}
  <Button variant="outline" size="sm" className="mt-2" onClick={() => openPhotoEditor(photo.id)}>
    <Wand2 className="mr-2 h-4 w-4" />
    Quick Edit
  </Button>
</PhotoUploadCard>

{
  /* Photo Editor Modal */
}
;<Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Edit Photo</DialogTitle>
      <DialogDescription>Make quick adjustments to improve your photo</DialogDescription>
    </DialogHeader>

    <div className="grid gap-6 md:grid-cols-2">
      {/* Live Preview */}
      <div>
        <p className="mb-2 text-sm font-medium">Preview</p>
        <img src={getEditedPreview(photo, edits)} alt="" className="rounded-lg border" />
      </div>

      {/* Editing Controls */}
      <div className="space-y-4">
        {/* Smart Presets (one-click improvements) */}
        <div>
          <Label className="text-sm font-medium">Smart Enhancements</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => applyPreset('auto')}>
              <Sparkles className="mr-2 h-4 w-4" />
              Auto Enhance
            </Button>
            <Button variant="outline" size="sm" onClick={() => applyPreset('brighten')}>
              <Sun className="mr-2 h-4 w-4" />
              Brighten
            </Button>
            <Button variant="outline" size="sm" onClick={() => applyPreset('warm')}>
              <Flame className="mr-2 h-4 w-4" />
              Add Warmth
            </Button>
            <Button variant="outline" size="sm" onClick={() => applyPreset('vibrant')}>
              <Palette className="mr-2 h-4 w-4" />
              Boost Colors
            </Button>
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            One-click improvements based on what works well for food photos
          </p>
        </div>

        <Separator />

        {/* Manual Adjustments (for advanced users) */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              <span>Manual Adjustments</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm">
                <Label>Brightness</Label>
                <span className="text-muted-foreground">{edits.brightness}%</span>
              </div>
              <Slider
                value={[edits.brightness]}
                onValueChange={([value]) => updateEdit('brightness', value)}
                min={-50}
                max={50}
                step={5}
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <Label>Contrast</Label>
                <span className="text-muted-foreground">{edits.contrast}%</span>
              </div>
              <Slider
                value={[edits.contrast]}
                onValueChange={([value]) => updateEdit('contrast', value)}
                min={-50}
                max={50}
                step={5}
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <Label>Warmth</Label>
                <span className="text-muted-foreground">
                  {edits.temperature > 0 ? 'Warmer' : 'Cooler'}
                </span>
              </div>
              <Slider
                value={[edits.temperature]}
                onValueChange={([value]) => updateEdit('temperature', value)}
                min={-30}
                max={30}
                step={5}
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-sm">
                <Label>Saturation</Label>
                <span className="text-muted-foreground">{edits.saturation}%</span>
              </div>
              <Slider
                value={[edits.saturation]}
                onValueChange={([value]) => updateEdit('saturation', value)}
                min={-50}
                max={50}
                step={5}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Crop & Rotate */}
        <div>
          <Label className="text-sm font-medium">Crop & Straighten</Label>
          <div className="mt-2 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => openCropTool()}>
              <Crop className="mr-2 h-4 w-4" />
              Crop
            </Button>
            <Button variant="outline" size="sm" onClick={() => rotatePhoto(-90)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => rotatePhoto(90)}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Helpful Tips */}
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="text-sm">Editing Tip</AlertTitle>
          <AlertDescription className="text-xs">
            {getEditingTipBasedOnPhoto(photo, edits)}
          </AlertDescription>
        </Alert>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button variant="outline" onClick={() => resetEdits()}>
            Reset
          </Button>
          <Button onClick={() => saveEdits()} className="flex-1">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

**Smart Preset Logic:**

```typescript
// One-click enhancements based on photo analysis
const smartPresets = {
  auto: {
    name: 'Auto Enhance',
    apply: (photoAnalysis) => ({
      brightness: photoAnalysis.isDark ? +15 : +5,
      contrast: +10,
      saturation: photoAnalysis.isMuted ? +10 : 0,
      temperature: photoAnalysis.isCool ? +10 : 0,
    }),
  },
  brighten: {
    name: 'Brighten',
    apply: () => ({ brightness: +20, contrast: +5 }),
  },
  warm: {
    name: 'Add Warmth',
    apply: () => ({ temperature: +15, brightness: +5 }),
  },
  vibrant: {
    name: 'Boost Colors',
    apply: () => ({ saturation: +15, contrast: +10 }),
  },
}

// Contextual editing tips based on current state
function getEditingTipBasedOnPhoto(photo, edits) {
  if (edits.saturation > 25) {
    return 'High saturation can make food look unnatural. Consider dialing it back a bit.'
  }
  if (edits.brightness < -20) {
    return 'Very dark photos can be hard to see. Try brightening instead!'
  }
  if (photo.analysis.isWellLit && edits.brightness === 0) {
    return 'This photo already has great lighting! Small adjustments work best.'
  }
  return 'Light touch edits usually work best—subtle is better than heavy filtering!'
}
```

**Design Rationale:**

- **In-app editing**: Hosts don't need external apps (reduces friction)
- **Smart presets**: One-click improvements for non-technical users
- **Manual controls hidden**: Advanced options in collapsible section
- **Contextual tips**: Warn against over-editing based on current settings
- **Live preview**: See changes before saving
- **Non-destructive**: Can always reset to original

---

#### External Editing Resources (Optional)

**Design Pattern:** Provide link to optional external resources for advanced users:

```tsx
<div className="mt-4 rounded-lg border p-4">
  <h4 className="mb-2 text-sm font-medium">Want more editing power?</h4>
  <p className="text-muted-foreground mb-3 text-sm">
    For advanced editing, try these free mobile apps:
  </p>
  <div className="space-y-2">
    <ExternalAppLink
      name="Snapseed"
      description="Google's free editor with pro tools"
      platforms={['iOS', 'Android']}
      url="https://snapseed.app"
    />
    <ExternalAppLink
      name="Lightroom Mobile"
      description="Professional-grade, free version available"
      platforms={['iOS', 'Android']}
      url="https://lightroom.adobe.com"
    />
  </div>
  <Alert className="mt-3 text-xs">
    <InfoIcon className="h-3 w-3" />
    <AlertDescription>
      Remember: Our in-app editor is all most hosts need! These apps are optional for those who
      enjoy photography.
    </AlertDescription>
  </Alert>
</div>
```

**Design Philosophy:**

- In-app editing is **sufficient** for most hosts
- External apps are **optional extras** for enthusiasts
- Emphasize that simplicity is fine ("all most hosts need")

---

### Cultural Photography Considerations

#### Regional Food Photography Norms

**Western (US/Europe):**

- Clean, minimalist plates
- Lots of negative space
- Modern plating

**Middle Eastern/Mediterranean:**

- Abundant spreads
- Shared platters
- Family-style presentation

**Asian:**

- Multiple small dishes
- Rice/noodles as base
- Traditional serving ware (bamboo, ceramic)

**Latin American:**

- Colorful, vibrant
- Generous portions
- Traditional ceramics/pottery

**Host Guidance:**

```markdown
"Show your food the way you normally serve it!

Don't try to make it look like a restaurant dish. We want to see authentic home cooking and traditional presentations. If you normally serve curry in a brass pot—show that! If your family eats from one large platter—photograph that!"
```

### Photo Upload UX

#### Upload Flow

```tsx
<PhotoUploadStep>
  {/* Drag & Drop Area */}
  <DropZone
    onDrop={handlePhotos}
    accept="image/*"
    maxFiles={10}
    maxSize={5000000} // 5MB
  >
    <UploadIcon size={48} />
    <Heading>Drag photos here or click to browse</Heading>
    <HelpText>Minimum 3 photos, max 10 photos</HelpText>
    <HelpText>JPG, PNG, or WEBP • Max 5MB each</HelpText>
  </DropZone>

  {/* Photo Tips (Contextual Help) */}
  <PhotoTipsAlert>
    <Info />
    <AlertTitle>Photo Tips for Success</AlertTitle>
    <AlertDescription>
      <ul>
        <li>✅ Use natural window lighting</li>
        <li>✅ Show your authentic home setting</li>
        <li>✅ Include yourself in at least one photo</li>
        <li>✅ Horizontal photos work best</li>
        <li>✅ Close-ups of your signature dish</li>
      </ul>
    </AlertDescription>
  </PhotoTipsAlert>

  {/* Preview Grid */}
  <PhotoPreviewGrid>
    {uploadedPhotos.map((photo, index) => (
      <PhotoPreview key={photo.id}>
        <Image src={photo.preview} />

        {/* Set as cover photo */}
        {index === 0 && <Badge className="absolute top-2 left-2">Cover Photo</Badge>}

        {/* Reorder & Delete */}
        <div className="absolute top-2 right-2 flex gap-1">
          {index > 0 && (
            <Button size="sm" onClick={() => movePhotoUp(index)}>
              <ArrowUp />
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={() => deletePhoto(index)}>
            <Trash />
          </Button>
        </div>

        {/* Photo number */}
        <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
          Photo {index + 1}
        </span>
      </PhotoPreview>
    ))}
  </PhotoPreviewGrid>

  {/* Photo Guidelines Link */}
  <Button variant="link" onClick={openPhotoGuide}>
    📸 View Photo Guidelines & Examples
  </Button>
</PhotoUploadStep>
```

#### Photo Quality Checks (Automated)

```typescript
// Backend validation
async function validatePhoto(file: File): Promise<ValidationResult> {
  const checks = {
    fileSize: file.size <= 5000000, // 5MB
    fileType: ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
    resolution: await checkResolution(file), // Min 1920×1080
    brightness: await checkBrightness(file), // Not too dark
    blur: await checkSharpness(file), // Not blurry
  }

  const warnings = []

  if (checks.brightness < 0.3) {
    warnings.push('Photo is quite dark - try using more natural light')
  }

  if (checks.blur > 0.7) {
    warnings.push('Photo appears blurry - try holding camera steady')
  }

  return { valid: checks.fileSize && checks.fileType && checks.resolution, warnings }
}
```

### Host Photo Upload: UGC Quality Guidelines

**Philosophy: Enable, Don't Police**

Host photos are user-generated content (UGC). We provide **helpful tools and guidelines**, not restrictions or cultural policing. Hosts are the experts on their culture, cuisine, and home—we help them showcase it effectively.

**Quality Standards (Enforced by Review Process):**

**✅ MUST Have (Technical Requirements):**

- Minimum resolution: 1200×800 pixels (ensures clarity on all devices)
- Supported formats: JPG, PNG, WEBP
- Maximum file size: 10MB per image
- Clear, in-focus images (no extreme blurriness)
- Honest representation (photos must match actual experience)

**❌ NOT Allowed (Safety/Legal Only):**

- Illegal content, hate symbols, discriminatory imagery
- Stolen photos from other sources (reverse image search check)
- Watermarks or logos from competitors
- Extremely blurry or corrupted files
- Misleading imagery (showing food/location guest won't receive)

**💡 Helpful Tips (Suggestions, Not Requirements):**

**Lighting:**

- **Tip**: Natural window light makes food look appetizing
- **Why**: Avoids harsh yellow overhead lighting or dark shadows
- **Host decides**: Candlelit dinner vibe? Evening ambiance? Totally fine!

**Composition:**

- **Tip**: Show context—your home, your table, your style
- **Why**: Guests want authentic home dining, not restaurant setting
- **Host decides**: Messy kitchen? Family chaos? That's real life! Show it if it's part of your experience.

**Authenticity:**

- **Tip**: Include yourself in 1-2 photos (builds trust)
- **Why**: Guests book people, not just food
- **Host decides**: Shy? Use cooking hands shot or back-of-head image. Your choice.

**Storytelling:**

- **Tip**: Capture 5-8 diverse shots (food, space, people, details)
- **Why**: Tells complete story of the experience
- **Host decides**: What story matters to you? Grandma's recipe? Street food at home? Your call.

**Photo Upload UI Design Implications:**

```
┌─────────────────────────────────────────────────┐
│  📸 Upload Your Experience Photos               │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Drag & Drop Zone]                             │
│  or click to select files                       │
│                                                 │
│  Recommended: 5-8 photos                        │
│  • Min resolution: 1200×800px                   │
│  • Formats: JPG, PNG, WEBP                      │
│  • Max size: 10MB per image                     │
│                                                 │
│  💡 Quick Tips:                                 │
│  ✓ Use natural window light                    │
│  ✓ Show your real home setting                 │
│  ✓ Include yourself in 1-2 photos              │
│  ✓ Capture food, space, and details            │
│                                                 │
│  [View Example Photos] ←─ Shows good examples  │
│                           (diverse styles OK)   │
└─────────────────────────────────────────────────┘

After Upload:
┌─────────────────────────────────────────────────┐
│  Your Photos (6 uploaded)                       │
├─────────────────────────────────────────────────┤
│  [✓ Analyzing...]                               │
│                                                 │
│  ✅ Photo 1: Great! Clear and well-lit          │
│  ✅ Photo 2: Perfect! Shows your dining space   │
│  ✅ Photo 3: Nice! Love the detail shot         │
│  ⚠️  Photo 4: A bit blurry—try another?         │
│     (Still acceptable, but clearer = better)    │
│  ✅ Photo 5: Excellent! You in the photo        │
│  ✅ Photo 6: Beautiful table spread             │
│                                                 │
│  Suggestions:                                   │
│  💡 Consider adding 1-2 more photos showing     │
│     your cooking process or ingredients         │
│                                                 │
│  [Continue to Review] [Upload More]             │
└─────────────────────────────────────────────────┘
```

**Automated Feedback (Helpful, Not Blocking):**

- **Resolution too low**: "This photo might appear pixelated on larger screens. Try uploading a higher resolution version for best results!"
- **Very dark photo**: "This photo seems a bit dark. Try brightening it or shooting near a window for better results."
- **No people in photos**: "Tip: Including yourself in 1-2 photos helps guests connect with you as a host!"
- **Only food photos**: "Consider adding photos of your dining space so guests know what to expect!"

**What We DON'T Comment On:**

- ❌ Photography aesthetics (amateur is fine!)
- ❌ Home decor choices (your style, your home)
- ❌ Cultural presentation (you're the expert)
- ❌ Plating style (traditional serving = authentic)
- ❌ Background "mess" (real homes have life happening)

**Review Process Integration:**

- Automated checks run instantly on upload
- Helpful suggestions shown in real-time
- Only technical issues (resolution, blur, stolen images) block approval
- Hosts can ignore aesthetic suggestions—their choice!

### Photography Checklist for Hosts

**Before You Shoot:**

- [ ] Clean dining area and table
- [ ] Remove clutter (mail, keys, random items)
- [ ] Prepare dishes fresh (not reheated)
- [ ] Check lighting (natural window light available?)
- [ ] Have someone help or use timer (if you want to be in photo)

**During Shooting:**

- [ ] Take multiple shots of each dish (different angles)
- [ ] Shoot at least 10-15 photos (you'll pick best 5-8)
- [ ] Include yourself in 1-2 photos
- [ ] Capture detail shots (hands cooking, ingredients)
- [ ] Get full table spread shot (overhead)
- [ ] Photograph dining space

**After Shooting:**

- [ ] Review photos on computer (not just phone)
- [ ] Select best 5-8 photos
- [ ] Light editing (brightness, crop, warmth)
- [ ] Ensure photos tell complete story:
  - [ ] Hero dish photo
  - [ ] Table spread
  - [ ] Dining space
  - [ ] Host photo
  - [ ] Detail shots

---

## Visual Design System

### Food Photography Guidelines

**Photography Standards for Hosts:**

1. **Natural Lighting**: Shoot near windows during daytime
2. **Context**: Show home setting (not professional kitchen)
3. **People**: Include yourself or guests enjoying the meal
4. **Angles**:
   - Overhead (flat lay) for table spreads
   - 45-degree angle for individual dishes
   - Eye-level for ambiance shots

**Photo Requirements:**

- **Minimum**: 3 photos
- **Recommended**: 5-8 photos
- **Resolution**: At least 1920×1080px
- **Format**: JPG, PNG, WebP
- **Aspect ratio**: 4:3 or 3:2 preferred

**Photo Types:**

```
1. Hero photo - Full table setup with food
2. Signature dish - Close-up of main course
3. Dining space - Where guests will eat
4. Host photo - You welcoming guests
5. Detail shots - Food preparation, ingredients
```

**Color Grading:**

- Warm tones for comfort (not oversaturated)
- Natural colors (avoid heavy filters)
- Consistent style across all photos

### Color Psychology for Food & Hospitality

**OKLCH Color Palette:**

```css
:root {
  /* Primary: Warm orange (appetite stimulating) */
  --primary: oklch(0.65 0.18 45);
  --primary-foreground: oklch(0.98 0 0);

  /* Secondary: Fresh green (health, organic) */
  --secondary: oklch(0.7 0.15 140);
  --secondary-foreground: oklch(0.15 0 0);

  /* Accent: Rich burgundy (sophistication) */
  --accent: oklch(0.5 0.15 15);
  --accent-foreground: oklch(0.98 0 0);

  /* Neutrals: Warm grays (inviting) */
  --muted: oklch(0.88 0.02 45);
  --muted-foreground: oklch(0.45 0.02 45);
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.15 0 0);

  /* Functional */
  --destructive: oklch(0.55 0.22 25); /* Red */
  --success: oklch(0.65 0.18 140); /* Green */
  --warning: oklch(0.7 0.15 65); /* Yellow */
}
```

**Color Usage:**

- **Primary (Orange)**: Book buttons, CTAs, highlights
- **Secondary (Green)**: Dietary tags, verified badges, success states
- **Accent (Burgundy)**: Premium features, special offers
- **Neutrals**: Text, backgrounds, borders

### Icon Library

**Custom Icon Set:**

**Cuisine Flags:**

```tsx
<CuisineIcon type="italian">🇮🇹</CuisineIcon>
<CuisineIcon type="indian">🇮🇳</CuisineIcon>
<CuisineIcon type="thai">🇹🇭</CuisineIcon>
<CuisineIcon type="mexican">🇲🇽</CuisineIcon>
<CuisineIcon type="japanese">🇯🇵</CuisineIcon>
<CuisineIcon type="french">🇫🇷</CuisineIcon>
```

**Dietary Icons (from Lucide React):**

```tsx
import {
  Leaf, // Vegan
  Wheat, // Gluten
  WheatOff, // Gluten-free
  Milk, // Dairy
  MilkOff, // Dairy-free
  Fish, // Pescatarian
  Beef, // Contains meat
} from 'lucide-react'
```

**Trust & Safety Icons:**

```tsx
import {
  ShieldCheck, // Verified
  Star, // Rating/Superhost
  CheckCircle, // Confirmed
  Clock, // Response time
  MessageCircle, // Messages
  Lock, // Secure payment
  Calendar, // Flexible cancellation
} from 'lucide-react'
```

**Action Icons:**

```tsx
import {
  Heart, // Favorite
  Share2, // Share
  MapPin, // Location
  Users, // Guests
  DollarSign, // Price
  Search, // Search
  Filter, // Filters
  ChevronDown, // Expand
  X, // Close
  Plus, // Add
} from 'lucide-react'
```

---

## Design Testing & Validation

### Playwright Visual Regression Tests

**Setup:**

```typescript
// tests/visual/experience-card.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Experience Card Visual Tests', () => {
  test('should match desktop baseline', async ({ page }) => {
    await page.goto('/experiences/sample-italian-pasta')
    await page.setViewportSize({ width: 1280, height: 720 })

    const card = page.locator('[data-testid="experience-card"]')
    await expect(card).toHaveScreenshot('experience-card-desktop.png')
  })

  test('should match mobile baseline', async ({ page }) => {
    await page.goto('/experiences/sample-italian-pasta')
    await page.setViewportSize({ width: 375, height: 667 })

    const card = page.locator('[data-testid="experience-card"]')
    await expect(card).toHaveScreenshot('experience-card-mobile.png')
  })

  test('should show hover state correctly', async ({ page }) => {
    await page.goto('/experiences')

    const card = page.locator('[data-testid="experience-card"]').first()
    await card.hover()

    await expect(card).toHaveScreenshot('experience-card-hover.png')
  })
})
```

### Accessibility Testing with axe-core

```typescript
// tests/a11y/booking-flow.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Booking Flow Accessibility', () => {
  test('search page should have no violations', async ({ page }) => {
    await page.goto('/experiences')

    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityResults.violations).toEqual([])
  })

  test('experience detail page should have proper ARIA', async ({ page }) => {
    await page.goto('/experiences/italian-pasta-making')

    const results = await new AxeBuilder({ page })
      .include('[data-testid="experience-detail"]')
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('booking card should be keyboard navigable', async ({ page }) => {
    await page.goto('/experiences/italian-pasta-making')

    // Tab through form elements
    await page.keyboard.press('Tab') // Date picker
    await page.keyboard.press('Tab') // Guest counter
    await page.keyboard.press('Tab') // Dietary selector
    await page.keyboard.press('Tab') // Reserve button

    const focusedElement = await page.evaluate(() =>
      document.activeElement?.getAttribute('data-testid')
    )

    expect(focusedElement).toBe('reserve-button')
  })
})
```

### Trust & Safety Testing

```typescript
// tests/trust-safety/verification-badges.spec.ts
test.describe('Verification Badges', () => {
  test('verified host badge should be visible', async ({ page }) => {
    await page.goto('/experiences/verified-host-experience')

    const badge = page.locator('[data-testid="verified-badge"]')
    await expect(badge).toBeVisible()
    await expect(badge).toContainText('Verified')

    // Hover to see tooltip
    await badge.hover()
    const tooltip = page.locator('[role="tooltip"]')
    await expect(tooltip).toBeVisible()
    await expect(tooltip).toContainText('identity verification')
  })

  test('dietary badges should filter correctly', async ({ page }) => {
    await page.goto('/experiences?dietary=vegan')

    // All results should have vegan badge
    const cards = page.locator('[data-testid="experience-card"]')
    const count = await cards.count()

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i)
      const veganBadge = card.locator('[data-dietary="vegan"]')
      await expect(veganBadge).toBeVisible()
    }
  })
})
```

### Cross-Cultural Testing

```typescript
// tests/i18n/multi-language.spec.ts
test.describe('Multi-Language Support', () => {
  test('should display content in Spanish', async ({ page }) => {
    await page.goto('/experiences')

    // Change language
    await page.click('[data-testid="language-selector"]')
    await page.click('[data-language="es"]')

    // Verify translation
    const searchPlaceholder = await page
      .locator('[data-testid="search-input"]')
      .getAttribute('placeholder')

    expect(searchPlaceholder).toContain('Buscar')
  })

  test('should support RTL for Arabic', async ({ page }) => {
    await page.goto('/experiences')
    await page.click('[data-testid="language-selector"]')
    await page.click('[data-language="ar"]')

    const htmlDir = await page.evaluate(() => document.documentElement.getAttribute('dir'))

    expect(htmlDir).toBe('rtl')
  })
})
```

---

## Design Checklist

### Pre-Commit Checklist (Quick Review)

Before committing any UI changes:

#### **Modern Next.js 15 & React 19 Patterns**

- [ ] Server Components used by default (no 'use client' unless needed)
- [ ] Client Components only for interactivity (forms, buttons, hooks)
- [ ] React Query + React Hook Form used for form submissions (NestJS backend)
- [ ] Suspense boundaries for slow-loading sections (reviews, recommendations)
- [ ] Optimistic UI for instant feedback (favorites, saves, likes)
- [ ] Image optimization with next/image (priority vs lazy loading)
- [ ] Font optimization with next/font (preloading critical fonts)

#### **Loading States & Skeleton Screens**

- [ ] Skeleton screens for > 1s loading (experience cards, detail pages)
- [ ] Skeletons match actual content structure (no jarring transitions)
- [ ] Button loading states for all form submissions (prevent double-clicks)
- [ ] Blur placeholders for images (reduce CLS)
- [ ] Empty states for no results (not infinite skeleton screens)
- [ ] Error states for failed fetches (not skeleton screens)
- [ ] Progressive loading with Suspense (prioritize critical content)

#### **Accessibility (WCAG 2.2 AA)**

- [ ] Color contrast meets 4.5:1 (text) or 3:1 (UI)
- [ ] Focus indicators visible (2px thick, 3:1 contrast per WCAG 2.4.13)
- [ ] Focus not obscured by sticky headers/footers (WCAG 2.4.11)
- [ ] Touch targets ≥ 24×24px (WCAG 2.5.8) - DineLocal standard: 44px+
- [ ] Keyboard navigation works (all interactive elements)
- [ ] Focus trap implemented for modals/dialogs
- [ ] ARIA labels present for screen readers
- [ ] ARIA live regions for dynamic content (booking confirmations, errors)
- [ ] Dragging movements have alternatives (WCAG 2.5.7)
- [ ] No cognitive authentication (CAPTCHA alternatives)
- [ ] Text readable at 200% zoom

#### **Marketplace Trust Patterns**

- [ ] Progressive trust building (low commitment → high commitment)
- [ ] Guest checkout available (no forced sign-up)
- [ ] Ethical scarcity (real data from database, no dark patterns)
- [ ] Progress indicators for multi-step booking flow
- [ ] Social proof beyond reviews (repeat guests, specific praise)
- [ ] Payment trust signals (free cancellation, secure payment, support)

#### **Guest Experience**

- [ ] Search filters work correctly (location, date, guests, cuisine)
- [ ] Experience cards display all trust signals (verified, rating, reviews)
- [ ] Photos load optimally (priority for above-fold, lazy for below)
- [ ] Booking flow is smooth and provides clear feedback
- [ ] Dietary restriction communication is prominent
- [ ] Price breakdown is transparent (no hidden fees)
- [ ] Mobile booking experience is optimized (thumb-friendly zones)

#### **Host Experience**

- [ ] Experience creation wizard is intuitive
- [ ] Photo upload works with progress indicator
- [ ] Calendar management is easy to use
- [ ] Booking notifications are clear
- [ ] Guest profiles are visible and informative
- [ ] Messaging interface is responsive

#### **Trust & Safety**

- [ ] Verification badges display correctly
- [ ] Reviews are authentic and helpful
- [ ] Cancellation policies are clear
- [ ] Payment security indicators visible
- [ ] Dietary allergies handled with warnings
- [ ] Scarcity signals are real (from database, not fake urgency)

#### **Visual Design**

- [ ] OKLCH colors used consistently
- [ ] Typography follows scale (h1: text-4xl, h2: text-3xl, etc.)
- [ ] Spacing uses 4px/8px grid
- [ ] Food photos are appetizing and authentic
- [ ] Icons are consistent and recognizable (Lucide React)
- [ ] Design system components used (Box, Flex, Heading, Paragraph)

#### **Performance (Core Web Vitals 2025)**

- [ ] LCP < 2.5s (priority load for hero images)
- [ ] INP < 200ms (debounce search, memoize filters, virtual scrolling)
- [ ] CLS < 0.1 (aspect ratios, skeleton screens, font preloading)
- [ ] Images optimized (AVIF/WebP, next/image with sizes)
- [ ] Code splitting (dynamic imports for heavy components)
- [ ] Virtual scrolling for 100+ item lists

---

### Pre-PR Checklist (Comprehensive Review)

#### **Modern React & Next.js Architecture**

- [ ] Server vs Client Component decision documented in PR
- [ ] React Query used for NestJS backend mutations (with React Hook Form)
- [ ] Streaming SSR with Suspense for slow queries
- [ ] Parallel Routes used for modals/galleries (if applicable)
- [ ] Middleware used for auth checks and redirects (not in components)
- [ ] Edge runtime considered for global performance
- [ ] Data fetching happens in Server Components (not useEffect)

#### **Loading & Performance UX**

- [ ] All async operations have loading states
- [ ] Skeleton screens used correctly (> 1s loads, match layout)
- [ ] Optimistic UI for instant feedback (favorites, saves)
- [ ] Images have blur placeholders (BlurHash or base64)
- [ ] Suspense boundaries prioritize critical content
- [ ] Empty states designed and implemented
- [ ] Error boundaries catch and display errors gracefully

#### **Accessibility (WCAG 2.2 AA Compliance)**

- [ ] All WCAG 2.2 new criteria addressed (9 new success criteria)
- [ ] Keyboard navigation tested (Tab, Shift+Tab, Enter, Escape, Arrow keys)
- [ ] Focus trap works in modals (can't tab out, Escape closes)
- [ ] Focus indicators meet 2px/3:1 contrast standard
- [ ] Scroll-into-view prevents focus from being obscured
- [ ] Touch targets ≥ 24px (DineLocal: ≥ 44px recommended)
- [ ] ARIA live regions announce dynamic content
- [ ] Screen reader tested (VoiceOver, NVDA, or JAWS)
- [ ] Color contrast checked (4.5:1 text, 3:1 UI)
- [ ] Form labels and error messages are clear

#### **Marketplace Trust & Conversion**

- [ ] Trust signals visible at every funnel stage
- [ ] Guest checkout flow tested (no forced sign-up)
- [ ] Scarcity signals verified as real (from database)
- [ ] Progress indicator shows all booking steps
- [ ] Social proof includes behavioral data (repeat guests, etc.)
- [ ] Payment page has trust reinforcement (free cancellation, secure payment)
- [ ] Confirmation page celebrates success (reduce post-purchase anxiety)

#### **Testing**

- [ ] Visual regression tests pass (Playwright, Chromatic, etc.)
- [ ] Accessibility tests pass (axe-core automated scan)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile tested (iOS Safari, Android Chrome)
- [ ] Booking flow tested end-to-end (all steps complete)
- [ ] Payment integration tested (sandbox/test mode)
- [ ] Loading states tested (slow network simulation)
- [ ] Error states tested (API failures simulated)
- [ ] Empty states tested (no results scenario)

#### **SEO & Discoverability**

- [ ] Meta tags updated for new pages (title, description, OG)
- [ ] Structured data added (FoodEvent schema.org)
- [ ] Images have descriptive alt text (not "image1.jpg")
- [ ] Semantic HTML structure (proper headings hierarchy)
- [ ] Sitemap updated (if new routes)
- [ ] Canonical URLs set correctly
- [ ] robots.txt allows indexing (if applicable)

#### **Internationalization (i18n)**

- [ ] Text is translatable (no hardcoded strings)
- [ ] Icons are culturally appropriate (no offensive gestures)
- [ ] Date/time formats localized (moment.js, date-fns with locale)
- [ ] Currency displays correctly (Intl.NumberFormat)
- [ ] RTL support tested (if supporting Arabic, Hebrew)

#### **Code Quality**

- [ ] TypeScript types defined (no `any` types)
- [ ] Component props documented (JSDoc or comments)
- [ ] File naming conventions followed (PascalCase for components)
- [ ] Import/export patterns consistent (barrel exports for common components)
- [ ] ESLint warnings addressed (npm run lint)
- [ ] No console.log left in production code

#### **Documentation**

- [ ] Storybook story added (if new shared component)
- [ ] Design decisions explained in PR description
- [ ] Screenshots/videos provided for visual changes
- [ ] Breaking changes documented
- [ ] Migration guide provided (if applicable)

---

### Quick Reference Tables

#### **Component Decision Matrix**

| Need                | Component     | Import                                                       |
| ------------------- | ------------- | ------------------------------------------------------------ |
| Container (generic) | `<Box>`       | `import { Box } from '@/components/shared/container'`        |
| Flex layout         | `<Flex>`      | `import { Flex } from '@/components/shared/container'`       |
| Grid layout         | `<Grid>`      | `import { Grid } from '@/components/shared/container'`       |
| Headings (h1-h6)    | `<Heading>`   | `import { Heading } from '@/components/shared/typography'`   |
| Paragraphs          | `<Paragraph>` | `import { Paragraph } from '@/components/shared/typography'` |
| Button              | `<Button>`    | `import { Button } from '@/components/shared/button'`        |
| Form input          | `<Input>`     | `import { Input } from '@/components/ui/input'`              |

#### **Loading State Decision Matrix**

| Scenario              | Pattern                    | Example                                    |
| --------------------- | -------------------------- | ------------------------------------------ |
| Search results (> 1s) | Skeleton grid (9 cards)    | `<ExperienceCardSkeleton />` × 9           |
| Detail page (> 1s)    | Suspense + skeleton        | `<Suspense fallback={<DetailSkeleton />}>` |
| Button submit         | Loading spinner + disabled | `<Loader2 className="animate-spin" />`     |
| Image loading         | Blur placeholder           | `placeholder="blur" blurDataURL={...}`     |
| Favorites/saves       | Optimistic UI              | `useOptimistic(initialValue)`              |
| Empty results         | Empty state with action    | `<EmptyState />` with "Clear Filters"      |
| Error                 | Error state with retry     | `<ErrorState />` with "Try Again"          |

#### **Accessibility Quick Checks**

| Element            | Requirement              | How to Check                                |
| ------------------ | ------------------------ | ------------------------------------------- |
| Buttons            | ≥ 44px touch target      | Inspect element height/width                |
| Icons (standalone) | ≥ 40px touch target      | Inspect icon button size                    |
| Form inputs        | ≥ 44px height            | Inspect input height                        |
| Text contrast      | ≥ 4.5:1                  | Use browser DevTools color picker           |
| UI contrast        | ≥ 3:1                    | Use browser DevTools color picker           |
| Focus indicators   | 2px thick, 3:1 contrast  | Tab through page, inspect outline           |
| Keyboard nav       | All interactive elements | Tab, Shift+Tab, Enter, Escape               |
| Screen reader      | Logical reading order    | Test with VoiceOver (Mac) or NVDA (Windows) |
| ARIA labels        | Present on icons/buttons | Inspect element for `aria-label`            |

---

## Competitive Best Practices

### Airbnb Experiences Patterns

**What to adopt:**

- ✅ Location + Date + Party Size search pattern
- ✅ Photo gallery with grid layout
- ✅ Host profile prominence
- ✅ Clear pricing breakdown
- ✅ Sticky booking card on detail pages
- ✅ Trust badges (Superhost equivalent)
- ✅ Review display format

### EatWith Design Lessons

**What to adopt:**

- ✅ Menu preview on cards
- ✅ Cuisine type filtering
- ✅ Host story emphasis
- ✅ Dietary accommodation badges
- ✅ Cultural context in descriptions

### BonAppetit Marketplace Insights

**What to adopt:**

- ✅ Instant booking confidence
- ✅ Clear cancellation policies
- ✅ Guest-host messaging
- ✅ Photo-first design

### Etsy Trusted Marketplace Patterns

**What to adopt:**

- ✅ Seller verification badges
- ✅ Review authenticity (verified purchase)
- ✅ Star rating breakdowns
- ✅ Favorites/wishlist functionality

---

## Summary

DineLocal's design must balance **trust, cultural authenticity, and ease of use** for a global peer-to-peer marketplace.

**Design Priorities:**

1. **Trust First**: Verification, reviews, and transparency
2. **Mobile Optimized**: Tourists book on-the-go
3. **Cultural Respect**: Inclusive, sensitive, globally accessible
4. **Instant Booking**: Remove friction while maintaining safety
5. **Visual Storytelling**: Photos and host stories sell experiences
6. **Accessibility**: WCAG 2.2 AA for all users (18+, elderly, international)

**Testing Foundation:**

- Playwright for visual regression and functional tests
- axe-core for accessibility validation
- Cross-browser and multi-device testing
- Real user testing with both hosts and guests

**Remember**: In a peer-to-peer marketplace, design isn't just about aesthetics—it's about **building trust between strangers** who will share meals in homes.

---

## Inspiration Websites & Analysis

### Airbnb Experiences

**URL:** https://www.airbnb.com/s/experiences

**What to Adopt:**

- ✅ **Hero search pattern**: Location + Date + Guests in prominent hero section
- ✅ **Photo-forward cards**: Large images with minimal text overlay
- ✅ **Trust badge system**: "Verified" and "Superhost" badges highly visible
- ✅ **Sticky booking card**: Right sidebar on detail pages, always accessible
- ✅ **Review display**: Star rating + count, broken down by categories
- ✅ **Host profile emphasis**: Avatar + name + join date + verification status
- ✅ **Clear pricing**: "$X per person" format, breakdowns visible
- ✅ **Map integration**: Approximate location with neighborhood context

**What NOT to Adopt (Differentiation):**

- ❌ **Activity focus**: They emphasize "things to do", we emphasize "food & culture"
- ❌ **Aspirational photography**: Too polished, we want authentic home settings
- ❌ **Generic categories**: "Outdoor activities", we need cuisine-specific filters
- ❌ **Professional host vibe**: We want homey, personal, not commercialized

**Key Takeaway:** Copy trust patterns, differentiate on warmth and authenticity.

### Resy / OpenTable

**Resy URL:** https://resy.com/
**OpenTable URL:** https://www.opentable.com/

**What to Adopt:**

- ✅ **Sophisticated food photography**: Moody lighting, atmospheric
- ✅ **Time-based availability**: Dinner times, lunch times clearly shown
- ✅ **Quick filters**: Price range, cuisine type, neighborhood
- ✅ **Reservation confirmation**: Clean, immediate feedback
- ✅ **Menu preview**: Front and center on detail pages
- ✅ **Atmosphere tags**: "Romantic", "Great for groups", "Business dining"

**What NOT to Adopt (Differentiation):**

- ❌ **Restaurant focus**: Professional venues, we're home kitchens
- ❌ **Corporate feel**: Transactional, we want connection-focused
- ❌ **Polished perfection**: Editorial photos, we need authentic homeyness
- ❌ **No host story**: Restaurants don't have personal backstories, we do

**Key Takeaway:** Borrow food photography standards and time-selection UX, but keep it personal.

### Meetup

**URL:** https://www.meetup.com/

**What to Adopt:**

- ✅ **Community-first messaging**: Emphasis on connection, not transaction
- ✅ **Host story prominence**: "About the organizer" section highlighted
- ✅ **RSVP count visible**: Social proof ("15 people are going")
- ✅ **Small group emphasis**: Intimate gatherings, not large events
- ✅ **Shared interests**: Tags like "Foodies", "Cultural Exchange", "Language Practice"
- ✅ **Ice-breaker prompts**: Helps guests connect before event

**What NOT to Adopt (Differentiation):**

- ❌ **Generic activities**: We're food-specific
- ❌ **Public venues**: We're in private homes
- ❌ **Casual design**: We need more polish (food marketplace requires higher trust)
- ❌ **Free events focus**: We have pricing considerations

**Key Takeaway:** Copy community warmth, add food-specific trust and polish.

### EatWith (Direct Competitor)

**URL:** https://www.eatwith.com/

**Competitive Analysis:**

- Similar concept to DineLocal (home dining experiences)
- **Strengths**: Established brand, global presence, polished UI
- **Weaknesses**: Less emphasis on cultural exchange, more "gourmet experience" focused

**How DineLocal Differentiates:**

1. **Cultural authenticity over culinary perfection**
   - EatWith: Professional/semi-professional chefs
   - DineLocal: Authentic home cooks sharing culture

2. **Instant booking vs. request-based**
   - EatWith: Often requires host approval
   - DineLocal: Instant book reduces friction

3. **Local + Tourist focus**
   - EatWith: Primarily tourist-focused
   - DineLocal: Equally valuable for locals exploring own city

4. **Dietary emphasis**
   - EatWith: Less prominent filtering
   - DineLocal: Dietary accommodations front and center

### BonAppetour (Direct Competitor)

**URL:** https://www.bonappetour.com/

**Competitive Analysis:**

- Focus on food tours and cooking classes
- **Strengths**: Activity variety, strong SEO
- **Weaknesses**: Less intimate (larger groups), more touristy

**How DineLocal Differentiates:**

- **Intimate group sizes** (2-8 typical vs. 10-20)
- **Home dining specific** (not tours or classes)
- **Peer-to-peer marketplace** (not curated experiences)

### Design System References

#### Material Design 3

**URL:** https://m3.material.io/

**What to Reference:**

- ✅ Accessibility guidelines (WCAG 2.2 AA standards)
- ✅ Color system documentation (contrast ratios, harmonies)
- ✅ Component behavior patterns (buttons, cards, dialogs)
- ✅ Motion principles (meaningful transitions)
- ✅ Typography scale rationale

**Don't Copy Wholesale:**

- ❌ Material aesthetic (too Google-specific)
- ❌ Overly technical design language
- ❌ Component library (we use Shadcn/UI)

#### Radix UI (Shadcn/UI Foundation)

**URL:** https://www.radix-ui.com/

**What to Reference:**

- ✅ **Accessibility patterns**: WAI-ARIA compliant primitives
- ✅ **Keyboard navigation**: Tab order, focus management
- ✅ **Unstyled components**: Behavior without forced aesthetics
- ✅ **Composition patterns**: How to build complex components from primitives

**DineLocal Usage:**

- All Shadcn/UI components built on Radix primitives
- Accessibility baked in automatically
- Customize styling while maintaining a11y

### Food Photography Inspiration

#### Bon Appétit Magazine

**URL:** https://www.bonappetit.com/

**Photography Style:**

- Natural lighting (window-lit home cooking)
- Hands visible (human element)
- Casual, approachable plating
- **Adopt for DineLocal:** Warm, inviting, not overly styled

#### Minimalist Baker

**URL:** https://minimalistbaker.com/

**Photography Style:**

- Simple, clean compositions
- Overhead and 45-degree angles
- Bright, natural colors
- **Adopt for DineLocal:** Approachability, clarity

#### Smitten Kitchen

**URL:** https://smittenkitchen.com/

**Photography Style:**

- Real home kitchens visible
- Imperfect authenticity
- Natural props (dishtowels, vintage plates)
- **Adopt for DineLocal:** Authentic home vibe, not staged

---

## Design Inspiration Resources

Beyond competitive analysis, use these resources to stay current with design trends, UI patterns, and visual inspiration.

### Visual Design & UI Inspiration

#### Dribbble

**URL:** https://dribbble.com/

**What to Search:**

- "Food marketplace"
- "Booking platform"
- "Experience cards"
- "Restaurant UI"
- "Trust badges"
- "Photo galleries"

**Best For:**

- Exploring latest UI trends
- Component design inspiration (cards, buttons, forms)
- Color palette ideas
- Micro-interactions and animations
- Mobile-first design patterns

**How to Use:**

- Search by category (Web Design, Mobile, Dashboard)
- Filter by color to explore palette options
- Save shots to collections for reference
- Note: Focus on **design patterns**, not exact copying

#### Behance

**URL:** https://www.behance.net/

**What to Search:**

- "Food app design"
- "Marketplace UX"
- "Cultural experience platform"
- "Community platform"

**Best For:**

- Full project case studies (see design thinking process)
- Comprehensive design systems
- Branding and visual identity
- User flows and wireframes
- Learning designer rationale

#### Awwwards

**URL:** https://www.awwwards.com/

**What to Search:**

- Sites of the Day (SOTD)
- Food & Drink category
- E-commerce category
- Travel category

**Best For:**

- Cutting-edge web design trends
- Innovative interactions and animations
- Responsive design examples
- Performance-optimized beautiful sites

**Caution:** These sites are often _too_ experimental. Use for inspiration, but prioritize usability.

#### Mobbin

**URL:** https://mobbin.com/

**What to Search:**

- "Food delivery"
- "Booking"
- "Marketplace"
- "Travel"
- "Social"

**Best For:**

- Mobile app UI patterns (iOS/Android)
- Real-world app screenshots
- Onboarding flows
- Form design patterns
- Tab navigation and bottom bars

**Why It's Valuable:** Shows actual shipped products, not just concepts.

### Design Systems & Pattern Libraries

#### Tailwind UI

**URL:** https://tailwindui.com/

**Best For:**

- Component examples using Tailwind CSS (our stack!)
- Responsive design patterns
- Form layouts and validation states
- E-commerce patterns (product cards, checkout)

**Note:** Some components require license, but many free examples available.

#### Shadcn/UI Examples

**URL:** https://ui.shadcn.com/examples

**Best For:**

- Real implementations of our component library
- Dashboard layouts
- Form patterns
- Card designs
- Authentication flows

**Why It's Perfect:** We're using Shadcn/UI, so these are directly applicable.

#### Radix UI Themes

**URL:** https://www.radix-ui.com/themes/playground

**Best For:**

- Accessible component patterns
- Theme customization ideas
- Component composition examples

#### Material Design

**URL:** https://m3.material.io/

**Best For:**

- Accessibility guidelines
- Motion and animation principles
- Icon design standards
- Layout grids and spacing systems

**Note:** Don't copy Material Design's look, but learn from their UX research.

### UX Research & Best Practices

#### Nielsen Norman Group

**URL:** https://www.nn.group/

**Best For:**

- Research-backed UX best practices
- Articles on cognitive load, trust, forms
- Usability heuristics (referenced in this doc)
- Case studies on e-commerce, mobile design

**Recommended Articles:**

- "Beyond the NPS: Measuring Perceived Usability"
- "The Power of Defaults"
- "Minimize Cognitive Load"
- "Trust in E-commerce"

#### Laws of UX

**URL:** https://lawsofux.com/

**Best For:**

- Quick reference to UX principles
- Visual explanations of psychology concepts
- Poster-style summaries
- Understanding the "why" behind design decisions

**Referenced in This Doc:** See section on "31 Laws of UX" (lines 907+)

#### Baymard Institute

**URL:** https://baymard.com/

**Best For:**

- E-commerce UX research
- Checkout flow optimization
- Form design best practices
- Mobile commerce patterns

**Relevance:** Booking flow is similar to e-commerce checkout.

### Food Photography Inspiration

#### Unsplash (Food Category)

**URL:** https://unsplash.com/s/photos/food

**Best For:**

- High-quality free food photography examples
- Understanding lighting and composition
- Seeing what "good" food photography looks like
- Inspiration for host photography guidelines

#### Pinterest

**URL:** https://www.pinterest.com/

**Search Terms:**

- "Home cooked meal photography"
- "Food styling home kitchen"
- "Authentic food photography"
- "Cultural food presentation"

**Best For:**

- Real-world food photography trends
- Seeing amateur vs. professional styles
- Cultural food presentation styles
- Plating and composition ideas

### Accessibility Resources

#### WebAIM

**URL:** https://webaim.org/

**Best For:**

- WCAG compliance guidelines
- Color contrast checker tool
- Screen reader testing guides
- Accessibility evaluation tools

#### Accessible Color Palette Builder

**URL:** https://toolness.github.io/accessible-color-matrix/

**Best For:**

- Ensuring our purple primary color meets contrast ratios
- Finding accessible text/background combinations
- Testing color palette accessibility

#### A11y Project

**URL:** https://www.a11yproject.com/

**Best For:**

- Accessibility checklists
- ARIA best practices
- Inclusive design patterns
- Resources organized by topic

### Typography & Fonts

#### Google Fonts

**URL:** https://fonts.google.com/

**Best For:**

- Finding web-safe font pairings
- Understanding font personality
- Variable font options
- Performance-optimized font loading

**Current Stack:** Inter (sans-serif), Righteous (display)

#### Typewolf

**URL:** https://www.typewolf.com/

**Best For:**

- Real-world font usage examples
- Font pairing recommendations
- Typography trends
- Seeing fonts in context

### Icon Libraries

#### Lucide Icons

**URL:** https://lucide.dev/

**Why It Matters:** This is our icon library! Browse for consistent icon usage.

**Best For:**

- Finding the right icon for a feature
- Ensuring icon consistency
- Understanding icon meanings across cultures

#### Heroicons

**URL:** https://heroicons.com/

**Alternative:** From Tailwind creators, good fallback option.

### Color & Palette Tools

#### Coolors

**URL:** https://coolors.co/

**Best For:**

- Generating color palettes
- Exploring color harmonies
- Finding complementary colors
- Exporting palettes for development

#### OKLCH Color Picker

**URL:** https://oklch.com/

**Why It Matters:** We use OKLCH color space in globals.css!

**Best For:**

- Understanding perceptual uniformity
- Creating consistent color scales
- Converting between color spaces

### How to Use These Resources

**Weekly Habit:**

1. Browse Dribbble/Behance for 15-20 minutes
2. Save 3-5 relevant designs to a collection
3. Note what patterns appear repeatedly (trends)
4. Identify what makes designs work or fail

**Before Designing a Feature:**

1. Search Mobbin for similar mobile patterns
2. Check Shadcn/UI for relevant component examples
3. Review Nielsen Norman Group for UX best practices
4. Reference this document's design principles

**During Implementation:**

1. Use Tailwind UI for responsive patterns
2. Check WebAIM for accessibility requirements
3. Test colors with contrast checker
4. Validate icons with Lucide library

**Remember:**

- ✅ Use for **inspiration and patterns**
- ✅ Learn **why designs work**
- ✅ Adapt to **DineLocal's unique needs**
- ❌ Don't copy designs exactly
- ❌ Don't follow trends blindly
- ❌ Don't sacrifice usability for aesthetics

---

## Design Decision Framework

### When to Add a New Feature

**Decision Tree:**

```
New Feature Request
        ↓
Does it solve a user job?
        ↓
  YES → Continue
  NO  → Reject (document why for future)
        ↓
Which user job does it solve?
(Guest trust? Host ease? Dietary safety? Cultural exchange?)
        ↓
Is there a simpler solution?
(Can existing features be improved instead of adding new?)
        ↓
  YES → Improve existing
  NO  → Continue
        ↓
Does it maintain design principles?
(Trust, authenticity, simplicity, cultural respect?)
        ↓
  YES → Proceed to design
  NO  → Rethink approach
        ↓
Design & Prototype
        ↓
Test with users (both guests and hosts)
        ↓
Metrics improve?
        ↓
  YES → Build it
  NO  → Iterate or abandon
```

### Component Design Decisions

**Should this be a shared component or feature-specific?**

```
Decision Matrix:

Is it used in 2+ features?
  ├─ YES → Shared component (/components/shared)
  └─ NO  → Feature-specific (/features/[name]/components)

Does it have business logic?
  ├─ YES → Feature-specific (even if reusable)
  └─ NO  → Shared component

Examples:
  DatePicker:          Shared (no business logic, used everywhere)
  BookingForm:         Feature-specific (booking logic, only in bookings feature)
  ExperienceCard:      Shared (presentational, used in search + favorites)
  DietarySelector:     Could be shared (no business logic) OR feature-specific (if tightly coupled to booking validation)
```

### Trust Signal Priority Decision

**Should we add this trust signal?**

```
Evaluation Criteria:

1. Impact on conversion:
   High (Verification badges, reviews) → Add prominently
   Medium (Response time) → Add subtly
   Low (Profile completion %) → Skip or hide

2. Cost to implement:
   Low cost, high impact → Prioritize
   High cost, low impact → Deprioritize
   High cost, high impact → Plan carefully

3. User research validation:
   Users explicitly asked for it → Prioritize
   Users didn't mention it → Validate with testing
   Users said they don't care → Deprioritize

Example:
"Video profiles for hosts"
  - Impact: Medium-High (builds trust, shows personality)
  - Cost: Medium (video upload UX, storage, playback)
  - Research: Guests mentioned wanting to "see host's personality"
  - Decision: Implement as OPTIONAL feature (not required)
```

### Cultural Adaptation Decision

**Should we localize this feature for [Market]?**

```
Evaluation Framework:

1. Is it culturally sensitive?
   Religious/dietary considerations → Must localize
   Payment methods → Must localize
   Color meanings → Review and adapt if needed
   Icon meanings → Review and adapt if needed

2. Is it legally required?
   GDPR compliance (EU) → Must adapt
   Consumer protection laws → Must adapt
   Payment regulations → Must adapt

3. Does it improve conversion?
   Language translation → Test and measure
   Local payment methods → High impact, localize
   Date/time formats → Localize
   Currency display → Localize

Example:
"Launching in India"
  - Must add: Halal/Vegetarian filters (critical)
  - Must add: UPI payment option (payment preference)
  - Should add: Hindi language support (conversion)
  - Could add: Regional cuisine filters (nice-to-have)
```

---

## Quick Reference Tables

### Nielsen Heuristics × DineLocal Application

| Heuristic                                  | DineLocal Example                            | Priority |
| ------------------------------------------ | -------------------------------------------- | -------- |
| **1. Visibility of System Status**         | "Uploading photo 3 of 5 (60%)"               | Critical |
| **2. Match Between System and Real World** | "Reserve a spot" not "Create booking entity" | Critical |
| **3. User Control and Freedom**            | "Cancel booking" button always visible       | High     |
| **4. Consistency and Standards**           | Orange = CTA, Green = Success across app     | Critical |
| **5. Error Prevention**                    | Disable past dates in calendar picker        | Critical |
| **6. Recognition Rather Than Recall**      | Show recent searches, saved favorites        | Medium   |
| **7. Flexibility and Efficiency**          | "Book again" button for repeat guests        | Medium   |
| **8. Aesthetic and Minimalist Design**     | Progressive disclosure (full menu on click)  | High     |
| **9. Error Recovery**                      | "This date unavailable. Try May 16 instead." | High     |
| **10. Help and Documentation**             | Tooltip on "Verified Host" badge             | Medium   |

### UX Laws × Implementation Priority

| Law                        | Application                           | Impact    | Effort | Priority |
| -------------------------- | ------------------------------------- | --------- | ------ | -------- |
| **Jakob's Law**            | Familiar search pattern (like Airbnb) | High      | Low    | P0       |
| **Hick's Law**             | Limit filters to 5-7 visible          | High      | Low    | P0       |
| **Miller's Law**           | 7±2 info on experience cards          | High      | Medium | P0       |
| **Fitts's Law**            | 48×48px touch targets on mobile       | High      | Low    | P0       |
| **Aesthetic-Usability**    | High-quality food photos              | Very High | Medium | P0       |
| **Peak-End Rule**          | Celebration on booking confirmation   | Medium    | Low    | P1       |
| **Zeigarnik Effect**       | "Complete your listing (80% done)"    | Medium    | Low    | P1       |
| **Serial Position Effect** | Best photo first, second-best last    | Low       | Low    | P2       |
| **Von Restorff Effect**    | Orange CTA stands out on neutral card | High      | Low    | P0       |

### Trust Signals × Placement Priority

| Trust Signal            | Placement                  | Visibility | Conversion Impact |
| ----------------------- | -------------------------- | ---------- | ----------------- |
| **Verification Badge**  | Top-left of photo          | Very High  | Very High         |
| **Star Rating + Count** | Below photo, large text    | Very High  | Very High         |
| **Superhost Badge**     | Next to verification       | High       | High              |
| **Response Time**       | Host profile section       | Medium     | Medium            |
| **Review Count**        | With star rating           | Very High  | Very High         |
| **Secure Payment Icon** | Footer of booking card     | Low        | Medium            |
| **Cancellation Policy** | Booking card + detail page | High       | Very High         |
| **Host Join Date**      | Profile section            | Low        | Low               |
| **Review Breakdown**    | Rating section             | Medium     | Medium            |

### Dietary Restrictions × Filter Priority

| Restriction           | Safety Level                | Frequency   | Filter Priority | Warning Level  |
| --------------------- | --------------------------- | ----------- | --------------- | -------------- |
| **Nut Allergy**       | Critical (life-threatening) | Medium      | P0              | Red alert      |
| **Shellfish Allergy** | Critical (life-threatening) | Low-Medium  | P0              | Red alert      |
| **Celiac (Gluten)**   | High (health)               | Medium      | P0              | Orange warning |
| **Halal**             | High (religious)            | Medium-High | P0              | None           |
| **Kosher**            | High (religious)            | Low-Medium  | P0              | None           |
| **Vegan**             | Medium (ethical/health)     | High        | P0              | None           |
| **Vegetarian**        | Medium (ethical/health)     | Very High   | P0              | None           |
| **Gluten-Free**       | Medium (health/preference)  | High        | P1              | None           |
| **Dairy-Free**        | Medium (health)             | Medium      | P1              | None           |
| **Pescatarian**       | Low (preference)            | Low         | P2              | None           |

### Color Meanings × Cultural Context

| Color      | Western         | Middle East      | East Asia              | India              | DineLocal Usage                                                |
| ---------- | --------------- | ---------------- | ---------------------- | ------------------ | -------------------------------------------------------------- |
| **Purple** | Royalty, luxury | Wealth, wisdom   | Nobility, spirituality | Auspicious, divine | ✅ **Primary brand & ALL CTAs** (culturally positive globally) |
| **Red**    | Danger, passion | Celebration      | Luck, joy              | Auspicious         | ⚠️ Errors only (Airbnb uses red)                               |
| **Orange** | Energy, warmth  | Neutral          | Neutral                | Sacred (saffron)   | ⚠️ Warnings ONLY (not CTAs)                                    |
| **Yellow** | Caution         | Neutral          | Imperial (China)       | Auspicious         | ⚠️ Accent (use sparingly)                                      |
| **Green**  | Nature, health  | Islamic (sacred) | Nature                 | Prosperity         | ✅ Success states, dietary (very safe globally)                |
| **Blue**   | Trust, calm     | Protection       | Trust                  | Neutral            | ✅ Info states (secondary trust)                               |
| **White**  | Purity          | Purity           | Mourning               | Mourning           | ✅ Background only, not primary                                |
| **Black**  | Elegance, death | Neutral          | Mourning               | Neutral            | ✅ Text only, not brand color                                  |

### Conversion Funnel Benchmarks

| Stage                   | DineLocal Target | Industry Average | Optimization Focus                      |
| ----------------------- | ---------------- | ---------------- | --------------------------------------- |
| Homepage → Search       | 70%              | 60-75%           | Hero CTA clarity                        |
| Search → Detail Click   | 40%              | 30-50%           | Card trust signals, photo quality       |
| Detail → Booking Start  | 50%              | 40-60%           | Sticky booking card, dietary confidence |
| Booking Start → Payment | 80%              | 70-85%           | Reduce steps, autofill                  |
| Payment → Confirmed     | 70%              | 65-75%           | Trust signals, clear pricing            |
| **Overall Conversion**  | **8-12%**        | **6-10%**        | **End-to-end optimization**             |

---

## Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Airbnb Design System](https://airbnb.design/)
- [Material Design 3](https://m3.material.io/)
- [Radix UI (Shadcn/UI foundation)](https://www.radix-ui.com/)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Schema.org Food Events](https://schema.org/FoodEvent)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

**Questions or Updates?**

If you need to update this design principles guide, ask for approval first.

- Propose changes with rationale and examples
