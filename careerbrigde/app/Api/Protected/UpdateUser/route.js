import { updateUserController } from "@/controllers/userController";

export async function POST(req) {
    return await updateUserController(req);
}