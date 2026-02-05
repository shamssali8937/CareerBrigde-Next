import { getSeekerProfileController } from "@/controllers/seekerController";

export async function GET(req) {
    return await getSeekerProfileController(req);
}