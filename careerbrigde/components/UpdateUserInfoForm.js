"use client"

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Divider
} from "@mui/material";

const UpdateUserInfoForm = ({ userData, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box className="mt-4 mb-8 bg-white p-6 rounded-4xl shadow-lg border border-gray-100">
      <Typography variant="h6" className="!font-sans !font-bold text-gray-800 !mb-4">
        Account Information
      </Typography>
      
      <div className="space-y-4">
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          className="!mb-3"
        />

        <TextField
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          className="!mb-3"
        />

        {/* <TextField
          label="New Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          fullWidth
          placeholder="Leave blank to keep current"
          variant="outlined"
          className="!mb-3"
        /> */}

        <Button
          variant="contained"
          fullWidth
          onClick={() => onSubmit(form)}
          className="!bg-[#956fe2] !py-3 !rounded-xl normal-case text-white font-semibold"
        >
          Save Account Changes
        </Button>
      </div>
    </Box>
  );
};

export default UpdateUserInfoForm;