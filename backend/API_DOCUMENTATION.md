# DineLocal Backend API Documentation

A NestJS backend for the DineLocal application with user management, host management, and staff administration.

## Features

- **User Management**: Create, read, update, delete users
- **Role-Based Access**: Support for USER, HOST, and STAFF roles
- **Easy Role Switching**: Users can switch between USER and HOST roles
- **Host Management**: Specialized fields for restaurant/business owners
- **Staff Administration**: Administrative user management

## Database Schema

### Users Table
- `id`: UUID primary key
- `email`: Unique email address
- `password`: Hashed password
- `firstName`: User's first name
- `lastName`: User's last name
- `phone`: Optional phone number
- `role`: Enum (USER, HOST, STAFF)
- `status`: Enum (ACTIVE, INACTIVE, SUSPENDED)
- `profileImage`: Optional profile image URL
- `bio`: Optional user biography
- `preferences`: JSON field for user preferences

### Host-Specific Fields (when role = HOST)
- `businessName`: Restaurant/business name
- `businessDescription`: Business description
- `businessAddress`: Business address
- `businessPhone`: Business phone number
- `rating`: Average rating (0-5)
- `totalReviews`: Number of reviews

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Database Setup:**
   - Create a MySQL database named `dinelocal`
   - Update `.env` file with your database credentials

3. **Run the application:**
   ```bash
   # Development
   pnpm run start:dev

   # Production
   pnpm run build
   pnpm run start:prod
   ```

## API Endpoints

### Users

#### Create User
```http
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"
}
```

#### Get All Users
```http
GET /users
GET /users?role=host
```

#### Get Specific User
```http
GET /users/:id
```

#### Update User
```http
PATCH /users/:id
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

#### Switch User Role
```http
PATCH /users/:id/role
Content-Type: application/json

{
  "newRole": "host"
}
```

#### Get Hosts Only
```http
GET /users/hosts
```

#### Get Staff Only
```http
GET /users/staff
```

#### Activate/Deactivate User
```http
PATCH /users/:id/activate
PATCH /users/:id/deactivate
PATCH /users/:id/suspend
```

#### Delete User
```http
DELETE /users/:id
```

## Role Switching

Users can easily switch between USER and HOST roles:

```javascript
// Switch from USER to HOST
PATCH /users/user-id/role
{
  "newRole": "host"
}

// Switch from HOST to USER
PATCH /users/user-id/role
{
  "newRole": "user"
}
```

**Note:** Switching to/from STAFF role requires administrative privileges and cannot be done through the role switching endpoint.

## Environment Variables

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=dinelocal
NODE_ENV=development
```

## Development

```bash
# Run tests
pnpm run test

# Run e2e tests
pnpm run test:e2e

# Run linter
pnpm run lint

# Format code
pnpm run format
```