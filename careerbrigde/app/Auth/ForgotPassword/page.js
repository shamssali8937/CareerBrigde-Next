"use client";

import React, { useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Layout from "@/layouts/Layout";
import { Typography } from "@mui/material";
import NewPasswordBox from "@/components/NewPasswordBox";
import { useSelector } from "react-redux";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";

export default function Otp() {
  const [opensnackbar, setOpensnackbar] = useState(false);
  const [snackbarmessage, setSnackbarmessage] = useState("");
  const [snackbarseverity, setSnackbarseverity] = useState("success");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const Email = useSelector((state) => state.signup.email);

  // Handle OTP input change
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // Format timer display
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Mock verify OTP
  const verifyOtp = () => {
    if (otp.length !== 4) return;

    // For demo, assume OTP '1234' is correct
    if (otp === "1234") {
      setIsVerified(true);
      setSnackbarmessage("OTP verified successfully");
      setSnackbarseverity("success");
      setOpensnackbar(true);
    } else {
      setSnackbarmessage("Invalid OTP");
      setSnackbarseverity("error");
      setOpensnackbar(true);
    }
  };

  // Mock send OTP
  const sendOtpToEmail = () => {
    if (!Email) {
      setSnackbarmessage("Please enter your email first");
      setSnackbarseverity("error");
      setOpensnackbar(true);
      return;
    }

    // Simulate sending OTP
    setSnackbarmessage(`OTP sent to ${Email} (use 1234 to verify)`);
    setSnackbarseverity("success");
    setOpensnackbar(true);

    // Reset timer
    setTimer(60);
    setResendEnabled(false);
  };

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) {
      setResendEnabled(true);
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Layout rightImage="/landpagephoto.svg">
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm sm:max-w-md p-8 sm:p-10 bg-white rounded-2xl shadow-lg text-center">

          {!isVerified ? (
            <>
              <Typography variant="h5" className="!font-[Open_Sans] text-black !mb-2">
                Forgot Password
              </Typography>

              <Typography variant="body2" className="text-sm text-gray-500 !mb-6">
                Enter the 4-digit OTP sent to your registered email.
              </Typography>

              <MuiOtpInput
                value={otp}
                onChange={handleChange}
                length={4}
                className="flex justify-center gap-3 mb-8"
              />

              <button
                onClick={verifyOtp}
                disabled={otp.length !== 4}
                className={`w-full py-2.5 rounded-lg font-medium transition mb-4
                  ${otp.length === 4
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer animate-bounce"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Verify OTP
              </button>

              <div className="flex flex-col items-center justify-center space-y-4 mt-8">
                <p className="text-gray-700 font-medium text-lg">
                  Resend OTP in: <span className="font-bold">{formatTime(timer)}</span>
                </p>

                <button
                  onClick={sendOtpToEmail}
                  disabled={!resendEnabled}
                  className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-300 
                    ${resendEnabled ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                  Resend OTP
                </button>
              </div>
            </>
          ) : (
            <NewPasswordBox />
          )}

        </div>
      </div>

      <CustomizedSnackbars
        open={opensnackbar}
        message={snackbarmessage}
        severity={snackbarseverity}
        onClose={() => setOpensnackbar(false)}
      />
    </Layout>
  );
}