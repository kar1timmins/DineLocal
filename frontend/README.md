# DineLocal Frontend 🌐

A modern Next.js frontend application for discovering and booking unique local dining experiences. Built with React 19, Next.js 15, TypeScript, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Components](#components)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)

## ✨ Features

- **Responsive Design**: Mobile-first, fully responsive UI
- **Venue Discovery**: Browse restaurants and dining venues with advanced filtering
- **Search & Filter**: Filter by location, cuisine type, and availability
- **User Profiles**: View and manage user profiles with role switching
- **Host Dashboard**: Interface for hosts to manage their venues
- **Real-time Updates**: Dynamic content loading with optimistic UI updates
- **Modern UI Components**: Reusable component library with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Performance Optimized**: Next.js 15 with Turbopack for fast development

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Turbopack
- **Linting**: ESLint 9.x
- **Package Manager**: pnpm

## 🏗 Architecture

The application follows the Next.js App Router structure with a component-based architecture:

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (venue discovery)
│   │   ├── globals.css         # Global styles
│   │   └── favicon.ico         # Favicon
│   └── components/             # React components
│       ├── Navbar.tsx          # Navigation bar
│       ├── VenueCard.tsx       # Venue display card
│       ├── SearchFilters.tsx   # Search filter component
│       └── ui/                 # Reusable UI components
│           ├── Alert.tsx       # Alert/notification component
│           ├── Button.tsx      # Button component
│           ├── Card.tsx        # Card component
│           ├── Modal.tsx       # Modal dialog component
│           └── index.ts        # Component exports
├── public/                     # Static assets
└── package.json
```

## 🧩 Components

### Core Components

#### **Navbar**

Navigation bar with user authentication status and role switching.

**Features:**

- Logo and branding
- Navigation links
- User profile dropdown
- Host/User role toggle
- Responsive mobile menu

**Usage:**

```tsx
import Navbar from '@/components/Navbar'

;<Navbar />
```

#### **VenueCard**

Displays venue information in a card format.

**Props:**

- `venue`: Venue object with details
- `onClick`: Optional click handler

**Features:**

- Venue image display
- Name, description, location
- Cuisine type tags
- Host information
- Capacity indicator

**Usage:**

```tsx
import VenueCard from '@/components/VenueCard'

;<VenueCard venue={venueData} onClick={() => handleVenueClick(venueData.id)} />
```

#### **SearchFilters**

Search and filter interface for venues.

**Props:**

- `onFilterChange`: Callback with filter values

**Features:**

- City filter
- Country filter
- Cuisine type multi-select
- Clear filters button

**Usage:**

```tsx
import SearchFilters from '@/components/SearchFilters'

;<SearchFilters onFilterChange={handleFilterChange} />
```

### UI Components

#### **Button**

Reusable button component with variants.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onClick`: Click handler
- `children`: Button content

**Usage:**

```tsx
import { Button } from '@/components/ui'

;<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

#### **Card**

Container component with consistent styling.

**Props:**

- `title`: Optional card title
- `children`: Card content
- `className`: Additional CSS classes

**Usage:**

```tsx
import { Card } from '@/components/ui'

;<Card title="Card Title">
  <p>Card content goes here</p>
</Card>
```

#### **Modal**

Modal dialog component for overlays.

**Props:**

- `isOpen`: boolean
- `onClose`: Close handler
- `title`: Modal title
- `children`: Modal content

**Usage:**

```tsx
import { Modal } from '@/components/ui'

;<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Modal Title">
  <p>Modal content</p>
</Modal>
```

#### **Alert**

Alert/notification component.

**Props:**

- `type`: 'success' | 'error' | 'warning' | 'info'
- `message`: Alert message
- `onClose`: Optional close handler

**Usage:**

```tsx
import { Alert } from '@/components/ui'

;<Alert
  type="success"
  message="Operation completed successfully!"
  onClose={() => setShowAlert(false)}
/>
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm
- Backend API running on port 3001

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional: Analytics, Auth, etc.
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Installation Steps

1. **Install dependencies**

   ```bash
   cd frontend
   pnpm install
   ```

2. **Verify backend is running**

   ```bash
   # Backend should be running on http://localhost:3001
   curl http://localhost:3001
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Development

### Running the Application

```bash
# Development mode with Turbopack
pnpm dev

# Development on different port
pnpm dev -p 3001

# Production build
pnpm build

# Run production server
pnpm start
```

### Development Scripts

```bash
# Run linter
pnpm lint

# Run linter with auto-fix
pnpm lint --fix

# Type checking
tsc --noEmit
```

### Folder Structure Best Practices

- **`/app`**: Next.js pages and layouts (App Router)
- **`/components`**: Reusable React components
- **`/components/ui`**: Base UI components
- **`/lib`**: Utility functions and helpers
- **`/hooks`**: Custom React hooks
- **`/types`**: TypeScript type definitions
- **`/public`**: Static assets (images, fonts, etc.)

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom configuration.

### Tailwind Configuration

Key features:

- Custom color palette
- Responsive breakpoints
- Custom spacing scale
- Typography utilities

### Adding Custom Styles

```tsx
// Using Tailwind classes
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Content
</div>

// Using custom CSS (in component or globals.css)
<div className="custom-gradient">
  Content
</div>
```

## 🧪 Testing

```bash
# Run tests (when configured)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📦 Building for Production

```bash
# Create optimized production build
pnpm build

# Analyze bundle size
pnpm build --analyze

# Start production server
pnpm start
```

### Build Output

The build creates an optimized version in the `.next` folder:

- Static pages are pre-rendered
- Dynamic routes use SSR or ISR
- API routes are bundled
- Assets are optimized and minified

## 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t dinelocal-frontend -f Dockerfile .

# Run container
docker run -p 3000:3000 dinelocal-frontend

# Using Docker Compose (from project root)
docker-compose up --build
```

## 🌐 Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

- **Netlify**: Supports Next.js with adapter
- **AWS Amplify**: Full Next.js support
- **DigitalOcean App Platform**: Container or buildpack
- **Self-hosted**: Use Docker or Node.js server

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

## 🔐 API Integration

The frontend communicates with the backend API:

### API Configuration

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchVenues(filters?: FilterParams) {
  const response = await fetch(`${API_BASE_URL}/venues`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
```

### API Endpoints Used

- `GET /venues` - Fetch venues
- `GET /venues/:id` - Get venue details
- `GET /experiences` - Fetch experiences
- `POST /bookings` - Create booking
- `GET /users/:id` - Get user profile
- `PATCH /users/:id/role` - Switch user role

## 🎯 Performance Optimization

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: API response caching
- **Bundle Analysis**: Regular bundle size monitoring

## 📱 Responsive Design

Breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and fully responsive.

## 🐛 Debugging

```bash
# Development mode with detailed errors
pnpm dev

# Check for TypeScript errors
pnpm tsc --noEmit

# Debug build issues
pnpm build --debug
```

## 📄 License

This project is private and proprietary.

## 👥 Contributors

DineLocal Development Team

---

For backend documentation, see [../backend/README.md](../backend/README.md)  
For complete API reference, see [../backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)
