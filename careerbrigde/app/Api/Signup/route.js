import connect from "@/dbConfig/dbConfig";
import { signupUser } from "@/controllers/userController";
import { NextResponse } from "next/server";

export async function POST(req) {
 try{
     const data = await req.json();
     console.log(data);
    const user = await signupUser(data);
    if(user){
        return NextResponse.json(
          { message: "User created", userId: user.userId },
          { status: 201 }
        );
    }
    else{
        return NextResponse.json(
          { message: "creation error",data:data},
          { status: 400 }
        );
    }
 }catch(err){
      console.log(err);
    return NextResponse.json({err:err.message},{status:400});
 }
}