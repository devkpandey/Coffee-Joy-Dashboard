"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OTPInput from "@/components/OTPInput";

export default function VerifyOTP() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (otp === "123456") {
        router.push("/login");
      } else {
        setError("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-3 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-blue-50 rounded-2xl shadow-lg p-5 sm:p-7 lg:p-8 border border-blue-100">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-5 sm:mb-6">
          <div className="bg-blue-500 text-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-bold">
            L
          </div>
          <h1 className="text-lg sm:text-xl font-semibold text-blue-900">
            Larkon
          </h1>
        </div>

        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-blue-900">
          Verify OTP
        </h2>

        <p className="text-blue-700 mb-5 sm:mb-6 text-xs sm:text-sm text-center sm:text-left">
          Enter OTP sent to your email
        </p>

        {/* OTP */}
        <OTPInput onChange={setOtp} />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs sm:text-sm mt-4 text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className={`w-full mt-5 sm:mt-6 py-2.5 rounded-lg flex items-center justify-center gap-2 transition text-sm sm:text-base
            ${
              loading || otp.length !== 6
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}