import { deleteJobController } from "@/controllers/jobController";

export async function DELETE(req,{params}) {
    return await deleteJobController(req,params);
}