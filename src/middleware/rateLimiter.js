import rateLimit from 'express-rate-limit';

// 🌐 Global limiter (applied to all requests)
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 15,
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Specific Example:
// const loginLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 mins
//   max: 5, // only 5 login attempts allowed
//   message: 'Too many login attempts, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

module.exports = {
  globalLimiter,
};
