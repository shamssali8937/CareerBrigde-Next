import { applyJob, getAllJobApllicationsOfSeeker } from "@/services/jobApplicationService";
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


export const getAllJobApllicationsOfSeekerController=async(req)=>{
     try{
                const userHeader = req.headers.get("user");
                const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
                const result= await getAllJobApllicationsOfSeeker(tokenDetail.email)
    
                if(!result.success){
                 return NextResponse.json({message:result.message},{status:404});      
                }
           return NextResponse.json({message:"succesfully fetched jobs application of seeker..",data:result},{status:200});      
    
        }catch(err){
            console.log(err);
             return NextResponse.json({message:"error in fetching job applications..",err},{status:500});
        }
}