import { NextResponse } from "next/server";
import { verifyAuth } from "./Lib/Auth/auth";

export async function proxy(req) {
    
    const authHeader=req.headers.get("authorization");
    if(!authHeader){
         return NextResponse.json({message:"No token found in header"},{status:404});
    }

    const token=authHeader.split(' ')[1];

    if(!token){
         return NextResponse.json({message:"Invalid Token"},{status:404});
    }

    try{
        
        const { success, payload, error }=await verifyAuth(token);
        
        if (!success) {
           // token invalid or expired → return 401
           return NextResponse.json({ message: error }, { status: 401 });
         }

         const requestHeaders= new Headers(req.headers);
         requestHeaders.set("user",JSON.stringify(payload));

         return NextResponse.next({
            request:{headers:requestHeaders}
         });

    }catch(err){
         return NextResponse.json(
        { message: "Token verification failed" },
        { status: 401 }
      );
    }
    
}

export const config = {
  matcher: '/Api/Protected/:path*',
};