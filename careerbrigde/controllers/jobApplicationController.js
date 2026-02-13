import { applyJob, changeApplicationStatus, deleteJobApplication, getAllJobApllicationsForSpecificJob, getAllJobApllicationsOfSeeker, searchApplicants } from "@/services/jobApplicationService";
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

export const deleteJobApplicationController=async(req,params)=>{
     try{
                const {appId}=await params;
               // console.log(appId);
                const userHeader = req.headers.get("user");
                const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
                const result= await deleteJobApplication(tokenDetail.email,appId);
    
                if(!result.success){
                 return NextResponse.json({message:result.message},{status:404});      
                }
           return NextResponse.json({message:"succesfully deleted application..",data:result},{status:200});      
    
        }catch(err){
           // console.log(err);
             return NextResponse.json({message:"error in deleting applications Incorrect id..",err},{status:500});
        }
}

export const changeApplicationStatusController=async(req,params)=>{
     try{
                const {appId}=await params;
                const body=await req.json();
                const userHeader = req.headers.get("user");
                const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
                const result= await changeApplicationStatus(tokenDetail.email,appId,body);
    
                if(!result.success){
                 return NextResponse.json({message:result.message},{status:404});      
                }
           return NextResponse.json({message:"succesfully change status of application..",data:result},{status:200});      
    
        }catch(err){
          //   console.log(err);
             return NextResponse.json({message:"error in changing application status Incorrect id..",err},{status:500});
        }
}

export const searchApplicantsController=async(req,params)=>{
     try{
                const {jobId}=await params;
                const body=await req.json();
                const {viewed,status,searchWord}=body
                const result= await searchApplicants(jobId,status,viewed,searchWord);
    
                if(!result.success){
                 return NextResponse.json({message:result.message},{status:404});      
                }
           return NextResponse.json({message:"succesfully get applicants..",data:result},{status:200});      
    
        }catch(err){
             console.log(err);
             return NextResponse.json({message:"error in get applicants or jobid Incorrect..",err},{status:500});
        }
}


export const getApplicationsForSpecificJobController=async(req,params)=>{
     try{
                const {jobId}=await params;
                const result= await getAllJobApllicationsForSpecificJob(jobId);
    
                if(!result.success){
                 return NextResponse.json({message:result.message},{status:404});      
                }
           return NextResponse.json({message:"succesfully get applicantions..",data:result},{status:200});      
    
        }catch(err){
             console.log(err);
             return NextResponse.json({message:"error in get applicantions or jobid Incorrect..",err},{status:500});
        }
}
