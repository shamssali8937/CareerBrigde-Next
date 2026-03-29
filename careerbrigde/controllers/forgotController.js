import { NextResponse } from "next/server";
import { resetPassword, storeForgetTokeAndOtp, verifyOtp } from "@/services/forgotServices";
import { jwtForgotTokenCreator } from "@/Lib/Auth/JwtCreator";

export const genrateOtpAndForgotToken=async(req)=>{
    try{
         const body=await req.json();
         const { email } = body;
         if (!email) {
           return NextResponse.json({ message: "Email is required" },{ status: 404 });
         }
         const otp = Math.floor(1000 + Math.random() * 9000).toString();
         const token=jwtForgotTokenCreator(email,otp);

         const isGenrated=await storeForgetTokeAndOtp(email,otp,token);
         if(!isGenrated){
            return NextResponse.json({message:"error in genrating otp and token"},{status:400});    
         }

            return NextResponse.json({message:`Otp is ${otp}`,forgotToken:token},{status:200});    

    }catch(err){
        return NextResponse.json({message:"error in genrating otp and token"},{status:500});
    }
}


export const verifyOtpController=async(req)=>{
    try{
          const body=await req.json();
          const {otp}=body;
          const userHeader = req.headers.get("user");
          const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
          
          if (!otp) {
           return NextResponse.json({ message: "Email and OTP are required" },{ status: 400 });
          }

          const result = await verifyOtp(tokenDetail.email, otp);

          return NextResponse.json({message:"success",data:result},{status:200});

    }catch(err){
       //console.log(err)
        return NextResponse.json({message:"error in verifying",err},{status:500});
    }
}



export const resetPasswordController=async(req)=>{
    try{
          const body=await req.json();
          const {password}=body;
          const userHeader = req.headers.get("user");
          const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
          
          if (!password) {
           return NextResponse.json({ message: "new passwrod is required" },{ status: 400 });
          }

          const result=await resetPassword(tokenDetail.email,password);

          return NextResponse.json({message:result},{status:200});
          
    }catch(err){
        return NextResponse.json({message:"error in reseting password",err},{status:500});
    }
}