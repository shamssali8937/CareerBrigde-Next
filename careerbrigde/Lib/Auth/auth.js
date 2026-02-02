import { jwtVerify } from "jose";

export async function verifyAuth(token) {
    
    try{
        const secret=new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload}=await jwtVerify(token,secret);
        return { success: true, payload };
    }catch(err){
       if (err.name === "JWTExpired") {
      return { success: false, error: "Token expired" };
    }
    return { success: false, error: "Invalid token" };
  }
    
}