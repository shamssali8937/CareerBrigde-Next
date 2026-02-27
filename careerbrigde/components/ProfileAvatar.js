"use client"
import { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ProfileAvatar({ file,onChange }) {
  const [profilePic, setProfilePic] = useState(file);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
      if (onChange) onChange(file); 
    }
  };

  useEffect(() => {
    setProfilePic(file);
  }, [file]);

  return (
    <>
      <Avatar
        sx={{ width: 90, height: 90, bgcolor: "#e0e0e0" }}
        src={profilePic}
        alt="Profile Picture"
      />
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
      >
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleUpload}
        />
        <PhotoCamera />
      </IconButton>
    </>
  );
}

