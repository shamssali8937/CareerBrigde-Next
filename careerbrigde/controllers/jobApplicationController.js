import { applyJob } from "@/services/jobApplicationService";
import { NextResponse } from "next/server";

export const applyJobController=async(req)=>{
    try{
          const appliedJob=await applyJob(req);
          if(!appliedJob.success){
            return NextResponse.json({message:appliedJob.message},{status:404})
          }
          return NextResponse.json({message:"successfully Applied..",data:appliedJob},{status:200})
    }catch(err){
        return NextResponse.json({message:"error in Applying..",err},{status:500})
    }
}
