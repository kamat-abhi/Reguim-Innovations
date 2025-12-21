import crypto from "crypto"

export const hashOtp = (otp) => {
    return crypto
     .createHash("sha256")
     .update(otp)
     .digest("hex");
};

export const verifyOtpHash = (otp, hashedOtp) => {
    if (!otp || !hashedOtp) return false;
    const hash = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    return hash === hashedOtp; 
}
