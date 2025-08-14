# Node Server Template


# TODO: ONCE the project base is compelte make youtube videos for it and link????????

# TODO: GPT TO HELP WITH README FOR EACH SECTION INSIDE POSSIBLE_README_FORMAT AND OTHER STUFF. FUL LSETUP IN README SINCE ITS A FULL SERVER TEMPLATE

# TODO: Make a big todo list PROPERLY and aggregate it all then jsut pick 1 thing at a time and do it - make sure u have temp noties in readme to finish later. Readme will do last
# TODO: SWITCHUP THE .js FOR TYPESCRIPT AND HARDCODE ALL TYPES????? BETTER FOR PROD # TypeScript (strict): noImplicitAny, exactOptionalPropertyTypes, path aliases, tsup/tsx/ts-node for DX.
# TODO: ADD MORE CODE COMMENTS INLINE!!!!!!!!!!!!!!! FOR ALL FUNCTIONS U HAVE AND SHIT ALSO WRITE JEST TESTS FOR EVERYTING YOU HAVE SO FAR - maybe even have a npm env setup to create the default env stuff? - what about setting up secrets so env variables can live everywhere but just be decoded on prod/staging?? like pioneer
# TODO: GPT CHECK ALL UR FILES FOR WHATS GOOD/BAD AND WHAT SHOULD BE THERE OR NOT AND WHAT IM MISSING - check content of all ur . files and stuf too
# GPT CHECK ON UR MIDDLEWARE SECURITY AND IF ITS GOOD ENOUGH
# TODO: Add node version lock to readme: .nvmrc info/waht it is??? using nvm use to use the specific node server you need
# TODO: add `nvm install && nvm use li` to your ci/cd??
# TODO: Add what .editorconfig is and if you wanna customize it go ahead etc Works in VS Code, IntelliJ, Sublime, etc., if they have the EditorConfig plugin (VS Code does by default).

# TODO: Add # comments to all the config shit and . file examples. also to all functions

# TODO: ADD # commetns at top of each file if its needed to explain what it is

What “12‑factor config” means (in practice)
All runtime config comes from env vars (not JSON files committed per‑env).

Same build, different env: you don’t rebuild for staging/prod; you just change env.

Immutable defaults in code, secrets outside: code can have safe defaults, but anything secret/sensitive lives in env.

Why Zod/Envalid?
Envalid: dead‑simple parsing + type coercion + sensible errors (PORT becomes a number, true→boolean, bad values blow up on boot).

Zod: great for structured/nested config (e.g., a JSON feature flag payload) and reuse across your app.

Use Envalid for primitives and Zod for complex shapes. They play well together.

/src/core/config/
  index.ts          # loads .env, validates, exports typed config
  schema.ts         # Zod schemas for complex shapes (optional)
.env.example        # documented example env
.env                # dev only (gitignored)


# TODO: Make sure to audit security stuff in ci/cd and shit
# TODO: How to setup cron/scheduled jobs? with bullmq maybe???
# TODO: Have a cool folder structure thing on the readme explaing the idea of the organization and what each section should be or recommended - same with test files mocking it

# TODO: Look into: Dependency Injection (optional but nice): tsyringe/typedi to make testing and swapping adapters trivial.

# TODO: setup all npm scripts: one-liners for build, dev, start, lint, typecheck, test, test:e2e, db:migrate, db:seed.
# TODO: Any setup scirpts like for .env secret files and stuff and others that arent commited to git


# TODO: gpt recommended: Pino + pino-http with redaction (password, authorization, cookie, x-api-key), and request IDs via AsyncLocalStorage. ???? HOW TO SET THIS UP? 

# TODO: error handling and returning proper error to users, look into: Unified error shape (RFC 7807 problem+json or your own): error codes, user message, dev message, correlationId.

# TODO: Add validations to requests. check out: Validation: Zod (or Fastify schemas) at the edge; auto-coerce types; reject unknowns.

# TODO: Pagination/Filtering/Sorting conventions + ETag/If-None-Match support.. THINK ABOUT THIS IN AL LRETURNING IF DATA CAN BE VERY LARGE

# VERSIONING????? TODO: Versioning: /v1 path or Accept: application/vnd.yourapp.v1+json.

# API DOCUMENTATION FOR DEVS OF EVERLIGHT AND WHATEVER PROJECT? TODO: OpenAPI: generate spec from schemas; serve /docs with SwaggerUI + bundle a typed client generator.

