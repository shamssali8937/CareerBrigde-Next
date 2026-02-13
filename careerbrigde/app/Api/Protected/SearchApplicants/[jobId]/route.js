import { searchApplicantsController } from "@/controllers/jobApplicationController";

export async function POST(req,{params}) {
    return await searchApplicantsController(req,params);
}