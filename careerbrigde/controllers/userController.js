import { createUser, singin } from "@/services/userServices";

export const signupUser=async(body)=>{
    const {name, email, password, role, photo }=body;
    if (!email || !role || !name || !password || !photo) {
    throw new Error("Required fields missing");
  }
   return await createUser(body);
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