# TODO: QUICKSTART SECTION?????????????


// TODO: What is prepare script husky install // TODO: MAKE SURE THESE ARE GOOD AND WORKING AND ADDD INTRUCTIONS FOR ALL THESE IN README. ALSO ADD ALL SCRIPTS TO README

<!-- # TODO: GPT SECURITY RECOMMENDED. MAKE SURE YOU INCLUDE IT ALL IF NOT ALREADY:
Security (beyond Helmet/CORS/sanitize)
AuthN: JWT (short-lived access) + rotating refresh tokens (revocation list), or session cookies (HttpOnly, SameSite=Lax/Strict, rotation).

AuthZ: RBAC (roles -> permissions) and/or ABAC; central guard helper; route decorators; permission checks in service layer.

API keys & HMAC: first-class support for service-to-service; signed webhooks (Stripe-style) with clock-skew tolerance.

Password policy: Argon2id, per-user salt, breach checks; 2FA (TOTP) scaffolding.

CSRF (if cookies), HPP (HTTP Param Pollution), MIME sniffing, upload MIME/extension allow-list.

Rate limiting: you have it—ensure Redis-backed and include Retry-After headers + sliding window.

Secrets: .env locally; Vault/Doppler/1Password in prod; forbid secrets in logs; key rotation doc.

Data protection: field-level encryption helpers for PII, at least for “high” sensitivity fields. At-rest via DB/KMS.

Dependency & image scans: npm audit (gated), Trivy/Snyk in CI. -->

<!-- # TODO:
Observability & reliability
Metrics: Prometheus exporter (HTTP reqs, latency, 4xx/5xx, DB pool, queue stats, cache hits). Default dashboards JSON.

Tracing: OpenTelemetry auto-instrumentation (HTTP, DB, Redis) → OTLP collector. Tie requestId ↔ traceId in logs.

Logging: Pino with serializers, PII redaction, request context via ALS, log rotation hints if not shipping.

Health endpoints: /healthz (shallow), /readyz (DB/Redis probes), /livez. Include build SHA & start time.

Graceful shutdown: SIGTERM handler, stop intake, drain connections, finish jobs, close pools within timeout.

Resilience patterns: timeouts everywhere, retries with jitter, circuit breaker (opossum), bulkheads, idempotency keys on POST, distributed locks (Redlock) for critical sections. -->

<!-- TODO:
Data layer (Prisma+Postgres assumed)
Migrations & seeding: repeatable seed scripts, sample data profiles (dev/demo).

Connection mgmt: pool sizing per CPU; pgbouncer settings guide; sane timeouts.

Indexes: cookbook for common filters; migration checks for missing indexes; partial/unique indexes for invariants.

Transactions: helper for repeatable read flows; outbox pattern table + relay worker for reliable events.

Tenancy: strategy (single DB w/ tenant_id, or schema per tenant) documented if relevant.

Soft deletes & auditing: deleted_at, actor stamps, immutable audit log table (append-only). -->

TODO: Caching, queues, and scheduled work
Redis: ioredis client factory with TLS, namespacing, health checks.

Cache: helpers (key builder, TTL policy, stampede protection), HTTP cache headers, microcache for GET.

Job queue: BullMQ (backed by Redis) with retries, backoff, dead-letter, concurrency, metrics, separate worker process.

Scheduler: use queue-based cron (BullMQ repeatable jobs) instead of node-cron, so it scales.

A fast, modular, and secure Node.js + Express server starter template.





File handling (you’ve got Multer—finish it)
Adapter interface: Local, S3/MinIO, GCS; signed URLs; path traversal-safe keys.

Validation: max size, MIME sniff, extension allow-list; image ops via Sharp in a worker, not request path.

Security: optional antivirus scan hook; strip EXIF; store hashes for dedupe/integrity.







Realtime & other protocols (optional but template-worthy)
WebSockets/SSE: Socket.IO + Redis adapter; auth middleware; per-room rate limits.

gRPC or GraphQL: skeletons behind flags if you foresee them; otherwise keep REST clean.

API surface polish
Consistent error taxonomy: machine codes like USER_NOT_FOUND, mapped to HTTP.

Problem+JSON responses; include correlationId, traceId.

Depracation policy: Deprecation/Sunset headers, changelog entries, migration notes.

Bulk ops & partial success format; idempotency for webhook receivers & paymentish endpoints.

