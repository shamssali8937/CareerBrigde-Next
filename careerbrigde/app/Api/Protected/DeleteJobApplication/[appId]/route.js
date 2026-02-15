import { deleteJobApplicationController } from "@/controllers/jobApplicationController";

export async function DELETE(req,{params}) {
    return await deleteJobApplicationController(req,params);
}