import seeker from "@/models/seeker";
import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import { uploadFile } from "@/Lib/cloudinary";


export const updateSeeker=async(req)=>{
    await connect();
    const contentType=req.headers.get("content-type")||" ";
        let seekerData={};
        let fileToUpload=null;
        

        const userHeader = req.headers.get("user");
        const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
        const userToUpdate=await user.findOne({email:tokenDetail.email,role:tokenDetail.role});
        if (!userToUpdate) {
          return { success: false, message: "User not found" };
        }
        const seekerToUpdate=await seeker.findOne({user:userToUpdate._id});
        
        
        if(contentType.includes("multipart/form-data")){
            const formdata=await req.formData();
    
            fileToUpload=formdata.get("cv");
    
            for(const [key, value] of formdata.entries()){
               if(key!=="cv"){
                seekerData[key]=value;
               }
            }
        }else{
           seekerData=await req.json();
        }

         ["skills","education", "experience", "socialLinks"].forEach((field) => {
            if (typeof seekerData[field] === "string") {
              try {
                seekerData[field] = JSON.parse(seekerData[field]);
              } catch (err) {
                seekerData[field] = [];
              }
            }
          });

        if (!seekerToUpdate) {
           if(fileToUpload&&fileToUpload.size>0){
               const uploadedFileToCloudinary=await uploadFile(fileToUpload);
               seekerData.cv=uploadedFileToCloudinary;
           }
         const newSeeker=new seeker({...seekerData,user:userToUpdate._id});
       
          let result =await newSeeker.save();
          return {success:true,message:"succesfully updated",data:result};
        }

         if(fileToUpload&&fileToUpload.size>0){
               const uploadedFileToCloudinary=await uploadFile(fileToUpload);
               seekerData.cv=uploadedFileToCloudinary;
           }

           const updatedSeeker=await seeker.findByIdAndUpdate(seekerToUpdate._id,{$set:seekerData},{new:true}).populate({path: "user",
                select: "name email photo role userId",})
    
           
        return {success:true,message:"succesfully updated",seeker:updatedSeeker};
}

export const getSeekerProfile=async(email)=>{
    await connect();

    const userProfile=await user.findOne({email:email,role:"jobseeker",isdelete:false});

    if(!userProfile){
      return {success:false,message:"cant find user"};
    }

      const seekerProfile = await seeker
     .findOne({ user: userProfile._id, isdelete: false })
     .populate({
       path: "user",
       select: "name email photo role userId"
     });

    return {success:true,message:"successfully fetched profile",seeker:seekerProfile};
   
}