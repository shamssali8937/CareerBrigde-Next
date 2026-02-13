import { getApplicationsForJobOfSpecificProviderController } from "@/controllers/jobApplicationController";

export async function GET(req) {
    return await getApplicationsForJobOfSpecificProviderController(req);
}
