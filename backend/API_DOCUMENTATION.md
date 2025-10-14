# DineLocal Backend API Documentation 📚

Complete RESTful API documentation for the DineLocal platform. This API powers dining experience discovery, venue management, booking systems, and user interactions.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Base URL](#base-url)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Users](#users-api)
  - [Venues](#venues-api)
  - [Experiences](#experiences-api)
  - [Availability](#availability-api)
  - [Bookings](#bookings-api)
- [Data Models](#data-models)
- [Query Parameters](#query-parameters)

## 🔍 Overview

The DineLocal API is a RESTful API built with NestJS and TypeORM. It provides endpoints for:

- User management and authentication
- Venue (restaurant) management
- Dining experience creation and management
- Availability and time slot management
- Booking and reservation system

## 🔐 Authentication

> **Note**: Authentication is currently in development. All endpoints are publicly accessible for development purposes.

**Planned Implementation:**
- JWT-based authentication
- Bearer token in Authorization header
- Role-based access control (USER, HOST, STAFF)

```http
Authorization: Bearer <your-jwt-token>
```

## 🌐 Base URL

```
Development: http://localhost:3001
Production: https://api.yourdomain.com
```

## 📦 Response Format

### Success Response

```json
{
  "id": "uuid",
  "field1": "value1",
  "field2": "value2",
  "createdAt": "2025-10-14T10:30:00.000Z",
  "updatedAt": "2025-10-14T10:30:00.000Z"
}
```

### List Response with Pagination

```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## ⚠️ Error Handling

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "Error message description",
  "error": "Bad Request"
}
```

### HTTP Status Codes

- `200` - OK: Successful request
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `500` - Internal Server Error: Server error

---

# API Endpoints

## Users API

### Create User

Create a new user account.

```http
POST /users
```

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user"
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Unique email address |
| password | string | Yes | User password (min 6 chars) |
| firstName | string | Yes | First name |
| lastName | string | Yes | Last name |
| phone | string | No | Contact phone number |
| role | string | No | user, host, or staff (default: user) |

**Response: 201 Created**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user",
  "status": "active",
  "createdAt": "2025-10-14T10:30:00.000Z",
  "updatedAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get All Users

Retrieve a list of all users with optional filtering.

```http
GET /users?role=host&status=active&page=1&limit=10
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| role | string | Filter by role (user, host, staff) |
| status | string | Filter by status (active, inactive, suspended) |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "host@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "host",
      "businessName": "Jane's Restaurant",
      "rating": 4.5,
      "totalReviews": 42
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### Get User by ID

Retrieve a specific user by their ID.

```http
GET /users/:id
```

**Response: 200 OK**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "role": "user",
  "status": "active",
  "profileImage": "https://example.com/profile.jpg",
  "bio": "Food enthusiast and traveler",
  "preferences": {
    "dietaryRestrictions": ["vegetarian"],
    "favoritesCuisines": ["Italian", "Japanese"]
  },
  "createdAt": "2025-10-14T10:30:00.000Z",
  "updatedAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Update User

Update user information.

```http
PATCH /users/:id
```

**Request Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "Updated bio",
  "profileImage": "https://example.com/new-profile.jpg"
}
```

**Response: 200 OK**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "Updated bio",
  "updatedAt": "2025-10-14T11:00:00.000Z"
}
```

---

### Switch User Role

Switch between USER and HOST roles.

```http
PATCH /users/:id/role
```

**Request Body:**

```json
{
  "newRole": "host",
  "businessName": "My Restaurant",
  "businessDescription": "A cozy family restaurant",
  "businessAddress": "123 Main Street, City",
  "businessPhone": "+1234567890"
}
```

**Note:** When switching to HOST, business fields are required.

**Response: 200 OK**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "role": "host",
  "businessName": "My Restaurant",
  "businessDescription": "A cozy family restaurant",
  "businessAddress": "123 Main Street, City",
  "businessPhone": "+1234567890"
}
```

---

### Get All Hosts

Retrieve all users with HOST role.

```http
GET /users/hosts
```

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "host-uuid-1",
      "email": "host1@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "host",
      "businessName": "Jane's Restaurant",
      "businessDescription": "Modern Italian cuisine",
      "rating": 4.5,
      "totalReviews": 42
    }
  ],
  "meta": {
    "total": 1
  }
}
```

---

### Delete User

Delete a user account.

```http
DELETE /users/:id
```

**Response: 200 OK**

```json
{
  "message": "User deleted successfully"
}
```

---

## Venues API

### Create Venue

Create a new venue (restaurant).

```http
POST /venues
```

**Request Body:**

```json
{
  "name": "Casa de Sabores",
  "description": "Authentic Mexican home cooking experience",
  "address": "123 Main Street",
  "city": "Barcelona",
  "country": "Spain",
  "postalCode": "08001",
  "latitude": 41.3851,
  "longitude": 2.1734,
  "images": [
    "https://example.com/venue1.jpg",
    "https://example.com/venue2.jpg"
  ],
  "amenities": ["WiFi", "Parking", "Wheelchair Access"],
  "cuisineTypes": ["Mexican", "Traditional", "Vegetarian Options"],
  "capacity": 50,
  "hostId": "host-uuid"
}
```

**Response: 201 Created**

```json
{
  "id": "venue-uuid",
  "name": "Casa de Sabores",
  "description": "Authentic Mexican home cooking experience",
  "address": "123 Main Street",
  "city": "Barcelona",
  "country": "Spain",
  "latitude": 41.3851,
  "longitude": 2.1734,
  "cuisineTypes": ["Mexican", "Traditional", "Vegetarian Options"],
  "isActive": true,
  "hostId": "host-uuid",
  "createdAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get All Venues

List all venues with filtering options.

```http
GET /venues?city=Barcelona&country=Spain&cuisineTypes=Italian,Mexican&isActive=true&page=1&limit=10
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| city | string | Filter by city |
| country | string | Filter by country |
| cuisineTypes | string | Comma-separated cuisine types |
| isActive | boolean | Filter by active status |
| page | number | Page number |
| limit | number | Items per page |

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "venue-uuid",
      "name": "Casa de Sabores",
      "description": "Authentic Mexican home cooking",
      "city": "Barcelona",
      "country": "Spain",
      "cuisineTypes": ["Mexican", "Traditional"],
      "capacity": 50,
      "host": {
        "id": "host-uuid",
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### Get Venue by ID

Retrieve detailed information about a specific venue.

```http
GET /venues/:id
```

**Response: 200 OK**

```json
{
  "id": "venue-uuid",
  "name": "Casa de Sabores",
  "description": "Authentic Mexican home cooking experience",
  "address": "123 Main Street",
  "city": "Barcelona",
  "country": "Spain",
  "postalCode": "08001",
  "latitude": 41.3851,
  "longitude": 2.1734,
  "images": ["https://example.com/venue1.jpg"],
  "amenities": ["WiFi", "Parking"],
  "cuisineTypes": ["Mexican", "Traditional"],
  "capacity": 50,
  "isActive": true,
  "host": {
    "id": "host-uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com"
  },
  "createdAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get Venues by Host

Get all venues owned by a specific host.

```http
GET /venues/host/:hostId
```

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "venue-uuid-1",
      "name": "Casa de Sabores",
      "city": "Barcelona",
      "isActive": true
    },
    {
      "id": "venue-uuid-2",
      "name": "Tokyo Night Kitchen",
      "city": "Tokyo",
      "isActive": true
    }
  ]
}
```

---

### Get Venues with Upcoming Availability

Get venues that have upcoming availability.

```http
GET /venues/with-availability
```

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "venue-uuid",
      "name": "Casa de Sabores",
      "city": "Barcelona",
      "hasAvailability": true,
      "nextAvailableDate": "2025-10-20"
    }
  ]
}
```

---

### Update Venue

Update venue information.

```http
PATCH /venues/:id
```

**Request Body:**

```json
{
  "description": "Updated description",
  "capacity": 60,
  "amenities": ["WiFi", "Parking", "Outdoor Seating"]
}
```

**Response: 200 OK**

---

### Delete Venue

Delete a venue.

```http
DELETE /venues/:id
```

**Response: 200 OK**

```json
{
  "message": "Venue deleted successfully"
}
```

---

## Experiences API

### Create Experience

Create a new dining experience.

```http
POST /experiences
```

**Request Body:**

```json
{
  "title": "Traditional Mexican Dinner",
  "description": "3-course authentic Mexican meal",
  "type": "dining",
  "basePrice": 45.00,
  "duration": 120,
  "minGuests": 2,
  "maxGuests": 8,
  "images": ["https://example.com/experience1.jpg"],
  "includedItems": ["Appetizer", "Main Course", "Dessert", "Drinks"],
  "requirements": ["No severe allergies"],
  "venueId": "venue-uuid"
}
```

**Experience Types:**
- `dining` - Regular dining experience
- `cooking_class` - Cooking class
- `wine_tasting` - Wine tasting event
- `food_tour` - Food tour
- `private_chef` - Private chef service

**Response: 201 Created**

```json
{
  "id": "experience-uuid",
  "title": "Traditional Mexican Dinner",
  "type": "dining",
  "basePrice": 45.00,
  "duration": 120,
  "venueId": "venue-uuid",
  "isActive": true,
  "createdAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get All Experiences

List experiences with filtering.

```http
GET /experiences?venueId=venue-uuid&type=dining&isActive=true&page=1&limit=10
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| venueId | string | Filter by venue |
| type | string | Filter by experience type |
| isActive | boolean | Filter by active status |
| page | number | Page number |
| limit | number | Items per page |

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "experience-uuid",
      "title": "Traditional Mexican Dinner",
      "type": "dining",
      "basePrice": 45.00,
      "duration": 120,
      "minGuests": 2,
      "maxGuests": 8,
      "venue": {
        "id": "venue-uuid",
        "name": "Casa de Sabores"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

### Get Experience by ID

Get detailed experience information.

```http
GET /experiences/:id
```

**Response: 200 OK**

```json
{
  "id": "experience-uuid",
  "title": "Traditional Mexican Dinner",
  "description": "3-course authentic Mexican meal",
  "type": "dining",
  "basePrice": 45.00,
  "duration": 120,
  "minGuests": 2,
  "maxGuests": 8,
  "images": ["https://example.com/experience1.jpg"],
  "includedItems": ["Appetizer", "Main Course", "Dessert"],
  "requirements": ["No severe allergies"],
  "isActive": true,
  "venue": {
    "id": "venue-uuid",
    "name": "Casa de Sabores",
    "city": "Barcelona"
  },
  "createdAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get Experiences by Venue

Get all experiences for a specific venue.

```http
GET /experiences/venue/:venueId
```

---

### Get Experiences with Availability

Get experiences that have availability in a date range.

```http
GET /experiences/with-availability?startDate=2025-10-20&endDate=2025-10-27&venueId=venue-uuid
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startDate | string | Yes | Start date (YYYY-MM-DD) |
| endDate | string | Yes | End date (YYYY-MM-DD) |
| venueId | string | No | Filter by venue |

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "experience-uuid",
      "title": "Traditional Mexican Dinner",
      "basePrice": 45.00,
      "availableSlots": 12,
      "nextAvailableDate": "2025-10-20"
    }
  ]
}
```

---

### Update Experience

Update experience details.

```http
PATCH /experiences/:id
```

---

### Delete Experience

Delete an experience.

```http
DELETE /experiences/:id
```

---

## Availability API

### Create Availability Slot

Create a single availability time slot.

```http
POST /availability
```

**Request Body:**

```json
{
  "date": "2025-10-20",
  "startTime": "18:00",
  "endTime": "20:00",
  "maxSlots": 4,
  "priceOverride": 55.00,
  "notes": "Special menu for October",
  "experienceId": "experience-uuid"
}
```

**Response: 201 Created**

```json
{
  "id": "availability-uuid",
  "date": "2025-10-20",
  "startTime": "18:00",
  "endTime": "20:00",
  "bookedSlots": 0,
  "maxSlots": 4,
  "status": "available",
  "priceOverride": 55.00,
  "experienceId": "experience-uuid"
}
```

---

### Bulk Create Availability

Create multiple availability slots at once.

```http
POST /availability/bulk
```

**Request Body:**

```json
{
  "experienceId": "experience-uuid",
  "startDate": "2025-10-20",
  "endDate": "2025-10-27",
  "timeSlots": [
    {
      "startTime": "18:00",
      "endTime": "20:00",
      "maxSlots": 4
    },
    {
      "startTime": "20:30",
      "endTime": "22:30",
      "maxSlots": 4
    }
  ],
  "daysOfWeek": [1, 2, 3, 4, 5]
}
```

**Response: 201 Created**

```json
{
  "created": 10,
  "slots": [
    {
      "id": "availability-uuid-1",
      "date": "2025-10-20",
      "startTime": "18:00"
    }
  ]
}
```

---

### Get All Availability

List availability slots with filtering.

```http
GET /availability?experienceId=exp-uuid&startDate=2025-10-20&endDate=2025-10-27&status=available&page=1&limit=10
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| experienceId | string | Filter by experience |
| startDate | string | Filter from date |
| endDate | string | Filter to date |
| status | string | available, booked, blocked |
| page | number | Page number |
| limit | number | Items per page |

