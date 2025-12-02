# User Registration & Authentication

## Overview

The DineLocal registration system supports three user types:
- **Guests** (USER role) - Browse and book dining experiences
- **Hosts** (HOST role) - Create and manage dining experiences
- **Staff** (STAFF role) - Platform administration (admin-only creation)

## Features

### Registration Page (`/register`)
- **Tabbed Interface**: Seamlessly switch between Sign Up and Sign In
- **Role Selection**: Users choose between Guest or Host during registration
- **Form Validation**: Comprehensive client-side validation using Zod
- **Responsive Design**: Mobile-first, works on all devices
- **Password Confirmation**: Ensures password accuracy
- **Terms & Conditions**: Required checkbox with links to policy pages

### Sign Up Form Fields
- **Email** (required) - Unique identifier and login credential
- **Password** (required, min 6 characters) - Securely hashed on backend
- **First Name** (required)
- **Last Name** (required)
- **Phone** (optional) - Encouraged for hosts, optional for guests
- **Role Selection** (required) - Guest or Host
- **Terms Agreement** (required) - Checkbox to accept terms

### Sign In Form Fields
- **Email** (required)
- **Password** (required)
- **Remember Me** (optional) - Persist session
- **Forgot Password** link - For password recovery (to be implemented)

## User Entity Structure

Based on `/backend/src/users/user.entity.ts`:

```typescript
{
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  firstName: string
  lastName: string
  phone?: string
  role: 'user' | 'host' | 'staff'
  status: 'active' | 'inactive' | 'suspended'
  profileImage?: string
  bio?: string
  preferences?: Record<string, any>
  
  // Host-specific fields
  businessName?: string
  businessDescription?: string
  businessAddress?: string
  businessPhone?: string
  rating?: number
  totalReviews: number
  
  createdAt: Date
  updatedAt: Date
}
```

## API Integration

### Registration Endpoint
```typescript
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user" // or "host"
}

Response: 201 Created
{
  "user": { ...user object },
  "message": "User created successfully"
}
```

### Login Endpoint (To Be Implemented)
```typescript
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "user": { ...user object },
  "token": "jwt-token-here"
}
```

## State Management

### Auth Store (`/stores/authStore.ts`)
Uses Zustand with persistence:

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token?: string
  
  login: (user: User, token?: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (user: Partial<User>) => void
}
```

Persisted to `localStorage` under key `auth-storage`.

## User Flows

### Guest Registration Flow
1. User navigates to `/register`
2. Selects "Join as Guest" option
3. Fills out required fields (email, password, name)
4. Optionally adds phone number
5. Accepts terms and conditions
6. Submits form
7. Account created with `role: 'user'`
8. Redirected to homepage as authenticated user

### Host Registration Flow
1. User navigates to `/register`
2. Selects "Become a Host" option
3. Fills out required fields (email, password, name)
4. Strongly encouraged to add phone number
5. Accepts terms and conditions
6. Submits form
7. Account created with `role: 'host'`
8. Redirected to homepage (can begin creating experiences)

### Sign In Flow
1. User navigates to `/register` and switches to "Sign In" tab
2. Enters email and password
3. Optionally checks "Remember me"
4. Submits form
5. Backend authenticates credentials (when implemented)
6. JWT token returned and stored
7. User state updated in auth store
8. Redirected to homepage

## Security Considerations

### Client-Side
- Passwords validated for minimum length (6+ characters)
- Email format validation
- HTTPS-only in production
- XSS protection via React's automatic escaping
- Form state isolated from global state until submission

### Backend (To Implement)
- [ ] Password hashing with bcrypt (salt rounds: 10)
- [ ] JWT token generation and validation
- [ ] Rate limiting on auth endpoints
- [ ] Email verification workflow
- [ ] Account lockout after failed attempts
- [ ] CORS configuration
- [ ] SQL injection protection (TypeORM handles this)

## Role Switching

Users can switch between USER and HOST roles:

```typescript
PATCH /users/:id/role
Content-Type: application/json

