import { getAllJobsForSpecificProviderController } from "@/controllers/jobController";

export async function GET(req) {
    return await getAllJobsForSpecificProviderController(req);
}