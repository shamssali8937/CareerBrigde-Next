import user from "@/models/user";
import jobs from "@/models/jobs";
import appliedJobs from "@/models/appliedJobs";
import connect from "@/Lib/dbConfig/dbConfig";
import { uploadFile } from "@/Lib/cloudinary";
import seeker from "@/models/seeker";
import provider from "@/models/provider";


export const applyJob=async(req)=>{
    await connect();
    const contentType=req.headers.get("content-type")||" ";
            let jobApplicationData={};
            let fileToUpload=null;
            
    
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const userToFind=await user.findOne({email:tokenDetail.email,role:"jobseeker",isdelete:false});
            if(!userToFind){
                return {success:false,message:"you are not a job seeker or account deleted"};
            }
            const seekerToFind=await seeker.findOne({user:userToFind._id,isdelete:false});
            if(!seekerToFind){
                return {success:false,message:"not registerd as seeker"};
            }
          
            
            if(contentType.includes("multipart/form-data")){
                const formdata=await req.formData();
        
                fileToUpload=formdata.get("cv");
        
                for(const [key, value] of formdata.entries()){
                   if(key!=="cv"){
                    jobApplicationData[key]=value;
                   }
                }
            }else{
               jobApplicationData=await req.json();
            }
        const jobToFind=await jobs.findOne({_id:jobApplicationData.jobId,isdelete:false});
        if(!jobToFind){
            return {success:false,message:"no job found you are applying for"};
        }else if(jobToFind.lastDate<Date.now()){     
                return {success:false,meesage:"Job is closed"};
          }
        const alreadyapplied=await appliedJobs.findOne({seeker:seekerToFind._id,job:jobToFind._id,isdelete:false});
        if(alreadyapplied){
                 return {success:false,message:"already applied"};
          }

        if(fileToUpload&&fileToUpload.size>0){
                const uploadedFileToCloudinary=await uploadFile(fileToUpload);
                jobApplicationData.cv=uploadedFileToCloudinary;
            }else{
                jobApplicationData.cv=seekerToFind.cv
            }
           
         const newJobApplication= new appliedJobs({...jobApplicationData,seeker:seekerToFind._id,job:jobToFind._id});
         const savedJobApplication=await newJobApplication.save();   

         const populatedJobApplication=await appliedJobs.findById(savedJobApplication._id).populate({
           path: "seeker",
           populate: { path: "user", select: "name email photo role _id" }
         })
         .populate("job");

        return {success:true,meesage:"success fully applied",jobApplication:populatedJobApplication};
}

export const getAllJobApllicationsOfSeeker=async(email)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobseeker",isdelete:false});
        if(!userToFind){
            return {success:false,message:"cant find user in db"};
        }
    const seekerProfile=await seeker.findOne({user:userToFind._id,isdelete:false});
        if(!seekerProfile){
            return {success:false,message:"cant find user as seeker in db"};
        }

    const jobApplications=await appliedJobs.find({seeker:seekerProfile._id,isdelete:false}).populate({
         path: "seeker",
         populate: { path: "user", select: "name email photo role _id" },
       })
       .populate({
      path: "job", 
      populate: {
        path: "provider", 
        populate: { 
            path: "user", 
            select: "name email photo role _id" 
        } 
      }
    });
        if(!jobApplications||jobApplications.length === 0){
            return {success:false,message:"no job is applied yet"};
        }

     return {success:true,message:"success",applications:jobApplications};     
}

export const deleteJobApplication=async(email,appId)=>{
    await connect();
     const userToFind=await user.findOne({email:email,role:"jobseeker",isdelete:false});
        if(!userToFind){
            return {success:false,message:"cant find user in db"};
        }
    const seekerProfile=await seeker.findOne({user:userToFind._id,isdelete:false});
        if(!seekerProfile){
            return {success:false,message:"cant find user as seeker in db"};
        }
    const applicationToDelete=await appliedJobs.findOne({_id:appId,seeker:seekerProfile._id,isdelete:false});
    if(!applicationToDelete){
          return {success:false,message:"no job application with id found"};
    }else if(applicationToDelete.isdelete===true){
          return {success:false,message:"Already deleted"};
    }

    applicationToDelete.isdelete=true;
    await applicationToDelete.save();
    return {success:true,message:"Job application deleted succesfuly",application:applicationToDelete};
}


