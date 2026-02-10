import provider from "@/models/provider";
import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import jobs from "@/models/jobs";
import seeker from "@/models/seeker";

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