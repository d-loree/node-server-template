import { logger } from '../utils/logger.js';

export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  logger.error(`[${req.method}] ${req.originalUrl} → ${message}`, {
    status,
    ...(stack && { stack }),
  });

  res.status(status).json({
    success: false,
    error: message,
    ...(stack && { stack }),
  });

  // Future enhancement: send error to email, Slack, Sentry, etc.
}
