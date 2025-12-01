# Authentication & Registration

## Purpose

The purpose of this feature is to allow users to either register or log in to the DineLocal application.

**Note:** To determine if the user has to log in or register, the system will verify if they have an account by using their email (obtained manually or via Google).

## Type of Users

There are 4 types of users:

1. Unregistered users, whom we are calling 'Discovery Users,' are new to the application and exploring through experiences in DineLocal application. These are the types of users we are trying to lure into becoming guests or hosts on the application.
2. Registered users, there are two types: Guest and Host.
   1. Guests are users who are exploring and booking local dining experiences within the country they are traveling in or locals in that country.
   2. Hosts are users who create these dining experiences and maintain and schedule them so that they become available on the Guest/Discovery user side.
   3. **Note:**
      1. All users should be registered as a Guest first, before registering as Host in the application (Discovery User ⇒ Guest ⇒ Host).
      2. Registered users who are registered as Guest and Host - they can switch between accounts.
3. Admin are DineLocal employees responsible for providing user support and for approving or declining new host experiences before they become available to Guests/Discovery users.

## Difference between Discovery User and Guest Users

1. Discovery Users
   1. Can search and explore experiences.
   2. Can click 'Become A Host' but requires Login/Register as Guest.
   3. Cannot book or favourite an experience
   4. Cannot message a host about an experience.
   5. Cannot view profile, inbox, notification, app settings and other Guest features.
2. Guest Users
   1. Can search and explore experiences.
   2. Can click 'Become A Host' to start Host registration.
   3. Can book or favourite an experience
   4. Can message a host about an experience.
   5. Can view profile, inbox, notification, app settings and other Guest features

**Note:** Discovery User should login or register as a guest in order to perform any Guest level features.

## Page Access

1. Discovery User:
   1. Only has access to `/`, `/search` and `/experience` routes.
2. Guest User:
   1. Only has access to all routes except `/host` and `/admin`.
3. Host User:
   1. Only has access to `/host` routes.
4. Admin User
   1. Only has access to `/admin` routes.

**Note:**

- Registered users who already have an account do not need to register again.

## Scenarios

Drawer/Sheet component ⇒ Mobile

Dialog component ⇒ (resolution > mobile)

### Scenario 1:

A new user who clicks on a link or arrives to DineLocal via Google. Explores through the experiences and finally decides:

- Attempting to book an experience
- Attempting to favourite an experience
- Clicking 'Login/Register' on the GuestNavbar as a button or in a menu.

**Note:** The system checks if the user is logged in as Guest. If not triggers 'Login/Register' drawer/dialog.

**Scenario 1a: New user registers by entering their email manually.**

1. User enters their email address in the 'Login/Register' drawer/dialog.
2. User clicks on 'Continue' button.
3. System verifies the email does not exist.
4. System closes the 'Login/Register' drawer/dialog.
5. System displays the 'Register' drawer/dialog with:
   - Email pre-filled from Step 1.
   - Required registration fields:
   - Terms and conditions checkbox
   - Register button (disabled until form is valid and T&C accepted)
6. User completes the required fields and accepts terms and conditions.
7. Register button becomes enabled.
8. User clicks 'Register'.
9. System creates the account and logs the user in.
10. 'Register' drawer/dialog closes automatically.
11. User continues on the task they were busy with.

**Scenario 1b: New user registers using Google Sign-In.**

1. User clicks the 'Google' button in the 'Login/Register' drawer/dialog.
2. 'Google' button enters loading state.
3. User goes through and completes Google Sign-In Process (External flow).
4. Google returns user details (including email, name, etc.) to the system.
5. System verifies the email does not exist.
6. System closes the 'Login/Register' drawer/dialog.
7. System displays the 'Register' drawer/dialog with:
   - Fields pre-filled with Google-provided data (email, name, etc.)
   - Remaining required registration fields
   - Terms and conditions checkbox
   - Register button (disabled until form is valid and T&C accepted)
8. User completes any remaining required fields and accepts terms and conditions.
9. Register button becomes enabled.
10. User clicks 'Register'.
11. System creates the account and logs the user in.
12. 'Register' drawer/dialog closes automatically.
13. User continues on the task they were busy with.

### Scenario 2:

An existing user who, only has a guest account, arrives to DineLocal. Explores through the experiences and finally decides:

- Attempting to book an experience
- Attempting to favourite an experience
- Clicking 'Login/Register' on the GuestNavbar as a button or in a menu.

**Note:** The system checks if the user is logged in as Guest. If not triggers 'Login/Register' drawer/dialog.

**Scenario 2a: Existing user logs in by entering their email manually.**

