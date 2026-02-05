import { NextResponse } from "next/server";
import { postJob } from "@/services/postJobService";

export const postJobController=async(req)=>{
    try{
            const body=await req.json();
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await postJob(tokenDetail.email,body)

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully posted job..",data:result},{status:200});      
    }catch(err){
          console.log(err)
          return NextResponse.json({message:"error in posting job..",err},{status:500});
    }
}