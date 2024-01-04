import rateLimit from "express-rate-limit";
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message:
    "Too many authentication requests from this IP, please try again later.",
});
