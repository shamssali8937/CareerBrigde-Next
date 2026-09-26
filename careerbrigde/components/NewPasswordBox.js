"use client";

import React, { useState } from "react";
import TextInput from "./TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function NewPasswordBox() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    try {
      const forgetToken = localStorage.getItem("forgetToken");
      if (!forgetToken) {
        setError("Session expired. Please request a new OTP.");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Protected/ResetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${forgetToken}`,
          },
          body: JSON.stringify({ password: password }),
        }
      );

      if (!response.ok) {
        throw new Error("Password reset failed. Please try again.");
      }

      setSuccess(true);
      localStorage.removeItem("forgetToken");
      setTimeout(() => {
        router.push("/Auth/Signin");
      }, 1500);
    } catch (err) {
      setError(err.message || "Password reset failed");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Set New Password
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Enter and confirm your new account password
        </p>
      </div>

      <div className="w-full space-y-3 mb-6">
        <TextInput
          label="New Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextInput
          label="Confirm New Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={Boolean(error)}
          helperText={error}
        />
      </div>

      {!success ? (
        <Button
          onClick={handleSubmit}
          disabled={!password || !confirmPassword}
          fullWidth
          variant="contained"
          sx={{
            background:
              password && confirmPassword
                ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
                : "#e2e8f0",
            color: password && confirmPassword ? "#ffffff" : "#94a3b8",
            borderRadius: "12px",
            py: 1.4,
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow:
              password && confirmPassword
                ? "0 4px 14px 0 rgba(79, 70, 229, 0.3)"
                : "none",
            "&:hover": {
              background:
                password && confirmPassword
                  ? "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)"
                  : "#e2e8f0",
            },
          }}
        >
          Update Password
        </Button>
      ) : (
        <div className="text-center w-full py-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <p className="text-emerald-700 font-semibold text-sm mb-3">
            ✓ Password updated successfully! Redirecting...
          </p>
          <Link
            href="/Auth/Signin"
            className="inline-block px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Sign In
          </Link>
        </div>
      )}
    </div>
  );
}