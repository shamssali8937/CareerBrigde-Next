import { resetPasswordController } from "@/controllers/forgotController";

export async function POST(req) {
    return await resetPasswordController(req);
}