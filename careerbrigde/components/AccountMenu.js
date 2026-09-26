"use client";
import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetail, setUser } from "@/redux/slices/userDetailSlice";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { resetSignup } from "@/redux/slices/signupSlice";

export default function AccountMenu({ onProfileClick }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const statedata = useSelector((state) => state.signup);
  const stateUserdata = useSelector((state) => state.userDetail.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    if (onProfileClick) onProfileClick();
  };

  const fetchUserForPhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetSpecificUser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result?.user?.users) {
          dispatch(setUser(result.user.users));
        }
      }
    } catch (err) {
      console.log("User fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetSignup());
    dispatch(resetUserDetail());
    router.push("/Auth/Signin");
  };

  useEffect(() => {
    fetchUserForPhoto();
  }, []);

  const avatarSrc = stateUserdata?.photo?.url || statedata?.details?.img || "";
  const displayName = stateUserdata?.name || statedata?.details?.name || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              p: 0.5,
              border: "2px solid #e0e7ff",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "#4f46e5",
                transform: "scale(1.05)",
              },
            }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={avatarSrc}
              alt={displayName}
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#4f46e5",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {userInitial}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              width: 220,
              mt: 1.5,
              borderRadius: "16px",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)",
              border: "1px solid #e2e8f0",
              p: 0.5,
            },
          },
        }}
      >
        <div className="px-4 py-2 border-b border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Signed in as</p>
          <p className="text-sm font-semibold text-slate-800 truncate">{displayName}</p>
        </div>
        
        <MenuItem
          onClick={handleProfile}
          sx={{
            borderRadius: "10px",
            my: 0.5,
            fontSize: "14px",
            color: "#334155",
            "&:hover": { bgcolor: "#f1f5f9" },
          }}
        >
          <ListItemIcon sx={{ color: "#4f46e5", minWidth: 32 }}>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Profile Details
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            borderRadius: "10px",
            my: 0.5,
            fontSize: "14px",
            color: "#ef4444",
            "&:hover": { bgcolor: "#fef2f2" },
          }}
        >
          <ListItemIcon sx={{ color: "#ef4444", minWidth: 32 }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
