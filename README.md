# DineLocal 🍽️

A comprehensive full-stack platform connecting food lovers with unique local dining experiences. Built with Next.js 15, NestJS 11, TypeScript, and PostgreSQL.

## ✨ Features

### User Features
- **User Management**: Complete authentication with role-based access (USER, HOST, STAFF)
- **Easy Role Switching**: Seamlessly switch between customer and restaurant owner roles
- **Restaurant Discovery**: Browse and discover local dining venues with advanced filtering
- **Experience Booking**: Book dining experiences, cooking classes, wine tastings, and more
- **Profile Management**: Manage personal information and preferences

### Host Features
- **Venue Management**: Create and manage multiple restaurant venues
- **Experience Creation**: Offer diverse dining experiences (dining, cooking classes, wine tasting, food tours, private chef)
- **Availability Management**: Set up and manage time slot availability
- **Booking Management**: Track and manage reservations
- **Dashboard Analytics**: View booking statistics and revenue

### Technical Features
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS 4
- **RESTful API**: Comprehensive API with NestJS and TypeORM
- **Database**: PostgreSQL with sophisticated schema and relationships
- **Docker Ready**: Complete containerization for development and production
- **Type Safety**: Full TypeScript implementation across stack
- **Performance**: Optimized with Next.js 15 Turbopack and database indexing

## 📋 Table of Contents

