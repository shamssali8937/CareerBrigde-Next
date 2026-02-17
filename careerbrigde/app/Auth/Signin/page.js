"use client";
import Layout from "@/layouts/Layout";
import TextInput from "@/components/TextInput";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { Button,  } from "@mui/material";
import Link from "next/link";
import {useState} from "react"

export default function Signin(){

    const [opensnackbar, setopensackbar] = useState(false);
    const [snackbarmessage, setsnackbarmessage] = useState("");
    const [snackbarseverity, setsnackbarseverity] = useState("success");
    
    const [data, setData] = useState({
        email: "",
        password: "",
      });

      const handleFieldDataChange=(e)=>{
     const {name,value}=e.target;
     setData((previous)=>({
       ...previous,
      [name]:value
     }))
   };  
      
      const [clicked, setClicked] = useState({
        email: false,
        password: false,
      });


    const handlesignin = (e) => {
        e.preventDefault();
    
        
        setClicked({
          email: true,
          password: true,
        });
    
        
        if (!data.email || !data.password) {
          setsnackbarmessage("Please fill all required fields");
          setsnackbarseverity("error");
          setopensackbar(true);
          return;
        }
    
        
        setsnackbarmessage(`Welcome, ${data.email}!`);
        setsnackbarseverity("success");
        setopensackbar(true);
     };


     const sendOtpToEmail = () => {
        if (!data.email) {
          setsnackbarmessage("Please enter your email first");
          setsnackbarseverity("error");
          setopensackbar(true);
          return;
        }
        setsnackbarmessage(`OTP sent to ${data.email}`);
        setsnackbarseverity("success");
        setopensackbar(true);
      };
    
      
      const handlegooglelogin = () => {
        setsnackbarmessage("Google login clicked");
        setsnackbarseverity("info");
        setopensackbar(true);
      };

    return(
        <Layout rightImage="/login.svg">
           
           <h2 className="font-[Open_Sans] text-center font-bold text-2xl mt-2 mb-2">
                Welcome Back!
              </h2>
        
              <TextInput label="Email" type="email" name="email" value={data.email} onChange={handleFieldDataChange} required error={clicked.email&&!data.email} helperText={clicked.email&&!data.email?"Please Eneter email":""} />
              <TextInput label="Password" type="password" name="password" value={data.password} required onChange={handleFieldDataChange} error={clicked.password&&!data.password} helperText={clicked.password&&!data.password?"Password is required":""}/>
               
                <div className="flex justify-right mt-5">
                <a onClick={sendOtpToEmail} className="text-[#956fe2] font-bold font-medium text-sm underline cursor-pointer">
                  Forgot password ?
                </a>
              </div>
        
              <Button
               type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlesignin}
                // component={Link}
                // to={canGo ? redirectPath : "#"}
                sx={{ background: "#956fe2", mt: 3, py: 1.5, fontSize: "16px", width: "70%" }}
              >
                Sign In
              </Button>
        
             
        
              <div className="flex justify-center mt-4 w-[70%]">
                <Button
                  variant="outlined"
                  startIcon={<img
                      src="/google.svg"
                      alt="Google Logo"
                      style={{ width: 20, height: 20 }}
                    />}
                  onClick={handlegooglelogin} 
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
        
              <p className="text-center mt-9 font-bold text-[#A8A8A8]">
                Dont have an Account?{" "}
                <Link href="/Signup" className="underline text-[#956fe2]">
                  signup
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