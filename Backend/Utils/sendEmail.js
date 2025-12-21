import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Regium Innovations" <${process.env.EMAIL}>`,
      to: to,
      subject: "Your Login OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #444;">Login Verification</h2>
          <p>We received a request to log in to your account.</p>
          
          <p>Your One-Time Password (OTP) is:</p>
          <div style="background: #f3f3f3; padding: 15px; width: fit-content; border-radius: 5px;">
            <h1 style="margin: 0; letter-spacing: 5px; color: #007bff;">${otp}</h1>
          </div>

          <p>This OTP is valid for <b>5 minutes</b>.  
          If you did not request this login, please ignore this email.</p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p>Regards,<br/>
          <b>The Regium Innovations Team</b><br/>
          <small style="color: #888;">support-mr.kashyap@RegiumInnovations.com</small></p>
        </div>
      `,
    });
    console.log("OTP sent successfully to", to);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

export default sendMail;