"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/layouts/Layout";
import TextInput from "@/components/TextInput";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { Button,  } from "@mui/material";
import Link from "next/link";
import {useState, useEffect} from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setDetails, setEmail, setRole, setSeekerInfo } from "@/redux/slices/signupSlice";
import { setProviderDetail, setUser } from "@/redux/slices/userDetailSlice";

export default function Signin(){

    const searchParams = useSearchParams()
    const [opensnackbar, setopensackbar] = useState(false);
    const [snackbarmessage, setsnackbarmessage] = useState("");
    const [snackbarseverity, setsnackbarseverity] = useState("success");

    const dispatch=useDispatch();
    const router=useRouter();
    const reduxSignupData=useSelector((state)=>state.signup)
    
    const [data, setData] = useState({
        email: reduxSignupData.email||"",
        password:"",
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


    const  handlesignin =async (e) => {
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

        try{
             const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/Signin`,{
               method: "POST",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify({
                 email: data.email,
                 password: data.password,
               }),
             });
             const result= await response.json();

             if(!response.ok){
              // throw new Error(result.message || "Login failed");
              setsnackbarmessage("Login Failed");
              setsnackbarseverity("error");
             }

             localStorage.setItem("token", result.AccessToken);
            //  console.log("Tokenbefre",result.User.AccessToken);
             dispatch(setEmail(data.email));
             dispatch(setRole(result.User.role))
             dispatch(setUser(result.User))
             dispatch(setDetails(result.User))
            // console.log("SigINROle",result.User.role)
             setsnackbarmessage(`Welcome, ${data.email}!`);
             setsnackbarseverity("success");
             const token = localStorage.getItem("token");
             if(result.User.role==="jobseeker"){
              try {   
                  // console.log("Token",token);
                   const providerRes = await fetch(
                     `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetSeekerProfile`,{
                      method:"GET",
                      headers:{
                        Authorization: `Bearer ${token}`,
                      }
                     }
                   );

                   const seekerData= await providerRes.json();
         
                   if (providerRes.ok) {
                     dispatch(setSeekerInfo(seekerData.data.seeker));
                     console.log("Provider",seekerData.data.seeker);
                   }
                 } catch (err) {
                   console.log("Provider fetch error:", err);
                 }


                router.push("/Seeker/HomePage");
             }else{
                 try {   
                  // console.log("Token",token);
                   const providerRes = await fetch(
                     `${process.env.NEXT_PUBLIC_API_URL}/Protected/GetProviderProfile`,{
                      method:"GET",
                      headers:{
                        Authorization: `Bearer ${token}`,
                      }
                     }
                   );

                   const providerData= await providerRes.json();
         
                   if (providerRes.ok) {
                     dispatch(setProviderDetail(providerData.data.provider));
                     console.log("Provider",providerData.data.provider);
                   }
                 } catch (err) {
                   console.log("Provider fetch error:", err);
                 }
                  router.push("/Provider/HomePage");
             }
          setopensackbar(true);     

        }catch(err){
          console.log(err);
           setsnackbarmessage(err.message);
           setsnackbarseverity("error");
            setopensackbar(true);
        }
   
        // setopensackbar(true);
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
        document.cookie = `oauth_type=login; path=/; max-age=300`;
        signIn("google", {
          callbackUrl: "/Auth/OAuthRedirectPage", // e.g., "/Protected", "/Dashboard", or "/"
        });
        // setsnackbarmessage("Google login clicked");
        // setsnackbarseverity("info");
        // setopensackbar(true);
      };
      
      useEffect(()=>{
        const error = searchParams.get("error");
        if (error === "AccessDenied") {
          setsnackbarmessage("Account not found. Please sign up first!");
          setsnackbarseverity("error");
          setopensackbar(true);
        }

        if (error === "UseEmail") {
        setsnackbarmessage("This email is already registered. Please sign in with your email and password.");
        setsnackbarseverity("warning"); 
        setopensackbar(true);
        }

      },[searchParams])

    return(
        <Layout rightImage="/login.svg">
           
           <h2 className="font-[Open_Sans] text-center text-black font-bold text-2xl mt-2 mb-2">
                Welcome Back!
              </h2>
        
              <TextInput label="Email" type="email" name="email" value={data.email} onChange={handleFieldDataChange} required error={clicked.email&&!data.email} helperText={clicked.email&&!data.email?"Please Eneter email":""} />
              <TextInput label="Password" type="password" name="password" value={data.password} required onChange={handleFieldDataChange} error={clicked.password&&!data.password} helperText={clicked.password&&!data.password?"Password is required":""}/>
               
                <div className="flex justify-right mt-5">
                <a onClick={sendOtpToEmail} className="text-[#956fe2] font-bold !font-[Open_Sans] text-sm underline cursor-pointer">
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
                // sx={{ background: "#956fe2", mt: 3, py: 1.5, fontSize: "16px", width: "70%" }}
                className="!mt-3 !font-[Open_Sans] !w-[70%] !bg-[#a78cdd] hover:!bg-[#8e6fc5] text-white !rounded-full !px-6 !py-2 !text-sm font-semibold !transition-all duration-300 hover:!scale-105 !shadow-[0_4px_14px_0_rgba(167,140,221,0.39)] hover:!shadow-[#a78cdd]/50"
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
                  className="!font-[Open_Sans] !rounded-full"
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
        
              <p className="font-[Open_Sans] text-center mt-9 font-bold text-[#A8A8A8]">
                Dont have an Account?{" "}
                <Link href="/Auth/Signup" className="!font-[Open_Sans] underline text-[#956fe2]">
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