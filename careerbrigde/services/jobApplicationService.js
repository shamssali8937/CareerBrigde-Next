import user from "@/models/user";
import jobs from "@/models/jobs";
import appliedJobs from "@/models/appliedJobs";
import connect from "@/Lib/dbConfig/dbConfig";
import { uploadFile } from "@/Lib/cloudinary";
import seeker from "@/models/seeker";

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
           populate: { path: "user", select: "name email photo role" }
         })
         .populate("job");

        return {success:true,meesage:"success fully applied",jobApplication:populatedJobApplication};
}