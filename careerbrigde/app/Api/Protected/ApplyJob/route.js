import { applyJobController } from "@/controllers/jobApplicationController";

export async function POST(req) {
    return await applyJobController(req);
}