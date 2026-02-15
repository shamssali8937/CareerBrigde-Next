import { changeApplicationStatusController } from "@/controllers/jobApplicationController";

export async function PUT(req,{params}) {
    return await changeApplicationStatusController(req,params);
}