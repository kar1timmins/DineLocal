## Booking Flow Design

**Goal:** Get users from "interested" to "booked" with minimal friction and maximum confidence.

---

### Booking Flow Psychology

**The Commitment Escalator:**

1. **Low commitment:** Browse (no email required)
2. **Medium commitment:** Add to wishlist (email required)
3. **High commitment:** Book (payment required)

**Strategy:** Gradually increase commitment, build confidence at each step.

---

### Booking Flow: Do's and Don'ts

#### Step 1: Date & Time Selection

**✅ DO:**

- Show availability calendar upfront (no guessing)
- Allow date range if host flexible ("June 15-20")
- Display unavailable dates clearly (grayed out)
- Show time slots with remaining spots ("6:00 PM - 2 spots left")
- Make mobile calendar thumb-friendly

**❌ DON'T:**

- Force users to guess available dates
- Hide availability until after form filled
- Unclear unavailable dates
- No indication of remaining capacity
- Desktop-only calendar (fails on mobile)

**WHY:**

- 62% of users want to see availability before providing personal info
- Showing capacity creates urgency (scarcity principle)
- Calendar friction causes 35% abandonment

**CALENDAR DESIGN (Good):**

```
Select Date:
┌─────────────────────────┐
│  June 2025              │
│  S  M  T  W  T  F  S    │
│           1  2  3  4    │
│  5  6  7  8  9 10 11    │
│ 12 13 14 ●15 16 17 18   │  ← Available (●)
│ 19 20 21 22 23 24 25    │
│ 26 27 28 29 30          │
└─────────────────────────┘

Selected: June 15, 2025
Available times:
○ 5:30 PM (6 spots left)
● 6:00 PM (2 spots left) ← Selected, scarcity
○ 7:00 PM (4 spots left)
```

**CALENDAR DESIGN (Bad):**

```
Enter desired date: [___________]
(No calendar, no availability shown, user must guess)
```

---

#### Step 2: Guest Details

**✅ DO:**

- Ask for number of guests first (affects price)
- Show price update in real-time as guests added
- Allow guest names optional until later
- Display max capacity clearly ("Max 6 guests")
- Show per-person pricing

**❌ DON'T:**

- Hide guest capacity until error shown
- Static price (no real-time update)
- Require all guest names immediately (friction)
- Unclear pricing structure

**WHY:**

- Real-time price updates reduce cart abandonment by 25%
- Showing capacity prevents frustration
- Optional guest names reduce friction (can collect later)

**GUEST SELECTION (Good):**

```
Number of Guests:
[- 2 +]  (Max 6)

Price per person: $45
Total: $90

Guest names (optional for now):
[Skip for now] [Add names]
```

**GUEST SELECTION (Bad):**

```
Guest 1 Name: [_______]
Guest 2 Name: [_______]
Guest 3 Name: [_______]
...
(Forces user to enter all names, high friction)
```

---

#### Step 3: Dietary Restrictions (Safety-Critical)

**✅ DO:**

- Make dietary restrictions required (safety)
- Use checkboxes for common restrictions
- Include severity levels (allergy vs preference)
- Allow free-text for complex needs
- Show host confirmation requirement
- Use clear, simple language

**❌ DON'T:**

- Make dietary info optional (dangerous)
- Only free-text field (users forget important details)
- No severity indication
- Skip host confirmation step
- Medical jargon ("anaphylaxis" → use "severe allergy")

**WHY:**

- Dietary mistakes can be life-threatening
- 23% of diners have dietary restrictions (Food Allergy Research 2024)
- Host confirmation reduces incidents by 95%

**DIETARY FORM (Good):**

```
Dietary Restrictions & Allergies (Required)

Common Restrictions:
☑ Vegetarian
☐ Vegan
☐ Gluten-Free
☐ Dairy-Free

Allergies (check if severe):
☐ Nuts      ☐ Severe (life-threatening)
☐ Shellfish ☐ Severe (life-threatening)

Other dietary needs:
[________________________]

⚠ Host must confirm they can accommodate before booking is final.
```

**DIETARY FORM (Bad):**

```
Special dietary needs? (Optional)
[________________________]

(No structure, easy to miss critical info)
```

---

#### Step 4: Payment & Confirmation

**✅ DO:**

- Show price breakdown (per person, total, fees)
- Display cancellation policy clearly
- Secure payment badge (SSL, Stripe logo)
- Instant confirmation after payment
- Send confirmation email immediately
- Show booking reference number

**❌ DON'T:**

- Hidden fees (surprise charges)
- Unclear cancellation policy
- No security badges (looks suspicious)
- Delayed confirmation
- No reference number

**WHY:**

- Hidden fees cause 60% cart abandonment (Baymard Institute)
- Transparent pricing increases trust by 45%
- Instant confirmation reduces anxiety and support tickets

**PAYMENT BREAKDOWN (Good):**

```
Price Breakdown:

2 guests × $45           $90.00
Service fee (10%)        $9.00
──────────────────────
Total                    $99.00

Cancellation Policy:
Free cancellation up to 48 hours before.
[Learn more]

Payment secured by Stripe 🔒

[Complete Booking]
```

**PAYMENT BREAKDOWN (Bad):**

```
Total: $99.00

(No breakdown, user doesn't know what they're paying for)

[Submit Payment]
```

---

### Progress Indicators

**✅ DO:**

- Show step number (Step 2 of 4)
- Use progress bar (visual progress)
- Allow going back to previous steps
- Save progress (don't lose data)

**❌ DON'T:**

- Hide number of steps (user doesn't know duration)
- No progress bar
- Can't go back (feels trapped)
- Lose data if user navigates away

**WHY:**

- Progress indicators increase completion by 42%
- Ability to go back reduces anxiety
- Saved progress increases return rate by 35%

**PROGRESS BAR (Good):**

```
Step 2 of 4: Guest Details
[████████░░░░] 50%

[← Back]          [Continue →]
```

**PROGRESS BAR (Bad):**

```
Guest Details

[Next]
(No indication of progress or remaining steps)
```

---

