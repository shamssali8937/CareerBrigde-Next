"use client";

import { Button, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import TextInput from "@/components/TextInput";
import Layout from "@/layouts/Layout";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setEmail, setRole } from "@/redux/slices/signupSlice";
import { useRouter } from "next/navigation";

export default function Signup() {

  const dispatch=useDispatch();
  const router=useRouter();
  const reduxSignupData=useSelector((state)=>state.signup);

  const [data,setdata]=useState({
    email:reduxSignupData.email||"",
    role:reduxSignupData.role||""
  });

  const [clicked,setclicked]=useState({});
  const [opensnackbar,setopensackbar]=useState(false);
  const [snackbarmessage,setsnackbarmessage]=useState("");
  const [snackbarseverity,setsnackbarseverity]=useState("success");

  const handlechange=(e)=>{
    const {name,value}=e.target;
    setdata(prev=>({...prev,[name]:value}))
  };

  const [canGo,setCanGo]=useState(false);

   const handlesubmit=(e)=>{
      e.preventDefault();
   
     setclicked({email:true,role:true});
   
     const emailValid=/\S+@\S+\.com/.test(data.email);
   
     if(!data.email || !data.role || !emailValid){
       setsnackbarmessage("Enter valid Email and Role");
       setsnackbarseverity("error");
       setopensackbar(true);
       setCanGo(false);
       return;
     }
     dispatch(setEmail(data.email));
     dispatch(setRole(data.role));
     setCanGo(true);
     router.push("/Auth/SignupDetail");
   }

    const handlegooglesignup=(e)=>{
      e.preventDefault();
      if (!data.role) {
         setsnackbarmessage("Please enter your Role");
         setsnackbarseverity("error");
         setopensackbar(true);
         return;
      }
//   // redirect to backend Google OAuth route
//   window.location.href = `http://localhost:4321/auth/google/signup?role=${data.role}`;
//   console.log("loc",window.location.href);
         dispatch(setRole(data.role));
         setsnackbarmessage("Successfully signed");
         setsnackbarseverity("success");
         setopensackbar(true);
   }

  return (
    
 <Layout rightImage="/login.svg">
      <h2 className="font-[Open_Sans] text-black text-center font-bold text-2xl mt-2 mb-2">
        Welcome To CarreerBridge!
      </h2>
    <form  action="" className="w-full flex flex-col items-center">
    <div className="flex flex-col items-center w-full gap-4">   
         <TextInput label="Email" name="email" type="email" value={data.email} required onChange={handlechange} error={clicked.email&&!data.email} helperText={clicked.email&&!data.email?"Please Eneter email":""}/>   
      <div className="w-full flex flex-col text-black sm:justify-center items-center mt-3">
        <RadioGroup row defaultValue="jobseeker" name="role"  value={data.role} onChange={handlechange} className="!flex justify-between w-[70%]">
          <FormControlLabel value="jobseeker" control={<Radio color="primary" />} label="Job Seeker" />
          <FormControlLabel value="jobprovider" control={<Radio color="primary" />} label="Job Provider" />
        </RadioGroup>
        {clicked.role && !data.role && (
              <Typography
                variant="body2"
                sx={{ color: "error.main", fontSize: "13px", mt: 1 }}
              >
                Please select a role
              </Typography>
            )}
      </div>
    </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handlesubmit}
        fullWidth
        sx={{ background: "#956fe2", mt: 3, py: 1.5, fontSize: "16px", width: "70%" }}
      >
        Sign Up
      </Button>
      <div className="flex justify-center mt-4 w-[70%]">
        <Button
          variant="outlined"
          startIcon={<img
              src="/google.svg"
              alt="Google Logo"
              style={{ width: 20, height: 20 }}
            />}
          onClick={handlegooglesignup}
          sx={{
            textTransform: "none",
            borderColor: "#ccc",
            color: "#555",
            width: "100%",
            py: 1.2,
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          Continue with Google
        </Button>
      </div>

     </form>
      <p className="text-center mt-9  text-[#A8A8A8]">
        Already have an Account?{" "}
        <Link href="/Auth/Signin" className="underline text-[#956fe2]">
          signin
        </Link>
      </p>
      <CustomizedSnackbars
                    open={opensnackbar}
                    message={snackbarmessage}
                    severity={snackbarseverity}
                    onClose={() => setopensackbar(false)}
                  />
    </Layout>
  );
}