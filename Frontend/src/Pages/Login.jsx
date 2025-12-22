import React, { useState } from "react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import logo from "../assets/logo.jpg";
import google from "../assets/google.png";
import { setUserData } from "../redux/userSlice.js";
import { signInWithPopup } from "firebase/auth";
import { auth, authProvider } from "../utils/Firebase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/send-otp", { email });
      toast.success(res.data?.message || "OTP sent");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/auth/verify-otp", {
        email,
        otp,
        name,
      });

      dispatch(setUserData(res.data.user));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, authProvider);
      const user = response.user;

      const payload = {
        name: user.displayName,
        email: user.email,
      };

      const result = await api.post("/api/auth/google", payload);

      dispatch(setUserData(result.data.user));
      toast.success("Login successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.message || "Google login failed"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="w-[92%] md:w-212.5 h-130 bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10">
          <h2 className="text-2xl font-bold mb-8 text-black">
            Login to Regium Innovations
          </h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 active:scale-95"
              >
                {loading ? <ClipLoader size={20} color="#fff" /> : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                type="text"
                placeholder="Your name (optional)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 active:scale-95"
              >
                {loading ? <ClipLoader size={20} color="#fff" /> : "Verify OTP"}
              </button>
            </>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <div
            onClick={googleLogin}
            className="border border-black rounded-lg py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-black hover:text-white transition"
          >
            <img src={google} alt="google" className="w-5" />
            <span className="text-sm font-medium">Continue with Google</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-28 mb-4" />
          <h1 className="text-3xl font-extrabold">Regium Innovations</h1>
          <p className="text-sm mt-2 text-gray-300">
            Building next-gen solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