CI/CD & supply chain
Pipelines: lint → typecheck → unit → integration (Testcontainers) → build → vulnerability scan (Trivy) → SBOM (Syft) → sign image (cosign) → push → deploy.

Preview envs: docker-compose up with seeded DB on PR; ephemeral URLs.

Release mgmt: semantic-release (tags, changelog, GitHub Releases).

Dependabot/Renovate + automerge rules for dev deps.

Migrations gate: block deploy if pending destructive migrations without flag/approval.

Containerization & deploy targets
Dockerfile: multi-stage (builder → distroless/alpine), non-root user, /healthz set, NODE_ENV=production, TZ=UTC.

docker-compose: Postgres, Redis, MinIO, Mailhog, LocalStack (optional).

Kubernetes: Deployment, Service, Ingress, HPA, resource requests/limits, liveness/readiness, ConfigMap/Secret, PodDisruptionBudget.

Bare-metal: PM2 config + systemd unit; log shipping docs (Vector/Fluent Bit).

TLS: Let’s Encrypt via ingress/cert-manager; HSTS docs; Cloudflare “orange cloud” notes.

Testing strategy (beyond unit)
Integration: Testcontainers for Postgres/Redis/S3-mock; realistic seeds.

E2E: supertest (REST) against ephemeral app; scenario seeds; contract tests (Pact) for provider/consumer if you have services.

Perf: k6/Artillery scripts and thresholds in CI (smoke performance).

Security tests: ZAP/Burp baseline scan; basic fuzz with fast-check.

Coverage: meaningful thresholds, but fail only if critical files drop.

Tooling & DX
VS Code: .vscode/ launch configs, recommended extensions.

Thunder Client/Rest Client collections** checked in**.

Onboarding: README (one-command start), architecture diagram, ADRs template, runbooks (rotate keys, restore backup, incident response).

Issue/PR templates and a SECURITY.md with contact.

Feature flags: Unleash or simple DB-backed flags; kill-switch pattern for risky features.

Internationalization: timezones, ISO dates, i18n scaffold if user-facing.

Compliance & data lifecycle (the stuff people forget)
PII inventory & classifications; redaction rules.

Retention policies: cron to purge old logs/records; Right to Erasure helper.

Backups: schedule + restore drill doc; off-site encryption; retention window.

Access logs: who viewed/changed what (user & admin), append-only.
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

import { globalLimiter } from "./middleware/rateLimiter.js";
import { router } from "./routes/routes.js";
import { logger } from "./utils/logger.js";
import { sanitizeMiddleware } from "./middleware/sanitize.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Helpful typed Error
interface HttpError extends Error {
  status?: number;
}

const app = express();

// Normalize PORT to a number
const PORT = Number(process.env.PORT) || 3000;

// 🔐 Security
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(sanitizeMiddleware);
app.use(globalLimiter);

// 🧠 Parse JSON
app.use(
  express.json({
    limit: process.env.JSON_LIMIT || "2mb",
  })
);

// 📦 Routes
app.use("/", router);

// ❓ Not Found (unmatched route)
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err: HttpError = new Error("Not Found");
  err.status = 404;
  next(err);
});

// ❌ Global Error Handler – must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

// Optional: export for testing
export default app;

Payments/webhooks: generic webhook receiver with signature verification & retry DLQ.














====================================================

## Features
- ⚡ Quick Express setup

- 🔐 Built-in security middleware (Helmet, HPP, CORS, Rate Limiters, filtering)

- 🗃️ Prisma ORM support with different databases

- 🧪 Easy testing, linting, and formatting setup

- 🧹 Pre-commit checks using Husky

- 🧵 BullMQ ready for background jobs/queues

- 🧰 Fully customizable and production-ready

## Index
- Links to all sections and brief description

## Setup
Follow this setup to get the template up and running

### Prerequisites
- Node 18+
- NPM
- Docker + Docker Compose
- A Database (e.g. PostgreSQL, SQLite)

---
### Download Project
Clone or Download the project from github:

```
git clone <your-repo-url>
```

Go into project directory and install dependencies: 

```
cd node-server-template
npm ci
```

### Environment Variables

Create a file in the root named `.env` and add the environment variables:
```
DATABASE_URL=""
NODE_ENV=''
PORT=3000
```

NO SETUP config/env and config/secrets - here tutrorial for encryption?>??? also the env stuff and editing and how to add and encrypt ...

