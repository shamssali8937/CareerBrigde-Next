"use client"
import { Button } from "@mui/material";
import TextInput from "@/components/TextInput";
import ProfileAvatar from "@/components/ProfileAvatar";
import  Link   from "next/link";
import Layout from "@/layouts/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDetails } from "@/redux/slices/signupSlice";
import CustomizedSnackbars from "@/components/CustomizedSnackbars";
import { useRouter } from "next/navigation";

function SignUpDetail() {
  
  const [opensnackbar,setopensackbar]=useState(false);
  const [snackbarmessage,setsnackbarmessage]=useState("");
  const [snackbarseverity,setsnackbarseverity]=useState("success");
  const router=useRouter();
  const [clicked,setclicked]=useState({});
  const dispatch=useDispatch();
  const statedata=useSelector((state)=>state.signup);
  const role=statedata.role;



  const [data,setdata]=useState({
    name:statedata.details.name||"",
    phone:statedata.details.phone||"",
    password:"",
    password2:"",
    img:statedata.details.img||""
  })

  
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setdata((previous)=>({
      ...previous,
      [name]:value
    }))
  };  
  
  const handleImageChange = (file) => {
    const url = URL.createObjectURL(file);
       setdata((prev) => ({
         ...prev,
         img: url, 
         file: file   
       })); 
     };
     
     const handleback=()=>{
      dispatch(setDetails({name:data.name,img:data.img}));
      router.push("/Auth/Signup");
     }
     
     const handlesubmit=(e)=>{
      e.preventDefault();
      setclicked({
          name:true,
          password:true,
          password2:true,
          img:true
        })
       if(data.name&&data.password&&data.password2&&data.img&&data.password===data.password2)
    {
        //    const User = new FormData();
        //    User.append("name", data.name);
        //    User.append("email", statedata.email);
        //    User.append("role", statedata.role);
        //    User.append("password", data.password);
        //    User.append("photo", data.file);
        //    axios.post("http://localhost:4321/api/users/createUser",User).then((response)=>{
        //     if(response.status===200)
        //     {
        //       console.log("user created",response.data.user)
        //       localStorage.setItem("accessToken",response.data.accessToken);
        //     }
        //     else
        //     {
        //       console.log("Erorr in creating user")
        //     }
        //   }).catch((err) => console.log(err));
      console.log("ROLE:", role); 
      dispatch(setDetails({name:data.name,img:data.img}));
      setsnackbarmessage("succuss signedUP");
      setsnackbarseverity("success");
      setopensackbar(true);
      
      if (role === "jobseeker") {
      router.push("/Seeker/SignupSeeker");
      } else {
        router.push("/Auth/SignupDetail");
      }
      console.log(statedata.details);
      
    //  setIsValid(true);
      
    }
   }

  return (
     <Layout rightImage="/login.svg">
       <form onSubmit={handlesubmit} className="flex flex-col items-center w-full mt-6">
          
           <div className="flex flex-col items-center">
            <ProfileAvatar file={data.img} onChange={handleImageChange} />
            {
              clicked.img&&!data.img&&(
                <p className="text-red-500 text-sm mt-1">
                  Please upload a profile picture
                </p>
              )
            }
           </div>
            <TextInput label="Name" id="name" name="name" type="text" value={data.name} required onChange={handlechange} error={clicked.name&&!data.name} helperText={clicked.name&&!data.name?"Name is required":""} />
            <TextInput label="Password" name="password" type="password" value={data.password} required onChange={handlechange} error={clicked.password&&!data.password} helperText={clicked.password&&!data.password?"Password is required":""}/> 
            <TextInput label="Confirm Password" name="password2" type="password" value={data.password2} required onChange={handlechange} error={clicked.password2&&!data.password2} helperText={clicked.password2&&!data.password2?"Password is required":clicked.password2&&data.password2!==data.password?"Password do not match":""}/>     
         
          <div className="flex justify-evenly w-full mt-10 mb-6">
            <Button
                 variant="contained"
                 color="primary"
                //  component={Link}
                //  href="/Auth/Signup"
                 startIcon={<ArrowBackIcon />}
                 onClick={handleback}
                 className="!mr-6"
                 sx={{
                   background: "#956fe2",
                   py: 1.5,
                   fontSize: "16px",
                   width: "25%",
                 }}>
                 Back
             </Button>    

            <Button
                type="submit"
                 variant="contained"
                 color="primary"
                 endIcon={<ArrowForwardIcon/>}
                //  component={Link}
                //  to={isValid?(role==="jobseeker"?"/signupseeker":"/signupprovider"):""}
                //  onClick={handlesubmit}
                 sx={{
                   background: "#956fe2",
                   py: 1.5,
                   fontSize: "16px",
                   width: "25%",
                   }}>
                 Next
             </Button>
          </div>

          <CustomizedSnackbars
          open={opensnackbar}
          message={snackbarmessage}
          severity={snackbarseverity}
          onClose={() => setopensackbar(false)}
          />
                 
       </form>
     </Layout>

  );
}

export default SignUpDetail;