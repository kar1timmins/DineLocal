# DineLocal Backend API 🍽️

A comprehensive NestJS backend API for the DineLocal platform - connecting food lovers with unique local dining experiences. Built with TypeScript, NestJS, TypeORM, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Setup & Installation](#setup--installation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)

## ✨ Features

- **User Management**: Complete CRUD operations with role-based access (USER, HOST, STAFF)
- **Venue Management**: Restaurant and venue listing with geolocation support
- **Experience Management**: Diverse dining experiences (dining, cooking classes, wine tasting, food tours, private chef)
- **Availability System**: Sophisticated time slot management with booking capacity tracking
- **Booking System**: Complete booking lifecycle with status tracking and payment management
- **Search & Filtering**: Advanced filtering by location, cuisine type, date, and availability
- **Data Seeding**: Pre-configured seed data for development and testing

## 🛠 Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 8.x
- **ORM**: TypeORM 0.3.x
- **Authentication**: bcrypt for password hashing
- **Validation**: class-validator & class-transformer
- **Testing**: Jest
- **Package Manager**: pnpm

## 🏗 Architecture

The application follows a modular architecture with these core modules:

```
backend/src/
├── users/              # User management & authentication
├── venues/             # Restaurant/venue management
├── experiences/        # Dining experience management
├── availability/       # Time slot & availability management
├── bookings/           # Booking & reservation system
├── config/             # Configuration files
└── database/           # Database seeding utilities
```

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────┐
│    Users    │
│  (id: UUID) │
└──────┬──────┘
       │ 1
       │
       │ *
┌──────┴───────┐
│    Venues    │
│  (id: UUID)  │◄────────┐
│  hostId: FK  │         │
└──────┬───────┘         │
       │ 1               │
       │                 │
       │ *               │ 1
┌──────┴───────────┐     │
│   Experiences    │     │
│    (id: UUID)    │     │
│   venueId: FK    │     │
└──────┬───────────┘     │
       │ 1               │
       │                 │
       ├─*───────────────┤
       │                 │
┌──────┴────────────┐    │
│   Availability    │    │
│    (id: UUID)     │    │
│ experienceId: FK  │    │
└──────┬────────────┘    │
       │ 1               │
       │                 │
       │ *               │
┌──────┴──────────┐      │
│    Bookings     │      │
│   (id: UUID)    │      │
│   userId: FK    │──────┘
│ experienceId: FK│
│availabilityId:FK│
└─────────────────┘
```

### Tables

#### **users**
Core user information with role-based fields.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | Unique email address |
| password | VARCHAR | Hashed password |
| firstName | VARCHAR | User's first name |
| lastName | VARCHAR | User's last name |
| phone | VARCHAR | Optional phone number |
| role | ENUM | USER, HOST, or STAFF |
| status | ENUM | ACTIVE, INACTIVE, SUSPENDED |
| profileImage | VARCHAR | Profile image URL |
| bio | TEXT | User biography |
| preferences | JSON | User preferences object |
| **Host-Specific Fields** | | |
| businessName | VARCHAR | Business/restaurant name |
| businessDescription | TEXT | Business description |
| businessAddress | VARCHAR | Business address |
| businessPhone | VARCHAR | Business contact number |
| rating | DECIMAL(3,2) | Average rating (0-5) |
| totalReviews | INT | Number of reviews |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Last update time |

#### **venues**
Restaurant and venue information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR | Venue name |
| description | TEXT | Venue description |
| address | VARCHAR | Street address |
| city | VARCHAR | City |
| country | VARCHAR | Country |
| postalCode | VARCHAR | Postal code |
| latitude | DECIMAL(10,8) | GPS latitude |
| longitude | DECIMAL(11,8) | GPS longitude |
| images | TEXT[] | Array of image URLs |
| amenities | TEXT[] | Available amenities |
| cuisineTypes | TEXT[] | Types of cuisine offered |
| capacity | INT | Maximum guest capacity |
| isActive | BOOLEAN | Venue active status |
| hostId | UUID | Foreign key to users |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Last update time |

**Relationships:**
- `belongsTo` User (as Host)

#### **experiences**
Dining experiences offered at venues.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | VARCHAR | Experience title |
| description | TEXT | Detailed description |
| type | ENUM | DINING, COOKING_CLASS, WINE_TASTING, FOOD_TOUR, PRIVATE_CHEF |
| basePrice | DECIMAL(10,2) | Base price per person |
| duration | INT | Duration in minutes |
| minGuests | INT | Minimum guests required |
| maxGuests | INT | Maximum guests allowed |
| images | TEXT[] | Experience images |
| includedItems | TEXT[] | What's included |
| requirements | TEXT[] | Guest requirements |
| isActive | BOOLEAN | Experience active status |
| venueId | UUID | Foreign key to venues |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Last update time |

**Relationships:**
- `belongsTo` Venue
- `hasMany` Availability
- `hasMany` Booking

#### **availability**
Time slot availability for experiences.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| date | DATE | Available date |
| startTime | TIME | Start time (HH:MM) |
| endTime | TIME | End time (HH:MM) |
| priceOverride | DECIMAL(10,2) | Override base price for this slot |
| bookedSlots | INT | Number of current bookings |
| maxSlots | INT | Maximum bookings allowed |
| status | ENUM | AVAILABLE, BOOKED, BLOCKED |
| notes | TEXT | Optional notes |
| experienceId | UUID | Foreign key to experiences |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Last update time |

**Indexes:**
- Unique index on (experienceId, date, startTime)

**Relationships:**
- `belongsTo` Experience
- `hasMany` Booking

#### **bookings**
Booking and reservation records.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| guestCount | INT | Number of guests |
| totalPrice | DECIMAL(10,2) | Total booking price |
| serviceFee | DECIMAL(10,2) | Service fee amount |
| taxes | DECIMAL(10,2) | Tax amount |
| status | ENUM | PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW |
| paymentStatus | ENUM | PENDING, PAID, REFUNDED, FAILED |
| specialRequests | TEXT | Guest special requests |
| cancellationReason | TEXT | Reason for cancellation |
| confirmedAt | TIMESTAMP | Confirmation timestamp |
| cancelledAt | TIMESTAMP | Cancellation timestamp |
| userId | UUID | Foreign key to users |
| experienceId | UUID | Foreign key to experiences |
| availabilityId | UUID | Foreign key to availability |
| createdAt | TIMESTAMP | Record creation time |
| updatedAt | TIMESTAMP | Last update time |

**Relationships:**
- `belongsTo` User
- `belongsTo` Experience
- `belongsTo` Availability

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

### Base URL
```
Development: http://localhost:3001
Production: https://your-domain.com/api
```

### Quick Reference

#### Users
- `POST /users` - Create new user
- `GET /users` - Get all users (with role filter)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/role` - Switch user role
- `DELETE /users/:id` - Delete user

#### Venues
- `POST /venues` - Create venue
- `GET /venues` - List venues (with filters)
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
- `POST /availability/bulk` - Create multiple slots
- `GET /availability` - List availability (with filters)
- `GET /availability/experience/:experienceId` - Get availability for experience
- `GET /availability/:id/check/:guestCount` - Check if available
- `PATCH /availability/:id` - Update availability
- `DELETE /availability/:id` - Delete availability

#### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - List bookings (with filters)
- `GET /bookings/:id` - Get booking details
- `GET /bookings/user/:userId` - Get user's bookings
- `GET /bookings/host/:hostId` - Get host's bookings
- `GET /bookings/stats` - Get booking statistics
- `PATCH /bookings/:id` - Update booking
- `PATCH /bookings/:id/confirm` - Confirm booking
- `PATCH /bookings/:id/complete` - Mark as completed
- `PATCH /bookings/:id/cancel` - Cancel booking

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 8.0 or higher
- pnpm (recommended) or npm

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=dinelocal

# Application
NODE_ENV=development
PORT=3001

# Security (add in production)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=7d
```

### Installation Steps

1. **Install dependencies**
   ```bash
   cd backend
   pnpm install
   ```

2. **Create database**
   ```bash
   # Using PostgreSQL CLI
   psql -U postgres
   CREATE DATABASE dinelocal;
   \q
   ```

3. **Run database migrations** (TypeORM will auto-sync in development)
   ```bash
   pnpm run start:dev
   ```

4. **Seed the database** (optional)
   ```bash
   pnpm run seed
   ```

## 🔧 Development

### Running the Application

```bash
# Development mode with hot reload
pnpm run start:dev

# Debug mode
pnpm run start:debug

# Production mode
pnpm run build
pnpm run start:prod
```

### Database Management

```bash
# Run database seed
pnpm run seed

# TypeORM CLI commands (add to package.json scripts as needed)
typeorm migration:generate -n MigrationName
typeorm migration:run
typeorm migration:revert
```

### Code Quality

```bash
# Run linter
pnpm run lint

# Format code
pnpm run format
```

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Test coverage
pnpm run test:cov

# E2E tests
pnpm run test:e2e
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in development mode
docker-compose -f docker-compose.dev.yml up --build

# Stop services
docker-compose down
```

## 📝 Project Structure

```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   ├── config/
│   │   └── database.config.ts     # Database configuration
│   ├── database/
│   │   ├── seed.ts                # Database seed data
│   │   └── run-seed.ts            # Seed runner
│   ├── users/
│   │   ├── user.entity.ts         # User entity
│   │   ├── users.controller.ts    # User endpoints
│   │   ├── users.service.ts       # User business logic
│   │   ├── users.module.ts        # User module
│   │   └── dto/                   # Data transfer objects
│   ├── venues/
│   ├── experiences/
│   ├── availability/
│   └── bookings/
├── test/                          # E2E tests
├── Dockerfile                     # Production Docker image
├── Dockerfile.dev                 # Development Docker image
└── package.json
```

## 🔐 Security Considerations

- Passwords are hashed using bcrypt
- Input validation using class-validator
- SQL injection prevention via TypeORM parameterized queries
- CORS enabled for frontend communication
- Environment variables for sensitive data

## 🚀 Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure proper database credentials
4. Enable HTTPS
5. Set up database backups
6. Configure monitoring and logging
7. Use process manager (PM2, Docker, etc.)

## 📄 License

This project is private and proprietary.

## 👥 Contributors

DineLocal Development Team

---

For frontend documentation, see [../frontend/README.md](../frontend/README.md)  
For complete API reference, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
