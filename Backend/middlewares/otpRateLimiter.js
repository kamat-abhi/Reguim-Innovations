import rateLimit from "express-rate-limit";

export const otpSendLimiter = rateLimit({
    windowMs: 1*60*1000,
    max:5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many OTP requests. Please try again after 15minutes.",
    },
});

export const otpVerifyLimiter = rateLimit({
    windowMs: 1*60*1000,
    max:10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many verification attempts. Please try again later.",
    }
})