import sendMail from "../Utils/sendEmail";
import { generateOtp } from "../Utils/generateOtp";
import { generateToken } from "../Utils/generateToken";
import validator from "validator";
import User from "../models/userModel";

/// SEND OTP (LOGIN / SIGNUP)

export const sendOtp = async (req, res) => {
  try {
   const {email} = req.body;

   if(!validator.isEmail(email)) {
    return res.status(400).json({message: "Invalid email"});
   }

   const otp = generateOtp();

   await User.findOneAndUpdate(
    {email},
    {
        loginOtp: otp,
        otpExpires: Date.now() + 5*60*1000,
        isOtpVerified: false,
        authProvider: "otp"
    },
    {upsert: true, new: true}
   );
   
   await sendMail(email, otp);
   return res.status(200).json({message: "OTP sent succesfully"});
  } catch (error) {
    return res.status(500).json({ message: `send OTP error: ${error} ` });
  }
};

// verify OTP (SIGNUP + LOGIN)

export const verifyOtp = async (req,res) => {
    try {
        const {email, otp, name} = req.body;

        const user = await findOne({
            email,
            loginOtp: otp,
            otpExpires: {$gt: Date.now()},
        });
        if(!user) {
            return res.status(400).json({message: "Invalid or expired OTP"});
        }
        if(!user.authProvider) {
            user.name = name || user.name;
            user.authProvider = "otp"
        }

        user.loginOtp = undefined;
        user.otpExpires = undefined;
        user.isOtpVerified = true;

        await user.save();

        const token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        return res.status(200).json({message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                authProvider: user.authProvider,
            }
        })
    } catch (error) {
        return res.status(500).json({message: `Verify OTP error: ${error}`})
    }
}