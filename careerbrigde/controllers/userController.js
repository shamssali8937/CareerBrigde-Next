import { createUser, singin } from "@/services/userServices";
import { NextResponse } from "next/server";
import { jwtAcessTokenCreator, jwtRefreshTokenCreator } from "@/Lib/Auth/JwtCreator";
export const signupUser=async(req)=>{
       try{
            const newUser=await createUser(req);
            if(!newUser){
              return NextResponse.json({ message: "User creation failed" },{ status: 500 });    
            }

              return NextResponse.json({ message: "User created successfully" },{ status: 200 });    

       }catch(err){
           //console.log(err);
          return NextResponse.json({ message: "User creation failed" },{ status: 500 });
       }
}


export const  signinUser=async(req)=>{

  try{
    const reqBody=await req.json();
    const {email,password}=reqBody;
    const data={
      email:email,
      password:password
    }
    if(!email||!password){
      throw new Error("Required credentials are missing");
    }

    const user= await singin(data);
    if(user){
        const accessToken=jwtAcessTokenCreator(user);
        const refreshToken=jwtRefreshTokenCreator(user);
        return NextResponse.json({ message: "Succssfully signedIn",User:user,AccessToken:accessToken,RefreshToken:refreshToken},
          { status: 200 });
    }
   }catch(err){
       return NextResponse.json({err:err.message},{status:400});
   }

}


