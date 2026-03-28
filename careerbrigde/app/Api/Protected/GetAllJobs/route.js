import { getAllJobsController } from "@/controllers/jobController";


export async function GET(req) {
    return await getAllJobsController(req);
}