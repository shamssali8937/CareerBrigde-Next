"use client";

import React, { useState } from "react";
import { Typography } from "@mui/material";
import TextInput from "../components/TextInput";
import Link from "next/link";

export default function NewPasswordBox() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // Mock success since we are not using backend
    setSuccess(true);
    localStorage.removeItem("forgetToken");
  };

  return (
    <>
      <Typography variant="h5" className="!font-[Open_Sans] text-black !mb-2">
        Set New Password
      </Typography>

      <Typography variant="body2" className="!font-[Open_Sans] text-black text-sm text-gray-500 !mb-6">
        Enter and confirm your new password.
      </Typography>

      <div className="space-y-4 mb-8">
        <TextInput
          label="New Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextInput
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={error}
        />
      </div>

      {!success ? (
        <button
          onClick={handleSubmit}
          className={`w-[70%] py-2.5 rounded-lg font-medium transition ${password && confirmPassword? "bg-blue-600 text-white hover:bg-blue-700": "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!password || !confirmPassword}
        >
          Update Password
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-green-600 font-semibold">
            Password updated successfully!
          </p>
          <Link
            href="/Auth/Signin"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Sign In
          </Link>
        </div>
      )}
    </>
  );
}