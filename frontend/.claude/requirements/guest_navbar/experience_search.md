# Experience Search (GuestExperienceSearch.tsx)

## Continuation of:

- .claude/requirements/guest_navbar/guest_navbar.md

## Target component:

- `features/guest-navbar/components/GuestExperienceSearch.tsx`

## Purpose

The purpose of this component is to allow users to search for **dining experiences** (authentic home-cooked meals hosted by locals) using a search bar (either by name or by performing a partial search), location (an area where experiences could reside), date range (find experiences available within a date range), and guest number (this checks if an experience would have availability, for instance, for two people).

**Important Note:** This feature is **ONLY for dining experiences** - NOT cooking classes, tours, or other activities. Users are searching for authentic home-cooked meals.

**Search Criteria:**

- **Location** (REQUIRED): Always must have value. Auto-detected by default, can be changed.
- **Search term** (Optional): Name or partial search (e.g., "Italian", "Pasta", "Vegetarian")
- **Date range** (Optional): Start date + End date. Shows experiences with events in that range.
- **Guest count** (Optional): Number of guests (1-50). Checks availability.

## What do I want the fields to look like in dialog/sheet?

Look at image: `.claude/requirements/guest_navbar/Experience Search (Sheet).png` & `frontend/.claude/requirements/guest_navbar/ExperienceSearch Component (Dialog).png` - this is an idea, you can suggest a better UI.

## Scenarios

### Scenario 1: Searching for experiences

1. A user clicks on the search icon on the guest navigation bar, which triggers a sheet (mobile)/dialog (resolution > mobile) to appear.
2. The sheet/dialog opens with:
   - Location field pre-filled with user's current location (if geolocation permission granted)
   - Search term, date range, and guest count fields empty
   - Empty state body: Icon + intriguing message to encourage search
3. Users enter criteria for the experience(s) they are searching for and press the search button below the sheet/dialog.
4. The system tries to find experiences and returns results that show below the criteria section in a scrollable area.
5. If the search result has more than 10 items, a sticky "View all X experiences →" button (primary variant) appears at the bottom of the sheet/dialog.
6. If users want to see all results, they click "View all X experiences →", and the app redirects them to the experience search page (route: `/search`), where it shows every experience found with pagination.
7. On the `/search` page, the guest nav bar changes:
   - **Mobile**: Logo and Search icon are replaced by the search input (shows condensed criteria)
   - **Desktop**: Search icon is replaced by the search input (shows condensed criteria)
   - Search input example: "Dublin • Italian • Dec 20-27 • 2 guests" (truncates if too long)

### Scenario 2: If the user wants to change the criteria

1. The user clicks on the search input (on `/search` page) and it triggers a sheet (mobile)/dialog (desktop) that contains their entered criteria and previous results.
2. User modifies criteria (e.g., changes date range, adds search term).
3. User presses the search button.
4. The system tries to find experiences and returns new results.
5. If there are no results, the body of sheet/dialog shows:

   ```
   🔍
   No experiences found

   Try adjusting:
   • Different dates
   • Fewer guests
   • Broader search terms

   [Clear filters]
   ```

### Scenario 3: Search button state (Location is REQUIRED)

1. Search button is **DISABLED** when:
   - Location field is empty (REQUIRED field)
   - Visual state: `opacity-50`, `cursor-not-allowed`
   - Tooltip on hover: "Location is required"

2. Search button is **ENABLED** when:
   - Location has value (other criteria are optional)
   - Visual state: Full opacity, `cursor-pointer`

3. Visual indication:
   - Location field has asterisk (\*) to indicate required
   - Helper text below location: "We'll detect your location automatically"

### Scenario 4: User wants to clear a criteria or criterias

1. **Clear individual field**:
   - User clicks the "X" button in the field
   - "X" only appears if the field has a value
   - Field clears and reverts to placeholder

