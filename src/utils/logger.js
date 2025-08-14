import { pino, stdTimeFunctions } from "pino";

const isProd = process.env.NODE_ENV === "production";

const ALLOWED_LEVELS = new Set(["error", "warn", "info", "debug"]);

const envLevel = (process.env.LOG_LEVEL || "").toLowerCase().trim();
const level = ALLOWED_LEVELS.has(envLevel) ? envLevel : isProd ? "info" : "debug";

const baseOptions = { level, timestamp: stdTimeFunctions.isoTime };

const options = isProd
    ? baseOptions
    : {
          ...baseOptions,
          transport: {
              target: "pino-pretty",
              options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname" },
          },
      };

const logger = pino(options);

export { logger };
