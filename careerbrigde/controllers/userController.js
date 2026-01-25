import { createUser } from "@/services/userServices";

export const signupUser=async(body)=>{
    const {name, email, password, role, photo }=body;
    if (!email || !role) {
    throw new Error("Required fields missing");
  }
   return await createUser(body);
}