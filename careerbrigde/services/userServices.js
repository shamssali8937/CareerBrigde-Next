import user from "@/models/user";
import connect from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs"

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

export const singin=async(data)=>{
    await connect();
    const isUserExist=await user.findOne({email:data.email,name:data.name});
    if(isUserExist){
        throw new Error("Email already exist");
    }
    else if(isUserExist.googleId!==null){
        throw new Error("You already have account please signIn with google");
    }
    const matchPassword=await bcrypt.compare(data.password,isUserExist.password);
     
    if(!matchPassword){
        throw new Error("wrong password");
    }
    return isUserExist;
}