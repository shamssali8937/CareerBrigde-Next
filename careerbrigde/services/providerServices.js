import provider from "@/models/provider";
import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";


export const updateProvider=async(User,data)=>{
      await connect();
      const userToUpdate=await user.findOne({email:User.email,role:User.role,isdelete:false});

      if(!userToUpdate){
        return {success:false,message:"user not found or not seeker"};
      }

      const providerToUpdate=await provider.findOne({user:userToUpdate._id,isdelete:false});
      if(!providerToUpdate){
          const newProvider=new provider({...data,user:userToUpdate._id});
          const savedProvider=await newProvider.save();

          const populatedProvider=await provider.findById(savedProvider._id).populate(
            { path: "user",
             select: "name email photo role",
          });
          return {success:true,message:"Added new provider profile",data:populatedProvider};
      }


      const updatedProvider=await provider.findByIdAndUpdate(providerToUpdate._id,{$set:data},{new:true}).
      populate({
        path: "user",
        select: "name email photo role",
      })


      return   {success:true,message:"updated provider profile",data:updatedProvider};

}

