import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import bcrypt from "bcryptjs"
import { uploadFile } from "@/Lib/cloudinary";
import mongoose from "mongoose";


export const createUser=async(req)=>{
    await connect();

    const contentType=req.headers.get("content-type")||" ";
    let userData={};
    let fileToUpload=null;

    if(contentType.includes("multipart/form-data")){
        const formdata=await req.formData();

        fileToUpload=formdata.get("photo");

        for(const [key, value] of formdata.entries()){
           if(key!=="photo"){
            userData[key]=value;
           }
        }
    }else{
       userData=await req.json();
    }

    const { email, password, role ,name } = userData;
     if (!email || !password ||!role||!name) {
       throw new Error("Required fields missing");
     }
   
     const exists = await user.findOne({ email });
     if (exists) {
       throw new Error("Email already exists");
     }
    
    if(fileToUpload&&fileToUpload.size>0){
        const uploadedFileToCloudinary=await uploadFile(fileToUpload);
        userData.photo=uploadedFileToCloudinary;
    }
    
    const userToSave=new user(userData)

    return await userToSave.save();

    
}

export const updateUser=async(req)=>{
    await connect();
    const contentType=req.headers.get("content-type")||" ";
    let userData={};
    let fileToUpload=null;

    if(contentType.includes("multipart/form-data")){
        const formdata=await req.formData();

        fileToUpload=formdata.get("photo");

        for(const [key, value] of formdata.entries()){
           if(key!=="photo"){
            userData[key]=value;
           }
        }
    }else{
       userData=await req.json();
    }
    const userHeader = req.headers.get("user");
    const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
    const userToUpdate=await user.findOne({email:tokenDetail.email,role:tokenDetail.role});

    if (!userToUpdate) {
    return { success: false, message: "User not found" };
    }

    if(userData.name){
        userToUpdate.name=userData.name;
    }
    if (fileToUpload && fileToUpload.size > 0) {
       const uploaded = await uploadFile(fileToUpload);
       userToUpdate.photo = uploaded;
     }
    if(userData.email){
        const isMailExist=await user.findOne({email:userData.email, _id: { $ne: userToUpdate._id }});
        if(isMailExist){
            return {success:false,message:"Email already exist"};
        }
        userToUpdate.email=userData.email;
    }

    await userToUpdate.save();

    return {success:true,message:"succesfully updated"};

}


export const singin=async(data)=>{
    await connect();
    const isUserExist=await user.findOne({email:data.email,isdelete:false});
    if(!isUserExist){
        throw new Error("User not found");
    }
    if(isUserExist.googleId!==null){
        throw new Error("You already have account please signIn with google");
    }
    const matchPassword=await bcrypt.compare(data.password,isUserExist.password);
     
    if(!matchPassword){
        throw new Error("wrong password");
    }
    return isUserExist;
}

export const getAllUserService=async()=>{

            await connect();
        //     mongoose.connection.name
        //    console.log(await user.db.name);

           const users = await user.find({ isdelete: false });

            if(users.length===0){
                 return {success:false,message:"No users found"};
            }

            return {success:true,users:users};;
}


export const getSpecificUser=async(email,role)=>{
           await connect();
           const userToFind = await user.findOne({email:email,role:role,isdelete: false });

            if(!userToFind){
                 return {success:false,message:"No users found"};
            }

            return {success:true,users:userToFind};;
}