### Database Setup
- Select provider (PostgreSQL, SQLite, etc.)
- Create your database in selected provider
- Add your DATABASE_URL to the `.env` file in the root
- Open `prisma/schema.prisma` and set the correct provider:
```
provider = "postgresql" // or mysql, sqlite, mongodb, etc.
```
- some providers may need their node-specific driver. (npm install sqlite3, etc)

- Run:
```
npx prisma generate
npx prisma db push
```
- Show databse hookup with Postgres and others with prisma?

### Running Server
🐳 Run With Docker-Compose (Redis included)
```
npm run docker
```

If you see no errors and the server is listening on the specified port, you're good to go — the server is up and ready for you to start building!

### Next Steps
You're all set — the server is running!

Next, you can start building out your application.
Check out the Using section for examples, testing, database migrations, and more tutorials to guide you further.

### CI/CD (Optional)
- Default Lint and Test action is setup in .github/workflows/ci.yml. You can add this as a mandatory aciton while mergung with main

Consider setting up GitHub Actions for:
- Running tests on each push/PR
- Security scans (npm audit, gitleaks, retire, etc.)
- Enforcing lint/format rules

## Using (examples and building guides)

### Scritps package,json
  "scripts": {
    "test": "jest",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint-staged": "lint-staged",
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "docker": "docker-compose down && docker-compose build && docker-compose up",
    "seed": "node prisma/seed.js"
  },
  "lint-staged": {
    "**/*.{js,ts,tsx,json}": [
      "eslint --fix",
      "prettier --write"
    ]
  },


### Husky – Run Commands on Git Hooks
Husky is a Node.js package that lets you run custom commands on Git actions like staging, committing, and more.
By default, it's configured to run linting and code formatting checks on each commit.

