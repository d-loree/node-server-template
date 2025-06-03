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

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Security
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(sanitizeMiddleware);
app.use(globalLimiter);

// 🧠 Parse JSON
app.use(express.json({ limit: '2mb' })); // make env variable or 2mb??

// 📦 Routes
app.use('/', router);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
