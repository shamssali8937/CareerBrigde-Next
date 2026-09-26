"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

export default function CustomizedSnackbars({
  open,
  message,
  severity = "success",
  autoHideDuration = 3500,
  onClose,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    if (onClose) onClose();
  };

  const getSeverityStyles = () => {
    switch (severity) {
      case "error":
        return {
          bgcolor: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
          "& .MuiAlert-icon": { color: "#ef4444" },
        };
      case "warning":
        return {
          bgcolor: "#fffbeb",
          color: "#92400e",
          border: "1px solid #fde68a",
          "& .MuiAlert-icon": { color: "#f59e0b" },
        };
      case "info":
        return {
          bgcolor: "#eff6ff",
          color: "#1e40af",
          border: "1px solid #bfdbfe",
          "& .MuiAlert-icon": { color: "#3b82f6" },
        };
      case "success":
      default:
        return {
          bgcolor: "#f0fdf4",
          color: "#166534",
          border: "1px solid #bbf7d0",
          "& .MuiAlert-icon": { color: "#10b981" },
        };
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      sx={{ mt: 3, mr: { xs: 1, sm: 2 } }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="standard"
        sx={{
          width: "100%",
          minWidth: 280,
          maxWidth: 420,
          borderRadius: "16px",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
          fontWeight: 600,
          fontSize: "13.5px",
          py: 1,
          px: 2,
          alignItems: "center",
          ...getSeverityStyles(),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
