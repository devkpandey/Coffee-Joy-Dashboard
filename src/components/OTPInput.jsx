// "use client";
// import { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function OTPInput({ length = 6, onChange }) {
//   const inputs = useRef([]);
//   const router = useRouter();

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resending, setResending] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // ⏱️ Timer
//   const [timeLeft, setTimeLeft] = useState(30);
//   const [resendActive, setResendActive] = useState(false);

//   // Timer logic
//   useEffect(() => {
//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setResendActive(true);
//     }
//   }, [timeLeft]);

//   // 🔁 Resend OTP with delay
//   const handleResend = async () => {
//     setResending(true);

//     setTimeout(() => {
//       setTimeLeft(30);
//       setResendActive(false);
//       setError("");
//       setSuccess(false);
//       setOtp("");

//       inputs.current.forEach((input) => {
//         if (input) input.value = "";
//       });

//       setResending(false);
//     }, 1500);
//   };

//   // Input change
//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!/^[0-9]?$/.test(value)) return;

//     const otpArray = inputs.current.map((input) => input?.value || "");
//     otpArray[index] = value;

//     const newOtp = otpArray.join("");
//     setOtp(newOtp);
//     onChange && onChange(newOtp);

//     if (value && index < length - 1) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   // Backspace handling
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !e.target.value && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   // Paste OTP
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").slice(0, length);
//     if (!/^\d+$/.test(pasteData)) return;

//     const otpArray = pasteData.split("");
//     otpArray.forEach((char, i) => {
//       if (inputs.current[i]) inputs.current[i].value = char;
//     });

//     const newOtp = otpArray.join("");
//     setOtp(newOtp);
//     onChange && onChange(newOtp);

//     inputs.current[otpArray.length - 1]?.focus();
//   };

//   // ✅ Auto submit
//   useEffect(() => {
//     if (otp.length === length) {
//       handleSubmit();
//     }
//   }, [otp]);

//   // Submit OTP
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");

//     setTimeout(() => {
//       if (otp === "123456") {
//         setSuccess(true);

//         setTimeout(() => {
//           router.push("/login");
//         }, 1200);
//       } else {
//         setError("Invalid OTP. Try again!");
//       }
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="flex justify-center mt-6 sm:mt-10 px-4">
      
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-blue-600 text-white rounded-2xl shadow-lg p-5 sm:p-6 w-full max-w-xs sm:max-w-sm"
//       >
//         <h1 className="text-center text-xl sm:text-2xl underline mb-5 sm:mb-6">
//           Coffee & Joy
//         </h1>

//         {/* OTP Inputs */}
//         <div
//           className="flex justify-center gap-2 sm:gap-3 mb-4"
//           onPaste={handlePaste}
//         >
//           {[...Array(length)].map((_, i) => (
//             <motion.input
//               key={i}
//               whileFocus={{ scale: 1.1 }}
//               type="text"
//               inputMode="numeric"
//               maxLength="1"
//               ref={(el) => (inputs.current[i] = el)}
//               onChange={(e) => handleChange(e, i)}
//               onKeyDown={(e) => handleKeyDown(e, i)}
//               className="w-9 h-10 sm:w-11 sm:h-12 text-sm sm:text-lg text-center border border-blue-200 rounded-lg 
//                          bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
//             />
//           ))}
//         </div>

//         {/* ❌ Error */}
//         {error && (
//           <p className="text-red-200 text-xs sm:text-sm text-center mb-2">
//             {error}
//           </p>
//         )}

//         {/* ✅ Success */}
//         {success && (
//           <motion.p
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="text-green-200 text-xs sm:text-sm text-center mb-2"
//           >
//             ✅ OTP Verified!
//           </motion.p>
//         )}

