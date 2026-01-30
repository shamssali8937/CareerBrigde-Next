import { updateUserController } from "@/controllers/userController";

export async function PUT(req) {
    return await updateUserController(req);
}