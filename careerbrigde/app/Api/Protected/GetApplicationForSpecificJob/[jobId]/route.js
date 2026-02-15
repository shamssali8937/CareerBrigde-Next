import { getApplicationsForSpecificJobController } from "@/controllers/jobApplicationController";

export async function GET(req,{params}) {
    return await getApplicationsForSpecificJobController(req,params);
}