import { createUser, singin } from "@/services/userServices";
import { NextResponse } from "next/server";

export const signupUser=async(req)=>{
       try{
            const newUser=await createUser(req);
            if(!newUser){
              return NextResponse.json({ message: "User creation failed" },{ status: 500 });    
            }

              return NextResponse.json({ message: "User created successfully" },{ status: 200 });    

       }catch(err){
           console.log(err);
          return NextResponse.json({ message: "User creation failed" },{ status: 500 });
       }
}


export const  signinUser=async(body)=>{
  const {email,password}=body;
  const data={
    email:email,
    password:password
  }
  if(!email||!password){
    throw new Error("Required credentials are missing");
  }

  return await singin(data);

}