export const changeApplicationStatus=async(email,apId,data)=>{
      await connect();
       const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});
        if(!userToFind){
            return {success:false,message:"cant find user in db"};
        }
    const providerProfile=await provider.findOne({user:userToFind._id,isdelete:false});
        if(!providerProfile){
            return {success:false,message:"cant find user as provider in db"};
        }
    const application=await appliedJobs.findOne({_id:apId,isdelete:false}).populate("job");
    if(!application){
     return {success:false,message:"job application not found"};
    }else if(application.job.provider.toString() !== providerProfile._id.toString()){
      return {success:false,message:"u are not authorized to change status"};
    }   

    const updatedApllication=await appliedJobs.findByIdAndUpdate(application._id,{...data,isViewed:true},{new:true})

    return {success:true,message:"success",application:updatedApllication};
}


export const searchApplicants=async (jobId,status,viewed,searchword)=>{
    await connect();
    const filter = { isdelete: false };

  const job = await jobs.findOne({_id:jobId});
  if(!job){
    return {success:false,message:"can't find the job"}
  }
  if(job.isdelete){
     return {success:false,message:"job is deleted"}
  }

  filter.job = job._id;

  if (status) filter.status = status;
  if (viewed !== undefined) filter.isViewed = viewed;

  let applications = await appliedJobs.find(filter)
    .populate({
      path: "seeker",
      populate: {
        path: "user",
        select: "name email photo role _id"
      }
    });

  if (searchword) {
    const keyword = searchword.toLowerCase();

    applications = applications.filter(app => {
      const seeker = app.seeker || {};
      const user = seeker.user || {};

      const nameMatch = user.name?.toLowerCase().includes(keyword);
      const headlineMatch = seeker.headline?.toLowerCase().includes(keyword);
      const skillMatch = seeker.skills?.some(s =>
        s?.toLowerCase().includes(keyword)
      );
      const expMatch = seeker.experience?.some(e =>
        e?.title?.toLowerCase().includes(keyword)
      );

      return nameMatch || skillMatch || expMatch || headlineMatch;
    });
  }

  return {success:true,message:"successfult fethched application",applicatnts:applications};

}

export const getAllJobApllicationsForSpecificJob=async(jobId) => {
    await connect();
     const job=await jobs.findOne({_id:jobId,isdelete:false});
      if(!job){
        return {success:false,message:"job not found"}
      }
           
     const specificApplications=await appliedJobs.find({job:job._id}).populate({
      path: "job",
    })
    .populate({
      path: "seeker",
      populate: {
        path: "user",
        select: "name email photo role _id"
      }
    });
     if(!specificApplications||specificApplications.length === 0){
       return [];
     }

     return {success:true,message:"successfuly fetched",applications:specificApplications};
}


export const getApplicationsForJobOfSpecificProvider=async(email)=>{
     await connect();

     const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});
      if(!userToFind){
        return {success:false,message:"user is not register with id you logedin"};
      }

    const providerProfile = await provider.findOne({ user:userToFind._id,isdelete: false });
      if (!provider) {
           return {success:false,message:"No company found"};
      }
    
      // Find all jobs posted by this provider
      const allJobs = await jobs.find({ provider: providerProfile._id,isdelete: false}).populate({
        path: "provider",
        populate: { path: "user", select: "name email photo role _id" }
      });
    
      // Attach applications to each job
      const jobsWithApplications = [];
      for (const job of allJobs) {
        const applications = await appliedJobs.find({ job: job._id, isdelete: false })
          .populate({
            path: "seeker",
            populate: { path: "user", select: "name email photo role _id" }
          });
       if (applications.length > 0) {
          jobsWithApplications.push({
            ...job.toObject(),
            applications
          });
        }
      }

      return {success:true,message:"successfully fethched ",jobApplication:jobsWithApplications}

}