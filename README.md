# Node Server Template

A fast, modular, and secure Node.js + Express server starter template.

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

### CI/CD (Optional)
- Default Lint and Test action is setup in .github/workflows/ci.yml. You can add this as a mandatory aciton while mergung with main

Consider setting up GitHub Actions for:
- Running tests on each push/PR
- Security scans (npm audit, gitleaks, retire, etc.)
- Enforcing lint/format rules

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
```
```
// In src/server.js or app.js
import express from 'express';
import exampleRoutes from './routes/example.js';

const app = express();

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



### Error Handling

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