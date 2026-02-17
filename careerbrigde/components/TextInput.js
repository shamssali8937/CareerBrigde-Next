"use client";
import { useState } from "react";
import {
  TextField,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function TextInput({
  label,
  type = "text",
  required = false,
  className = "",
  helperText,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  if (type === "password") {
    return (
      <FormControl
        fullWidth
        variant="standard"
        margin="normal"
        sx={{ width: "70%" }}
        className={className}
      >
        <InputLabel>{label}</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          required={required}
          {...props} // helperText is removed from here
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {helperText && (
          <p style={{ color: "red", fontSize: "0.75rem", marginTop: 4 }}>
            {helperText}
          </p>
        )}
      </FormControl>
    );
  }

  return (
    <TextField
      label={label}
      type={type}
      required={required}
      fullWidth
      sx={{ width: "70%" }}
      className={className}
      margin="normal"
      {...props}
      helperText={helperText}
      variant="standard"
    />
  );
}
