import { updateSeekerController } from "@/controllers/seekerController";

export async function POST(req) {
     return await updateSeekerController(req);
}