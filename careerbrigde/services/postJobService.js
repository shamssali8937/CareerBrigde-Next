import provider from "@/models/provider";
import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import jobs from "@/models/jobs";

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