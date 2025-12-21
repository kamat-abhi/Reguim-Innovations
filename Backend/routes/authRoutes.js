import express from "express";
import { otpSendLimiter, otpVerifyLimiter } from "../middlewares/otpRateLimiter.js";
import { googleLogin, logout, resendOtp, sendOtp, verifyOtp } from "../controller/authController.js";


const authRouter = express.Router();

//OTP routes(rate limited)

authRouter.post("/send-otp", otpSendLimiter, sendOtp)
authRouter.post("/resend-otp", otpSendLimiter, resendOtp);
authRouter.post("/verify-otp", otpVerifyLimiter, verifyOtp);

//Google login
authRouter.post("/google", googleLogin);

// Logout
authRouter.post("/logout", logout);

export default authRouter;