---

### Get Availability for Experience

Get all availability for a specific experience.

```http
GET /availability/experience/:experienceId?startDate=2025-10-20&endDate=2025-10-27
```

**Response: 200 OK**

```json
{
  "data": [
    {
      "id": "availability-uuid",
      "date": "2025-10-20",
      "startTime": "18:00",
      "endTime": "20:00",
      "bookedSlots": 1,
      "maxSlots": 4,
      "status": "available",
      "availableSlots": 3
    }
  ]
}
```

---

### Check Availability

Check if a specific slot has availability for guest count.

```http
GET /availability/:id/check/:guestCount
```

**Example:**
```http
GET /availability/slot-uuid/check/4
```

**Response: 200 OK**

```json
{
  "available": true,
  "availableSlots": 3,
  "requestedSlots": 1,
  "totalPrice": 180.00,
  "pricePerPerson": 45.00
}
```

---

### Update Availability

Update availability slot details.

```http
PATCH /availability/:id
```

---

### Delete Availability

Delete an availability slot.

```http
DELETE /availability/:id
```

---

## Bookings API

### Create Booking

Create a new booking.

```http
POST /bookings
```

**Request Body:**

```json
{
  "experienceId": "experience-uuid",
  "availabilityId": "availability-uuid",
  "guestCount": 4,
  "specialRequests": "Vegetarian options needed"
}
```

