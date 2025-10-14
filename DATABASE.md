# DineLocal Database Documentation 🗄️

Complete database schema documentation for the DineLocal platform including entity relationships, constraints, and usage examples.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Configuration](#database-configuration)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Tables](#tables)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Constraints](#constraints)
- [Enumerations](#enumerations)
- [Queries & Examples](#queries--examples)

## 🔍 Overview

DineLocal uses PostgreSQL as its primary database with TypeORM as the ORM layer. The database supports a multi-tenant structure where users can operate in multiple roles, venues can offer multiple experiences, and experiences have time-slotted availability for bookings.

### Database Stats
- **Database Engine**: PostgreSQL 8.0+
- **ORM**: TypeORM 0.3.x
- **Total Tables**: 5
- **Total Relationships**: 7
- **Supported Data Types**: UUID, VARCHAR, TEXT, INT, DECIMAL, DATE, TIME, TIMESTAMP, ENUM, JSON, ARRAY

## ⚙️ Database Configuration

### Connection Settings

```typescript
// config/database.config.ts
{
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'dinelocal',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
}
```

### Environment Variables

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password
DB_NAME=dinelocal
```

## 📊 Entity Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        DINELOCAL DATABASE                         │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────┐
│       USERS         │
│─────────────────────│
│ • id (PK)           │
│ • email (UNIQUE)    │
│ • password          │
│ • firstName         │
│ • lastName          │
│ • phone             │
│ • role (ENUM)       │
│ • status (ENUM)     │
│ • profileImage      │
│ • bio               │
│ • preferences (JSON)│
│                     │
│ [HOST FIELDS]       │
│ • businessName      │
│ • businessDesc      │
│ • businessAddress   │
│ • businessPhone     │
│ • rating            │
│ • totalReviews      │
│                     │
│ • createdAt         │
│ • updatedAt         │
└──────────┬──────────┘
           │ 1
           │ (hostId)
           │
           │ *
┌──────────┴──────────┐
│       VENUES        │
│─────────────────────│
│ • id (PK)           │
│ • name              │
│ • description       │
│ • address           │
│ • city              │
│ • country           │
│ • postalCode        │
│ • latitude          │
│ • longitude         │
│ • images (ARRAY)    │
│ • amenities (ARRAY) │
│ • cuisineTypes ([]) │
│ • capacity          │
│ • isActive          │
│ • hostId (FK) ──────┼─────┐
│ • createdAt         │     │
│ • updatedAt         │     │
└──────────┬──────────┘     │
           │ 1               │
           │ (venueId)       │
           │                 │
           │ *               │
┌──────────┴──────────┐     │
│    EXPERIENCES      │     │
│─────────────────────│     │
│ • id (PK)           │     │
│ • title             │     │
│ • description       │     │
│ • type (ENUM)       │     │
│ • basePrice         │     │
│ • duration          │     │
│ • minGuests         │     │
│ • maxGuests         │     │
│ • images (ARRAY)    │     │
│ • includedItems ([])│     │
│ • requirements ([]) │     │
│ • isActive          │     │
│ • venueId (FK) ─────┘     │
│ • createdAt         │     │
│ • updatedAt         │     │
└──────────┬──────────┘     │
           │ 1               │
           │ (experienceId)  │
           │                 │
           │ *               │
┌──────────┴──────────┐     │
│    AVAILABILITY     │     │
│─────────────────────│     │
│ • id (PK)           │     │
│ • date              │     │
│ • startTime         │     │
│ • endTime           │     │
│ • priceOverride     │     │
│ • bookedSlots       │     │
│ • maxSlots          │     │
│ • status (ENUM)     │     │
│ • notes             │     │
│ • experienceId (FK) ┘     │
│ • createdAt         │     │
│ • updatedAt         │     │
└──────────┬──────────┘     │
           │ 1               │
           │ (availabilityId)│
           │                 │
           │ *               │
┌──────────┴──────────┐     │
│      BOOKINGS       │     │
│─────────────────────│     │
│ • id (PK)           │     │
│ • guestCount        │     │
│ • totalPrice        │     │
│ • serviceFee        │     │
│ • taxes             │     │
│ • status (ENUM)     │     │
│ • paymentStatus     │     │
│ • specialRequests   │     │
│ • cancellationReason│     │
│ • confirmedAt       │     │
│ • cancelledAt       │     │
│ • userId (FK) ──────┼─────┘
│ • experienceId (FK) ┘
│ • availabilityId(FK)┘
│ • createdAt         │
│ • updatedAt         │
└─────────────────────┘

LEGEND:
─── : One-to-Many Relationship
PK  : Primary Key
FK  : Foreign Key
[]  : Array Type
```

## 📋 Tables

### 1. users

Stores user information with support for multiple roles (USER, HOST, STAFF).

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NO | `uuid_generate_v4()` | Primary key |
| `email` | VARCHAR(255) | NO | - | Unique email address |
| `password` | VARCHAR(255) | NO | - | Bcrypt hashed password |
| `firstName` | VARCHAR(100) | NO | - | User's first name |
| `lastName` | VARCHAR(100) | NO | - | User's last name |
| `phone` | VARCHAR(20) | YES | NULL | Contact phone number |
| `role` | ENUM | NO | 'user' | USER, HOST, or STAFF |
| `status` | ENUM | NO | 'active' | ACTIVE, INACTIVE, SUSPENDED |
| `profileImage` | VARCHAR(500) | YES | NULL | Profile image URL |
| `bio` | TEXT | YES | NULL | User biography |
| `preferences` | JSON | YES | NULL | User preferences object |
| `businessName` | VARCHAR(255) | YES | NULL | Business name (HOST only) |
| `businessDescription` | TEXT | YES | NULL | Business description (HOST) |
| `businessAddress` | VARCHAR(500) | YES | NULL | Business address (HOST) |
| `businessPhone` | VARCHAR(20) | YES | NULL | Business phone (HOST) |
| `rating` | DECIMAL(3,2) | YES | NULL | Average rating 0.00-5.00 |
| `totalReviews` | INTEGER | NO | 0 | Total number of reviews |
| `createdAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Creation timestamp |
| `updatedAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Last update timestamp |

#### Constraints
- **Primary Key**: `id`
- **Unique**: `email`
- **Check**: `rating >= 0 AND rating <= 5`

#### Indexes
- `idx_users_email` on `email`
- `idx_users_role` on `role`
- `idx_users_status` on `status`

---

### 2. venues

Stores restaurant and venue information.

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NO | `uuid_generate_v4()` | Primary key |
| `name` | VARCHAR(255) | NO | - | Venue name |
| `description` | TEXT | NO | - | Venue description |
| `address` | VARCHAR(500) | NO | - | Street address |
| `city` | VARCHAR(100) | NO | - | City |
| `country` | VARCHAR(100) | NO | - | Country |
| `postalCode` | VARCHAR(20) | YES | NULL | Postal/ZIP code |
| `latitude` | DECIMAL(10,8) | YES | NULL | GPS latitude |
| `longitude` | DECIMAL(11,8) | YES | NULL | GPS longitude |
| `images` | TEXT[] | YES | NULL | Array of image URLs |
| `amenities` | TEXT[] | YES | NULL | Available amenities |
| `cuisineTypes` | TEXT[] | YES | NULL | Types of cuisine |
| `capacity` | INTEGER | NO | 0 | Maximum capacity |
| `isActive` | BOOLEAN | NO | TRUE | Active status |
| `hostId` | UUID | NO | - | Foreign key to users |
| `createdAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Creation timestamp |
| `updatedAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Last update timestamp |

#### Constraints
- **Primary Key**: `id`
- **Foreign Key**: `hostId` REFERENCES `users(id)` ON DELETE CASCADE

#### Indexes
- `idx_venues_host` on `hostId`
- `idx_venues_city` on `city`
- `idx_venues_country` on `country`
- `idx_venues_active` on `isActive`
- `idx_venues_location` on `latitude, longitude` (spatial index)

---

### 3. experiences

Stores dining experience offerings.

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NO | `uuid_generate_v4()` | Primary key |
| `title` | VARCHAR(255) | NO | - | Experience title |
| `description` | TEXT | NO | - | Detailed description |
| `type` | ENUM | NO | 'dining' | Experience type |
| `basePrice` | DECIMAL(10,2) | NO | - | Base price per person |
| `duration` | INTEGER | NO | 60 | Duration in minutes |
| `minGuests` | INTEGER | NO | 1 | Minimum guests required |
| `maxGuests` | INTEGER | NO | 10 | Maximum guests allowed |
| `images` | TEXT[] | YES | NULL | Experience images |
| `includedItems` | TEXT[] | YES | NULL | What's included |
| `requirements` | TEXT[] | YES | NULL | Guest requirements |
| `isActive` | BOOLEAN | NO | TRUE | Active status |
| `venueId` | UUID | NO | - | Foreign key to venues |
| `createdAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Creation timestamp |
| `updatedAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Last update timestamp |

#### Constraints
- **Primary Key**: `id`
- **Foreign Key**: `venueId` REFERENCES `venues(id)` ON DELETE CASCADE
- **Check**: `basePrice > 0`
- **Check**: `minGuests <= maxGuests`

#### Indexes
- `idx_experiences_venue` on `venueId`
- `idx_experiences_type` on `type`
- `idx_experiences_active` on `isActive`

---

### 4. availability

Stores time slot availability for experiences.

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NO | `uuid_generate_v4()` | Primary key |
| `date` | DATE | NO | - | Available date |
| `startTime` | TIME | NO | - | Start time (HH:MM) |
| `endTime` | TIME | NO | - | End time (HH:MM) |
| `priceOverride` | DECIMAL(10,2) | YES | NULL | Override base price |
| `bookedSlots` | INTEGER | NO | 0 | Current bookings |
| `maxSlots` | INTEGER | NO | - | Maximum bookings |
| `status` | ENUM | NO | 'available' | Availability status |
| `notes` | TEXT | YES | NULL | Optional notes |
| `experienceId` | UUID | NO | - | Foreign key to experiences |
| `createdAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Creation timestamp |
| `updatedAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Last update timestamp |

#### Constraints
- **Primary Key**: `id`
- **Foreign Key**: `experienceId` REFERENCES `experiences(id)` ON DELETE CASCADE
- **Unique**: `(experienceId, date, startTime)`
- **Check**: `bookedSlots <= maxSlots`
- **Check**: `maxSlots > 0`

#### Indexes
- `idx_availability_experience` on `experienceId`
- `idx_availability_date` on `date`
- `idx_availability_status` on `status`
- `idx_availability_composite` on `(experienceId, date, startTime)` (unique)

---

### 5. bookings

Stores booking and reservation records.

#### Schema

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NO | `uuid_generate_v4()` | Primary key |
| `guestCount` | INTEGER | NO | - | Number of guests |
| `totalPrice` | DECIMAL(10,2) | NO | - | Total booking price |
| `serviceFee` | DECIMAL(10,2) | YES | NULL | Service fee |
| `taxes` | DECIMAL(10,2) | YES | NULL | Tax amount |
| `status` | ENUM | NO | 'pending' | Booking status |
| `paymentStatus` | ENUM | NO | 'pending' | Payment status |
| `specialRequests` | TEXT | YES | NULL | Guest requests |
| `cancellationReason` | TEXT | YES | NULL | Cancellation reason |
| `confirmedAt` | TIMESTAMP | YES | NULL | Confirmation time |
| `cancelledAt` | TIMESTAMP | YES | NULL | Cancellation time |
| `userId` | UUID | NO | - | Foreign key to users |
| `experienceId` | UUID | NO | - | Foreign key to experiences |
| `availabilityId` | UUID | NO | - | Foreign key to availability |
| `createdAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Creation timestamp |
| `updatedAt` | TIMESTAMP | NO | `CURRENT_TIMESTAMP` | Last update timestamp |

#### Constraints
- **Primary Key**: `id`
- **Foreign Key**: `userId` REFERENCES `users(id)` ON DELETE CASCADE
- **Foreign Key**: `experienceId` REFERENCES `experiences(id)` ON DELETE CASCADE
- **Foreign Key**: `availabilityId` REFERENCES `availability(id)` ON DELETE CASCADE
- **Check**: `guestCount > 0`
- **Check**: `totalPrice >= 0`

#### Indexes
- `idx_bookings_user` on `userId`
- `idx_bookings_experience` on `experienceId`
- `idx_bookings_availability` on `availabilityId`
- `idx_bookings_status` on `status`
- `idx_bookings_payment` on `paymentStatus`
- `idx_bookings_created` on `createdAt`

## 🔗 Relationships

### Relationship Summary

| Parent | Child | Type | Foreign Key | Cascade |
|--------|-------|------|-------------|---------|
| users | venues | One-to-Many | venues.hostId | CASCADE |
| venues | experiences | One-to-Many | experiences.venueId | CASCADE |
| experiences | availability | One-to-Many | availability.experienceId | CASCADE |
| experiences | bookings | One-to-Many | bookings.experienceId | CASCADE |
| availability | bookings | One-to-Many | bookings.availabilityId | CASCADE |
| users | bookings | One-to-Many | bookings.userId | CASCADE |

### Detailed Relationships

#### 1. User → Venue (Host)
- **Type**: One-to-Many
- **Description**: A user with HOST role can own multiple venues
- **Foreign Key**: `venues.hostId → users.id`
- **Cascade**: DELETE CASCADE (deleting a host deletes their venues)

#### 2. Venue → Experience
- **Type**: One-to-Many
- **Description**: A venue can offer multiple experiences
- **Foreign Key**: `experiences.venueId → venues.id`
- **Cascade**: DELETE CASCADE (deleting a venue deletes its experiences)

#### 3. Experience → Availability
- **Type**: One-to-Many
- **Description**: An experience has multiple availability time slots
- **Foreign Key**: `availability.experienceId → experiences.id`
- **Cascade**: DELETE CASCADE (deleting an experience deletes its availability)

#### 4. Experience → Booking
- **Type**: One-to-Many
- **Description**: An experience can have multiple bookings
- **Foreign Key**: `bookings.experienceId → experiences.id`
- **Cascade**: DELETE CASCADE

#### 5. Availability → Booking
- **Type**: One-to-Many
- **Description**: An availability slot can have multiple bookings (up to maxSlots)
- **Foreign Key**: `bookings.availabilityId → availability.id`
- **Cascade**: DELETE CASCADE

#### 6. User → Booking
- **Type**: One-to-Many
- **Description**: A user can make multiple bookings
- **Foreign Key**: `bookings.userId → users.id`
- **Cascade**: DELETE CASCADE

## 🔑 Indexes

### Performance Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Venues
CREATE INDEX idx_venues_host ON venues(hostId);
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_country ON venues(country);
CREATE INDEX idx_venues_active ON venues(isActive);
CREATE INDEX idx_venues_location ON venues(latitude, longitude);

-- Experiences
CREATE INDEX idx_experiences_venue ON experiences(venueId);
CREATE INDEX idx_experiences_type ON experiences(type);
CREATE INDEX idx_experiences_active ON experiences(isActive);

-- Availability
CREATE UNIQUE INDEX idx_availability_composite ON availability(experienceId, date, startTime);
CREATE INDEX idx_availability_experience ON availability(experienceId);
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_availability_status ON availability(status);

-- Bookings
CREATE INDEX idx_bookings_user ON bookings(userId);
CREATE INDEX idx_bookings_experience ON bookings(experienceId);
CREATE INDEX idx_bookings_availability ON bookings(availabilityId);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment ON bookings(paymentStatus);
CREATE INDEX idx_bookings_created ON bookings(createdAt);
```

## ⚠️ Constraints

### Check Constraints

```sql
-- Users
ALTER TABLE users ADD CONSTRAINT chk_rating CHECK (rating IS NULL OR (rating >= 0 AND rating <= 5));

-- Experiences
ALTER TABLE experiences ADD CONSTRAINT chk_base_price CHECK (basePrice > 0);
ALTER TABLE experiences ADD CONSTRAINT chk_guest_count CHECK (minGuests <= maxGuests);

-- Availability
ALTER TABLE availability ADD CONSTRAINT chk_booked_slots CHECK (bookedSlots <= maxSlots);
ALTER TABLE availability ADD CONSTRAINT chk_max_slots CHECK (maxSlots > 0);

-- Bookings
ALTER TABLE bookings ADD CONSTRAINT chk_guest_count CHECK (guestCount > 0);
ALTER TABLE bookings ADD CONSTRAINT chk_total_price CHECK (totalPrice >= 0);
```

## 📑 Enumerations

### UserRole
```typescript
enum UserRole {
  USER = 'user',      // Regular customer
  HOST = 'host',      // Restaurant/venue owner
  STAFF = 'staff'     // Platform administrator
}
```

### UserStatus
```typescript
enum UserStatus {
  ACTIVE = 'active',        // Active account
  INACTIVE = 'inactive',    // Temporarily inactive
  SUSPENDED = 'suspended'   // Suspended by admin
}
```

### ExperienceType
```typescript
enum ExperienceType {
  DINING = 'dining',              // Regular dining
  COOKING_CLASS = 'cooking_class', // Cooking classes
  WINE_TASTING = 'wine_tasting',   // Wine tasting events
  FOOD_TOUR = 'food_tour',         // Food tours
  PRIVATE_CHEF = 'private_chef'    // Private chef service
}
```

### AvailabilityStatus
```typescript
enum AvailabilityStatus {
  AVAILABLE = 'available',  // Open for booking
  BOOKED = 'booked',        // Fully booked
  BLOCKED = 'blocked'       // Blocked by host
}
```

### BookingStatus
```typescript
enum BookingStatus {
  PENDING = 'pending',      // Awaiting confirmation
  CONFIRMED = 'confirmed',  // Confirmed by host
  CANCELLED = 'cancelled',  // Cancelled
  COMPLETED = 'completed',  // Experience completed
  NO_SHOW = 'no_show'       // Guest didn't show up
}
```

### PaymentStatus
```typescript
enum PaymentStatus {
  PENDING = 'pending',    // Payment pending
  PAID = 'paid',          // Payment received
  REFUNDED = 'refunded',  // Payment refunded
  FAILED = 'failed'       // Payment failed
}
```

## 📝 Queries & Examples

### Common Queries

#### 1. Get all venues with availability in the next 7 days

```sql
SELECT DISTINCT v.*, u.firstName, u.lastName
FROM venues v
JOIN users u ON v.hostId = u.id
JOIN experiences e ON e.venueId = v.id
JOIN availability a ON a.experienceId = e.id
WHERE a.date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
  AND a.status = 'available'
  AND v.isActive = true
  AND e.isActive = true
ORDER BY v.name;
```

#### 2. Get user's booking history

```sql
SELECT 
  b.*,
  e.title as experience_title,
  v.name as venue_name,
  a.date,
  a.startTime,
  a.endTime
FROM bookings b
JOIN experiences e ON b.experienceId = e.id
JOIN venues v ON e.venueId = v.id
JOIN availability a ON b.availabilityId = a.id
WHERE b.userId = 'user-uuid-here'
ORDER BY a.date DESC, a.startTime DESC;
```

#### 3. Get host's revenue statistics

```sql
SELECT 
  u.businessName,
  COUNT(b.id) as total_bookings,
  SUM(b.totalPrice) as total_revenue,
  AVG(b.totalPrice) as avg_booking_value,
  COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_bookings
FROM users u
JOIN venues v ON v.hostId = u.id
JOIN experiences e ON e.venueId = v.id
JOIN bookings b ON b.experienceId = e.id
WHERE u.id = 'host-uuid-here'
  AND b.paymentStatus = 'paid'
GROUP BY u.id, u.businessName;
```

#### 4. Check availability for a specific time slot

```sql
SELECT 
  a.*,
  (a.maxSlots - a.bookedSlots) as available_slots,
  e.title,
  e.basePrice,
  COALESCE(a.priceOverride, e.basePrice) as actual_price
FROM availability a
JOIN experiences e ON a.experienceId = e.id
WHERE a.id = 'availability-uuid-here'
  AND a.status = 'available'
  AND (a.maxSlots - a.bookedSlots) >= 2;  -- Check for 2 guests
```

#### 5. Search venues by location and cuisine

```sql
SELECT 
  v.*,
  u.firstName,
  u.lastName,
  u.rating
FROM venues v
JOIN users u ON v.hostId = u.id
WHERE v.city ILIKE '%Barcelona%'
  AND v.cuisineTypes && ARRAY['Italian', 'Mediterranean']
  AND v.isActive = true
ORDER BY u.rating DESC NULLS LAST
LIMIT 10;
```

#### 6. Get upcoming bookings for a host

```sql
SELECT 
  b.*,
  u.firstName || ' ' || u.lastName as guest_name,
  u.email,
  e.title,
  v.name as venue_name,
  a.date,
  a.startTime
FROM bookings b
JOIN users u ON b.userId = u.id
JOIN experiences e ON b.experienceId = e.id
JOIN venues v ON e.venueId = v.id
JOIN availability a ON b.availabilityId = a.id
WHERE v.hostId = 'host-uuid-here'
  AND a.date >= CURRENT_DATE
  AND b.status IN ('pending', 'confirmed')
ORDER BY a.date, a.startTime;
```

### Maintenance Queries

#### Update availability status when fully booked

```sql
UPDATE availability
SET status = 'booked'
WHERE bookedSlots >= maxSlots
  AND status = 'available';
```

#### Clean up old pending bookings

```sql
UPDATE bookings
SET status = 'cancelled',
    cancellationReason = 'Automatic cancellation - payment timeout'
WHERE status = 'pending'
  AND paymentStatus = 'pending'
  AND createdAt < NOW() - INTERVAL '24 hours';
```

#### Calculate and update host ratings

```sql
-- This would typically be done in application code
-- Example for reference:
WITH booking_reviews AS (
  SELECT 
    v.hostId,
    COUNT(b.id) as total_reviews,
    AVG(b.rating) as avg_rating  -- Assuming rating field exists
  FROM bookings b
  JOIN experiences e ON b.experienceId = e.id
  JOIN venues v ON e.venueId = v.id
  WHERE b.status = 'completed'
  GROUP BY v.hostId
)
UPDATE users u
SET 
  rating = br.avg_rating,
  totalReviews = br.total_reviews
FROM booking_reviews br
WHERE u.id = br.hostId;
```

---

## 📊 Database Seeding

The project includes a seed script for development data:

```bash
cd backend
pnpm run seed
```

This creates:
- 2 test users (1 HOST, 1 USER)
- 2 venues
- 4 experiences
- Multiple availability slots
- Sample bookings

---

## 🔒 Security Considerations

1. **Password Storage**: All passwords are hashed using bcrypt
2. **SQL Injection**: Protected by TypeORM parameterized queries
3. **Foreign Key Constraints**: Maintain referential integrity
4. **Cascade Deletes**: Configured appropriately to prevent orphaned records
5. **Indexes**: Optimized for common query patterns
6. **Validation**: Check constraints ensure data integrity

---

## 📈 Performance Tips

1. **Use Indexes**: All foreign keys and frequently queried fields are indexed
2. **Limit Results**: Always use pagination for list queries
3. **Select Specific Fields**: Avoid `SELECT *` in production
4. **Use Eager Loading**: Minimize N+1 queries with TypeORM relations
5. **Connection Pooling**: Configure appropriate pool size for your workload
6. **Query Analysis**: Use `EXPLAIN ANALYZE` for slow queries

---

For API usage, see [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md)  
For backend setup, see [backend/README.md](./backend/README.md)  
For frontend setup, see [frontend/README.md](./frontend/README.md)
