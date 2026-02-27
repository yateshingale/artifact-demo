# Production-Ready Monolithic Web App (React + Express + MongoDB)

This repository now contains a **single deployable application stack** with separated frontend and backend codebases while remaining operationally monolithic.

## Architecture

- `frontend/` React (Vite) SPA with auth flow and item CRUD.
- `backend/` Node.js + Express API using a clean architecture-inspired layering:
  - `routes` (transport)
  - `controllers` (orchestration)
  - `usecases` (business logic)
  - `repositories` (data access)
  - `models` (MongoDB persistence)
- JWT-based auth for protected APIs.
- Joi validation middleware on request payloads.
- Centralized error middleware and structured logging (Pino).
- Health endpoints:
  - Backend: `/health/live`, `/health/ready`
  - Frontend container: `/health/live`

## API Endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/items`
- `POST /api/v1/items`
- `GET /api/v1/items/:id`
- `PUT /api/v1/items/:id`
- `DELETE /api/v1/items/:id`

## Environment Configuration

Copy templates and fill values:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Use MongoDB Atlas URI in `backend/.env` for production.

## Local Development (Docker Compose)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Mongo (local dev fallback): mongodb://localhost:27017

## Kubernetes Readiness

The services are ready for Kubernetes deployment with no code changes because:

- Configuration is env-driven.
- Containers expose explicit health checks.
- Stateless runtime behavior.
- Logs are structured to stdout.
- No coupling to compose-only internals.

You can add Kubernetes manifests/Helm charts externally and inject env vars/secrets through ConfigMaps/Secrets.
