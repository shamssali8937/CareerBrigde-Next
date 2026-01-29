import { NextResponse } from "next/server";
import { storeForgetTokeAndOtp } from "@/services/forgotServices";
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