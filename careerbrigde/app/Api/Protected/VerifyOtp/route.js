import { verifyOtpController } from "@/controllers/forgotController";

export async function POST(req) {
    return await verifyOtpController(req);
}