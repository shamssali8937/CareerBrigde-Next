import { createUser, getSpecificUser, singin, updateUser } from "@/services/userServices";
import { NextResponse } from "next/server";
import { jwtAcessTokenCreator, jwtRefreshTokenCreator } from "@/Lib/Auth/JwtCreator";
export const signupUser=async(req)=>{
       try{
            const newUser=await createUser(req);
            if(!newUser){
              return NextResponse.json({ message: "User creation failed" },{ status: 500 });    
            }
              const accessToken=jwtAcessTokenCreator(newUser);
              return NextResponse.json({ message: "User created successfully",User:newUser, token:accessToken },{ status: 200 });    

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


export const updateUserController=async(req)=>{
       try{
            const result=await updateUser(req);
            if(!result || result.success === false){
              return NextResponse.json({ message: result?.message || "User updation failed" },{ status: 409 });    
            }

              return NextResponse.json({ message: "User updated successfully" },{ status: 200 });    

       }catch(err){
          console.log(err);
          return NextResponse.json({ message: "User updation failed" },{ status: 500 });
       }
}



export const getSpecificUserController=async(req)=>{
       try{
            
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result=await getSpecificUser(tokenDetail.email,tokenDetail.role);
            if(!result || result.success === false){
              return NextResponse.json({ message: result?.message },{ status: 400 });    
            }

              return NextResponse.json({ message: "User updated successfully",user:result },{ status: 200 });    

       }catch(err){
           //console.log(err);
          return NextResponse.json({ message: "error in finding user" },{ status: 500 });
       }
}