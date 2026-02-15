import { NextResponse } from "next/server";
import { deleteJob, editJob, getAllCompanies, getAlljobsForSeeker, getJobsOfSpecificProvider, postJob, searchJobs } from "@/services/postJobService";

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

export const editJobController=async(req)=>{
    try{
            const body=await req.json();
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await editJob(tokenDetail.email,body)

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully edited job..",data:result},{status:200});      
    }catch(err){
          console.log(err)
          return NextResponse.json({message:"error in editing job..",err},{status:500});
    }
}

export const getAllJobsForSeekerController=async(req)=>{
    try{
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await getAlljobsForSeeker(tokenDetail.email)

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully fetched jobs for seeker..",data:result},{status:200});      

    }catch(err){
        console.log(err);
         return NextResponse.json({message:"error in fetching job..",err},{status:500});
    }
}

export const getAllJobsForSpecificProviderController=async(req)=>{
    try{
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await getJobsOfSpecificProvider(tokenDetail.email)

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully fetched jobs of provider..",data:result},{status:200});      

    }catch(err){
        console.log(err);
         return NextResponse.json({message:"error in fetching job..",err},{status:500});
    }
}

export const getAllProvidersWithJobsController=async(req)=>{
    try{
            const result= await getAllCompanies();

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully fetched all providers..",data:result},{status:200});      

    }catch(err){
        console.log(err);
         return NextResponse.json({message:"error in fetching providers..",err},{status:500});
    }
}


export const searchJobsController=async(req)=>{
    try{
            const body=await req.json();
            const {searchWord,jobType,salary,location} =body;
            const result= await searchJobs(searchWord,jobType,salary,location);

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully searched job..",data:result},{status:200});      
    }catch(err){
          console.log(err)
          return NextResponse.json({message:"error in searching job..",err},{status:500});
    }
}

export const deleteJobController=async(req,params)=>{
    try{
            const {jobId}=await params;
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await deleteJob(tokenDetail.email,jobId);

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully deleted job..",data:result},{status:200});      
    }catch(err){
          console.log(err)
          return NextResponse.json({message:"error in deleting job..",err},{status:500});
    }
}

