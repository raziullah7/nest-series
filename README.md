# NestJS Backend Learning Series

A **NestJS/TypeScript learning repository** exploring API structure, Prisma/PostgreSQL persistence, and common backend patterns.

## Implemented examples

- Employee CRUD with Prisma and optional role filtering.
- In-memory user CRUD, name/role filtering, and not-found handling.
- Controllers, services, dependency injection, exception filtering, logging, and throttling configuration.
- Routes under the `/api` prefix.

This is an educational project. Role fields are data/filtering examples, not authentication or role-based authorisation. Throttling decorators include exemptions, so rate limiting should not be assumed on every route.

## Run locally

Requires Node.js 22, npm, and a local PostgreSQL database. Set `DATABASE_URL` in your environment or an untracked `.env`.

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

The server defaults to port 3000. Example routes are `/api/users` and `/api/employees`. User data is held in memory; employee data uses PostgreSQL.

## Checks

`npm run build`, `npm test`, `npm run test:e2e`, and `npm run test:cov` are defined in [package.json](package.json). They were not rerun for this documentation update. The lint script includes `--fix` and can modify files.

[Employee service](src/employees/employees.service.ts) · [User service](src/users/users.service.ts) · [Schema](prisma/schema.prisma)

