import connect from "@/dbConfig/dbConfig";
import user from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {

    try{
       
        await connect();

        const users= await user.find();
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