1. User enters their email address in the 'Login/Register' drawer/dialog.
2. User clicks on 'Continue' button.
3. System verifies the email exists in DineLocal.
4. System closes the 'Login/Register' drawer/dialog.
5. System displays the 'Login' drawer/dialog with:
   - Email displayed as read-only
   - Password input field
   - Login button
6. User enters their password and clicks 'Login'.
7. Login button enters loading state; inputs become disabled.
8. On successful login, the 'Login' drawer/dialog closes automatically.
9. User continues on the task they were busy with.

**Scenario 2b: Existing user logs in using Google Sign-In.**

1. User clicks the 'Google' button in the 'Login/Register' drawer/dialog.
2. 'Google' button enters loading state.
3. User goes through and completes Google Sign-In Process (External flow).
4. Google returns user details (including email) to the system.
5. System verifies the email exists in DineLocal.
6. System logs the user in automatically.
7. User continues on the task they were busy with.

**Scenario 2c: Existing user changes email from 'Login' drawer/dialog.**

1. User clicks the edit icon/button near the read-only email address input.
2. System closes the 'Login' drawer/dialog.
3. System displays the 'Login/Register' drawer/dialog.
4. User proceeds with **Scenario 1a**, **1b**, **2a**, or **2b** depending on their next action.

### Scenario 3:

An existing user who has a guest and host account arrives to DineLocal.

**Scenario 3a: User currently logged in as Guest, wants to switch to the Host account.**

1. User clicks on User Profile Menu, then clicks on ‘Switch to Host’
2. System app loader appears (while waiting for host data to load) and redirects user to host dashboard.

**Note:** User should be logged in as Guest first before switching to Host Account.

**Scenario 3b: User not logged into DineLocal**

1. Goes through Scenario 2a, 2b and/or 2c.
2. After logging in, the 'Account Selection' drawer/dialog appears with:
   - Primary button: "Continue as Guest" (highlighted, based on current route context)
   - Secondary button: "Switch to Host"
3. User selects an option.
4. System App loader appears while waiting for data to load, then redirects or stays on current page.

**Note:**

- The primary "Continue as..." button is determined by the current route context.
- If user only has one account (e.g., Guest only) — no prompt, auto-continue.

**Scenario 3c: User currently logged in as Host, wants to switch to Guest account.**

1. User clicks on Host Profile Menu, then clicks on 'Switch to Guest'.
2. System app loader appears (while waiting for guest data to load) and redirects user to home page.

**Note:** User can switch between accounts anytime via Profile Menu.

### Scenario 4:

An existing user who is currently on Host account, however their session/token expires.

**Scenario 4a: When user clicks on any Host features.**

1. System triggers 'Login/Register' drawer/dialog to open.
2. Goes through Scenario 2a, 2b and/or 2c.
3. After logging in, system automatically restores the user to their Host account (no prompt).
4. System App loader appears while waiting for host data to load.
5. User continues on the task they were busy with.

**Note:** System stores `lastActiveRole` before session expires. On re-login, user is restored to that role automatically. `pendingAction` (e.g., 'becomeHost') takes priority over `lastActiveRole` if both exist.

### Scenario 5:

An existing user who is currently on Guest account, however their session/token expires.

**Scenario 5a: When user clicks on any Guest features (booking, favourite, payment, etc.).**

1. System triggers 'Login/Register' drawer/dialog to open.
2. Goes through Scenario 2a, 2b and/or 2c.
3. After logging in, system automatically restores the user to their Guest account (no prompt).
4. System App loader appears while waiting for guest data to load.
5. User continues on the task they were busy with.

**Note:** System stores `lastActiveRole` before session expires. On re-login, user is restored to that role automatically.

### Scenario 6:

An existing user who has a guest, admin and host account arrives to DineLocal.

**Scenario 6a: User not logged into DineLocal**

1. Goes through Scenario 2a, 2b and/or 2c.
2. After logging in, the 'Account Selection' drawer/dialog appears with:
   - Primary button: "Continue as Guest" (highlighted, based on current route context)
   - Secondary buttons: "Switch to Host" | "Switch to Admin"
3. User selects an option.
4. System App loader appears while waiting for data to load, then redirects or stays on current page.

**Note:**

- The primary "Continue as..." button is determined by the current route context.
- If user only has one account (e.g., Guest only) — no prompt, auto-continue.

### Scenario 7:

An existing user who is currently on Admin account, however their session/token expires.

**Scenario 7a: When user clicks on any Admin features.**

1. System triggers 'Login/Register' drawer/dialog to open.
2. Goes through Scenario 2a, 2b and/or 2c.
3. After logging in, system automatically restores the user to their Admin account (no prompt).
4. System App loader appears while waiting for admin data to load.
5. User continues on the task they were busy with.

