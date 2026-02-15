import { postJobController } from "@/controllers/jobController";

export async function POST(req) {
    return await postJobController(req);
}