**Response: 201 Created**

```json
{
  "id": "booking-uuid",
  "guestCount": 4,
  "totalPrice": 180.00,
  "serviceFee": 18.00,
  "taxes": 16.20,
  "status": "pending",
  "paymentStatus": "pending",
  "userId": "user-uuid",
  "experienceId": "experience-uuid",
  "availabilityId": "availability-uuid",
  "createdAt": "2025-10-14T10:30:00.000Z"
}
```

---

### Get All Bookings

List bookings with filtering.

```http
GET /bookings?status=confirmed&paymentStatus=paid&page=1&limit=10
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | pending, confirmed, cancelled, completed, no_show |
| paymentStatus | string | pending, paid, refunded, failed |
| userId | string | Filter by user |
| hostId | string | Filter by host |
| page | number | Page number |
| limit | number | Items per page |

---

### Get Booking by ID

Get detailed booking information.

```http
GET /bookings/:id
```

**Response: 200 OK**

```json
{
  "id": "booking-uuid",
  "guestCount": 4,
  "totalPrice": 180.00,
  "serviceFee": 18.00,
  "taxes": 16.20,
  "status": "confirmed",
  "paymentStatus": "paid",
  "specialRequests": "Vegetarian options needed",
  "confirmedAt": "2025-10-14T11:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "experience": {
    "id": "experience-uuid",
    "title": "Traditional Mexican Dinner",
    "venue": {
      "name": "Casa de Sabores"
    }
  },
  "availability": {
    "date": "2025-10-20",
    "startTime": "18:00",
    "endTime": "20:00"
  }
}
```

---

### Get User's Bookings

Get all bookings for a specific user.

```http
GET /bookings/user/:userId
```

---

### Get Host's Bookings

Get all bookings for a host's experiences.

```http
GET /bookings/host/:hostId
```

---

### Get Booking Statistics

Get booking statistics for a host.

```http
GET /bookings/stats?hostId=host-uuid
```

**Response: 200 OK**

```json
{
  "totalBookings": 142,
  "confirmedBookings": 120,
  "pendingBookings": 15,
  "cancelledBookings": 7,
  "totalRevenue": 12450.00,
  "averageBookingValue": 87.68
}
```

---

### Confirm Booking

Confirm a pending booking.

```http
PATCH /bookings/:id/confirm
```

**Response: 200 OK**

```json
{
  "id": "booking-uuid",
  "status": "confirmed",
  "confirmedAt": "2025-10-14T11:00:00.000Z"
}
```

---

### Complete Booking

Mark a booking as completed.

```http
PATCH /bookings/:id/complete
```

---

### Cancel Booking

Cancel a booking.

```http
PATCH /bookings/:id/cancel
```

**Request Body:**

```json
{
  "reason": "Change of plans"
}
```

**Response: 200 OK**

```json
{
  "id": "booking-uuid",
  "status": "cancelled",
  "cancellationReason": "Change of plans",
  "cancelledAt": "2025-10-14T11:30:00.000Z"
}
```

---

## Data Models

### User

```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'user' | 'host' | 'staff';
  status: 'active' | 'inactive' | 'suspended';
  profileImage?: string;
  bio?: string;
  preferences?: object;
  // Host fields
  businessName?: string;
  businessDescription?: string;
  businessAddress?: string;
  businessPhone?: string;
  rating?: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Venue

