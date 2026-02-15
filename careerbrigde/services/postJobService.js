import provider from "@/models/provider";
import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import jobs from "@/models/jobs";
import seeker from "@/models/seeker";
import appliedJobs from "@/models/appliedJobs";

export const postJob=async(email,data)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});

    if(!userToFind){
        return {success:false,message:"can't find user"};
    }

    const providerProfile=await provider.findOne({user:userToFind._id,isdelete:false});

    if(!providerProfile){
        return {success:false,message:"can't find provider"};
    }

    const newJob=new jobs({...data,provider:providerProfile._id});
    const savedjob=await newJob.save();
    const populatedjob=await jobs.findById(savedjob._id).populate({path:"provider",populate:{path:"user",select: "name email photo role userId"}});

    return {success:true,message:"successfully posted",job:populatedjob};
}

export const editJob=async(email,data)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});
    if(!userToFind){
        return {success:false,message:"can't find user"};
    }
    const providerProfile=await provider.findOne({user:userToFind._id,isdelete:false});
    if(!providerProfile){
       return {success:false,message:"job provider does'nt exist"};   
    }
    const jobToEdit=await jobs.findOne({_id:data.jobId,provider:providerProfile._id,isdelete:false});
    if(!jobToEdit){
        return {success:false,message:"can't find job or you didn't posted"};
    }
    const { jobId, ...updateData } = data;
    const editedJob=await jobs.findByIdAndUpdate(jobToEdit._id,{$set:updateData},{new:true});
    const populatedJob=await jobs.findById(editedJob._id).populate({path:"provider",populate:{path:"user",select: "name email photo role"}});

    return {success:true,message:"succesfully edited",job:populatedJob};
}

export const getAlljobsForSeeker=async(email)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobseeker",isdelete:false});
    if(!userToFind){
        return {success:false,message:"cant find user in db"};
    }
    const seekerProfile=await seeker.findOne({user:userToFind._id,isdelete:false});
    if(!seekerProfile){
        return {success:false,message:"cant find user as seeker in db"};
    }
    const seekerSkills=seekerProfile.skills.map(s=>s.toLowerCase());
    const allJobs=await jobs.find({isdelete:false}).populate({path:"provider"});
    if(!allJobs){
        return {success:false,message:"no jobs posted yet"};
    }

    const matchedJobs = allJobs.filter(job => {
    const title = job.title?.toLowerCase() || "";
    const desc = job.description?.toLowerCase() || "";
    const reqs = (job.requirements || []).map(r => r.toLowerCase().trim());

    return seekerSkills.some(skill =>
      reqs.some(r => r.includes(skill) || skill.includes(r)) ||
      title.includes(skill) ||
      desc.includes(skill)
    );
  });

    return {success:true,message:"successfully fethced",jobs:matchedJobs};

}

export const getJobsOfSpecificProvider=async(email)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});
    if(!userToFind){
        return {success:false,message:"cant find user in db"};
    }

    const providerProfile=await provider.findOne({user:userToFind._id,isdelete:false});
    if(!providerProfile){
        return {success:false,message:"cant find user as provider in db"};
    }

    const populatedJobs=await jobs.find({provider:providerProfile._id,isdelete:false}).populate({path:"provider",populate:{path:"user",select: "name email photo role"}});
      if (!populatedJobs||populatedJobs.length===0) {
        return [];
      }

      return {success:true,message:"success",jobs:populatedJobs};
}

export const getAllCompanies=async()=>{
    await connect();
    const providers = await provider.find().lean()
    .populate({
      path: "user",
      select: "name photo email"
    });

  if (!providers || providers.length === 0) {
    return {success:false,message:"cant find providers/companies in db"};
  }

    const companies = [];
 
   for (const provider of providers) {
     // Jobs of this provider
     const providerJobs = await jobs.find({
       provider: provider._id,
       isdelete: false
     }).populate({
       path: "provider",
       populate: { path: "user", select: "name email photo role" }
     }).lean();
 
 
     // Push formatted company object
     if (providerJobs.length > 0) {
       companies.push({
         ...provider,
         providerJobs,
       });
     }
  }

  return {success:true,message:"success",companies:companies}

}

export const searchJobs=async(searchWord,jobType,salary,location)=>{
    await connect();
    const andConditions = [{ isdelete: false }];

    if (jobType) andConditions.push({ jobType: { $regex: jobType, $options: "i" } });
    if (location) andConditions.push({ location: { $regex: location, $options: "i" } });
    if (salary) andConditions.push({ salary: { $regex: salary, $options: "i" } });

    let jobsTofind = await jobs.find({ $and: andConditions })
    .populate({
      path: "provider",
      populate: { path: "user", select: "name email photo role" },
    })
    .lean();

    let filteredJobs = jobsTofind;

    if (searchWord && searchWord.trim() !== "") {
    const keywordRegex = new RegExp(searchWord, "i");
     filteredJobs = jobsTofind.filter(job =>
      keywordRegex.test(job.title) ||
      keywordRegex.test(job.description) ||
      keywordRegex.test(job.location)||
      keywordRegex.test((job.requirements || []).join(" ")) ||
      (job.provider.companyname && keywordRegex.test(job.provider.companyname))
    );
  }

  return {success:true,message:"success",jobs:filteredJobs};
}


export const deleteJob=async(email,jobId)=>{
    await connect();
    const userToFind=await user.findOne({email:email,role:"jobprovider",isdelete:false});
    if(!userToFind){
        return {success:false,message:"cant find user in db"};
    }
    const providerProfile=await provider.findOne({user:userToFind._id,isdelete:false});
    if(!providerProfile){
        return {success:false,message:"cant find user as provider in db"};
    }
    const jobToDelete=await jobs.findOne({_id:jobId,provider:providerProfile._id});
    if(!jobToDelete){
        return {success:false,message:"cant find job you want to delete"};
    }else if(jobToDelete.isdelete===true){
        return {success:false,message:"Already deleted"};
    }

    if(jobToDelete.provider.toString() !== providerProfile._id.toString())
      {
         return {success:false,message:"you are not authourized to delete job"}
      }

     jobToDelete.isdelete=true;
     const deletedjob=await jobToDelete.save();

     await appliedJobs.updateMany({ job: jobToDelete._id },{ $set: { isdelete: true } }); 

     return {success:true,message:"successfully deleted",job:deletedjob};

}