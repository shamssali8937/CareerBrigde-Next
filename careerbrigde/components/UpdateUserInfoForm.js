"use client";

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
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
    <Box className="mt-4 mb-8 bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <Typography variant="h6" className="!font-sans !font-bold text-slate-900 !mb-4">
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&.Mui-focused fieldset": {
                borderColor: "#4f46e5",
              },
            },
          }}
        />

        <TextField
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              "&.Mui-focused fieldset": {
                borderColor: "#4f46e5",
              },
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={() => onSubmit(form)}
          sx={{
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            borderRadius: "12px",
            py: 1.4,
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
              boxShadow: "0 6px 20px 0 rgba(79, 70, 229, 0.4)",
            },
          }}
        >
          Save Account Changes
        </Button>
      </div>
    </Box>
  );
};

export default UpdateUserInfoForm;