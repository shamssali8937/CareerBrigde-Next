import { jwtVerify } from "jose";

export async function verifyAuth(token) {
    
    try{
        const secret=new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload}=await jwtVerify(token,secret);
        return { success: true, payload };
    }catch(err){
        return { 
          success: false, 
          error: err.code === 'ERR_JWT_EXPIRED' ? 'Token expired' : 'Invalid token' 
        };
    }
}