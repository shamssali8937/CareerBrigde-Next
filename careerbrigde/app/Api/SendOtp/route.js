import { genrateOtpAndForgotToken } from "@/controllers/forgotController";

export async function POST(req) {
    return await genrateOtpAndForgotToken(req);
}