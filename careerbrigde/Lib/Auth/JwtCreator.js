import jwt from "jsonwebtoken"


export const jwtAcessTokenCreator=(data)=>{
    return jwt.sign({email:data.email,role:data.role},process.env.JWT_SECRET,{expiresIn:"30m"});
}

export const jwtRefreshTokenCreator=(data)=>{
     return jwt.sign({email:data.email,role:data.role},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"});
}

export const jwtForgotTokenCreator=(email,otp)=>{
    return jwt.sign({email:email,otp:otp},process.env.JWT_SECRET,{expiresIn:"10m"});
}