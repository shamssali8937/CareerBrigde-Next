import { getSeekerProfile, updateSeeker } from "@/services/seekerServices";
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

export const getSeekerProfileController=async(req)=>{
    try{
         const userHeader = req.headers.get("user");
         const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
         const seeker = await getSeekerProfile(tokenDetail.email);
         if(!seeker.success){
           return NextResponse.json({message:seeker.message},{status:404});    
         }

         return NextResponse.json({message:"successfully fetched",data:seeker},{status:200});

    }catch(err){
        console.error("Update Error:", err);
        return NextResponse.json({message:"error in fetching seeker..",err},{status:500});
    }
}