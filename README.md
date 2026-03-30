# Job Application Tracker

A full-stack job application tracker with:
- Public job seeker flow: browse jobs -> job details -> apply
- Admin flow: login with JWT -> create new jobs
- React + Vite + Tailwind frontend
- Express + PostgreSQL backend
- Docker Compose for DB + backend + frontend

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, Vite
- Backend: Node.js, Express, pg, JWT
- Database: PostgreSQL
- Runtime tooling: pnpm

## Prerequisites
- Node.js 20+
- pnpm 9+
- Docker + Docker Compose (for containerized run)

## Environment Setup
1. Backend env:
```bash
cp backend/.env.example backend/.env
```
2. Frontend env:
```bash
cp frontend/.env.example frontend/.env
```

Update values as needed, especially:
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `DATABASE_URL`
- `VITE_API_URL`

## Local Development
Install dependencies:
```bash
pnpm --dir backend install
pnpm --dir frontend install
```

Run backend and frontend in separate terminals:
```bash
pnpm --dir backend dev
pnpm --dir frontend dev
```

Or use the helper script (runs both):
```bash
./scripts/dev.sh
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Docker Run
Build and start all services:
```bash
docker compose up --build
```

App URLs in Docker:
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`
- Postgres: `localhost:5432`

Stop services:
```bash
docker compose down
```

## Admin Login
Admin authentication is environment-based.
Set these in `backend/.env`:
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

Then login from frontend at `/login` and create jobs at `/admin/create-job`.

## API Endpoints
| Method | Path | Access | Description |
|---|---|---|---|
| GET | `/health` | Public | Health check |
| POST | `/auth/login` | Public | Admin login, returns `{ token }` |
| GET | `/jobs` | Public | List jobs |
| GET | `/jobs/:id` | Public | Job details |
| POST | `/jobs` | Admin (JWT) | Create job |
| POST | `/applications` | Public | Submit application |
| GET | `/applications` | Admin (JWT) | List all applications |

## Notes
- `POST /jobs` and `GET /applications` require `Authorization: Bearer <token>`.
- The DB is seeded with two sample jobs from `backend/db/init.sql`.