**Note:** System stores `lastActiveRole` before session expires. On re-login, user is restored to that role automatically.

### Scenario 8:

An existing user who only has a guest account wants to become Host.

**Scenario 8a: When user not logged in and clicks on 'Become a Host' on GuestNavBar or UserProfileMenu or UnregisteredMenu.**

1. User clicks on 'Become a Host'.
2. System stores `pendingAction: 'becomeHost'`.
3. System triggers 'Login/Register' drawer/dialog to open.
4. Goes through Scenario 2a, 2b and/or 2c.
5. After logging in, system detects `pendingAction` and automatically shows the Host T&C drawer/dialog.
6. User reviews and clicks 'Agree' button.
7. System App loader appears while waiting for data to load and redirects user to Host Account.

**Note:** System remembers user intent. No need to re-click "Become a Host" after login.

**Scenario 8b: When user is logged in as Guest and clicks on ‘Become a Host’ on GuestNavBar or UserProfileMenu or UnregisteredMenu.**

1. User clicks on 'Become a Host'
2. Host T&C (drawer/dialog) + Agree button prompts.
3. User clicks Agree button
4. System App loader appears while waiting for data to load and redirects user to Host Account.

### Scenario 9:

An existing user who forgot their password.

**Scenario 9a: User clicks 'Forgot password?' from Login drawer/dialog.**

1. User enters email in 'Login/Register' drawer/dialog and clicks 'Continue'.
2. System verifies email exists and shows 'Login' drawer/dialog.
3. User clicks 'Forgot password?' link.
4. System closes 'Login' drawer/dialog.
5. System displays 'Forgot Password' drawer/dialog with:
   - Email (pre-filled, read-only)
   - 'Send Reset Link' button
6. User clicks 'Send Reset Link'.
7. System sends password reset email to user.
8. System shows confirmation message: "Check your email for reset instructions."
9. User checks email and clicks reset link.
10. System opens 'Reset Password' drawer/dialog with:
    - New Password input
    - Confirm Password input
    - 'Reset Password' button
11. User enters new password and clicks 'Reset Password'.
12. System updates password and shows success message.
13. System closes drawer/dialog and user can now login with new password.

**Note:**

- Reset link expires after 24 hours. User must request a new link if expired.
- Password is shared across all accounts (Guest/Host/Admin). After resetting, user proceeds with normal login flow (Scenario 2a, 3b, or 6a depending on accounts).

### Scenario 10:

A logged-in user wants to logout.

**Scenario 10a: User logs out from any account (Guest/Host/Admin).**

1. User clicks on Profile Menu, then clicks on 'Logout'.
2. System clears session/token, `lastActiveRole`, and `pendingAction`.
3. System redirects user to home page.
4. User is now a Discovery User.

**Note:** Logout is available from any account via Profile Menu.

### Scenario 11:

An existing user encounters login errors.

**Scenario 11a: User enters wrong password.**

1. User enters email in 'Login/Register' drawer/dialog and clicks 'Continue'.
2. System verifies email exists and shows 'Login' drawer/dialog.
3. User enters incorrect password and clicks 'Login'.
4. System shows error message below password field: "Incorrect password. Please try again."
5. User can retry or click 'Forgot password?' link.

**Scenario 11b: User account is locked after multiple failed attempts.**

1. User enters incorrect password multiple times (e.g., 5 attempts).
2. System locks the account temporarily.
3. System shows toast: "Account locked. Try again in 15 minutes or reset your password."
4. User can click 'Forgot password?' to reset, or wait 15 minutes.

**Note:** Account lockout protects against brute-force attacks.

## UI

**General Behavior:**

- All drawers/dialogs can be dismissed via close (X) button or clicking outside.
- Dismissing resets any form state within the drawer/dialog.
- User returns to their previous state (e.g., Discovery User continues browsing).

**Confirmation on Close (Data Loss Prevention):**

- **Registration** and **Reset Password** drawers/dialogs show a confirmation alert when user attempts to close:
  - Message: "Are you sure? Your progress will be lost."
  - Buttons: [Continue] | [Discard]
- Other drawers/dialogs close immediately (minimal data to lose).

---

### 1. 'Login/Register' drawer/dialog

**Title:** "Welcome to DineLocal"

UI Elements:

- Email Input
- 'Continue' button
- Divider line with "or" text
- Google Button

**Note:** A divider line with "or" should separate Google button from Email Input & 'Continue' button.

---

### 2. 'Login' drawer/dialog

**Title:** "Welcome back"

UI Elements:

