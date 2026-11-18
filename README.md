# Taskboard - CRUD App

A full stack task manager built with Node.js, React and PostgreSQL.

**Live demo:** https://crudapp-black.vercel.app
**API:** https://crudapp-xp2l.onrender.com/api

> The backend runs on Render's free plan and sleeps when idle, so the first request can take up to a minute.

- **Backend:** Node.js, Express, Prisma ORM, JWT authentication (MVC architecture)
- **Frontend:** React, Vite, React Router (atomic component design, page segregation)
- **Database:** PostgreSQL (Prisma Postgres)
- **Deployment:** Vercel (frontend), Render (backend), Prisma Postgres (database)

## Project structure

```
backend/
  prisma/              schema and migrations
  src/
    config/            environment and database client
    models/            data access (Model)
    controllers/       request handling and validation (Controller)
    routes/            API endpoints
    middleware/        auth guard and error handling
    app.js             express app
    server.js          entry point

frontend/
  src/
    api/               HTTP client and API calls
    components/
      atoms/           Button, Input, Select, Textarea, Label, Badge, Heading, Text, Spinner
      molecules/       FormField, Alert, TaskFilters, StatusBadge, EmptyState
      organisms/       Navbar, LoginForm, RegisterForm, TaskForm, TaskCard, TaskList, ConfirmDialog
      templates/       AuthTemplate, AppTemplate
    pages/             Login, Register, Tasks, TaskDetail, CreateTask, EditTask, NotFound
    context/           authentication state
    routes/            protected and guest route guards
    hooks/             data fetching hooks
```

## API

| Method | Endpoint             | Auth | Description          |
| ------ | -------------------- | ---- | -------------------- |
| POST   | /api/auth/register   | No   | Create an account    |
| POST   | /api/auth/login      | No   | Log in               |
| GET    | /api/auth/me         | Yes  | Current user         |
| GET    | /api/tasks           | Yes  | List tasks (`?status=&search=`) |
| POST   | /api/tasks           | Yes  | Create a task        |
| GET    | /api/tasks/:id       | Yes  | Get a task           |
| PUT    | /api/tasks/:id       | Yes  | Update a task        |
| DELETE | /api/tasks/:id       | Yes  | Delete a task        |

Protected routes expect an `Authorization: Bearer <token>` header.

## Running locally

Requirements: Node.js 20+ and a PostgreSQL database.

A local database can be started with Docker:

```bash
docker run -d --name crudapp-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=crudapp -p 5544:5432 postgres:16-alpine
```

Then set `DATABASE_URL="postgresql://postgres:postgres@localhost:5544/crudapp"` in `backend/.env`.

```bash
# backend
cd backend
cp .env.example .env        # fill in DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate deploy
npm run dev                 # http://localhost:5000

# frontend
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

## Deployment

### 1. Database - Prisma Postgres

1. Go to [console.prisma.io](https://console.prisma.io), create a project and a Postgres database.
2. Copy the direct connection string (`postgres://...@db.prisma.io:5432/...`).

### 2. Backend - Render

1. New > Web Service, connect this repository.
2. Root directory: `backend`
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Environment variables:
   - `DATABASE_URL` - the Prisma Postgres connection string
   - `JWT_SECRET` - a long random string
   - `CLIENT_URL` - the Vercel URL of the frontend (e.g. `https://crudapp.vercel.app`)

The build step runs the migrations, so tables are created automatically.

### 3. Frontend - Vercel

1. New Project, import this repository.
2. Root directory: `frontend` (framework preset: Vite)
3. Environment variable: `VITE_API_URL` - the Render URL plus `/api` (e.g. `https://crudapp-backend.onrender.com/api`)
4. Deploy, then make sure `CLIENT_URL` on Render matches the Vercel domain.
