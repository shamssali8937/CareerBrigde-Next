import connect from "@/Lib/dbConfig/dbConfig";
import user from "@/models/user";


export const storeForgetTokeAndOtp=async(email,otp,token)=>{
    await connect();
    const userTostorCredentials=await user.findOne({email:email});
    if(!userTostorCredentials){
        return false;
    }
    userTostorCredentials.otp=otp;
    userTostorCredentials.forgetToken=token;
    userTostorCredentials.otpExpiry = Date.now() + 5 * 60 * 1000;
    await userTostorCredentials.save();

    return true;
}

export const verifyOtp=async(email,otp)=>{
    await connect();
    const userToVerify=await user.findOne({email:email});
    if(!userToVerify){
        return { success: false, message: "No user found" };

    }
    if (userToVerify.otp !== otp) {
         return { success: false, message: "Incorrect OTP" };
    }

  return { success: true, message: "OTP verified" };
}

export const resetPassword=async(email,newPassword)=>{
    await connect();
    const userToChangePassword=await user.findOne({email:email})

    if (!userToChangePassword) {
        return { success: false, message: "No user found" };
    }
  
    userToChangePassword.password=newPassword;
    userToChangePassword.otp = null;
    userToChangePassword.forgetToken = "";
  
    await userToChangePassword.save();
    return { success: true, message: "succesfully changed" };;
}