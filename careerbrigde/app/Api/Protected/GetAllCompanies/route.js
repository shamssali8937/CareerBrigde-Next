import { getAllProvidersWithJobsController } from "@/controllers/jobController";

export async function GET() {
    return await getAllProvidersWithJobsController();
}