```typescript
{
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
  amenities?: string[];
  cuisineTypes?: string[];
  capacity: number;
  isActive: boolean;
  hostId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Experience

```typescript
{
  id: string;
  title: string;
  description: string;
  type: 'dining' | 'cooking_class' | 'wine_tasting' | 'food_tour' | 'private_chef';
  basePrice: number;
  duration: number;
  minGuests: number;
  maxGuests: number;
  images?: string[];
  includedItems?: string[];
  requirements?: string[];
  isActive: boolean;
  venueId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Availability

```typescript
{
  id: string;
  date: Date;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  priceOverride?: number;
  bookedSlots: number;
  maxSlots: number;
  status: 'available' | 'booked' | 'blocked';
  notes?: string;
  experienceId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking

```typescript
{
  id: string;
  guestCount: number;
  totalPrice: number;
  serviceFee?: number;
  taxes?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  specialRequests?: string;
  cancellationReason?: string;
  confirmedAt?: Date;
  cancelledAt?: Date;
  userId: string;
  experienceId: string;
  availabilityId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Query Parameters

### Pagination

All list endpoints support pagination:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### Filtering

Most endpoints support filtering by various fields. See individual endpoint documentation.

### Sorting

Coming soon: Sort parameters for list endpoints.

---

For more information:
- [Backend README](./README.md)
- [Database Documentation](../DATABASE.md)
- [Frontend Documentation](../frontend/README.md)