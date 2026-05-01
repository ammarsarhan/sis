# Student Information System

A full-stack monorepo with a TanStack frontend, Hono API, PostgreSQL, and LocalStack for local S3 emulation.

## Stack

| Layer     | Technology           |
|-----------|----------------------|
| Frontend  | TanStack (Vite)      |
| Backend   | Hono                 |
| Database  | PostgreSQL (latest)  |
| Storage   | LocalStack (S3)      |
| Runtime   | Node.js              |

## Project Structure

```
sis/
├── ui/                  # TanStack frontend
├── api/                 # Hono backend
├── scripts/
│   └── localstack-init.sh
├── docker-compose.yml
└── .env
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) 20+

### Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/ammarsarhan/sis.git
   cd sis
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your values (see [Environment Variables](#environment-variables)).

3. **Start services**

   ```bash
   docker compose up --build
   ```

| Service    | URL                        |
|------------|----------------------------|
| UI         | http://localhost:3000       |
| API        | http://localhost:8080       |
| LocalStack | http://localhost:4566       |

## Environment Variables

| Variable               | Description                              | Example                  |
|------------------------|------------------------------------------|--------------------------|
| `POSTGRES_USER`        | Database user                            | `sis`                    |
| `POSTGRES_PASSWORD`    | Database password                        | `yourpassword`           |
| `POSTGRES_DB`          | Database name                            | `sis_db`                 |
| `AWS_REGION`           | AWS region (LocalStack)                  | `us-east-1`              |
| `AWS_ACCESS_KEY_ID`    | AWS key (use `test` for LocalStack)      | `test`                   |
| `AWS_SECRET_ACCESS_KEY`| AWS secret (use `test` for LocalStack)   | `test`                   |
| `S3_BUCKET_NAME`       | S3 bucket name                           | `sis-documents`          |
| `ACCESS_TOKEN_SECRET`  | JWT access token secret                  | *(random 32-byte string)*|
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret                 | *(random 32-byte string)*|
| `NODE_ENV`             | Environment                              | `development`            |

Generate secure secrets with:

```bash
openssl rand -base64 32
```

## Development

Each app can also be run independently outside Docker:

```bash
# API
cd api && npm install && npm run dev

# UI
cd ui && npm install && npm run dev
```

## Scripts

| Script                        | Purpose                              |
|-------------------------------|--------------------------------------|
| `scripts/localstack-init.sh`  | Creates the S3 bucket on startup     |

## License

MIT