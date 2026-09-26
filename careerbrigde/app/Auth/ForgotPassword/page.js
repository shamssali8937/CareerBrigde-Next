"use client";

import React, { useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Layout from "@/layouts/Layout";
import NewPasswordBox from "@/components/NewPasswordBox";
import { useSelector, useDispatch } from "react-redux";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { setEmail } from "@/redux/slices/signupSlice";
import { Button } from "@mui/material";

export default function ForgotPassword() {
  const [opensnackbar, setOpensnackbar] = useState(false);
  const [snackbarmessage, setSnackbarmessage] = useState("");
  const [snackbarseverity, setSnackbarseverity] = useState("success");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const Email = useSelector((state) => state.signup.email);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const verifyOtp = async () => {
    if (otp.length !== 4) return;
    const forgetToken = localStorage.getItem("forgetToken");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/VerifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${forgetToken}`,
        },
        body: JSON.stringify({ otp: otp }),
      });

      const result = await response.json();
      if (!response.ok || result?.data?.success === false) {
        setIsVerified(false);
        setSnackbarmessage(result?.message || "OTP verification failed");
        setSnackbarseverity("error");
        setOpensnackbar(true);
        return;
      }
      setIsVerified(true);
      setSnackbarmessage("OTP verified successfully");
      setSnackbarseverity("success");
      setOpensnackbar(true);
    } catch (err) {
      if (err.response?.status === 401) {
        setSnackbarmessage("OTP Expired");
        setSnackbarseverity("error");
        setOpensnackbar(true);
        return;
      }
      setSnackbarmessage("Verification failed. Please check your code.");
      setSnackbarseverity("error");
      setOpensnackbar(true);
    }
  };

  const sendOtpToEmail = async () => {
    try {
      const email = Email;
      if (!email) {
        setSnackbarmessage("Please enter your email first");
        setSnackbarseverity("error");
        setOpensnackbar(true);
        return;
      }

      dispatch(setEmail(email));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        let result = await response.json();
        const { forgotToken, message } = result;
        const otpCode = message;

        localStorage.setItem("forgetToken", forgotToken);

        const mailMessage = {
          to: email,
          subject: "Password Reset OTP – CareerBridge",
          message: `Dear User,\n\nWe received a request to reset your CareerBridge account password.\n\nYour One-Time Password (OTP) is: ${otpCode}\n\nThis OTP is valid for 5 minutes. Do not share this code with anyone.\n\nBest regards,\nCareerBridge Security Team`,
        };

        const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendMail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailMessage),
        });

        if (mailResponse.ok) {
          setSnackbarmessage("A new OTP has been sent to your email");
          setSnackbarseverity("success");
          setOpensnackbar(true);
          setTimer(60);
          setResendEnabled(false);
        } else {
          setSnackbarmessage("Error sending OTP email");
          setSnackbarseverity("error");
          setOpensnackbar(true);
        }
      } else {
        throw new Error("Failed to generate OTP");
      }
    } catch (err) {
      console.log("OTP mail error:", err);
      setSnackbarmessage("Could not send OTP. Please try again.");
      setSnackbarseverity("error");
      setOpensnackbar(true);
    }
  };

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
      <div className="w-full flex flex-col items-center text-center">
        {!isVerified ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Verify OTP
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Enter the 4-digit verification code sent to your registered email
              </p>
            </div>

            <div className="w-full my-4 flex justify-center">
              <MuiOtpInput
                value={otp}
                onChange={handleChange}
                length={4}
                sx={{
                  gap: 1.5,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "20px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#4f46e5",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </div>

            <Button
              onClick={verifyOtp}
              disabled={otp.length !== 4}
              fullWidth
              variant="contained"
              sx={{
                background:
                  otp.length === 4
                    ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                    : "#e2e8f0",
                color: otp.length === 4 ? "#ffffff" : "#94a3b8",
                borderRadius: "12px",
                py: 1.4,
                mt: 2,
                fontSize: "14px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow:
                  otp.length === 4 ? "0 4px 14px 0 rgba(79, 70, 229, 0.3)" : "none",
                "&:hover": {
                  background:
                    otp.length === 4
                      ? "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)"
                      : "#e2e8f0",
                },
              }}
            >
              Verify & Proceed
            </Button>

            <div className="flex flex-col items-center justify-center space-y-2 mt-6 pt-4 border-t border-slate-100 w-full">
              <p className="text-slate-500 text-xs">
                Code expires in:{" "}
                <span className="font-semibold text-slate-800">{formatTime(timer)}</span>
              </p>

              <button
                type="button"
                onClick={sendOtpToEmail}
                disabled={!resendEnabled}
                className={`text-xs font-semibold transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                  resendEnabled
                    ? "text-indigo-600 hover:text-indigo-700 hover:underline"
                    : "text-slate-400 cursor-not-allowed"
                }`}
              >
                Resend Code
              </button>
            </div>
          </>
        ) : (
          <NewPasswordBox />
        )}
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