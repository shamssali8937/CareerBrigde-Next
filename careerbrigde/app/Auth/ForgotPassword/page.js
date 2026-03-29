"use client";

import React, { useState, useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Layout from "@/layouts/Layout";
import { Typography } from "@mui/material";
import NewPasswordBox from "@/components/NewPasswordBox";
import { useSelector } from "react-redux";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { setEmail } from "@/redux/slices/signupSlice";
import { useDispatch } from "react-redux";

export default function Otp() {
  const [opensnackbar, setOpensnackbar] = useState(false);
  const [snackbarmessage, setSnackbarmessage] = useState("");
  const [snackbarseverity, setSnackbarseverity] = useState("success");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const dispatch=useDispatch();
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
  const verifyOtp =async () => {
    if (otp.length !== 4) return;
        const forgetToken=localStorage.getItem("forgetToken")
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Protected/VerifyOtp`, {
                  method:"POST",
                  headers:{
                         "Content-Type":"application/json",
                         Authorization: `Bearer ${forgetToken}`,
                    },
                  body:JSON.stringify({otp:otp})
                });
            const result=await response.json();    
          if(result.data.success === false){
            setIsVerified(false);
            setSnackbarmessage("OTP verification Failed");
            setSnackbarseverity("error");
            setOpensnackbar(true);
            return;
          }
          setIsVerified(true);
          setSnackbarmessage("OTP verified successfully");
          setSnackbarseverity("success");
          setOpensnackbar(true);
        } catch (err) {
          if(err.response?.status===401){
          setSnackbarmessage("OTP Expired");
          setSnackbarseverity("error");
          setOpensnackbar(true);
          return;
          }
          setSnackbarmessage(err.response?.data?.message || "Verification failed");
          setSnackbarseverity("error");
          setOpensnackbar(true);
        }
  };

  // Mock send OTP
  const sendOtpToEmail =async () => {
    try {
          const email = Email;
          if (!email) {
            setSnackbarmessage("Please enter your email first");
            setSnackbarmessage("error");
            setOpensnackbar(true);
            return;
          }
      
          dispatch(setEmail(email));
          
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendOtp`, {
            method:"POST",
            headers:{
                   "Content-Type":"application/json",
              },
            body:JSON.stringify({email:email})
          });
      
          if (response.ok) {
            let result=await response.json();
            const { forgotToken, message } = result; // message contains OTP
            const otp = message;
      
            localStorage.setItem("forgetToken", forgotToken);
      
              const mailMessage = {
                        to: email,
                        subject: "Password Reset OTP – Action Required",
                        message: `Dear User,\n\nWe received a request to reset the password for your account.\n\nPlease use the following One-Time Password (OTP) to proceed with resetting your password:\n\nOTP: ${otp}\n\nThis OTP is valid for the next 5 minutes.\nDo not share this code with anyone for security reasons.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nSupport Team`
                      };
            console.log(mailMessage)
            const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/SendMail`,{
              method:"POST",
              headers:{
                   "Content-Type":"application/json",
              },
              body:JSON.stringify(mailMessage)
            });
      
            if (mailResponse.ok) {
              setSnackbarmessage("OTP sent to your email");
              setSnackbarseverity("success");
              setOpensnackbar(true);
              setTimer(60);
              setResendEnabled(false);
            } else {
              setSnackbarmessage("Error In OTP sent to your email");
              setSnackbarseverity("error");
              setOpensnackbar(true);
            }
          } else {
            throw new Error("Failed to generate OTP");
          }
        } catch (err) {
          console.log("OTP mail error:", err);
          // setSnackbarmessage(err.response?.data?.message || "Failed to send OTP. Try again.");
          // setSnackbarseverity("error");
          // setOpensnackbar(true);
        }
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