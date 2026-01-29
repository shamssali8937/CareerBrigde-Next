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