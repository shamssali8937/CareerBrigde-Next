import { getAllJobsForSeekerController } from "@/controllers/jobController";

export async function GET(req) {
    return await getAllJobsForSeekerController(req);
}