{
  "newRole": "host" // or "user"
}
```

**Note**: STAFF role can only be assigned by existing staff members.

## UI Components Used

- `Form`, `FormField` - react-hook-form integration
- `Input` - Text input with icon support
- `Button` - Primary actions
- `Card` - Container layout
- `Tabs` - Sign Up / Sign In switching
- `Alert` - Error and success messages
- `Checkbox` - Terms agreement and remember me
- Lucide icons: `ChefHat`, `User`, `Mail`, `Lock`, `Phone`, `ArrowLeft`, `AlertCircle`

## Validation Rules

### Email
- Must be valid email format
- Unique in database (backend enforces)

### Password
- Minimum 6 characters
- Must match confirmation field
- Hashed before storage (backend)

### Names
- Minimum 2 characters each
- No special validation (allows international names)

### Phone
- Optional for guests
- Recommended for hosts (for booking confirmations)
- No format validation (allows international formats)

## Error Handling

- **Network Errors**: "Failed to create account. Please try again."
- **Validation Errors**: Displayed inline per field
- **API Errors**: Error message from backend displayed in Alert component
- **Success**: Confirmation message displayed, redirect after 1.5s

## Accessibility

- Semantic HTML structure
- Proper label associations
- ARIA attributes on form fields
- Keyboard navigation support
- Focus management
- Error announcements
- Color contrast compliance

## Future Enhancements

- [ ] Implement backend `/auth/login` endpoint
- [ ] Email verification workflow
- [ ] Forgot password functionality
- [ ] Social authentication (Google, Facebook)
- [ ] Two-factor authentication option
- [ ] Profile completion progress for hosts
- [ ] Onboarding flow for new hosts
- [ ] Account deletion functionality
- [ ] Export user data (GDPR compliance)
- [ ] Admin dashboard for user management

## Testing

### Manual Testing Checklist
- [ ] Sign up as Guest
- [ ] Sign up as Host
- [ ] Email validation errors
- [ ] Password mismatch errors
- [ ] Terms checkbox requirement
- [ ] Phone number optional behavior
- [ ] Tab switching preserves form state
- [ ] Responsive design on mobile
- [ ] Error messages display correctly
- [ ] Success redirect works
- [ ] localStorage persistence

### Automated Testing (To Implement)
- Unit tests for form validation
- Integration tests for API calls
- E2E tests for full registration flow
- Component tests for form fields

## Files Structure

```
frontend/src/
├── app/register/
│   ├── page.tsx          # Route metadata and wrapper
│   └── register.tsx      # Main registration component
├── api/
│   ├── client.ts         # Base API client
│   └── auth.ts          # Auth-specific API functions
├── stores/
│   └── authStore.ts      # Zustand auth state management
└── components/shared/    # Reusable UI components

backend/src/users/
├── user.entity.ts        # TypeORM entity definition
├── user.dto.ts          # Validation DTOs
├── users.controller.ts   # REST endpoints
├── users.service.ts      # Business logic
└── users.module.ts       # NestJS module
```

## Dependencies

### Frontend
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration
- `zustand` - Global state management
- `next` - React framework
- `lucide-react` - Icons

### Backend
- `@nestjs/common` - NestJS decorators
- `typeorm` - Database ORM
- `class-validator` - DTO validation
- `bcrypt` - Password hashing (to be added)
- `@nestjs/jwt` - JWT tokens (to be added)

## Configuration

### Environment Variables

#### Frontend (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (`.env`)
```bash
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=dinelocal_user
DB_PASSWORD=postgrespass
DB_NAME=dinelocal

# To be added for auth
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## Support

For questions or issues:
1. Check the API documentation: `/backend/API_DOCUMENTATION.md`
2. Review the user entity: `/backend/src/users/user.entity.ts`
3. Test with Postman/curl using the endpoint examples above
4. Check browser console for client-side errors
5. Check backend logs for server-side errors
