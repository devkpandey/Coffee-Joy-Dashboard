"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { sellerOtpThunk } from "@/app/redux/features/sellerAuthSlice";

export default function OTPInput({ length = 6, email }) {
  const inputs = useRef([]);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const dispatch = useDispatch();
  const router = useRouter()

  const { loading, error , otpVerified } = useSelector((state) => state.seller);

  useEffect(()=>{
      console.log("otpVerified:", otpVerified);
      if(otpVerified){
        router.push("/dashboard")
      }
    },[otpVerified , router])

  // ✅ handle change (controlled)
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ✅ backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  // ✅ paste OTP (FIXED - no direct DOM manipulation)
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    inputs.current[newOtp.length - 1]?.focus();
  };

  // ✅ verify
  const handleVerifyButton = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== length) {
      alert("Please enter complete OTP");
      return;
    }

    dispatch(
      sellerOtpThunk({
        email,
        otp: finalOtp,
      })
    );
  };

  const isOtpComplete = otp.every((d) => d !== "");

  return (
    <div className="flex justify-center mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 w-full max-w-sm"
      >
        <h1 className="text-center text-2xl underline mb-6 font-bold">
          Enter OTP
        </h1>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              whileFocus={{ scale: 1.1 }}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-10 h-12 text-lg text-center border rounded-lg 
                         bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleVerifyButton}
            disabled={!isOtpComplete || loading}
            className="w-full py-2 bg-white text-blue-600 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-sm underline text-center"
          >
            Resend OTP
          </motion.button>

          {error && (
            <p className="text-red-200 text-sm text-center">{error}</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}