- [Quick Start](#-quick-start-with-docker)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Manual Setup](#️-manual-setup)
- [Documentation](#-documentation)
- [Database Schema](#️-database-schema)
- [API Overview](#-api-overview)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)

## 🚀 Quick Start with Docker

The easiest way to run DineLocal is using Docker:

```bash
# Clone the repository
git clone https://github.com/Karlitoyo/DineLocal.git
cd dinelocal

# Start all services (production)
docker-compose up --build

# Or for development with hot reloading
docker-compose -f docker-compose.dev.yml up --build
```

Then visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: PostgreSQL on port 5432

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         DineLocal                            │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│    Frontend      │ ◄─────► │     Backend      │ ◄─────► │   PostgreSQL     │
│                  │  HTTP   │                  │  ORM    │                  │
│   Next.js 15     │         │   NestJS 11      │         │    Database      │
│   React 19       │         │   TypeORM        │         │                  │
│   Tailwind 4     │         │   TypeScript     │         │   5 Tables       │
│   TypeScript     │         │                  │         │   7 Relations    │
│                  │         │                  │         │                  │
└──────────────────┘         └──────────────────┘         └──────────────────┘
    Port: 3000                   Port: 3001                   Port: 5432
```

### Project Structure

```
dinelocal/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   └── components/      # React components
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                  # NestJS backend API
│   ├── src/
│   │   ├── users/           # User management module
│   │   ├── venues/          # Venue management module
│   │   ├── experiences/     # Experience management module
│   │   ├── availability/    # Availability management module
│   │   ├── bookings/        # Booking management module
│   │   ├── config/          # Configuration files
│   │   └── database/        # Database seeding
│   └── package.json
│
├── docker-compose.yml        # Production Docker config
├── docker-compose.dev.yml    # Development Docker config
├── DATABASE.md               # Database documentation
└── README.md                 # This file
```

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.5.4 (App Router)
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.13
- **Build Tool**: Turbopack (Next.js native)

### Backend
- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.7.3
- **ORM**: TypeORM 0.3.27
- **Database**: PostgreSQL 8.x
- **Validation**: class-validator & class-transformer
- **Security**: bcrypt for password hashing

### DevOps
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm
- **Testing**: Jest
- **Linting**: ESLint 9.x

## 🏗️ Manual Setup

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 8.0 or higher
- pnpm (recommended) or npm
- Docker (optional)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create PostgreSQL database**
   ```bash
   psql -U postgres
   CREATE DATABASE dinelocal;
   \q
   ```

4. **Set up environment variables**
   Create a `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_NAME=dinelocal
   NODE_ENV=development
   PORT=3001
   ```

5. **Start backend server**
   ```bash
   pnpm run start:dev
   ```

6. **Seed the database (optional)**
   ```bash
   pnpm run seed
   ```

Backend will run on http://localhost:3001

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

Frontend will run on http://localhost:3000

## � Documentation

- **[Backend README](backend/README.md)** - Complete backend documentation
- **[Frontend README](frontend/README.md)** - Complete frontend documentation
- **[API Documentation](backend/API_DOCUMENTATION.md)** - Full API reference
- **[Database Documentation](DATABASE.md)** - Database schema and relationships
- **[Docker Guide](DOCKER_README.md)** - Docker setup and usage
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Implementation details

## 🗄️ Database Schema

DineLocal uses a relational database with 5 main tables:

### Tables
1. **users** - User accounts with role-based access
2. **venues** - Restaurant and dining venue information
3. **experiences** - Dining experiences offered at venues
4. **availability** - Time slot availability for experiences
5. **bookings** - Booking and reservation records

### Relationships
```
users (1) ─────► (M) venues
venues (1) ────► (M) experiences
experiences (1) ► (M) availability
experiences (1) ► (M) bookings
availability (1) ► (M) bookings
users (1) ─────► (M) bookings
```

For detailed schema information, see [DATABASE.md](DATABASE.md)

## 📋 API Overview

### Base URL
```
Development: http://localhost:3001
Production: https://your-domain.com/api
```

### Key Endpoints

#### Users
- `POST /users` - Create new user
- `GET /users` - List all users (with filters)
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/role` - Switch user role
- `DELETE /users/:id` - Delete user

#### Venues
- `POST /venues` - Create venue
- `GET /venues` - List venues (with filters: city, country, cuisine)
- `GET /venues/:id` - Get venue details
- `GET /venues/host/:hostId` - Get venues by host
- `PATCH /venues/:id` - Update venue
- `DELETE /venues/:id` - Delete venue

#### Experiences
- `POST /experiences` - Create experience
- `GET /experiences` - List experiences (with filters)
- `GET /experiences/:id` - Get experience details
- `GET /experiences/venue/:venueId` - Get experiences by venue
- `GET /experiences/with-availability` - Get experiences with availability
- `PATCH /experiences/:id` - Update experience
- `DELETE /experiences/:id` - Delete experience

#### Availability
- `POST /availability` - Create availability slot
- `POST /availability/bulk` - Create multiple slots at once
- `GET /availability` - List availability (with filters)
- `GET /availability/experience/:experienceId` - Get availability for experience
- `GET /availability/:id/check/:guestCount` - Check if available for guests
- `PATCH /availability/:id` - Update availability
- `DELETE /availability/:id` - Delete availability

#### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - List bookings (with filters)
- `GET /bookings/:id` - Get booking details
- `GET /bookings/user/:userId` - Get user's bookings
- `GET /bookings/host/:hostId` - Get host's bookings
- `GET /bookings/stats` - Get booking statistics
- `PATCH /bookings/:id/confirm` - Confirm booking
- `PATCH /bookings/:id/complete` - Mark as completed
- `PATCH /bookings/:id/cancel` - Cancel booking

For complete API documentation, see [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

## 🐳 Docker Services

The application includes three Docker services:

- **frontend**: Next.js application (port 3000)
- **backend**: NestJS API (port 3001)
- **db**: PostgreSQL database (port 5432)

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# Execute commands in containers
docker-compose exec backend pnpm run seed
docker-compose exec db psql -U postgres -d dinelocal
```

## 🔧 Development

### Install Dependencies

```bash
# Install all dependencies (root, frontend, and backend)
pnpm install
```

### Start Development Environment

```bash
# Option 1: Using Docker (recommended)
docker-compose -f docker-compose.dev.yml up --build

# Option 2: Manual (two terminals)
# Terminal 1 - Backend
cd backend && pnpm run start:dev

# Terminal 2 - Frontend
cd frontend && pnpm dev
```

### Code Quality

```bash
# Backend linting
cd backend && pnpm run lint

# Frontend linting
cd frontend && pnpm lint

# Format code (backend)
cd backend && pnpm run format
```

### Database Seeding

```bash
# Seed the database with test data
cd backend && pnpm run seed
```

This creates:
- 2 test users (1 HOST, 1 USER)
- 2 venues
- 4 experiences
- Multiple availability slots
- Sample bookings

## 🧪 Testing

```bash
# Backend unit tests
cd backend && pnpm run test

# Backend e2e tests
cd backend && pnpm run test:e2e

# Backend test coverage
cd backend && pnpm run test:cov

# Frontend tests (when configured)
cd frontend && pnpm test
```

## � Deployment

### Production Build

```bash
# Backend
cd backend
pnpm run build
pnpm run start:prod

# Frontend
cd frontend
pnpm run build
pnpm start
```

### Docker Production

```bash
# Build and run production containers
docker-compose up --build -d

# View production logs
docker-compose logs -f
```

### Environment Variables

Ensure all production environment variables are set:

**Backend (.env)**
```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=secure_password
DB_NAME=dinelocal
NODE_ENV=production
PORT=3001
JWT_SECRET=your_jwt_secret
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: AWS ECS, DigitalOcean, Heroku
- **Database**: AWS RDS, DigitalOcean Managed Database
- **Full Stack**: Docker on VPS, Kubernetes

## 🔒 Security

- Password hashing with bcrypt
- Input validation using class-validator
- SQL injection prevention via TypeORM
- CORS configuration
- Environment variable management
- Foreign key constraints
- Role-based access control

## 🤝 Contributing

This is a private project. For development team members:

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- **Karlitoyo** - [GitHub](https://github.com/Karlitoyo)

## 📞 Support

For questions or issues, please contact the development team.

---

Made with ❤️ by the DineLocal Team
- [Frontend Guide](frontend/README.md)

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, TypeScript
- **Backend**: NestJS, TypeORM, MySQL, TypeScript
- **Infrastructure**: Docker, Docker Compose
- **Development**: pnpm, ESLint, Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the [Docker Guide](DOCKER_README.md) for setup issues
- Review [API Documentation](backend/API_DOCUMENTATION.md) for integration
- Open an issue for bugs or feature requests