2. **Clear all criteria**:
   - User clicks "Clear all" button in header (next to title)
   - All fields clear EXCEPT location (required field)
   - If there are no values to clear, "Clear all" button is disabled

### Scenario 5: Auto-location handling

1. **On sheet/dialog open:**
   - Attempt to get user's current location via Geolocation API
   - Show loading indicator in location field: "Detecting location..."

2. **If permission GRANTED:**
   - Pre-fill location with detected city (e.g., "Dublin, Ireland")
   - Search button becomes enabled
   - User can change location if desired

3. **If permission DENIED or FAILED:**
   - Show empty location field with placeholder: "Enter location \*"
   - Search button remains disabled
   - Show helper text: "Location helps us find dining experiences near you"
   - User must manually enter location

4. **User can always:**
   - Clear auto-detected location using "X" button
   - Type new location (autocomplete suggestions appear)
   - Press Enter to select first autocomplete suggestion

### Scenario 6: Date range selection

1. User clicks on "Date Range" field
2. Date range picker opens (calendar UI component)
3. User selects:
   - **Start date** (e.g., Dec 20, 2025)
   - **End date** (e.g., Dec 27, 2025)
4. System displays in field: "Dec 20 - Dec 27" with "X" clear button
5. **On search:**
   - Return experiences with ANY event between Dec 20-27
   - If experience has event on Dec 22 (within range) → INCLUDE
   - If all events are outside range → EXCLUDE

6. **Edge cases:**
   - Past dates: DISABLED in date picker
   - Same start/end date: Allowed (single date search)
   - Max range: No limit (user can search full year)
   - Clear button: Clears both start and end date

### Scenario 7: Showing more than 10 results

1. **When search returns >10 results:**
   - Show first 10 Experience Items in scrollable area
   - Display sticky button at bottom of sheet/dialog:
     ```
     ┌─────────────────────────────────┐
     │ View all 47 experiences →      │  (Primary variant, full width)
     └─────────────────────────────────┘
     ```
   - Button remains visible even when scrolling results
   - Shows actual count (e.g., "47 experiences")

2. **When user clicks "View all":**
   - Navigate to `/search` page with criteria in URL query params:
     ```
     /search?location=dublin&search=italian&date_from=2025-12-20&date_to=2025-12-27&guests=2
     ```
   - Show all results with pagination (20 per page)
   - Navbar changes as described in Scenario 1

3. **Visual hierarchy:**
   - Background: `bg-background/95 backdrop-blur`
   - Border top: `border-t`
   - Shadow: `shadow-lg` to separate from results
   - Icon: Arrow right (→) for "go to page" affordance

### Scenario 8: No results found

1. **When search returns 0 results:**
   - Show in scrollable body area (where results would be):

   ```
   ┌─────────────────────────┐
   │      🔍                 │
   │                         │
   │ No dining experiences   │
   │ found                   │
   │                         │
   │ Try adjusting:          │
   │ • Different dates       │
   │ • Fewer guests          │
   │ • Broader search terms  │
   │                         │
   │ [Clear filters]         │
   └─────────────────────────┘
   ```

2. **"Clear filters" button:**
   - Clears search term, date range, guest count
   - Keeps location (required field)
   - Automatically performs new search with just location
   - Shows all dining experiences in that location

### Scenario 9: Location autocomplete

1. **As user types in location field:**
   - Debounce input: 300ms
   - Show dropdown with matching locations:

   ```
   Dublin            ⭐ (if detected location)
   ─────────────────
   📍 Dublin, Ireland
   📍 Dublin, CA, USA
   📍 Dublin, OH, USA
   ```

2. **If no matches found:**
   - Show: "No locations found. Try 'City, Country'"
   - Keep field editable

3. **If user types invalid location and blurs field:**
   - Clear field value
   - Show validation message: "Please select a valid location"
   - Search button remains disabled

4. **Keyboard navigation:**
   - Arrow keys: Navigate suggestions
   - Enter: Select highlighted suggestion
   - Esc: Close dropdown
   - Tab: Move to next field (closes dropdown)

