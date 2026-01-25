import user from "@/models/user";
import connect from "@/dbConfig/dbConfig";

export const createUser=async(data)=>{
    await connect();
    const isUserExist=await user.findOne({email:data.email});
    if(isUserExist){
        throw new Error("Email already exist");
    }

    const newUser=new user(data);
    const savedUser=await newUser.save();
    return savedUser;
}