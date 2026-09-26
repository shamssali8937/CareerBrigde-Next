"use client";
import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function TextInput({
  label,
  type = "text",
  required = false,
  className = "",
  helperText,
  error = false,
  sx = {},
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const isPassword = type === "password";

  return (
    <TextField
      label={label}
      type={isPassword ? (showPassword ? "text" : "password") : type}
      required={required}
      fullWidth
      variant="outlined"
      margin="normal"
      error={Boolean(error)}
      helperText={helperText}
      className={`w-full ${className}`}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          transition: "all 0.2s ease-in-out",
          "&:hover fieldset": {
            borderColor: "#6366f1",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4f46e5",
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4f46e5",
          fontWeight: 600,
        },
        ...sx,
      }}
      slotProps={{
        input: isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="small"
                    className="text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined,
      }}
      {...props}
    />
  );
}
