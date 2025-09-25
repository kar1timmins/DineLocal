# DineLocal 🍽️

A modern full-stack application for local dining discovery and restaurant management, built with Next.js, NestJS, and MySQL.

## ✨ Features

- **User Management**: Role-based authentication (User, Host, Staff)
- **Easy Role Switching**: Seamlessly switch between customer and restaurant owner roles
- **Restaurant Discovery**: Browse and discover local restaurants
- **Host Dashboard**: Manage restaurant listings and operations
- **Modern UI**: Beautiful interface built with Tailwind CSS
- **API-First**: RESTful API built with NestJS and TypeORM
- **Docker Ready**: Complete containerization for easy deployment

## 🚀 Quick Start with Docker

The easiest way to run DineLocal is using Docker:

```bash
# Clone the repository
git clone <repository-url>
cd dinelocal

# Start all services (production)
docker-compose up --build

# Or for development with hot reloading
docker-compose -f docker-compose.dev.yml up --build
```

Then visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🏗️ Manual Setup (Alternative)

If you prefer to run services individually:

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- pnpm

### Backend Setup
```bash
cd backend
pnpm install
# Set up MySQL database
# Update .env with database credentials
pnpm run start:dev
```

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm run dev
```

## 📋 API Documentation

See `backend/API_DOCUMENTATION.md` for complete API reference.

### Key Endpoints
- `POST /users` - Create user
- `PATCH /users/:id/role` - Switch user/host roles
- `GET /users/hosts` - Get all restaurant hosts

## 🗄️ Database Schema

The application uses a single `users` table with role-based fields:

- **Users**: Basic user information
- **Hosts**: Extended with business details (when role = 'host')
- **Staff**: Administrative users

## 🐳 Docker Services

- **Frontend**: Next.js app with Tailwind CSS
- **Backend**: NestJS API with TypeORM
- **Database**: MySQL 8.0 with automatic initialization

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start development environment
docker-compose -f docker-compose.dev.yml up --build

# Run tests
docker-compose exec backend pnpm run test
docker-compose exec frontend pnpm run test
```

## 📚 Documentation

- [Docker Setup Guide](DOCKER_README.md)
- [Backend API Documentation](backend/API_DOCUMENTATION.md)
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