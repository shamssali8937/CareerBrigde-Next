import { signinUser } from "@/controllers/userController";
import { jwtAcessTokenCreator, jwtRefreshTokenCreator } from "@/Lib/Auth/JwtCreator";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {

   try{
    const data=await req.json();
    const user= await signinUser(data);
    const accessToken=jwtAcessTokenCreator(user);
    const refreshToken=jwtRefreshTokenCreator(user);
    if(user){
        return NextResponse.json({ message: "Succssfully signedIn",User:user,AccessToken:accessToken,RefreshToken:refreshToken},
          { status: 200 });
    }
   }catch(err){
       return NextResponse.json({err:err.message},{status:400});
   }
    
}