### Scenario 10: URL state management on /search page

1. **When navigating to /search page:**
   - URL includes all search criteria as query params:

   ```
   /search?location=dublin&search=italian&date_from=2025-12-20&date_to=2025-12-27&guests=2
   ```

2. **On page load:**
   - Read URL params
   - Pre-fill search criteria in navbar search input (condensed format)
   - Execute search automatically with URL params
   - Show results

3. **Benefits:**
   - ✅ Shareable links (send to friend via messaging/email)
   - ✅ Bookmarkable searches (save favorite searches)
   - ✅ Browser back/forward buttons work correctly
   - ✅ Refresh page preserves search state

4. **Direct navigation to /search (no query params):**
   - Show empty state with popular/featured dining experiences
   - Search input in navbar is empty, ready to use
   - Clicking search input opens sheet/dialog

### Scenario 11: Favoriting dining experiences (Heart icon)

1. **User clicks ❤️ (heart outline) on Experience Card:**

   **IF user NOT logged in:**
   - Show toast notification: "Sign in to save favorites"
   - Heart remains outline (no change to UI)
   - Optionally: Show sign-in dialog/modal

   **IF user logged in:**
   - Heart fills with color: ❤️ (red/pink)
   - Add experience ID to Zustand store: `favoritedExperienceIds`
   - Sync to backend: `POST /api/favorites/{experienceId}`
   - Show toast notification: "Saved to favorites ✓"

2. **User clicks filled ❤️ to unfavorite:**
   - Heart returns to outline: ♡
   - Remove experience ID from Zustand store
   - Sync to backend: `DELETE /api/favorites/{experienceId}`
   - Show toast notification: "Removed from favorites"

3. **Persistence:**
   - Zustand store syncs with backend API
   - On app load, fetch user's favorited experience IDs
   - Heart appears filled on already-favorited experiences
   - Favorites accessible from user profile page

### Scenario 12: Clearing search criteria when navigating to home page

1. **User journey:**
   - User is on `/search` page with active search criteria (location, search term, dates, guests)
   - User clicks "DineLocal" logo or "Discover" link to return home
   - System clears ALL search criteria from the store
   - User returns to home page with clean slate
   - If user reopens search sheet/dialog, all fields are empty (ready for new search)

2. **Clear triggers:**
   - Clicking "DineLocal" logo → Navigate to `/` → Clear all criteria
   - Clicking "Discover" link → Navigate to `/` → Clear all criteria

3. **Behavior:**
   - Clears ALL criteria including location
   - Ensures fresh search experience when starting from home
   - Browser back button navigation may preserve criteria (browser decision)

4. **Implementation:**
   - Logo component calls `clearCriteria(false)` on click
   - Discover link calls `clearCriteria(false)` on click
   - Store resets to initial state (all fields empty)

5. **Rationale:**
   - Logo/Discover navigation = intent to "start over"
   - Prevents confusion from stale search criteria
   - Follows Jakob's Law (common web pattern - matches Airbnb)
   - Users expect home page = fresh start

---

## What to use to test this?

Use dummy data:

1. **List of dining experiences** (15-20 items):
   - Various cuisines (Italian, Greek, Indian, Japanese, Mexican, Thai, etc.)
   - Different locations (Dublin, London, Paris, Barcelona, etc.)
   - Range of dates (next 60 days)
   - Various guest capacities (4-12 guests max)
   - Different price points (€25-€80 per person)

2. **List of locations** (autocomplete):
   - Dublin, Ireland
   - London, UK
   - Paris, France
   - Barcelona, Spain
   - Rome, Italy
   - Amsterdam, Netherlands
   - (Add 10-15 more cities)

3. **Guest number picker**:
   - Range: 1-50 guests
   - Display format: "1 guest", "2 guests", "10 guests"
   - Use +/- buttons for better mobile UX

