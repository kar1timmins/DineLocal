# DineLocal - Docker Setup Guide

This guide explains how to run the entire DineLocal application using Docker and Docker Compose.

## 🏗️ Architecture

The application consists of three main services:

- **Frontend**: Next.js application (Port 3000)
- **Backend**: NestJS API server (Port 3001)
- **Database**: MySQL 8.0 database (Port 3306)

## 🚀 Quick Start

### Prerequisites

- Docker Engine
- Docker Compose

### Production Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd dinelocal
   ```

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:3306

### Development Setup

For development with hot reloading:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## 📋 Available Commands

### Production

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
```

### Development

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# Rebuild development environment
docker-compose -f docker-compose.dev.yml up --build
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

#### Backend (.env)
```env
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=dinelocal_user
DB_PASSWORD=dinelocal_pass
DB_NAME=dinelocal
NODE_ENV=production
```

#### Frontend (Environment Variables)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=production
```

### Database

- **Host**: mysql (Docker service name)
- **Port**: 3306
- **Database**: dinelocal
- **Username**: dinelocal_user
- **Password**: dinelocal_pass
- **Root Password**: rootpassword

## 🗄️ Database Management

### Access MySQL Container

```bash
# Production
docker-compose exec mysql mysql -u dinelocal_user -p dinelocal

# Development
docker-compose -f docker-compose.dev.yml exec mysql mysql -u dinelocal_user -p dinelocal
```

### Database Initialization

The database is automatically initialized with:
- `dinelocal` database
- `dinelocal_user` with full privileges
- Initial schema (created by TypeORM)

## 🔍 Debugging

### View Container Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql
```

### Access Running Containers

```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# MySQL shell
docker-compose exec mysql mysql -u dinelocal_user -p dinelocal
```

### Check Container Health

```bash
docker-compose ps
```

## 🧪 Testing

### Run Backend Tests

```bash
docker-compose exec backend pnpm run test
```

### Run Frontend Tests

```bash
docker-compose exec frontend pnpm run test
```

## 📁 Project Structure

```
dinelocal/
├── backend/                 # NestJS API server
│   ├── Dockerfile          # Production build
│   ├── Dockerfile.dev      # Development build
│   ├── .dockerignore       # Docker ignore rules
│   └── src/                # Source code
├── frontend/               # Next.js application
│   ├── Dockerfile          # Production build
│   ├── Dockerfile.dev      # Development build
│   ├── .dockerignore       # Docker ignore rules
│   └── src/                # Source code
├── docker/
│   └── mysql/
│       └── init.sql        # Database initialization
├── docker-compose.yml       # Production setup
├── docker-compose.dev.yml   # Development setup
└── README.md
```

## 🔒 Security Notes

- Database passwords are set for development/demo purposes
- Change passwords in production
- Use Docker secrets for sensitive data in production
- The MySQL root password should be changed in production

## 🚀 Deployment

### Production Deployment

1. Update environment variables for production
2. Use Docker secrets for sensitive data
3. Configure proper networking and volumes
4. Set up monitoring and logging
5. Configure reverse proxy (nginx) for production

### Example Production docker-compose.yml

```yaml
version: '3.8'
services:
  # Add nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

  # ... rest of services
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, 3306 are available
2. **Database connection**: Wait for MySQL health check to pass
3. **Build failures**: Clear Docker cache with `docker system prune`
4. **Permission issues**: Check file permissions in mounted volumes

### Reset Everything

```bash
# Stop and remove all containers
docker-compose down -v

# Remove images
docker-compose down --rmi all

# Clean up
docker system prune -f

# Restart
docker-compose up --build
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)