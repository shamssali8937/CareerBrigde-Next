import { NextResponse } from "next/server";
import { sendMail } from "@/services/mailerService";

export const sendMailController=async (req)=>{
    try{
        const body = await req.json();
        const {to,subject,message}=body;
        if(!to||!subject||!message){
            return NextResponse.json({message:"please enter credentials like subject message"},{status:400})
        }
        const sendedMail=await sendMail(to,subject,message);
        return NextResponse.json({message:"Mail sent successfuly",Mail:sendedMail},{status:200})
    }catch(err){
        return NextResponse.json({message:err},{status:400})
    }
}