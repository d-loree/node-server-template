import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, _next) {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    const isProd = process.env.NODE_ENV === "production";

    logger.error(`[${req.method}] ${req.originalUrl} → ${message}`, {
        status,
        ...(err.stack && { stack: err.stack }),
    });

    const response = {
        success: false,
        error: message,
    };

    if (!isProd && err.stack) {
        response.stack = err.stack;
    }

    res.status(status).json(response);

    // TODO: Future enhancement: send alert (email, Discord, Sentry, etc.)
}

// TODO: VERIFY THIS WORKS AND SHIT AND ERROR HANDLING