4. **Date range picker**:
   - Use `react-day-picker` (already installed)
   - Disable past dates
   - Highlight today
   - Range selection mode

---

## Loading, Empty and Error States

### 1. Loading State

- **When user presses Search button:**
  - Show skeleton UI in scrollable results area
  - Skeleton should match Experience Card layout
  - Show 3-5 skeleton cards
  - Once data loads, skeleton transitions to actual Experience Cards

### 2. Error State

- **When API fails:**
  - Show toast notification with error message
  - Keep criteria filled (don't clear)
  - Allow user to retry search
  - Toast auto-dismisses after 5 seconds

### 3. Empty State (Before search)

- **When sheet/dialog first opens (no search performed):**
  - Show in scrollable body area:
  ```
  ┌─────────────────────────────┐
  │        🍽️                   │
  │                             │
  │ Discover authentic home     │
  │ dining experiences          │
  │                             │
  │ Enter your location and     │
  │ preferences to find the     │
  │ perfect meal               │
  └─────────────────────────────┘
  ```

### 4. Empty State (No results)

- See Scenario 8

---

## Where to store the criteria and experience items:

**Use Zustand store:**

```typescript
// src/features/guest-navbar/store/experienceSearchStore.ts

interface ExperienceSearchState {
  // Criteria (Form State)
  location: string // REQUIRED
  searchTerm: string // Optional
  dateFrom: Date | null // Optional
  dateTo: Date | null // Optional
  guestCount: number // Optional (default: 2)

  // Results State
  experiences: ExperienceItem[]
  totalCount: number
  displayedCount: number // Max 10 in sheet/dialog

  // UI State
  isLoading: boolean
  error: string | null
  isSheetOpen: boolean // For mobile
  isDialogOpen: boolean // For desktop

  // Favorited IDs (synced with backend)
  favoritedExperienceIds: string[]

  // Actions
  setLocation: (location: string) => void
  setSearchTerm: (term: string) => void
  setDateRange: (from: Date | null, to: Date | null) => void
  setGuestCount: (count: number) => void
  search: () => Promise<void>
  clearCriteria: (keepLocation?: boolean) => void
  clearField: (field: string) => void
  toggleSheet: () => void
  toggleDialog: () => void
  toggleFavorite: (experienceId: string) => Promise<void>
}
```

---

## Experience Item Properties

**Note:** These properties intrigue users for **DINING experiences** specifically.

```typescript
interface ExperienceItem {
  id: string

  // Core Info
  name: string // "Authentic Italian Family Dinner"
  description: string // "Join our family for a traditional..."
  location: string // "Dublin, Ireland"
  coordinates?: {
    // For future map integration
    lat: number
    lng: number
  }

  // Host Information
  host: {
    id: string
    name: string // "Maria Rossi"
    avatar?: string // URL to host photo
    verified: boolean // Host verification badge
    languages?: string[] // ["English", "Italian"]
  }

  // Dining Experience Details
  cuisine: string // "Italian"
  cuisineIcon?: string // "🍝" emoji
  menu_description?: string // "3-course homemade pasta dinner"
  dietary_info?: string[] // ["Vegetarian option", "Gluten-free"]

  // Event & Availability
  event_date: Date // Next available event
  event_time?: string // "7:00 PM"
  event_remain_spots: number // 5
  max_guests: number // 8
  duration?: string // "2.5 hours"

  // Pricing
  price: number // 45 (per person)
  currency: string // "EUR"
  includes?: string[] // ["3 courses", "Wine pairing", "Dessert"]

  // Social Proof
  rating: number // 4.7
  reviews: number // 102
  featured?: boolean // Highlight special/popular experiences

  // Media
  image: string // Primary image URL
  images?: string[] // Multiple images [image1, image2, ...]

  // Additional Filters
  tags?: string[] // ["Family-friendly", "Romantic", "Wine pairing"]
  instant_book?: boolean // Book without host approval

  // Favorites (Client-side)
  isFavorited?: boolean // For current user
}
```

---

## Experience Card Design

### Mobile Layout (Compact)

```
┌─────────────────────────────────────┐
│ ┌───────────┐ Italian Family Dinner │ ← Name
│ │   Image   │ Dublin, Ireland    ❤️ │ ← Location + Heart
│ │   240x180 │                       │
│ │           │ Hosted by Maria ✓     │ ← Host + verified badge
│ └───────────┘ 🍝 Italian            │ ← Cuisine
│                                     │
│ Sun, Dec 6 • 7:00 PM                │ ← Event date + time
│ 5 spots left • Up to 8 guests       │ ← Availability + capacity
│ ⭐ 4.7 (102 reviews)                │ ← Rating + reviews
│ €45 per person                      │ ← Price
│ 🌱 Vegetarian option available      │ ← Dietary info (if any)
└─────────────────────────────────────┘
```

### Desktop Layout (/search page - 2 column grid)

```
┌──────────────────┐  ┌──────────────────┐
│ ┌──────────┐  ❤️ │  │ ┌──────────┐  ❤️ │
│ │  Image   │     │  │ │  Image   │     │
│ │ 320x240  │     │  │ │ 320x240  │     │
│ └──────────┘     │  │ └──────────┘     │
│ Name             │  │ Name             │
│ Location         │  │ Location         │
│ Host ✓ • Cuisine │  │ Host ✓ • Cuisine │
│ Date • Time      │  │ Date • Time      │
│ Spots • Capacity │  │ Spots • Capacity │
│ ⭐ Rating        │  │ ⭐ Rating        │
│ €45/person       │  │ €45/person       │
│ 🌱 Dietary info  │  │ 🌱 Dietary info  │
└──────────────────┘  └──────────────────┘
```

### Component Structure (REUSABLE)

```tsx
// src/features/experiences/components/ExperienceCard.tsx

interface ExperienceCardProps {
  experience: ExperienceItem
  layout?: 'compact' | 'comfortable' // Different layouts
  showHeart?: boolean // Default: true
  onFavoriteClick?: (id: string) => void
  onClick?: () => void // Navigate to detail page
}

export function ExperienceCard({
  experience,
  layout = 'compact',
  showHeart = true,
  onClick,
}: ExperienceCardProps) {
  // Reusable across:
  // - Search results sheet/dialog
  // - /search page
  // - Host dashboard
  // - User favorites page
  // - Homepage featured experiences
}
```

---

## UI Requirements

### 1. Scrollable Body

- Body of dialog/sheet is scrollable
- Use `shared/ScrollArea` component
- Header and footer are fixed (sticky)

### 2. Fixed Header

- Title: "Search Dining Experiences"
- "Clear all" button (disabled if no criteria to clear)
- Close button (X)

### 3. Fixed Footer (Criteria Section)

- Location input (required) \*
- Search input (optional)
- Date range picker (optional)
- Guest count picker (optional)
- [Search] button (primary)
- [Clear] button (ghost) - clears non-required fields

### 4. Results Section (Scrollable)

- Experience Cards in vertical list
- Loading: 3-5 skeleton cards
- Empty: Icon + message
- No results: Icon + suggestions + "Clear filters"
- Sticky "View all X experiences →" when >10 results

---

## Accessibility Requirements

### 1. Keyboard Navigation

- **Cmd/Ctrl + K**: Open search sheet/dialog (global shortcut)
- **Esc**: Close sheet/dialog
- **Tab**: Navigate through form fields
- **Enter**: Submit search (when in form fields)
- **Arrow keys**: Navigate location autocomplete dropdown

### 2. Screen Reader Support

- Announce sheet/dialog open: "Search dialog opened"
- Announce loading: "Searching for dining experiences"
- Announce results: "Found 47 dining experiences"
- Announce no results: "No experiences found"
- ARIA labels on all interactive elements

### 3. Focus Management

- Auto-focus location field on sheet/dialog open
- Return focus to search trigger button on close
- Trap focus within sheet/dialog (can't Tab outside)
- Visible focus indicators on all interactive elements

### 4. ARIA Labels

- `aria-label="Search for dining experiences"` on search trigger
- `aria-live="polite"` on results count
- `aria-required="true"` on location field
- `aria-invalid` on validation errors

---

## Responsive Breakpoints

```tsx
// Tailwind breakpoints
mobile:    < 768px   → Sheet (full-screen)
desktop:   ≥ 768px   → Dialog (centered, max-w-3xl)

// Implementation
<div className="md:hidden">
  {/* ExperienceSearchSheet (mobile) */}
</div>

<div className="hidden md:block">
  {/* ExperienceSearchDialog (desktop) */}
</div>
```

---

## Questions (Resolved)

1. ✅ **Location requirement?** → REQUIRED (always must have value)
2. ✅ **Date picker type?** → Date range picker (start + end)
3. ✅ **Empty state?** → Icon + intriguing message only
4. ✅ **Show more button?** → Sticky "View all X experiences →" (primary variant)

---

## Implementation Checklist

### Phase 1: Setup

- [ ] Create feature folder structure
- [ ] Create Zustand store
- [ ] Create dummy data (dining experiences + locations)
- [ ] Create API functions (search, autocomplete)

### Phase 2: Core Components

- [ ] ExperienceCard (reusable)
- [ ] ExperienceCardSkeleton
- [ ] SearchCriteriaForm
- [ ] ExperienceSearchResults
- [ ] ExperienceSearchResultsSkeleton

### Phase 3: Search UI

- [ ] ExperienceSearchSheet (mobile)
- [ ] ExperienceSearchDialog (desktop)
- [ ] GuestExperienceSearch (button in navbar)

### Phase 4: Search Page

- [ ] Create /search page
- [ ] URL query params handling
- [ ] Pagination
- [ ] Updated navbar with condensed search input

### Phase 5: Integration & Testing

- [ ] Integrate with GuestNavbar
- [ ] Test all 11 scenarios
- [ ] Accessibility testing
- [ ] Responsive testing (mobile/tablet/desktop)
- [ ] Visual check with Playwright

---

## TODO: Future Enhancements

### Scenario 5: Auto-location (Geolocation) - DEFERRED

**UX Laws:** Tesler's Law (reduces complexity), Doherty Threshold (saves time)

- [ ] Request Geolocation permission on sheet/dialog open
- [ ] Show loading state: "Detecting location..."
- [ ] Handle permission denied gracefully
- [ ] Fall back to empty field with helper text
- [ ] Cache detected location for session

**Why Deferred:** Users can manually type location. Core flow works without it. Requires Geolocation API, permission handling, loading states.

---

### Scenario 9: Location Autocomplete Validation - DEFERRED

**UX Laws:** Postel's Law (tolerant input), Hick's Law (limit to 5-7 suggestions)

- [ ] Fuzzy matching for typos ("itallian" → "italian")
- [ ] Show "No locations found" with suggestions
- [ ] Validate on blur - clear invalid input
- [ ] Keyboard navigation (Arrow keys, Enter, Esc)

**Why Deferred:** Core search works without validation. Requires API integration, debounce, keyboard handling.

---

### Scenario 11: Favoriting with Auth & Feedback - DEFERRED

**UX Laws:** Peak-End Rule (positive feedback), Zeigarnik Effect (completion signals)

- [ ] Check login status before favoriting
- [ ] Show toast: "Sign in to save favorites" if not logged in
- [ ] Show toast: "Saved to favorites ✓" on success
- [ ] Show toast: "Removed from favorites" on unfavorite
- [ ] Sync favorites with backend API

**Why Deferred:** Heart click works (updates store). Login check and toasts are polish. Can add when auth system is complete.

---

**Last Updated:** 2025-11-25
**Status:** Core implementation complete, polish items deferred
