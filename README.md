# EN2H - Booking Management API

Backend REST API built with NestJS for the EN2H Software Engineer Intern Technical Assignment.

---

## Features

### Authentication

- JWT Authentication
- Register
- Login
- Protected Routes

### Service Management

- Create Service
- Get All Services
- Get Service by ID
- Update Service
- Delete Service

### Booking Management

- Create Booking
- Get All Bookings
- Get Booking by ID
- Update Booking Status
- Cancel Booking

### Business Rules

- Booking must belong to an existing service
- Booking date cannot be in the past
- Duplicate bookings are prevented
- Cancelled bookings cannot be marked as completed
- Only authenticated users can manage services
- Customers can create bookings without authentication

### Bonus Features

- Swagger API Documentation
- Pagination
- Search Bookings
- Filter Bookings by Status
- Validation using class-validator
- Docker Support
- GitHub Actions CI/CD

---

# Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger
- Docker

---

# Project Structure

```
src
│
├── auth
├── bookings
├── services
├── prisma
├── common
└── main.ts
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/EN2H-NestJS-Assignment.git

cd EN2H-NestJS-Assignment
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file using `.env.example`

Example

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/en2h_booking

JWT_SECRET=your-secret-key

JWT_EXPIRES_IN=1d

PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=en2h_booking
```

---

# Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

(Optional)

Open Prisma Studio

```bash
npx prisma studio
```

---

# Running the Application

Development

```bash
npm run start:dev
```

Production

```bash
npm run build

npm run start:prod
```

---

# Running with Docker

Build containers

```bash
docker compose up --build
```

---

# API Documentation

Swagger UI

```
http://localhost:3000/api/docs
```

---

# Pagination

Example

```
GET /api/bookings?page=1&limit=10
```

---

# Search

Example

```
GET /api/bookings?search=milinda
```

---

# Filter

Example

```
GET /api/bookings?status=PENDING
```

---

# Authentication

Protected endpoints require

```
Authorization: Bearer <JWT_TOKEN>
```

---

# Assumptions

- One booking belongs to one service.
- Multiple bookings are allowed for different time slots.
- Duplicate bookings for the same service, date and time are prevented.
- Customers are allowed to create bookings without authentication.
- Service management requires authentication.

---

# Future Improvements

- Refresh Token Authentication
- Unit Testing
- Role-based Authorization
- Email Notifications
- Booking Availability Calendar
- Rate Limiting
- Soft Delete Support

---

# CI/CD

GitHub Actions automatically

- Install dependencies
- Generate Prisma Client
- Build project
- Run lint
- Run tests

on every push and pull request.

---

# Author

Milinda Senarath