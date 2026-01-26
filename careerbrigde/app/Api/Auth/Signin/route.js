import { signinUser } from "@/controllers/userController";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {

   try{
    const data=await req.json();
    const user= await signinUser(data);

    if(user){
        return NextResponse.json({ message: "Succssfully signedIn",User:user},
          { status: 200 });
    }
   }catch(err){
       return NextResponse.json({err:err.message},{status:400});
   }
    
}