You can add more Git hook actions by following the [Husky documentation.](https://typicode.github.io/husky/)

### Testing
This section covers how to run and build tests using Jest, along with how to execute all available security scans built into the project.

🔧 **Commands**:
- `npm test` -  Runs all Jest tests in the project
- `npm audit fix` - Runs the built-in npm security audit and auto-fixes known issues (when possible).
- `npm lint-staged` - Runs ESLint and Prettier on staged files (Also triggered via Git pre-commit hook).
- `npx retire` - Scans your dependencies for known vulnerabilities
- `npx prettier --check .` - Checks if your code is formatted with Prettier
- `npx eslint . --fix` - Manually runs linting over your entire codebase.

Please see Jest documentation for building tests [here](https://jestjs.io/)

### Database migrations
This section covers how to define and apply database changes using Prisma ORM and manage schema updates through migrations.

FINISH THIS HERE. SHOW MIGRATIONS HERE ON HOW TO DO TI AND STUFF. ALSO SHOW ABOUT CHANIGNG PROVIDER, MIGRATIONS, ADDING TABLES, ETC ETC
ALSO SHOW HOW TO USE PRISMA BREIFLY

🔧 **Common Commands**:
- `npx prisma init` - Initializes Prisma in your project and sets up the schema.prisma file - **This should already be done in the template**

- `npx prisma migrate dev --name <migration-name>` - Creates a new migration based on your Prisma schema and applies it to your local database.

- `npx prisma generate` - Regenerates the Prisma Client based on your updated schema.

- `npx prisma db push` - Pushes schema changes directly to the database (without generating a migration).

- `npx prisma studio` - Opens Prisma Studio — a visual UI for browsing and editing your database.

More on prisma [here](https://www.prisma.io/)

### Seeding Test Data
 how to setup/use seeds? create a seed command npm

### Express/API Rate Limits
Add rate limiting to your API to prevent abuse and brute-force attacks. By default there is a global rate limiter inside `./src/middleware/rateLimiter` applied to all requests.

Example (This will limit clients to 100 requests per 15 minutes):

```
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

```
More info [here](https://express-rate-limit.mintlify.app/overview)

### Creating a new server endpoint
This section covers how to create and register new API endpoints in your Express server.

Example (This will expose the endpoint at:
GET `/api/hello`):
```
// In routes/example.js
import express from 'express';
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

module.exports = router;
```.nvmrc, .editorconfig

app.use('/api', exampleRoutes);

```

STANDARD IS ADDING CONTROLLER. CONTROLLER IS THE INBOUND/OUTBOUND WRAPPER. IT CLALS THE SERVICES REQUIRED FOR LOGIC

More info [here](https://expressjs.com/en/guide/routing.html)

### Using Logger
Pino Logger

### Scheduled Jobs / Workers with BullMQ
This section explains how to set up background workers and scheduled jobs using BullMQ — a powerful Redis-based queue for Node.js. Redis must be running in order to use BullMQ jobs

📤 Add a Scheduled Job:
```
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();
const myQueue = new Queue('myQueue', { connection });

// Add a job to run 5 minutes later
myQueue.add('sendReport', { userId: 123 }, { delay: 5 * 60 * 1000 });

```

⚙️ Process Jobs with a Worker:
```
import { Worker } from 'bullmq';

const worker = new Worker('myQueue', async job => {
  if (job.name === 'sendReport') {
    console.log(`Sending report for user ${job.data.userId}`);
    // Add your logic here
  }
});

```

More info [here](https://docs.bullmq.io/)

### Using Alert Service
- Using alert templates already created:
Discord template:

Brevo Emailing Tempalte use:

- Creating new alert service:

- Adding alert service to sendAlert:

### Storage Handling and Image compression

- Storage options
- Also add a how-to add new adapters/options
- make a few default of popular options

✅ 6. Sample Upload Setup
js
Copyfetch( upload = multer({ storage: multer.memoryStorage() }); // store in memory before processing
const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const resizedBuffer = await resizeImage(req.file.buffer, 1024);
    const result = await storage.save({ ...req.file, buffer: resizedBuffer });

    res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;

🔧 Example usage:
If sending to client:
js
Copy
Edit
const stream = await localStorage.get('file.jpg');
stream.pipe(res);
If processing with Sharp:
js
Copy
Edit
const buffer = await localStimport dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

import { globalLimiter } from "./middleware/rateLimiter.js";
import { router } from "./routes/routes.js";
import { logger } from "./utils/logger.js";
import { sanitizeMiddleware } from "./middleware/sanitize.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Helpful typed Error
interface HttpError extends Error {
  status?: number;
}

const app = express();

// Normalize PORT to a number
const PORT = Number(process.env.PORT) || 3000;

// 🔐 Security
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(sanitizeMiddleware);
app.use(globalLimiter);

// 🧠 Parse JSON
app.use(
  express.json({
    limit: process.env.JSON_LIMIT || "2mb",
  })
);

// 📦 Routes
app.use("/", router);

// ❓ Not Found (unmatched route)
app.use((req: Request, _res: Response, next: NextFunction) => {
  const err: HttpError = new Error("Not Found");
  err.status = 404;
  next(err);
});

// ❌ Global Error Handler – must be last
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

// Optional: export for testing
export default app;
T, IDK IF IT IS OR NOT

🔥 You can do this in any route:
🔹 Synchronous example:
js
Copy
Edit
router.get('/fail', (req, res) => {
  throw new Error('Something broke!');
});
🔹 Async example:
import { asyncHandler } from '../utils/asyncHandler.js';

router.get('/fail', asyncHandler(async (req, res) => { # NEED TO ADD HANDLER HERE FOR GLOBAL ERROR HANDLER TO WORK IN ASYNC
  // No need to call next(err)
  throw new Error('Boom! This is handled globally');
}));

⚠️ You must use next(err) in async functions, or wrap them with a utility like express-async-handler, since throw alone won't be caught in async routes.

def test this a bunch


### HTTP Codes
Default HTTP Codes to use as a guide:
Code	Meaning	Use When...
200	OK	Success
201	Created	Resource was successfully created
400	Bad Request	Input/validation failed
401	Unauthorized	No/invalid token
403	Forbidden	Valid token but access denied
404	Not Found	Resource doesn’t exist
409	Conflict	Duplicate or logic conflict
422	Unprocessable Entity	Valid input format but failed semantic
500	Internal Server Error	Unexpected error in server

## Production Setup
- NGinx/certbot/ssl
- Pm2 if needed?? idk. Docker?
- building for prod and using

## Packages List

- express – Web server
- dotenv – Environment variables
- helmet – Secure HTTP headers
- hpp – HTTP Parameter Pollution protection
- cors – CORS setup
- express-rate-limit – Global/per-route rate limiting
- xss – Filter XSS input manually
- pino – Fast JSON logger
- pino-pretty (dev) – Prettified logs in dev
- @prisma/client – Prisma ORM runtime
- prisma (dev) – Prisma schema CLI
- bullmq – Background jobs
- ioredis – Redis client
- retire – Dependency security scanner
- husky – Git hook runner
- lint-staged – Run tasks on staged files
- eslint + plugins – Linting
- jest – Testing framework
- nodemon – Auto-reload in dev

## License
MIT License