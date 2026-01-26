import { getAllUserService } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(req) {

    try{
       
        
        const users= await getAllUserService();
        //  const userHeader = req.headers.get("user");
        //  const tokenDetail = userHeader ? JSON.parse(userHeader) : null;


        if(!users){
            return NextResponse.json({message:"Unsuccessfull"},{status:404})
        }

        return NextResponse.json({message:"successfull",data:users},{status:200})

    }catch(err){
          return NextResponse.json({message:err.message},{status:400});
    }
    
}