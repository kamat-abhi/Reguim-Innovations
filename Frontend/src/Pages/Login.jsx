import React, { useState } from "react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import logo from "../assets/logo.jpg";
import google from "../assets/google.png";
import { setUserData } from "../redux/userSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (!email) return toast.error("Enter email first");
    setLoading(true);
    try {
      const res = await api.post("/api/auth/send-otp", { email });
      toast.success(res.data?.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      {/* Modal */}
      <div className="w-[92%] md:w-212.5 h-130 bg-white rounded-2xl shadow-2xl flex overflow-hidden animate-scaleIn">
        
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
                className="w-full bg-black text-white py-3 rounded-lg transition-all hover:bg-gray-900 active:scale-95 cursor-pointer"
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
                className="w-full bg-black text-white py-3 rounded-lg transition-all hover:bg-gray-900 active:scale-95 cursor-pointer"
              >
                {loading ? <ClipLoader size={20} color="#fff" /> : "Verify OTP"}
              </button>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <div className="border border-black rounded-lg py-2 flex items-center justify-center gap-2 cursor-pointer transition hover:bg-black hover:text-white">
            <img src={google} alt="google" className="w-5" />
            <span className="text-sm font-medium">Continue with Google</span>
          </div>

          
        </div>

        {/* Right Section */}
        <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center">
          <img src={logo} alt="logo" className="w-28 mb-4 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold tracking-wide">
            Regium Innovations
          </h1>
          <p className="text-sm mt-2 text-gray-300">
            Building next-gen solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
