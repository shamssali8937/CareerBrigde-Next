import { updateSeeker } from "@/services/seekerServices";
import { NextResponse } from "next/server";

export const updateSeekerController=async(req)=>{
    try{
         const seeker = await updateSeeker(req);
         if(!seeker){
           return NextResponse.json({message:"error in updating seeker profile"},{status:500});    
         }

         return NextResponse.json({message:"successfully updated",data:seeker},{status:200});

    }catch(err){
        console.error("Update Error:", err);
        return NextResponse.json({message:"error in updating seeker..",err},{status:500});
    }
}