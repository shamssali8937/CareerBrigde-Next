import user from "@/models/user";
import connect from "@/Lib/dbConfig/dbConfig";
import bcrypt from "bcryptjs"
import { uploadFile } from "@/Lib/cloudinary";


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

    const { email, password } = userData;
     if (!email || !password) {
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


export const singin=async(data)=>{
    await connect();
    const isUserExist=await user.findOne({email:data.email});
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
            const users= await user.find();

            if(!users){
                 throw new Error("No users exists");
            }

            return users;
}