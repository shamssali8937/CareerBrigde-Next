import { getAllJobApllicationsOfSeekerController } from "@/controllers/jobApplicationController";

export async function GET(req) {
    return await getAllJobApllicationsOfSeekerController(req);
}