- Email Input (read-only) + Edit icon/button
- Password Input
- 'Forgot password?' link (below password input)
- 'Login' button
- T&C disclaimer at bottom (research and add one)

---

### 3. 'Register' drawer/dialog

**Title:** "Create your account"

**Step Indicator:** "Step X of 2" (shown at top, below title)

---

#### Step 1: Personal Information

- **Legal First Name** (Mandatory)
  - Input Field
  - Should match Government ID
  - Pre-filled by Google data if available
  - Helper Text: "As shown on your government ID."
  - IF not filled: Error border when user presses 'Next' button.

- **Legal Surname** (Mandatory)
  - Input Field
  - Should match Government ID
  - Pre-filled by Google data if available
  - Group side-by-side with Legal First Name (similar to SearchCriteriaForm)
  - IF not filled: Error border when user presses 'Next' button.

- **Preferred Name** (Optional)
  - Input Field
  - Helper Text: "Visible to others. Optional."

- **Date of Birth** (Mandatory)
  - Should match Government ID
  - Helper Text: "Must be 18 years or older."
  - Broken into:
    - Day (Dropdown) - 1 to 31
    - Month (Dropdown) - Jan to Dec
    - Year (Dropdown) - Current year minus 100 to current year
  - Validation: If user is under 18, show error "You must be 18 or older to register."
  - IF not filled: Error border around (Day, Month, Year) when user presses 'Next' button.

- **Gender** (Mandatory)
  - Dropdown
  - Options: Male, Female, Other
  - Should match Government ID
  - IF not filled: Error border when user presses 'Next' button.

- **'Next' button** → Proceeds to Step 2

---

#### Step 2: Account & Contact

- **Email** (Read-only)
  - Input Field (disabled)
  - Pre-filled from Login/Register step or Google Sign-In
  - Helper Text: "For sign-in and communication."

- **Password** (Mandatory - manual email users only)
  - Input Field
  - Only appears if user manually entered email in Login/Register step
  - Show/hide toggle icon
  - Password rules:
    - Minimum 8 characters
    - At least 1 uppercase letter (A-Z)
    - At least 1 lowercase letter (a-z)
    - At least 1 digit (0-9)
    - At least 1 symbol (!@#$%^&\*)
  - Show password strength indicator or checklist as user types (research competitor patterns)
  - IF not filled: Error border when user presses 'Register' button.

- **Confirm Password** (Mandatory - manual email users only)
  - Input Field
  - Only appears if user manually entered email in Login/Register step
  - Show/hide toggle icon
  - Must match Password field
  - IF not filled or mismatch: Error border when user presses 'Register' button.

- **Contact Number** (Mandatory)
  - Helper Text: "For booking updates. Only visible to DineLocal."
  - Broken into (grouped horizontally):
    - Country Code (Dropdown)
    - Phone Number (Input)
  - IF not filled: Error border when user presses 'Register' button.

- **Terms and Conditions** (Mandatory)
  - Checkbox
  - Label: "I agree to the [Terms of Service] and [Privacy Policy]" (links open in new tab)
  - IF not checked: Error border when user presses 'Register' button.

- **'Back' button** → Returns to Step 1
- **'Register' button** → Submits form (disabled until valid and T&C accepted)

---

### 4. 'Account Selection' drawer/dialog

**Title:** "Continue as..."

**When shown:** After login, when user has multiple accounts (Guest+Host or Guest+Host+Admin).

UI Elements:

- Primary button: "Continue as [current context role]" (highlighted)
  - E.g., "Continue as Guest" if on guest routes
- Secondary button(s): "Switch to [other role]"
  - E.g., "Switch to Host" | "Switch to Admin"

**Note:**

- Primary button determined by current route context.
- If user has only one account — this dialog does not appear.

---

### 5. 'Forgot Password' drawer/dialog

**Title:** "Reset your password"

UI Elements:

- Email Input (read-only, pre-filled)
- 'Send Reset Link' button
- 'Back to Login' link

---

### 6. 'Reset Password' drawer/dialog

**Title:** "Create new password"

UI Elements:

- New Password Input (with show/hide toggle)
- Confirm Password Input (with show/hide toggle)
- Password rules checklist (same as Register)
- 'Reset Password' button

---

### 7. 'Host T&C' drawer/dialog

**Title:** "Become a Host"

UI Elements:

- Host Terms and Conditions content (scrollable)
- Checkbox: "I agree to the Host Terms and Conditions"
- 'Agree' button (disabled until checkbox checked)
- 'Cancel' button

## 3rd Party

- We will be using NextAuth.js (https://next-auth.js.org/)
- Research best practices, security considerations and things to note before implementing these scenarios.
