import { editJobController } from "@/controllers/jobController";

export async function PUT(req) {
    return await editJobController(req);
}