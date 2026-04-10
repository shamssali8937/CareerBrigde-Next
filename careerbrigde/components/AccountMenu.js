"use client"
import * as React from "react";
import {
    Box,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
} from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from "react-redux";
import { resetUserDetail, setUser } from "@/redux/slices/userDetailSlice";
import { useRouter } from "next/navigation";
import {useState, useEffect} from "react"
import { resetSignup } from "@/redux/slices/signupSlice";


export default function AccountMenu({ onProfileClick }) {
  
  const router=useRouter();
  const dispatch=useDispatch();
  const statedata=useSelector((state)=>state.signup);
  const stateUserdata=useSelector((state)=>state.userDetail.user);
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
    if (onProfileClick) onProfileClick(); // trigger drawer open
  };

 const fetchUserForPhoto=async()=>{   /// fetching use and disapcting data in redux store so on every reload using useEffect to load image or profile photo
     try {
          const token=localStorage.getItem("token");

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Protected/GetSpecificUser`,{
           method:"GET",
           headers:{
             Authorization: `Bearer ${token}`,
           }
          });

          if (response.ok) {
            const result=await response.json()
            dispatch(setUser(result.user.users));
          }
        } catch (err) {
          console.log("Provider fetch error:", err);
        }
  }
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    dispatch(resetSignup()); 
    dispatch(resetUserDetail()); 
    router.push("/Auth/Signin") 
  };

  useEffect(()=>{
   fetchUserForPhoto();
  },[])

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
            //  src={URL.createObjectURL(statedata.details.img)||`${backendUrl}${stateUserdata.photo}`||""} 
            //  src={statedata.details.img||`${backendUrl}${stateUserdata.photo}`||""}
            src={stateUserdata?.photo ? stateUserdata.photo?.url : (statedata.details?.img || "")}
             alt="Profile" 
            sx={{ width: 32, height: 32 }}>M</Avatar>
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
        PaperProps={{
          sx: {
            width: 200,   
            minWidth: 180,
            mt:2 
          }
        }}
      >
        <MenuItem onClick={handleProfile}> <Avatar sx={{ width: 24, height: 24, fontSize: 14, mr: 1 }}/> Profile</MenuItem>
        <MenuItem onClick={handleLogout}>
        <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
