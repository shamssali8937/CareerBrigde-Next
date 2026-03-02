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
// import { setUser } from "../Redux/Slice/userDetailSlice";
// import { useEffect } from "react";
// import axios from "axios";
// import { resetSignup } from "../Redux/Slice/signupSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { resetUserDetail } from "../Redux/Slice/userDetailSlice";

export default function AccountMenu({ onProfileClick }) {
  
  const dispatch=useDispatch();
//   const navigate=useNavigate();
  const statedata=useSelector((state)=>state.signup);
//   const stateUserdata=useSelector((state)=>state.userDetail.user);
//   const backendUrl = "http://localhost:4321/";
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

//  const fetchUserForPhoto=async()=>{   /// fetching use and disapcting data in redux store so on every reload using useEffect to load image or profile photo
//      try {
//           const token=localStorage.getItem("token");

//           axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//           const response = await axios.get("http://localhost:4321/api/auth/specificUser");

//           if (response.status === 200) {
//             dispatch(setUser(response.data.user));
//           }
//         } catch (err) {
//           console.log("Provider fetch error:", err);
//         }
//   }
  const handleLogout = () => {
    // localStorage.removeItem("token"); 
    // dispatch(resetSignup()); 
    // dispatch(resetUserDetail()); 
    // navigate("/signin"); 
  };

//   useEffect(()=>{
//    fetchUserForPhoto();
//   },[])

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
            //src={stateUserdata?.photo ? `${backendUrl}${stateUserdata.photo}` : (statedata.details?.img || "")}
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
