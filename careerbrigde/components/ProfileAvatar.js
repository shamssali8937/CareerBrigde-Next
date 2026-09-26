"use client";
import { useEffect, useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ProfileAvatar({ file, onChange, size = 96 }) {
  const [profilePic, setProfilePic] = useState(
    typeof file === "string" ? file : file?.url || ""
  );

  const handleUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setProfilePic(url);
      if (onChange) onChange(selectedFile);
    }
  };

  useEffect(() => {
    if (typeof file === "string") {
      setProfilePic(file);
    } else if (file?.url) {
      setProfilePic(file.url);
    } else if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className="relative inline-flex items-center justify-center my-2">
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: "#eef2ff",
          color: "#4f46e5",
          fontWeight: 700,
          fontSize: `${size * 0.4}px`,
          boxShadow: "0 4px 14px -2px rgba(79, 70, 229, 0.2)",
          border: "3px solid #ffffff",
        }}
        src={profilePic}
        alt="Profile Picture"
      />
      <Tooltip title="Upload photo">
        <IconButton
          component="label"
          size="small"
          aria-label="Upload photo"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "#4f46e5",
            color: "#ffffff",
            boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)",
            "&:hover": {
              bgcolor: "#4338ca",
              transform: "scale(1.08)",
            },
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            width: 32,
            height: 32,
          }}
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleUpload}
          />
          <PhotoCamera sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
