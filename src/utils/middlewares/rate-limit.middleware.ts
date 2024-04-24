import rateLimit from 'express-rate-limit';

const RATE_LIMIT_WINDOWMS: number =
  parseInt(process.env.RATE_LIMIT_WINDOWMS, 10) || 15;
const RATE_LIMIT_MAX_REQUESTS: number =
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100;

export const rateLimitMiddleware = rateLimit({
  windowMs: RATE_LIMIT_WINDOWMS * 60 * 1000,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later',
});
