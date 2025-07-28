import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

import { globalLimiter } from './middleware/rateLimiter.js';
import { router } from './routes/routes.js';
import { logger } from './utils/logger.js';
import { sanitizeMiddleware } from './middleware/sanitize.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Security
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(sanitizeMiddleware);
app.use(globalLimiter);

// 🧠 Parse JSON
app.use(express.json({ limit: process.env.JSON_LIMIT || '2mb' }));

// 📦 Routes
app.use('/', router);

// ❓ Not Found Error (Unmatched route)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ❌ Global Error Handler – Must be registered last
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
