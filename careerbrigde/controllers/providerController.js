import { getProviderProfile, updateProvider } from "@/services/providerServices";
import { NextResponse } from "next/server";

export const updatedProviderController=async(req)=>{
    try{
            const body=await req.json();
            const userHeader = req.headers.get("user");
            const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
            const result= await updateProvider(tokenDetail,body)

            if(!result.success){
             return NextResponse.json({message:result.message},{status:404});      
            }
       return NextResponse.json({message:"succesfully update provider..",data:result.data},{status:200});      
    }catch(err){
          console.log(err)
          return NextResponse.json({message:"error in updating provider..",err},{status:500});
    }
}


export const getProviderProfileController=async(req)=>{
    try{
         const userHeader = req.headers.get("user");
         const tokenDetail = userHeader ? JSON.parse(userHeader) : null;
         const provider = await getProviderProfile(tokenDetail.email);
         if(!provider.success){
           return NextResponse.json({message:provider.message},{status:404});    
         }

         return NextResponse.json({message:"successfully fetched",data:provider},{status:200});

    }catch(err){
        return NextResponse.json({message:"error in fetching provider..",err},{status:500});
    }
}