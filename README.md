# Apex

Production-quality MVP for **Apex** (this repository: Apexwebsite): a food-safety training company with a public marketing site, online course checkout, and a learner LMS in the same Next.js app.

Branding lives in a single constant so the product can be renamed later (for example Apex → Uni Centro):

```ts
// src/lib/brand.ts
export const brand = { name: "Apex", /* ... */ }
```

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Prisma + **SQLite** for local/dev (runs out of the box)
- Auth.js / NextAuth v5 credentials auth (structure ready for a magic-link provider)
- Stripe Checkout when keys are present, **demo checkout** when they are not
- Seeded catalog: Food Handler Essentials, Food Protection Manager, Allergen Awareness

## Prerequisites

- Node.js 20.9+ (this project was generated on Node 22)
- npm

## Setup

```bash
cp .env.example .env
# Generate a secret and paste it as AUTH_SECRET
openssl rand -base64 32

npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo accounts (from seed)

| Role    | Email                   | Password       |
| ------- | ----------------------- | -------------- |
| Admin   | admin@apex.training     | `ApexDemo123!` |
| Learner | learner@apex.training   | `ApexDemo123!` |

The demo learner is already enrolled in **Food Handler Essentials**. Buy the other courses while signed in; with empty Stripe keys, checkout enrolls immediately (no card).

## Environment variables

See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Prisma connection string. Default `file:./dev.db` (SQLite file under `prisma/`). |
| `AUTH_SECRET` | Required by Auth.js in production. Generate with `openssl rand -base64 32`. |
| `AUTH_URL` | Canonical site URL for Auth.js (`http://localhost:3000` in development). |
| `NEXT_PUBLIC_APP_URL` | Used for Stripe success/cancel URLs. |
| `STRIPE_SECRET_KEY` | Optional. When empty, the app uses **demo checkout**. |
| `STRIPE_WEBHOOK_SECRET` | Optional. Stripe webhook at `/api/stripe/webhook`. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional public Stripe key (Checkout is server-redirect based). |

### Demo vs Stripe checkout

- **No `STRIPE_SECRET_KEY`:** “Enroll with demo checkout” creates a `DEMO` order and an enrollment, then sends the learner to `/checkout/success`.
- **With Stripe keys:** learners are redirected to Stripe Checkout. On success, `/checkout/success?session_id=…` (and the webhook) mark the order paid and create the enrollment.

Point Stripe webhooks at `https://<your-host>/api/stripe/webhook`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Generate Prisma client and production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run db:push` | Push the Prisma schema to SQLite (no migration files required) |
| `npm run db:migrate` | Create/apply Prisma migrations when you are ready for them |
| `npm run db:seed` | Reset-safe seed of users, courses, modules, lessons, quizzes |
| `npm run db:reset` | Recreate the SQLite schema and re-seed |
| `npm run db:studio` | Prisma Studio |

`db:seed` **deletes and recreates** catalog/user seed data so local demos stay predictable. Do not run it against a production database you care about.

## Switching SQLite → Postgres later

1. Create a Postgres database and set `DATABASE_URL` to the Postgres URL.
2. In `prisma/schema.prisma`, change the datasource:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Generate a baseline migration and deploy:

   ```bash
   npx prisma migrate dev --name init
   # production
   npx prisma migrate deploy
   npx prisma generate
   npm run db:seed   # only for empty environments
   ```

SQLite is convenient for local MVP work; Postgres is the right default for production (especially on hosts without a persistent local disk).

## Product map

### Public

- `/` marketing home
- `/about` why us / about the company
- `/courses` catalog
- `/courses/[slug]` syllabus, price, enroll
- `/contact` stores messages in the database (no email send in this MVP)

### Auth

- `/signup` `/signin` credentials
- Sign out from the header
- Magic link can be added later in `src/auth.ts` (Auth.js Email / Resend provider) without changing the session model

### Learner LMS (signed in)

- `/dashboard` enrolled courses and progress
- `/learn/[courseSlug]` outline, continue, quiz lock until lessons are done
- `/learn/[courseSlug]/lessons/[lessonId]` markdown lessons + mark complete
- `/learn/[courseSlug]/quiz` 80% pass mark, retakes allowed
- `/learn/[courseSlug]/certificate` placeholder certificate when the course is complete

### Admin (`role = ADMIN`)

- `/admin` snapshot
- `/admin/courses` list / create / edit modules, lessons, quiz questions
- `/admin/enrollments` learner seats and progress

## Architecture notes

- Brand string: `src/lib/brand.ts`
- Auth.js config split: `src/auth.config.ts` (edge-safe, used by `src/proxy.ts`) and `src/auth.ts` (credentials + Prisma)
- Data access: `src/lib/prisma.ts`
- Server mutations: `src/app/actions/*`
- Schema: `prisma/schema.prisma`
- Course copy used by seed: `prisma/seed-data.ts`

## Out of scope (this pass)

Live video, SCORM import, multi-tenant organizations, tax/VAT, and email campaigns.