//         {/* 🔁 Resend */}
//         <div className="text-center text-xs sm:text-sm mb-4">
//           {resendActive ? (
//             <button
//               onClick={handleResend}
//               disabled={resending}
//               className="underline flex items-center justify-center gap-2"
//             >
//               {resending && (
//                 <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               )}
//               {resending ? "Sending..." : "Resend OTP"}
//             </button>
//           ) : (
//             <span className="text-center">Resend OTP {timeLeft}s</span>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading || otp.length !== length}
//           className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 transition text-sm sm:text-base
//             ${
//               loading || otp.length !== length
//                 ? "bg-blue-300 cursor-not-allowed"
//                 : "bg-white text-blue-600 hover:bg-blue-100"
//             }`}
//         >
//           {loading && (
//             <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           )}
//           {loading ? "Verifying..." : "Submit OTP"}
//         </button>
//       </motion.div>
//     </div>
//   );
// }


"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OTPInput({ length = 6, onChange }) {
  const inputs = useRef([]);
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ⏱️ Timer
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendActive, setResendActive] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendActive(true);
    }
  }, [timeLeft]);

  // 🔁 Resend OTP
  const handleResend = async () => {
    setResending(true);

    setTimeout(() => {
      setTimeLeft(30);
      setResendActive(false);
      setError("");
      setSuccess(false);
      setOtp("");

      inputs.current.forEach((input) => {
        if (input) input.value = "";
      });

      setResending(false);
    }, 1500);
  };

  // Input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const otpArray = inputs.current.map((input) => input?.value || "");
    otpArray[index] = value;

    const newOtp = otpArray.join("");
    setOtp(newOtp);
    onChange && onChange(newOtp);

    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  // Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const otpArray = pasteData.split("");
    otpArray.forEach((char, i) => {
      if (inputs.current[i]) inputs.current[i].value = char;
    });

    const newOtp = otpArray.join("");
    setOtp(newOtp);
    onChange && onChange(newOtp);

    inputs.current[otpArray.length - 1]?.focus();
  };

  // ✅ Auto submit
  useEffect(() => {
    if (otp.length === length) {
      handleSubmit();
    }
  }, [otp]);

  // Submit OTP
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (otp === "123456") {
        setSuccess(true);

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        setError("Invalid OTP. Try again!");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center mt-20 sm:mt-10 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-600 text-white mt-20 rounded-2xl shadow-lg p-5 sm:p-6 w-full max-w-xs sm:max-w-sm"
      >
        <h1 className="text-center text-xl sm:text-2xl underline mb-5 sm:mb-6 font-cinzel font-bold">
          Coffee & Joy
        </h1>

        {/* OTP Inputs */}
        <div
          className="flex justify-center gap-2 sm:gap-3 mb-4"
          onPaste={handlePaste}
        >
          {[...Array(length)].map((_, i) => (
            <motion.input
              key={i}
              whileFocus={{ scale: 1.1 }}
              type="text"
              inputMode="numeric"
              maxLength="1"
              ref={(el) => (inputs.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-9 h-10 sm:w-11 sm:h-12 text-sm sm:text-lg text-center border border-blue-200 rounded-lg 
                         bg-white text-black focus:ring-2 focus:ring-blue-300 outline-none"
            />
          ))}
        </div>

        {/* ❌ Error */}
        {error && (
          <p className="text-red-200 text-xs sm:text-sm text-center mb-2">
            {error}
          </p>
        )}

        {/* ✅ Success */}
        {success && (
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-200 text-xs sm:text-sm text-center mb-2"
          >
            ✅ OTP Verified!
          </motion.p>
        )}

        {/* 🔁 Resend (CENTERED + ANIMATED) */}
        <div className="flex justify-center text-xs sm:text-sm mb-4 ">
          {resendActive ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleResend}
              disabled={resending}
              className="underline flex items-center justify-center gap-2"
            >
              {resending && (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {resending ? "Sending..." : "Resend OTP"}
            </motion.button>
          ) : (
            <span className="text-center w-full">
              Resend OTP in {timeLeft}s
            </span>
          )}
        </div>

        {/* Submit Button (MOTION) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{
            scale: otp.length === length && !loading ? 1.03 : 1,
          }}
          onClick={handleSubmit}
          disabled={loading || otp.length !== length}
          className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 transition text-sm sm:text-base
            ${
              loading || otp.length !== length
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
          {loading ? "Verifying..." : "Submit OTP"}
        </motion.button>
      </motion.div>
    </div>
  );
}